package com.teamtop.system.sixWay;
import com.teamtop.system.hero.Hero;

/**
 * SixWayCG.java
 * 六道
 */
public class SixWayCG{

	private static SixWayCG ins = null;

	public static SixWayCG getIns(){
		if(ins == null){
			ins = new SixWayCG();
		}
		return ins;
	}

	/**
	 * GC 打开ui返回 11901
	 */
	public void openUi(Hero hero, Object[] datas){
		SixWayManager.getIns().openUi(hero);
	} 
	/**
	 * GC 打开某一道 11903
	 * @param index| 索引| byte
	 */
	public void openOneWay(Hero hero, Object[] datas){
		int index = (byte)datas[0];
		SixWayManager.getIns().openOneWay(hero, index);
	} 
	/**
	 * CG 使用印记 11905
	 * @param type| 1.装备 2.卸下| byte
	 * @param eid| 印记id| int
	 * @param ebagIndex| 该印记在背包的位置（1-300）| int
	 * @param equipPart| 要操作的装备位置| int
	 */
	public void useYingJi(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		int eid = (int)datas[1];
		int ebagIndex = (int)datas[2];
		int equipPart = (int)datas[3];
		SixWayManager.getIns().useYingJi(hero, type, eid, ebagIndex, equipPart);
	} 
	/**
	 * CG 升级印记 11907
	 * @param equipPlace| 装备位置| int
	 */
	public void uplevel(Hero hero, Object[] datas){
		int equipPlace = (int)datas[0];
		SixWayManager.getIns().uplevel(hero, equipPlace);
	} 
	/**
	 * CG 升级装备印记星级 11909
	 * @param eid| 装备印记位置| int
	 */
	public void upstar(Hero hero, Object[] datas){
		int eid = (int)datas[0];
		SixWayManager.getIns().upstar(hero, eid);
	} 
	/**
	 * CG 分解背包印记 11911
	 * @param placeids| | Object[]
	 */
	public void fenjie(Hero hero, Object[] datas){
		Object[] placeids = (Object[])datas[0];
		SixWayManager.getIns().fenjie(hero, placeids);
	} 
	/**
	 * CG 分解按照类型 11915
	 * @param types| | Object[]
	 */
	public void fenjieBytype(Hero hero, Object[] datas){
		Object[] types = (Object[])datas[0];
		SixWayManager.getIns().fenjieBytype(hero, types);
	} 
}