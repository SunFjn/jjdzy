package com.teamtop.system.openDaysSystem.specialAnimalSendGift;
import com.teamtop.system.hero.Hero;

/**
 * SpecialAnimalSendGiftCG.java
 * 万兽之王-异兽送礼
 */
public class SpecialAnimalSendGiftCG{

	private static SpecialAnimalSendGiftCG ins = null;

	public static SpecialAnimalSendGiftCG getIns(){
		if(ins == null){
			ins = new SpecialAnimalSendGiftCG();
		}
		return ins;
	}

	/**
	 * 激活 9221
	 * @param type| 任务类型| byte
	 */
	public void active(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		SpecialAnimalSendGiftManager.getIns().active(hero, type);
	} 
	/**
	 * 领取奖励 9223
	 * @param id| 配置表id| int
	 */
	public void getAward(Hero hero, Object[] datas){
		int id = (int)datas[0];
		SpecialAnimalSendGiftManager.getIns().getAward(hero, id);
	} 
}