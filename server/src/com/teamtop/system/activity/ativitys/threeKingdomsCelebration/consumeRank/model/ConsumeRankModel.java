package com.teamtop.system.activity.ativitys.threeKingdomsCelebration.consumeRank.model;

import com.teamtop.system.crossCommonRank.model.CommonRankModel;

public class ConsumeRankModel extends CommonRankModel {
	/** 职业 */
	private int job;
	/** 时装 */
	private int bodyId;
	/** 专属神兵 */
	private int godWeapon;
	/** 坐骑*/
	private int mountId;

	public ConsumeRankModel() {
		super();
	}

	public ConsumeRankModel(long hid, String name, int parameter, int job, int bodyId, int godWeapon, int mountId) {
		super(hid, name, parameter);
		this.job = job;
		this.bodyId = bodyId;
		this.godWeapon = godWeapon;
		this.mountId = mountId;
	}

	public int getJob() {
		return job;
	}

	public int getBodyId() {
		return bodyId;
	}

	public int getGodWeapon() {
		return godWeapon;
	}

	public void setJob(int job) {
		this.job = job;
	}

	public void setBodyId(int bodyId) {
		this.bodyId = bodyId;
	}

	public void setGodWeapon(int godWeapon) {
		this.godWeapon = godWeapon;
	}

	public int getMountId() {
		return mountId;
	}

	public void setMountId(int mountId) {
		this.mountId = mountId;
	}
}
