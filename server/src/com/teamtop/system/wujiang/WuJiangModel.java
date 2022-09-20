package com.teamtop.system.wujiang;

import java.util.HashMap;

import com.teamtop.util.db.trans.FieldOrder;

public class WuJiangModel {
	/**
	 * 武将职业
	 */
	@FieldOrder(order=1)
	private int type;
	/**
	 * 武将星级
	 */
	@FieldOrder(order=2)
	private int star;
	/**
	 * 神将之力
	 */
	@FieldOrder(order=3)
	private int godStar;
	/**
	 * 觉醒技能/觉醒之力 技能（0-2）3觉醒之力
	 */
	@FieldOrder(order=4)
	private HashMap<Integer, Integer> jueXingSkills;
	
	/**
	 * 神将天赋
	 */
	@FieldOrder(order=5)
	private int talentLv;
	/**
	 * 修炼等级
	 */
	@FieldOrder(order=6)
	private int xiulianLv;
	/**
	 * 神将之力技能进阶等级
	 */
	@FieldOrder(order = 7)
	private int godSkillLevel;
	
	public WuJiangModel() {
		super();
	}
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
	public int getStar() {
		return star;
	}
	public void setStar(int star) {
		this.star = star;
	}
	public int getGodStar() {
		return godStar;
	}
	public void setGodStar(int godStar) {
		this.godStar = godStar;
	}
	public HashMap<Integer, Integer> getJueXingSkills() {
		return jueXingSkills;
	}
	public void setJueXingSkills(HashMap<Integer, Integer> jueXingSkills) {
		this.jueXingSkills = jueXingSkills;
	}
	public int getTalentLv() {
		return talentLv;
	}
	public void setTalentLv(int talentLv) {
		this.talentLv = talentLv;
	}
	public int getXiulianLv() {
		return xiulianLv;
	}
	public void setXiulianLv(int xiulianLv) {
		this.xiulianLv = xiulianLv;
	}

	public int getGodSkillLevel() {
		return godSkillLevel;
	}

	public void setGodSkillLevel(int godSkillLevel) {
		this.godSkillLevel = godSkillLevel;
	}


}
