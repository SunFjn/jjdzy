package com.teamtop.system.crossBoss.model;

import java.util.HashMap;

import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.util.db.trans.FieldOrder;

/**
 * 伤害排行缓存
 * @author Administrator
 *
 */
public class CrossBossRankModel {
	
	/**id*/
	@FieldOrder(order = 1)
	private long id;
	/**
	 * 名字
	 */
	@FieldOrder(order = 2)
	private String name;
	/**
	 * 伤害
	 */
	@FieldOrder(order = 3)
	private long hurt;
	/**
	 * 国家
	 */
	@FieldOrder(order = 4)
	private int country;
	/**
	 * 死亡时间
	 */
	private int deadTime;
	/**
	 * 上次复活时间
	 */
	private int liveTime;
	/**
	 * 战斗属性
	 */
	private FinalFightAttr attr;
	/**
	 * 进入时间
	 */
	private int inTime;
	/**
	 * 奖励状态
	 */
	private int[] rewardState;
	/**
	 * 购买攻击百分百次数
	 */
	private int buyAttNum;
	/**
	 * boss打我的伤害：每秒
	 */
	private long bossHurtMe;
	/**
	 * 我打boss的伤害：每秒
	 */
	private long meHurtBoss;
	
	private HashMap<Integer,Integer> actids;
	/**
	 * 自动复活状态 1确定 0取消
	 */
	private int aotufuhuo;
	
	public int getInTime() {
		return inTime;
	}
	public void setInTime(int inTime) {
		this.inTime = inTime;
	}

	public int getDeadTime() {
		return deadTime;
	}
	public void setDeadTime(int deadTime) {
		this.deadTime = deadTime;
	}
	public int getCountry() {
		return country;
	}
	public void setCountry(int country) {
		this.country = country;
	}
	public FinalFightAttr getAttr() {
		return attr;
	}
	public void setAttr(FinalFightAttr attr) {
		this.attr = attr;
	}
	public long getHpmax() {
		return  attr.getHpMax();
	}

	public long getCurhp() {
		return attr.getHp();
	}

	public void fullHp(){
		attr.setHp(attr.getHpMax());
	}
	public String getName() {
		return name;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
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
	public int[] getRewardState() {
		return rewardState;
	}
	public void setRewardState(int[] rewardState) {
		this.rewardState = rewardState;
	}
	
	public int getBuyAttNum() {
		return buyAttNum;
	}
	public void setBuyAttNum(int buyAttNum) {
		this.buyAttNum = buyAttNum;
	}
	
	public long getBossHurtMe() {
		return bossHurtMe;
	}
	public void setBossHurtMe(long bossHurtMe) {
		this.bossHurtMe = bossHurtMe;
	}
	public long getMeHurtBoss() {
		return meHurtBoss;
	}
	public void setMeHurtBoss(long meHurtBoss) {
		this.meHurtBoss = meHurtBoss;
	}
	public int getLiveTime() {
		return liveTime;
	}
	public void setLiveTime(int liveTime) {
		this.liveTime = liveTime;
	}
	public HashMap<Integer, Integer> getActids() {
		return actids;
	}
	public void setActids(HashMap<Integer, Integer> actids) {
		this.actids = actids;
	}
	public int getAotufuhuo() {
		return aotufuhuo;
	}
	public void setAotufuhuo(int aotufuhuo) {
		this.aotufuhuo = aotufuhuo;
	}
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + (int) (id ^ (id >>> 32));
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
		CrossBossRankModel other = (CrossBossRankModel) obj;
		if (id != other.id)
			return false;
		return true;
	}
	
}
