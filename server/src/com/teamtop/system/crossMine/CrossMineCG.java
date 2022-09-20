package com.teamtop.system.crossMine;
import com.teamtop.system.hero.Hero;

/**
 * CrossMineCG.java
 * 跨服矿藏
 */
public class CrossMineCG{

	private static CrossMineCG ins = null;

	public static CrossMineCG getIns(){
		if(ins == null){
			ins = new CrossMineCG();
		}
		return ins;
	}

	/**
	 * 打开界面 7201
	 */
	public void openUI(Hero hero, Object[] datas){
		CrossMineManager.getIns().openUI(hero);
	} 
	/**
	 * 邀请挖矿 7203
	 */
	public void invitation(Hero hero, Object[] datas){
		CrossMineManager.getIns().invitation(hero);
	} 
	/**
	 * 加入挖矿 7205
	 * @param mineId| 矿主id| long
	 */
	public void joinMine(Hero hero, Object[] datas){
		long mineId = (long)datas[0];
		CrossMineManager.getIns().joinMine(hero, mineId);
	} 
	/**
	 * 刷新矿藏 7207
	 * @param type| 类型:0-普通,1-一键| byte
	 */
	public void refreshMine(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		CrossMineManager.getIns().refreshMine(hero, type);
	} 
	/**
	 * 开始挖矿 7209
	 */
	public void startMine(Hero hero, Object[] datas){
		CrossMineManager.getIns().startMine(hero);
	} 
	/**
	 * 踢出矿工 7211
	 * @param minerId| 踢出旷工id| long
	 */
	public void kickMiner(Hero hero, Object[] datas){
		long minerId = (long)datas[0];
		CrossMineManager.getIns().kickMiner(hero, minerId);
	} 
	/**
	 * 离开挖矿 7213
	 */
	public void leaveMine(Hero hero, Object[] datas){
		CrossMineManager.getIns().leaveMine(hero);
	} 
	/**
	 * 前往跨服矿区 7215
	 */
	public void gotoMine(Hero hero, Object[] datas){
		CrossMineManager.getIns().gotoMine(hero);
	} 
	/**
	 * 搜索矿藏 7217
	 */
	public void searchMine(Hero hero, Object[] datas){
		CrossMineManager.getIns().searchMine(hero);
	} 
	/**
	 * 顺手牵羊 7219
	 * @param mineId| 矿藏id| long
	 */
	public void stealMine(Hero hero, Object[] datas){
		long mineId = (long)datas[0];
		CrossMineManager.getIns().stealMine(hero, mineId);
	} 
	/**
	 * 战斗抢夺 7221
	 * @param hid| 矿主id| long
	 */
	public void fightMine(Hero hero, Object[] datas){
		long hid = (long)datas[0];
		CrossMineManager.getIns().fightMine(hero, hid);
	} 
	/**
	 * 打开战报 7223
	 */
	public void openReport(Hero hero, Object[] datas){
		CrossMineManager.getIns().openReport(hero);
	} 
	/**
	 * 查看录像 7227
	 * @param index| 战斗中的索引| byte
	 */
	public void lookReport(Hero hero, Object[] datas){
		int index = (byte)datas[0];
		CrossMineManager.getIns().lookReport(hero, index);
	} 
	/**
	 * 领取采矿奖励 7233
	 * @param minerId| 矿藏主id| long
	 */
	public void getMineReward(Hero hero, Object[] datas){
		long minerId = (long)datas[0];
		CrossMineManager.getIns().getMineReward(hero, minerId);
	} 
}