package com.teamtop.system.event.useAddEvent.events;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.backstage.events.flowHero.FlowHeroEvent;
import com.teamtop.system.event.useAddEvent.AbsUseAddEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.smelt.SmeltFunction;
import com.teamtop.system.smelt.model.Smelt;
/**
 * 熔炼值流水事件
 * @author lobbyer
 * @date 2017年4月7日
 */
public class RongLuUseAddEvent extends AbsUseAddEvent {

	@Override
	public boolean canUse(Hero hero, int num, int id) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public long use(Hero hero, int num, int id, int reason) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public boolean canAdd(Hero hero, int num, int id) {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public long add(Hero hero, int num, int id) {
		SmeltFunction.getIns().addExp(hero, num);
		Smelt smelt = hero.getSmelt();
		if(smelt != null) return smelt.getExp();
		return 0;
	}

	@Override
	public void flowRec(Hero hero, int num, int id, boolean add, int reason) {
		int addFlag = SourceGoodConst.FLOW_OPER_ADD;
		if(!add){
			addFlag = SourceGoodConst.FLOW_OPER_REDUCE;
		}
		//流水
		Smelt smelt = hero.getSmelt();
		String useSys="";
		useSys=hero.getUsesys();
		FlowHeroEvent.addMoneyFlow(hero.getId(), smelt.getLevel(), GameConst.RONGLIAN, smelt.getExp(), num, reason,
				hero.getZoneid(), hero.getLoginPf(), useSys, addFlag, hero.getReincarnationLevel());
	}

	@Override
	public void useInsertCode(Hero hero, long num, int id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void addInsertCode(Hero hero, long num, int id) {
		// TODO Auto-generated method stub
		
	}

}
