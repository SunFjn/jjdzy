package com.teamtop.system.boss.qmboss;

import java.util.List;
import java.util.Map;

import com.teamtop.util.db.trans.FieldOrder;

/**
 * 全民boss 排行数据
 * @author Administrator
 *
 */
public class QMBossDB {
	@FieldOrder(order = 1)
	/**
	 * 击杀boss数据记录 key：boss编号，value：击杀记录
	 */
	private Map<Integer,List<QMBossKillModel>> killList;

	public Map<Integer, List<QMBossKillModel>> getKillList() {
		return killList;
	}

	public void setKillList(Map<Integer, List<QMBossKillModel>> killList) {
		this.killList = killList;
	}
	
}
