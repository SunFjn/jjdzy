package com.teamtop.system.firstRechargeNew;
import com.teamtop.system.hero.Hero;

/**
 * FirstRechargeNewCG.java
 * 新首充
 */
public class FirstRechargeNewCG{

	private static FirstRechargeNewCG ins = null;

	public static FirstRechargeNewCG getIns(){
		if(ins == null){
			ins = new FirstRechargeNewCG();
		}
		return ins;
	}

	/**
	 * 打开界面 2751
	 */
	public void openUI(Hero hero, Object[] datas){
		FirstRechargeNewManager.getIns().openUI(hero);
	} 
	/**
	 * 领取首充奖励 2753
	 * @param index| 首充档次index| byte
	 */
	public void getReward(Hero hero, Object[] datas){
		int index = (byte)datas[0];
		FirstRechargeNewManager.getIns().getReward(hero, index);
	} 
	/**
	 * 关掉UI 2757
	 */
	public void closeUI(Hero hero, Object[] datas){
		FirstRechargeNewManager.getIns().closeUI(hero);
	} 
}