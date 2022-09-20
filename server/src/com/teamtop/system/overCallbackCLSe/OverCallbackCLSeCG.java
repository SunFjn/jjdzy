package com.teamtop.system.overCallbackCLSe;
import com.teamtop.system.hero.Hero;

/**
 * OverCallbackCLSeCG.java
 * 新材料返利系统
 */
public class OverCallbackCLSeCG{

	private static OverCallbackCLSeCG ins = null;

	public static OverCallbackCLSeCG getIns(){
		if(ins == null){
			ins = new OverCallbackCLSeCG();
		}
		return ins;
	}

	/**
	 * 领取奖励 2953
	 * @param index| 索引id| int
	 */
	public void getAward(Hero hero, Object[] datas){
		int index = (int)datas[0];
		OverCallbackCLSeManager.getIns().getAward(hero, index);
	} 
	/**
	 * 打开界面 2951
	 */
	public void openUI(Hero hero, Object[] datas){
		OverCallbackCLSeManager.getIns().openUI(hero);
	} 
}