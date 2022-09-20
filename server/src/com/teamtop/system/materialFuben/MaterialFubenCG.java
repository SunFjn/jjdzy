package com.teamtop.system.materialFuben;
import com.teamtop.system.hero.Hero;

/**
 * MaterialFubenCG.java
 * 材料副本
 */
public class MaterialFubenCG{

	private static MaterialFubenCG ins = null;

	public static MaterialFubenCG getIns(){
		if(ins == null){
			ins = new MaterialFubenCG();
		}
		return ins;
	}

	/**
	 * CG 请求材料副本信息 1431
	 */
	public void showInfo(Hero hero, Object[] datas){
		MaterialFubenManager.getIns().showInfo(hero);
	} 
	/**
	 * CG 请求进入某个材料副本 1433
	 * @param id| 副本id| int
	 */
	public void reqInGq(Hero hero, Object[] datas){
		int id = (int)datas[0];
		MaterialFubenManager.getIns().reqInGq(hero, id);
	} 
	/**
	 * CG 请求材料副本奖励 1435
	 * @param id| 副本id| int
	 */
	public void challenge(Hero hero, Object[] datas){
		int id = (int)datas[0];
		MaterialFubenManager.getIns().challenge(hero, id);
	} 
	/**
	 * CG 扫荡副本 1437
	 */
	public void sweep(Hero hero, Object[] datas){
		MaterialFubenManager.getIns().sweep(hero);
	} 
	/**
	 * CG 购买材料副本的次数 1439
	 * @param id| 副本id| int
	 */
	public void buyNum(Hero hero, Object[] datas){
		int id = (int)datas[0];
		MaterialFubenManager.getIns().buyNum(hero, id);
	} 
	/**
	 * CG 一键购买材料副本 1441
	 */
	public void oneKeyBuy(Hero hero, Object[] datas){
		MaterialFubenManager.getIns().oneKeyBuy(hero);
	} 
}