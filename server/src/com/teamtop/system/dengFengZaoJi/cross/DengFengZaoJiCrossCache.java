package com.teamtop.system.dengFengZaoJi.cross;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.teamtop.cross.upload.CrossHeroBaseModel;
import com.teamtop.main.RunServerException;
import com.teamtop.system.dengFengZaoJi.model.DengFengZaoJiCrossModel;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.util.cache.union.UC;

public class DengFengZaoJiCrossCache extends AbsServerEvent {
	private static DengFengZaoJiCrossModel cache = new DengFengZaoJiCrossModel();
	
	/**已上传数据的区<区id,排行数>*/
	private static Map<Integer,Integer> zoneidMap = new HashMap<Integer, Integer>();
	/** 战斗对象集合 */
	//private static List<CrossHeroBaseModel> fightList = new ArrayList<CrossHeroBaseModel>();
	private static List<CrossHeroBaseModel> fightList = UC.reg("DengFengZaoJiFigthMap", new ArrayList<CrossHeroBaseModel>());
	
	//每周重置
	public static void reset(int time) {
		int resetTime = cache.getResetTime();
		if(resetTime != time) {
			cache.reset(time);
			DengFengZaoJiCrossCache.zoneidMap.clear();
			DengFengZaoJiCrossCache.fightList.clear();
		}
	}
	
	public static DengFengZaoJiCrossModel getCache() {
		return cache;
	}

	public static void setCache(DengFengZaoJiCrossModel cache) {
		DengFengZaoJiCrossCache.cache = cache;
	}
	

	public static Map<Integer, Integer> getZoneidMap() {
		return zoneidMap;
	}

	public static void setZoneidMap(Map<Integer, Integer> zoneidMap) {
		DengFengZaoJiCrossCache.zoneidMap = zoneidMap;
	}

	public static List<CrossHeroBaseModel> getFightList() {
		return fightList;
	}

	public static void setFightList(List<CrossHeroBaseModel> fightList) {
		DengFengZaoJiCrossCache.fightList = fightList;
	}

	@Override
	public void startServer() throws RunServerException {
		GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.CROSS_DENGFENGZAOJI);
		String content = globalData.getContent();
		if (content == null || content.equals("") || content.equals("{}")) {
			cache = new DengFengZaoJiCrossModel();
		} else {
			DengFengZaoJiCrossModel tempCache = JSONObject.parseObject(content, DengFengZaoJiCrossModel.class);
			if (tempCache != null) {
				cache = tempCache;
			}
		}
	}

	@Override
	public void shutdownServer() {
		GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.CROSS_DENGFENGZAOJI);
		globalData.setContent(JSON.toJSONString(cache));
		GlobalCache.doSync(globalData);
	}

}
