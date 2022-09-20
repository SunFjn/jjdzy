package com.teamtop.system.openDaysSystem.monsterKingLoginGift;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;

public class MonsterKingLoginGiftSysEvent extends AbsSystemEvent {

	private static MonsterKingLoginGiftSysEvent ins;

	private MonsterKingLoginGiftSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized MonsterKingLoginGiftSysEvent getIns() {
		if (ins == null) {
			ins = new MonsterKingLoginGiftSysEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void login(Hero hero) {
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.MONSTER_KING_TOTAL_RECHARGE)) {
			return;
		}
		boolean redPoint = MonsterKingLoginGiftFunction.getIns().checkRedPoint(hero);
		if (redPoint) {
			RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.MONSTER_KING_TOTAL_RECHARGE,
					RedPointConst.RED_1,
					RedPointConst.HAS_RED);
		}
		MonsterKingLoginGiftFunction.getIns().checkLoginDays(hero);
	}

	@Override
	public void levelUp(Hero hero, int newLv, int oldLv) {
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.MONSTER_KING_TOTAL_RECHARGE)) {
			return;
		}
		MonsterKingLoginGiftFunction.getIns().checkLoginDays(hero);
	}

	@Override
	public void passGuanqia(Hero hero, int passGuanqia) {
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.MONSTER_KING_TOTAL_RECHARGE)) {
			return;
		}
		MonsterKingLoginGiftFunction.getIns().checkLoginDays(hero);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.MONSTER_KING_TOTAL_RECHARGE)) {
			return;
		}
		MonsterKingLoginGiftFunction.getIns().checkLoginDays(hero);
	}

}
