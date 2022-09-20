package com.teamtop.system.crossDynastyWarriors;

import java.util.HashMap;
import java.util.Map;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossZone;
import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.util.db.trans.ObjStrTransUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

public class DynastyWarriorsSysCache extends AbsServerEvent {
	
	private static Map<Integer, DynastyWarriorsCache> cacheMap = new HashMap<>();

	public static String taskId = "DynastyWarriors_Task";

	public static boolean ACT_OPEN = false;

	public static DynastyWarriorsCache getDynastyWarriorsCache(int partId) {
		return cacheMap.get(partId);
	}

	public static Map<Integer, DynastyWarriorsCache> getCacheMap() {
		return cacheMap;
	}

	public static void setCacheMap(Map<Integer, DynastyWarriorsCache> cacheMap) {
		DynastyWarriorsSysCache.cacheMap = cacheMap;
	}

	@Override
	public void startServer() throws RunServerException {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.DYNASTY_WARRIORS);
			String content = globalData.getContent();
			if (content == null || content.equals("") || content.equals("{}")) {
			} else {
				setCacheMap(ObjStrTransUtil.toObj(content, HashMap.class));
			}
			if (!CrossZone.isCrossServer()) {
				int partId = CrossCache.getlocalPartId();
				if (!cacheMap.containsKey(partId)) {
					DynastyWarriorsCache dwCache = new DynastyWarriorsCache();
					dwCache.setPartId(partId);
					cacheMap.put(partId, dwCache);
				}
			}
			int week = TimeDateUtil.getWeek();
			if (week != 7) {
				DynastyWarriorsSysCache.ACT_OPEN = false;
			} else {
				int currentTime = TimeDateUtil.getCurrentTime();
				int startTime = TimeDateUtil.getOneTime(0, DynastyWarriorsConst.StartTime_Hour,
						DynastyWarriorsConst.StartTime_Minute, 0);
				int endTime = TimeDateUtil.getOneTime(0, DynastyWarriorsConst.StartTime_Hour,
						DynastyWarriorsConst.StartTime_Minute, 0);
				if (currentTime >= startTime && currentTime < endTime) {
					DynastyWarriorsSysCache.ACT_OPEN = true;
				} else {
					DynastyWarriorsSysCache.ACT_OPEN = false;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, DynastyWarriorsSysCache.class, "DynastyWarriorsSysCache startServer");
			throw new RunServerException(e, "");
		}
	}

	@Override
	public void shutdownServer() {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.DYNASTY_WARRIORS);
			globalData.setContent(ObjStrTransUtil.toStr(getCacheMap()));
			GlobalCache.doSync(globalData);
		} catch (Exception e) {
			LogTool.error(e, DynastyWarriorsSysCache.class, "DynastyWarriorsSysCache shutdownServer");
		}
	}

}
