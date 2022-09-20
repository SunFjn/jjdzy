package com.teamtop.system.activity.ativitys.hefuZhangFeiBoss;
import com.teamtop.system.hero.Hero;

/**
 * HeFuZhangFeiBossCG.java
 * 合服张飞醉酒
 */
public class HeFuZhangFeiBossCG{

	private static HeFuZhangFeiBossCG ins = null;

	public static HeFuZhangFeiBossCG getIns(){
		if(ins == null){
			ins = new HeFuZhangFeiBossCG();
		}
		return ins;
	}

	/**
	 * CG 敬酒 9641
	 * @param type| 敬酒类型| byte
	 */
	public void addjiu(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		HeFuZhangFeiBossManager.getIns().addjiu(hero, type);
	} 
	/**
	 * CG 进入张飞战斗 9645
	 */
	public void join(Hero hero, Object[] datas){
		HeFuZhangFeiBossManager.getIns().join(hero);
	} 
	/**
	 * CG退出 9647
	 */
	public void quit(Hero hero, Object[] datas){
		HeFuZhangFeiBossManager.getIns().quit(hero);
	} 
	/**
	 * CG 通知后端 我本人死亡了 9653
	 */
	public void cgherodie(Hero hero, Object[] datas){
		HeFuZhangFeiBossManager.getIns().cgherodie(hero);
	} 
	/**
	 * CG 买活 9655
	 * @param type| 0买活 1申请复活| byte
	 */
	public void buyLive(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		HeFuZhangFeiBossManager.getIns().buyLive(hero, type);
	} 
	/**
	 * CG 自动复活状态 9657
	 * @param state| 1开启自动复活 0关闭自动| byte
	 */
	public void isaotufuhuo(Hero hero, Object[] datas){
		int state = (byte)datas[0];
		HeFuZhangFeiBossManager.getIns().isaotufuhuo(hero, state);
	} 
	/**
	 * CG 打开敬酒排行榜 9663
	 */
	public void openRank(Hero hero, Object[] datas){
		HeFuZhangFeiBossManager.getIns().openRank(hero);
	} 
	/**
	 * CG 获取Boss被击杀奖励 9665
	 * @param index| boss序号| int
	 */
	public void getBossReward(Hero hero, Object[] datas){
		int index = (int)datas[0];
		HeFuZhangFeiBossManager.getIns().getBossReward(hero, index);
	} 
}