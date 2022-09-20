package com.teamtop.system.activity.ativitys.overCallbackYB;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.overCallbackYB.model.OverCallbackYB;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.time.TimeDateUtil;

import excel.struct.Struct_ybfl2_735;

public class OverCallbackYBManager extends AbstractActivityManager {
	private static OverCallbackYBManager ins = null;

	public static OverCallbackYBManager getIns() {
		if (ins == null) {
			ins = new OverCallbackYBManager();
		}
		return ins;
	}

	private OverCallbackYBManager() {
	}

	/**
	 * 打开界面
	 * 
	 * @param hero
	 */
	@Override
	public void openUI(Hero hero) {
		// TODO Auto-generated method stub
		if (hero == null) {
			return;
		}
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_OVERCALLBACK_YB)) {
			return;
		}
		OverCallbackYB overCallbackYB = (OverCallbackYB) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.Act_OVERCALLBACK_YB);
		int week = TimeDateUtil.getWeek();
		Map<Integer, Struct_ybfl2_735> map = OverCallbackYBCache.getYbConfigMap().get(week);
		Map<Integer, Integer> awardStateMap = overCallbackYB.getAwardStateMap();
		ArrayList<Object> arrayList = new ArrayList<Object>();
		Iterator<Integer> iterator = map.keySet().iterator();
		for (; iterator.hasNext();) {
			int id = iterator.next();
			int state = OverCallbackYBConst.NOT_REACH;
			if (awardStateMap.containsKey(id)) {
				state = awardStateMap.get(id);
			}
			arrayList.add(new Object[] { id, state });
		}
		OverCallbackYBSender.sendCmd_2450(hero.getId(), arrayList.toArray(), overCallbackYB.getConsumeYBNum());
	}

	/**
	 * 领取奖励
	 * 
	 * @param hero
	 * @param index
	 *            索引id
	 */
	public void getAward(Hero hero, int index) {
		if (hero == null) {
			return;
		}
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_OVERCALLBACK_YB)) {
			return;
		}
		OverCallbackYB overCallbackYB = (OverCallbackYB) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.Act_OVERCALLBACK_YB);
		Map<Integer, Integer> awardStateMap = overCallbackYB.getAwardStateMap();
		Integer state = awardStateMap.get(index);
		if (state == null) {// 没有奖励
			OverCallbackYBSender.sendCmd_2452(hero.getId(), OverCallbackYBConst.FAILURE_NOT_AWARD, 0);
			return;
		}
		if (state == OverCallbackYBConst.NOT_REACH) {// 不可领取
			OverCallbackYBSender.sendCmd_2452(hero.getId(), OverCallbackYBConst.FAILURE_NOT_REACH, 0);
			return;
		}
		if (state == OverCallbackYBConst.GETTED) {// 不可重复领取
			OverCallbackYBSender.sendCmd_2452(hero.getId(), OverCallbackYBConst.FAILURE_NOT_REP, 0);
			return;
		}
		int week = TimeDateUtil.getWeek();
		Map<Integer, Struct_ybfl2_735> map = OverCallbackYBCache.getYbConfigMap().get(week);
		awardStateMap.put(index, OverCallbackYBConst.GETTED);
		int[][] award = map.get(index).getReward();
		UseAddUtil.add(hero, award, SourceGoodConst.OVERCALLBACKCONST_YB_AWARD, UseAddUtil.getDefaultMail(), true); // 发放奖励
		OverCallbackYBSender.sendCmd_2452(hero.getId(), OverCallbackYBConst.SUCCESS, index);
		OverCallbackYBFunction.getIns().updateRedPoint(hero);
	}

	@Override
	public void actOpen() {
		// TODO Auto-generated method stub

	}

	@Override
	public void heroActOpen(Hero hero) {
		// TODO Auto-generated method stub
		if (ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_OVERCALLBACK_YB)) {
			OverCallbackYBFunction.getIns().updateRedPoint(hero);
		}
		int week = TimeDateUtil.getWeek();
		OverCallbackYB overCallbackYB = (OverCallbackYB) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.Act_OVERCALLBACK_YB);
		overCallbackYB.setWeek(week);
	}

	@Override
	public void actEnd() {
		// TODO Auto-generated method stub

	}

	@Override
	public void heroActEnd(Hero hero) {
		// TODO Auto-generated method stub
		OverCallbackYBFunction.getIns().sendAward(hero);
	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		// TODO Auto-generated method stub
		OverCallbackYB OverCallbackYB = new OverCallbackYB(hero.getId(), activityInfo.getIndex(),
				activityInfo.getActId(), activityInfo.getPeriods());
		Map<Integer, Integer> awardStateMap = new HashMap<>();
		OverCallbackYB.setAwardStateMap(awardStateMap);
		return OverCallbackYB;
	}

	@Override
	public Class<?> getActivityData() {
		// TODO Auto-generated method stub
		return OverCallbackYB.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub

	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		// TODO Auto-generated method stub
		return OverCallbackYBEvent.getIns();
	}

}
