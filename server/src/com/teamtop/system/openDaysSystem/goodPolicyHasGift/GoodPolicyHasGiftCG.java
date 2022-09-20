package com.teamtop.system.openDaysSystem.goodPolicyHasGift;
import com.teamtop.system.hero.Hero;

/**
 * GoodPolicyHasGiftCG.java
 * 运筹帷幄_奇策有礼
 */
public class GoodPolicyHasGiftCG{

	private static GoodPolicyHasGiftCG ins = null;

	public static GoodPolicyHasGiftCG getIns(){
		if(ins == null){
			ins = new GoodPolicyHasGiftCG();
		}
		return ins;
	}

	/**
	 * 激活 9951
	 * @param type| 任务类型| byte
	 */
	public void active(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		GoodPolicyHasGiftManager.getIns().active(hero, type);
	} 
	/**
	 * 领取奖励 9953
	 * @param id| 配置表id| int
	 */
	public void getAward(Hero hero, Object[] datas){
		int id = (int)datas[0];
		GoodPolicyHasGiftManager.getIns().getAward(hero, id);
	} 
}