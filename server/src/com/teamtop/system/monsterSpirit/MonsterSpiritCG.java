package com.teamtop.system.monsterSpirit;
import com.teamtop.system.hero.Hero;

/**
 * MonsterSpiritCG.java
 * 兽灵
 */
public class MonsterSpiritCG{

	private static MonsterSpiritCG ins = null;

	public static MonsterSpiritCG getIns(){
		if(ins == null){
			ins = new MonsterSpiritCG();
		}
		return ins;
	}

	/**
	 * 请求界面信息 851
	 */
	public void openUI(Hero hero, Object[] datas){
		MonsterSpiritManager.getIns().openUI(hero);
	} 
	/**
	 * 兽灵升级 853
	 * @param mosterSpiritId| 兽灵id| int
	 */
	public void upgrade(Hero hero, Object[] datas){
		int mosterSpiritId = (int)datas[0];
		MonsterSpiritManager.getIns().upgrade(hero, mosterSpiritId);
	} 
	/**
	 * 穿戴兽灵装备 855
	 * @param type| 兽灵类型| byte
	 * @param index| 装备位置| short
	 */
	public void wearEquip(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		int index = (short)datas[1];
		MonsterSpiritManager.getIns().wearEquip(hero, type, index);
	} 
	/**
	 * 洗练 857
	 * @param type| 兽灵类型| byte
	 * @param site| 洗练装备位置| short
	 * @param stampId| 使用的印记道具id| int
	 */
	public void washEquip(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		int site = (short)datas[1];
		int stampId = (int)datas[2];
		MonsterSpiritManager.getIns().washEquip(hero, type, site, stampId);
	} 
	/**
	 * 升级星宿 859
	 * @param type| 兽灵类型| byte
	 */
	public void updateStar(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		MonsterSpiritManager.getIns().updateStar(hero, type);
	} 
	/**
	 * 激活兽灵 861
	 * @param type| 兽灵类型| byte
	 */
	public void activate(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		MonsterSpiritManager.getIns().activate(hero, type);
	} 
	/**
	 * 锁定印记 863
	 * @param type| 兽灵类型| byte
	 * @param site| 装备位置| short
	 * @param index| 印记位置| byte
	 * @param opType| 操作类型| byte
	 */
	public void lockStamp(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		int site = (short)datas[1];
		int index = (byte)datas[2];
		int opType = (byte)datas[3];
		MonsterSpiritManager.getIns().lockStamp(hero, type, site, index, opType);
	} 
	/**
	 * 兽灵出战 865
	 * @param type| 兽灵类型| byte
	 */
	public void goFight(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		MonsterSpiritManager.getIns().goFight(hero, type);
	} 
	/**
	 * 星宿进阶 867
	 * @param type| 兽灵类型| byte
	 */
	public void starUpgrade(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		MonsterSpiritManager.getIns().starUpgrade(hero, type);
	} 

}