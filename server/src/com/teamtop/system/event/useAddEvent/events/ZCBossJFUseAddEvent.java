package com.teamtop.system.event.useAddEvent.events;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.backstage.events.backstage.roleInfo.B_RoleInfoFunction;
import com.teamtop.system.event.backstage.events.flowHero.FlowHeroEvent;
import com.teamtop.system.event.useAddEvent.AbsUseAddEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroConst;
import com.teamtop.system.shop.ShopFunction;
import com.teamtop.util.log.LogTool;
/**
 * 战场boss
 * @author jjjjyyy
 *
 */
public class ZCBossJFUseAddEvent extends AbsUseAddEvent{

	@Override
	public boolean canUse(Hero hero, int num, int id) {
		// TODO Auto-generated method stub
		return hero.getZcBossJf()>=num;
	}

	@Override
	public long use(Hero hero, int num, int id, int reason) {
		long leftnum=hero.getZcBossJf()-num;
		if (leftnum<0) {
			leftnum=0;
		}
		hero.setZcBossJf(leftnum);
		return hero.getZcBossJf();
	}

	@Override
	public boolean canAdd(Hero hero, int num, int id) {
		// TODO Auto-generated method stub
		return hero.getZcBossJf()+num<=HeroConst.MAX_MONEY;
	}

	@Override
	public long add(Hero hero, int num, int id) {
		long temp = hero.getZcBossJf() + num;
		if(temp >= HeroConst.MAX_MONEY){
			temp = HeroConst.MAX_MONEY;
		}
		hero.setZcBossJf(temp);
		return hero.getZcBossJf();
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
			FlowHeroEvent.addMoneyFlow(hero.getId(), hero.getLevel(), GameConst.ZCBOSSJF, hero.getZcBossJf(), num,
					reason, hero.getZoneid(), pf, usesys, addFlag, hero.getReincarnationLevel());
			B_RoleInfoFunction.getIns().addM_RoleInfo(hero);
			// 战场商城红点
			ShopFunction.getIns().checkRedPoint(hero, false);
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), "zcBossJfUseAddEvent flowRec error!");
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
		long destinynum=hero.getZcBossJf()-num;
		if (destinynum<0) {
			destinynum=0;
		}
		hero.setZcBossJf(destinynum);
		return hero.getZcBossJf();
	}
	
	
	@Override
	public boolean canAddHuobi(Hero hero, long num) {
		return hero.getZcBossJf()+num<=HeroConst.MAX_MONEY;
	}
	
	@Override
	public long addHuobi(Hero hero, long num) {
		hero.setZcBossJf(hero.getZcBossJf()+num);
		return hero.getZcBossJf();
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
			FlowHeroEvent.addMoneyFlow(hero.getId(), hero.getLevel(), GameConst.ZCBOSSJF, hero.getDestinyExp(), num,
					reason, hero.getZoneid(), pf, usesys, addFlag, hero.getReincarnationLevel());
			//角色表数据
			B_RoleInfoFunction.getIns().addM_RoleInfo(hero);
			// 战场商城红点
			ShopFunction.getIns().checkRedPoint(hero, false);
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), "zcBossUseAddEvent flowRecHuobi error!");
		}
	}

}
