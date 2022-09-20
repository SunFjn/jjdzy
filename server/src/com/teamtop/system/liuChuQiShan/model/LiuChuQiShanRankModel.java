package com.teamtop.system.liuChuQiShan.model;


import com.teamtop.system.hero.FinalFightAttr;

public class LiuChuQiShanRankModel {
	/**	 * hid	 */
	private long hid;
	/**	 * 机器人ID	 */
	private int robotID;
	/**	 * 名字	 */
	private String name;
	/**	 * 伤害	 */
	private long hurt;
	/**	 * 战斗属性	 */
	private FinalFightAttr attrmap;
	/**	 * 是否死亡  0未死亡  1死亡	 */
	private int death;
	private long InvincibleTime;//无敌结束时间
	private long cutDownTime;// 减伤结束时间
	
	public long getCutDownTime() {
		return cutDownTime;
	}

	public void setCutDownTime(long cutDownTime) {
		this.cutDownTime = cutDownTime;
	}
	public FinalFightAttr getAttrmap() {
		return attrmap;
	}
	public void setAttrmap(FinalFightAttr attrmap) {
		this.attrmap = attrmap;
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
	public long getHurt() {
		return hurt;
	}
	public void setHurt(long hurt) {
		this.hurt = hurt;
	}
	public long getCurhp() {
		long currhp = attrmap.getHp();
		if(currhp<0) currhp=0;
		return currhp;
	}
	public void fullHp(){
		attrmap.setHp(attrmap.getHpMax());
	}
	public int getDeath() {
		return death;
	}
	public void setDeath(int death) {
		this.death = death;
	}
	public int getRobotID() {
		return robotID;
	}
	public void setRobotID(int robotID) {
		this.robotID = robotID;
	}
	public long getInvincibleTime() {
		return InvincibleTime;
	}
	public void setInvincibleTime(long invincibleTime) {
		InvincibleTime = invincibleTime;
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (int) (hid ^ (hid >>> 32));
		return result;
	}
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		LiuChuQiShanRankModel other = (LiuChuQiShanRankModel) obj;
		if (this.hid != other.getHid())
			return false;
		return true;
	}
	
}
