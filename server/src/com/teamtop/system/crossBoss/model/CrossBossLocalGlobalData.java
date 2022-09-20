package com.teamtop.system.crossBoss.model;

import java.util.Map;
import java.util.Set;
import java.util.TreeSet;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.util.db.trans.FieldOrder;

/**
 * 子服跨服boss历史记录
 * @author jjjjyyy
 *
 */
public class CrossBossLocalGlobalData {
	@FieldOrder(order = 1)
	private Map<Integer, ZSBossHis> bossHisMapByBossid=new ConcurrentHashMap<Integer, ZSBossHis>();
	@FieldOrder(order = 2)
	private Set<Integer> zoneids = new TreeSet<>();
	
	public CrossBossLocalGlobalData() {
		super();
	}

	public Map<Integer, ZSBossHis> getBossHisMapByBossid() {
		return bossHisMapByBossid;
	}

	public void setBossHisMapByBossid(Map<Integer, ZSBossHis> bossHisMapByBossid) {
		this.bossHisMapByBossid = bossHisMapByBossid;
	}

	public Set<Integer> getZoneids() {
		return zoneids;
	}

	public void setZoneids(Set<Integer> zoneids) {
		this.zoneids = zoneids;
	}
	

}
