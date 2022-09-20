package com.teamtop.system.zcBoss.cross;

import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.scene.SceneCache;
import com.teamtop.system.zcBoss.ZcBoss;
import com.teamtop.system.zcBoss.ZcBossJoiner;
import com.teamtop.util.log.LogTool;

public class ZcBossCrossCache  extends AbsServerEvent{

	public static ZcBossCrossCache ins;
	
	public static synchronized ZcBossCrossCache getIns() {
		if(ins == null){
			ins = new ZcBossCrossCache();
		}
		return ins;
	}
	
	/**
	 * 在副本里面的玩家，key:副本序号,value:角色id
	 */
	private Map<Integer, Map<Integer, List<Long>>> pCrossInnerRolesMap = new HashMap<>();
	/**
	 * 已经刷新了boss副本
	 */
	private Map<Integer, ConcurrentHashMap<Integer, ZcBoss>> pCrossZcbossMap = new HashMap<Integer, ConcurrentHashMap<Integer, ZcBoss>>();
     /**
      * key:副本序号value:场景唯一id
      */
	private Map<Integer, Map<Integer, Integer>> pCrossSceneUnitId2SysId = new HashMap<Integer, Map<Integer, Integer>>();
	/**
	 * key:玩家id 战场boss参与者
	 */
	private Map<Integer, ConcurrentHashMap<Long, ZcBossJoiner>> pCrossZcBossJoinersMap = new HashMap<Integer, ConcurrentHashMap<Long, ZcBossJoiner>>();
	
	public void initCache(ZcBoss trra, int partId) {
		ConcurrentHashMap<Integer, ZcBoss> crossZcbossMap = pCrossZcbossMap.get(partId);
		if (crossZcbossMap == null) {
			crossZcbossMap = new ConcurrentHashMap<>();
			pCrossZcbossMap.put(partId, crossZcbossMap);
		}
		crossZcbossMap.put(trra.getIndex(), trra);
		// 生成场景唯一Id
		int sceneUnitId = SceneCache.getSceneUnitId();
		Map<Integer, Integer> sceneMap = pCrossSceneUnitId2SysId.get(partId);
		if (sceneMap == null) {
			sceneMap = new HashMap<>();
			pCrossSceneUnitId2SysId.put(partId, sceneMap);
		}
		sceneMap.put(trra.getIndex(), sceneUnitId);
		trra.setSceneUnitId(sceneUnitId);
		Map<Integer, List<Long>> crossInnerRolesMap = pCrossInnerRolesMap.get(partId);
		if (crossInnerRolesMap == null) {
			crossInnerRolesMap = new HashMap<>();
			pCrossInnerRolesMap.put(partId, crossInnerRolesMap);
		}
		ConcurrentHashMap<Long, ZcBossJoiner> joinerMap = pCrossZcBossJoinersMap.get(partId);
		if(joinerMap == null) {
			joinerMap = new ConcurrentHashMap<>();
			pCrossZcBossJoinersMap.put(partId, joinerMap);
		}
		crossInnerRolesMap.put(trra.getIndex(),  Collections.synchronizedList(new LinkedList<Long>()));
	}



	public int getBossSceneUnitId(int sceneSysId, int partId) {
		return this.pCrossSceneUnitId2SysId.get(partId).get(sceneSysId);
	}

	public void addEnterRole(long rid, int serialNumber, int partId) {
		Map<Integer, List<Long>> crossInnerRolesMap = pCrossInnerRolesMap.get(partId);
		List<Long> list = crossInnerRolesMap.get(serialNumber);
		if (list == null) {
			list = Collections.synchronizedList(new LinkedList<Long>());
			crossInnerRolesMap.put(serialNumber, list);
		}
		if (!list.contains(rid)) {
			list.add(rid);
		}
	}

	public void removeEnterRole(long rid, int serialNumber, int partId) {
		Map<Integer, List<Long>> crossInnerRolesMap = pCrossInnerRolesMap.get(partId);
		List<Long> list = crossInnerRolesMap.get(serialNumber);
		if (list != null) {
			if (list.contains(rid)) {
				list.remove(rid);
			}
		}
	}

	public ZcBoss getZcBossByIndex(int index, int partId) {
		Map<Integer, ZcBoss> map = pCrossZcbossMap.get(partId);
		if (map == null) {
			return null;
		}
		return map.get(index);
	}

	public List<Long> getInnerRoles(int index, int partId) {
		Map<Integer, List<Long>> map = pCrossInnerRolesMap.get(partId);
		return map.get(index);
	}


	public ConcurrentHashMap<Integer, ZcBoss> getBossMap(int partId) {
		return pCrossZcbossMap.get(partId);
	}

	public ConcurrentHashMap<Long, ZcBossJoiner> getZcBossJoinersMap(int partId) {
		return pCrossZcBossJoinersMap.get(partId);
	}

	public void setZcBossJoinersMap(ConcurrentHashMap<Long, ZcBossJoiner> zcBossJoinersMap, int partId) {
		this.pCrossZcBossJoinersMap.put(partId, zcBossJoinersMap);
	}



	@Override
	public void startServer() throws RunServerException {
//		try {
//			ZcBossCrossFunction.getIns().initCrossZcBoss();
//		} catch (Exception e) {
//			LogTool.error(e, ZcBossCrossCache.class, "ZcBossCrossCache startServer has wrong");
//		}
		
	}
	
	@Override
	public void initExcel() throws RunServerException {
		try {
			ZcBossCrossFunction.getIns().initCrossZcBoss();
		} catch (Exception e) {
			LogTool.error(e, ZcBossCrossCache.class, "ZcBossCrossCache startServer has wrong");
			throw e;
		}
	}

}
