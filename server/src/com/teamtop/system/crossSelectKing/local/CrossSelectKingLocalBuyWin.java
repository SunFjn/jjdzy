package com.teamtop.system.crossSelectKing.local;

import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.util.db.trans.FieldOrder;

/**
 * 买输赢
 * @author jjjjyyy
 */
public class CrossSelectKingLocalBuyWin {
	/**本地服买输赢 第几轮->玩家买输赢情况**/
	@FieldOrder(order = 1)
	private  ConcurrentHashMap<Integer,ConcurrentHashMap<Long,CrossSelectKingBet>> buyWinMap=new ConcurrentHashMap<Integer,ConcurrentHashMap<Long,CrossSelectKingBet>>();
    
	public CrossSelectKingLocalBuyWin() {
		super();
	}

	public ConcurrentHashMap<Integer, ConcurrentHashMap<Long, CrossSelectKingBet>> getBuyWinMap() {
		return buyWinMap;
	}

	public void setBuyWinMap(ConcurrentHashMap<Integer, ConcurrentHashMap<Long, CrossSelectKingBet>> buyWinMap) {
		this.buyWinMap = buyWinMap;
	}
    
	
	
	
	
	
	
}
