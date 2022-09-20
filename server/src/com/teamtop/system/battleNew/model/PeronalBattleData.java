package com.teamtop.system.battleNew.model;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import com.teamtop.system.hero.FinalFightAttr;

public class PeronalBattleData {

	private long hid;

	/**
	 * 战斗阵营
	 */
	private int campType;

	/** 当前气血 */
	private long hp;

	/** 护盾 */
	private long hudun;

	private FinalFightAttr attr;

	/**
	 * key:技能id， value:伤害信息
	 */
	private Map<Integer, SkillDamage> skillMap = new HashMap<>();

	/**
	 * key:effectType, value:效果结束时间
	 */
	private Map<Integer, Long> skillEffectMap = new HashMap<>();

	/**
	 * key:buffid, value:buff信息
	 */
	private Map<Integer, BuffInfo> buffMap = new HashMap<>();

	/***
	 * 公共类型buffcd
	 */
	private Map<Integer, Long> pubBuffCdMap = new HashMap<>();

	/**
	 * buff增加的临时属性
	 */
	private Map<Integer, int[][]> buffTempAttrMap = new HashMap<>();
	
	/**
	 * 只触发一次作用于敌人的buff
	 */
	private Set<Integer> onceEffectEnermyBuffSet = new HashSet<>();

	/**
	 * ncp技能
	 */
	private int[][] npcSkill;

	/**
	 * npc等级
	 */
	private int npcLevel;

	/**
	 * npc战斗类型（1：百分比扣血，2：秒伤扣血，3：ai技能释放）BattleNewConst
	 */
	private int npcFightType;

	/**
	 * 是否NPC
	 */
	private boolean isNpc;

	/**
	 * buff复活次数
	 */
	private int buffRelive;

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public int getCampType() {
		return campType;
	}

	public void setCampType(int campType) {
		this.campType = campType;
	}

	public long getHp() {
		return hp;
	}

	public void setHp(long hp) {
		this.hp = hp;
	}

	public long getHudun() {
		return hudun;
	}

	public void setHudun(long hudun) {
		this.hudun = hudun;
	}

	public FinalFightAttr getAttr() {
		return attr;
	}

	public void setAttr(FinalFightAttr attr) {
		this.attr = attr;
	}

	public Map<Integer, SkillDamage> getSkillMap() {
		return skillMap;
	}

	public void setSkillMap(Map<Integer, SkillDamage> skillMap) {
		this.skillMap = skillMap;
	}

	public Map<Integer, Long> getSkillEffectMap() {
		return skillEffectMap;
	}

	public void setSkillEffectMap(Map<Integer, Long> skillEffectMap) {
		this.skillEffectMap = skillEffectMap;
	}

	public Map<Integer, BuffInfo> getBuffMap() {
		return buffMap;
	}

	public void setBuffMap(Map<Integer, BuffInfo> buffMap) {
		this.buffMap = buffMap;
	}

	public Map<Integer, Long> getPubBuffCdMap() {
		return pubBuffCdMap;
	}

	public void setPubBuffCdMap(Map<Integer, Long> pubBuffCdMap) {
		this.pubBuffCdMap = pubBuffCdMap;
	}

	public Map<Integer, int[][]> getBuffTempAttrMap() {
		return buffTempAttrMap;
	}

	public void setBuffTempAttrMap(Map<Integer, int[][]> buffTempAttrMap) {
		this.buffTempAttrMap = buffTempAttrMap;
	}

	public int[][] getNpcSkill() {
		return npcSkill;
	}

	public void setNpcSkill(int[][] npcSkill) {
		this.npcSkill = npcSkill;
	}

	public int getNpcLevel() {
		return npcLevel;
	}

	public void setNpcLevel(int npcLevel) {
		this.npcLevel = npcLevel;
	}

	public int getNpcFightType() {
		return npcFightType;
	}

	public void setNpcFightType(int npcFightType) {
		this.npcFightType = npcFightType;
	}

	public boolean isNpc() {
		return isNpc;
	}

	public void setNpc(boolean isNpc) {
		this.isNpc = isNpc;
	}

	public int getBuffRelive() {
		return buffRelive;
	}

	public void setBuffRelive(int buffRelive) {
		this.buffRelive = buffRelive;
	}

	public Set<Integer> getOnceEffectEnermyBuffSet() {
		return onceEffectEnermyBuffSet;
	}

	public void setOnceEffectEnermyBuffSet(Set<Integer> onceEffectEnermyBuffSet) {
		this.onceEffectEnermyBuffSet = onceEffectEnermyBuffSet;
	}

}
