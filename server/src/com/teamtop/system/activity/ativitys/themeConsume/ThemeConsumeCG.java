package com.teamtop.system.activity.ativitys.themeConsume;
import com.teamtop.system.hero.Hero;

/**
 * ThemeConsumeCG.java
 * 主题消费
 */
public class ThemeConsumeCG{

	private static ThemeConsumeCG ins = null;

	public static ThemeConsumeCG getIns(){
		if(ins == null){
			ins = new ThemeConsumeCG();
		}
		return ins;
	}

	/**
	 * 激活返回 10301
	 * @param type| 主题类型| byte
	 */
	public void activation(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		ThemeConsumeManager.getIns().activation(hero, type);
	} 
	/**
	 * 领取主题奖励 10303
	 * @param id| 编号ID| int
	 */
	public void getAward(Hero hero, Object[] datas){
		int id = (int)datas[0];
		ThemeConsumeManager.getIns().getAward(hero, id);
	} 
}