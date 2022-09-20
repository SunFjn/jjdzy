package com.teamtop.system.crossZhuLu.model;

import java.util.List;

import com.teamtop.system.godbook.GodBook;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.ShowModel;
import com.teamtop.system.littleLeader.LittleLeader;
import com.teamtop.system.skill.model.Skill;
import com.teamtop.system.treasure.model.TreasureData;
import com.teamtop.util.cache.CacheModel;
import com.teamtop.util.db.trans.FieldOrder;

public class CrossZhuLuHeroInfo extends CacheModel implements Comparable<CrossZhuLuHeroInfo> {
	/** 角色id */
	@FieldOrder(order = 1)
	private long hid;
	/** 当前城池位置 */
	@FieldOrder(order = 2)
	private int cityId;
	/** 当前状态 */
	@FieldOrder(order = 3)
	private int state;
	/** 当前积分 */
	@FieldOrder(order = 4)
	private long score;
	/** 更新积分时间 */
	@FieldOrder(order = 5)
	private int updateScoreTime;
	/** 当前体力 */
	@FieldOrder(order = 6)
	private int tiLi;
	/** 更新体力时间 */
	@FieldOrder(order = 7)
	private int updateTiLiTime;
	/** 最大体力 */
	@FieldOrder(order = 8)
	private int maxTiLi;
	/** 跨服组id,弃用 */
	@FieldOrder(order = 9)
	private int partId;
	/** 国家id */
	@FieldOrder(order = 10)
	private int countryId;
	/** 对象职业 **/
	@FieldOrder(order = 11)
	private int job;
	/*** 战力 */
	@FieldOrder(order = 12)
	private long strength;
	/*** 角色显示模型 */
	@FieldOrder(order = 13)
	private ShowModel model;
	/** 技能 **/
	@FieldOrder(order = 14)
	private Skill skill;
	/** 战斗属性详细 **/
	@FieldOrder(order = 15)
	private FinalFightAttr finalFightAttr;
	/** 出战兽魂 */
	@FieldOrder(order = 16)
	private int figthMonsterSpirit;
	/** 少主信息 */
	@FieldOrder(order = 17)
	private LittleLeader littleLeader;
	/** 玩家姓名 */
	@FieldOrder(order = 18)
	private String name;
	/*** 头像 */
	@FieldOrder(order = 19)
	private int herdid;
	/*** 头像框 */
	@FieldOrder(order = 20)
	private int iconid;
	/** 驻守奖励 */
	@FieldOrder(order = 21)
	private List<CrossZhuLuDefendAward> rewards;
	/** 今日积分 */
	@FieldOrder(order = 22)
	private long todayScore;
	/** 刷新今日积分时间 */
	@FieldOrder(order = 23)
	private int todayScoreTime;
	/** 神将之力技能进阶 */
	@FieldOrder(order = 24)
	private int godSkillLevel;
	/** 宝物 */
	@FieldOrder(order = 25)
	private TreasureData baowu;
	/** 天书 */
	@FieldOrder(order = 26)
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

	@Override
	public int compareTo(CrossZhuLuHeroInfo o) {
		if (o.getScore() > getScore()) {
			return 1;
		} else if (o.getScore() == getScore()) {
			if (o.getUpdateScoreTime() < getUpdateScoreTime()) {
				return 1;
			} else if (o.getUpdateScoreTime() == getUpdateScoreTime()) {
				return -1;
			}
		}
		return -1;
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

	public int getState() {
		return state;
	}

	public void setState(int state) {
		this.state = state;
	}

	public long getScore() {
		return score;
	}

	public void setScore(long score) {
		this.score = score;
	}

	public int getUpdateScoreTime() {
		return updateScoreTime;
	}

	public void setUpdateScoreTime(int updateScoreTime) {
		this.updateScoreTime = updateScoreTime;
	}

	public int getTiLi() {
		return tiLi;
	}

	public void setTiLi(int tiLi) {
		this.tiLi = tiLi;
	}

	public int getUpdateTiLiTime() {
		return updateTiLiTime;
	}

	public void setUpdateTiLiTime(int updateTiLiTime) {
		this.updateTiLiTime = updateTiLiTime;
	}

	public int getMaxTiLi() {
		return maxTiLi;
	}

	public void setMaxTiLi(int maxTiLi) {
		this.maxTiLi = maxTiLi;
	}
	
	/**
	 * 不能通过此方法获取partId
	 */
	@Deprecated
	public int getPartId() {
		return partId;
	}

	public void setPartId(int partId) {
		this.partId = partId;
	}

	public int getCountryId() {
		return countryId;
	}

	public void setCountryId(int countryId) {
		this.countryId = countryId;
	}

	public int getJob() {
		return job;
	}

	public void setJob(int job) {
		this.job = job;
	}

	public long getStrength() {
		return strength;
	}

	public void setStrength(long strength) {
		this.strength = strength;
	}

	public ShowModel getModel() {
		return model;
	}

	public void setModel(ShowModel model) {
		this.model = model;
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

	public int getHerdid() {
		return herdid;
	}

	public void setHerdid(int herdid) {
		this.herdid = herdid;
	}

	public int getIconid() {
		return iconid;
	}

	public void setIconid(int iconid) {
		this.iconid = iconid;
	}

	public List<CrossZhuLuDefendAward> getRewards() {
		return rewards;
	}

	public void setRewards(List<CrossZhuLuDefendAward> rewards) {
		this.rewards = rewards;
	}

	public long getTodayScore() {
		return todayScore;
	}

	public void setTodayScore(long todayScore) {
		this.todayScore = todayScore;
	}

	public int getTodayScoreTime() {
		return todayScoreTime;
	}

	public void setTodayScoreTime(int todayScoreTime) {
		this.todayScoreTime = todayScoreTime;
	}

	public int getGodSkillLevel() {
		return godSkillLevel;
	}

	public void setGodSkillLevel(int godSkillLevel) {
		this.godSkillLevel = godSkillLevel;
	}


}
