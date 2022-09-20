package com.teamtop.system.event.sceneEvent;

import com.teamtop.system.hero.Hero;
import com.teamtop.system.scene.SceneFunction;

/**
 * 补给地图场景事件
 * @author Administrator
 *
 */
public class SupplySceneEvent extends AbsSceneEvent {
	private static SupplySceneEvent ins = null;
	public static SupplySceneEvent getIns(){
		if(ins==null){
			ins = new SupplySceneEvent();
		}
		return ins;
	}
	@Override
	public int beforeIn(Hero hero, int newSceneSysId) {
		return newSceneSysId;
	}

	@Override
	public void in(Hero hero, int newSceneSysId, int newSceneUnitId) {
		SceneEventFunction.changeToStartPoint(hero, newSceneSysId,newSceneUnitId);
		//SceneEventFunction.changeFromJumpScene(hero, newSceneSysId,newSceneUnitId);
	}
	

	@Override
	public void afterIn(Hero hero) {
	}

	@Override
	public boolean afterOffline(Hero hero) {
		return false;
	}

	@Override
	public int beforeOut(Hero hero) {
		return 0;
	}
	@Override
	public void out(Hero hero) {
		SceneFunction.getIns().delHeroFromScene(hero);
		hero.getScene().setSceneSysId(0);
	}

}
