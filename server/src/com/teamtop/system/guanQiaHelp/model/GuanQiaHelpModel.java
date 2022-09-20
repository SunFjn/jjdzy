package com.teamtop.system.guanQiaHelp.model;

import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.team.model.TeamMember;

public class GuanQiaHelpModel {
	/** hid */
	private long hid;
	/** 名字 */
	private String name;
	/** 战斗属性 */
	private FinalFightAttr attrmap;
	/** 是否死亡 0未死亡 ,1死亡,2离开 */
	private int death;
	/** 无敌结束时间 */
	private long InvincibleTime;

	private TeamMember member;

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

	public long getCurhp() {
		long currhp = attrmap.getHp();
		if (currhp < 0)
			currhp = 0;
		return currhp;
	}

	public void fullHp() {
		attrmap.setHp(attrmap.getHpMax());
	}

	public int getDeath() {
		return death;
	}

	public void setDeath(int death) {
		this.death = death;
	}

	public long getInvincibleTime() {
		return InvincibleTime;
	}

	public void setInvincibleTime(long invincibleTime) {
		InvincibleTime = invincibleTime;
	}

	public TeamMember getMember() {
		return member;
	}

	public void setMember(TeamMember member) {
		this.member = member;
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
		GuanQiaHelpModel other = (GuanQiaHelpModel) obj;
		if (this.hid != other.getHid())
			return false;
		return true;
	}

}
