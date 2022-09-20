package com.teamtop.system.godOfWar.model;

import com.teamtop.util.cache.CacheModel;
import com.teamtop.util.db.trans.FieldOrder;

public class GodOfWarRank extends CacheModel{

	/** 玩家id */
	@FieldOrder(order = 1)
	private long hid;

	/** 名字 */
	@FieldOrder(order = 2)
	private String name;

	/** 官衔 */
	@FieldOrder(order = 3)
	private int official;

	/** 职业 */
	@FieldOrder(order = 4)
	private int job;

	/** 国家 */
	@FieldOrder(order = 5)
	private int country;

	/** 等级 */
	@FieldOrder(order = 6)
	private int level;

	/** vip等级 */
	@FieldOrder(order = 7)
	private int vipLevel;

	/** 战力 */
	@FieldOrder(order = 8)
	private long strength;

	/** 排行 */
	@FieldOrder(order = 9)
	private int ranking;

	/** 机器人id */
	@FieldOrder(order = 10)
	private int robotId;

	/** 头像 */
	@FieldOrder(order = 11)
	private int icon;

	/** 头像框 */
	@FieldOrder(order = 12)
	private int frame;

	/** 区号 */
	@FieldOrder(order = 13)
	private int zoneid;

	/** 称号 */
	@FieldOrder(order = 14)
	private int titleId;

	/** 时装 */
	@FieldOrder(order = 15)
	private int bodyid;
	
	/** 创号时的职业 */
	@FieldOrder(order = 16)
	private int createJob;
	
	/** 专属神兵 */
	@FieldOrder(order = 17)
	private int godWeapon;
	
	/** 轮回等级 */
	@FieldOrder(order = 18)
	private int reincarnationLevel;
	
	/**坐骑id*/
	@FieldOrder(order = 19)
	private int mountId;

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

	public int getOfficial() {
		return official;
	}

	public void setOfficial(int official) {
		this.official = official;
	}

	public int getJob() {
		return job;
	}

	public void setJob(int job) {
		this.job = job;
	}

	public int getCountry() {
		return country;
	}

	public void setCountry(int country) {
		this.country = country;
	}

	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}

	public int getVipLevel() {
		return vipLevel;
	}

	public void setVipLevel(int vipLevel) {
		this.vipLevel = vipLevel;
	}

	public long getStrength() {
		return strength;
	}

	public void setStrength(long strength) {
		this.strength = strength;
	}

	public int getRanking() {
		return ranking;
	}

	public void setRanking(int ranking) {
		this.ranking = ranking;
	}

	public int getRobotId() {
		return robotId;
	}

	public void setRobotId(int robotId) {
		this.robotId = robotId;
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

	public int getZoneid() {
		return zoneid;
	}

	public void setZoneid(int zoneid) {
		this.zoneid = zoneid;
	}

	public int getTitleId() {
		return titleId;
	}

	public void setTitleId(int titleId) {
		this.titleId = titleId;
	}

	public int getBodyid() {
		return bodyid;
	}

	public void setBodyid(int bodyid) {
		this.bodyid = bodyid;
	}

	public int getCreateJob() {
		return createJob;
	}

	public void setCreateJob(int createJob) {
		this.createJob = createJob;
	}

	public boolean equals(Object anObject) {
		if( anObject==null)
			return false;
		if( anObject instanceof GodOfWarRank){
			GodOfWarRank temp = (GodOfWarRank) anObject;
			long hidTemp = temp.getHid();
			if( hidTemp==hid)
				return true;
		}
		return super.equals(anObject);
	}

	public int getGodWeapon() {
		return godWeapon;
	}

	public void setGodWeapon(int godWeapon) {
		this.godWeapon = godWeapon;
	}

	public int getReincarnationLevel() {
		return reincarnationLevel;
	}

	public void setReincarnationLevel(int reincarnationLevel) {
		this.reincarnationLevel = reincarnationLevel;
	}

	public int getMountId() {
		return mountId;
	}

	public void setMountId(int mountId) {
		this.mountId = mountId;
	}

}
