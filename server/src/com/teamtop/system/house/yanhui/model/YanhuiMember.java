package com.teamtop.system.house.yanhui.model;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import com.teamtop.util.db.trans.FieldOrder;

public class YanhuiMember {
	@FieldOrder(order = 1)
	private long hid;
	
	/**
	 * 玩家名称
	 */
	@FieldOrder(order = 2)
	private String name;
	
	/**
	 * 礼物类型
	 */
	@FieldOrder(order = 3)
	private int type;
	
	/**
	 * 已经击杀过得战场boss
	 */
	@FieldOrder(order = 4)
	private Set<Integer> hasKill;
	/**
	 * 敬酒次数<id,次数>
	 */
	@FieldOrder(order = 5)
	private Map<Integer,Integer> jingjiuNumMap;
	/**
	 * 敬酒已领奖<玩家id+次数,领取状态：0.条件不符，1.可领，2.已领>
	 * 改为 <敬酒递增id,领取状态：0.条件不符，1.可领，2.已领>
	 */
	@FieldOrder(order = 6)
	private Map<Integer,Integer> jingjiuAwardMap;
	/**
	 * 是否已发邮件补发奖励(1.已发)
	 */
	@FieldOrder(order = 7)
	private int sentReward;
	
	public YanhuiMember(long hid, String name, int type) {
		this.hid = hid;
		this.name = name;
		this.type = type;
		this.hasKill = new HashSet<Integer>();
		this.jingjiuNumMap = new HashMap<Integer, Integer>();
		this.jingjiuAwardMap = new HashMap<Integer, Integer>();
	}

	public int getSentReward() {
		return sentReward;
	}

	public void setSentReward(int sentReward) {
		this.sentReward = sentReward;
	}

	public Map<Integer, Integer> getJingjiuAwardMap() {
		return jingjiuAwardMap;
	}

	public void setJingjiuAwardMap(Map<Integer, Integer> jingjiuAwardMap) {
		this.jingjiuAwardMap = jingjiuAwardMap;
	}

	public Map<Integer, Integer> getJingjiuNumMap() {
		return jingjiuNumMap;
	}

	public void setJingjiuNumMap(Map<Integer, Integer> jingjiuNumMap) {
		this.jingjiuNumMap = jingjiuNumMap;
	}

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public Set<Integer> getHasKill() {
		return hasKill;
	}

	public void setHasKill(Set<Integer> hasKill) {
		this.hasKill = hasKill;
	}
	
}
