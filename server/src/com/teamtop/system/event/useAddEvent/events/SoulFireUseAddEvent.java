package com.teamtop.system.event.useAddEvent.events;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.backstage.events.flowHero.FlowHeroEvent;
import com.teamtop.system.event.useAddEvent.AbsUseAddEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroConst;
import com.teamtop.util.log.LogTool;

public class SoulFireUseAddEvent extends AbsUseAddEvent {

	@Override
	public boolean canUse(Hero hero, int num, int id) {
		return hero.getSoulFire() >= num;
	}

	@Override
	public long use(Hero hero, int num, int id, int reason) {
		long SoulFire = hero.getSoulFire() - num;
		hero.setSoulFire(SoulFire);
		return SoulFire;
	}

	@Override
	public boolean canAdd(Hero hero, int num, int id) {
		return hero.getSoulFire() + num <= HeroConst.MAX_MONEY;
	}

	@Override
	public long add(Hero hero, int num, int id) {
		long temp = hero.getSoulFire() + num;
		if (temp >= HeroConst.MAX_MONEY) {
			temp = HeroConst.MAX_MONEY;
		}
		hero.setSoulFire(temp);
		return hero.getSoulFire();
	}

	@Override
	public void flowRec(Hero hero, int num, int id, boolean add, int reason) {
		try {
			int addFlag = SourceGoodConst.FLOW_OPER_ADD;
			if (!add) {
				addFlag = SourceGoodConst.FLOW_OPER_REDUCE;
			}
			// 魂火流水
			String pf = hero.getLoginPf();
			String usesys = hero.getUsesys();
			FlowHeroEvent.addMoneyFlow(hero.getId(), hero.getLevel(), GameConst.SOULFIRE,
					hero.getSoulFire(), num, reason, hero.getZoneid(), pf, usesys, addFlag,
					hero.getReincarnationLevel());
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), "SilverUseAddEvent flowRec error!");
		}
	}

	@Override
	public void useInsertCode(Hero hero, long num, int id) {
		// TODO Auto-generated method stub

	}

	@Override
	public void addInsertCode(Hero hero, long num, int id) {
		// TODO Auto-generated method stub

	}

	@Override
	public boolean canUseHuobi(Hero hero, long num) {
		return hero.getSoulFire() >= num;
	}

	@Override
	public long addHuobi(Hero hero, long num) {
		hero.setSoulFire(hero.getSoulFire() + num);
		return hero.getSoulFire();
	}

	@Override
	public void flowRecHuobi(Hero hero, long num, boolean add, int reason) {
		try {
			int addFlag = SourceGoodConst.FLOW_OPER_ADD;
			if (!add) {
				addFlag = SourceGoodConst.FLOW_OPER_REDUCE;
			}
			// 魂火流水
			String pf = hero.getLoginPf();
			String usesys = hero.getUsesys();
			FlowHeroEvent.addMoneyFlow(hero.getId(), hero.getLevel(), GameConst.SOULFIRE,
					hero.getSoulFire(), num, reason, hero.getZoneid(), pf, usesys, addFlag,
					hero.getReincarnationLevel());
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), "SoulFireUseAddEvent flowRecHuobi error!");
		}
	}

}
