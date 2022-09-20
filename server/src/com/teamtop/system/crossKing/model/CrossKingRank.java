package com.teamtop.system.crossKing.model;

import java.util.ArrayList;
import java.util.List;

import com.teamtop.system.godbook.GodBook;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.ShowModel;
import com.teamtop.system.skill.model.Skill;
import com.teamtop.system.treasure.model.TreasureData;
import com.teamtop.util.cache.CacheModel;
import com.teamtop.util.db.trans.FieldOrder;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_NPC_200;

/**
 * 乱世枭雄-排行对象信息
 * @author lobbyer
 * @date 2016年8月29日
 */
public class CrossKingRank extends CacheModel{
	/*** 表唯一id-对象id-npc随机id*/
	@FieldOrder(order = 1)
	private long rid;
	/*** 赛季号*/
	@FieldOrder(order = 2)
	private int term;
	/*** 转生段位*/
	@FieldOrder(order = 3)
	private int rebornType;
	/*** 段位*/
	@FieldOrder(order = 4)
	private int duanwei;
	/*** 对象类型（0玩家 1NPC）*/
	@FieldOrder(order = 5)
	private int type;
	/*** 排名 */
	@FieldOrder(order = 6)
	private int rank;
	/*** 对象名称*/
	@FieldOrder(order = 7)
	private String rname;
	/**对象职业**/
	@FieldOrder(order = 8)
	private int job;
	/***战力*/
	@FieldOrder(order =9)
	private long strength;
	/**
	 * 角色显示模型
	 */
	@FieldOrder(order = 10)
	private ShowModel model;
	/**
	 * 刷出的排行数据
	 */
	@FieldOrder(order = 11)
	private List<Integer> showRank = new ArrayList<Integer>();
	/**
	 * 刷出下阶段晋级排行
	 */
	@FieldOrder(order = 12)
	private List<Integer> upRank = new ArrayList<Integer>();
	/**区号**/
	@FieldOrder(order = 13)
	private int zoneid;
	/**怪物系统id**/
	@FieldOrder(order = 14)
	private int sysid;
	@FieldOrder(order = 15)
	/**技能**/
	private Skill skill;
	/**本赛季最高段位**/
	@FieldOrder(order = 16)
	private int MaxDw; 
	@FieldOrder(order = 17)
	/**战斗属性详细**/
	private FinalFightAttr finalFightAttr;
	@FieldOrder(order = 18)
	/** 出战兽魂 */
	private int figthMonsterSpirit;
	/**少主信息*/
	@FieldOrder(order = 19)
	private List<Integer> littleLeaderInfo;
	/** 归属区号 **/
	@FieldOrder(order = 20)
	private int belongZoneid;
	@FieldOrder(order = 21)
	private int partId;
	/** 神将之力技能进阶 **/
	@FieldOrder(order = 22)
	private int godSkillLevel;
	/** 宝物 */
	@FieldOrder(order = 23)
	private TreasureData baowu;
	/** 天书 */
	@FieldOrder(order = 24)
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
	/**
	 * 开始战斗时间
	 */
	private int battleTime;
	/**
	 * 是否在战斗
	 */
	private boolean isBattle;


	public int getTerm() {
		return term;
	}
	public void setTerm(int term) {
		this.term = term;
	}
	public int getRebornType() {
		return rebornType;
	}
	public void setRebornType(int rebornType) {
		this.rebornType = rebornType;
	}
	public int getRank() {
		return rank;
	}
	public void setRank(int rank) {
		this.rank = rank;
	}
	public int getDuanwei() {
		return duanwei;
	}
	public void setDuanwei(int duanwei) {
		if (duanwei>this.MaxDw) {
			setMaxDw(duanwei);
		}
		this.duanwei = duanwei;
	}
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
	public long getRid() {
		return rid;
	}
	public void setRid(long rid) {
		this.rid = rid;
	}
	public String getRname() {
		return rname;
	}
	public void setRname(String rname) {
		this.rname = rname;
	}
	public long getStrength() {
		if (type==1) {
			long str=Config_NPC_200.getIns().get(sysid).getPower();
			return str;
		}
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
	public List<Integer> getShowRank() {
		return showRank;
	}
	public void setShowRank(List<Integer> showRank) {
		this.showRank = showRank;
	}
	public List<Integer> getUpRank() {
		return upRank;
	}
	public void setUpRank(List<Integer> upRank) {
		this.upRank = upRank;
	}
	public FinalFightAttr getFinalFightAttr() {
		return finalFightAttr;
	}
	public void setFinalFightAttr(FinalFightAttr finalFightAttr) {
		this.finalFightAttr = finalFightAttr;
	}
	public boolean isBattle() {
		if(isBattle) {
			if(battleTime == 0 || (battleTime > 0 && TimeDateUtil.getCurrentTime() - battleTime > 2*60)) {
				battleTime = 0;
				isBattle = false;
			}
		}
		return isBattle;
	}

	public void setBattle(boolean isBattle) {
		this.isBattle = isBattle;
	}

	public int getBattleTime() {
		return battleTime;
	}

	public void setBattleTime(int battleTime) {
		this.battleTime = battleTime;
	}
	public int getJob() {
		return job;
	}
	public void setJob(int job) {
		this.job = job;
	}
	public CrossKingRank(){
		super();
	}
	public Skill getSkill() {
		return skill;
	}
	public void setSkill(Skill skill) {
		this.skill = skill;
	}
	public int getZoneid() {
		return zoneid;
	}
	public void setZoneid(int zoneid) {
		this.zoneid = zoneid;
	}
	public CrossKingRank(long rid,int term,int rebornType,int duanwei,int rank,int type,int sysid,int belongZoneid, int partId){
		super();
		this.rid = rid;
		this.term = term;
		this.rebornType = rebornType;
		this.duanwei = duanwei;
		this.rank=rank;
		this.type = type;
		this.sysid=sysid;
		this.belongZoneid=belongZoneid;
		this.partId = partId;
	}
	public int getSysid() {
		return sysid;
	}
	public void setSysid(int sysid) {
		this.sysid = sysid;
	}
	public int getMaxDw() {
		return MaxDw;
	}
	public void setMaxDw(int maxDw) {
		MaxDw = maxDw;
	}

	public int getBelongZoneid() {
		return belongZoneid;
	}
	public void setBelongZoneid(int belongZoneid) {
		this.belongZoneid = belongZoneid;
	}
	public int getFigthMonsterSpirit() {
		return figthMonsterSpirit;
	}
	public void setFigthMonsterSpirit(int figthMonsterSpirit) {
		this.figthMonsterSpirit = figthMonsterSpirit;
	}
	public int getPartId() {
		return partId;
	}
	public void setPartId(int partId) {
		this.partId = partId;
	}
	public List<Integer> getLittleLeaderInfo() {
		return littleLeaderInfo;
	}
	public void setLittleLeaderInfo(List<Integer> littleLeaderInfo) {
		this.littleLeaderInfo = littleLeaderInfo;
	}

	public int getGodSkillLevel() {
		return godSkillLevel;
	}

	public void setGodSkillLevel(int godSkillLevel) {
		this.godSkillLevel = godSkillLevel;
	}

	
	
	
}
