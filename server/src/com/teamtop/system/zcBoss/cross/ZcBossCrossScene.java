package com.teamtop.system.zcBoss.cross;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.system.event.sceneEvent.AbsSceneEvent;
import com.teamtop.system.event.sceneEvent.SceneEventFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.scene.Scene;
import com.teamtop.system.scene.SceneConst;
import com.teamtop.system.scene.SceneFunction;
import com.teamtop.system.scene.SceneXData;
import com.teamtop.system.zcBoss.ZcBossHeroSender;
import com.teamtop.system.zcBoss.ZcBossJoiner;
import com.teamtop.system.zcBoss.ZcBossLocalCache;

public class ZcBossCrossScene extends AbsSceneEvent{

	private static ZcBossCrossScene ins = null;
	public static ZcBossCrossScene getIns(){
		if(ins==null){
			ins = new ZcBossCrossScene();
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
			int zoneid = hero.getZoneid();
			int partId = CrossCache.getPartId(zoneid);
			ConcurrentHashMap<Long, ZcBossJoiner> zcBossJoinersMap = ZcBossCrossCache.getIns().getZcBossJoinersMap(partId);
			if(zcBossJoinersMap==null) {
				zcBossJoinersMap = new ConcurrentHashMap<Long, ZcBossJoiner>();
				ZcBossCrossCache.getIns().setZcBossJoinersMap(zcBossJoinersMap, partId);
			}
			if (zcBossJoinersMap.containsKey(hero.getId())) {
				zcBossJoiner = zcBossJoinersMap.get(hero.getId());
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
		SceneFunction.getIns().delHeroFromScene(hero);
		Scene scene=new Scene();
		scene.setHid(hero.getId());
		hero.setScene(scene);
		ZcBossHeroSender.sendCmd_4464(hero.getId(), 0);
	}

	@Override
	public boolean afterOffline(Hero hero) {
		return false;
	}


}
