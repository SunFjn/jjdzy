package com.teamtop.system.setting;
import com.teamtop.system.hero.Hero;

/**
 * SettingCG.java
 * 设置
 */
public class SettingCG{

	private static SettingCG ins = null;

	public static SettingCG getIns(){
		if(ins == null){
			ins = new SettingCG();
		}
		return ins;
	}

	/**
	 * 更换头像和头像框 1021
	 * @param icon| 头像id| int
	 * @param frame| 头像框id| int
	 */
	public void changeIcon(Hero hero, Object[] datas){
		int icon = (int)datas[0];
		int frame = (int)datas[1];
		SettingManager.getIns().changeIcon(hero, icon, frame);
	} 
	/**
	 * 修改名字 1023
	 * @param name| 新名字| String
	 */
	public void changeName(Hero hero, Object[] datas){
		String name = (String)datas[0];
		SettingManager.getIns().changeName(hero, name);
	} 
	/**
	 * 操作声音 1025
	 * @param type| 背景音乐  1开启   其他会默认保存为0| byte
	 * @param wuJiang| 武将配音  1开启      其他会默认保存为0| byte
	 */
	public void operateSound(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		int wuJiang = (byte)datas[1];
		SettingManager.getIns().operateSound(hero, type, wuJiang);
	} 
	/**
	 * 隐藏势力操作 1027
	 * @param type| 0：显示，1：隐藏| byte
	 */
	public void operateCountry(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		SettingManager.getIns().operateCountry(hero, type);
	} 
}