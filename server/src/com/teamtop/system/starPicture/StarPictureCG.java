package com.teamtop.system.starPicture;
import com.teamtop.system.hero.Hero;

/**
 * StarPictureCG.java
 * 星图
 */
public class StarPictureCG{

	private static StarPictureCG ins = null;

	public static StarPictureCG getIns(){
		if(ins == null){
			ins = new StarPictureCG();
		}
		return ins;
	}

	/**
	 * 打开星图 921
	 */
	public void openStarPicture(Hero hero, Object[] datas){
		StarPictureManager.getIns().openStarPicture(hero);
	} 
	/**
	 * 星图升级 923
	 * @param type| 星图类型| byte
	 */
	public void upgradeLevel(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		StarPictureManager.getIns().upgradeLevel(hero, type);
	} 
}