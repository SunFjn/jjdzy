package com.teamtop.system.privilegeCard;
import com.teamtop.system.hero.Hero;

/**
 * PrivilegeCardCG.java
 * 特权卡
 */
public class PrivilegeCardCG{

	private static PrivilegeCardCG ins = null;

	public static PrivilegeCardCG getIns(){
		if(ins == null){
			ins = new PrivilegeCardCG();
		}
		return ins;
	}

	/**
	 * 打开特权卡界面 2171
	 */
	public void openPrivilegeCard(Hero hero, Object[] datas){
		PrivilegeCardManager.getIns().openPrivilegeCard(hero);
	} 
	/**
	 * 领取每日奖励 2173
	 * @param cardId| 特权卡id| byte
	 */
	public void getPrivilegeCard(Hero hero, Object[] datas){
		int cardId = (byte)datas[0];
		PrivilegeCardManager.getIns().getPrivilegeCard(hero, cardId);
	} 
	/**
	 * 领取同时拥有3张特权卡奖励 2175
	 */
	public void getThreeAward(Hero hero, Object[] datas){
		PrivilegeCardManager.getIns().getThreeAward(hero);
	} 
}