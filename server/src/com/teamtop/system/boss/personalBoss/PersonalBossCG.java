package com.teamtop.system.boss.personalBoss;
import com.teamtop.system.hero.Hero;

/**
 * PersonalBossCG.java
 * 个人BOSS
 */
public class PersonalBossCG{

	private static PersonalBossCG ins = null;

	public static PersonalBossCG getIns(){
		if(ins == null){
			ins = new PersonalBossCG();
		}
		return ins;
	}

	/**
	 * 打开个人boss界面 1251
	 */
	public void openBoss(Hero hero, Object[] datas){
		PersonalBossManager.getIns().openBoss(hero);
	} 
	/**
	 * 请求挑战个人Boss 1253
	 * @param bossId| bossId| int
	 */
	public void challengeBoss(Hero hero, Object[] datas){
		int bossId = (int)datas[0];
		PersonalBossManager.getIns().challengeBoss(hero, bossId);
	} 
	/**
	 * 战斗胜利，请求掉落 1255
	 * @param result| 0：失败，1：胜利| byte
	 * @param bossId| bossId| int
	 */
	public void beatBossWin(Hero hero, Object[] datas){
		int result = (byte)datas[0];
		int bossId = (int)datas[1];
		PersonalBossManager.getIns().beatBossWin(hero, result, bossId);
	} 
	/**
	 * 一键扫荡 1257
	 */
	public void mopUp(Hero hero, Object[] datas){
		PersonalBossManager.getIns().mopUp(hero);
	} 
}