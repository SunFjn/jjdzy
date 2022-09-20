package com.teamtop.system.crossTrial.cross;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.teamtop.cross.upload.CrossHeroBaseModel;
import com.teamtop.main.RunServerException;
import com.teamtop.system.crossTrial.model.FloorFightInfo;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.util.cache.union.UC;

import excel.config.Config_slzd_767;
import excel.struct.Struct_slzd_767;

public class CrossTrialSysCache extends AbsServerEvent {
	
	private static CrossTrialSaveCache cache;

	/**
	 * key:层数， value:<type(1：普通，2：困难，3：噩梦), 战斗信息>
	 */
	private static Map<Integer, Map<Integer, FloorFightInfo>> floorFigthMap = UC.reg("FloorFigthMap", new HashMap<>());

	public static Map<Integer, Long> getStandardMap() {
		return cache.getStandardMap();
	}

	public static void setStandardMap(Map<Integer, Long> standardMap) {
		cache.setStandardMap(standardMap);
	}

	public static Map<Integer, Map<Integer, List<Long>>> getFloorMatchMap() {
		return cache.getFloorMatchMap();
	}

	public static void setFloorMatchMap(Map<Integer, Map<Integer, List<Long>>> floorMatchMap) {
		cache.setFloorMatchMap(floorMatchMap);
	}

	public static Map<Long, CrossHeroBaseModel> getFightMap() {
		return cache.getFightMap();
	}

	public static void setFightMap(Map<Long, CrossHeroBaseModel> fightMap) {
		cache.setFightMap(fightMap);
	}

	public static Map<Integer, Map<Integer, FloorFightInfo>> getFloorFigthMap() {
		return floorFigthMap;
	}

	public static void setFloorFigthMap(Map<Integer, Map<Integer, FloorFightInfo>> floorFigthMap) {
		CrossTrialSysCache.floorFigthMap = floorFigthMap;
	}

	public static long getAverageStrength() {
		return cache.getAverageStrength();
	}

	public static void setAverageStrength(long totalStrength) {
		cache.setAverageStrength(totalStrength);
	}

	public static CrossTrialSaveCache getCache() {
		return cache;
	}

	public static void setCache(CrossTrialSaveCache cache) {
		CrossTrialSysCache.cache = cache;
	}

	@Override
	public void startServer() throws RunServerException {
		GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.CROSS_TRIAL_MATCH);
		String content = globalData.getContent();
		if (content == null || content.equals("") || content.equals("{}")) {
			cache = new CrossTrialSaveCache();
		} else {
			CrossTrialSaveCache tempCache = JSONObject.parseObject(content, CrossTrialSaveCache.class);
			if (tempCache != null) {
				cache = tempCache;
			}
		}
	}

	@Override
	public void shutdownServer() {
		GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.CROSS_TRIAL_MATCH);
		globalData.setContent(JSON.toJSONString(cache));
		GlobalCache.doSync(globalData);
	}

	@Override
	public void initExcel() throws RunServerException {
		List<Struct_slzd_767> fightList = Config_slzd_767.getIns().getSortList();
		int fightSize = fightList.size();
		for (int i = 0; i < fightSize; i++) {
			Struct_slzd_767 struct_slzd_767 = fightList.get(i);
			int id = struct_slzd_767.getId();
			Map<Integer, FloorFightInfo> map = floorFigthMap.get(id);
			if (map == null) {
				map = new HashMap<>();
				floorFigthMap.put(id, map);
			}
			FloorFightInfo fgInfo1 = new FloorFightInfo(id, 1, struct_slzd_767.getPtsld(), struct_slzd_767.getPtslq(),
					struct_slzd_767.getPtqj()[0]);
			map.put(1, fgInfo1);
			FloorFightInfo fgInfo2 = new FloorFightInfo(id, 2, struct_slzd_767.getKnsld(), struct_slzd_767.getKnslq(),
					struct_slzd_767.getKnqj()[0]);
			map.put(2, fgInfo2);
			FloorFightInfo fgInfo3 = new FloorFightInfo(id, 3, struct_slzd_767.getEmsld(), struct_slzd_767.getEmslq(),
					struct_slzd_767.getEmqj()[0]);
			map.put(3, fgInfo3);
		}
	}

}
