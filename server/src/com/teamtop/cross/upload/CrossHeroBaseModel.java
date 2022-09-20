package com.teamtop.cross.upload;

import com.teamtop.system.godWeapon.GodWeapon;
import com.teamtop.system.godbook.GodBook;
import com.teamtop.system.hero.FightAttr;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.mount.Mount;
import com.teamtop.system.skill.model.Skill;
import com.teamtop.system.treasure.model.TreasureData;
import com.teamtop.system.wujiang.WuJiang;
import com.teamtop.util.db.trans.FieldOrder;

/**
 * 上传hero数据基本model，包括战斗需要用到的数据，上阵将领数据，宠物属性
 * @author Administrator
 *
 */
public class CrossHeroBaseModel{
	@FieldOrder(order = 1)
	protected long id;//id
	@FieldOrder(order = 2)
	private String name;//name
	@FieldOrder(order = 3)
	private int sex;//性别
	@FieldOrder(order = 4)
	private int job;//职业
	@FieldOrder(order = 5)
	private int level;//等级
	@FieldOrder(order = 6)
	private int zoneid;//区号
	@FieldOrder(order = 7)
	private long totalStrength;//总战力
	@FieldOrder(order = 8)
	private FinalFightAttr finalFightAttr;// 最终的战斗属性详细
	@FieldOrder(order = 14)
	private long gangId;//帮会id
	@FieldOrder(order = 15)
	private String gangName;//帮会名称
	@FieldOrder(order = 16)
	private String nameZoneid;//带区号的名字
	@FieldOrder(order = 17) 
	private int countryType;//国家id
	@FieldOrder(order = 18)
	private Skill skill;
	@FieldOrder(order = 19)
	private int icon;// 头像
	@FieldOrder(order = 20)
	private int frame;// 头像框
	@FieldOrder(order = 21)
	private int rebornlv;// 转生
	@FieldOrder(order = 22)
	private int official;// 将衔
	@FieldOrder(order = 23)
	private int titleId;
	@FieldOrder(order = 24)
	private int crossBossNum;// 跨服boss（孟获次数）
	@FieldOrder(order = 25)
	private int bodyModel;//时装ID
	@FieldOrder(order = 26)
	private WuJiang wuJiang;
	@FieldOrder(order = 27)
	private int fightMonsterSpirit;
	@FieldOrder(order = 28)
	private int withLeaderId;
	@FieldOrder(order = 29)
	private int withLeaderFid;
	@FieldOrder(order = 30)
	private int leaderStarId;
	@FieldOrder(order = 31)
	private int leaderSkillId;
	@FieldOrder(order = 32)
	private int guanqia;
	@FieldOrder(order = 33)
	private int belongZoneid;// 所属区号
	@FieldOrder(order = 34)
	private GodWeapon godWeapon;//专属神兵
	@FieldOrder(order = 35)
	private int reincarnationLevel;//轮回等级
	@FieldOrder(order = 36)
	private int zhenXinLevel;//阵心等级
	@FieldOrder(order = 37)
	private FightAttr fightAttr;
	@FieldOrder(order = 38)
	private Mount mount;//坐骑
	@FieldOrder(order = 39)
	private int vip;//vip等级
	@FieldOrder(order = 40)
	private TreasureData treasureData;//穿戴着的宝物数据
	@FieldOrder(order = 41)
	private GodBook godBook;//穿戴着的天书数据
	
	public CrossHeroBaseModel() {
		super();
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getSex() {
		return sex;
	}
	public void setSex(int sex) {
		this.sex = sex;
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
	public long getGangId() {
		return gangId;
	}
	public void setGangId(long gangId) {
		this.gangId = gangId;
	}
	public String getGangName() {
		return gangName;
	}
	public void setGangName(String gangName) {
		this.gangName = gangName;
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
	public int getCountryType() {
		return countryType;
	}
	public void setCountryType(int countryType) {
		this.countryType = countryType;
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
	public int getCrossBossNum() {
		return crossBossNum;
	}
	public void setCrossBossNum(int crossBossNum) {
		this.crossBossNum = crossBossNum;
	}
	public int getBodyModel() {
		return bodyModel;
	}
	public void setBodyModel(int bodyModel) {
		this.bodyModel = bodyModel;
	}
	public int getBelongZoneid() {
		return belongZoneid;
	}

	public void setBelongZoneid(int belongZoneid) {
		this.belongZoneid = belongZoneid;
	}
	public WuJiang getWuJiang() {
		return wuJiang;
	}
	public void setWuJiang(WuJiang wuJiang) {
		this.wuJiang = wuJiang;
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
	public int getGuanqia() {
		return guanqia;
	}
	public void setGuanqia(int guanqia) {
		this.guanqia = guanqia;
	}
	public GodWeapon getGodWeapon() {
		return godWeapon;
	}
	public void setGodWeapon(GodWeapon godWeapon) {
		this.godWeapon = godWeapon;
	}
	public int getReincarnationLevel() {
		return reincarnationLevel;
	}
	public void setReincarnationLevel(int reincarnationLevel) {
		this.reincarnationLevel = reincarnationLevel;
	}
	public int getZhenXinLevel() {
		return zhenXinLevel;
	}
	public void setZhenXinLevel(int zhenXinLevel) {
		this.zhenXinLevel = zhenXinLevel;
	}
	public FightAttr getFightAttr() {
		return fightAttr;
	}
	public void setFightAttr(FightAttr fightAttr) {
		this.fightAttr = fightAttr;
	}
	public Mount getMount() {
		return mount;
	}
	public void setMount(Mount mount) {
		this.mount = mount;
	}
	public int getVip() {
		return vip;
	}
	public void setVip(int vip) {
		this.vip = vip;
	}
	public TreasureData getTreasureData() {
		return treasureData;
	}
	public void setTreasureData(TreasureData treasureData) {
		this.treasureData = treasureData;
	}
	public GodBook getGodBook() {
		return godBook;
	}
	public void setGodBook(GodBook godBook) {
		this.godBook = godBook;
	}
	
}
