package com.teamtop.system.crossFireBeacon.model;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.atomic.AtomicLong;

import com.teamtop.util.db.trans.FieldOrder;

public class FireBeaconServer implements Comparable<FireBeaconServer> {

	@FieldOrder(order = 1)
	/** 区号 */
	private int zoneId;

	@FieldOrder(order = 2)
	/** 房间id */
	private int roomId;

	@FieldOrder(order = 3)
	private long totalScoreValue;
	
	/** 总积分 */
	private AtomicLong totalScore = new AtomicLong(0);

	@FieldOrder(order = 4)
	/** 卫城id列表 */
	private List<Integer> cityList = new ArrayList<>();

	@FieldOrder(order = 5)
	private Set<Long> members = new HashSet();

	@FieldOrder(order = 6)
	/** 归属(1:蓝色，2：红色) */
	private byte belongType;

	@FieldOrder(order = 7)
	/** 更新时间 */
	private long updateTime;

	public int getZoneId() {
		return zoneId;
	}

	public void setZoneId(int zoneId) {
		this.zoneId = zoneId;
	}

	public int getRoomId() {
		return roomId;
	}

	public void setRoomId(int roomId) {
		this.roomId = roomId;
	}

	public long getTotalScoreValue() {
		return getTotalScore();
	}

	public void setTotalScoreValue(long totalScoreValue) {
		this.totalScoreValue = totalScoreValue;
		setTotalScore(totalScoreValue);
	}

	public long getTotalScore() {
		return totalScore.get();
	}

	public void setTotalScore(long totalScore) {
		this.totalScore.set(totalScore);
	}

	public void addTotalScore(long totalScore) {
		this.totalScore.addAndGet(totalScore);
	}

	public List<Integer> getCityList() {
		return cityList;
	}

	public void setCityList(List<Integer> cityList) {
		this.cityList = cityList;
	}

	public Set<Long> getMembers() {
		return members;
	}

	public void setMembers(Set<Long> members) {
		this.members = members;
	}

	public byte getBelongType() {
		return belongType;
	}

	public void setBelongType(byte belongType) {
		this.belongType = belongType;
	}

	public long getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(long updateTime) {
		this.updateTime = updateTime;
	}

	@Override
	public int compareTo(FireBeaconServer o) {
		if (o.getZoneId() == getZoneId()) {
			return 0;
		}
		if (o.getTotalScore() > getTotalScore()) {
			return 1;
		} else if (o.getTotalScore() == getTotalScore()) {
			if (o.getUpdateTime() < getUpdateTime()) {
				return 1;
			} else if (o.getUpdateTime() == getUpdateTime()) {
				if(o.getZoneId() > getZoneId()) {
					return 1;
				}else {					
					return -1;
				}
			}
		}
		return -1;
	}

}
