package com.teamtop.system.zhanjia;
import com.teamtop.system.hero.Hero;

/**
 * ZhanJiaCG.java
 * 战甲
 */
public class ZhanJiaCG{

	private static ZhanJiaCG ins = null;

	public static ZhanJiaCG getIns(){
		if(ins == null){
			ins = new ZhanJiaCG();
		}
		return ins;
	}

	/**
	 * CG 获取战甲信息 801
	 */
	public void getZhanJiaUi(Hero hero, Object[] datas){
		ZhanJiaManager.getIns().getZhanJiaUi(hero);
	} 
	/**
	 * CG 战甲升阶 803
	 * @param type| 升阶方式0一颗 1一键| byte
	 */
	public void upJie(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		ZhanJiaManager.getIns().upJie(hero, type);
	} 
	/**
	 * CG 战甲激活/升星 805
	 * @param type| 战甲类型| byte
	 */
	public void zhanjiastar(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		ZhanJiaManager.getIns().zhanjiastar(hero, type);
	} 
	/**
	 * CG 激活/升阶战甲套装 807
	 * @param index| 激活/升阶套装| byte
	 */
	public void upZJTZ(Hero hero, Object[] datas){
		int index = (byte)datas[0];
		ZhanJiaManager.getIns().upZJTZ(hero, index);
	} 
	/**
	 * CG 激活/升阶战甲技能 809
	 * @param index| 位置id 12345| byte
	 */
	public void jihuoSkill(Hero hero, Object[] datas){
		int index = (byte)datas[0];
		ZhanJiaManager.getIns().jihuoSkill(hero, index);
	} 
	/**
	 * CG 使用丹药 811
	 * @param index| 丹药索引 3属性丹 4资质丹| byte
	 * @param type| 使用方式 0 一颗 1一键| byte
	 */
	public void useDan(Hero hero, Object[] datas){
		int index = (byte)datas[0];
		int type = (byte)datas[1];
		ZhanJiaManager.getIns().useDan(hero, index, type);
	} 
	/**
	 * 更换战甲 813
	 * @param type| 战甲类型| int
	 */
	public void changeZhanjia(Hero hero, Object[] datas){
		int type = (int)datas[0];
		ZhanJiaManager.getIns().changeZhanjia(hero, type);
	} 
	/**
	 * CG 获取5系统激活套装 815
	 * @param type| （1武将2宝物3神剑4异宝5天书）| byte
	 */
	public void taozhuangs(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		ZhanJiaManager.getIns().taozhuangs(hero, type);
	} 
	/**
	 * 5系统激活升级套装 817
	 * @param sys| 系统id| byte
	 * @param type| 激活/升阶套装| byte
	 */
	public void taozhuangsUp(Hero hero, Object[] datas){
		int sys = (byte)datas[0];
		int type = (byte)datas[1];
		ZhanJiaManager.getIns().taozhuangsUp(hero, sys, type);
	} 
	/**
	 * CG获取7系统的觉醒情况1武将2宝物3神剑4异宝5天书6兵法7战甲 819
	 * @param type| 类型| byte
	 */
	public void getJueXin(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		ZhanJiaManager.getIns().getJueXin(hero, type);
	} 
	/**
	 * CG 升级某个系统的某个觉醒技能/或觉醒之力 821
	 * @param type| 1武将2宝物3神剑4异宝5天书6兵法7战甲| byte
	 * @param index| :对应武将/宝物/神剑序号| int
	 * @param skillindex| 1-4:4表示提升觉醒之力| int
	 */
	public void upjuexing(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		int index = (int)datas[1];
		int skillindex = (int)datas[2];
		ZhanJiaManager.getIns().upjuexing(hero, type, index, skillindex);
	} 
}