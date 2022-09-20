package com.teamtop.system.zcBoss;
import com.teamtop.system.hero.Hero;

/**
 * ZcBossHeroCG.java
 * 战场boss
 */
public class ZcBossHeroCG{

	private static ZcBossHeroCG ins = null;

	public static ZcBossHeroCG getIns(){
		if(ins == null){
			ins = new ZcBossHeroCG();
		}
		return ins;
	}

	/**
	 * GC 打开boss战场 4451
	 * @param type| 1本服 2跨服| byte
	 */
	public void openUi(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		ZcBossHeroManager.getIns().openUi(hero, type);
	} 
	/**
	 * CG 进入战场boss 4453
	 * @param index| 副本序号| int
	 */
	public void join(Hero hero, Object[] datas){
		int index = (int)datas[0];
		ZcBossHeroManager.getIns().join(hero, index);
	} 
	/**
	 * CG 挑战boss战场某人 4457
	 * @param atthid| 玩家id| long
	 */
	public void battlehero(Hero hero, Object[] datas){
		long atthid = (long)datas[0];
		ZcBossHeroManager.getIns().battlehero(hero, atthid);
	} 
	/**
	 * CG 挑战boss 4459
	 */
	public void battleboss(Hero hero, Object[] datas){
		ZcBossHeroManager.getIns().battleboss(hero);
	} 
	/**
	 * CG 前段通知boss挑战结果 4461
	 * @param battlerest| 1赢了0输了| byte
	 */
	public void battlerest(Hero hero, Object[] datas){
		int battlerest = (byte)datas[0];
		ZcBossHeroManager.getIns().battlerest(hero, battlerest);
	} 
	/**
	 * CG 离开副本 4463
	 */
	public void quit(Hero hero, Object[] datas){
		ZcBossHeroManager.getIns().quit(hero);
	} 
}