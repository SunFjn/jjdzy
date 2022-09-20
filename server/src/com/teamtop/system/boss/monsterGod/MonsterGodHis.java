package com.teamtop.system.boss.monsterGod;
/**
 * 魔神吕布历史记录
 * @author jjjjyyy
 *
 */

import java.util.HashMap;

import com.teamtop.util.db.trans.FieldOrder;

public class MonsterGodHis {
	@FieldOrder(order = 1)
	private HashMap<Integer, MonsterGodRank> rankHis;
	/**
	 * boss血量翻倍次数（可以是负的）
	 */
	@FieldOrder(order = 2)
	private int xhp;

	
	
	public MonsterGodHis() {
		super();
	}

	

	public MonsterGodHis(HashMap<Integer, MonsterGodRank> rankHis, int xhp) {
		super();
		this.rankHis = rankHis;
		this.xhp = xhp;
	}



	public HashMap<Integer, MonsterGodRank> getRankHis() {
		return rankHis;
	}

	public void setRankHis(HashMap<Integer, MonsterGodRank> rankHis) {
		this.rankHis = rankHis;
	}

	public int getXhp() {
		return xhp;
	}

	public void setXhp(int xhp) {
		this.xhp = xhp;
	}
	
	

}
