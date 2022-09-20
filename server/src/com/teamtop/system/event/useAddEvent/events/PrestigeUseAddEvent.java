package com.teamtop.system.event.useAddEvent.events;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.countrySkill.CountrySkillFunction;
import com.teamtop.system.event.backstage.events.flowHero.FlowHeroEvent;
import com.teamtop.system.event.useAddEvent.AbsUseAddEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroConst;
import com.teamtop.util.log.LogTool;

public class PrestigeUseAddEvent extends AbsUseAddEvent {

	@Override
	public boolean canUse(Hero hero, int num, int id) {
		return hero.getPrestige() >= num;
	}

	@Override
	public long use(Hero hero, int num, int id, int reason) {
		long prestige = hero.getPrestige() - num;
		hero.setPrestige(prestige);
		return prestige;
	}

	@Override
	public boolean canAdd(Hero hero, int num, int id) {
		return (hero.getPrestige() + num) <= HeroConst.MAX_MONEY;
	}

	@Override
	public long add(Hero hero, int num, int id) {
		long temp = hero.getPrestige() + num;
		if(temp > HeroConst.MAX_MONEY) {
			temp = HeroConst.MAX_MONEY;
		}
		hero.setPrestige(temp);
		CountrySkillFunction.getIns().addPrestige(hero, num);
		return temp;
	}

	@Override
	public void flowRec(Hero hero, int num, int id, boolean add, int reason) {
		try {
			int addFlag = SourceGoodConst.FLOW_OPER_ADD;
			if (!add) {
				addFlag = SourceGoodConst.FLOW_OPER_REDUCE;
			}
			// 声望流水
			String pf = hero.getLoginPf();
			String usesys = hero.getUsesys();
			FlowHeroEvent.addMoneyFlow(hero.getId(), hero.getLevel(), GameConst.PRESTIGE,
					hero.getPrestige(), num, reason, hero.getZoneid(), pf, usesys, addFlag,
					hero.getReincarnationLevel());
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), "PrestigeUseAddEvent flowRec error!");
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
		return hero.getPrestige() >= num;
	}

	@Override
	public long addHuobi(Hero hero, long num) {
		hero.setPrestige(hero.getPrestige() + num);
		CountrySkillFunction.getIns().addPrestige(hero, (int)num);
		return hero.getPrestige();
	}

	@Override
	public void flowRecHuobi(Hero hero, long num, boolean add, int reason) {
		try {
			int addFlag = SourceGoodConst.FLOW_OPER_ADD;
			if (!add) {
				addFlag = SourceGoodConst.FLOW_OPER_REDUCE;
			}
			// 声望流水
			String pf = hero.getLoginPf();
			String usesys = hero.getUsesys();
			FlowHeroEvent.addMoneyFlow(hero.getId(), hero.getLevel(), GameConst.PRESTIGE,
					hero.getPrestige(), num, reason, hero.getZoneid(), pf, usesys, addFlag,
					hero.getReincarnationLevel());
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), "PrestigeUseAddEvent flowRecHuobi error!");
		}
	}

}
