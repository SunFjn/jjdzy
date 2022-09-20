package com.teamtop.system.vip.model;

import java.util.Set;

public class VipData {

	/** 角色id */
	private long hid;

	/** 已领取vip等级奖励 **/
	private Set<Integer> vipAward;

	/** VIP经验 */
	private int vipExp;

	/** 已领取礼包 */
	private Set<Integer> vipGift;

	/** 补偿版本 */
	private int version;

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public Set<Integer> getVipAward() {
		return vipAward;
	}

	public void setVipAward(Set<Integer> vipAward) {
		this.vipAward = vipAward;
	}

	public int getVipExp() {
		return vipExp;
	}

	public void setVipExp(int vipExp) {
		this.vipExp = vipExp;
	}

	public Set<Integer> getVipGift() {
		return vipGift;
	}

	public void setVipGift(Set<Integer> vipGift) {
		this.vipGift = vipGift;
	}

	public int getVersion() {
		return version;
	}

	public void setVersion(int version) {
		this.version = version;
	}

}
