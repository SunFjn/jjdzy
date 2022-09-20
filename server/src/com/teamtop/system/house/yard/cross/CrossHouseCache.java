package com.teamtop.system.house.yard.cross;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossPartCache;
import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.house.yard.model.CrossHouse;
import com.teamtop.system.house.yard.model.CrossHouseDao;
import com.teamtop.system.house.yard.model.GoldRecord;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.cache.union.UC;
import com.teamtop.util.excel.ExcelJsonUtils;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_fddc_019;
import excel.struct.Struct_fddc_019;

public class CrossHouseCache extends AbsServerEvent {
	/** 所有个人的府邸 */
	public static Map<Integer, ConcurrentHashMap<Long, CrossHouse>> pAllCrossHouseCache = UC.reg("allCrossHouse",
			new HashMap<>());
	/** 定时保存数据时间 */
	public static int LastSaveTime;
	/** 抽奖用 key:府邸档次 **/
	public static Map<Integer, List<ProbabilityEventModel>> dcMap = new HashMap<>();
	/** 所有个人的金库被偷记录 */
	public static Map<Integer, ConcurrentHashMap<Long, List<GoldRecord>>> pAllGoldRecordCache = UC.reg("allGoldRecord",
			new HashMap<>());
	/** 所有个人的天工炉被借记录 */
	public static Map<Integer, ConcurrentHashMap<Long, List<GoldRecord>>> pAllTGLRecordCache = UC.reg("allTGLRecord",
			new HashMap<>());
	/** 定时排名时间 */
	public static int LastZeroTime;

	@Override
	public void startServer() throws RunServerException {
		try {
			LastSaveTime = TimeDateUtil.getCurrentTime();
			LastZeroTime = TimeDateUtil.getTomorrowZeroTimeReturnInt();
			for (int partId : CrossPartCache.getPartMap().keySet()) {
				ConcurrentHashMap<Long, CrossHouse> allCrossHouseCache = pAllCrossHouseCache.get(partId);
				if (allCrossHouseCache == null) {
					allCrossHouseCache = new ConcurrentHashMap<>();
					pAllCrossHouseCache.put(partId, allCrossHouseCache);
				}

				ConcurrentHashMap<Long, List<GoldRecord>> allGoldRecordCache = pAllGoldRecordCache.get(partId);
				if (allGoldRecordCache == null) {
					allGoldRecordCache = new ConcurrentHashMap<>();
					pAllGoldRecordCache.put(partId, allGoldRecordCache);
				}

				ConcurrentHashMap<Long, List<GoldRecord>> allTGLRecordCache = pAllTGLRecordCache.get(partId);
				if (allTGLRecordCache == null) {
					allTGLRecordCache = new ConcurrentHashMap<>();
					pAllTGLRecordCache.put(partId, allTGLRecordCache);
				}
			}
			List<CrossHouse> findAllData = CrossHouseDao.getIns().findAllData();
			if (findAllData != null) {
				for (int i = 0; i < findAllData.size(); i++) {
					CrossHouse cHouse = findAllData.get(i);
					if (cHouse.getHid() == 1) {
						// 第一条数据
						continue;
					}
					int partId = CrossCache.getPartId(cHouse.getBelongZoneid());
					ConcurrentHashMap<Long, CrossHouse> allCrossHouseCache = pAllCrossHouseCache.get(partId);
					if (allCrossHouseCache == null) {
						allCrossHouseCache = new ConcurrentHashMap<>();
						pAllCrossHouseCache.put(partId, allCrossHouseCache);
					}
					allCrossHouseCache.put(cHouse.getHid(), cHouse);
					CrossHouseFunction.getIns().updateHouseRank(cHouse,true);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public void initExcel() throws RunServerException {
		dcMap.clear();
		for (Struct_fddc_019 dcCfg : Config_fddc_019.getIns().getSortList()) {
			List<ProbabilityEventModel> list = ExcelJsonUtils.getGeneralDropData(dcCfg.getTgljc());
			dcMap.put(dcCfg.getDangci(), list);
		}
	}

	@Override
	public void shutdownServer() {
		try {
			ConcurrentHashMap<Long, CrossHouse> allCrossHouseCache = new ConcurrentHashMap<>();
			Iterator<ConcurrentHashMap<Long, CrossHouse>> iterator = pAllCrossHouseCache.values().iterator();
			for (; iterator.hasNext();) {
				ConcurrentHashMap<Long, CrossHouse> map = iterator.next();
				if (map != null) {
					allCrossHouseCache.putAll(map);
				}
			}
			CrossHouseDao.getIns().updateBatch(allCrossHouseCache.values());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
