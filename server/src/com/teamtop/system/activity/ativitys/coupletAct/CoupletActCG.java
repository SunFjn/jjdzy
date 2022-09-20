package com.teamtop.system.activity.ativitys.coupletAct;
import com.teamtop.system.hero.Hero;

/**
 * CoupletActCG.java
 * 对对联
 */
public class CoupletActCG{

	private static CoupletActCG ins = null;

	public static CoupletActCG getIns(){
		if(ins == null){
			ins = new CoupletActCG();
		}
		return ins;
	}

	/**
	 * 下联提交 11321
	 * @param list| 下联列表| Object[]
	 */
	public void commit(Hero hero, Object[] datas){
		Object[] list = (Object[])datas[0];
		CoupletActManager.getIns().commit(hero, list);
	} 
	/**
	 * 打开排行榜 11323
	 */
	public void openRankUI(Hero hero, Object[] datas){
		CoupletActManager.getIns().openRankUI(hero);
	} 
	/**
	 * 领取目标奖励 11325
	 * @param awardId| 要领取的奖励id| int
	 */
	public void getTargetAward(Hero hero, Object[] datas){
		int awardId = (int)datas[0];
		CoupletActManager.getIns().getTargetAward(hero, awardId);
	} 
}