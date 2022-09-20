package com.teamtop.system.event.useAddEvent.events;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.ativitys.achievementTree.AchievementTreeEnum;
import com.teamtop.system.activity.ativitys.achievementTree.AchievementTreeFunction;
import com.teamtop.system.event.backstage.events.backstage.roleInfo.B_RoleInfoFunction;
import com.teamtop.system.event.backstage.events.flowHero.FlowHeroEvent;
import com.teamtop.system.event.useAddEvent.AbsUseAddEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroConst;
import com.teamtop.util.log.LogTool;
/**
 * 符文经验
 * @author jjjjyyy
 *
 */
public class DestinyUseAddEvent extends AbsUseAddEvent{

	@Override
	public boolean canUse(Hero hero, int num, int id) {
		return hero.getDestinyExp()>=num;
	}

	@Override
	public long use(Hero hero, int num, int id, int reason) {
		long leftnum=hero.getDestinyExp()-num;
		if (leftnum<0) {
			leftnum=0;
		}
		hero.setDestinyExp(leftnum);
		return hero.getDestinyExp();

	}

	@Override
	public boolean canAdd(Hero hero, int num, int id) {
		// TODO Auto-generated method stub
		return hero.getDestinyExp()+num<=HeroConst.MAX_MONEY;
	}

	@Override
	public long add(Hero hero, int num, int id) {
		long temp = hero.getDestinyExp() + num;
		if(temp >= HeroConst.MAX_MONEY){
			temp = HeroConst.MAX_MONEY;
		}
		hero.setDestinyExp(temp);
		// 成就树
		AchievementTreeFunction.getIns().checkTask(hero, AchievementTreeEnum.TASK_29, (int) num, 0);
		return hero.getDestinyExp();
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
			FlowHeroEvent.addMoneyFlow(hero.getId(), hero.getLevel(), GameConst.DESTINYEXP, hero.getDestinyExp(), num,
					reason, hero.getZoneid(), pf, usesys, addFlag, hero.getReincarnationLevel());
			B_RoleInfoFunction.getIns().addM_RoleInfo(hero);
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), "DestinyUseAddEvent flowRec error!");
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
		long destinynum=hero.getDestinyExp()-num;
		if (destinynum<0) {
			destinynum=0;
		}
		hero.setDestinyExp(destinynum);
		return hero.getDestinyExp();
	}
	
	
	@Override
	public boolean canAddHuobi(Hero hero, long num) {
		return hero.getDestinyExp()+num<=HeroConst.MAX_MONEY;
	}
	
	@Override
	public long addHuobi(Hero hero, long num) {
		hero.setDestinyExp(hero.getDestinyExp()+num);
		return hero.getDestinyExp();
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
			FlowHeroEvent.addMoneyFlow(hero.getId(), hero.getLevel(), GameConst.DESTINYEXP, hero.getDestinyExp(), num,
					reason, hero.getZoneid(), pf, usesys, addFlag, hero.getReincarnationLevel());
			//角色表数据
			B_RoleInfoFunction.getIns().addM_RoleInfo(hero);
		} catch (Exception e) {
			LogTool.error(e, hero.getId(), "DestinyUseAddEvent flowRecHuobi error!");
		}
	}

}
