package com.teamtop.system.activity.ativitys.wuMiaoShiZheAct;
import com.teamtop.system.hero.Hero;

/**
 * WuMiaoShiZheActCG.java
 * 武庙十哲
 */
public class WuMiaoShiZheActCG{

	private static WuMiaoShiZheActCG ins = null;

	public static WuMiaoShiZheActCG getIns(){
		if(ins == null){
			ins = new WuMiaoShiZheActCG();
		}
		return ins;
	}

	/**
	 * 打开目标奖励界面 12201
	 */
	public void openTargetAwardUI(Hero hero, Object[] datas){
		WuMiaoShiZheActManager.getIns().openTargetAwardUI(hero);
	} 
	/**
	 * 领取目标奖励 12203
	 * @param awardId| 要领取的奖励id| int
	 */
	public void getTargetAward(Hero hero, Object[] datas){
		int awardId = (int)datas[0];
		WuMiaoShiZheActManager.getIns().getTargetAward(hero, awardId);
	} 
}