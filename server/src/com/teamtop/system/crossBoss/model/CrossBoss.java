package com.teamtop.system.crossBoss.model;
/**
 * 跨服boss
 * @author jjjjyyy
 *
 */
public class CrossBoss {
	/**角色ID*/
	private long hid;
	/**剩余参与跨服boss次数**/
	private int num;
	/**上期伤害值*/
	private long hurt;
	/**今天买了多少次**/
	private int buyNum;
	/**进入冷却时间**/
	private int joinInCD;
	/**是否在打跨服boss 0没有 1在打**/
	private int isInBoss;
	
	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
	public long getHurt() {
		return hurt;
	}
	public void setHurt(long hurt) {
		this.hurt = hurt;
	}
	public int getNum() {
		return num;
	}
	public void setNum(int num) {
		this.num = num;
	}
	public int getBuyNum() {
		return buyNum;
	}
	public void setBuyNum(int buyNum) {
		this.buyNum = buyNum;
	}
	public int getJoinInCD() {
		return joinInCD;
	}
	public void setJoinInCD(int joinInCD) {
		this.joinInCD = joinInCD;
	}
	public int getIsInBoss() {
		return isInBoss;
	}
	public void setIsInBoss(int isInBoss) {
		this.isInBoss = isInBoss;
	}
	
	

}
