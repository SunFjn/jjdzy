package com.teamtop.system.battleNew.model;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class SkillDamage {

	private int skillId;

	/** 最后一次使用时间 */
	private long lastUseTime;

	/** 对敌方阵营各个玩家的伤害 */
	private Map<Long, Long> damageMap = new HashMap<>();

	/** 暴伤 */
	private Set<Long> criticalSet = new HashSet<>();

	/** 是否已经击中*/
	private byte hit;

	public SkillDamage() {
		// TODO Auto-generated constructor stub
	}

	public SkillDamage(int skillId, long lastUseTime) {
		super();
		this.skillId = skillId;
		this.lastUseTime = lastUseTime;
	}

	public int getSkillId() {
		return skillId;
	}

	public void setSkillId(int skillId) {
		this.skillId = skillId;
	}

	public long getLastUseTime() {
		return lastUseTime;
	}

	public void setLastUseTime(long lastUseTime) {
		this.lastUseTime = lastUseTime;
	}

	public Map<Long, Long> getDamageMap() {
		return damageMap;
	}

	public void setDamageMap(Map<Long, Long> damageMap) {
		this.damageMap = damageMap;
	}

	public Set<Long> getCriticalSet() {
		return criticalSet;
	}

	public void setCriticalSet(Set<Long> criticalSet) {
		this.criticalSet = criticalSet;
	}
	
}
