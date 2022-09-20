package com.teamtop.system.zcBoss;

import com.teamtop.util.db.trans.FieldOrder;

/**
 * 
 * 生死夺宝副本数据
 * 
 */
public class ZcBoss {
	/**
	 * 副本序列号
	 */
	@FieldOrder(order = 1)
	private int index;
	/**
	 * 场景唯一id
	 */
	@FieldOrder(order = 2)
	private int sceneUnitId;
	
	/**
	 * 地图id
	 */
	@FieldOrder(order = 3)
	private int mapId;

	/**
	 * 对应的副本状态
	 */
	@FieldOrder(order = 4)
	private byte bossLastState;
	
	/**
	 * 切换状态时的时间点
	 */
	@FieldOrder(order = 5)
	private int switchStateTime;

	/**
	 * 最近一次被击杀的时间
	 */
	@FieldOrder(order = 6)
	private int lastKillTime;
	/**
	 * 下次boss帅新的时间
	 */
	@FieldOrder(order = 7)
	private volatile long nextBosstime;

	/**
	 * 最近一次击杀boss角色id
	 */
	@FieldOrder(order = 8)
	private long skillid;
	/**
	 * 最近一次击杀boss的角色名称
	 */
	@FieldOrder(order = 9)
	private String roleName="";
	/**
	 * 是否是第一次刷新boss
	 */
	@FieldOrder(order = 10)
	private boolean isFirst;
	/**
	 * 当前bossID 唯一id
	 */
	@FieldOrder(order = 11)
	private long unitBossId;
	/**
	 * boss 系统id
	 */
	@FieldOrder(order = 12)
	private int sysBossId;
	/**
	 * 当前正在和战场boss战斗的玩家id
	 */
	@FieldOrder(order = 13)
	private long battleId;
	/**
	 *开始进入战斗的时间，超过这个时间就强制拉入战斗
	 */
	@FieldOrder(order = 14)
	private int timeBattleBegin;

	public ZcBoss() {
		super();
	}




	public ZcBoss(int index, int mapId,byte bossState) {
		this.index = index;
		this.mapId=mapId;
		this.bossLastState = bossState;
	}

	public int getIndex() {
		return index;
	}

	public void setIndex(int index) {
		this.index = index;
	}

	public int getSceneUnitId() {
		return sceneUnitId;
	}




	public void setSceneUnitId(int sceneUnitId) {
		this.sceneUnitId = sceneUnitId;
	}




	public synchronized byte getBossLastState() {
		return bossLastState;
	}

	public synchronized void setBossLastState(byte bossLastState) {
		this.bossLastState = bossLastState;
	}

	public int getLastKillTime() {
		return lastKillTime;
	}

	public void setLastKillTime(int lastKillTime) {
		this.lastKillTime = lastKillTime;
	}

	public int getMapId() {
		return mapId;
	}

	public void setMapId(int mapId) {
		this.mapId = mapId;
	}

	public int getSwitchStateTime() {
		return switchStateTime;
	}

	public synchronized void setSwitchStateTime(int switchStateTime) {
		this.switchStateTime = switchStateTime;
	}


	public long getNextBosstime() {
		return nextBosstime;
	}

	public void setNextBosstime(long nextBosstime) {
		this.nextBosstime = nextBosstime;
	}

	public long getSkillid() {
		return skillid;
	}

	public void setSkillid(long skillid) {
		this.skillid = skillid;
	}

	public boolean isFirst() {
		return isFirst;
	}

	public void setFirst(boolean isFirst) {
		this.isFirst = isFirst;
	}



	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public long getBattleId() {
		return battleId;
	}

	public void setBattleId(long battleId) {
		this.battleId = battleId;
	}

	public int getTimeBattleBegin() {
		return timeBattleBegin;
	}

	public void setTimeBattleBegin(int timeBattleBegin) {
		this.timeBattleBegin = timeBattleBegin;
	}

	public long getUnitBossId() {
		return unitBossId;
	}

	public void setUnitBossId(long unitBossId) {
		this.unitBossId = unitBossId;
	}

	public int getSysBossId() {
		return sysBossId;
	}

	public void setSysBossId(int sysBossId) {
		this.sysBossId = sysBossId;
	}
	
	
	
}
