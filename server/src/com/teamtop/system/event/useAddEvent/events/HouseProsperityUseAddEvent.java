package com.teamtop.system.event.useAddEvent.events;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.backstage.events.flowHero.FlowHeroEvent;
import com.teamtop.system.event.useAddEvent.AbsUseAddEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroConst;
import com.teamtop.system.houseShopTask.HouseShopTaskConst;
import com.teamtop.system.houseShopTask.HouseShopTaskFunction;
import com.teamtop.util.log.LogTool;

public class HouseProsperityUseAddEvent extends AbsUseAddEvent {

	@Override
	public boolean canUse(Hero hero, int num, int id) {
		return hero.getLocalHouse().getProsperity() >= num;
	}

	@Override
	public long use(Hero hero, int num, int id, int reason) {
		long temp = hero.getLocalHouse().getProsperity() - num;
		hero.getLocalHouse().setProsperity(temp);
		return temp;
	}

	@Override
	public boolean canAdd(Hero hero, int num, int id) {
		return hero.getLocalHouse().getProsperity() + num <= HeroConst.MAX_MONEY;
	}

	@Override
	public long add(Hero hero, int num, int id) {
		long temp = hero.getLocalHouse().getProsperity() + num;
		if (temp >= HeroConst.MAX_MONEY) {
			temp = HeroConst.MAX_MONEY;
		}
		hero.getLocalHouse().setProsperity(temp);
		HouseShopTaskFunction.getIns().sccessGoalOneLocal(hero, HouseShopTaskConst.GOAL_TYPE_504, (int)temp);
		return hero.getLocalHouse().getProsperity();
	}

	@Override
	public void flowRec(Hero hero, int num, int id, boolean add, int reason) {
		try {
			int addFlag = SourceGoodConst.FLOW_OPER_ADD;
			if (!add) {
				addFlag = SourceGoodConst.FLOW_OPER_REDUCE;
			}
			// 分享币流水
			String pf = hero.getLoginPf();
			String usesys = hero.getUsesys();
			FlowHeroEvent.addMoneyFlow(hero.getId(), hero.getLevel(), GameConst.HOUSE_PROSPERITY,
					hero.getLocalHouse().getProsperity(), num, reason, hero.getZoneid(), pf, usesys, addFlag,
					hero.getReincarnationLevel());
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), "ProsperityUseAddEvent flowRec error!");
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
		return hero.getLocalHouse().getProsperity() >= num;
	}

	@Override
	public long addHuobi(Hero hero, long num) {
		hero.getLocalHouse().setProsperity(hero.getLocalHouse().getProsperity() + num);
		return hero.getLocalHouse().getProsperity();
	}

	@Override
	public void flowRecHuobi(Hero hero, long num, boolean add, int reason) {
		try {
			int addFlag = SourceGoodConst.FLOW_OPER_ADD;
			if (!add) {
				addFlag = SourceGoodConst.FLOW_OPER_REDUCE;
			}
			// 分享币流水
			String pf = hero.getLoginPf();
			String usesys = hero.getUsesys();
			FlowHeroEvent.addMoneyFlow(hero.getId(), hero.getLevel(), GameConst.HOUSE_PROSPERITY,
					hero.getLocalHouse().getProsperity(), num, reason, hero.getZoneid(), pf, usesys, addFlag,
					hero.getReincarnationLevel());
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), "ProsperityUseAddEvent flowRecHuobi error!");
		}
	}

	@Override
	public long useHuobi(Hero hero, long num, int reason) {
		hero.getLocalHouse().setProsperity(hero.getLocalHouse().getProsperity() - num);
		return hero.getLocalHouse().getProsperity();
	}

}