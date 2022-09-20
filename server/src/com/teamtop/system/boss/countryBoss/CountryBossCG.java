package com.teamtop.system.boss.countryBoss;
import com.teamtop.system.hero.Hero;

/**
 * CountryBossCG.java
 * 国家boss
 */
public class CountryBossCG{

	private static CountryBossCG ins = null;

	public static CountryBossCG getIns(){
		if(ins == null){
			ins = new CountryBossCG();
		}
		return ins;
	}

	/**
	 * CG 打开国家boss 3201
	 */
	public void openUi(Hero hero, Object[] datas){
		CountryBossManager.getIns().openUi(hero);
	} 
	/**
	 * CG 挑战国家boss 3203
	 * @param id| BossID| int
	 */
	public void inbattle(Hero hero, Object[] datas){
		int id = (int)datas[0];
		CountryBossManager.getIns().inbattle(hero, id);
	} 
	/**
	 * CG 退出国家boss 请求发参与奖励 3207
	 */
	public void quit(Hero hero, Object[] datas){
		CountryBossManager.getIns().quit(hero);
	} 
	/**
	 * CG 购买次数 3213
	 * @param num| 次数| byte
	 */
	public void buyTime(Hero hero, Object[] datas){
		int num = (byte)datas[0];
		CountryBossManager.getIns().buyTime(hero, num);
	} 
	/**
	 * CG 获取boss通过奖励 3215
	 * @param bossId| bossid| int
	 */
	public void getReward(Hero hero, Object[] datas){
		int bossId = (int)datas[0];
		CountryBossManager.getIns().getReward(hero, bossId);
	} 
	/**
	 * CG 打开某个国家boss排行榜 3217
	 * @param index| boss序号| byte
	 */
	public void openrank(Hero hero, Object[] datas){
		int index = (byte)datas[0];
		CountryBossManager.getIns().openrank(hero, index);
	} 
	/**
	 * GC 打开国家排行 3219
	 */
	public void countryrank(Hero hero, Object[] datas){
		CountryBossManager.getIns().countryrank(hero);
	} 
}