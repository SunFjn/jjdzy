package com.teamtop.system.eightDoorAppraiseRank.cross;

import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.callback.Callback;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.HeroOpTaskRunnable;
import com.teamtop.system.eightDoorAppraiseRank.EightDoorAppraiseRankConst;
import com.teamtop.system.eightDoorAppraiseRank.EightDoorAppraiseRankFunction;
import com.teamtop.system.eightDoorAppraiseRank.cross.model.CrossEightDoorAppraiseRankModel;
import com.teamtop.system.eightDoorAppraiseRank.model.EightDoorAppraiseRank;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_xtcs_004;
import io.netty.channel.Channel;

public class CrossEightDoorAppraiseRankLC {
	private static volatile CrossEightDoorAppraiseRankLC ins = null;

	public static CrossEightDoorAppraiseRankLC getIns() {
		if (ins == null) {
			synchronized (CrossEightDoorAppraiseRankLC.class) {
				if (ins == null) {
					ins = new CrossEightDoorAppraiseRankLC();
				}
			}
		}
		return ins;
	}

	private CrossEightDoorAppraiseRankLC() {
	}

	/**
	 * 通知中央服增加更新排行榜数据
	 * 
	 * @param hero
	 * @param addAppraiseTime
	 */
	public void updateAppraiseRankListToCen(Hero hero, int addAppraiseTimes) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.EIGHTDOOR_APPRAISERANK)
					&& addAppraiseTimes > 0) {
				return;
			}
			if (EightDoorAppraiseRankFunction.getIns().isOpen(0) != 1 && addAppraiseTimes > 0) {
				return;
			}
			CrossEightDoorAppraiseRankModel crossConsumeRankModel = null;
			if (addAppraiseTimes == 0) {
				crossConsumeRankModel = new CrossEightDoorAppraiseRankModel(hero.getId(), hero.getNameZoneid(), 0, 0,
						hero.getJob(), hero.getShowModel().getBodyModel(), hero.getIcon(), hero.getFrame(),
						hero.getCountryType(), hero.getVipLv(), hero.getMountId());
			} else {
				EightDoorAppraiseRank eightDoorAppraiseRank = hero.getEightDoorAppraiseRank();
				int appraiseTimes = eightDoorAppraiseRank.getAppraiseTimes();
				int newAppraiseTimes = appraiseTimes + addAppraiseTimes;
				eightDoorAppraiseRank.setAppraiseTimes(newAppraiseTimes);
				int upRankMinTimes = Config_xtcs_004.getIns().get(EightDoorAppraiseRankConst.UPRANK_MIN_TIMES).getNum();
				if (newAppraiseTimes < upRankMinTimes) {
					return;
				}
				crossConsumeRankModel = new CrossEightDoorAppraiseRankModel(hero.getId(), hero.getNameZoneid(),
						newAppraiseTimes, 0, hero.getJob(), hero.getShowModel().getBodyModel(), hero.getIcon(),
						hero.getFrame(), hero.getCountryType(), hero.getVipLv(), hero.getMountId());
			}
			Channel crossChannel = Client_2.getIns().getCrossChannel();
			CrossData crossData = new CrossData();
			crossData.putObject(CrossEightDoorAppraiseRankEnum.addUpdateRankModel, crossConsumeRankModel);
			NettyWrite.writeXData(crossChannel, CrossConst.CROSS_EIGHTDOOR_APPRAISERANK_ADDUPDATERANK_LC, crossData,
					new Callback() {

						@Override
						public void dataReci(Channel channel, CrossData crossData) {
							// TODO Auto-generated method stub
							Boolean isUpdateSuccess = crossData
									.getObject(CrossEightDoorAppraiseRankEnum.isUpdateSuccess, Boolean.class);
							if (!isUpdateSuccess) {
								if (addAppraiseTimes > 0) {
									updateFailHandle(hero, addAppraiseTimes);
								}
							}
						}
					});
		} catch (Exception e) {
			updateFailHandle(hero, addAppraiseTimes);
			LogTool.error(e, this, hero.getId(), hero.getName(),
					"CrossEightDoorAppraiseRankLC updateAppraiseRankListToCen addAppraiseTimes:" + addAppraiseTimes);
		}
	}

	/**
	 * 更新失败处理
	 * 
	 * @param hero
	 * @param addAppraiseTimes
	 */
	public void updateFailHandle(Hero hero, int addAppraiseTimes) {
		OpTaskExecutorService.DefaultService.execute(new HeroOpTaskRunnable() {

			@Override
			public void run() {
				EightDoorAppraiseRank eightDoorAppraiseRank = hero.getEightDoorAppraiseRank();
				int appraiseTimes = eightDoorAppraiseRank.getAppraiseTimes();
				eightDoorAppraiseRank.setAppraiseTimes(appraiseTimes - addAppraiseTimes);
				String currentDateTimeStr = TimeDateUtil.getCurrentDateTimeStr("yyyy-MM-dd HH:mm:ss");
				LogTool.warn(
						"updateFailHandle: hid:" + hero.getId() + " appraiseTimes:" + appraiseTimes
								+ " addAppraiseTimes:" + addAppraiseTimes + " currentDateTimeStr:" + currentDateTimeStr,
						this);
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
		crossData.putObject(CrossEightDoorAppraiseRankEnum.serverOpenTime, GameProperties.serverOpenTime);
		Channel crossChannel = Client_2.getIns().getCrossChannel();
		NettyWrite.writeXData(crossChannel, CrossConst.CROSS_EIGHTDOOR_APPRAISERANK_GM, crossData);
	}

}
