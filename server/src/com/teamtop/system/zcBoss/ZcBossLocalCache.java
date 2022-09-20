package com.teamtop.system.zcBoss;

import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.scene.SceneCache;
import com.teamtop.util.log.LogTool;


public class ZcBossLocalCache extends AbsServerEvent{
	
	public static ZcBossLocalCache ins;
	
	public static synchronized ZcBossLocalCache getIns() {
		if(ins == null){
			ins = new ZcBossLocalCache();
		}
		return ins;
	}
	
	/**
	 * 在副本里面的玩家，key:副本序号,value:角色id
	 */
	private ConcurrentHashMap<Integer, List<Long>> innerRolesMap = new ConcurrentHashMap<Integer, List<Long>>();

	/**
	 * 已经刷新了boss副本
	 */
	private ConcurrentHashMap<Integer, ZcBoss> bossMap = new ConcurrentHashMap<Integer, ZcBoss>();
     /**
      * key:副本序号value:场景唯一id
      */
	private HashMap<Integer, Integer> sceneUnitId2SysId = new HashMap<Integer, Integer>();
	/**
	 * key:玩家id 战场boss参与者
	 */
	private ConcurrentHashMap<Long, ZcBossJoiner> zcBossJoinersMap=new ConcurrentHashMap<Long, ZcBossJoiner>();
	/**
	 * 跨服战场boss
	 */
	private ConcurrentHashMap<Integer, ZcBoss> crossZcBossMap=new ConcurrentHashMap<Integer, ZcBoss>();
	
	
	public void initCache(ZcBoss trra){
		bossMap.put(trra.getIndex(), trra);
		// 生成场景唯一Id
		int sceneUnitId = SceneCache.getSceneUnitId();
		sceneUnitId2SysId.put(trra.getIndex(),sceneUnitId);
		trra.setSceneUnitId(sceneUnitId);
		innerRolesMap.put(trra.getIndex(),  Collections.synchronizedList(new LinkedList<Long>()));
	}


	public ConcurrentHashMap<Integer, ZcBoss> getCrossZcBossMap() {
		return crossZcBossMap;
	}

	public void setCrossZcBossMap(ConcurrentHashMap<Integer, ZcBoss> crossZcBossMap) {
		this.crossZcBossMap = crossZcBossMap;
	}


	public int getBossSceneUnitId(int sceneSysId) {
		return this.sceneUnitId2SysId.get(sceneSysId);
	}

	public void addEnterRole(long rid, int serialNumber) {
		List<Long> list = innerRolesMap.get(serialNumber);
		if (list == null) {
			list = Collections.synchronizedList(new LinkedList<Long>());
			innerRolesMap.put(serialNumber, list);
		}
		if (!list.contains(rid)) {
			list.add(rid);
		}
	}

	public void removeEnterRole(long rid, int serialNumber) {
		List<Long> list = innerRolesMap.get(serialNumber);
		if (list != null) {
			if (list.contains(rid)) {
				list.remove(rid);
			}
		}
	}

	public ZcBoss getTreasureRaider(int serialNumber) {
		return bossMap.get(serialNumber);
	}

	public List<Long> getInnerRoles(int serialNumber) {
		return innerRolesMap.get(serialNumber);
	}


	public ConcurrentHashMap<Integer, ZcBoss> getBossMap() {
		return bossMap;
	}

	public ConcurrentHashMap<Long, ZcBossJoiner> getZcBossJoinersMap() {
		return zcBossJoinersMap;
	}

	public void setZcBossJoinersMap(ConcurrentHashMap<Long, ZcBossJoiner> zcBossJoinersMap) {
		this.zcBossJoinersMap = zcBossJoinersMap;
	}



	@Override
	public void startServer() throws RunServerException {
		try {
			ZcBossFunction.getIns().initBoss();
		} catch (Exception e) {
			LogTool.error(e, ZcBossLocalCache.class, "ZcBossLocalCache startServer has wrong");
		}
		
	}

	
	
	
	
}
