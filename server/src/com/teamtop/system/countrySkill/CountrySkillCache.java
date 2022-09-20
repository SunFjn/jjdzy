package com.teamtop.system.countrySkill;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossZone;
import com.teamtop.main.RunServerException;
import com.teamtop.system.country.CountryType;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.util.log.LogTool;

import excel.config.Config_gjjn_748;
import excel.struct.Struct_gjjn_748;

public class CountrySkillCache extends AbsServerEvent {
	/** 国家技能表 key:技能类型type，value: **/
	private static Map<Integer, List<Struct_gjjn_748>> configByTypeMap = new HashMap<>();

	/**
	 * 奖励状态,第一层key:国家type,第二层key:技能类型type value:技能id
	 */
	private static Map<Integer, Map<Integer, Integer>> countrySkillByTypeMap = new HashMap<>();
	/**
	 * key:国家type value:国家声望=本国所有玩家的声望值之和(注意：是版本更新后获得的声望值之和，更新前的不算)
	 * 
	 */
	private static Map<Integer, AtomicLong> countryPrestigeByTypeMap;

	/**
	 * 在线和离线经验和铜钱收益，key:国家type,value:[0]:在线小怪经验增加,[1]:在线小怪铜钱增加,[2]:离线每小时经验,[3]:离线每小时铜钱
	 */
	private static Map<Integer, Integer[]> onAndOfflineExpCoinMap = new HashMap<>();

	public static Map<Integer, Integer[]> getOnAndOfflineExpCoinMap() {
		return onAndOfflineExpCoinMap;
	}

	public static Map<Integer, Map<Integer, Integer>> getCountrySkillByTypeMap() {
		return countrySkillByTypeMap;
	}

	public static Map<Integer, AtomicLong> getCountryPrestigeByTypeMap() {
		return countryPrestigeByTypeMap;
	}

	public static Map<Integer, List<Struct_gjjn_748>> getConfigByTypeMap() {
		return configByTypeMap;
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub
		if (CrossZone.isCrossServer()) {
			return;
		}
		String countrySkillMapStr = null;
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.COUNTRYSKILL);
			countrySkillMapStr = globalData.getContent();
			if (countrySkillMapStr == null || countrySkillMapStr.equals("") || countrySkillMapStr.equals("{}")
					|| countrySkillMapStr.equals("null")) {
				initCountrySkillByTypeMap(null);
			} else {
				Map<Integer, Map<Integer, Integer>> map = JSONObject.parseObject(countrySkillMapStr,
						new TypeReference<Map<Integer, Map<Integer, Integer>>>() {
						}.getType());
				initCountrySkillByTypeMap(map);
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, "CountrySkillCache startServer has wrong countrySkillMapStr:" + countrySkillMapStr);
		}
		String countryPrestigeStr = null;
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.COUNTRYPRESTIGE);
			countryPrestigeStr = globalData.getContent();
			if (countryPrestigeStr == null || countryPrestigeStr.equals("") || countryPrestigeStr.equals("{}")
					|| countryPrestigeStr.equals("null")) {
				initCountryPrestigeByTypeMap();
			} else {
				countryPrestigeByTypeMap = JSONObject.parseObject(countryPrestigeStr,
						new TypeReference<Map<Integer, AtomicLong>>() {
						}.getType());

			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, "CountrySkillCache startServer has wrong countryPrestigeStr:" + countryPrestigeStr);
		}
	}

	private void initCountrySkillByTypeMap(Map<Integer, Map<Integer, Integer>> map) {
		CountryType[] types = CountryType.values();
		if (map == null) {
			for (CountryType type : types) {
				int countryType = type.getCountryType();
				Map<Integer, Integer> concurrentHashMap = new ConcurrentHashMap<>();
				countrySkillByTypeMap.put(countryType, concurrentHashMap);
			}
		} else {
			for (CountryType type : types) {
				int countryType = type.getCountryType();
				Map<Integer, Integer> concurrentHashMap = new ConcurrentHashMap<>();
				Map<Integer, Integer> map2 = map.get(countryType);
				concurrentHashMap.putAll(map2);
				countrySkillByTypeMap.put(countryType, concurrentHashMap);
			}
		}
	}

	private void initCountryPrestigeByTypeMap() {
		countryPrestigeByTypeMap = new HashMap<>();
		CountryType[] types = CountryType.values();
		for (CountryType type : types) {
			int countryType = type.getCountryType();
			countryPrestigeByTypeMap.put(countryType, new AtomicLong(0l));
		}
	}

	@Override
	public void shutdownServer() {
		// TODO Auto-generated method stub
		if (CrossZone.isCrossServer()) {
			return;
		}

		String countrySkillMapStr = null;
		try {
			GlobalData globalDataRankData = GlobalCache.getGlobalData(GlobalConst.COUNTRYSKILL);
			countrySkillMapStr = JSON.toJSONString(countrySkillByTypeMap);
			globalDataRankData.setContent(countrySkillMapStr);
			GlobalCache.doSync(globalDataRankData);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, "GodGenSendGiftSysCache shutdownServer rankList has wrong countrySkillMapStr:"
					+ countrySkillMapStr);
		}

		String countryPrestigeStr = null;
		try {
			GlobalData globalDataRankData = GlobalCache.getGlobalData(GlobalConst.COUNTRYPRESTIGE);
			countryPrestigeStr = JSON.toJSONString(countryPrestigeByTypeMap);
			globalDataRankData.setContent(countryPrestigeStr);
			GlobalCache.doSync(globalDataRankData);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this,
					"CountrySkillCache shutdownServer has wrong countryPrestigeStr:" + countryPrestigeStr);
		}
	}

	@Override
	public void initExcel() throws RunServerException {
		// TODO Auto-generated method stub
		configByTypeMap.clear();
		List<Struct_gjjn_748> sortList = Config_gjjn_748.getIns().getSortList();
		int size = sortList.size();
		for (int i = 0; i < size; i++) {
			Struct_gjjn_748 struct_gjjn_748 = sortList.get(i);
			int type = struct_gjjn_748.getWz();
			List<Struct_gjjn_748> list = configByTypeMap.get(type);
			if (list == null) {
				list = new ArrayList<>();
				configByTypeMap.put(type, list);
			}
			list.add(struct_gjjn_748);
		}
		onAndOfflineExpCoinMapInitHandle();
	}

	/**
	 * 在线和离线经验和铜钱收益缓存处理
	 * 
	 * @return
	 */
	public void onAndOfflineExpCoinMapInitHandle() {
		for (Entry<Integer, Map<Integer, Integer>> entry : countrySkillByTypeMap.entrySet()) {
			Integer countryType = entry.getKey();
			Integer[] expCoinArray = onAndOfflineExpCoinMap.get(countryType);
			if (expCoinArray == null) {
				expCoinArray = new Integer[] { 0, 0, 0, 0 };
				onAndOfflineExpCoinMap.put(countryType, expCoinArray);
			}
			Map<Integer, Integer> skillIdMap = entry.getValue();
			int onlineExp = 0;
			int onlineCoin = 0;
			int offlineExp = 0;
			int offlineCoin = 0;
			for (int skillId : skillIdMap.values()) {
				// 所获得的国家技能所有在线离线收益累加
				Struct_gjjn_748 struct_gjjn_748 = Config_gjjn_748.getIns().get(skillId);
				int zxjy = struct_gjjn_748.getZxjy();
				onlineExp += zxjy;
				int zxtq = struct_gjjn_748.getZxtq();
				onlineCoin += zxtq;
				int lxjy = struct_gjjn_748.getLxjy();
				offlineExp += lxjy;
				int lxtq = struct_gjjn_748.getLxtq();
				offlineCoin += lxtq;

			}
			// 在线小怪经验增加
			expCoinArray[0] = onlineExp;
			// 在线小怪铜钱增加
			expCoinArray[1] = onlineCoin;
			// 离线每小时经验
			expCoinArray[2] = offlineExp;
			// 离线每小时铜钱
			expCoinArray[3] = offlineCoin;

		}
	}

}
