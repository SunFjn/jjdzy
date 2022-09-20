package com.teamtop.system.event.useAddEvent.events;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.backstage.events.flowHero.FlowHeroEvent;
import com.teamtop.system.event.useAddEvent.AbsUseAddEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroConst;
import com.teamtop.util.log.LogTool;

/**
 * 星魂使用与获得
 * 
 * @author hzp
 *
 */
public class StarSoulUseAddEvent extends AbsUseAddEvent {

	@Override
	public boolean canUse(Hero hero, int num, int id) {
		return hero.getStarSoul() >= num;
	}

	@Override
	public long use(Hero hero, int num, int id, int reason) {
		long starSoul = hero.getStarSoul() - num;
		hero.setStarSoul(starSoul);
		return starSoul;
	}

	@Override
	public boolean canAdd(Hero hero, int num, int id) {
		return hero.getStarSoul() + num <= HeroConst.MAX_MONEY;
	}

	@Override
	public long add(Hero hero, int num, int id) {
		long temp = hero.getStarSoul() + num;
		if (temp >= HeroConst.MAX_MONEY) {
			temp = HeroConst.MAX_MONEY;
		}
		hero.setStarSoul(temp);
		return hero.getStarSoul();
	}

	@Override
	public void flowRec(Hero hero, int num, int id, boolean add, int reason) {
		try {
			int addFlag = SourceGoodConst.FLOW_OPER_ADD;
			if (!add) {
				addFlag = SourceGoodConst.FLOW_OPER_REDUCE;
			}
			// 星魂流水
			String pf = hero.getLoginPf();
			String usesys = hero.getUsesys();
			FlowHeroEvent.addMoneyFlow(hero.getId(), hero.getLevel(), GameConst.STARSOUL,
					hero.getStarSoul(), num, reason, hero.getZoneid(), pf, usesys, addFlag,
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
		return hero.getStarSoul() >= num;
	}

	@Override
	public long addHuobi(Hero hero, long num) {
		hero.setStarSoul(hero.getStarSoul() + num);
		return hero.getStarSoul();
	}

	@Override
	public void flowRecHuobi(Hero hero, long num, boolean add, int reason) {
		try {
			int addFlag = SourceGoodConst.FLOW_OPER_ADD;
			if (!add) {
				addFlag = SourceGoodConst.FLOW_OPER_REDUCE;
			}
			// 星魂流水
			String pf = hero.getLoginPf();
			String usesys = hero.getUsesys();
			FlowHeroEvent.addMoneyFlow(hero.getId(), hero.getLevel(), GameConst.STARSOUL,
					hero.getStarSoul(), num, reason, hero.getZoneid(), pf, usesys, addFlag,
					hero.getReincarnationLevel());
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), "StarSoulUseAddEvent flowRecHuobi error!");
		}
	}

}
