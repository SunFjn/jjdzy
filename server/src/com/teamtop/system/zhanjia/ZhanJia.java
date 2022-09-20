package com.teamtop.system.zhanjia;

import java.util.HashMap;

/**
 * 战甲
 * @author jjjjyyy
 *
 */
public class ZhanJia {
	
	private long hid;
	/**
	 * 战甲阶级
	 */
	private int jieLv;
	/**
	 * 战甲经验
	 */
	private int exp;
	/**
	 * 展示中的战甲类型
	 */
	private int showid;
	/**
	 * 拥有的战甲
	 */
	private HashMap<Integer, ZhanJiaModel> zhanjias;
	/**
	 * 战甲技能
	 */
	private HashMap<Integer, Integer> zhanJiaSkill;
	/**
	 * 战甲套装
	 */
	private HashMap<Integer, Integer> taozhuangs;
	/**
	 * 战力
	 */
	private int strength;
	
	public ZhanJia() {
		super();
	}
	
	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
	public int getJieLv() {
		return jieLv;
	}
	public void setJieLv(int jieLv) {
		this.jieLv = jieLv;
	}
	public int getExp() {
		return exp;
	}
	public void setExp(int exp) {
		this.exp = exp;
	}
	public HashMap<Integer, ZhanJiaModel> getZhanjias() {
		return zhanjias;
	}
	public void setZhanjias(HashMap<Integer, ZhanJiaModel> zhanjias) {
		this.zhanjias = zhanjias;
	}

	public HashMap<Integer, Integer> getZhanJiaSkill() {
		return zhanJiaSkill;
	}

	public void setZhanJiaSkill(HashMap<Integer, Integer> zhanJiaSkill) {
		this.zhanJiaSkill = zhanJiaSkill;
	}

	public HashMap<Integer, Integer> getTaozhuangs() {
		return taozhuangs;
	}

	public void setTaozhuangs(HashMap<Integer, Integer> taozhuangs) {
		this.taozhuangs = taozhuangs;
	}
	public int getStrength() {
		return strength;
	}
	public void setStrength(int strength) {
		this.strength = strength;
	}
	public int getShowid() {
		return showid;
	}
	public void setShowid(int showid) {
		this.showid = showid;
	}
	
}
