package com.teamtop.system.tigerPass.model;

import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.skill.model.Skill;
import com.teamtop.util.db.trans.FieldOrder;

public class TigerPassEmployer {
	
	@FieldOrder(order = 1)
	protected long hid;//id
	@FieldOrder(order = 2)
	private String name;//name
	@FieldOrder(order = 3)
	private int job;//职业
	@FieldOrder(order = 4)
	private int level;//等级
	@FieldOrder(order = 5)
	private int zoneid;//区号
	@FieldOrder(order = 6)
	private long totalStrength;//总战力
	@FieldOrder(order = 7)
	private FinalFightAttr finalFightAttr;// 最终的战斗属性详细
	@FieldOrder(order = 8)
	private String nameZoneid;//带区号的名字
	@FieldOrder(order = 9)
	private Skill skill;
	@FieldOrder(order = 10)
	private int icon;// 头像
	@FieldOrder(order = 11)
	private int frame;// 头像框
	@FieldOrder(order = 12)
	private int rebornlv;// 转生
	@FieldOrder(order = 13)
	private int official;// 将衔
	@FieldOrder(order = 14)
	private int titleId;
	@FieldOrder(order = 15)
	private int bodyModel;//时装ID
	@FieldOrder(order = 16)
	private int fightMonsterSpirit;
	@FieldOrder(order = 17)
	private int withLeaderId;//携带少主类型
	@FieldOrder(order = 18)
	private int withLeaderFid;//携带少主外观
	@FieldOrder(order = 19)
	private int leaderStarId;
	@FieldOrder(order = 20)
	private int leaderSkillId;
	@FieldOrder(order = 21)
	private int godWeapon;//专属神兵外形
	@FieldOrder(order = 22)
	private int vip;//vip
	@FieldOrder(order = 23) 
	private int countryType;//国家id
	@FieldOrder(order = 24)
	private int belongZoneid;
	@FieldOrder(order = 25)
	private int godWeaponKill;//专属神兵技能增伤
	@FieldOrder(order = 26)
	private int bechoosenum;//被选择次数
	@FieldOrder(order = 27)
	private int money;//雇佣价格
	@FieldOrder(order = 28)
	private int godSkillLevel;
	
	
	public TigerPassEmployer() {
		super();
	}
	
	
	public long getHid() {
		return hid;
	}


	public void setHid(long hid) {
		this.hid = hid;
	}


	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getJob() {
		return job;
	}
	public void setJob(int job) {
		this.job = job;
	}
	public int getLevel() {
		return level;
	}
	public void setLevel(int level) {
		this.level = level;
	}
	public int getZoneid() {
		return zoneid;
	}
	public void setZoneid(int zoneid) {
		this.zoneid = zoneid;
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
	public String getNameZoneid() {
		return nameZoneid;
	}
	public void setNameZoneid(String nameZoneid) {
		this.nameZoneid = nameZoneid;
	}
	public Skill getSkill() {
		return skill;
	}
	public void setSkill(Skill skill) {
		this.skill = skill;
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
	public int getRebornlv() {
		return rebornlv;
	}
	public void setRebornlv(int rebornlv) {
		this.rebornlv = rebornlv;
	}
	public int getOfficial() {
		return official;
	}
	public void setOfficial(int official) {
		this.official = official;
	}
	public int getTitleId() {
		return titleId;
	}
	public void setTitleId(int titleId) {
		this.titleId = titleId;
	}
	public int getBodyModel() {
		return bodyModel;
	}
	public void setBodyModel(int bodyModel) {
		this.bodyModel = bodyModel;
	}
	public int getFightMonsterSpirit() {
		return fightMonsterSpirit;
	}
	public void setFightMonsterSpirit(int fightMonsterSpirit) {
		this.fightMonsterSpirit = fightMonsterSpirit;
	}
	public int getWithLeaderId() {
		return withLeaderId;
	}
	public void setWithLeaderId(int withLeaderId) {
		this.withLeaderId = withLeaderId;
	}
	public int getWithLeaderFid() {
		return withLeaderFid;
	}
	public void setWithLeaderFid(int withLeaderFid) {
		this.withLeaderFid = withLeaderFid;
	}
	public int getLeaderStarId() {
		return leaderStarId;
	}
	public void setLeaderStarId(int leaderStarId) {
		this.leaderStarId = leaderStarId;
	}
	public int getLeaderSkillId() {
		return leaderSkillId;
	}
	public void setLeaderSkillId(int leaderSkillId) {
		this.leaderSkillId = leaderSkillId;
	}
	public int getGodWeapon() {
		return godWeapon;
	}
	public void setGodWeapon(int godWeapon) {
		this.godWeapon = godWeapon;
	}
	public int getVip() {
		return vip;
	}
	public void setVip(int vip) {
		this.vip = vip;
	}
	public int getCountryType() {
		return countryType;
	}
	public void setCountryType(int countryType) {
		this.countryType = countryType;
	}
	public int getBelongZoneid() {
		return belongZoneid;
	}
	public void setBelongZoneid(int belongZoneid) {
		this.belongZoneid = belongZoneid;
	}

	public int getGodWeaponKill() {
		return godWeaponKill;
	}

	public void setGodWeaponKill(int godWeaponKill) {
		this.godWeaponKill = godWeaponKill;
	}


	public int getBechoosenum() {
		return bechoosenum;
	}


	public void setBechoosenum(int bechoosenum) {
		this.bechoosenum = bechoosenum;
	}


	public int getMoney() {
		return money;
	}


	public void setMoney(int money) {
		this.money = money;
	}

	public int getGodSkillLevel() {
		return godSkillLevel;
	}

	public void setGodSkillLevel(int godSkillLevel) {
		this.godSkillLevel = godSkillLevel;
	}

	
	

}
