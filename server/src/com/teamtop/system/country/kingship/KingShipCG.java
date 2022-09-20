package com.teamtop.system.country.kingship;
import com.teamtop.system.hero.Hero;

/**
 * KingShipCG.java
 * 王位之争
 */
public class KingShipCG{

	private static KingShipCG ins = null;

	public static KingShipCG getIns(){
		if(ins == null){
			ins = new KingShipCG();
		}
		return ins;
	}

	/**
	 * 王位之争挑战UI 1761
	 */
	public void openUIKingShip(Hero hero, Object[] datas){
		KingShipManager.getIns().openUIKingShip(hero);
	} 
	/**
	 * 本国挑战 1763
	 */
	public void ownCountryChallenge(Hero hero, Object[] datas){
		KingShipManager.getIns().ownCountryChallenge(hero);
	} 
	/**
	 * 膜拜 1765
	 */
	public void moBai(Hero hero, Object[] datas){
		KingShipManager.getIns().moBai(hero);
	} 
	/**
	 * 打开皇城侍卫界面 1767
	 */
	public void openKingShipGuardUI(Hero hero, Object[] datas){
		KingShipManager.getIns().openKingShipGuardUI(hero);
	} 
	/**
	 * 任命皇城侍卫 1769
	 * @param hid| 任命的玩家id| long
	 */
	public void assignGuard(Hero hero, Object[] datas){
		long hid = (long)datas[0];
		KingShipManager.getIns().assignGuard(hero, hid);
	} 
	/**
	 * 购买挑战次数 1771
	 * @param buyTimes| 购买次数| byte
	 */
	public void buyCha(Hero hero, Object[] datas){
		int buyTimes = (byte)datas[0];
		KingShipManager.getIns().buyCha(hero, buyTimes);
	} 
	/**
	 * 战斗结果 1773
	 * @param state| 战斗结果状态0：失败，1：胜利，2：退出| byte
	 */
	public void fightEnd(Hero hero, Object[] datas){
		int state = (byte)datas[0];
		KingShipManager.getIns().fightEnd(hero, state);
	} 
	/**
	 * 领取宝箱奖励 1775
	 * @param id| 宝箱id| byte
	 */
	public void getBXAward(Hero hero, Object[] datas){
		int id = (byte)datas[0];
		KingShipManager.getIns().getBXAward(hero, id);
	} 
}