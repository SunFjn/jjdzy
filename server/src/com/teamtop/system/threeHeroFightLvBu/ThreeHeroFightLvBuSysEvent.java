package com.teamtop.system.threeHeroFightLvBu;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.system.team.TeamCache;
import com.teamtop.system.team.TeamFunction;
import com.teamtop.system.threeHeroFightLvBu.model.TeamChaInfo;
import com.teamtop.system.threeHeroFightLvBu.model.ThreeHeroFightLvBu;

import excel.config.Config_xtcs_004;

public class ThreeHeroFightLvBuSysEvent extends AbsSystemEvent{

	private static ThreeHeroFightLvBuSysEvent ins;

	private ThreeHeroFightLvBuSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized ThreeHeroFightLvBuSysEvent getIns() {
		if (ins == null) {
			ins = new ThreeHeroFightLvBuSysEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		ThreeHeroFightLvBu threeHeroFightLvBu = hero.getThreeHeroFightLvBu();
		if(threeHeroFightLvBu==null) {
			threeHeroFightLvBu = new ThreeHeroFightLvBu();
			int freeChaNum = Config_xtcs_004.getIns().get(ThreeHeroFightLvBuConst.FREE_CHA_ID).getNum();
			int reliveNum = Config_xtcs_004.getIns().get(ThreeHeroFightLvBuConst.RELIVE_NUM_ID).getNum();
			threeHeroFightLvBu.setChaNum(freeChaNum);
			threeHeroFightLvBu.setHardType(1);
			hero.setThreeHeroFightLvBu(threeHeroFightLvBu);
		} else {
			if (threeHeroFightLvBu.getHardType() == 0) {
				threeHeroFightLvBu.setHardType(1);
			}
		}
	}

	@Override
	public void login(Hero hero) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.THREE_HERO_FIGHT_LVBU)) {
			return;
		}
		boolean checkRedPoint = ThreeHeroFightLvBuFunction.getIns().checkRedPoint(hero);
		if (checkRedPoint) {
			RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.THREE_HERO_FIGHT_LVBU, RedPointConst.RED_1,
					RedPointConst.HAS_RED);
		}
	}

	@Override
	public void logout(Hero hero) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.THREE_HERO_FIGHT_LVBU)) {
			return;
		}
		Integer teamId = TeamCache.getHidToTeamIDMap().get(hero.getId());
		if (teamId == null) {
			// 没有队伍
			return;
		}
		TeamChaInfo teamChaInfo = ThreeHeroFightLvBuSysCache.getTeamChaMap().get(teamId);
		if(teamChaInfo!=null) {			
			ThreeHeroFightLvBuManager.getIns().exitCha(hero);
		}else {
			TeamFunction.getIns().leaveAndModifyTeamData(teamId, hero.getId());
		}
	}

	@Override
	public void loginReset(Hero hero, int now) {
		dailyRest(hero, now);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		dailyRest(hero, now);
	}

	public void dailyRest(Hero hero, int now) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.THREE_HERO_FIGHT_LVBU)) {
			return;
		}
		ThreeHeroFightLvBu threeHeroFightLvBu = hero.getThreeHeroFightLvBu();
		int freeChaNum = Config_xtcs_004.getIns().get(ThreeHeroFightLvBuConst.FREE_CHA_ID).getNum();
		int chaNum = threeHeroFightLvBu.getChaNum();
		if (chaNum < freeChaNum) {
			threeHeroFightLvBu.setChaNum(freeChaNum);
		}
		threeHeroFightLvBu.setBuyNum(0);
	}

}
