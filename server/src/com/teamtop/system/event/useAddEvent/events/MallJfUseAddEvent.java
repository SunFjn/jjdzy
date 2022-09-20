package com.teamtop.system.event.useAddEvent.events;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.backstage.events.flowHero.FlowHeroEvent;
import com.teamtop.system.event.useAddEvent.AbsUseAddEvent;
import com.teamtop.system.hero.Hero;

/**
 * 商城积分使用和获得事件 
 *
 */
public class MallJfUseAddEvent extends AbsUseAddEvent{
	
	@Override
	public boolean canUse(Hero hero, int num, int id) {
		return hero.getMallJf()>=num;
	}

	@Override
	public long use(Hero hero, int num, int id, int reason) {
		hero.setMallJf(hero.getMallJf()-num);
		return hero.getMallJf();
	}

	@Override
	public boolean canAdd(Hero hero, int num, int id) {
		return hero.getMallJf()+num<=Integer.MAX_VALUE;
	}

	@Override
	public long add(Hero hero, int num, int id) {
		int temp = hero.getMallJf() + num;
		hero.setMallJf(temp);
		return hero.getMallJf();
	}
	
	
	@Override
	public void flowRec(Hero hero, int num, int id, boolean add, int reason) {
		int addFlag = SourceGoodConst.FLOW_OPER_ADD;
		if(!add){
			addFlag = SourceGoodConst.FLOW_OPER_REDUCE;
		}
		String usesys = hero.getUsesys();
		//流水
		FlowHeroEvent.addMoneyFlow(hero.getId(), hero.getLevel(), GameConst.MALLJF, hero.getMallJf(), num, reason,
				hero.getZoneid(), hero.getLoginPf(), usesys, addFlag, hero.getReincarnationLevel());
	}

	@Override
	public void useInsertCode(Hero hero, long num, int id) {
		
	}

	@Override
	public void addInsertCode(Hero hero, long num, int id) {
		
	}
	
	@Override
	public boolean canUseHuobi(Hero hero, long num) {
		return hero.getMallJf()>=num;
	}
	
}
