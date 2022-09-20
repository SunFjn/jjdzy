package com.teamtop.system.event.useAddEvent.events;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.backstage.events.flowHero.FlowHeroEvent;
import com.teamtop.system.event.useAddEvent.AbsUseAddEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroConst;
import com.teamtop.system.redBox.RedBox;
import com.teamtop.util.log.LogTool;

public class GoldYuanBaoEvent extends AbsUseAddEvent {

	@Override
	public boolean canUse(Hero hero, int num, int id) {
		return hero.getRedBox().getGoldYuanBao()>=num;
	}

	@Override
	public long use(Hero hero, int num, int id, int reason) {
		RedBox redBox=hero.getRedBox();
		redBox.setGoldYuanBao(redBox.getGoldYuanBao()-num);
		return redBox.getGoldYuanBao();
	}

	@Override
	public boolean canAdd(Hero hero, int num, int id) {
		
		RedBox redBox=hero.getRedBox();
		return redBox.getGoldYuanBao()+num<=HeroConst.MAX_MONEY;
	}

	@Override
	public long add(Hero hero, int num, int id) {
		RedBox redBox=hero.getRedBox();
		
		long temp = redBox.getGoldYuanBao() + num;
		if(temp >= HeroConst.MAX_MONEY){
			temp = HeroConst.MAX_MONEY;
		}
		redBox.setGoldYuanBao(temp);
		return 	redBox.getGoldYuanBao();
	}

	@Override
	public void flowRec(Hero hero, int num, int id, boolean add, int reason) {
		RedBox redBox=hero.getRedBox();
		
		String pf = hero.getLoginPf();
		String usesys = hero.getUsesys();
		int addFlag = SourceGoodConst.FLOW_OPER_ADD;
		if(!add){
			addFlag = SourceGoodConst.FLOW_OPER_REDUCE;
		}
		FlowHeroEvent.addMoneyFlow(hero.getId(), hero.getLevel(), GameConst.GOLDYUANBAO_COIN, redBox.getGoldYuanBao(), num, reason,
				hero.getZoneid(), pf, usesys, addFlag, hero.getReincarnationLevel());
		
		
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
		RedBox redBox=hero.getRedBox();
		return redBox.getGoldYuanBao()>=num;
	}
	
	@Override
	public long useHuobi(Hero hero, long num,int reason) {
		RedBox redBox=hero.getRedBox();
		redBox.setGoldYuanBao(redBox.getGoldYuanBao()-num);
		return redBox.getGoldYuanBao();
	}
	
	@Override
	public boolean canAddHuobi(Hero hero, long num) {
		
		RedBox redBox=hero.getRedBox();
		return redBox.getGoldYuanBao()+num<=HeroConst.MAX_MONEY;
	}
	
	@Override
	public long addHuobi(Hero hero, long num) {
		RedBox redBox=hero.getRedBox();
		
		long temp = redBox.getGoldYuanBao() + num;
		if(temp >= HeroConst.MAX_MONEY){
			temp = HeroConst.MAX_MONEY;
		}
		redBox.setGoldYuanBao(temp);
		return 	redBox.getGoldYuanBao();
	}
	
	@Override
	public void flowRecHuobi(Hero hero, long num, boolean add, int reason) {
		try {
			RedBox redBox=hero.getRedBox();
			
			String pf = hero.getLoginPf();
			String usesys = hero.getUsesys();
			int addFlag = SourceGoodConst.FLOW_OPER_ADD;
			if(!add){
				addFlag = SourceGoodConst.FLOW_OPER_REDUCE;
			}
			FlowHeroEvent.addMoneyFlow(hero.getId(), hero.getLevel(), GameConst.GOLDYUANBAO_COIN, redBox.getGoldYuanBao(), num, reason,
					hero.getZoneid(), pf, usesys, addFlag, hero.getReincarnationLevel());
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), "YuanbaoUseAddEvent flowRecHuobi error!");
		}
	}

}
