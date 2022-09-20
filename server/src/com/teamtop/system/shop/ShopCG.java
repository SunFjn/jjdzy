package com.teamtop.system.shop;
import com.teamtop.system.hero.Hero;

/**
 * ShopCG.java
 * 商城
 */
public class ShopCG{

	private static ShopCG ins = null;

	public static ShopCG getIns(){
		if(ins == null){
			ins = new ShopCG();
		}
		return ins;
	}

	/**
	 * 打开商城界面 1181
	 * @param type| 商店类型| byte
	 */
	public void openShop(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		ShopManager.getIns().openShop(hero, type);
	} 
	/**
	 * 刷新商店 1183
	 * @param type| 商店类型| byte
	 */
	public void refreshShop(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		ShopManager.getIns().refreshShop(hero, type);
	} 
	/**
	 * 购买商品 1185
	 * @param type| 商店类型| byte
	 * @param goodsId| 商品索引id| int
	 * @param num| 购买次数（预留字段）| int
	 */
	public void shopping(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		int goodsId = (int)datas[1];
		int num = (int)datas[2];
		ShopManager.getIns().shopping(hero, type, goodsId, num);
	} 
}