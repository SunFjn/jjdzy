package com.teamtop.system.lvBuRising.model;

public class LvBuRisingRankModel implements Comparable<LvBuRisingRankModel> {

	/** 玩家id */
	private long hid;

	/** 名称 */
	private String name;

	/** 职业 */
	private int job;

	/** 等级 */
	private int level;

	/** vip等级 */
	private int vipLvl;

	/** 头像 */
	private int icon;

	/** 头像框 */
	private int frame;

	/** 显示国家 */
	private int showCountry;

	/** 区号 */
	private int zoneid;

	/** 积分 */
	private int score;

	/**
	 * 创建时间
	 */
	private int createTime;

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

	public int getJob() {
		return job;
	}

	public void setJob(int job) {
		this.job = job;
	}

	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}

	public int getVipLvl() {
		return vipLvl;
	}

	public void setVipLvl(int vipLvl) {
		this.vipLvl = vipLvl;
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

	public int getShowCountry() {
		return showCountry;
	}

	public void setShowCountry(int showCountry) {
		this.showCountry = showCountry;
	}

	public int getZoneid() {
		return zoneid;
	}

	public void setZoneid(int zoneid) {
		this.zoneid = zoneid;
	}

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}

	public int getCreateTime() {
		return createTime;
	}

	public void setCreateTime(int createTime) {
		this.createTime = createTime;
	}

	@Override
	public int compareTo(LvBuRisingRankModel o) {
		if (o.getHid() == getHid()) {
			return 0;
		}
		if (o.getScore() > getScore()) {
			return 1;
		} else if (o.getScore() == getScore()) {
			if (o.getCreateTime() < getCreateTime()) {
				return 1;
			} else if (o.getCreateTime() == getCreateTime()) {
				return 0;
			}
		}
		return -1;
	}

}
