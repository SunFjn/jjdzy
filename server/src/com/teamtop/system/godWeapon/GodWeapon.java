package com.teamtop.system.godWeapon;
/**
 * 神兵
 * @author jjjjyyy
 *
 */

import java.util.HashMap;

public class GodWeapon {
	/**
	 * 
	 */
	private long hid;
	/**
	 * 武将神兵的 锻造情况 武将类型=》神兵锻造情况
	 */
	private HashMap<Integer, GodWeaponInfo> weaponIdByWuJiang;
	
	/***
	 * 工匠锤抽取次数
	 */
	private int num;
	/**
	 * 战力
	 */
	private int strength; 
	/**
	 * 期数
	 */
	private int qs;
	
	
	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
	public HashMap<Integer, GodWeaponInfo> getWeaponIdByWuJiang() {
		return weaponIdByWuJiang;
	}
	public void setWeaponIdByWuJiang(HashMap<Integer, GodWeaponInfo> weaponIdByWuJiang) {
		this.weaponIdByWuJiang = weaponIdByWuJiang;
	}
	public int getNum() {
		return num;
	}
	public void setNum(int num) {
		this.num = num;
	}
	public int getStrength() {
		return strength;
	}
	public void setStrength(int strength) {
		this.strength = strength;
	}
	public int getQs() {
		return qs;
	}
	public void setQs(int qs) {
		this.qs = qs;
	}
	
	

}
