package com.teamtop.system.activity.ativitys.superHoodle;
import com.teamtop.system.hero.Hero;

/**
 * SuperHoodleCG.java
 * 超级弹珠
 */
public class SuperHoodleCG{

	private static SuperHoodleCG ins = null;

	public static SuperHoodleCG getIns(){
		if(ins == null){
			ins = new SuperHoodleCG();
		}
		return ins;
	}

	/**
	 * 屏蔽操作 11731
	 * @param type| 操作类型：（1：屏蔽，2：解除屏蔽）| byte
	 * @param index| 操作位置| byte
	 */
	public void block(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		int index = (byte)datas[1];
		SuperHoodleManager.getIns().block(hero, type, index);
	} 
	/**
	 * 发射 11733
	 * @param type| 发射类型（1:一次，2：五次）| byte
	 */
	public void shoot(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		SuperHoodleManager.getIns().shoot(hero, type);
	} 
	/**
	 * 重置 11735
	 */
	public void resetHoodle(Hero hero, Object[] datas){
		SuperHoodleManager.getIns().resetHoodle(hero);
	} 
	/**
	 * 打开弹珠积分商店界面 11737
	 */
	public void openStore(Hero hero, Object[] datas){
		SuperHoodleManager.getIns().openStore(hero);
	} 
	/**
	 * 兑换 11739
	 * @param id| 商品id| int
	 * @param num| 兑换数量| int
	 */
	public void exchange(Hero hero, Object[] datas){
		int id = (int)datas[0];
		int num = (int)datas[1];
		SuperHoodleManager.getIns().exchange(hero, id, num);
	} 
}