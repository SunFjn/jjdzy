package com.teamtop.system.rechargeDouble;
import com.teamtop.system.hero.Hero;

/**
 * RechargeDoubleCG.java
 * 充值双倍
 */
public class RechargeDoubleCG{

	private static RechargeDoubleCG ins = null;

	public static RechargeDoubleCG getIns(){
		if(ins == null){
			ins = new RechargeDoubleCG();
		}
		return ins;
	}

	/**
	 * 打开UI 1441
	 */
	public void openUI(Hero hero, Object[] datas){
		RechargeDoubleManager.getIns().openUI(hero);
	} 
}