package com.teamtop.system.activity.ativitys.caoCaoCome;

import java.util.HashMap;

import com.teamtop.util.db.trans.FieldOrder;

public class CaoCaoComeHis {
	
	@FieldOrder(order = 1)
	private HashMap<Integer, HurtBossRank> rankHis=new HashMap<Integer, HurtBossRank>();
	/**
	 * boss血量翻倍次数（可以是负的）
	 */
	@FieldOrder(order = 2)
	private int xhp;

	public CaoCaoComeHis() {
		super();
	}

	public HashMap<Integer, HurtBossRank> getRankHis() {
		return rankHis;
	}

	public void setRankHis(HashMap<Integer, HurtBossRank> rankHis) {
		this.rankHis = rankHis;
	}
	public int getXhp() {
		return xhp;
	}

	public void setXhp(int xhp) {
		this.xhp = xhp;
	}

}
