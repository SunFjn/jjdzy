package com.teamtop.system.event.useAddEvent.events;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.backstage.events.flowHero.FlowHeroEvent;
import com.teamtop.system.event.useAddEvent.AbsUseAddEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroConst;
import com.teamtop.util.log.LogTool;

public class HonorCoinUseAddEvent  extends AbsUseAddEvent {

	@Override
	public boolean canUse(Hero hero, int num, int id) {
		return hero.getGuardAreaLocal().getHonorCoin() >= num;
	}

	@Override
	public long use(Hero hero, int num, int id, int reason) {
		long SoulFire = hero.getGuardAreaLocal().getHonorCoin() - num;
		hero.getGuardAreaLocal().setHonorCoin(SoulFire);
		return SoulFire;
	}

	@Override
	public boolean canAdd(Hero hero, int num, int id) {
		return hero.getGuardAreaLocal().getHonorCoin() + num <= HeroConst.MAX_MONEY;
	}

	@Override
	public long add(Hero hero, int num, int id) {
		long temp = hero.getGuardAreaLocal().getHonorCoin() + num;
		if (temp >= HeroConst.MAX_MONEY) {
			temp = HeroConst.MAX_MONEY;
		}
		hero.getGuardAreaLocal().setHonorCoin(temp);
		return hero.getGuardAreaLocal().getHonorCoin();
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
			FlowHeroEvent.addMoneyFlow(hero.getId(), hero.getLevel(), GameConst.HONOR_COIN,
					hero.getGuardAreaLocal().getHonorCoin(), num, reason, hero.getZoneid(), pf, usesys, addFlag,
					hero.getReincarnationLevel());
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), "HonorCoinUseAddEvent flowRec error!");
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
		return hero.getGuardAreaLocal().getHonorCoin() >= num;
	}

	@Override
	public long addHuobi(Hero hero, long num) {
		hero.getGuardAreaLocal().setHonorCoin(hero.getGuardAreaLocal().getHonorCoin() + num);
		return hero.getGuardAreaLocal().getHonorCoin();
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
			FlowHeroEvent.addMoneyFlow(hero.getId(), hero.getLevel(), GameConst.HONOR_COIN,
					hero.getGuardAreaLocal().getHonorCoin(), num, reason, hero.getZoneid(), pf, usesys, addFlag,
					hero.getReincarnationLevel());
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), "HonorCoinUseAddEvent flowRecHuobi error!");
		}
	}

}