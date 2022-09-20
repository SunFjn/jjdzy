package com.teamtop.system.functionStart;

import java.util.HashSet;
import java.util.Set;

import com.teamtop.system.SystemStateEnum;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;

import excel.config.Config_sysshow_228;

public class FunctionStartEvent extends AbsSystemEvent {
	private static FunctionStartEvent ins;

	public static FunctionStartEvent getIns() {
		if (ins == null) {
			ins = new FunctionStartEvent();
		}
		return ins;
	}

	private FunctionStartEvent() {
	}

	@Override
	public void init(Hero hero) {
		Set<Integer> openSysReward = hero.getOpenSysReward();
		if (openSysReward == null) {
			HashSet<Integer> hashSet = new HashSet<Integer>();
			hero.setOpenSysReward(hashSet);
		}
	}

	@Override
	public void login(Hero hero) {
		if (HeroFunction.getIns().checkSystemOpen(hero, FunctionStartConst.FUNCTIONSTART_SYSID)) {
			int size = hero.getOpenSysReward().size();
			int configSize = Config_sysshow_228.getIns().getSortList().size();
			if (size < configSize) {
				HeroFunction.getIns().addLoginSytemState(hero, FunctionStartConst.FUNCTIONSTART_SYSID,
						SystemStateEnum.StateEnum.OPEN_NOW.getState());
			}
			FunctionStartFunction.getIns().loginSendRedPoint(hero);
		}
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		// TODO Auto-generated method stub
		FunctionStartFunction.getIns().fastSendRedPoint(hero);
	}

	@Override
	public void passGuanqia(Hero hero, int passGuanqia) {
		// TODO Auto-generated method stub
		FunctionStartFunction.getIns().fastSendRedPoint(hero);
	}

}
