package com.teamtop.system.monsterSpirit.model;

import java.util.HashMap;
import java.util.Map;

import com.teamtop.util.db.trans.FieldOrder;

public class MonsterSpiritInfo {
	/**
	 * 兽灵id
	 */
	@FieldOrder(order = 1)
	private int id;

	/**
	 * 兽灵等级
	 */
	@FieldOrder(order = 2)
	private int level;

	/**
	 * key:部位，value:装备信息
	 */
	@FieldOrder(order = 3)
	private Map<Integer, MonsterSpiritEquip> msEquipMap = new HashMap<>();

	/**
	 * 星宿等级
	 */
	@FieldOrder(order = 4)
	private int starLevel;

	/**
	 * 激活状态（1：已激活）
	 */
	@FieldOrder(order = 5)
	private int activate;

	/**
	 * 兽灵类型
	 */
	@FieldOrder(order = 6)
	private int type;

	/**
	 * 星宿当前阶数
	 */
	@FieldOrder(order = 7)
	private int grade;

	/**
	 * key 化形id value 0未激活 1化形 2激活
	 */
	@FieldOrder(order = 8)
	private Map<Integer, Integer> changeMap;

	public Map<Integer, Integer> getChangeMap() {
		return changeMap;
	}

	public void setChangeMap(Map<Integer, Integer> changeMap) {
		this.changeMap = changeMap;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}

	public Map<Integer, MonsterSpiritEquip> getMsEquipMap() {
		return msEquipMap;
	}

	public void setMsEquipMap(Map<Integer, MonsterSpiritEquip> msEquipMap) {
		this.msEquipMap = msEquipMap;
	}

	public int getStarLevel() {
		return starLevel;
	}

	public void setStarLevel(int starLevel) {
		this.starLevel = starLevel;
	}

	public int getActivate() {
		return activate;
	}

	public void setActivate(int activate) {
		this.activate = activate;
	}

	public int getType() {
		return type;
	}

	public void setType(int type) {
		this.type = type;
	}

	public int getGrade() {
		return grade;
	}

	public void setGrade(int grade) {
		this.grade = grade;
	}

}
