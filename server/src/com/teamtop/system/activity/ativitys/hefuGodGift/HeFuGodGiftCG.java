package com.teamtop.system.activity.ativitys.hefuGodGift;
import com.teamtop.system.hero.Hero;

/**
 * HeFuGodGiftCG.java
 * 合服大神送礼
 */
public class HeFuGodGiftCG{

	private static HeFuGodGiftCG ins = null;

	public static HeFuGodGiftCG getIns(){
		if(ins == null){
			ins = new HeFuGodGiftCG();
		}
		return ins;
	}

	/**
	 * CG 获取奖励 9601
	 * @param index| 奖励编号| int
	 */
	public void getreward(Hero hero, Object[] datas){
		int index = (int)datas[0];
		HeFuGodGiftManager.getIns().getreward(hero, index);
	} 
}