package com.teamtop.system.crossCommonRank.cross;

import java.util.Map;
import java.util.TreeSet;

import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.callback.Callback;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.HeroOpTaskRunnable;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.crossCommonRank.CommonActivityRankHandlerAbs;
import com.teamtop.system.crossCommonRank.CommonRankSysCache;
import com.teamtop.system.crossCommonRank.model.CommonActivityRank;
import com.teamtop.system.crossCommonRank.model.CommonRankModel;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import io.netty.channel.Channel;

public class CrossCommonRankLC {
	private static volatile CrossCommonRankLC ins = null;

	public static CrossCommonRankLC getIns() {
		if (ins == null) {
			synchronized (CrossCommonRankLC.class) {
				if (ins == null) {
					ins = new CrossCommonRankLC();
				}
			}
		}
		return ins;
	}

	private CrossCommonRankLC() {
	}

	public void updateNameIcon(Hero hero, int type) {
		try {
			Map<Integer, CommonActivityRankHandlerAbs> absMap = CommonRankSysCache.getActivityRankAbsMap();
			for (int sysId : absMap.keySet()) {
				CrossCommonRankLC.getIns().addUpdateActivityRankModelToCen(hero, sysId, 0, type);
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "CrossCommonRankLC updateNameIcon " + " type:" + type);
		}
	}

	/**
	 * 通知中央服增加更新排行榜数据(子服向中央服),活动用
	 * 
	 * @param hero
	 * @param type =0 充值 =1改名 =2头像，头像框
	 */
	public void addUpdateActivityRankModelToCen(Hero hero, int sysId, int add, int type) {
		int parameter = 0;
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, sysId)) {
				return;
			}
			CommonActivityRank model = (CommonActivityRank) ActivityFunction.getIns().getActivityData(hero, sysId);
			if (model == null) {
				return;
			}
			CommonActivityRankHandlerAbs<CommonActivityRank, CommonRankModel> abs = CommonRankSysCache
					.getActivityRankHandlerAbs(sysId);
			Integer[] array = CommonRankSysCache.getIndexConfigMap().get(model.getIndexId());
			int endTime = array[0] - abs.earlyEndDay() * TimeDateUtil.ONE_DAY_INT;
			int currentTime = TimeDateUtil.getCurrentTime();
			if (currentTime > endTime && type == 0) {
				return;
			}
			parameter = model.getParameter();
			CommonRankModel rankModel = null;
			CrossData crossData = new CrossData();
			if (type > 0) {
				rankModel = abs.createRankModel(hero, parameter);
				TreeSet<CommonRankModel> rankTreeSet = CommonRankSysCache.getRankTreeSet(sysId);
				if (type == 1) {
					if (!rankTreeSet.contains(rankModel)) {
						return;
					}
				} else {
					// 头像，头像框，神兵处理等
					if (!abs.otherHandler(hero, rankTreeSet)) {
						return;
					}
				}
				rankModel.setParameter(0);
			} else {
				int newParameter = parameter + add;
				model.setParameter(newParameter);
				if (newParameter < abs.upRankCondition()) {
					// 未达到上榜条件
					abs.updateSuccessHandler(hero, model);
					return;
				}
				rankModel = abs.createRankModel(hero, newParameter);
				rankModel.setAdd(add);
				crossData.putObject(CrossCommonRankEnum.endTime, endTime);
				int nextQs = array[1];
				crossData.putObject(CrossCommonRankEnum.qs, 1000 * nextQs + model.getPeriods());
			}
			Channel crossChannel = Client_2.getIns().getCrossChannel();
			if (crossChannel == null || !crossChannel.isActive()) {
				if (type == 0) {
					abs.updateSuccessHandler(hero, model);
				}
				LogTool.warn("CrossCommonRankLC addUpdateActivityRankModelToCen channel not Active! hid:" + hero.getId()
						+ " name:" + hero.getNameZoneid() + " sysId:" + sysId + " type:" + type + " parameter:"
						+ parameter + " add:" + add, this);
				return;
			}
			crossData.putObject(CrossCommonRankEnum.sysId, sysId);
			crossData.putObject(CrossCommonRankEnum.addUpdateRankModel, rankModel);
			NettyWrite.writeXData(crossChannel, CrossConst.CROSS_COMMONRANK_ADDUPDATERANK_LC, crossData,
					new Callback() {

						@Override
						public void dataReci(Channel channel, CrossData crossData) {
							// TODO Auto-generated method stub
							OpTaskExecutorService.DefaultService.execute(new HeroOpTaskRunnable() {

								@Override
								public void run() {
									Boolean isUpdateSuccess = crossData.getObject(CrossCommonRankEnum.isUpdateSuccess,
											Boolean.class);
									if (isUpdateSuccess) {
										abs.updateSuccessHandler(hero, model);
									} else {
										if (add > 0) {
											updateFailHandle(hero, sysId, model, add);
										}
									}
								}

								@Override
								public Object getSession() {
									// TODO Auto-generated method stub
									return hero.getId();
								}
							});
						}
					});
		} catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "CrossCommonRankLC addUpdateRankModelToCen sysId:"
					+ sysId + " type:" + type + " parameter:" + parameter + " add:" + add);
		}

	}

	/**
	 * 更新失败处理
	 * 
	 * @param hero
	 * @param model
	 * @param add
	 */
	private void updateFailHandle(Hero hero, int sysId, CommonActivityRank model, int add) {
		int parameter = model.getParameterToHandle();
		model.setParameter(parameter - add);
		int newParameter = parameter - add;
		String currentDateTimeStr = TimeDateUtil.getCurrentDateTimeStr("yyyy-MM-dd HH:mm:ss");
		LogTool.warn(
				"CrossCommonRankLC updateFailHandle sysId" + sysId + " hid:" + hero.getId() + " parameter:" + parameter
						+ " add:" + add + " newParameter:" + newParameter + " currentDateTimeStr:" + currentDateTimeStr,
				this);
	}

	/**
	 * gm清理命令
	 */
	public void gmToCen(int sysId) {
		CrossData crossData = new CrossData();
		Channel crossChannel = Client_2.getIns().getCrossChannel();
		crossData.putObject(CrossCommonRankEnum.sysId, sysId);
		NettyWrite.writeXData(crossChannel, CrossConst.CROSS_COMMONRANK_GM_LC, crossData);
	}

}
