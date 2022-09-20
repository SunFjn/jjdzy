package com.teamtop.system.shaozhuQiYuanRank;
import com.teamtop.system.hero.Hero;

/**
 * ShaoZhuQiYuanRankCG.java
 * 少年英主-祈愿排名
 */
public class ShaoZhuQiYuanRankCG{

	private static ShaoZhuQiYuanRankCG ins = null;

	public static ShaoZhuQiYuanRankCG getIns(){
		if(ins == null){
			ins = new ShaoZhuQiYuanRankCG();
		}
		return ins;
	}

	/**
	 * 打开界面 7401
	 */
	public void openUI(Hero hero, Object[] datas){
		ShaoZhuQiYuanRankManager.getIns().openUI(hero);
	} 
}