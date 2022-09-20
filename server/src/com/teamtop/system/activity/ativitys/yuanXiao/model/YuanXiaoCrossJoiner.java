package com.teamtop.system.activity.ativitys.yuanXiao.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.ShowModel;
import com.teamtop.system.skill.model.Skill;
import com.teamtop.util.cache.CacheModel;
import com.teamtop.util.db.trans.FieldOrder;

public class YuanXiaoCrossJoiner extends CacheModel{
	/** 玩家id*/
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
	/**少主信息*/
	@FieldOrder(order = 11)
	private List<Integer> littleLeaderInfo;
	/** 玩家姓名 */
	@FieldOrder(order = 12)
	private String name;
	/** 将衔等级 */
	@FieldOrder(order = 13)
	private int official;
	/**
	 * 材料 1 2 3
	 */
	@FieldOrder(order = 14)
	private HashMap<Integer, Integer> cailiaoMap;
	/** 所属区号*/
	@FieldOrder(order = 15)
	private int belongZoneid;
	
	/** 所属partid*/
	@FieldOrder(order = 16)
	private int belongPartid;
	
	/** 神将之力技能进阶 **/
	@FieldOrder(order = 17)
	private int godSkillLevel;
	/**
	 * 当前抢夺目录
	 */
	@FieldOrder(order = 18)
	private HashMap<Integer, ArrayList<YuanXiaoEnemy>> lookListMap=new HashMap<>();
	
	public YuanXiaoCrossJoiner() {
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
	
	public List<Integer> getLittleLeaderInfo() {
		return littleLeaderInfo;
	}
	public void setLittleLeaderInfo(List<Integer> littleLeaderInfo) {
		this.littleLeaderInfo = littleLeaderInfo;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getOfficial() {
		return official;
	}
	public void setOfficial(int official) {
		this.official = official;
	}
	public int getBelongZoneid() {
		return belongZoneid;
	}
	public void setBelongZoneid(int belongZoneid) {
		this.belongZoneid = belongZoneid;
	}
	
	public int getBelongPartid() {
		return belongPartid;
	}
	public void setBelongPartid(int belongPartid) {
		this.belongPartid = belongPartid;
	}
	public int getGodSkillLevel() {
		return godSkillLevel;
	}
	public void setGodSkillLevel(int godSkillLevel) {
		this.godSkillLevel = godSkillLevel;
	}
	public HashMap<Integer, Integer> getCailiaoMap() {
		return cailiaoMap;
	}
	public void setCailiaoMap(HashMap<Integer, Integer> cailiaoMap) {
		this.cailiaoMap = cailiaoMap;
	}
	public HashMap<Integer, ArrayList<YuanXiaoEnemy>> getLookListMap() {
		return lookListMap;
	}
	public void setLookListMap(HashMap<Integer, ArrayList<YuanXiaoEnemy>> lookListMap) {
		this.lookListMap = lookListMap;
	}
	
	
	

}
