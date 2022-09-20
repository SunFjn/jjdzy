package com.teamtop.system.activity.ativitys.rechargeRankAct.model;

public class RechargeRankActModel implements Comparable<RechargeRankActModel> {
	/** 玩家排名 */
	private int rank;
	/** 玩家id */
	private long hid;
	/** 玩家名称 */
	private String name;
	/** 总充值 */
	private int totalRecharge;
	/** 玩家排名达到时间 */
	private int reachTime;
	/** 增加的次数 */
	private int addTimes;
	/** 第一名职业 */
	private int job;
	/** 第一名时装 */
	private int bodyId;
	/** 第一名神兵 */
	private int weaponModel;
	/** 坐骑*/
	private int mountId;

	public RechargeRankActModel() {
		// TODO Auto-generated constructor stub
	}

	public RechargeRankActModel(long hid, String name, int totalRecharge, int job, int bodyId, int weaponModel, int mountId) {
		super();
		this.hid = hid;
		this.name = name;
		this.totalRecharge = totalRecharge;
		this.job = job;
		this.bodyId = bodyId;
		this.weaponModel = weaponModel;
		this.mountId = mountId;
	}

	public int getRank() {
		return rank;
	}

	public void setRank(int rank) {
		this.rank = rank;
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

	public int getTotalRecharge() {
		return totalRecharge;
	}

	public void setTotalRecharge(int totalRecharge) {
		this.totalRecharge = totalRecharge;
	}

	public int getReachTime() {
		return reachTime;
	}

	public void setReachTime(int reachTime) {
		this.reachTime = reachTime;
	}

	public int getAddTimes() {
		return addTimes;
	}

	public void setAddTimes(int addTimes) {
		this.addTimes = addTimes;
	}

	public int getJob() {
		return job;
	}

	public int getBodyId() {
		return bodyId;
	}

	public int getWeaponModel() {
		return weaponModel;
	}

	public void setJob(int job) {
		this.job = job;
	}

	public void setBodyId(int bodyId) {
		this.bodyId = bodyId;
	}

	public void setWeaponModel(int weaponModel) {
		this.weaponModel = weaponModel;
	}

	public int getMountId() {
		return mountId;
	}

	public void setMountId(int mountId) {
		this.mountId = mountId;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		RechargeRankActModel model = (RechargeRankActModel) obj;
		if (this.hid != model.getHid()) {
			return false;
		}
		return true;
	}

	@Override
	public int compareTo(RechargeRankActModel arg1) {
		// TODO Auto-generated method stub
		if (hid == arg1.getHid()) {
			return 0;
		}
		// 鉴定次数
		if (totalRecharge != arg1.getTotalRecharge()) {
			return totalRecharge < arg1.getTotalRecharge() ? 1 : -1;
		}
		// 比较达到时间
		if (reachTime != arg1.getReachTime()) {
			return reachTime > arg1.getReachTime() ? 1 : -1;
		}
		if (hid != arg1.getHid()) {
			return hid < arg1.getHid() ? 1 : -1;
		}
		return 0;
	}
}
