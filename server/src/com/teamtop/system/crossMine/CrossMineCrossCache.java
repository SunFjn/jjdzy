package com.teamtop.system.crossMine;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossPartCache;
import com.teamtop.main.RunServerException;
import com.teamtop.system.crossMine.model.CrossMine;
import com.teamtop.system.crossMine.model.CrossMineDao;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.cache.union.UC;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

public class CrossMineCrossCache extends AbsServerEvent {
	/** 所有个人的矿 */
	public static Map<Integer, ConcurrentHashMap<Long, CrossMine>> pAllCrossMineCache = UC.reg("sdf", new HashMap<>());
	/** 定时保存数据时间 */
	public static int LastSaveTime;

	@Override
	public void startServer() throws RunServerException {
		try {
			LastSaveTime = TimeDateUtil.getCurrentTime();
			for(int partId : CrossPartCache.getPartMap().keySet()) {
				ConcurrentHashMap<Long, CrossMine> allCrossMineCache = pAllCrossMineCache.get(partId);
				if(allCrossMineCache == null) {
					allCrossMineCache = new ConcurrentHashMap<>();
					pAllCrossMineCache.put(partId, allCrossMineCache);
				}
			}
			List<CrossMine> findAllCrossMineData = CrossMineDao.getIns().findAllCrossMineData();
			if (findAllCrossMineData != null) {
				for (int i = 0; i < findAllCrossMineData.size(); i++) {
					CrossMine crossMine = findAllCrossMineData.get(i);
					int partId = CrossCache.getPartId(crossMine.getBelongZoneid());
					ConcurrentHashMap<Long, CrossMine> allCrossMineCache = pAllCrossMineCache.get(partId);
					if(allCrossMineCache == null) {
						allCrossMineCache = new ConcurrentHashMap<>();
						pAllCrossMineCache.put(partId, allCrossMineCache);
					}
					crossMine.setNeedSave(false);
					allCrossMineCache.put(crossMine.getHid(), crossMine);
				}
				CrossMineFunction.getIns().checkMines();
			}
		} catch (Exception e) {
			LogTool.error(e, CrossMineCrossCache.class, "startServer has wrong");
		}
	}

	@Override
	public void shutdownServer() {
		try {
			ConcurrentHashMap<Long, CrossMine> allCrossMineCache = new ConcurrentHashMap<>();
			Iterator<ConcurrentHashMap<Long, CrossMine>> iterator = pAllCrossMineCache.values().iterator();
			for(;iterator.hasNext();) {
				ConcurrentHashMap<Long, CrossMine> map = iterator.next();
				if(map != null) {					
					allCrossMineCache.putAll(map);
				}
			}
			CrossMineDao.getIns().updateCrossMineBatch(allCrossMineCache.values());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
