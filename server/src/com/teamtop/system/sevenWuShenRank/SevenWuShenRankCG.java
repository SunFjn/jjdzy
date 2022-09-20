package com.teamtop.system.sevenWuShenRank;
import com.teamtop.system.hero.Hero;

/**
 * SevenWuShenRankCG.java
 * 7日武圣榜
 */
public class SevenWuShenRankCG{

	private static SevenWuShenRankCG ins = null;

	public static SevenWuShenRankCG getIns(){
		if(ins == null){
			ins = new SevenWuShenRankCG();
		}
		return ins;
	}

	/**
	 * CG 打开ui 2301
	 * @param type| 打开某个榜| byte
	 */
	public void openUi(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		SevenWuShenRankManager.getIns().openUi(hero, type);
	} 
	/**
	 * GC 领取奖励 2303
	 * @param index| 奖励序号| int
	 */
	public void getreward(Hero hero, Object[] datas){
		int index = (int)datas[0];
		SevenWuShenRankManager.getIns().getreward(hero, index);
	} 
}