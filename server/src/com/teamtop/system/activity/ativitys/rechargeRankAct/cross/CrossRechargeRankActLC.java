package com.teamtop.system.activity.ativitys.rechargeRankAct.cross;

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
import com.teamtop.system.activity.ativitys.rechargeRankAct.RechargeRankActSysCache;
import com.teamtop.system.activity.ativitys.rechargeRankAct.model.RechargeRankAct;
import com.teamtop.system.activity.ativitys.rechargeRankAct.model.RechargeRankActModel;
import com.teamtop.system.godWeapon.GodWeaponFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import io.netty.channel.Channel;

public class CrossRechargeRankActLC {
	private static volatile CrossRechargeRankActLC ins = null;

	public static CrossRechargeRankActLC getIns() {
		if (ins == null) {
			synchronized (CrossRechargeRankActLC.class) {
				if (ins == null) {
					ins = new CrossRechargeRankActLC();
				}
			}
		}
		return ins;
	}

	private CrossRechargeRankActLC() {
	}

	/**
	 * 通知中央服增加更新排行榜数据(子服向中央服)
	 * 
	 * @param hero
	 * @param money =0 充值 =1改名 =2 模型，神兵
	 */
	public void addUpdateConsumeRankListToCen(Hero hero, int money, int type) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, ActivitySysId.CROSS_RECHARGE_RANK_ACT)) {
			return;
		}
		RechargeRankAct consumeRankAct = (RechargeRankAct) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.CROSS_RECHARGE_RANK_ACT);
		if(consumeRankAct==null) {
			return;
		}
		int totalRecharge = consumeRankAct.getTotalRecharge();
		try {
			RechargeRankActModel consumeRankActModel = null;
			CrossData crossData = new CrossData();
			if (type > 0) {
				consumeRankActModel = new RechargeRankActModel(hero.getId(), hero.getNameZoneid(), totalRecharge,
						hero.getJob(), hero.getShowModel().getBodyModel(),
						GodWeaponFunction.getIns().getNowGodWeapon(hero), hero.getMountId());
				TreeSet<RechargeRankActModel> rankTreeSet = RechargeRankActSysCache.getRankTreeSet();
				if (type == 1) {
					if (!rankTreeSet.contains(consumeRankActModel)) {
						return;
					}
				} else {
					if (rankTreeSet.size() <= 0) {
						return;
					}
					RechargeRankActModel firstModel = rankTreeSet.first();
					if (firstModel.getRank() != 1 || hero.getId() != firstModel.getHid()) {
						return;
					}
				}
				consumeRankActModel.setTotalRecharge(0);
			} else {
				int newRecharge = totalRecharge + money;
				consumeRankAct.setTotalRecharge(newRecharge);
				consumeRankActModel = new RechargeRankActModel(hero.getId(), hero.getNameZoneid(), newRecharge,
						hero.getJob(), hero.getShowModel().getBodyModel(),
						GodWeaponFunction.getIns().getNowGodWeapon(hero), hero.getMountId());
				consumeRankActModel.setAddTimes(money);
				int endTime = RechargeRankActSysCache.getIndexConfigMap().get(consumeRankAct.getIndexId());
				crossData.putObject(CrossRechargeRankActEnum.endTime, endTime);
				crossData.putObject(CrossRechargeRankActEnum.qs, consumeRankAct.getPeriods());
			}
			Channel crossChannel = Client_2.getIns().getCrossChannel();
			crossData.putObject(CrossRechargeRankActEnum.addUpdateRankModel, consumeRankActModel);
			NettyWrite.writeXData(crossChannel, CrossConst.CROSS_RECHARGE_RANK_ACT_ADDUPDATERANK_LC, crossData,
					new Callback() {

						@Override
						public void dataReci(Channel channel, CrossData crossData) {
							// TODO Auto-generated method stub
							OpTaskExecutorService.DefaultService.execute(new HeroOpTaskRunnable() {

								@Override
								public void run() {
									Boolean isUpdateSuccess = crossData
											.getObject(CrossRechargeRankActEnum.isUpdateSuccess, Boolean.class);
									if (!isUpdateSuccess) {
										if (money > 0) {
											updateFailHandle(hero, consumeRankAct, money);
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
			LogTool.error(e, this, hero.getId(), hero.getName(), "addUpdateConsumeRankListToCen money:" + money);
		}

	}

	/**
	 * 更新失败处理
	 * 
	 * @param hero
	 * @param addAppraiseTimes
	 */
	private void updateFailHandle(Hero hero, RechargeRankAct consumeRankAct, int money) {
		int totalRecharge = consumeRankAct.getTotalRecharge();
		consumeRankAct.setTotalRecharge(totalRecharge - money);
		int newTotalRecharge = consumeRankAct.getTotalRecharge();
		String currentDateTimeStr = TimeDateUtil.getCurrentDateTimeStr("yyyy-MM-dd HH:mm:ss");
		LogTool.warn("CrossRechargeRankActLC updateFailHandle: hid:" + hero.getId() + " totalRecharge:" + totalRecharge
				+ " money:" + money + " newTotalRecharge:" + newTotalRecharge + " currentDateTimeStr:"
				+ currentDateTimeStr, this);
	}

	/**
	 * gm清理命令
	 */
	public void gmToCen() {
		CrossData crossData = new CrossData();
		Channel crossChannel = Client_2.getIns().getCrossChannel();
		NettyWrite.writeXData(crossChannel, CrossConst.CROSS_RECHARGE_RANK_ACT_GM_LC, crossData);
	}

}
