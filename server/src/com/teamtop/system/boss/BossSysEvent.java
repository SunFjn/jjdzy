package com.teamtop.system.boss;

import java.util.HashMap;
import java.util.Map;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.boss.personalBoss.PersonalBossConst;
import com.teamtop.system.boss.personalBoss.model.BossInfo;
import com.teamtop.system.boss.personalBoss.model.PersonalBoss;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;

public class BossSysEvent extends AbsSystemEvent {

	private static BossSysEvent bossSysEvent;

	private BossSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized BossSysEvent getIns() {
		if (bossSysEvent == null) {
			bossSysEvent = new BossSysEvent();
		}
		return bossSysEvent;
	}

	@Override
	public void init(Hero hero) {

	}

	@Override
	public void login(Hero hero) {

	}

	@Override
	public void passGuanqia(Hero hero, int passGuanqia) {
		Boss boss = hero.getBoss();
		if (boss != null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, BossConst.SysId)) {
			return;
		}
		boss = new Boss();
		// 个人Boss
		PersonalBoss pboss = new PersonalBoss();
		Map<Integer, BossInfo> bossMap = new HashMap<>();
		pboss.setBossMap(bossMap);
		boss.setPersonalBoss(pboss);
		hero.setBoss(boss);
	}

}
