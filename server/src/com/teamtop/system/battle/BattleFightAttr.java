package com.teamtop.system.battle;

import java.util.List;
import java.util.Map;

import com.teamtop.system.hero.FinalFightAttr;

public class BattleFightAttr extends FinalFightAttr{
	/** 战斗类型*/
	private int entityType;
	/** 当前气血*/
	private double currhp;
	/** 当前mp*/
	private double currmp;
	/** 技能数据*/
	private List<int[]> skillList;
	/** key:buffid，value：timeout*/
	private Map<Integer, Integer> buffadd;
	
	public double getCurrmp() {
		return currmp;
	}
	public void setCurrmp(double currmp) {
		this.currmp = currmp;
	}
	public int getEntityType() {
		return entityType;
	}
	public void setEntityType(int entityType) {
		this.entityType = entityType;
	}
	public double getCurrhp() {
		return currhp;
	}
	public void setCurrhp(double currhp) {
		this.currhp = currhp;
	}
	public List<int[]> getSkillList() {
		return skillList;
	}
	public void setSkillList(List<int[]> skillList) {
		this.skillList = skillList;
	}
	public Map<Integer, Integer> getBuffadd() {
		return buffadd;
	}
	public void setBuffadd(Map<Integer, Integer> buffadd) {
		this.buffadd = buffadd;
	}
}
