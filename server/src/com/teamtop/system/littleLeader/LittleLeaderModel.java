package com.teamtop.system.littleLeader;

import java.util.HashMap;

import com.teamtop.util.db.trans.FieldOrder;

public class LittleLeaderModel {
	
	@FieldOrder(order=1)
	private int index;
	/**
	 * 当前皮肤
	 */
	@FieldOrder(order=2)
	private int nowFashId;
	/**
	 * 亲密度等级
	 */
	@FieldOrder(order=3)
	private int	qimiduLv;
	/**
	 * 亲密度经验
	 */
	@FieldOrder(order=4)
	private int exp;
	/**
	 * 星级
	 */
	@FieldOrder(order=5)
	private int star;
	/**
	 * 主动技能等级
	 */
	@FieldOrder(order=6)
	private int activityKillLv; 
	/**
	 * 其他被动技能
	 */
	@FieldOrder(order=7)
	private HashMap<Integer, Integer> otherSkillLv;
	/**
	 * 时装星级
	 */
	@FieldOrder(order=8)
	private HashMap<Integer, Integer> clothesStar;
	/**
	 * 待选技能
	 */
	@FieldOrder(order=9)
	private HashMap<Integer,HashMap<Integer, Integer>> chooseSkills;
	
	/**
	 * 被动技能栏对应的洗练次数
	 */
	@FieldOrder(order=10)
	private HashMap<Integer, Integer> washNumByIndex;
	
	/**
	 * 学堂ID
	 */
	@FieldOrder(order=11)
	private int schoolId;
	/**
	 * 六艺信息<六艺id，六艺信息>
	 */
	@FieldOrder(order=12)
	private HashMap<Integer,SixArtsModel> sixArts;

	/**
	 * 潜能id
	 */
	@FieldOrder(order=13)
	private int qiannengId;
	/**
	 * 服食<吞噬丹索引id,数量>
	 */
	@FieldOrder(order=14)
	private HashMap<Integer,Integer> swallow;
	
	public LittleLeaderModel() {
		super();
	}
	public int getIndex() {
		return index;
	}
	public void setIndex(int index) {
		this.index = index;
	}
	public int getNowFashId() {
		return nowFashId;
	}
	public void setNowFashId(int nowFashId) {
		this.nowFashId = nowFashId;
	}
	public int getQimiduLv() {
		return qimiduLv;
	}
	public void setQimiduLv(int qimiduLv) {
		this.qimiduLv = qimiduLv;
	}
	public int getExp() {
		return exp;
	}
	public void setExp(int exp) {
		this.exp = exp;
	}
	public int getStar() {
		return star;
	}
	public void setStar(int star) {
		this.star = star;
	}
	public int getActivityKillLv() {
		return activityKillLv;
	}
	public void setActivityKillLv(int activityKillLv) {
		this.activityKillLv = activityKillLv;
	}
	public HashMap<Integer, Integer> getOtherSkillLv() {
		return otherSkillLv;
	}
	public void setOtherSkillLv(HashMap<Integer, Integer> otherSkillLv) {
		this.otherSkillLv = otherSkillLv;
	}
	public HashMap<Integer, Integer> getClothesStar() {
		return clothesStar;
	}
	public void setClothesStar(HashMap<Integer, Integer> clothesStar) {
		this.clothesStar = clothesStar;
	}
	public HashMap<Integer, HashMap<Integer, Integer>> getChooseSkills() {
		return chooseSkills;
	}
	public void setChooseSkills(HashMap<Integer, HashMap<Integer, Integer>> chooseSkills) {
		this.chooseSkills = chooseSkills;
	}
	public HashMap<Integer, Integer> getWashNumByIndex() {
		return washNumByIndex;
	}
	public void setWashNumByIndex(HashMap<Integer, Integer> washNumByIndex) {
		this.washNumByIndex = washNumByIndex;
	}
	
	public int getSchoolId() {
		if(schoolId == 0) {
			return 1;
		}
		return schoolId;
	}
	public void setSchoolId(int schoolId) {
		this.schoolId = schoolId;
	}
	public HashMap<Integer, SixArtsModel> getSixArts() {
		return sixArts;
	}
	public void setSixArts(HashMap<Integer, SixArtsModel> sixArts) {
		this.sixArts = sixArts;
	}
	public int getQiannengId() {
		if(qiannengId == 0) {
			qiannengId = LittleLeaderFunction.getIns().getQiannengId(index);
		}
		return qiannengId;
	}
	public void setQiannengId(int qiannengId) {
		this.qiannengId = qiannengId;
	}
	public HashMap<Integer, Integer> getSwallow() {
		return swallow;
	}
	public void setSwallow(HashMap<Integer, Integer> swallow) {
		this.swallow = swallow;
	}
}
