package com.teamtop.system.crossMine.model;

import java.util.List;

import com.teamtop.util.cache.CacheModel;
import com.teamtop.util.db.trans.FieldOrder;

public class CrossMine extends CacheModel {
	/*** 矿藏id也是矿主id */
	@FieldOrder(order = 1)
	private long hid;
	/*** 矿藏配置id */
	@FieldOrder(order = 2)
	private int mineId;
	/*** 开始开采时间 */
	@FieldOrder(order = 3)
	private long startTime;
	/*** 被顺手牵羊次数 */
	@FieldOrder(order = 4)
	private int stealTimes;
	/*** 被抢次数 */
	@FieldOrder(order = 5)
	private int fightTimes;
	/** 队伍人员 */
	@FieldOrder(order = 6)
	private List<CrossMineJoiner> minersInfo;
	/** 矿主名称 */
	@FieldOrder(order = 7)
	private String name;
	/** 几人开采 */
	@FieldOrder(order = 8)
	private int minerNum;
	/** 所属区号 */
	@FieldOrder(order = 9)
	private int belongZoneid;
	/** 当前刷新阈值 */
	@FieldOrder(order = 10)
	private int yz;
	/** 是否需要存库(不存库字段) */
	private boolean needSave;

	public CrossMine() {
		super();
	}

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
		this.needSave = true;
	}

	public int getMineId() {
		return mineId;
	}

	public void setMineId(int mineId) {
		this.mineId = mineId;
		this.needSave = true;
	}

	public long getStartTime() {
		return startTime;
	}

	public void setStartTime(long startTime) {
		this.startTime = startTime;
		this.needSave = true;
	}

	public int getStealTimes() {
		return stealTimes;
	}

	public void setStealTimes(int stealTimes) {
		this.stealTimes = stealTimes;
		this.needSave = true;
	}

	public int getFightTimes() {
		return fightTimes;
	}

	public void setFightTimes(int fightTimes) {
		this.fightTimes = fightTimes;
		this.needSave = true;
	}

	public List<CrossMineJoiner> getMinersInfo() {
		return minersInfo;
	}

	public void setMinersInfo(List<CrossMineJoiner> minersInfo) {
		this.minersInfo = minersInfo;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
		this.needSave = true;
	}

	public int getMinerNum() {
		return minerNum;
	}

	public void setMinerNum(int minerNum) {
		this.minerNum = minerNum;
		this.needSave = true;
	}

	public int getBelongZoneid() {
		return belongZoneid;
	}

	public void setBelongZoneid(int belongZoneid) {
		this.belongZoneid = belongZoneid;
	}

	public int getYz() {
		return yz;
	}

	public void setYz(int yz) {
		this.yz = yz;
		this.needSave = true;
	}

	public boolean isNeedSave() {
		return needSave;
	}

	public void setNeedSave(boolean needSave) {
		this.needSave = needSave;
	}

}
