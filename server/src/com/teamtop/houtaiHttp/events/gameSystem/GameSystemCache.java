package com.teamtop.houtaiHttp.events.gameSystem;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;

public class GameSystemCache extends AbsServerEvent {

	/**
	 * key:pf,value:<key:系统id,value:开关状态>
	 */
	private static Map<String, ConcurrentHashMap<Integer, Integer>> systemSwichtMap = new HashMap<>();

	private static ConcurrentHashMap<Integer, Integer> localSystemSwichtMap = new ConcurrentHashMap<>();

	public static Map<String, ConcurrentHashMap<Integer, Integer>> getSystemSwichtMap() {
		return systemSwichtMap;
	}

	public static void setSystemSwichtMap(Map<String, ConcurrentHashMap<Integer, Integer>> systemSwichtMap) {
		GameSystemCache.systemSwichtMap = systemSwichtMap;
	}

	public static ConcurrentHashMap<Integer, Integer> getLocalSystemSwichtMap() {
		return localSystemSwichtMap;
	}

	public static void setLocalSystemSwichtMap(ConcurrentHashMap<Integer, Integer> localSystemSwichtMap) {
		GameSystemCache.localSystemSwichtMap = localSystemSwichtMap;
	}

	public static boolean checkForbid(int sysId) {
		if (localSystemSwichtMap.containsKey(sysId)) {
			return true;
		}
		return false;
	}

	@Override
	public void startServer() throws RunServerException {
		GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.CROSS_GAME_SYSTEM_SWITCH);
		String content = globalData.getContent();
		if (content == null || content.equals("") || content.equals("{}")) {

		} else {
			Type type = new TypeReference<Map<String, ConcurrentHashMap<Integer, Integer>>>() {
			}.getType();
			Map<String, ConcurrentHashMap<Integer, Integer>> map = JSONObject.parseObject(content, type);
			if (map != null) {
				systemSwichtMap = map;
			}
		}
	}

	@Override
	public void shutdownServer() {
		GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.CROSS_GAME_SYSTEM_SWITCH);
		globalData.setContent(JSON.toJSONString(systemSwichtMap));
		GlobalCache.doSync(globalData);
	}

}
