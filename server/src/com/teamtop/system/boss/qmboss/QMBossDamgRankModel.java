package com.teamtop.system.boss.qmboss;


import java.util.Map;

import com.teamtop.system.hero.FinalFightAttr;


/**
 * 全民boss 伤害排名model
 * @author Administrator
 *
 */
public class QMBossDamgRankModel {
	/**
	 * hid
	 */
	private long hid;
	/**
	 * 名字
	 */
	private String name;
	/**
	 * 伤害
	 */
	private long hurt;
	/**
	 * 战斗属性
	 */
	private FinalFightAttr attrmap;
	/**
	 * 魔神吕布bossid  每秒对我的伤害
	 */
	private Map<Integer, BossHurtInfo> bossHurtInfoMap;

	/**
	 * 进入时间
	 */
	private int inTime;
	/**
	 * 退出时间
	 */
	private int outTime;
	/**
	 * 上次复活时间
	 */
	private int liveTime;
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
	public Map<Integer, BossHurtInfo> getBossHurtInfoMap() {
		return bossHurtInfoMap;
	}
	public void setBossHurtInfoMap(Map<Integer, BossHurtInfo> bossHurtInfoMap) {
		this.bossHurtInfoMap = bossHurtInfoMap;
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
	public int getOutTime() {
		return outTime;
	}
	public void setOutTime(int outTime) {
		this.outTime = outTime;
	}
	public int getLiveTime() {
		return liveTime;
	}
	public void setLiveTime(int liveTime) {
		this.liveTime = liveTime;
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
		QMBossDamgRankModel other = (QMBossDamgRankModel) obj;
		if (hid != other.hid)
			return false;
		return true;
	}
	
}
