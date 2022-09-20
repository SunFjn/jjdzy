package com.teamtop.system.house.yard.event;

import com.teamtop.system.event.sceneEvent.AbsSceneEvent;
import com.teamtop.system.event.sceneEvent.SceneEventFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.scene.Scene;
import com.teamtop.system.scene.SceneFunction;

public class CrossHouseSceneEvent extends AbsSceneEvent {

	private static CrossHouseSceneEvent ins = null;

	public static CrossHouseSceneEvent getIns() {
		if (ins == null) {
			ins = new CrossHouseSceneEvent();
		}
		return ins;
	}

	@Override
	public void in(Hero hero, int newSceneSysId, int newSceneUnitId) {
		SceneEventFunction.changeToStartPoint(hero, newSceneSysId, newSceneUnitId);
	}

	@Override
	public void afterIn(Hero hero) {
		System.out.println("进了");
		hero.getScene();
	}

	@Override
	public int beforeOut(Hero hero) {
		return 0;
	}

	@Override
	public void out(Hero hero) {
		SceneFunction.getIns().delHeroFromScene(hero);
		Scene scene = new Scene();
		scene.setHid(hero.getId());
		hero.setScene(scene);
	}

	@Override
	public boolean afterOffline(Hero hero) {
		return false;
	}

}
