package com.teamtop.system.zcBoss;

import java.util.HashMap;
import java.util.Map;

import com.teamtop.system.event.sceneEvent.AbsSceneEvent;
import com.teamtop.system.event.sceneEvent.SceneEventFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.scene.Scene;
import com.teamtop.system.scene.SceneConst;
import com.teamtop.system.scene.SceneFunction;
import com.teamtop.system.scene.SceneXData;

public class ZcBossScene  extends AbsSceneEvent {
	
	private static ZcBossScene ins = null;
	public static ZcBossScene getIns(){
		if(ins==null){
			ins = new ZcBossScene();
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
		if (scene.getSceneType()==SceneConst.ZCBOSS||scene.getSceneType()==SceneConst.CROSS_ZCBOSS) {
			ZcBossJoiner zcBossJoiner=null;
			if (ZcBossLocalCache.getIns().getZcBossJoinersMap().containsKey(hero.getId())) {
				zcBossJoiner=ZcBossLocalCache.getIns().getZcBossJoinersMap().get(hero.getId());
			}
			if (zcBossJoiner!=null) {
				Map<Object,Object> datas = new HashMap<Object, Object>(2);
				datas.put(SceneXData.nowHp, zcBossJoiner.getHp());//当前气血
				datas.put(SceneXData.maxHp, hero.getFinalFightAttr().getHpMax());//最大气血
				SceneFunction.getIns().boardcastNewState(hero, datas, false);
			}
		}
	}

	@Override
	public int beforeOut(Hero hero) {
		
		return 0;
	}

	@Override
	public void out(Hero hero) {
		ZcBossHeroSender.sendCmd_4464(hero.getId(), 0);
	}

	@Override
	public boolean afterOffline(Hero hero) {
		return false;
	}

}
