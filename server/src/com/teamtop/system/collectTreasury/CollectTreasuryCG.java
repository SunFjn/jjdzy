package com.teamtop.system.collectTreasury;
import com.teamtop.system.hero.Hero;

/**
 * CollectTreasuryCG.java
 * 聚宝盆
 */
public class CollectTreasuryCG{

	private static CollectTreasuryCG ins = null;

	public static CollectTreasuryCG getIns(){
		if(ins == null){
			ins = new CollectTreasuryCG();
		}
		return ins;
	}

	/**
	 * 打开界面 2081
	 */
	public void openUI(Hero hero, Object[] datas){
		CollectTreasuryManager.getIns().openUI(hero);
	} 
	/**
	 * 购买礼包 2083
	 * @param giftBagType| 礼包类型| byte
	 */
	public void buyGiftBag(Hero hero, Object[] datas){
		int giftBagType = (byte)datas[0];
		CollectTreasuryManager.getIns().buyGiftBag(hero, giftBagType);
	} 
	/**
	 * 领取奖励 2085
	 * @param awardsId| 奖励id，为配置表奖励id| int
	 */
	public void getAwards(Hero hero, Object[] datas){
		int awardsId = (int)datas[0];
		CollectTreasuryManager.getIns().getAwards(hero, awardsId);
	} 
}