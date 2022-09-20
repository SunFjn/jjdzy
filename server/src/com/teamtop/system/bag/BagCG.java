package com.teamtop.system.bag;
import com.teamtop.system.hero.Hero;

/**
 * BagCG.java
 * 背包
 */
public class BagCG{

	private static BagCG ins = null;

	public static BagCG getIns(){
		if(ins == null){
			ins = new BagCG();
		}
		return ins;
	}

	/**
	 * CG开启背包格子 201
	 * @param num| 要开启的格子数| short
	 */
	public void openGrid(Hero hero, Object[] datas){
		/*int num = (short)datas[0];
		BagManager.getIns().openGrid(hero, num);*/
	} 
	/**
	 * CG使用物品 207
	 * @param id| 道具id| int
	 * @param num| 使用数量| int
	 */
	public void useItem(Hero hero, Object[] datas){
		int id = (int)datas[0];
		int num = (int)datas[1];
		BagManager.getIns().useItem(hero, id, num);
	} 
	/**
	 * CG使用界面道具 209
	 * @param id| 道具id| int
	 * @param num| 使用数量| int
	 * @param index| 选择索引| byte
	 */
	public void useInterItem(Hero hero, Object[] datas){
		int id = (int)datas[0];
		int num = (int)datas[1];
		int index = (byte)datas[2];
		BagManager.getIns().useInterItem(hero, id, num, index);
	} 
}