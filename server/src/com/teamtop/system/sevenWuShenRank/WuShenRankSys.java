package com.teamtop.system.sevenWuShenRank;
/**
 * 武圣各个系统排行榜
 * @author jjjjyyy
 *
 */

import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.util.db.trans.FieldOrder;

public class WuShenRankSys {
	@FieldOrder(order = 1)
	private ConcurrentHashMap<Integer,ConcurrentHashMap<Integer,List<WuShenRank>>> rankCache=new ConcurrentHashMap<Integer,ConcurrentHashMap<Integer,List<WuShenRank>>>();
	@FieldOrder(order = 2)
	private int isSendBuChang;
	
	public WuShenRankSys() {
		super();
	}

	public ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, List<WuShenRank>>> getRankCache() {
		return rankCache;
	}

	public void setRankCache(ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, List<WuShenRank>>> rankCache) {
		this.rankCache = rankCache;
	}

	public int getIsSendBuChang() {
		return isSendBuChang;
	}

	public void setIsSendBuChang(int isSendBuChang) {
		this.isSendBuChang = isSendBuChang;
	}


	
	
}
