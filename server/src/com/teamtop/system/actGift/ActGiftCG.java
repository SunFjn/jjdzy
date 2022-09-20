package com.teamtop.system.actGift;
import com.teamtop.system.hero.Hero;

/**
 * ActGiftCG.java
 * 限时礼包
 */
public class ActGiftCG{

	private static ActGiftCG ins = null;

	public static ActGiftCG getIns(){
		if(ins == null){
			ins = new ActGiftCG();
		}
		return ins;
	}

	/**
	 * 领取奖励 10451
	 * @param id| 表的id| int
	 */
	public void getAward(Hero hero, Object[] datas){
		int id = (int)datas[0];
		ActGiftManager.getIns().getAward(hero, id);
	} 
}