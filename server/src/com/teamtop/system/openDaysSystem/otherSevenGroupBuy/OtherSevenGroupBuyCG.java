package com.teamtop.system.openDaysSystem.otherSevenGroupBuy;
import com.teamtop.system.hero.Hero;

/**
 * OtherSevenGroupBuyCG.java
 * 首冲团购（8-28）
 */
public class OtherSevenGroupBuyCG{

	private static OtherSevenGroupBuyCG ins = null;

	public static OtherSevenGroupBuyCG getIns(){
		if(ins == null){
			ins = new OtherSevenGroupBuyCG();
		}
		return ins;
	}

	/**
	 * CG 获取奖励 7451
	 * @param rewardindex| 奖励编号| int
	 */
	public void getreward(Hero hero, Object[] datas){
		int rewardindex = (int)datas[0];
		OtherSevenGroupBuyManager.getIns().getreward(hero, rewardindex);
	} 
}