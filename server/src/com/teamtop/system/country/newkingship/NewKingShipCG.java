package com.teamtop.system.country.newkingship;
import com.teamtop.system.hero.Hero;

/**
 * NewKingShipCG.java
 * 新王位之争
 */
public class NewKingShipCG{

	private static NewKingShipCG ins = null;

	public static NewKingShipCG getIns(){
		if(ins == null){
			ins = new NewKingShipCG();
		}
		return ins;
	}

	/**
	 * 获取新王位争夺数据 5201
	 */
	public void openUINewKingShip(Hero hero, Object[] datas){
		NewKingShipManager.getIns().openUINewKingShip(hero);
	} 
	/**
	 * CG 挑战王位上的人 5203
	 * @param sitid| 位置id| int
	 * @param roleID| 角色ID或怪物ID| long
	 */
	public void battle(Hero hero, Object[] datas){
		int sitid = (int)datas[0];
		long roleID = (long)datas[1];
		NewKingShipManager.getIns().battle(hero, sitid, roleID);
	} 
	/**
	 * CG 获取俸禄 5209
	 */
	public void getreward(Hero hero, Object[] datas){
		NewKingShipManager.getIns().getreward(hero);
	} 
	/**
	 * CG 挑战结果 5205
	 * @param rest| 前段结果  0：失败，1：胜利，2：退出| byte
	 */
	public void battlerest(Hero hero, Object[] datas){
		int rest = (byte)datas[0];
		NewKingShipManager.getIns().battlerest(hero, rest);
	} 
	/**
	 * CG 膜拜 5211
	 */
	public void getMobai(Hero hero, Object[] datas){
		NewKingShipManager.getIns().getMobai(hero);
	} 
	/**
	 * CG 买次数 5213
	 * @param num| 购买次数| byte
	 */
	public void buyTime(Hero hero, Object[] datas){
		int num = (byte)datas[0];
		NewKingShipManager.getIns().buyTime(hero, num);
	} 
}