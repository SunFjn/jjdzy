package com.teamtop.system.eightDoorAppraiseRank;
import com.teamtop.system.hero.Hero;

/**
 * EightDoorAppraiseRankCG.java
 * 八门金锁-鉴定排名
 */
public class EightDoorAppraiseRankCG{

	private static EightDoorAppraiseRankCG ins = null;

	public static EightDoorAppraiseRankCG getIns(){
		if(ins == null){
			ins = new EightDoorAppraiseRankCG();
		}
		return ins;
	}

	/**
	 * 打开界面 7301
	 */
	public void openUI(Hero hero, Object[] datas){
		EightDoorAppraiseRankManager.getIns().openUI(hero);
	} 
}