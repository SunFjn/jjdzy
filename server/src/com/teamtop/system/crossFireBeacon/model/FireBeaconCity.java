package com.teamtop.system.crossFireBeacon.model;

import com.teamtop.util.common.ConcurrentHashSet;
import com.teamtop.util.db.trans.FieldOrder;

public class FireBeaconCity {

	@FieldOrder(order = 1)
	/** 都城id */
	private int cityId;

	@FieldOrder(order = 2)
	/** 都城类型 */
	private int type;

	@FieldOrder(order = 3)
	/** 守城者 */
	private long guardian;

	@FieldOrder(order = 4)
	/** 占领成员 */
	private ConcurrentHashSet<Long> members = new ConcurrentHashSet<>();

	@FieldOrder(order = 5)
	/** 区号 */
	private int zoneId;

	@FieldOrder(order = 6)
	/** 归属(1:蓝色，2：红色) */
	private byte belongType;

	public int getCityId() {
		return cityId;
	}

	public void setCityId(int cityId) {
		this.cityId = cityId;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public long getGuardian() {
		return guardian;
	}

	public void setGuardian(long guardian) {
		this.guardian = guardian;
	}

	public ConcurrentHashSet<Long> getMembers() {
		return members;
	}

	public void setMembers(ConcurrentHashSet<Long> members) {
		this.members = members;
	}

	public int getZoneId() {
		return zoneId;
	}

	public void setZoneId(int zoneId) {
		this.zoneId = zoneId;
	}

	public byte getBelongType() {
		return belongType;
	}

	public void setBelongType(byte belongType) {
		this.belongType = belongType;
	}

}
