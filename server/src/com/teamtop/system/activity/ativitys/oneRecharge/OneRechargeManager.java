package com.teamtop.system.activity.ativitys.oneRecharge;

import java.util.ArrayList;
import java.util.List;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.oneRecharge.model.OneRecharge;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_dbcz_724;
import excel.struct.Struct_dbcz_724;

public class OneRechargeManager extends AbstractActivityManager {
	private static OneRechargeManager ins = null;

	public static OneRechargeManager getIns() {
		if (ins == null) {
			ins = new OneRechargeManager();
		}
		return ins;
	}

	private OneRechargeManager() {
	}

	/**
	 * 打开界面
	 * 
	 * @param hero
	 */
	@Override
	public void openUI(Hero hero) {
		if (hero == null) {
			return;
		}
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_ONERECHARGE)) {
			return;
		}
		OneRecharge oneRecharge = (OneRecharge) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.Act_ONERECHARGE);
		List<Integer> awardStateList = oneRecharge.getAwardStateList();
		ArrayList<Object> awardStateListToFront = new ArrayList<Object>();
		for (Integer awardState : awardStateList) {
			awardStateListToFront.add(new Object[] { awardState });
		}
		OneRechargeSender.sendCmd_2360(hero.getId(), awardStateListToFront.toArray(), oneRecharge.getPeriods());
	}

	/**
	 * 领取奖励
	 * 
	 * @param hero
	 * @param awardId 奖励id
	 */
	public void getAward(Hero hero, int awardId) {
		if (hero == null) {
			return;
		}
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_ONERECHARGE)) {
			return;
		}
		OneRecharge oneRecharge = (OneRecharge) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.Act_ONERECHARGE);
		List<Integer> awardStateList = oneRecharge.getAwardStateList();
		int size = awardStateList.size();
		if (awardId < 1 || awardId > size) {
			return;
		}
		int state = awardStateList.get(awardId - 1);
		if (state == OneRechargeConst.NOT_REACH) {// 未达到
			OneRechargeSender.sendCmd_2362(hero.getId(), OneRechargeConst.FAILURE_NOT_REACH, 0);
			return;
		}
		if (state == OneRechargeConst.GETTED) {// 不可重复领取
			OneRechargeSender.sendCmd_2362(hero.getId(), OneRechargeConst.FAILURE_NOT_REP, 0);
			return;
		}
		List<Struct_dbcz_724> sortList = Config_dbcz_724.getIns().getSortList();
		int index = OneRechargeFunction.getIns().getFirstIndex(hero) + awardId - 1;
		int[][] award = sortList.get(index).getJl();
		UseAddUtil.add(hero, award, SourceGoodConst.ONERECHARGE_AWARD, null, true); // 发放奖励
		awardStateList.set(awardId - 1, OneRechargeConst.GETTED);
		OneRechargeSender.sendCmd_2362(hero.getId(), OneRechargeConst.SUCCESS, awardId);
	}

	@Override
	public void actOpen() {
		// TODO Auto-generated method stub

	}

	@Override
	public void heroActOpen(Hero hero) {
		// TODO Auto-generated method stub
		if (ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_ONERECHARGE)) {
			OneRechargeFunction.getIns().fastSendRedPoint(hero);
		}

	}

	@Override
	public void actEnd() {
		// TODO Auto-generated method stub

	}

	@Override
	public void heroActEnd(Hero hero) {
		// TODO Auto-generated method stub
		OneRecharge oneRecharge = (OneRecharge) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.Act_ONERECHARGE);
		List<Integer> awardStateList = oneRecharge.getAwardStateList();
		List<Struct_dbcz_724> sortList = Config_dbcz_724.getIns().getSortList();
		for (int i = 0; i < awardStateList.size(); i++) {
			int state = awardStateList.get(i);
			if (state == OneRechargeConst.CAN_GET) {
				int firstIndex = OneRechargeFunction.getIns().getFirstIndex(hero);
				int[][] reward = sortList.get(firstIndex + i).getJl();
				MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.ONERECHARGE_AWARD,
						new Object[] { MailConst.ONERECHARGE_AWARD }, reward);
			}
		}
	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		OneRecharge oneRecharge = new OneRecharge(hero.getId(), activityInfo.getIndex(), activityInfo.getActId(),
				activityInfo.getPeriods());
		ArrayList<Integer> awardStateList = new ArrayList<Integer>();
		for (int i = 0; i < OneRechargeConst.CONFIG_WEEK_LEN; i++) {
			awardStateList.add(OneRechargeConst.NOT_REACH);
		}
		oneRecharge.setAwardStateList(awardStateList);
		return oneRecharge;
	}

	@Override
	public Class<?> getActivityData() {
		return OneRecharge.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		OneRecharge oneRecharge = (OneRecharge) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.Act_ONERECHARGE);
		/*List<Integer> awardStateList = oneRecharge.getAwardStateList();
		int findIndex = findIndex(awardStateList, money);
		if (findIndex >= 0) {
			awardStateList.set(findIndex, OneRechargeConst.CAN_GET);
			RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.Act_ONERECHARGE,
					OneRechargeConst.BX_REDPOINT, RedPointConst.HAS_RED);
		}*/
	}

	/**
	 * 寻找目标索引
	 * 
	 * @param awardStateList
	 * @param money
	 * @return
	 */
	public int findIndex(List<Integer> awardStateList, int money) {
		List<Struct_dbcz_724> sortList = Config_dbcz_724.getIns().getSortList();
		int week = TimeDateUtil.getWeek();
		int i = 0;
		int j = -1;
		for (Struct_dbcz_724 struct_dbcz_724 : sortList) {
			if (struct_dbcz_724.getQs() == week) {
				if (awardStateList.get(i) == OneRechargeConst.NOT_REACH) {
					if (money < struct_dbcz_724.getJe()) {
						return j;
					} else {
						j = i;
					}
				}
				if (i == awardStateList.size() - 1 || money < struct_dbcz_724.getJe()) {
					return j;
				}
				i++;
			}
		}
		return -1;
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		return OneRechargeEvent.getIns();
	}
}
