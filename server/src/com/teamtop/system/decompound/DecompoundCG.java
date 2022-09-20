package com.teamtop.system.decompound;
import com.teamtop.system.hero.Hero;

/**
 * DecompoundCG.java
 * 分解系统
 */
public class DecompoundCG{

	private static DecompoundCG ins = null;

	public static DecompoundCG getIns(){
		if(ins == null){
			ins = new DecompoundCG();
		}
		return ins;
	}

	/**
	 * CG 分解道具 2681
	 * @param goalid| 分解目标id| int
	 * @param num| 分解数量| int
	 */
	public void fejie(Hero hero, Object[] datas){
		int goalid = (int)datas[0];
		int num = (int)datas[1];
		DecompoundManager.getIns().fejie(hero, goalid, num);
	} 
	/**
	 * CG 一键分解 2683
	 * @param arr| | Object[]
	 * @param arr1| | Object[]
	 */
	public void onekeyfenjie(Hero hero, Object[] datas){
		Object[] arr = (Object[])datas[0];
		Object[] arr1 = (Object[])datas[1];
		DecompoundManager.getIns().onekeyfenjie(hero, arr, arr1);
	} 
}