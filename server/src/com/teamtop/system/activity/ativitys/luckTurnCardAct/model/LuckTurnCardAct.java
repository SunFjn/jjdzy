package com.teamtop.system.activity.ativitys.luckTurnCardAct.model;

import java.util.Map;

import com.teamtop.system.activity.model.ActivityData;

public class LuckTurnCardAct extends ActivityData {
	/** 翻牌次数 */
	private int turnCardTimes;
	/** 累胜次数 */
	private int victoryTimes;
	/** 翻牌key:index value:状态:1已抽中，2未抽中，3未抽中 */
	private Map<Byte, Byte> turnCardMap;
	/** 奖励状态key:配置表id value:1：可领取，2：已领取 */
	private Map<Integer, Byte> awardStateMap;

	public LuckTurnCardAct() {
	}

	public LuckTurnCardAct(long hid, int indexId, int actId, int periods) {
		super(hid, indexId, actId, periods);
	}

	public int getTurnCardTimes() {
		return turnCardTimes;
	}

	public int getVictoryTimes() {
		return victoryTimes;
	}

	public void setTurnCardTimes(int turnCardTimes) {
		this.turnCardTimes = turnCardTimes;
	}

	public void setVictoryTimes(int victoryTimes) {
		this.victoryTimes = victoryTimes;
	}

	public Map<Integer, Byte> getAwardStateMap() {
		return awardStateMap;
	}

	public void setAwardStateMap(Map<Integer, Byte> awardStateMap) {
		this.awardStateMap = awardStateMap;
	}

	public Map<Byte, Byte> getTurnCardMap() {
		return turnCardMap;
	}

	public void setTurnCardMap(Map<Byte, Byte> turnCardMap) {
		this.turnCardMap = turnCardMap;
	}

}
