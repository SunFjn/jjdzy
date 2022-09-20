package com.teamtop.system.activity.ativitys.arenaFight;
import com.teamtop.system.hero.Hero;

/**
 * ArenaFightCG.java
 * 擂台比武
 */
public class ArenaFightCG{

	private static ArenaFightCG ins = null;

	public static ArenaFightCG getIns(){
		if(ins == null){
			ins = new ArenaFightCG();
		}
		return ins;
	}

	/**
	 * 挑战擂主 11601
	 * @param arenaId| 擂台id| int
	 * @param masterId| 擂主id| long
	 */
	public void challenge(Hero hero, Object[] datas){
		int arenaId = (int)datas[0];
		long masterId = (long)datas[1];
		ArenaFightManager.getIns().challenge(hero, arenaId, masterId);
	} 
	/**
	 * 战斗结束 11603
	 * @param result| 战斗结果（0：失败，1：胜利）| byte
	 */
	public void fightEnd(Hero hero, Object[] datas){
		int result = (byte)datas[0];
		ArenaFightManager.getIns().fightEnd(hero, result);
	} 
	/**
	 * 协助擂主 11605
	 * @param arenaId| 擂台id| int
	 * @param index| 协助位置| int
	 */
	public void assist(Hero hero, Object[] datas){
		int arenaId = (int)datas[0];
		int index = (int)datas[1];
		ArenaFightManager.getIns().assist(hero, arenaId, index);
	} 
	/**
	 * 踢出擂台 11607
	 * @param arenaId| 擂台id| int
	 * @param index| 协助位置| int
	 */
	public void kickOut(Hero hero, Object[] datas){
		int arenaId = (int)datas[0];
		int index = (int)datas[1];
		ArenaFightManager.getIns().kickOut(hero, arenaId, index);
	} 
	/**
	 * 获取战报 11609
	 */
	public void getNoticeList(Hero hero, Object[] datas){
		ArenaFightManager.getIns().getNoticeList(hero);
	} 
}