package com.teamtop.system.smelt;
import com.teamtop.system.hero.Hero;

/**
 * SmeltCG.java
 * 熔炼
 */
public class SmeltCG{

	private static SmeltCG ins = null;

	public static SmeltCG getIns(){
		if(ins == null){
			ins = new SmeltCG();
		}
		return ins;
	}

	/**
	 * CG申请熔炼数据 601
	 */
	public void getSmelt(Hero hero, Object[] datas){
		SmeltManager.getIns().getSmelt(hero);
	} 
	/**
	 * CG熔炼装备 603
	 * @param type| 1普通2特殊| byte
	 * @param ids| 装备集合| Object[]
	 */
	public void smelt(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		Object[] ids = (Object[])datas[1];
		SmeltManager.getIns().smelt(hero, type, ids);
	} 
}