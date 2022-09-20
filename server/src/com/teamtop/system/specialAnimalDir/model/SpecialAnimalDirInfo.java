package com.teamtop.system.specialAnimalDir.model;

import java.util.HashMap;
import java.util.Map;

import com.teamtop.util.db.trans.FieldOrder;

public class SpecialAnimalDirInfo {
	/** 异兽录升级表等级lv */
	@FieldOrder(order = 1)
	private int upId;
	/** 异兽录套装表等级lv */
	@FieldOrder(order = 2)
	private int suitId;
	/** 当前经验 */
	@FieldOrder(order = 3)
	private int curExp;
	/** 阶数 */
	@FieldOrder(order = 4)
	private int step;
	/** 天赋技能*/
	@FieldOrder(order = 5)
	private int talentSkill;
	/** 天赋装备*/
	@FieldOrder(order = 6)
	private Map<Integer, TalentEquipInfo> talentEquip = new HashMap<>();

	public int getUpId() {
		return upId;
	}

	public int getSuitId() {
		return suitId;
	}

	public void setUpId(int upId) {
		this.upId = upId;
	}

	public void setSuitId(int suitId) {
		this.suitId = suitId;
	}

	public int getCurExp() {
		return curExp;
	}

	public void setCurExp(int curExp) {
		this.curExp = curExp;
	}

	public int getStep() {
		return step;
	}

	public void setStep(int step) {
		this.step = step;
	}

	public int getTalentSkill() {
		return talentSkill;
	}

	public void setTalentSkill(int talentSkill) {
		this.talentSkill = talentSkill;
	}

	public Map<Integer, TalentEquipInfo> getTalentEquip() {
		return talentEquip;
	}

	public void setTalentEquip(Map<Integer, TalentEquipInfo> talentEquip) {
		this.talentEquip = talentEquip;
	}

}
