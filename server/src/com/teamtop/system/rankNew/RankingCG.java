package com.teamtop.system.rankNew;
import com.teamtop.system.hero.Hero;

/**
 * RankingCG.java
 * 排行榜
 */
public class RankingCG{

	private static RankingCG ins = null;

	public static RankingCG getIns(){
		if(ins == null){
			ins = new RankingCG();
		}
		return ins;
	}

	/**
	 * 获取排行榜数据 1451
	 * @param rankType| 排行榜类型| byte
	 */
	public void getRankList(Hero hero, Object[] datas){
		int rankType = (byte)datas[0];
		RankingManager.getIns().getRankList(hero, rankType);
	} 
}