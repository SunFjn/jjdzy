package com.teamtop.system.skill.model;

import java.util.Map;
import java.util.Set;

import com.teamtop.util.db.trans.FieldOrder;

public class Skill {
	/**
	 * 玩家id
	 */
	@FieldOrder(order = 1)
	private long hid;
	
	/**
	 * 技能id
	 */
	@FieldOrder(order = 2)
	private Map<Integer, SkillInfo> skillMap;
	
	/**
	 * 阵眼信息
	 */
	@FieldOrder(order = 3)
	private Set<Integer> photoCenterSet;

	/**
	 * 系统开启奖励（0:未领取，1：已领取）
	 */
	@FieldOrder(order = 4)
	private int openAward;

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public Map<Integer, SkillInfo> getSkillMap() {
		return skillMap;
	}

	public void setSkillMap(Map<Integer, SkillInfo> skillMap) {
		this.skillMap = skillMap;
	}

	public Set<Integer> getPhotoCenterSet() {
		return photoCenterSet;
	}

	public void setPhotoCenterSet(Set<Integer> photoCenterSet) {
		this.photoCenterSet = photoCenterSet;
	}

	public int getOpenAward() {
		return openAward;
	}

	public void setOpenAward(int openAward) {
		this.openAward = openAward;
	}

}
