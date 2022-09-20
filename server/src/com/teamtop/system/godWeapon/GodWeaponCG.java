package com.teamtop.system.godWeapon;
import com.teamtop.system.hero.Hero;

/**
 * GodWeaponCG.java
 * 专属神兵
 */
public class GodWeaponCG{

	private static GodWeaponCG ins = null;

	public static GodWeaponCG getIns(){
		if(ins == null){
			ins = new GodWeaponCG();
		}
		return ins;
	}

	/**
	 * CG 激活/升星 专属神兵 7851
	 * @param type| 武将| byte
	 */
	public void upstar(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		GodWeaponManager.getIns().upstar(hero, type);
	} 
	/**
	 * CG 穿戴神兵 7853
	 * @param type| 类型| byte
	 * @param weapon| 神兵id(x00x) 0脱下| int
	 */
	public void wear(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		int weapon = (int)datas[1];
		GodWeaponManager.getIns().wear(hero, type, weapon);
	} 
	/**
	 * CG 神铸 7855
	 * @param type| 武将类型| byte
	 * @param type1| 类型（1-3 神铁、陨铁 玄铁）| byte
	 * @param type2| 神铸方式 0单次 1一键| byte
	 */
	public void godForge(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		int type1 = (byte)datas[1];
		int type2 = (byte)datas[2];
		GodWeaponManager.getIns().godForge(hero, type, type1, type2);
	} 
	/**
	 * CG 激活/升级专属神兵等级 7857
	 * @param type| 武将类型| byte
	 */
	public void actzhuanshuLv(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		GodWeaponManager.getIns().actzhuanshuLv(hero, type);
	} 
	/**
	 * CG升级神兵淬炼等级 7859
	 * @param type| 武将类型| byte
	 * @param type1| 淬炼类型 0单次 1一键| byte
	 */
	public void upcuilianlv(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		int type1 = (byte)datas[1];
		GodWeaponManager.getIns().upcuilianlv(hero, type, type1);
	} 
	/**
	 * CG 锻造神兵 7863
	 * @param type| 0 1次 1 十次| byte
	 * @param type1| 用的锤子类型 0工匠 1神匠| byte
	 */
	public void makeWuqi(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		int type1 = (byte)datas[1];
		GodWeaponManager.getIns().makeWuqi(hero, type, type1);
	} 
	/**
	 * CG 打开专属神兵ui 7871
	 */
	public void openUi(Hero hero, Object[] datas){
		GodWeaponManager.getIns().openUi(hero);
	} 
}