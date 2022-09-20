package com.teamtop.system.extraValueGiftBag;

import com.teamtop.system.hero.Hero;

public class ExtraValueGiftBagCG {
	private static ExtraValueGiftBagCG ins = null;

	public static ExtraValueGiftBagCG getIns(){
		if(ins == null){
			ins = new ExtraValueGiftBagCG();
		}
		return ins;
	}

	/**
	 * 打开界面 20001
	 */
	public void openUI(Hero hero, Object[] datas){
		int type = (byte) datas[0];
		ExtraValueGiftBagManager.getIns().openUI(hero,type);
	} 
}
