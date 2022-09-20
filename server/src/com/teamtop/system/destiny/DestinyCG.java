package com.teamtop.system.destiny;
import com.teamtop.system.hero.Hero;

/**
 * DestinyCG.java
 * 八阵图
 */
public class DestinyCG{

	private static DestinyCG ins = null;

	public static DestinyCG getIns(){
		if(ins == null){
			ins = new DestinyCG();
		}
		return ins;
	}

	/**
	 * CG 打开八阵图 4401
	 */
	public void openUi(Hero hero, Object[] datas){
		DestinyManager.getIns().openUi(hero);
	} 
	/**
	 * CG 操作天命 4403
	 * @param type| 1.装备 2.卸下| byte
	 * @param destinyId| 天命id| int
	 * @param bagIndex| 该天命在背包的位置| int
	 * @param equipIndex| 要操作的装备位置(位置约定：顺时针1-8)| byte
	 */
	public void useDestiny(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		int destinyId = (int)datas[1];
		int bagIndex = (int)datas[2];
		int equipIndex = (byte)datas[3];
		DestinyManager.getIns().useDestiny(hero, type, destinyId, bagIndex, equipIndex);
	} 
	/**
	 * CG 升级符文 4405
	 * @param place| 升级八阵图上符文位置id| byte
	 */
	public void uplevel(Hero hero, Object[] datas){
		int place = (byte)datas[0];
		DestinyManager.getIns().uplevel(hero, place);
	} 
	/**
	 * CG 升星八阵图上符文位置id 4407
	 * @param place| 升星位置| byte
	 */
	public void upstar(Hero hero, Object[] datas){
		int place = (byte)datas[0];
		DestinyManager.getIns().upstar(hero, place);
	} 
	/**
	 * CG 分解 4409
	 * @param posArr| 位置| Object[]
	 */
	public void fenjie(Hero hero, Object[] datas){
		Object[] posArr = (Object[])datas[0];
		DestinyManager.getIns().fenjie(hero, posArr);
	} 
	/**
	 * 鉴定 4411
	 * @param type| 类型（0铜钱1元宝）| byte
	 * @param num| 次数（0 1次 1十次）| byte
	 */
	public void buydestiny(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		int num = (byte)datas[1];
		DestinyManager.getIns().buydestiny(hero, type, num);
	} 
	/**
	 * 锁 4413
	 * @param pos| 位置| int
	 * @param locked| 加锁1解锁0| byte
	 */
	public void locked(Hero hero, Object[] datas){
		int pos = (int)datas[0];
		int locked = (byte)datas[1];
		DestinyManager.getIns().locked(hero, pos, locked);
	} 
	/**
	 * GC 手动解锁符文孔 4415
	 * @param index| 位置| byte
	 */
	public void jiesuo(Hero hero, Object[] datas){
		int index = (byte)datas[0];
		DestinyManager.getIns().jiesuo(hero, index);
	} 
	/**
	 * 打开符文大师界面 4417
	 */
	public void openDestinyMasterUI(Hero hero, Object[] datas){
		DestinyManager.getIns().openDestinyMasterUI(hero);
	} 
	/**
	 * 激活或升级 4419
	 */
	public void jihuoOrUpLv(Hero hero, Object[] datas){
		DestinyManager.getIns().jihuoOrUpLv(hero);
	} 
	/**
	 * CG 按符文的类型分解 4421
	 * @param types| | Object[]
	 */
	public void fenjieBytype(Hero hero, Object[] datas){
		Object[] types = (Object[])datas[0];
		DestinyManager.getIns().fenjieBytype(hero, types);
	} 
	/**
	 * 兑换神符 4425
	 * @param id| 表的id| int
	 */
	public void buy(Hero hero, Object[] datas){
		int id = (int)datas[0];
		DestinyManager.getIns().buy(hero, id);
	} 
}