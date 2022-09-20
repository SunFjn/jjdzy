package com.teamtop.system.chuangGuanYouLi;
import com.teamtop.system.hero.Hero;

/**
 * ChuangGuanYouLiCG.java
 * 闯关有礼
 */
public class ChuangGuanYouLiCG{

	private static ChuangGuanYouLiCG ins = null;

	public static ChuangGuanYouLiCG getIns(){
		if(ins == null){
			ins = new ChuangGuanYouLiCG();
		}
		return ins;
	}

	/**
	 * 打开界面 4151
	 */
	public void openUI(Hero hero, Object[] datas){
		ChuangGuanYouLiManager.getIns().openUI(hero);
	} 
	/**
	 * 领取任务奖励 4153
	 * @param id| 任务ID| short
	 */
	public void getTaskAwards(Hero hero, Object[] datas){
		int id = (short)datas[0];
		ChuangGuanYouLiManager.getIns().getTaskAwards(hero, id);
	} 
	/**
	 * 领取目标奖励 4155
	 */
	public void getTargetAwards(Hero hero, Object[] datas){
		ChuangGuanYouLiManager.getIns().getTargetAwards(hero);
	} 
}