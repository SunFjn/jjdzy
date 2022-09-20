package com.teamtop.system.event.useAddEvent.events;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.backstage.events.backstage.roleInfo.B_RoleInfoFunction;
import com.teamtop.system.event.backstage.events.flowHero.FlowHeroEvent;
import com.teamtop.system.event.useAddEvent.AbsUseAddEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroConst;
import com.teamtop.util.log.LogTool;

public class SixWayYinJiUseAddEvent extends AbsUseAddEvent {

	@Override
	public boolean canUse(Hero hero, int num, int id) {
		return hero.getHeroCurrencies().getSixyinji()>=num;
	}

	@Override
	public long use(Hero hero, int num, int id, int reason) {
		long leftnum=hero.getHeroCurrencies().getSixyinji()-num;
		if (leftnum<0) {
			leftnum=0;
		}
		hero.getHeroCurrencies().setSixyinji(leftnum);
		return hero.getHeroCurrencies().getSixyinji();

	}

	@Override
	public boolean canAdd(Hero hero, int num, int id) {
		// TODO Auto-generated method stub
		return hero.getHeroCurrencies().getSixyinji()+num<=HeroConst.MAX_MONEY;
	}

	@Override
	public long add(Hero hero, int num, int id) {
		long temp = hero.getHeroCurrencies().getSixyinji() + num;
		if(temp >= HeroConst.MAX_MONEY){
			temp = HeroConst.MAX_MONEY;
		}
		hero.getHeroCurrencies().setSixyinji(temp);
		return hero.getHeroCurrencies().getSixyinji();
	}

	@Override
	public void flowRec(Hero hero, int num, int id, boolean add, int reason) {
		try {
			//元宝流水
			String pf = hero.getLoginPf();
			String usesys = hero.getUsesys();
			int addFlag = SourceGoodConst.FLOW_OPER_ADD;
			if(!add){
				addFlag = SourceGoodConst.FLOW_OPER_REDUCE;
				
			}
			FlowHeroEvent.addMoneyFlow(hero.getId(), hero.getLevel(), GameConst.SIXWAYYINJI, hero.getHeroCurrencies().getSixyinji(), num,
					reason, hero.getZoneid(), pf, usesys, addFlag, hero.getReincarnationLevel());
			B_RoleInfoFunction.getIns().addM_RoleInfo(hero);
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), "SixWayYinJiUseEvent flowRec error!");
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
	public long useHuobi(Hero hero, long num,int reason) {
		long sixyinyinum=hero.getHeroCurrencies().getSixyinji()-num;
		if (sixyinyinum<0) {
			sixyinyinum=0;
		}
		hero.getHeroCurrencies().setSixyinji(sixyinyinum);
		return hero.getHeroCurrencies().getSixyinji();
	}
	
	
	@Override
	public boolean canAddHuobi(Hero hero, long num) {
		return hero.getHeroCurrencies().getSixyinji()+num<=HeroConst.MAX_MONEY;
	}
	
	@Override
	public long addHuobi(Hero hero, long num) {
		hero.getHeroCurrencies().setSixyinji(hero.getHeroCurrencies().getSixyinji()+num);
		return hero.getHeroCurrencies().getSixyinji();
	}
	
	@Override
	public void flowRecHuobi(Hero hero, long num, boolean add, int reason) {
		try {
			//元宝流水
			String pf = hero.getLoginPf();
			String usesys = hero.getUsesys();
			int addFlag = SourceGoodConst.FLOW_OPER_ADD;
			if(!add){
				addFlag = SourceGoodConst.FLOW_OPER_REDUCE;
			}
			FlowHeroEvent.addMoneyFlow(hero.getId(), hero.getLevel(), GameConst.SIXWAYYINJI, hero.getHeroCurrencies().getSixyinji(), num,
					reason, hero.getZoneid(), pf, usesys, addFlag, hero.getReincarnationLevel());
			//角色表数据
			B_RoleInfoFunction.getIns().addM_RoleInfo(hero);
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), "sixwayyinjiUseAddEvent flowRecHuobi error!");
		}
	}
}
