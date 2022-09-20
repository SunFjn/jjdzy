package com.teamtop.system.battleGoods.model;

import java.util.HashSet;
import java.util.Set;

public class BattleGoodZoneid {
	/**
	 * 阵营序号 1-3
	 */
	private int index;
	/**
	 * 房间id
	 */
	private  int roomId;
	/**
	 * 跨服分组
	 */
	private  int partId;
	
	/**
	 * 大区id
	 */
	private int fristzoneid;
	/**
	 * 总积分
	 */
	private int source;
	/**
	 * 被击杀的bossid
	 */
	private Set<Integer> killBoosids=new HashSet<Integer>();
	/**
	 * 积分达到的时间
	 */
	private int sourceTime;
	
	public BattleGoodZoneid() {
		super();
	}
	
	public int getIndex() {
		return index;
	}

	public void setIndex(int index) {
		this.index = index;
	}
	
	public int getFristzoneid() {
		return fristzoneid;
	}
	public void setFristzoneid(int fristzoneid) {
		this.fristzoneid = fristzoneid;
	}
	public int getSource() {
		return source;
	}
	public void setSource(int source) {
		this.source = source;
	}
	public Set<Integer> getKillBoosids() {
		return killBoosids;
	}
	public void setKillBoosids(Set<Integer> killBoosids) {
		this.killBoosids = killBoosids;
	}

	public int getRoomId() {
		return roomId;
	}

	public void setRoomId(int roomId) {
		this.roomId = roomId;
	}

	public int getPartId() {
		return partId;
	}

	public void setPartId(int partId) {
		this.partId = partId;
	}
	
	public int getSourceTime() {
		return sourceTime;
	}

	public void setSourceTime(int sourceTime) {
		this.sourceTime = sourceTime;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		BattleGoodZoneid other = (BattleGoodZoneid) obj;
		if (index != other.index)
			return false;
		return true;
	}

	
	

}
