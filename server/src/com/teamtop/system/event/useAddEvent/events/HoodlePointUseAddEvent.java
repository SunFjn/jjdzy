package com.teamtop.system.event.useAddEvent.events;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.backstage.events.flowHero.FlowHeroEvent;
import com.teamtop.system.event.useAddEvent.AbsUseAddEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroConst;
import com.teamtop.util.log.LogTool;

public class HoodlePointUseAddEvent extends AbsUseAddEvent {

	@Override
	public boolean canUse(Hero hero, int num, int id) {
		return hero.getHeroCurrencies().getHoodlePoint() >= num;
	}

	@Override
	public long use(Hero hero, int num, int id, int reason) {
		long hoodlePoint = hero.getHeroCurrencies().getHoodlePoint() - num;
		hero.getHeroCurrencies().setHoodlePoint(hoodlePoint);
		return hoodlePoint;
	}

	@Override
	public boolean canAdd(Hero hero, int num, int id) {
		return hero.getHeroCurrencies().getHoodlePoint() + num <= HeroConst.MAX_MONEY;
	}

	@Override
	public long add(Hero hero, int num, int id) {
		long temp = hero.getHeroCurrencies().getHoodlePoint() + num;
		if (temp >= HeroConst.MAX_MONEY) {
			temp = HeroConst.MAX_MONEY;
		}
		hero.getHeroCurrencies().setHoodlePoint(temp);
		return hero.getHeroCurrencies().getHoodlePoint();
	}

	@Override
	public void flowRec(Hero hero, int num, int id, boolean add, int reason) {
		try {
			int addFlag = SourceGoodConst.FLOW_OPER_ADD;
			if (!add) {
				addFlag = SourceGoodConst.FLOW_OPER_REDUCE;
			}
			// 积分流水
			String pf = hero.getLoginPf();
			String usesys = hero.getUsesys();
			FlowHeroEvent.addMoneyFlow(hero.getId(), hero.getLevel(), GameConst.HOODLE_POINT,
					hero.getHeroCurrencies().getHoodlePoint(), num, reason, hero.getZoneid(), pf, usesys, addFlag,
					hero.getReincarnationLevel());
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), "HoodlePointUseAddEvent flowRec error!");
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
		return hero.getHeroCurrencies().getHoodlePoint() >= num;
	}

	@Override
	public long addHuobi(Hero hero, long num) {
		hero.getHeroCurrencies().setHoodlePoint(hero.getHeroCurrencies().getHoodlePoint() + num);
		return hero.getHeroCurrencies().getHoodlePoint();
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
			FlowHeroEvent.addMoneyFlow(hero.getId(), hero.getLevel(), GameConst.HOODLE_POINT,
					hero.getHeroCurrencies().getHoodlePoint(), num, reason, hero.getZoneid(), pf, usesys, addFlag,
					hero.getReincarnationLevel());
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), "HoodlePointUseAddEvent flowRecHuobi error!");
		}
	}

}
