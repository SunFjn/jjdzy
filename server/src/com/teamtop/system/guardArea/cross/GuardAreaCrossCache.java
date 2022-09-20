package com.teamtop.system.guardArea.cross;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossPartCache;
import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.guardArea.model.GuardArea;
import com.teamtop.system.guardArea.model.GuardAreaDao;
import com.teamtop.util.cache.union.UC;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

public class GuardAreaCrossCache extends AbsServerEvent {
	/** 所有个人信息 */
	public static Map<Integer, ConcurrentHashMap<Long, GuardArea>> allGuardAreaCache = UC.reg("GuardAreaCache",
			new HashMap<>());
	/** 定时保存数据时间 */
	public static int LastSaveTime;

	@Override
	public void startServer() throws RunServerException {
		try {
			LastSaveTime = TimeDateUtil.getCurrentTime();
			for (int partId : CrossPartCache.getPartMap().keySet()) {
				ConcurrentHashMap<Long, GuardArea> allGuardArea = allGuardAreaCache.get(partId);
				if (allGuardArea == null) {
					allGuardArea = new ConcurrentHashMap<>();
					allGuardAreaCache.put(partId, allGuardArea);
				}
			}

			List<GuardArea> findAllData = GuardAreaDao.getIns().findAllData();
			if (findAllData != null) {
				for (int i = 0; i < findAllData.size(); i++) {
					GuardArea data = findAllData.get(i);
					if (data.getBelongZoneid() == 0) {
						// 跳过无效数据
						continue;
					}
					int partId = CrossCache.getPartId(data.getBelongZoneid());
					ConcurrentHashMap<Long, GuardArea> allGuardArea = allGuardAreaCache.get(partId);
					if (allGuardArea == null) {
						allGuardArea = new ConcurrentHashMap<>();
						allGuardAreaCache.put(partId, allGuardArea);
					}
					allGuardArea.put(data.getHid(), data);
					// 检查状态
					GuardAreaCrossFunction.getIns().checkCityInfo(data);
				}
			}

		} catch (Exception e) {
			LogTool.error(e, GuardAreaCrossCache.class, "startServer has wrong");
		}
	}

	@Override
	public void shutdownServer() {
		try {
			ConcurrentHashMap<Long, GuardArea> allGuardAreaMap = new ConcurrentHashMap<>();
			Iterator<ConcurrentHashMap<Long, GuardArea>> iterator = allGuardAreaCache.values().iterator();
			for (; iterator.hasNext();) {
				ConcurrentHashMap<Long, GuardArea> map = iterator.next();
				if (map != null) {
					allGuardAreaMap.putAll(map);
				}
			}
			GuardAreaDao.getIns().updateDataBatch(allGuardAreaMap.values());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
