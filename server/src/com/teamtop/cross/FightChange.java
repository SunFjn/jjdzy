package com.teamtop.cross;

import java.util.Map;

/**
 * 战力变化
 * @author Administrator
 *
 */
public class FightChange {
	private int heroCount;
	private int petCount;
	private Map<Integer, Integer> genCountMap;
	public int getHeroCount() {
		return heroCount;
	}
	public void setHeroCount(int heroCount) {
		this.heroCount = heroCount;
	}
	public int getPetCount() {
		return petCount;
	}
	public void setPetCount(int petCount) {
		this.petCount = petCount;
	}
	public Map<Integer, Integer> getGenCountMap() {
		return genCountMap;
	}
	public void setGenCountMap(Map<Integer, Integer> genCountMap) {
		this.genCountMap = genCountMap;
	}
	
	
	
}
