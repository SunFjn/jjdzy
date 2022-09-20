package com.teamtop.system.house.yard.model;

import java.util.Map;

public class LocalHouse {
	/** 玩家id */
	private long hid;
	/** 府邸币 */
	private long houseMoney;
	/** 天工炉积分 */
	private long jiFen;
	/** 装饰等级(计算属性用) */
	private Map<Integer, Integer> decorateLvMap;
	/** 府邸等级(计算属性用) */
	private int houseLv;
	/** 繁荣度 */
	private long prosperity;
	/** 天工炉抽奖次数 */
	private int drawAwardTimes;
	/** 已经完成的随机事件次数 */
	private int completeEventTimes;
	/** 已经帮助完成的随机事件次数 */
	private int completeEventHelpTimes;
	/** 已经完成的强盗事件次数 */
	private int completeRobberTimes;
	/** 打强盗npcId(不存库) */
	private long atkNpcId;
	/** 打强盗府邸主人id(不存库) */
	private long atkHeroId;

	public LocalHouse() {
	}

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public long getHouseMoney() {
		return houseMoney;
	}

	public void setHouseMoney(long houseMoney) {
		this.houseMoney = houseMoney;
	}

	public long getJiFen() {
		return jiFen;
	}

	public void setJiFen(long jiFen) {
		this.jiFen = jiFen;
	}

	public Map<Integer, Integer> getDecorateLvMap() {
		return decorateLvMap;
	}

	public void setDecorateLvMap(Map<Integer, Integer> decorateLvMap) {
		this.decorateLvMap = decorateLvMap;
	}

	public int getHouseLv() {
		return houseLv;
	}

	public void setHouseLv(int houseLv) {
		this.houseLv = houseLv;
	}

	public long getProsperity() {
		return prosperity;
	}

	public void setProsperity(long prosperity) {
		this.prosperity = prosperity;
	}

	public int getDrawAwardTimes() {
		return drawAwardTimes;
	}

	public void setDrawAwardTimes(int drawAwardTimes) {
		this.drawAwardTimes = drawAwardTimes;
	}

	public int getCompleteEventTimes() {
		return completeEventTimes;
	}

	public void setCompleteEventTimes(int completeEventTimes) {
		this.completeEventTimes = completeEventTimes;
	}

	public int getCompleteEventHelpTimes() {
		return completeEventHelpTimes;
	}

	public void setCompleteEventHelpTimes(int completeEventHelpTimes) {
		this.completeEventHelpTimes = completeEventHelpTimes;
	}

	public int getCompleteRobberTimes() {
		return completeRobberTimes;
	}

	public void setCompleteRobberTimes(int completeRobberTimes) {
		this.completeRobberTimes = completeRobberTimes;
	}

	public long getAtkNpcId() {
		return atkNpcId;
	}

	public void setAtkNpcId(long atkNpcId) {
		this.atkNpcId = atkNpcId;
	}

	public long getAtkHeroId() {
		return atkHeroId;
	}

	public void setAtkHeroId(long atkHeroId) {
		this.atkHeroId = atkHeroId;
	}

}
