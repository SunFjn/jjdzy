package com.teamtop.system.event.useAddEvent.events;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.backstage.events.flowHero.FlowHeroEvent;
import com.teamtop.system.event.useAddEvent.AbsUseAddEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;

/**
 * 经验使用与获得
 * @author hepl
 *
 */
public class ExpUseAddEvent extends AbsUseAddEvent {

	public boolean canUse(Hero hero, int num, int id) {
		if(hero.getExp() < num){
			return false;
		}
		return true;
	}

	@Override
	public long use(Hero hero, int num, int id, int reason) {
		hero.setExp(hero.getExp() - num);
		return hero.getExp();
	}

	@Override
	public boolean canAdd(Hero hero, int num, int id) {
		return true;
	}

	@Override
	public long add(Hero hero, int num, int id) {
		HeroFunction.getIns().addHeroExp(hero, num);
		return hero.getExp();
	}

	@Override
	public void flowRec(Hero hero, int num, int id, boolean add, int reason) {
		int addFlag = SourceGoodConst.FLOW_OPER_ADD;
		if(!add){
			addFlag = SourceGoodConst.FLOW_OPER_REDUCE;
		}
		//经验流水
		FlowHeroEvent.addExpFlow(hero.getId(), hero.getLevel(), hero.getRebornlv(), hero.getExp(), num, reason,
				hero.getZoneid(), hero.getLoginPf(), hero.getUsesys(), addFlag, hero.getReincarnationLevel());
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
		if(hero.getExp() < num){
			return false;
		}
		return true;
	}
	
	@Override
	public long useHuobi(Hero hero, long num,int reason) {
		hero.setExp(hero.getExp() - num);
		return hero.getExp();
	}
	
	@Override
	public boolean canAddHuobi(Hero hero, long num) {
		return true;
	}
	
	@Override
	public long addHuobi(Hero hero, long num) {
		HeroFunction.getIns().addHeroExp(hero, num);
		return hero.getExp();
	}
	
	@Override
	public void flowRecHuobi(Hero hero, long num, boolean add, int reason) {
		int addFlag = SourceGoodConst.FLOW_OPER_ADD;
		if(!add){
			addFlag = SourceGoodConst.FLOW_OPER_REDUCE;
		}
		if (hero==null) {
			return;
		}
		//经验流水
		FlowHeroEvent.addExpFlow(hero.getId(), hero.getLevel(), hero.getRebornlv(), hero.getExp(), num, reason,
				hero.getZoneid(), hero.getLoginPf(), hero.getUsesys(), addFlag, hero.getReincarnationLevel());
	}
}
