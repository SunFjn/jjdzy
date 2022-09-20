package com.teamtop.system.functionStart;
import com.teamtop.system.hero.Hero;

/**
 * FunctionStartCG.java
 * 功能开启
 */
public class FunctionStartCG{

	private static FunctionStartCG ins = null;

	public static FunctionStartCG getIns(){
		if(ins == null){
			ins = new FunctionStartCG();
		}
		return ins;
	}

	/**
	 * 打开功能预览界面 1801
	 */
	public void openUI(Hero hero, Object[] datas){
		FunctionStartManager.getIns().openUI(hero);
	} 
	/**
	 * 领取目标奖励 1803
	 * @param guanqiaId| 关卡id| int
	 */
	public void getAwards(Hero hero, Object[] datas){
		int guanqiaId = (int)datas[0];
		FunctionStartManager.getIns().getAwards(hero, guanqiaId);
	} 
}