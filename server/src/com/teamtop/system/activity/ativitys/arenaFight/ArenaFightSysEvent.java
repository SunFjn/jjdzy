package com.teamtop.system.activity.ativitys.arenaFight;

import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;

public class ArenaFightSysEvent extends AbsSystemEvent {

	private static ArenaFightSysEvent ins;

	private ArenaFightSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized ArenaFightSysEvent getIns() {
		if (ins == null) {
			ins = new ArenaFightSysEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void login(Hero hero) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, ActivitySysId.ACT_ARENA_FIGHT)) {
			return;
		}
		if (ArenaFightLocalCache.isFightOpen()) {
			ArenaFightSender.sendCmd_11612(hero.getId(), 1);
		}
	}

}
