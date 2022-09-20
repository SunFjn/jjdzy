package com.teamtop.system.house.yard.model;

import java.util.Map;

import com.teamtop.util.cache.CacheModel;

public class CrossHouse extends CacheModel {
	/** 玩家id */
	private long hid;
	/** 所属区服 */
	private int belongZoneid;
	/** 场景唯一id */
	private int sceneUnitId;
	/** 府邸等级 */
	private int houseLv;
	/** 府邸档次 */
	private int houseDc;
	/** 繁荣度 */
	private long prosperity;
	/** 装饰等级 */
	private Map<Integer, Integer> decorateLvMap;
	/** 玩家名字 */
	private String name;
	/** 玩家等级 */
	private int level;
	/** 玩家头像 */
	private int icon;
	/** 玩家头像框 */
	private int frame;
	/** 随机事件 */
	private Map<Integer, RandomEvent> eventMap;
	/** 下次可摇树时间 */
	private int nextShakeTreeTime;
	/** 金库现有府邸币库存 */
	private int goldHouseMoney;
	/** 上次金库添加府邸币时间 */
	private int lastAddMoneyTime;
	/** 强盗小怪 */
	private Map<Long, RobberNpc> npcMap;
	/** 下次刷新强盗时间 */
	private int nextRobberTime;
	/** 家丁等级 */
	private int houseKeepId;
	/** 天工炉被借用次数 */
	private int drawAwardTimes;
	/** 侍女id */
	private int maidId;
	/** 上次金库被偷时间 */
	private int lastLostMoneyTime;

	public int getHouseKeepId() {
		return houseKeepId;
	}

	public void setHouseKeepId(int houseKeepId) {
		this.houseKeepId = houseKeepId;
	}

	public CrossHouse() {

	}

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public int getBelongZoneid() {
		return belongZoneid;
	}

	public void setBelongZoneid(int belongZoneid) {
		this.belongZoneid = belongZoneid;
	}

	public int getSceneUnitId() {
		return sceneUnitId;
	}

	public void setSceneUnitId(int sceneUnitId) {
		this.sceneUnitId = sceneUnitId;
	}

	public int getHouseLv() {
		return houseLv;
	}

	public void setHouseLv(int houseLv) {
		this.houseLv = houseLv;
	}

	public int getHouseDc() {
		return houseDc;
	}

	public void setHouseDc(int houseDc) {
		this.houseDc = houseDc;
	}

	public long getProsperity() {
		return prosperity;
	}

	public void setProsperity(long prosperity) {
		this.prosperity = prosperity;
	}

	public Map<Integer, Integer> getDecorateLvMap() {
		return decorateLvMap;
	}

	public void setDecorateLvMap(Map<Integer, Integer> decorateLvMap) {
		this.decorateLvMap = decorateLvMap;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
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

	public Map<Integer, RandomEvent> getEventMap() {
		return eventMap;
	}

	public void setEventMap(Map<Integer, RandomEvent> eventMap) {
		this.eventMap = eventMap;
	}

	public int getNextShakeTreeTime() {
		return nextShakeTreeTime;
	}

	public void setNextShakeTreeTime(int nextShakeTreeTime) {
		this.nextShakeTreeTime = nextShakeTreeTime;
	}

	public int getGoldHouseMoney() {
		return goldHouseMoney;
	}

	public void setGoldHouseMoney(int goldHouseMoney) {
		this.goldHouseMoney = goldHouseMoney;
	}

	public int getLastAddMoneyTime() {
		return lastAddMoneyTime;
	}

	public void setLastAddMoneyTime(int lastAddMoneyTime) {
		this.lastAddMoneyTime = lastAddMoneyTime;
	}

	public Map<Long, RobberNpc> getNpcMap() {
		return npcMap;
	}

	public void setNpcMap(Map<Long, RobberNpc> npcMap) {
		this.npcMap = npcMap;
	}

	public int getNextRobberTime() {
		return nextRobberTime;
	}

	public void setNextRobberTime(int nextRobberTime) {
		this.nextRobberTime = nextRobberTime;
	}

	public int getDrawAwardTimes() {
		return drawAwardTimes;
	}

	public void setDrawAwardTimes(int drawAwardTimes) {
		this.drawAwardTimes = drawAwardTimes;
	}

	public int getMaidId() {
		return maidId;
	}

	public void setMaidId(int maidId) {
		this.maidId = maidId;
	}

	public int getLastLostMoneyTime() {
		return lastLostMoneyTime;
	}

	public void setLastLostMoneyTime(int lastLostMoneyTime) {
		this.lastLostMoneyTime = lastLostMoneyTime;
	}
}
