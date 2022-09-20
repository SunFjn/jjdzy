package com.teamtop.system.crossBoss.model;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.util.db.trans.FieldOrder;

/**
 * 跨服boss所有boss的历史记录
 * @author jjjjyyy
 *
 */
public class CrossBossAllGlobalData {
	/**房间号(minZoneid/20)->跨服boss历史数据 */
//	@FieldOrder(order = 1)
//	private Map<Integer,CrossBossLocalGlobalData> localGlobalData = new ConcurrentHashMap<Integer,  CrossBossLocalGlobalData>();
	/**大分区-》房间号(minZoneid/20)->跨服boss历史数据 */
	@FieldOrder(order = 1)
	private ConcurrentHashMap<Integer,ConcurrentHashMap<Integer,CrossBossLocalGlobalData>> nowGlobalData = new ConcurrentHashMap<Integer,ConcurrentHashMap<Integer, CrossBossLocalGlobalData>>();
	
	public CrossBossAllGlobalData() {
		super();
	}

	public ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, CrossBossLocalGlobalData>> getNowGlobalData() {
		return nowGlobalData;
	}

	public void setNowGlobalData(
			ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, CrossBossLocalGlobalData>> nowGlobalData) {
		this.nowGlobalData = nowGlobalData;
	}

//	public Map<Integer, CrossBossLocalGlobalData> getLocalGlobalData() {
//		return localGlobalData;
//	}

//	public void setLocalGlobalData(Map<Integer, CrossBossLocalGlobalData> localGlobalData) {
//		this.localGlobalData = localGlobalData;
//	}
	

}
