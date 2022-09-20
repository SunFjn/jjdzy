package com.teamtop.util.astar;

import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.system.NPC.NPC;
import com.teamtop.util.cache.union.UC;

public class RobbertCache {
//	private static Logger logger = LoggerFactory.getLogger(RobbertCache.class);
//	private static int robbertMap = 1;
//	private static int makeRouteMap = 2;
	//移动NPC缓存 key1:sceneUid，key2：npcid，value:robbert
	private static ConcurrentHashMap<Long, ConcurrentHashMap<Long,Robbert>> robbertMap = UC.reg("robbertMap", new ConcurrentHashMap<Long, ConcurrentHashMap<Long,Robbert>>());
	//需要生成路径的NPC缓存 key1:sceneUid
	private static ConcurrentHashMap<Long, ConcurrentHashMap<Robbert, Integer>> makeRouteMap = UC.reg("makeRouteMap", new ConcurrentHashMap<Long, ConcurrentHashMap<Robbert, Integer>>());
	
//	static{
		//移动NPC缓存 key1:sceneUid，key2：npcid，value:robbert
		//UC.regCache(SysEnum.ROBBERT, robbertMap, new ConcurrentHashMap<Integer, ConcurrentHashMap<Long,Robbert>>());
		//需要生成路径的NPC缓存 key1:sceneUid
		//UC.regCache(SysEnum.ROBBERT, makeRouteMap, new ConcurrentHashMap<Integer, ConcurrentHashMap<Robbert, Integer>>());
//	}
	/**
	 * 移动NPC缓存 key1:sceneSysId，key2：npcid，value:robbert
	 * @return
	 */
	public static ConcurrentHashMap<Long, ConcurrentHashMap<Long,Robbert>> getRobbertMap(){
		return robbertMap;
	}
	/**
	 * 需要生成路径的NPC缓存 key1:npcUid
	 * @return
	 */
	public static ConcurrentHashMap<Long, ConcurrentHashMap<Robbert, Integer>> getMakeRouteMap(){
		return makeRouteMap;
	}
	public static void addMakeRoute(Robbert robbert){
//		System.err.println("addMakeRoute,id:"+robbert.getId()+",x:"+robbert.getPosX()+",y:"+robbert.getPosY());
		ConcurrentHashMap<Long, ConcurrentHashMap<Robbert, Integer>> makeRouteMap = getMakeRouteMap();
		long sceneUid = robbert.getSceneUnitId();
		ConcurrentHashMap<Robbert, Integer> map = makeRouteMap.get(sceneUid);
		if(map==null){
			map = new ConcurrentHashMap<Robbert, Integer>();
			makeRouteMap.put(sceneUid, map);
		}
		map.put(robbert, 1);
	}
	/**
	 * 添加移动npc
	 * @param robbert
	 * @param useSysId 是否使用场景系统id作为缓存key
	 */
	public static void addRobbert(Robbert robbert,boolean...useSysId){
		ConcurrentHashMap<Long, ConcurrentHashMap<Long,Robbert>> robbertMap = getRobbertMap();
		long sceneUid = robbert.getSceneUnitId();
		if(useSysId != null && useSysId.length>0 && useSysId[0]) 
			sceneUid = robbert.getSceneSysId();
		ConcurrentHashMap<Long, Robbert> data = robbertMap.get(sceneUid);
		if(data==null){
			data = new ConcurrentHashMap<Long, Robbert>();
			robbertMap.putIfAbsent(sceneUid, data);
		}
		data.put(robbert.getId(), robbert);
	}
	/**
	 * 移除移动npc
	 * @param id
	 */
	public static void removeRobbert(NPC npc){
		//logger.info("remove robbert,id:"+npc.getId()+",x:"+npc.getPosX()+",y:"+npc.getPosY());
		ConcurrentHashMap<Long, ConcurrentHashMap<Long,Robbert>> robbertMap = getRobbertMap();
		ConcurrentHashMap<Long, Robbert> data = robbertMap.get(npc.getSceneUnitId());
		if(data!=null){
			data.remove(npc.getId());
		}
	}
	
}
