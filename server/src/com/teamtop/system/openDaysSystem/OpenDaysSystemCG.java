package com.teamtop.system.openDaysSystem;
import com.teamtop.system.hero.Hero;

/**
 * OpenDaysSystemCG.java
 * 开启天数控制系统
 */
public class OpenDaysSystemCG{

	private static OpenDaysSystemCG ins = null;

	public static OpenDaysSystemCG getIns(){
		if(ins == null){
			ins = new OpenDaysSystemCG();
		}
		return ins;
	}

	/**
	 * 打开界面 4571
	 * @param sysId| 系统Id| int
	 */
	public void openUI(Hero hero, Object[] datas){
		int sysId = (int)datas[0];
		OpenDaysSystemManager.getIns().openUI(hero, sysId);
	} 
}