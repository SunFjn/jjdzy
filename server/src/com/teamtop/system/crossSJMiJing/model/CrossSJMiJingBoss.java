package com.teamtop.system.crossSJMiJing.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import com.teamtop.system.hero.FinalFightAttr;

public class CrossSJMiJingBoss {

	
	private int bossId;
	/**	 * 当前气血	 */
	private double hp;
	private double hpmax;
	/**	 * 战斗属性	 */
	private FinalFightAttr attr;
	/**	 * 伤害排名//	 */
	private List<CrossSJMiJingRankModel> rankList = Collections.synchronizedList(new ArrayList<CrossSJMiJingRankModel>());
	private long InvincibleTime;//无敌结束时间
	
	public double getHpmax() {
		return hpmax;
	}
	public void setHpmax(double hpmax) {
		this.hpmax = hpmax;
	}
	public int getBossId() {
		return bossId;
	}
	public void setBossId(int bossId) {
		this.bossId = bossId;
	}
	public double getHp() {
		return hp;
	}
	public void setHp(double hp) {
		this.hp = hp;
	}
	public FinalFightAttr getAttr() {
		return attr;
	}
	public void setAttr(FinalFightAttr attr) {
		this.attr = attr;
	}
	public List<CrossSJMiJingRankModel> getRankList() {
		return rankList;
	}
	public void setRankList(List<CrossSJMiJingRankModel> rankList) {
		this.rankList = rankList;
	}
	public long getInvincibleTime() {
		return InvincibleTime;
	}
	public void setInvincibleTime(long invincibleTime) {
		InvincibleTime = invincibleTime;
	}
}
