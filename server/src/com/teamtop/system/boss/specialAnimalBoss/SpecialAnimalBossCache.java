package com.teamtop.system.boss.specialAnimalBoss;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentSkipListSet;

import com.teamtop.system.boss.specialAnimalBoss.model.BossKillerInfo;
import com.teamtop.system.boss.specialAnimalBoss.model.SpecialAnimalBossRank;

public class SpecialAnimalBossCache {

	private ConcurrentHashMap<Integer, BossKillerInfo> bossKillerMap = new ConcurrentHashMap<>();

	private ConcurrentSkipListSet<SpecialAnimalBossRank> passRank = new ConcurrentSkipListSet<>();

	private int weekResetTime;

	public ConcurrentHashMap<Integer, BossKillerInfo> getBossKillerMap() {
		return bossKillerMap;
	}

	public void setBossKillerMap(ConcurrentHashMap<Integer, BossKillerInfo> bossKillerMap) {
		this.bossKillerMap = bossKillerMap;
	}

	public ConcurrentSkipListSet<SpecialAnimalBossRank> getPassRank() {
		return passRank;
	}

	public void setPassRank(ConcurrentSkipListSet<SpecialAnimalBossRank> passRank) {
		this.passRank = passRank;
	}

	public int getWeekResetTime() {
		return weekResetTime;
	}

	public void setWeekResetTime(int weekResetTime) {
		this.weekResetTime = weekResetTime;
	}

}
