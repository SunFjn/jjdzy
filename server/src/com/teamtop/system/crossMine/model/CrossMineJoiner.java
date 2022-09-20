package com.teamtop.system.crossMine.model;

import java.util.List;

import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.ShowModel;
import com.teamtop.system.littleLeader.LittleLeader;
import com.teamtop.system.skill.model.Skill;
import com.teamtop.system.title.TitleModel;
import com.teamtop.system.wujiang.WuJiang;
import com.teamtop.util.db.trans.FieldOrder;

/**
 * 挖矿队员
 * 
 * @author jjjjyyy
 *
 */
public class CrossMineJoiner {
	/** 玩家id就是队伍id */
	@FieldOrder(order = 1)
	private long hid;
	/** 对象职业 **/
	@FieldOrder(order = 2)
	private int job;
	/*** 战力 */
	@FieldOrder(order = 3)
	private long strength;
	/*** 国家 */
	@FieldOrder(order = 4)
	private int country;
	/*** 头像 */
	@FieldOrder(order = 5)
	private int herdid;
	/*** 头像框 */
	@FieldOrder(order = 6)
	private int iconid;
	/*** 角色显示模型 */
	@FieldOrder(order = 7)
	private ShowModel model;
	/** 技能 **/
	@FieldOrder(order = 8)
	private Skill skill;
	@FieldOrder(order = 9)
	/** 战斗属性详细 **/
	private FinalFightAttr finalFightAttr;
	/** 出战兽魂 */
	@FieldOrder(order = 10)
	private int figthMonsterSpirit;
	/** 少主信息 */
	@FieldOrder(order = 11)
	private LittleLeader littleLeader;
	/** 玩家姓名 */
	@FieldOrder(order = 12)
	private String name;
	/*** 上次结算开采时间 */
	@FieldOrder(order = 13)
	private long startTime;
	/** 挖矿奖励 */
	@FieldOrder(order = 14)
	private List<CrossMineAward> rewards;
	/** 将衔等级 */
	@FieldOrder(order = 15)
	private int official;
	/** 武将信息 */
	@FieldOrder(order = 16)
	private WuJiang wujiang;
	/** 称号信息 */
	@FieldOrder(order = 17)
	private TitleModel titleModel;
	/** 所属区号*/
	@FieldOrder(order = 18)
	private int belongZoneid;

	public CrossMineJoiner() {
		super();
	}

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
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

	public int getCountry() {
		return country;
	}

	public void setCountry(int country) {
		this.country = country;
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

	public long getStartTime() {
		return startTime;
	}

	public void setStartTime(long startTime) {
		this.startTime = startTime;
	}

	public List<CrossMineAward> getRewards() {
		return rewards;
	}

	public void setRewards(List<CrossMineAward> rewards) {
		this.rewards = rewards;
	}

	public int getOfficial() {
		return official;
	}

	public void setOfficial(int official) {
		this.official = official;
	}

	public WuJiang getWujiang() {
		return wujiang;
	}

	public void setWujiang(WuJiang wujiang) {
		this.wujiang = wujiang;
	}

	public TitleModel getTitleModel() {
		return titleModel;
	}

	public void setTitleModel(TitleModel titleModel) {
		this.titleModel = titleModel;
	}

	public int getBelongZoneid() {
		return belongZoneid;
	}

	public void setBelongZoneid(int belongZoneid) {
		this.belongZoneid = belongZoneid;
	}

}
