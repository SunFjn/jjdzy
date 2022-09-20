package com.teamtop.system.crossBoss.model;

import java.util.ArrayList;
import java.util.List;

import com.teamtop.util.db.trans.FieldOrder;
/**
 * 转生boss历史信息
 * @author jjjjyyy
 *
 */
public class ZSBossHis {
	/**
	 * bossid
	 */
	@FieldOrder(order = 1)
	private int bossId;
	/**
	 * 血量被增加的次数
	 */
	@FieldOrder(order = 2)
	private int addDoubleNum;
	
	@FieldOrder(order = 3)
	private List<ZSBossHisModel> heroRankList = new ArrayList<ZSBossHisModel>();
	
	@FieldOrder(order = 4)
	private List<ZSBossHisModel> countryRankList = new ArrayList<ZSBossHisModel>();
	
	@FieldOrder(order = 5)
	private String skillName;
	
	public ZSBossHis() {
		super();
	}
	public int getBossId() {
		return bossId;
	}
	public void setBossId(int bossId) {
		this.bossId = bossId;
	}
	
	public int getAddDoubleNum() {
		return addDoubleNum;
	}
	public void setAddDoubleNum(int addDoubleNum) {
		this.addDoubleNum = addDoubleNum;
	}
	public List<ZSBossHisModel> getHeroRankList() {
		return heroRankList;
	}
	public void setHeroRankList(List<ZSBossHisModel> heroRankList) {
		this.heroRankList = heroRankList;
	}
	public List<ZSBossHisModel> getCountryRankList() {
		return countryRankList;
	}
	public void setCountryRankList(List<ZSBossHisModel> countryRankList) {
		this.countryRankList = countryRankList;
	}
	public String getSkillName() {
		return skillName;
	}
	public void setSkillName(String skillName) {
		this.skillName = skillName;
	}

}
