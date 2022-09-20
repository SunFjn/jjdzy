package com.teamtop.system.house.yanhui.event;

import com.teamtop.system.event.sceneEvent.AbsSceneEvent;
import com.teamtop.system.event.sceneEvent.SceneEventFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.scene.Scene;
import com.teamtop.system.scene.SceneConst;
import com.teamtop.system.scene.SceneFunction;

public class YanhuiCrossSceneEvent extends AbsSceneEvent{

	private static YanhuiCrossSceneEvent ins = null;
	public static YanhuiCrossSceneEvent getIns(){
		if(ins==null){
			ins = new YanhuiCrossSceneEvent();
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
	}
	
	@Override
	public void afterIn(Hero hero) {
		Scene scene=hero.getScene();
		if (scene.getSceneType() == SceneConst.YANHUI) {
			//YanhuiCrossFunction.getIns().inCrossScene(hero);
		}
	}

	@Override
	public int beforeOut(Hero hero) {
		
		return 0;
	}

	@Override
	public void out(Hero hero) {
		SceneFunction.getIns().delHeroFromScene(hero);
		Scene scene=new Scene();
		scene.setHid(hero.getId());
		hero.setScene(scene);
	}

	@Override
	public boolean afterOffline(Hero hero) {
		return false;
	}


}
