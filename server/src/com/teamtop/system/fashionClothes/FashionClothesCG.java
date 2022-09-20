package com.teamtop.system.fashionClothes;
import com.teamtop.system.hero.Hero;

/**
 * FashionClothesCG.java
 * 时装
 */
public class FashionClothesCG{

	private static FashionClothesCG ins = null;

	public static FashionClothesCG getIns(){
		if(ins == null){
			ins = new FashionClothesCG();
		}
		return ins;
	}

	/**
	 * CG 查看武将时装 3501
	 * @param wid| 武将id| int
	 */
	public void openUi(Hero hero, Object[] datas){
		int wid = (int)datas[0];
		FashionClothesManager.getIns().openUi(hero, wid);
	} 
	/**
	 * CG 激活/升阶时装 3503
	 * @param fid| 时装id| int
	 */
	public void upfashion(Hero hero, Object[] datas){
		int fid = (int)datas[0];
		FashionClothesManager.getIns().upfashion(hero, fid);
	} 
	/**
	 * CG 穿戴时装 3505
	 * @param wid| 武将id| byte
	 * @param fid| 时装id 0脱下| int
	 */
	public void wearFashion(Hero hero, Object[] datas){
		int wid = (byte)datas[0];
		int fid = (int)datas[1];
		FashionClothesManager.getIns().wearFashion(hero, wid, fid);
	} 
	/**
	 * CG 获取激活时装id 3507
	 */
	public void init(Hero hero, Object[] datas){
		FashionClothesManager.getIns().init(hero);
	} 
	/**
	 * CG获取所有武将时装 3509
	 */
	public void getall(Hero hero, Object[] datas){
		FashionClothesManager.getIns().getall(hero);
	} 
}