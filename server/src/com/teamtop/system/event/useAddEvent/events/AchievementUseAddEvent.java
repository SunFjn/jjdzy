package com.teamtop.system.event.useAddEvent.events;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.achievement.model.Achievement;
import com.teamtop.system.event.backstage.events.flowHero.FlowHeroEvent;
import com.teamtop.system.event.useAddEvent.AbsUseAddEvent;
import com.teamtop.system.hero.Hero;

/**
 * 成就币流水事件
 * 
 */
public class AchievementUseAddEvent extends AbsUseAddEvent {

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
		Achievement achievement = hero.getAchievement();
		if (achievement != null) {
			int goalPoint = achievement.getGoalPoint();
			int temp = goalPoint + num;
			if (temp >= Integer.MAX_VALUE) {
				return false;
			}
			return true;
		}
		return false;
	}

	@Override
	public long add(Hero hero, int num, int id) {
		Achievement achievement = hero.getAchievement();
		if (achievement != null) {
			int goalPoint = achievement.getGoalPoint();
			int temp = goalPoint + num;
			if (temp >= Integer.MAX_VALUE) {
				temp = Integer.MAX_VALUE;
			}
			achievement.setGoalPoint(temp);
			return achievement.getGoalPoint();
		}
		return 0;
	}

	@Override
	public void flowRec(Hero hero, int num, int id, boolean add, int reason) {
		int addFlag = SourceGoodConst.FLOW_OPER_ADD;
		if(!add){
			addFlag = SourceGoodConst.FLOW_OPER_REDUCE;
		}
		// 成就币流水
		String pf = hero.getLoginPf();
		String usesys = hero.getUsesys();
		FlowHeroEvent.addMoneyFlow(hero.getId(), hero.getLevel(), GameConst.ACHIEVEMENT_COIN,
				hero.getAchievement().getGoalPoint(), num,
				reason, hero.getZoneid(), pf, usesys, addFlag, hero.getReincarnationLevel());
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
