package com.teamtop.system.activity.ativitys.skyRichGift;
import com.teamtop.system.hero.Hero;

/**
 * SkyRichGiftCG.java
 * 天降豪礼
 */
public class SkyRichGiftCG{

	private static SkyRichGiftCG ins = null;

	public static SkyRichGiftCG getIns(){
		if(ins == null){
			ins = new SkyRichGiftCG();
		}
		return ins;
	}

	/**
	 * 领取奖励 11671
	 * @param id| 奖励项id| int
	 */
	public void getReward(Hero hero, Object[] datas){
		int id = (int)datas[0];
		SkyRichGiftManager.getIns().getReward(hero, id);
	} 
}