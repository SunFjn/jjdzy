package com.teamtop.system.activity.ativitys.shaoZhuQiYuanRankAct.model;

import com.teamtop.util.db.trans.FieldOrder;

public class ShaoZhuQiYuanRankActModel implements Comparable<ShaoZhuQiYuanRankActModel> {
	/** 排名 用来发奖励的时候用 */
	@FieldOrder(order = 1)
	private int rank;
	@FieldOrder(order = 2)
	private long hid;
	@FieldOrder(order = 3)
	private String name;
	/** 祈愿次数 */
	@FieldOrder(order = 4)
	private int qiyuanTimes;
	/** 达到时间 */
	@FieldOrder(order = 5)
	private int reachTime;
	/** 职业 */
	@FieldOrder(order = 6)
	private int job;
	/** 时装 */
	@FieldOrder(order = 7)
	private int bodyId;
	/** 头像 */
	@FieldOrder(order = 8)
	private int icon;
	/** 头像框 */
	@FieldOrder(order = 9)
	private int frame;
	/** 国家 */
	@FieldOrder(order = 10)
	private int countryType;
	/** vip等级 */
	@FieldOrder(order = 11)
	private int vipLv;
	/** 坐骑 */
	@FieldOrder(order = 12)
	private int mountId;
	/** 增加的次数 */
	private int addTimes;

	public ShaoZhuQiYuanRankActModel() {
		// TODO Auto-generated constructor stub
	}

	public ShaoZhuQiYuanRankActModel(long hid, String name, int qiyuanTimes, int job, int bodyId, int icon,
			int frame, int countryType, int vipLv, int mountId) {
		super();
		this.hid = hid;
		this.name = name;
		this.qiyuanTimes = qiyuanTimes;
		this.job = job;
		this.bodyId = bodyId;
		this.icon = icon;
		this.frame = frame;
		this.countryType = countryType;
		this.vipLv = vipLv;
		this.mountId = mountId;
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

	public int getQiyuanTimes() {
		return qiyuanTimes;
	}

	public void setQiyuanTimes(int qiyuanTimes) {
		this.qiyuanTimes = qiyuanTimes;
	}

	public int getJob() {
		return job;
	}

	public void setJob(int job) {
		this.job = job;
	}

	public int getBodyId() {
		return bodyId;
	}

	public void setBodyId(int bodyId) {
		this.bodyId = bodyId;
	}

	public int getReachTime() {
		return reachTime;
	}

	public void setReachTime(int reachTime) {
		this.reachTime = reachTime;
	}

	public int getRank() {
		return rank;
	}

	public void setRank(int rank) {
		this.rank = rank;
	}

	public int getIcon() {
		return icon;
	}

	public void setIcon(int icon) {
		this.icon = icon;
	}

	public int getFrame() {
		return frame;
	}

	public void setFrame(int frame) {
		this.frame = frame;
	}

	public int getCountryType() {
		return countryType;
	}

	public void setCountryType(int countryType) {
		this.countryType = countryType;
	}

	public int getVipLv() {
		return vipLv;
	}

	public void setVipLv(int vipLv) {
		this.vipLv = vipLv;
	}

	public int getAddTimes() {
		return addTimes;
	}

	public void setAddTimes(int addTimes) {
		this.addTimes = addTimes;
	}

	public int getMountId() {
		return mountId;
	}

	public void setMountId(int mountId) {
		this.mountId = mountId;
	}

	@Override
	public int compareTo(ShaoZhuQiYuanRankActModel arg1) {
		// TODO Auto-generated method stub
		if (hid == arg1.getHid()) {
			return 0;
		}
		// 鉴定次数
		if (qiyuanTimes != arg1.getQiyuanTimes()) {
			return qiyuanTimes < arg1.getQiyuanTimes() ? 1 : -1;
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
