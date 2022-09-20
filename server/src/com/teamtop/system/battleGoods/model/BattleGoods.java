package com.teamtop.system.battleGoods.model;

import java.util.Set;

/**
 * 粮草争夺 参与过的玩家
 * @author jjjjyyy
 *
 */
public class BattleGoods {
	/**
	 * 玩家id
	 */
	private long hid;
	/**
	 * 所属大区id
	 */
	private int fristzoneid;
	/**
	 * 所属阵营
	 */
	private int index;
	/**
	 * 玩家名字
	 */
	private String name;
	/**
	 * 跨服分组
	 */
	private  int partId;
	/**
	 * 房间id
	 */
	private  int roomId;
	/**
	 * 当前积分
	 */
	private int source;
	/**
	 * 积分达到的时间
	 */
	private int sourceTime;
	/**
	 * 上次退出时间+cd时间 
	 */
	private int outTime;
	/**
	 * 积分奖励情况
	 */
	private Set<Integer> reward;
	
	/**
	 * 头像
	 */
	private int icon;
	/**
	 * 头像框
	 */
	private int frame;
	
	
	
	public BattleGoods() {
		super();
	}
	public int getFristzoneid() {
		return fristzoneid;
	}

	public void setFristzoneid(int fristzoneid) {
		this.fristzoneid = fristzoneid;
	}

	public long getHid() {
		return hid;
	}
	public void setHid(long hid) {
		this.hid = hid;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getSource() {
		return source;
	}
	public void setSource(int source) {
		this.source = source;
	}
	public int getPartId() {
		return partId;
	}
	public void setPartId(int partId) {
		this.partId = partId;
	}
	public int getRoomId() {
		return roomId;
	}
	public void setRoomId(int roomId) {
		this.roomId = roomId;
	}
	public int getOutTime() {
		return outTime;
	}
	public void setOutTime(int outTime) {
		this.outTime = outTime;
	}
	public Set<Integer> getReward() {
		return reward;
	}
	public void setReward(Set<Integer> reward) {
		this.reward = reward;
	}
	public int getSourceTime() {
		return sourceTime;
	}
	public void setSourceTime(int sourceTime) {
		this.sourceTime = sourceTime;
	}
	public int getIndex() {
		return index;
	}
	public void setIndex(int index) {
		this.index = index;
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
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		BattleGoods other = (BattleGoods) obj;
		if (hid != other.hid)
			return false;
		return true;
	}
	
	

}
