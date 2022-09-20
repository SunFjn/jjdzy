package com.teamtop.system.crossBoss;
import com.teamtop.system.hero.Hero;

/**
 * CrossBossCG.java
 * 跨服boss-七擒孟获
 */
public class CrossBossCG{

	private static CrossBossCG ins = null;

	public static CrossBossCG getIns(){
		if(ins == null){
			ins = new CrossBossCG();
		}
		return ins;
	}

	/**
	 * CG 查询某个boss的排行榜 1703
	 * @param bossid| bossid| int
	 */
	public void openRank(Hero hero, Object[] datas){
		int bossid = (int)datas[0];
		CrossBossManager.getIns().openRank(hero, bossid);
	} 
	/**
	 * CG （跨服）买活 1705
	 * @param type| 0买活 1前段申请复活| byte
	 */
	public void buyLive(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		CrossBossManager.getIns().buyLive(hero, type);
	} 
	/**
	 * CG 买进入次数 1707
	 */
	public void buyNum(Hero hero, Object[] datas){
		CrossBossManager.getIns().buyNum(hero);
	} 
	/**
	 * CG 进入跨服boss 1709
	 */
	public void join(Hero hero, Object[] datas){
		CrossBossManager.getIns().join(hero);
	} 
	/**
	 * CG （跨服）离开跨服boss 1711
	 */
	public void exitCrossBoss(Hero hero, Object[] datas){
		CrossBossManager.getIns().exitCrossBoss(hero);
	} 
	/**
	 * CG （跨服）打开boss伤害Rank 1713
	 * @param bossid| bossid| int
	 */
	public void openBossRank(Hero hero, Object[] datas){
		int bossid = (int)datas[0];
		CrossBossManager.getIns().openBossRank(hero, bossid);
	} 
	/**
	 * CG （跨服）打开奖励状态 1715
	 */
	public void openRewards(Hero hero, Object[] datas){
		CrossBossManager.getIns().openRewards(hero);
	} 
	/**
	 * CG （跨服）获取奖励 1717
	 * @param index| 奖励索引| byte
	 */
	public void getreward(Hero hero, Object[] datas){
		int index = (byte)datas[0];
		CrossBossManager.getIns().getreward(hero, index);
	} 
	/**
	 * CG （跨服）购买攻击buff 1719
	 */
	public void buyAttPro(Hero hero, Object[] datas){
		CrossBossManager.getIns().buyAttPro(hero);
	} 
	/**
	 * 打开界面 1701
	 * @param bossid| zsbossid| int
	 */
	public void openUi(Hero hero, Object[] datas){
		int bossid = (int)datas[0];
		CrossBossManager.getIns().openUi(hero, bossid);
	} 
	/**
	 * CG （跨服）通知后端本人死亡 1727
	 */
	public void cgdie(Hero hero, Object[] datas){
		CrossBossManager.getIns().cgdie(hero);
	} 
	/**
	 * CG （跨服）设置自动复活状态 1729
	 * @param state| 1开启自动复活 0关闭自动| byte
	 */
	public void isaotufuhuo(Hero hero, Object[] datas){
		int state = (byte)datas[0];
		CrossBossManager.getIns().isaotufuhuo(hero, state);
	} 
}