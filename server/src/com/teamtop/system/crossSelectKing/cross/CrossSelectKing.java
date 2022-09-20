package com.teamtop.system.crossSelectKing.cross;

import java.util.List;

import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.ShowModel;
import com.teamtop.system.skill.model.Skill;
import com.teamtop.util.cache.CacheModel;
import com.teamtop.util.db.trans.FieldOrder;

/**
 * 枭雄争霸（乱世枭雄的下一个阶段）
 * @author jjjjyyy
 *
 */
public class CrossSelectKing extends CacheModel{
	/*** 表唯一id-对象id-npc随机id*/
	@FieldOrder(order = 1)
	private long hid;
	/*** 赛季号*/
	@FieldOrder(order = 2)
	private int term;
	/*** 转生段位对应不同榜*/
	@FieldOrder(order = 3)
	private int bang;
	/*** 排名 */
	@FieldOrder(order = 4)
	private int rank;
	/*** 对象名称*/
	@FieldOrder(order = 5)
	private String name;
	/**对象职业**/
	@FieldOrder(order = 6)
	private int job;
	/***战力*/
	@FieldOrder(order =7)
	private long strength;
	/***角色显示模型*/
	@FieldOrder(order = 8)
	private ShowModel model;
	/**区号**/
	@FieldOrder(order = 9)
	private int zoneid;
	@FieldOrder(order = 10)
	/**技能**/
	private Skill skill;
	@FieldOrder(order = 11)
	/**战斗属性详细**/
	private FinalFightAttr finalFightAttr;
	@FieldOrder(order = 12)
	/** 出战兽魂 */
	private int figthMonsterSpirit;
	/**少主信息*/
	@FieldOrder(order = 13)
	private List<Integer> littleLeaderInfo;
	/**属于首服去**/
	@FieldOrder(order = 14)
	private int belongZoneid;
	/** 神将之力技能进阶 **/
	@FieldOrder(order = 15)
	private int godSkillLevel;
	
	public CrossSelectKing() {
		super();
	}

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public int getTerm() {
		return term;
	}
	public void setTerm(int term) {
		this.term = term;
	}
	
	public int getBang() {
		return bang;
	}

	public void setBang(int bang) {
		this.bang = bang;
	}

	public int getRank() {
		return rank;
	}
	public void setRank(int rank) {
		this.rank = rank;
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
	public int getZoneid() {
		return zoneid;
	}
	public void setZoneid(int zoneid) {
		this.zoneid = zoneid;
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
