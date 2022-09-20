package com.teamtop.system.zhenYan;
import com.teamtop.system.hero.Hero;

/**
 * ZhenYanCG.java
 * 阵眼
 */
public class ZhenYanCG{

	private static ZhenYanCG ins = null;

	public static ZhenYanCG getIns(){
		if(ins == null){
			ins = new ZhenYanCG();
		}
		return ins;
	}

	/**
	 * 打开界面 10251
	 */
	public void openUI(Hero hero, Object[] datas){
		ZhenYanManager.getIns().openUI(hero);
	} 
	/**
	 * 升级/激活阵眼 10253
	 * @param zhenYanId| 阵眼id| int
	 */
	public void upLevelZhenYan(Hero hero, Object[] datas){
		int zhenYanId = (int)datas[0];
		ZhenYanManager.getIns().upLevelZhenYan(hero, zhenYanId);
	} 
	/**
	 * 升级/激活阵心 10255
	 */
	public void upLevelZhenXin(Hero hero, Object[] datas){
		ZhenYanManager.getIns().upLevelZhenXin(hero);
	} 
}