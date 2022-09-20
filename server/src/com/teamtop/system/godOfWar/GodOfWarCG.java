package com.teamtop.system.godOfWar;
import com.teamtop.system.hero.Hero;

/**
 * GodOfWarCG.java
 * 三国战神
 */
public class GodOfWarCG{

	private static GodOfWarCG ins = null;

	public static GodOfWarCG getIns(){
		if(ins == null){
			ins = new GodOfWarCG();
		}
		return ins;
	}

	/**
	 * 打开三国战神界面 1401
	 */
	public void openGodOfWar(Hero hero, Object[] datas){
		GodOfWarManager.getIns().openGodOfWar(hero);
	} 
	/**
	 * 购买挑战次数 1403
	 * @param num| 购买次数| byte
	 */
	public void buyCha(Hero hero, Object[] datas){
		int num = (byte)datas[0];
		GodOfWarManager.getIns().buyCha(hero, num);
	} 
	/**
	 * 刷新对手 1405
	 */
	public void refreshRival(Hero hero, Object[] datas){
		GodOfWarManager.getIns().refreshRival(hero);
	} 
	/**
	 * 挑战 1407
	 * @param beChaId| 被挑战玩家Id| long
	 * @param ranking| 排名| int
	 */
	public void challenge(Hero hero, Object[] datas){
		long beChaId = (long)datas[0];
		int ranking = (int)datas[1];
		GodOfWarManager.getIns().challenge(hero, beChaId, ranking);
	} 
	/**
	 * 扫荡 1411
	 * @param beChaId| 被扫荡玩家| long
	 */
	public void mopUp(Hero hero, Object[] datas){
		long beChaId = (long)datas[0];
		GodOfWarManager.getIns().mopUp(hero, beChaId);
	} 
	/**
	 * 挑战战斗结果 1409
	 * @param result| 0：失败，1：胜利，2：退出| byte
	 */
	public void fightResult(Hero hero, Object[] datas){
		int result = (byte)datas[0];
		GodOfWarManager.getIns().fightResult(hero, result);
	} 
	/**
	 * 打开宝藏界面 1413
	 */
	public void openWarStore(Hero hero, Object[] datas){
		GodOfWarManager.getIns().openWarStore(hero);
	} 
	/**
	 * 购买商品 1415
	 * @param id| 商品id| int
	 */
	public void buyGoods(Hero hero, Object[] datas){
		int id = (int)datas[0];
		GodOfWarManager.getIns().buyGoods(hero, id);
	} 
}