package com.teamtop.system.house.houseKeeper;
import com.teamtop.system.hero.Hero;

/**
 * HouseKeeperCG.java
 * 家丁
 */
public class HouseKeeperCG{

	private static HouseKeeperCG ins = null;

	public static HouseKeeperCG getIns(){
		if(ins == null){
			ins = new HouseKeeperCG();
		}
		return ins;
	}

	/**
	 * 打开界面 11351
	 */
	public void openUI(Hero hero, Object[] datas){
		HouseKeeperManager.getIns().openUI(hero);
	} 
	/**
	 * 晋升家丁 11353
	 */
	public void upHouseKeeper(Hero hero, Object[] datas){
		HouseKeeperManager.getIns().upHouseKeeper(hero);
	} 
	/**
	 * 升级家丁 11355
	 * @param type| 类型 1升级 2一键| byte
	 */
	public void upHouseKeeperLevel(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		HouseKeeperManager.getIns().upHouseKeeperLevel(hero, type);
	} 
}