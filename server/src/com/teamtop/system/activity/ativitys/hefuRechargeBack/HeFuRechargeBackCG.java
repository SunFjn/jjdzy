package com.teamtop.system.activity.ativitys.hefuRechargeBack;
import com.teamtop.system.hero.Hero;

/**
 * HeFuRechargeBackCG.java
 * 合服充值返利
 */
public class HeFuRechargeBackCG{

	private static HeFuRechargeBackCG ins = null;

	public static HeFuRechargeBackCG getIns(){
		if(ins == null){
			ins = new HeFuRechargeBackCG();
		}
		return ins;
	}

	/**
	 * 获取奖励 9521
	 * @param index| 奖励序号| int
	 */
	public void getreward(Hero hero, Object[] datas){
		int index = (int)datas[0];
		HeFuRechargeBackManager.getIns().getreward(hero, index);
	} 
}