package com.teamtop.system.boss.personalBoss.model;

import java.util.Map;

import com.teamtop.util.db.trans.FieldOrder;
import com.teamtop.util.time.TimeDateUtil;

public class PersonalBoss {

	/**
	 * boss集合
	 */
	@FieldOrder(order = 1)
	private Map<Integer, BossInfo> bossMap;

	/**
	 * 重置时间
	 */
	@FieldOrder(order = 2)
	private int resetTime;

	public PersonalBoss() {
		this.resetTime = TimeDateUtil.getCurrentTime();
	}

	public Map<Integer, BossInfo> getBossMap() {
		return bossMap;
	}

	public void setBossMap(Map<Integer, BossInfo> bossMap) {
		this.bossMap = bossMap;
	}

	public int getResetTime() {
		return resetTime;
	}

	public void setResetTime(int resetTime) {
		this.resetTime = resetTime;
	}

}
