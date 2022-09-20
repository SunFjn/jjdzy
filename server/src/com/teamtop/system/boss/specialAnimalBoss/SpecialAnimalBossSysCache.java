package com.teamtop.system.boss.specialAnimalBoss;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentSkipListSet;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.teamtop.main.RunServerException;
import com.teamtop.system.boss.specialAnimalBoss.model.BossKillerInfo;
import com.teamtop.system.boss.specialAnimalBoss.model.PersonalChallengeInfo;
import com.teamtop.system.boss.specialAnimalBoss.model.SpecialAnimalBossRank;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.util.time.TimeDateUtil;

public class SpecialAnimalBossSysCache extends AbsServerEvent {

	private static SpecialAnimalBossCache cache;

	private static Map<Long, PersonalChallengeInfo> personalMap = new HashMap<>();

	public static ConcurrentHashMap<Integer, BossKillerInfo> getBossKillerMap() {
		return cache.getBossKillerMap();
	}

	public static Map<Long, PersonalChallengeInfo> getPersonalMap() {
		return personalMap;
	}

	public static void setPersonalMap(Map<Long, PersonalChallengeInfo> personalMap) {
		SpecialAnimalBossSysCache.personalMap = personalMap;
	}

	public static ConcurrentSkipListSet<SpecialAnimalBossRank> getPassRank() {
		return cache.getPassRank();
	}

	public static int getPubWeekRestTime() {
		return cache.getWeekResetTime();
	}

	public static void setPubWeekRestTime(int weekResetTime) {
		cache.setWeekResetTime(weekResetTime);
	}

	@Override
	public void startServer() throws RunServerException {
		GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.SPECIALANIMAL_BOSS);
		String content = globalData.getContent();
		if (content == null || content.equals("") || content.equals("{}")) {

		} else {
			cache = JSONObject.parseObject(content, SpecialAnimalBossCache.class);
		}
		if (cache == null) {
			cache = new SpecialAnimalBossCache();
		}
		int weekResetTime = cache.getWeekResetTime();
		if(weekResetTime==0) {
			int mondayZeroTime = TimeDateUtil.getMondayZeroTime();
			cache.setWeekResetTime(mondayZeroTime);
		}
	}

	@Override
	public void shutdownServer() {
		GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.SPECIALANIMAL_BOSS);
		globalData.setContent(JSON.toJSONString(cache));
		GlobalCache.doSync(globalData);
	}

}
