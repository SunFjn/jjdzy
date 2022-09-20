package com.teamtop.system.qice;
import com.teamtop.system.hero.Hero;

/**
 * QiCeCG.java
 * 奇策
 */
public class QiCeCG{

	private static QiCeCG ins = null;

	public static QiCeCG getIns(){
		if(ins == null){
			ins = new QiCeCG();
		}
		return ins;
	}

	/**
	 * 打开奇策 9701
	 */
	public void openQiCe(Hero hero, Object[] datas){
		QiCeManager.getIns().openQiCe(hero);
	} 
	/**
	 * 激活/升星奇策 9703
	 * @param index| 奇策id| int
	 */
	public void upQiCe(Hero hero, Object[] datas){
		int index = (int)datas[0];
		QiCeManager.getIns().upQiCe(hero, index);
	} 
	/**
	 * 升级奇策套装 9705
	 */
	public void upQCtaozhuang(Hero hero, Object[] datas){
		QiCeManager.getIns().upQCtaozhuang(hero);
	} 
	/**
	 * 吞噬丹药 9707
	 * @param eatType| 吞噬类型 0一个 1一键| int
	 * @param index| 奇策id| int
	 * @param dan| 奇策吞噬表的索引id| int
	 */
	public void eatDan(Hero hero, Object[] datas){
		int eatType = (int)datas[0];
		int index = (int)datas[1];
		int dan = (int)datas[2];
		QiCeManager.getIns().eatDan(hero, eatType, index, dan);
	} 
	/**
	 * 奇策升阶 9709
	 * @param index| 奇策id| int
	 */
	public void upQiCeJie(Hero hero, Object[] datas){
		int index = (int)datas[0];
		QiCeManager.getIns().upQiCeJie(hero, index);
	} 
}