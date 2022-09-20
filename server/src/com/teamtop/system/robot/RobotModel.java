package com.teamtop.system.robot;

import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.skill.model.Skill;

public class RobotModel {

	private long uid;

	private String name;

	private int level;

	private int rebornlv;

	private int job;

	private int countryType;

	private int icon;

	private int frame;

	private long totalStrength;

	private FinalFightAttr finalFightAttr;

	private Skill skill;

	public long getUid() {
		return uid;
	}

	public void setUid(long uid) {
		this.uid = uid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}

	public int getRebornlv() {
		return rebornlv;
	}

	public void setRebornlv(int rebornlv) {
		this.rebornlv = rebornlv;
	}

	public int getJob() {
		return job;
	}

	public void setJob(int job) {
		this.job = job;
	}

	public int getCountryType() {
		return countryType;
	}

	public void setCountryType(int countryType) {
		this.countryType = countryType;
	}

	public int getIcon() {
		return icon;
	}

	public void setIcon(int icon) {
		this.icon = icon;
	}

	public int getFrame() {
		return frame;
	}

	public void setFrame(int frame) {
		this.frame = frame;
	}

	public long getTotalStrength() {
		return totalStrength;
	}

	public void setTotalStrength(long totalStrength) {
		this.totalStrength = totalStrength;
	}

	public FinalFightAttr getFinalFightAttr() {
		return finalFightAttr;
	}

	public void setFinalFightAttr(FinalFightAttr finalFightAttr) {
		this.finalFightAttr = finalFightAttr;
	}

	public Skill getSkill() {
		return skill;
	}

	public void setSkill(Skill skill) {
		this.skill = skill;
	}

}
