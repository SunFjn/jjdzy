package com.teamtop.system.overCallbackYBSe;
import com.teamtop.system.hero.Hero;

/**
 * OverCallbackYBSeCG.java
 * 新元宝返利系统
 */
public class OverCallbackYBSeCG{

	private static OverCallbackYBSeCG ins = null;

	public static OverCallbackYBSeCG getIns(){
		if(ins == null){
			ins = new OverCallbackYBSeCG();
		}
		return ins;
	}

	/**
	 * 打开界面 3031
	 */
	public void openUI(Hero hero, Object[] datas){
		OverCallbackYBSeManager.getIns().openUI(hero);
	} 
	/**
	 * 领取奖励 3033
	 * @param index| 索引id| int
	 */
	public void getAward(Hero hero, Object[] datas){
		int index = (int)datas[0];
		OverCallbackYBSeManager.getIns().getAward(hero, index);
	} 
}