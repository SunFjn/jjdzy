package com.teamtop.system.activity.ativitys.godOfWealthSendGiftAct;

import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.HeroOpTaskRunnable;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.godOfWealthSendGiftAct.model.GodOfWealthSendGiftAct;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_xtcs_004;

public class GodOfWealthSendGiftActFunction {
	private static volatile GodOfWealthSendGiftActFunction ins = null;

	public static GodOfWealthSendGiftActFunction getIns() {
		if (ins == null) {
			synchronized (GodOfWealthSendGiftActFunction.class) {
				if (ins == null) {
					ins = new GodOfWealthSendGiftActFunction();
				}
			}
		}
		return ins;
	}

	private GodOfWealthSendGiftActFunction() {
	}

	public void rechargeHandler(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub
		OpTaskExecutorService.DefaultService.execute(new HeroOpTaskRunnable() {

			@Override
			public void run() {
				try {
					//  当天版本更新前玩家进行了充值，版本更新后，要计算当天已充值的金额（若活动正好当天开启）；
					if (!ActivityFunction.getIns().checkActOpen(ActivitySysId.GOD_OF_WEALTH_SEND_GIFT_ACT)) {
						return;
					}
					GodOfWealthSendGiftAct model = (GodOfWealthSendGiftAct) ActivityFunction.getIns()
							.getActivityData(hero, ActivitySysId.GOD_OF_WEALTH_SEND_GIFT_ACT);
					int totalRecharge = model.getTotalRecharge();
					model.setTotalRecharge(totalRecharge + money);
					totalRecharge = model.getTotalRecharge();
					int totalTurnTimes = getTotalTurnTimes(totalRecharge);
					int turnedTimes = model.getTurnedTimes();
					boolean flag = false;
					if (turnedTimes < totalTurnTimes) {
						flag = true;
					}
					if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.GOD_OF_WEALTH_SEND_GIFT_ACT)) {
						return;
					}
					if (flag) {
						RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.NEW_ACT, 1,
								RedPointConst.HAS_RED);
						RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.GOD_OF_WEALTH_SEND_GIFT_ACT, 1,
								RedPointConst.HAS_RED);
					}
					GodOfWealthSendGiftActManager.getIns().openUI(hero);
				} catch (Exception e) {
					// TODO: handle exception
					LogTool.error(e, this, hero.getId(), hero.getName(),
							"GodOfWealthSendGiftActFunction rechargeHandler money:" + money + " product_id:"
									+ product_id);
				}
			}

			@Override
			public Object getSession() {
				// TODO Auto-generated method stub
				return hero.getId();
			}
		});
	}

	/**
	 * 总抽奖次数
	 * 
	 * @param model
	 * @return
	 */
	public int getTotalTurnTimes(int totalRecharge) {
		int num = Config_xtcs_004.getIns().get(GodOfWealthSendGiftActConst.RECHARGE_GRADE).getNum();
		int totalTurnTimes = totalRecharge / num;
		return totalTurnTimes;
	}

	public int getNeedRecharge(int totalRecharge) {
		int num = Config_xtcs_004.getIns().get(GodOfWealthSendGiftActConst.RECHARGE_GRADE).getNum();
		int needRecharge = num - totalRecharge % num;
		return needRecharge;
	}

	/**
	 * 红点发送
	 * 
	 * @param isLogin 是否登录状态
	 */
	public void redPoint(Hero hero, boolean isLogin) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.GOD_OF_WEALTH_SEND_GIFT_ACT)) {
			return;
		}
		GodOfWealthSendGiftAct model = (GodOfWealthSendGiftAct) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.GOD_OF_WEALTH_SEND_GIFT_ACT);
		int totalRecharge = model.getTotalRecharge();
		int totalTurnTimes = getTotalTurnTimes(totalRecharge);
		int turnedTimes = model.getTurnedTimes();
		if (turnedTimes < totalTurnTimes) {
			if (isLogin) {
				RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.NEW_ACT, 1, RedPointConst.HAS_RED);
				RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.GOD_OF_WEALTH_SEND_GIFT_ACT, 1,
						RedPointConst.HAS_RED);
			} else {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.NEW_ACT, 1, RedPointConst.HAS_RED);
				RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.GOD_OF_WEALTH_SEND_GIFT_ACT, 1,
						RedPointConst.HAS_RED);
			}
		}
	}

}
