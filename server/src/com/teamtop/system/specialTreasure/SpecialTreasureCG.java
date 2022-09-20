package com.teamtop.system.specialTreasure;
import com.teamtop.system.hero.Hero;

/**
 * SpecialTreasureCG.java
 * 异宝
 */
public class SpecialTreasureCG{

	private static SpecialTreasureCG ins = null;

	public static SpecialTreasureCG getIns(){
		if(ins == null){
			ins = new SpecialTreasureCG();
		}
		return ins;
	}

	/**
	 * CG 打开异宝ui 1041
	 */
	public void speTreasureUI(Hero hero, Object[] datas){
		SpecialTreasureManager.getIns().speTreasureUI(hero);
	} 
	/**
	 * CG 激活/升星异宝 1043
	 * @param treasureid| 异宝id| int
	 */
	public void upStar(Hero hero, Object[] datas){
		int treasureid = (int)datas[0];
		SpecialTreasureManager.getIns().upStar(hero, treasureid);
	} 
	/**
	 * CG 使用属性丹 1045
	 * @param type| 使用方式0:1颗  1:一键| byte
	 */
	public void eatDan(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		SpecialTreasureManager.getIns().eatDan(hero, type);
	} 
}