package com.teamtop.system.crossSelectKing.local;
/**
 * 枭雄争霸
 * @author jjjjyyy
 *
 */
public class CrossSelectKingLocal {
	
	private long hid;
	/**
	 * 第几届
	 */
	private int trem;
	/**
	 * 膜拜奖励
	 */
	private int mobai;
	/**
	 * 冠军所在服奖励
	 */
	private int reward;
	
	public CrossSelectKingLocal() {
		super();
	
	}
	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
	public int getTrem() {
		return trem;
	}
	public void setTrem(int trem) {
		this.trem = trem;
	}
	public int getMobai() {
		return mobai;
	}
	public void setMobai(int mobai) {
		this.mobai = mobai;
	}
	public int getReward() {
		return reward;
	}
	public void setReward(int reward) {
		this.reward = reward;
	}
	
	
	
}
