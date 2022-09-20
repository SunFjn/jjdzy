package com.teamtop.system.sevenGroupBuy;
import com.teamtop.system.hero.Hero;

/**
 * SevenGroupBuyCG.java
 * 7日首冲团购
 */
public class SevenGroupBuyCG{

	private static SevenGroupBuyCG ins = null;

	public static SevenGroupBuyCG getIns(){
		if(ins == null){
			ins = new SevenGroupBuyCG();
		}
		return ins;
	}

	/**
	 * CG 获取奖励 2851
	 * @param index| 奖励序号| int
	 */
	public void getreward(Hero hero, Object[] datas){
		int index = (int)datas[0];
		SevenGroupBuyManager.getIns().getreward(hero, index);
	} 
}