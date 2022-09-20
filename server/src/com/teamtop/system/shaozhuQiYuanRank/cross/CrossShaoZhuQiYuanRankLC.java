package com.teamtop.system.shaozhuQiYuanRank.cross;

import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.callback.Callback;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.HeroOpTaskRunnable;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.shaozhuQiYuanRank.ShaoZhuQiYuanRankConst;
import com.teamtop.system.shaozhuQiYuanRank.ShaoZhuQiYuanRankFunction;
import com.teamtop.system.shaozhuQiYuanRank.cross.model.CrossShaoZhuQiYuanRankModel;
import com.teamtop.system.shaozhuQiYuanRank.model.ShaoZhuQiYuanRank;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_xtcs_004;
import io.netty.channel.Channel;

public class CrossShaoZhuQiYuanRankLC {
	private static volatile CrossShaoZhuQiYuanRankLC ins = null;

	public static CrossShaoZhuQiYuanRankLC getIns() {
		if (ins == null) {
			synchronized (CrossShaoZhuQiYuanRankLC.class) {
				if (ins == null) {
					ins = new CrossShaoZhuQiYuanRankLC();
				}
			}
		}
		return ins;
	}

	private CrossShaoZhuQiYuanRankLC() {
	}

	/**
	 * 通知中央服增加更新排行榜数据
	 * 
	 * @param hero
	 * @param addAppraiseTime
	 */
	public void updateAppraiseRankListToCen(Hero hero, int addQiyuanTimes) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SHAOZHU_QIYUANRANK) && addQiyuanTimes > 0) {
				return;
			}
			if (ShaoZhuQiYuanRankFunction.getIns().isOpen(0) != 1 && addQiyuanTimes > 0) {
				return;
			}
			CrossShaoZhuQiYuanRankModel crossConsumeRankModel = null;
			if (addQiyuanTimes == 0) {
				crossConsumeRankModel = new CrossShaoZhuQiYuanRankModel(hero.getId(), hero.getNameZoneid(), 0, 0,
						hero.getJob(), hero.getShowModel().getBodyModel(), hero.getIcon(), hero.getFrame(),
						hero.getCountryType(), hero.getVipLv(), hero.getMountId());
			} else {
				ShaoZhuQiYuanRank shaoZhuQiYuanRank = hero.getShaoZhuQiYuanRank();
				int qiyuanTimes = shaoZhuQiYuanRank.getQiyuanTimes();
				int newQiyuanTimes = qiyuanTimes + addQiyuanTimes;
				shaoZhuQiYuanRank.setQiyuanTimes(newQiyuanTimes);
				int upRankMinTimes = Config_xtcs_004.getIns().get(ShaoZhuQiYuanRankConst.UPRANK_MIN_TIMES).getNum();
				if (newQiyuanTimes < upRankMinTimes) {
					return;
				}
				crossConsumeRankModel = new CrossShaoZhuQiYuanRankModel(hero.getId(), hero.getNameZoneid(),
						newQiyuanTimes, 0, hero.getJob(), hero.getShowModel().getBodyModel(), hero.getIcon(),
						hero.getFrame(), hero.getCountryType(), hero.getVipLv(), hero.getMountId());
			}
			Channel crossChannel = Client_2.getIns().getCrossChannel();
			CrossData crossData = new CrossData();
			crossData.putObject(CrossShaoZhuQiYuanRankEnum.addUpdateRankModel, crossConsumeRankModel);
			NettyWrite.writeXData(crossChannel, CrossConst.CROSS_SHAOZHU_QIYUANRANK_ADDUPDATERANK_LC, crossData,
					new Callback() {

						@Override
						public void dataReci(Channel channel, CrossData crossData) {
							// TODO Auto-generated method stub
							Boolean isUpdateSuccess = crossData.getObject(CrossShaoZhuQiYuanRankEnum.isUpdateSuccess,
									Boolean.class);
							if (!isUpdateSuccess) {
								if (addQiyuanTimes > 0) {
									updateFailHandle(hero, addQiyuanTimes);
								}
							}
						}
					});
		} catch (Exception e) {
			updateFailHandle(hero, addQiyuanTimes);
			LogTool.error(e, this, hero.getId(), hero.getName(),
					"CrossShaoZhuQiYuanRankLC updateAppraiseRankListToCen addQiyuanTimes:" + addQiyuanTimes);
		}
	}

	/**
	 * 更新失败处理
	 * 
	 * @param hero
	 * @param addQiyuanTimes
	 */
	public void updateFailHandle(Hero hero, int addQiyuanTimes) {
		OpTaskExecutorService.DefaultService.execute(new HeroOpTaskRunnable() {

			@Override
			public void run() {
				ShaoZhuQiYuanRank shaoZhuQiYuanRank = hero.getShaoZhuQiYuanRank();
				int qiyuanTimes = shaoZhuQiYuanRank.getQiyuanTimes();
				shaoZhuQiYuanRank.setQiyuanTimes(qiyuanTimes - addQiyuanTimes);
				String currentDateTimeStr = TimeDateUtil.getCurrentDateTimeStr("yyyy-MM-dd HH:mm:ss");
				LogTool.warn("updateFailHandle: hid:" + hero.getId() + " qiyuanTimes:" + qiyuanTimes
						+ " addQiyuanTimes:" + addQiyuanTimes + " currentDateTimeStr:" + currentDateTimeStr, this);
			}

			@Override
			public Object getSession() {
				// TODO Auto-generated method stub
				return hero.getId();
			}
		});
	}

	/**
	 * gm清理命令
	 */
	public void gmToCen() {
		CrossData crossData = new CrossData();
		crossData.putObject(CrossShaoZhuQiYuanRankEnum.serverOpenTime, GameProperties.serverOpenTime);
		Channel crossChannel = Client_2.getIns().getCrossChannel();
		NettyWrite.writeXData(crossChannel, CrossConst.CROSS_SHAOZHU_QIYUANRANK_ADDUPDATERANK_GM, crossData);
	}

}
