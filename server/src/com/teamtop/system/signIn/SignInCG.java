package com.teamtop.system.signIn;
import com.teamtop.system.hero.Hero;

/**
 * SignInCG.java
 * 签到
 */
public class SignInCG{

	private static SignInCG ins = null;

	public static SignInCG getIns(){
		if(ins == null){
			ins = new SignInCG();
		}
		return ins;
	}

	/**
	 * 打开界面 2151
	 */
	public void openUI(Hero hero, Object[] datas){
		SignInManager.getIns().openUI(hero);
	} 
	/**
	 * 补签 2155
	 * @param repairSignDay| 补签天数| int
	 */
	public void repairSign(Hero hero, Object[] datas){
		int repairSignDay = (int)datas[0];
		SignInManager.getIns().repairSign(hero, repairSignDay);
	} 
	/**
	 * 签到 2153
	 * @param signDay| 签到天数| int
	 */
	public void signIn(Hero hero, Object[] datas){
		int signDay = (int)datas[0];
		SignInManager.getIns().signIn(hero, signDay);
	} 
	/**
	 * 领取累签宝箱奖励 2157
	 * @param baoxiangId| 累签宝箱id| int
	 */
	public void getBaoxiangAwards(Hero hero, Object[] datas){
		int baoxiangId = (int)datas[0];
		SignInManager.getIns().getBaoxiangAwards(hero, baoxiangId);
	} 
}