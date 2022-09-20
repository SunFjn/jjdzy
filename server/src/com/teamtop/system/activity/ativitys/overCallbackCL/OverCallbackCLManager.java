package com.teamtop.system.activity.ativitys.overCallbackCL;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.overCallbackCL.model.OverCallbackCL;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.time.TimeDateUtil;

import excel.struct.Struct_clfl2_736;

public class OverCallbackCLManager extends AbstractActivityManager {
	private static OverCallbackCLManager ins = null;

	public static OverCallbackCLManager getIns() {
		if (ins == null) {
			ins = new OverCallbackCLManager();
		}
		return ins;
	}

	private OverCallbackCLManager() {
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
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_OVERCALLBACK_CL)) {
			return;
		}
		OverCallbackCL overCallbackCL = (OverCallbackCL) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.Act_OVERCALLBACK_CL);
		Map<Integer, Integer> awardStateMap = overCallbackCL.getAwardStateMap();
		ArrayList<Object> arrayList = new ArrayList<Object>();
		int week = TimeDateUtil.getWeek();
		Map<Integer, Struct_clfl2_736> map = OverCallbackCLCache.getClConfigMap().get(week);
		Iterator<Integer> iterator = map.keySet().iterator();
		for (; iterator.hasNext();) {
			int id = iterator.next();
			int state = OverCallbackCLConst.NOT_REACH;
			if (awardStateMap.containsKey(id)) {
				state = awardStateMap.get(id);
			}
			arrayList.add(new Object[] { id, state });
		}
		OverCallbackCLSender.sendCmd_2430(hero.getId(), arrayList.toArray(), overCallbackCL.getConsumeNum());
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
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_OVERCALLBACK_CL)) {
			return;
		}
		OverCallbackCL overCallbackCL = (OverCallbackCL) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.Act_OVERCALLBACK_CL);
		Map<Integer, Integer> awardStateMap = overCallbackCL.getAwardStateMap();
		Integer state = awardStateMap.get(index);
		if (state == null) {// 没有奖励
			OverCallbackCLSender.sendCmd_2432(hero.getId(), OverCallbackCLConst.FAILURE_NOT_AWARD, 0);
			return;
		}
		if (state == OverCallbackCLConst.NOT_REACH) {// 不可领取
			OverCallbackCLSender.sendCmd_2432(hero.getId(), OverCallbackCLConst.FAILURE_NOT_REACH, 0);
			return;
		}
		if (state == OverCallbackCLConst.GETTED) {// 不可重复领取
			OverCallbackCLSender.sendCmd_2432(hero.getId(), OverCallbackCLConst.FAILURE_NOT_REP, 0);
			return;
		}
		int week = TimeDateUtil.getWeek();
		Map<Integer, Struct_clfl2_736> map = OverCallbackCLCache.getClConfigMap().get(week);
		awardStateMap.put(index, OverCallbackCLConst.GETTED);
		int[][] award = map.get(index).getReward();
		UseAddUtil.add(hero, award, SourceGoodConst.OVERCALLBACKCONST_CL_AWARD, UseAddUtil.getDefaultMail(), true); // 发放奖励
		OverCallbackCLSender.sendCmd_2432(hero.getId(), OverCallbackCLConst.SUCCESS, index);
		OverCallbackCLFunction.getIns().fastSendRedPoint(hero);
	}

	@Override
	public void actOpen() {
		// TODO Auto-generated method stub

	}

	@Override
	public void heroActOpen(Hero hero) {
		// TODO Auto-generated method stub
		if (ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_OVERCALLBACK_CL)) {
			OverCallbackCLFunction.getIns().fastSendRedPoint(hero);
		}
		int week = TimeDateUtil.getWeek();
		OverCallbackCL overCallbackCL = (OverCallbackCL) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.Act_OVERCALLBACK_CL);
		overCallbackCL.setWeek(week);
	}

	@Override
	public void actEnd() {
		// TODO Auto-generated method stub

	}

	@Override
	public void heroActEnd(Hero hero) {
		OverCallbackCLFunction.getIns().sendAward(hero);// 补发未领取奖励
	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		// TODO Auto-generated method stub
		OverCallbackCL overCallback = new OverCallbackCL(hero.getId(), activityInfo.getIndex(), activityInfo.getActId(),
				activityInfo.getPeriods());
		Map<Integer, Integer> awardStateMap = new HashMap<>();
		overCallback.setAwardStateMap(awardStateMap);
		return overCallback;
	}

	@Override
	public Class<?> getActivityData() {
		// TODO Auto-generated method stub
		return OverCallbackCL.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub

	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		// TODO Auto-generated method stub
		return OverCallbackCLEvent.getIns();
	}

}
