package com.teamtop.system.shaozhuEscort.model;

import java.util.List;

import com.teamtop.util.db.trans.FieldOrder;

public class ShaoZhuEscortRecord {
	@FieldOrder(order = 1)
	private long interceptHid;
	@FieldOrder(order = 2)
	private String interceptName;

	/** 到达时间,此处用来判断是否同一个玩家同一护送的东西 */
	@FieldOrder(order = 3)
	private int reachTime;
	/**
	 * 战斗结果：0失败，1胜利
	 */
	@FieldOrder(order = 4)
	private int battleResult;

	/**
	 * 少主护送录像缓存 [0]:本人,[1]:对方
	 */
	@FieldOrder(order = 5)
	private List<ShaoZhuEscortPlayBack> playBackList;

	public long getInterceptHid() {
		return interceptHid;
	}

	public String getInterceptName() {
		return interceptName;
	}

	public void setInterceptHid(long interceptHid) {
		this.interceptHid = interceptHid;
	}

	public void setInterceptName(String interceptName) {
		this.interceptName = interceptName;
	}

	public int getBattleResult() {
		return battleResult;
	}

	public void setBattleResult(int battleResult) {
		this.battleResult = battleResult;
	}

	public List<ShaoZhuEscortPlayBack> getPlayBackList() {
		return playBackList;
	}

	public void setPlayBackList(List<ShaoZhuEscortPlayBack> playBackList) {
		this.playBackList = playBackList;
	}

	public int getReachTime() {
		return reachTime;
	}

	public void setReachTime(int reachTime) {
		this.reachTime = reachTime;
	}

}
