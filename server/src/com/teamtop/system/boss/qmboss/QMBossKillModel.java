package com.teamtop.system.boss.qmboss;

import com.teamtop.util.db.trans.FieldOrder;


/**
 * 全民boss 击杀boss的玩家信息
 * @author Administrator
 *
 */
public class QMBossKillModel {
	@FieldOrder(order = 1)
	private long hid;
	@FieldOrder(order = 2)
	private String name;
	@FieldOrder(order = 3)
	private int killtime;
	@FieldOrder(order = 4)
	private long strength;
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
	public int getKilltime() {
		return killtime;
	}
	public void setKilltime(int killtime) {
		this.killtime = killtime;
	}
	public long getStrength() {
		return strength;
	}
	public void setStrength(long strength) {
		this.strength = strength;
	}
	
	
}
