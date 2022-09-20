package com.teamtop.system.event.useAddEvent.events;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.backstage.events.flowHero.FlowHeroEvent;
import com.teamtop.system.event.useAddEvent.AbsUseAddEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.promotion.PromotionFunction;
import com.teamtop.system.promotion.PromotionTaskType;

/**
 * 战功/功勋使用和获得事件 
 *
 */
public class ZhanGongUseAddEvent extends AbsUseAddEvent{
	
	@Override
	public boolean canUse(Hero hero, int num, int id) {
		return hero.getZhanGong()>=num;
	}

	@Override
	public long use(Hero hero, int num, int id, int reason) {
		hero.setZhanGong(hero.getZhanGong()-num);
		return hero.getZhanGong();
	}

	@Override
	public boolean canAdd(Hero hero, int num, int id) {
		return hero.getZhanGong()+num<=Integer.MAX_VALUE;
	}

	@Override
	public long add(Hero hero, int num, int id) {
		int temp = hero.getZhanGong() + num;
		hero.setZhanGong(temp);
		PromotionFunction.getIns().updatePromotionTask(hero.getId(), PromotionTaskType.ZHANGONG, null);
		return hero.getZhanGong();
	}
	
	
	@Override
	public void flowRec(Hero hero, int num, int id, boolean add, int reason) {
		int addFlag = SourceGoodConst.FLOW_OPER_ADD;
		if(!add){
			addFlag = SourceGoodConst.FLOW_OPER_REDUCE;
		}
		//流水
		FlowHeroEvent.addMoneyFlow(hero.getId(), hero.getLevel(), GameConst.ZHANGONG, hero.getZhanGong(), num, reason,
				hero.getZoneid(), hero.getLoginPf(), hero.getUsesys(), addFlag, hero.getReincarnationLevel());
	}

	@Override
	public void useInsertCode(Hero hero, long num, int id) {
		
	}

	@Override
	public void addInsertCode(Hero hero, long num, int id) {
		
	}
	
	@Override
	public boolean canUseHuobi(Hero hero, long num) {
		return hero.getZhanGong()>=num;
	}
	
}
