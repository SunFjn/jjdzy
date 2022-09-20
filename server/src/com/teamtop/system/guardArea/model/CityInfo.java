package com.teamtop.system.guardArea.model;

import com.teamtop.system.godbook.GodBook;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.littleLeader.LittleLeader;
import com.teamtop.system.skill.model.Skill;
import com.teamtop.system.treasure.model.TreasureData;
import com.teamtop.util.db.trans.FieldOrder;

public class CityInfo {
	/*** 玩家id */
	@FieldOrder(order = 1)
	private long hid;
	/** 城池id */
	@FieldOrder(order = 2)
	private int cityId;
	/** 武将id */
	@FieldOrder(order = 3)
	private int wuJiangId;
	/** 城池状态 */
	@FieldOrder(order = 4)
	private int state;
	/** 驻守时间 */
	@FieldOrder(order = 5)
	private int startTime;
	/** 加成百分比 */
	@FieldOrder(order = 6)
	private double addValue;
	/** 被掠夺次数 */
	@FieldOrder(order = 7)
	private int plunderTimes;
	/*** 战力 */
	@FieldOrder(order = 8)
	private long strength;
	/** 技能 **/
	@FieldOrder(order = 9)
	private Skill skill;
	/** 战斗属性详细 **/
	@FieldOrder(order = 10)
	private FinalFightAttr finalFightAttr;
	/** 出战兽魂 */
	@FieldOrder(order = 11)
	private int figthMonsterSpirit;
	/** 少主信息 */
	@FieldOrder(order = 12)
	private LittleLeader littleLeader;
	/** 玩家姓名 */
	@FieldOrder(order = 13)
	private String name;
	/** 国家id */
	@FieldOrder(order = 14)
	private int countryId;
	/** 神将之力技能进阶 */
	@FieldOrder(order = 15)
	private int godSkillLevel;
	/** 宝物 */
	@FieldOrder(order = 16)
	private TreasureData baowu;
	/** 天书 */
	@FieldOrder(order = 17)
	private GodBook tianshu;

	public TreasureData getBaowu() {
		return baowu;
	}

	public void setBaowu(TreasureData baowu) {
		this.baowu = baowu;
	}

	public GodBook getTianshu() {
		return tianshu;
	}

	public void setTianshu(GodBook tianshu) {
		this.tianshu = tianshu;
	}


	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public int getCityId() {
		return cityId;
	}

	public void setCityId(int cityId) {
		this.cityId = cityId;
	}

	public int getWuJiangId() {
		return wuJiangId;
	}

	public void setWuJiangId(int wuJiangId) {
		this.wuJiangId = wuJiangId;
	}

	public int getState() {
		return state;
	}

	public void setState(int state) {
		this.state = state;
	}

	public int getStartTime() {
		return startTime;
	}

	public void setStartTime(int startTime) {
		this.startTime = startTime;
	}

	public double getAddValue() {
		return addValue;
	}

	public void setAddValue(double addValue) {
		this.addValue = addValue;
	}

	public int getPlunderTimes() {
		return plunderTimes;
	}

	public void setPlunderTimes(int plunderTimes) {
		this.plunderTimes = plunderTimes;
	}

	public long getStrength() {
		return strength;
	}

	public void setStrength(long strength) {
		this.strength = strength;
	}

	public Skill getSkill() {
		return skill;
	}

	public void setSkill(Skill skill) {
		this.skill = skill;
	}

	public FinalFightAttr getFinalFightAttr() {
		return finalFightAttr;
	}

	public void setFinalFightAttr(FinalFightAttr finalFightAttr) {
		this.finalFightAttr = finalFightAttr;
	}

	public int getFigthMonsterSpirit() {
		return figthMonsterSpirit;
	}

	public void setFigthMonsterSpirit(int figthMonsterSpirit) {
		this.figthMonsterSpirit = figthMonsterSpirit;
	}

	public LittleLeader getLittleLeader() {
		return littleLeader;
	}

	public void setLittleLeader(LittleLeader littleLeader) {
		this.littleLeader = littleLeader;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getCountryId() {
		return countryId;
	}

	public void setCountryId(int countryId) {
		this.countryId = countryId;
	}

	public int getGodSkillLevel() {
		return godSkillLevel;
	}

	public void setGodSkillLevel(int godSkillLevel) {
		this.godSkillLevel = godSkillLevel;
	}
}
