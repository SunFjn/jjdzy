package com.teamtop.system.crossFireBeacon.model;

import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.atomic.AtomicLong;

import com.teamtop.util.db.trans.FieldOrder;

public class FireBeaconModel implements Comparable<FireBeaconModel> {

	@FieldOrder(order = 1)
	private long hid;

	@FieldOrder(order = 2)
	private String nameZoneid;

	@FieldOrder(order = 3)
	/** 头像 */
	private int icon;

	@FieldOrder(order = 4)
	/** 头像框 */
	private int frame;

	@FieldOrder(order = 5)
	/** 房间id */
	private int roomId;

	@FieldOrder(order = 6)
	/** 占领城id */
	private int cityId;

	@FieldOrder(order = 7)
	/** 占领时间 */
	private int occupyTime;

	@FieldOrder(order = 8)
	/** 最后一次征收时间 */
	private int lastAwardTime;

	@FieldOrder(order = 9)
	/** 是否守城者 */
	private boolean guardianState;

	@FieldOrder(order = 10)
	/** 剩余血量 */
	private long leftHp;

	@FieldOrder(order = 11)
	private long scoreValue;
	
	/** 积分 */
	private AtomicLong score = new AtomicLong(0);

	@FieldOrder(order = 12)
	/** 归属(1:蓝色，2：红色) */
	private byte belongType;

	@FieldOrder(order = 13)
	/** 所属区（合区最小区号） */
	private int belongZoneid;

	@FieldOrder(order = 14)
	/** 坐标x */
	private int posX;

	@FieldOrder(order = 15)
	/** 坐标y */
	private int posY;

	@FieldOrder(order = 16)
	/** 积分更新时间 */
	private long updateTime;

	@FieldOrder(order = 17)
	/** 已领取的积分奖励 */
	private Set<Integer> alreadyGet = new HashSet<>();

	@FieldOrder(order = 18)
	/** 死亡时间 */
	private int deadTime;

	@FieldOrder(order = 19)
	private int fight;

	@FieldOrder(order = 20)
	/** 剩余护盾 */
	private long leftHudun;

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public String getNameZoneid() {
		return nameZoneid;
	}

	public void setNameZoneid(String nameZoneid) {
		this.nameZoneid = nameZoneid;
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

	public int getRoomId() {
		return roomId;
	}

	public void setRoomId(int roomId) {
		this.roomId = roomId;
	}

	public int getCityId() {
		return cityId;
	}

	public void setCityId(int cityId) {
		this.cityId = cityId;
	}

	public int getOccupyTime() {
		return occupyTime;
	}

	public void setOccupyTime(int occupyTime) {
		this.occupyTime = occupyTime;
	}

	public int getLastAwardTime() {
		return lastAwardTime;
	}

	public void setLastAwardTime(int lastAwardTime) {
		this.lastAwardTime = lastAwardTime;
	}

	public boolean isGuardianState() {
		return guardianState;
	}

	public void setGuardianState(boolean guardianState) {
		this.guardianState = guardianState;
	}

	public long getLeftHp() {
		return leftHp;
	}

	public void setLeftHp(long leftHp) {
		this.leftHp = leftHp;
	}

	public long getScoreValue() {
		return getScore();
	}

	public void setScoreValue(long scoreValue) {
		this.scoreValue = scoreValue;
		setScore(scoreValue);
	}

	public long getScore() {
		return score.get();
	}

	public void setScore(long score) {
		this.score.set(score);
	}

	public void addScore(long addScore) {
		this.score.addAndGet(addScore);
	}

	public byte getBelongType() {
		return belongType;
	}

	public void setBelongType(byte belongType) {
		this.belongType = belongType;
	}

	public int getBelongZoneid() {
		return belongZoneid;
	}

	public void setBelongZoneid(int belongZoneid) {
		this.belongZoneid = belongZoneid;
	}

	public int getPosX() {
		return posX;
	}

	public void setPosX(int posX) {
		this.posX = posX;
	}

	public int getPosY() {
		return posY;
	}

	public void setPosY(int posY) {
		this.posY = posY;
	}

	public int getDeadTime() {
		return deadTime;
	}

	public void setDeadTime(int deadTime) {
		this.deadTime = deadTime;
	}

	public long getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(long updateTime) {
		this.updateTime = updateTime;
	}

	public Set<Integer> getAlreadyGet() {
		return alreadyGet;
	}

	public void setAlreadyGet(Set<Integer> alreadyGet) {
		this.alreadyGet = alreadyGet;
	}

	public int getFight() {
		return fight;
	}

	public void setFight(int fight) {
		this.fight = fight;
	}

	public long getLeftHudun() {
		return leftHudun;
	}

	public void setLeftHudun(long leftHudun) {
		this.leftHudun = leftHudun;
	}

	@Override
	public int compareTo(FireBeaconModel o) {
		if (o.getHid() == getHid()) {
			return 0;
		}
		if (o.getScore() > getScore()) {
			return 1;
		} else if (o.getScore() == getScore()) {
			if (o.getUpdateTime() < getUpdateTime()) {
				return 1;
			} else if (o.getUpdateTime() == getUpdateTime()) {
				if (o.getHid() > getHid()) {
					return 1;
				} else {
					return -1;
				}
			}
		}
		return -1;
	}

}
