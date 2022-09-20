package com.teamtop.system.title;
import com.teamtop.system.hero.Hero;

/**
 * TitleModelCG.java
 * 称号系统
 */
public class TitleModelCG{

	private static TitleModelCG ins = null;

	public static TitleModelCG getIns(){
		if(ins == null){
			ins = new TitleModelCG();
		}
		return ins;
	}

	/**
	 * CG请求打开称号界面 501
	 */
	public void openTitle(Hero hero, Object[] datas){
		TitleModelManager.getIns().openTitle(hero);
	} 
	/**
	 * CG请求操作称号 503
	 * @param handle| 1.穿戴  2.脱下| byte
	 * @param titleId| 称号id| int
	 */
	public void handleTitle(Hero hero, Object[] datas){
		int handle = (byte)datas[0];
		int titleId = (int)datas[1];
		TitleModelManager.getIns().handleTitle(hero, handle, titleId);
	} 
	/**
	 * 激活称号（永久类型称号） 509
	 * @param titleId| 称号id| int
	 */
	public void activateTitle(Hero hero, Object[] datas){
		int titleId = (int)datas[0];
		TitleModelManager.getIns().activateTitle(hero, titleId);
	} 
	/**
	 * 升级称号 513
	 * @param titleId| 称号id| int
	 */
	public void upgradeTitle(Hero hero, Object[] datas){
		int titleId = (int)datas[0];
		TitleModelManager.getIns().upgradeTitle(hero, titleId);
	} 
}