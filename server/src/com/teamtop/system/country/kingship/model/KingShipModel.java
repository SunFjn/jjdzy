package com.teamtop.system.country.kingship.model;

import com.teamtop.util.db.trans.FieldOrder;

public class KingShipModel {
	/** 玩家id */
	@FieldOrder(order = 1)
	private long id;
	/** 玩家名字 */
	@FieldOrder(order = 2)
	private String name;
	/** 官衔 */
	@FieldOrder(order = 3)
	private int official;
	/** 头像id */
	@FieldOrder(order = 4)
	private int icon;
	/** 头像框id */
	@FieldOrder(order = 5)
	private int frame;
	/** 玩家战力 */
	@FieldOrder(order = 6)
	private long totalStrength;
	/** 玩家净胜场 */
	@FieldOrder(order = 7)
	private int onlyWinTimes;
	/** 达到时间 */
	@FieldOrder(order = 8)
	private int time;
	/** 称号 */
	@FieldOrder(order = 9)
	private int titleId;
	/** 职业 */
	@FieldOrder(order = 10)
	private int job;
	/** 时装 */
	@FieldOrder(order = 11)
	private int bodyId;
	/** 坐骑 */
	@FieldOrder(order = 12)
	private int mountId;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getOfficial() {
		return official;
	}

	public void setOfficial(int official) {
		this.official = official;
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

	public long getTotalStrength() {
		return totalStrength;
	}

	public void setTotalStrength(long totalStrength) {
		this.totalStrength = totalStrength;
	}

	public int getOnlyWinTimes() {
		return onlyWinTimes;
	}

	public void setOnlyWinTimes(int onlyWinTimes) {
		this.onlyWinTimes = onlyWinTimes;
	}

	public int getTime() {
		return time;
	}

	public void setTime(int time) {
		this.time = time;
	}

	public int getTitleId() {
		return titleId;
	}

	public void setTitleId(int titleId) {
		this.titleId = titleId;
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
		KingShipModel model = (KingShipModel) obj;
		if (this.id != model.getId()) {
			return false;
		}
		return true;
	}

}
