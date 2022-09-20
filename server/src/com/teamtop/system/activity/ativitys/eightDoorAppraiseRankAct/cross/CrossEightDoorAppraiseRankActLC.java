package com.teamtop.system.activity.ativitys.eightDoorAppraiseRankAct.cross;

import java.util.TreeSet;

import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.callback.Callback;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.HeroOpTaskRunnable;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.eightDoorAppraiseRankAct.EightDoorAppraiseRankActFunction;
import com.teamtop.system.activity.ativitys.eightDoorAppraiseRankAct.EightDoorAppraiseRankActSysCache;
import com.teamtop.system.activity.ativitys.eightDoorAppraiseRankAct.model.EightDoorAppraiseRankAct;
import com.teamtop.system.activity.ativitys.eightDoorAppraiseRankAct.model.EightDoorAppraiseRankActModel;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_pmhdsbdjcsb_326;
import io.netty.channel.Channel;

public class CrossEightDoorAppraiseRankActLC {
	private static volatile CrossEightDoorAppraiseRankActLC ins = null;

	public static CrossEightDoorAppraiseRankActLC getIns() {
		if (ins == null) {
			synchronized (CrossEightDoorAppraiseRankActLC.class) {
				if (ins == null) {
					ins = new CrossEightDoorAppraiseRankActLC();
				}
			}
		}
		return ins;
	}

	private CrossEightDoorAppraiseRankActLC() {
	}

	/**
	 * 通知中央服增加更新排行榜数据(子服向中央服)
	 * 
	 * @param hero
	 * @param type =0 增加 =1改名 =2头像id，头像框，国家，vip等级 3玩家角色
	 */
	public void addUpdateAppraiseRankListToCen(Hero hero, int addTimes, int type) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, ActivitySysId.EIGHTDOOR_APPRAISERANK_ACT)) {
				return;
			}
			EightDoorAppraiseRankAct model = (EightDoorAppraiseRankAct) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.EIGHTDOOR_APPRAISERANK_ACT);
			if (model == null || (!EightDoorAppraiseRankActFunction.getIns().isCanUpdate(model) && type == 0)) {
				return;
			}
			int appraiseTimes = model.getAppraiseTimes();
			EightDoorAppraiseRankActModel rankModel = null;
			CrossData crossData = new CrossData();
			if (type > 0) {
				TreeSet<EightDoorAppraiseRankActModel> rankTreeSet = EightDoorAppraiseRankActSysCache.getRankTreeSet();
				if (rankTreeSet.size() <= 0) {
					return;
				}
				rankModel = new EightDoorAppraiseRankActModel(hero.getId(), hero.getNameZoneid(), appraiseTimes,
						hero.getJob(), hero.getShowModel().getBodyModel(), hero.getIcon(), hero.getFrame(),
						hero.getCountryType(), hero.getVipLv(), hero.getMountId());
				if (type == 1) {
					if (!rankTreeSet.contains(rankModel)) {
						return;
					}
				} else if (type == 2) {
					Object[] rankObjArray = EightDoorAppraiseRankActSysCache.getRankObjArray();
					int length = rankObjArray.length;
					if (length < 2) {
						return;
					}
					boolean isHas = false;
					for (int i = 0; i < length; i++) {
						Object[] rankArray = (Object[]) rankObjArray[i];
						if ((i == 1 || i == 2) && hero.getNameZoneid().equals(rankArray[1])) {
							isHas = true;
						}
					}
					if (!isHas) {
						return;
					}
				} else if (type == 3) {
					EightDoorAppraiseRankActModel firstModel = rankTreeSet.first();
					if (hero.getId() != firstModel.getHid()) {
						return;
					}
				}
				rankModel.setAppraiseTimes(0);
			} else {
				int newTimes = appraiseTimes + addTimes;
				model.setAppraiseTimes(newTimes);
				int limitTimes = Config_pmhdsbdjcsb_326.getIns().get(ActivitySysId.EIGHTDOOR_APPRAISERANK_ACT).getSb();
				if (newTimes < limitTimes) {
					return;
				}
				rankModel = new EightDoorAppraiseRankActModel(hero.getId(), hero.getNameZoneid(), newTimes,
						hero.getJob(), hero.getShowModel().getBodyModel(), hero.getIcon(), hero.getFrame(),
						hero.getCountryType(), hero.getVipLv(), hero.getMountId());
				rankModel.setAddTimes(addTimes);
				int endTime = EightDoorAppraiseRankActSysCache.getIndexConfigMap().get(model.getIndexId());
				crossData.putObject(CrossEightDoorAppraiseRankActEnum.endTime, endTime);
				crossData.putObject(CrossEightDoorAppraiseRankActEnum.qs, model.getPeriods());
			}
			Channel crossChannel = Client_2.getIns().getCrossChannel();
			crossData.putObject(CrossEightDoorAppraiseRankActEnum.addUpdateRankModel, rankModel);
			NettyWrite.writeXData(crossChannel, CrossConst.EIGHTDOOR_APPRAISERANK_ACT_ADDUPDATERANK_LC, crossData,
					new Callback() {

						@Override
						public void dataReci(Channel channel, CrossData crossData) {
							// TODO Auto-generated method stub
							OpTaskExecutorService.DefaultService.execute(new HeroOpTaskRunnable() {

								@Override
								public void run() {
									Boolean isUpdateSuccess = crossData.getObject(
											CrossEightDoorAppraiseRankActEnum.isUpdateSuccess, Boolean.class);
									if (!isUpdateSuccess) {
										if (addTimes > 0) {
											updateFailHandle(hero, model, addTimes);
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
			LogTool.error(e, this, hero.getId(), hero.getName(), "addUpdateAppraiseRankListToCen addTimes:" + addTimes);
		}

	}

	/**
	 * 更新失败处理
	 * 
	 * @param hero
	 * @param addAppraiseTimes
	 */
	private void updateFailHandle(Hero hero, EightDoorAppraiseRankAct model, int addTimes) {
		int appraiseTimes = model.getAppraiseTimes();
		model.setAppraiseTimes(appraiseTimes - addTimes);
		int newAppraiseTimes = model.getAppraiseTimes();
		String currentDateTimeStr = TimeDateUtil.getCurrentDateTimeStr("yyyy-MM-dd HH:mm:ss");
		LogTool.warn("CrossEightDoorAppraiseRankActLC updateFailHandle: hid:" + hero.getId() + " appraiseTimes:"
				+ appraiseTimes + " addTimes:" + addTimes + " newAppraiseTimes:" + newAppraiseTimes
				+ " currentDateTimeStr:" + currentDateTimeStr, this);
	}

	/**
	 * gm清理命令
	 */
	public void gmToCen() {
		CrossData crossData = new CrossData();
		Channel crossChannel = Client_2.getIns().getCrossChannel();
		NettyWrite.writeXData(crossChannel, CrossConst.EIGHTDOOR_APPRAISERANK_ACT_GM_LC, crossData);
	}

}
