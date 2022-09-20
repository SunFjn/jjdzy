package com.teamtop.system.battleNew.model;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import com.teamtop.system.battleNew.BattleSysType;

public class BattleNewInfo {

	/**
	 * 战斗唯一id
	 */
	private long battleUid;

	/** 系统id */
	private int sysId;

	/** 战斗系统类型(单人pvp,单人pve,组队pvp,组队pve) */
	private BattleSysType sysType;

	/** 战斗类型 */
	private int battleType;

	/**
	 * 主动方
	 */
	private long attHid;

	/**
	 * 个人战斗数据
	 */
	private Map<Long, PeronalBattleData> playerDataMap = new HashMap<>();

	/**
	 * 阵营集合
	 */
	private Map<Byte, Set<Long>> campMap = new HashMap<>();

	/**
	 * 特殊类型战斗同步集合（如：跨服王者）
	 */
	private Set<Long> synHidSet = new HashSet<>();

	/**
	 * 个玩法系统可能需要保存的的特殊数据
	 */
	private SpecialInfo sInfo;

	private int winCamp;

	/** 创建时间 */
	private int createTime;

	public long getBattleUid() {
		return battleUid;
	}

	public void setBattleUid(long battleUid) {
		this.battleUid = battleUid;
	}

	public int getSysId() {
		return sysId;
	}

	public void setSysId(int sysId) {
		this.sysId = sysId;
	}

	public BattleSysType getSysType() {
		return sysType;
	}

	public void setSysType(BattleSysType sysType) {
		this.sysType = sysType;
	}

	public int getBattleType() {
		return battleType;
	}

	public void setBattleType(int battleType) {
		this.battleType = battleType;
	}

	public Map<Long, PeronalBattleData> getPlayerDataMap() {
		return playerDataMap;
	}

	public void setPlayerDataMap(Map<Long, PeronalBattleData> playerDataMap) {
		this.playerDataMap = playerDataMap;
	}

	public Map<Byte, Set<Long>> getCampMap() {
		return campMap;
	}

	public void setCampMap(Map<Byte, Set<Long>> campMap) {
		this.campMap = campMap;
	}

	public int getCreateTime() {
		return createTime;
	}

	public void setCreateTime(int createTime) {
		this.createTime = createTime;
	}

	public long getAttHid() {
		return attHid;
	}

	public void setAttHid(long attHid) {
		this.attHid = attHid;
	}

	public SpecialInfo getsInfo() {
		return sInfo;
	}

	public void setsInfo(SpecialInfo sInfo) {
		this.sInfo = sInfo;
	}

	public int getWinCamp() {
		return winCamp;
	}

	public void setWinCamp(int winCamp) {
		this.winCamp = winCamp;
	}

	public Set<Long> getSynHidSet() {
		return synHidSet;
	}

	public void setSynHidSet(Set<Long> synHidSet) {
		this.synHidSet = synHidSet;
	}

	@Override
	public String toString() {
		StringBuilder sb = new StringBuilder();
		StringBuilder sb1 = new StringBuilder();
		Iterator<PeronalBattleData> iterator = playerDataMap.values().iterator();
		PeronalBattleData battleData = null;
		for (; iterator.hasNext();) {
			battleData = iterator.next();
			sb1.append(", hid=").append(battleData.getHid()).append(", camp=" + battleData.getCampType());
		}
		sb.append("battleUid=").append(battleUid).append(sb1.toString()).append(", creatTime=" + createTime);
		return sb.toString();
	}

}
