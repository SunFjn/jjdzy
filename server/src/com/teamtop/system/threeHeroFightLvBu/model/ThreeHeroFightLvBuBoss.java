package com.teamtop.system.threeHeroFightLvBu.model;

import java.util.concurrent.atomic.AtomicLong;

import com.teamtop.system.hero.FinalFightAttr;

public class ThreeHeroFightLvBuBoss {

	/**
	 * 关卡id
	 */
	private int guanqia;

	/**
	 * 
	 */
	private int bossId;

	/**
	 * 当前血量
	 */
	private AtomicLong hp = new AtomicLong();

	/**
	 * 最大血量
	 */
	private long hpMax;

	/**
	 * 战斗属性
	 */
	private FinalFightAttr attr;

	/**
	 * 无敌结束时间
	 */
	private long InvincibleTime;

	/**
	 * 出生点坐标X
	 */
	private int posX;

	/**
	 * 出生点坐标Y
	 */
	private int posY;

	/**
	 * npc唯一id
	 */
	private long npcUid;

	public int getGuanqia() {
		return guanqia;
	}

	public void setGuanqia(int guanqia) {
		this.guanqia = guanqia;
	}

	public int getBossId() {
		return bossId;
	}

	public void setBossId(int bossId) {
		this.bossId = bossId;
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

	public long getHpMax() {
		return hpMax;
	}

	public void setHpMax(long hpMax) {
		this.hpMax = hpMax;
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

	public int getPosX() {
		return posX;
	}

	public void setPosX(int posX) {
		this.posX = posX;
	}

	public int getPosY() {
		return posY;
	}

	public void setPosY(int posY) {
		this.posY = posY;
	}

	public long getNpcUid() {
		return npcUid;
	}

	public void setNpcUid(long npcUid) {
		this.npcUid = npcUid;
	}

}
