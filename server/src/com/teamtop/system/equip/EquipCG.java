package com.teamtop.system.equip;
import com.teamtop.system.hero.Hero;

/**
 * EquipCG.java
 * 装备
 */
public class EquipCG{

	private static EquipCG ins = null;

	public static EquipCG getIns(){
		if(ins == null){
			ins = new EquipCG();
		}
		return ins;
	}

	/**
	 * CG 一键穿戴普通装备 353
	 * @param equips| 需要替换的装备数组| Object[]
	 */
	public void wearEquip(Hero hero, Object[] datas){
		Object[] equips = (Object[])datas[0];
		EquipManager.getIns().wearEquip(hero, equips);
	} 
	/**
	 * CG 身上神装升级 361
	 * @param bodyIndex| 身上位置| byte
	 */
	public void updateOrange(Hero hero, Object[] datas){
		int bodyIndex = (byte)datas[0];
		EquipManager.getIns().updateOrange(hero, bodyIndex);
	} 
	/**
	 * CG 合成神装 363
	 * @param bodyIndex| 身上位置| byte
	 * @param sysId| 装备系统id| int
	 */
	public void composeOrange(Hero hero, Object[] datas){
		int bodyIndex = (byte)datas[0];
		int sysId = (int)datas[1];
		EquipManager.getIns().composeOrange(hero, bodyIndex, sysId);
	} 
	/**
	 * CG 神装/转生装备分解 365
	 * @param equipId| 装备唯一id| long
	 */
	public void decomposeOrange(Hero hero, Object[] datas){
		long equipId = (long)datas[0];
		EquipManager.getIns().decomposeOrange(hero, equipId);
	} 
	/**
	 * CG 获取的装备 351
	 * @param state| 装备状态 0不在身上1身上普通装备2神装3武将将印4转生装备5-10(5武将6战甲7神剑8异宝9兵法10宝物11天书)| byte
	 */
	public void getEquips(Hero hero, Object[] datas){
		int state = (byte)datas[0];
		EquipManager.getIns().getEquips(hero, state);
	} 
	/**
	 * CG 穿戴神装备 355
	 */
	public void wearShenEquip(Hero hero, Object[] datas){
		EquipManager.getIns().wearShenEquip(hero);
	} 
	/**
	 * 获取神装套装阶数 367
	 */
	public void getJieOrange(Hero hero, Object[] datas){
		EquipManager.getIns().getJieOrange(hero);
	} 
	/**
	 * 提升神装套装阶数 369
	 */
	public void upJieOrange(Hero hero, Object[] datas){
		EquipManager.getIns().upJieOrange(hero);
	} 
	/**
	 * CG 通过唯一id穿（1装备2神装3将印4转生装备） 371
	 * @param eid| 装备唯一id| long
	 */
	public void wearEquipByid(Hero hero, Object[] datas){
		long eid = (long)datas[0];
		EquipManager.getIns().wearEquipByid(hero, eid);
	} 
	/**
	 * 一键穿戴转生装备  373
	 * @param arrs| 需要替换的装备数组| Object[]
	 */
	public void wearReBornEquip(Hero hero, Object[] datas){
		Object[] arrs = (Object[])datas[0];
		EquipManager.getIns().wearReBornEquip(hero, arrs);
	} 
	/**
	 * CG 一键穿戴装备通过系统 375
	 * @param type| 1武将2战甲3神剑4异宝5兵法6宝物7天书| byte
	 * @param eids| | Object[]
	 */
	public void wearbypart(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		Object[] eids = (Object[])datas[1];
		EquipManager.getIns().wearbypart(hero, type, eids);
	} 
	/**
	 * GC 洗练装备 377
	 * @param index| 洗练位置| int
	 */
	public void clearEquip(Hero hero, Object[] datas){
		int index = (int)datas[0];
		EquipManager.getIns().clearEquip(hero, index);
	} 
	/**
	 * CG 查看神装部位洗练 379
	 */
	public void clearSate(Hero hero, Object[] datas){
		EquipManager.getIns().clearSate(hero);
	} 
}