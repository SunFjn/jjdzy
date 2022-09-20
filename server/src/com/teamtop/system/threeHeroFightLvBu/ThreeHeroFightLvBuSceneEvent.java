package com.teamtop.system.threeHeroFightLvBu;

import com.teamtop.system.event.sceneEvent.AbsSceneEvent;
import com.teamtop.system.event.sceneEvent.SceneEventFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.team.TeamCache;
import com.teamtop.system.threeHeroFightLvBu.model.TeamChaInfo;

public class ThreeHeroFightLvBuSceneEvent extends AbsSceneEvent {

	private static ThreeHeroFightLvBuSceneEvent ins;

	private ThreeHeroFightLvBuSceneEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized ThreeHeroFightLvBuSceneEvent getIns() {
		if (ins == null) {
			ins = new ThreeHeroFightLvBuSceneEvent();
		}
		return ins;
	}

	@Override
	public int beforeIn(Hero hero, int newSceneSysId) {
		Integer teamId = TeamCache.getHidToTeamIDMap().get(hero.getId());
		if (teamId != null) {
			TeamChaInfo teamChaInfo = ThreeHeroFightLvBuSysCache.getTeamChaMap().get(teamId);
			int sceneUnitId = teamChaInfo.getSceneUnitId();
			return sceneUnitId;
		}
		return -1;
	}

	@Override
	public void in(Hero hero, int newSceneSysId, int newSceneUnitId) {
		SceneEventFunction.changeToStartPoint(hero, newSceneSysId, newSceneUnitId);
	}

	@Override
	public int beforeOut(Hero hero) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public void out(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public boolean afterOffline(Hero hero) {
		// TODO Auto-generated method stub
		return false;
	}

}
