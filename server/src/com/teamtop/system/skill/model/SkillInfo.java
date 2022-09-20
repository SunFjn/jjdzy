package com.teamtop.system.skill.model;

import com.teamtop.util.db.trans.FieldOrder;

public class SkillInfo {
	/**
	 * 技能id
	 */
	@FieldOrder(order = 1)
	private int id;
	/**
	 * 技能等级
	 */
	@FieldOrder(order = 2)
	private int level;
	/**
	 * 技能上次使用时间
	 */
	@FieldOrder(order = 3)
	private long time;
	
	public SkillInfo() {
		
	}

	public SkillInfo(int id, int level, long time) {
		super();
		this.id = id;
		this.level = level;
		this.time = time;
	}



	public long getTime() {
		return time;
	}



	public void setTime(long time) {
		this.time = time;
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

}
