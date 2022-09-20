package com.teamtop.system.boss.monsterGod;
import com.teamtop.system.hero.Hero;

/**
 * MonsterGodCG.java
 * 魔神吕布
 */
public class MonsterGodCG{

	private static MonsterGodCG ins = null;

	public static MonsterGodCG getIns(){
		if(ins == null){
			ins = new MonsterGodCG();
		}
		return ins;
	}

	/**
	 * CG 打开魔神上届排行榜 1501
	 */
	public void openRank(Hero hero, Object[] datas){
		MonsterGodManager.getIns().openRank(hero);
	} 
	/**
	 * CG打开魔神吕布界面 1503
	 */
	public void openUi(Hero hero, Object[] datas){
		MonsterGodManager.getIns().openUi(hero);
	} 
	/**
	 * CG 离开魔神吕布 1507
	 */
	public void quitLvBuBoss(Hero hero, Object[] datas){
		MonsterGodManager.getIns().quitLvBuBoss(hero);
	} 
	/**
	 * CG 买活 1515
	 * @param type| 0买活 1申请复活| byte
	 */
	public void buyLive(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		MonsterGodManager.getIns().buyLive(hero, type);
	} 
	/**
	 * CG 进入boss 1517
	 */
	public void join(Hero hero, Object[] datas){
		MonsterGodManager.getIns().join(hero);
	} 
	/**
	 * CG 通知后端本人死亡 1519
	 */
	public void cgherodie(Hero hero, Object[] datas){
		MonsterGodManager.getIns().cgherodie(hero);
	} 
	/**
	 * CG 自动复活状态 1523
	 * @param state| 1开启自动复活 0关闭自动| byte
	 */
	public void isaotufuhuo(Hero hero, Object[] datas){
		int state = (byte)datas[0];
		MonsterGodManager.getIns().isaotufuhuo(hero, state);
	} 
}