package com.teamtop.system.openDaysSystem.saintMonsterWashRank;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.system.openDaysSystem.saintMonsterWashRank.cross.CrossSaintMonsterWashRankCache;
import com.teamtop.system.openDaysSystem.saintMonsterWashRank.model.SaintMonsterWashRankModel;
import com.teamtop.util.log.LogTool;

public class SaintMonsterWashRankCache extends AbsServerEvent {

	/** 排名奖励 key partId value 排名数据 */
	private static Map<Integer, List<SaintMonsterWashRankModel>> rankMap = new HashMap<>();

	/** 结束时间 */
	public static Map<Integer, Integer> endTimeMap = new HashMap<>();

	public static Map<Integer, Integer> getEndTimeMap() {
		return endTimeMap;
	}

	public static void setEndTimeMap(Map<Integer, Integer> endTimeMap) {
		SaintMonsterWashRankCache.endTimeMap = endTimeMap;
	}

	public static Map<Integer, List<SaintMonsterWashRankModel>> getRankMap() {
		return rankMap;
	}

	public static void setRankMap(Map<Integer, List<SaintMonsterWashRankModel>> rankMap) {
		SaintMonsterWashRankCache.rankMap = rankMap;
	}

	@Override
	public void initExcel() throws RunServerException {

	}

	@Override
	public void startServer() throws RunServerException {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.SAINT_MONSTER_WASH_RANK);
			String content = globalData.getContent();
			if (content == null || content.equals("") || content.equals("{}")) {
			} else {
				Type type = new TypeReference<Map<Integer, List<SaintMonsterWashRankModel>>>() {
				}.getType();
				Map<Integer, List<SaintMonsterWashRankModel>> rank = JSONObject.parseObject(content, type);
				setRankMap(rank);
			}
		} catch (Exception e) {
			LogTool.error(e, CrossSaintMonsterWashRankCache.class, "CrossSaintMonsterWashRankCache startServer wrong");
			throw new RunServerException(e, "");
		}

		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.SAINT_MONSTER_WASH_RANK_ENDTIME);
			String content = globalData.getContent();
			if (content == null || content.equals("") || content.equals("{}")) {
			} else {
				Type type = new TypeReference<Map<Integer, Integer>>() {
				}.getType();
				Map<Integer, Integer> endtimeMap = JSONObject.parseObject(content, type);
				setEndTimeMap(endtimeMap);
			}
		} catch (Exception e) {
			LogTool.error(e, CrossSaintMonsterWashRankCache.class, "CrossSaintMonsterWashRankCache startServer wrong");
			throw new RunServerException(e, "");
		}
	}

	@Override
	public void shutdownServer() {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.SAINT_MONSTER_WASH_RANK);
			globalData.setContent(JSON.toJSONString(rankMap));
			GlobalCache.doSync(globalData);
		} catch (Exception e) {
			LogTool.error(e, CrossSaintMonsterWashRankCache.class,
					"CrossSaintMonsterWashRankCache shutdownServer wrong");
		}
		
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.SAINT_MONSTER_WASH_RANK_ENDTIME);
			globalData.setContent(JSON.toJSONString(endTimeMap));
			GlobalCache.doSync(globalData);
		} catch (Exception e) {
			LogTool.error(e, CrossSaintMonsterWashRankCache.class,
					"CrossSaintMonsterWashRankCache shutdownServer wrong");
		}
	}

}
