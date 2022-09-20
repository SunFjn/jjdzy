package com.teamtop.system.crossAttackCity.cross;

import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.main.RunServerException;
import com.teamtop.system.crossAttackCity.model.AttackCity;
import com.teamtop.system.crossAttackCity.model.AttackCityDao;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.cache.union.UC;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_gcbz_777;
import excel.struct.Struct_gcbz_777;

public class AttackCityCrossCache extends AbsServerEvent {
	/** 所有城池信息 key城池id value城池信息 */
	public static ConcurrentHashMap<Integer, AttackCity> allAttackCityCache = UC.reg("AttackCityCache",
			new ConcurrentHashMap<>());
	/** 定时保存数据时间 */
	public static int LastSaveTime;

	@Override
	public void startServer() throws RunServerException {
		try {
			LastSaveTime = TimeDateUtil.getCurrentTime();

			for (Struct_gcbz_777 config : Config_gcbz_777.getIns().getSortList()) {
				AttackCity attackCity = new AttackCity();
				attackCity.setCityId(config.getTgs());
				attackCity.setCityInfoMap(new ConcurrentHashMap<>());
				allAttackCityCache.put(config.getTgs(), attackCity);
			}

			List<AttackCity> findAllData = AttackCityDao.getIns().findAllData();
			if (findAllData != null) {
				for (int i = 0; i < findAllData.size(); i++) {
					AttackCity data = findAllData.get(i);
					allAttackCityCache.put(data.getCityId(), data);
					// 检查状态
					AttackCityCrossFunction.getIns().checkCityInfo(data);
				}
			}

		} catch (Exception e) {
			LogTool.error(e, AttackCityCrossCache.class, "startServer has wrong");
		}
	}

	@Override
	public void shutdownServer() {
		try {
			ConcurrentHashMap<Integer, AttackCity> allAttackCityMap = new ConcurrentHashMap<>();

			ConcurrentHashMap<Integer, AttackCity> map = allAttackCityCache;
				if (map != null) {
					allAttackCityMap.putAll(map);
				}

			AttackCityDao.getIns().updateDataBatch(allAttackCityMap.values());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static ConcurrentHashMap<Integer, AttackCity> getAllAttackCityCache() {
		return allAttackCityCache;
	}

	public static void setAllAttackCityCache(ConcurrentHashMap<Integer, AttackCity> allAttackCityCache) {
		AttackCityCrossCache.allAttackCityCache = allAttackCityCache;
	}

	public static int getLastSaveTime() {
		return LastSaveTime;
	}

	public static void setLastSaveTime(int lastSaveTime) {
		LastSaveTime = lastSaveTime;
	}

}
