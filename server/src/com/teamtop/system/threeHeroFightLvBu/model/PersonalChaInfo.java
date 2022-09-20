package com.teamtop.system.threeHeroFightLvBu.model;

import java.util.concurrent.atomic.AtomicLong;

import com.teamtop.system.hero.FinalFightAttr;

public class PersonalChaInfo {

	private long hid;

	/**
	 * 当前血量
	 */
	private AtomicLong hp = new AtomicLong();

	/**
	 * 玩家属性
	 */
	private FinalFightAttr attr;

	/**
	 * 无敌结束时间
	 */
	private long InvincibleTime;

	/**
	 * 减伤结束时间
	 */
	private long cutDownTime;

	public long getHid() {
		return hid;
	}

	public void setHid(long hid) {
		this.hid = hid;
	}

	public long getHp() {
		return hp.get();
	}

	public void setHp(long hp) {
		this.hp.set(hp);
	}

	public void addHp(long add) {
		this.hp.addAndGet(add);
	}

	public FinalFightAttr getAttr() {
		return attr;
	}

	public void setAttr(FinalFightAttr attr) {
		this.attr = attr;
	}

	public long getInvincibleTime() {
		return InvincibleTime;
	}

	public void setInvincibleTime(long invincibleTime) {
		InvincibleTime = invincibleTime;
	}

	public long getCutDownTime() {
		return cutDownTime;
	}

	public void setCutDownTime(long cutDownTime) {
		this.cutDownTime = cutDownTime;
	}

}
