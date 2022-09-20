package com.teamtop.system.equip.model;

import java.util.HashMap;
import java.util.Map;



/**
 * 神装洗练
 * @author jjjjyyy
 *
 */
public class ShengEquipClear {
	
	private long hid;
	/**
	 * 部位洗练->属性位置 102攻击 103防御  104血量->属性值
	 */
	private Map<Integer, HashMap<Integer, Integer>> clearValues;
	
	public ShengEquipClear() {
		super();
	}
	
	
	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}

	public Map<Integer, HashMap<Integer, Integer>> getClearValues() {
		return clearValues;
	}

	public void setClearValues(Map<Integer, HashMap<Integer, Integer>> clearValues) {
		this.clearValues = clearValues;
	}
	
	
	

}
