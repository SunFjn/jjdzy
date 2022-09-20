package com.teamtop.system.guanqia;
import com.teamtop.system.hero.Hero;

/**
 * GuanqiaCG.java
 * 关卡
 */
public class GuanqiaCG{

	private static GuanqiaCG ins = null;

	public static GuanqiaCG getIns(){
		if(ins == null){
			ins = new GuanqiaCG();
		}
		return ins;
	}

	/**
	 * 打完第X波小怪  1101
	 * @param curMonsterCount| 第X波小怪| byte
	 */
	public void syncCurMonster(Hero hero, Object[] datas){
		int curMonsterCount = (byte)datas[0];
		GuanqiaManager.getIns().syncCurMonster(hero, curMonsterCount);
	} 
	/**
	 * 打开挑战boss界面 1103
	 */
	public void openBossUI(Hero hero, Object[] datas){
		GuanqiaManager.getIns().openBossUI(hero);
	} 
	/**
	 * 战斗胜利，请求掉落 1105
	 * @param rs| 结果 1：胜利，0：失败,，2：退出失败或强制失败| byte
	 */
	public void beatBossWin(Hero hero, Object[] datas){
		int rs = (byte)datas[0];
		GuanqiaManager.getIns().beatBossWin(hero, rs);
	} 
	/**
	 * 排行榜 1107
	 */
	public void getRank(Hero hero, Object[] datas){
		GuanqiaManager.getIns().getRank(hero);
	} 
	/**
	 * 请求扫荡 1109
	 */
	public void mopUp(Hero hero, Object[] datas){
		GuanqiaManager.getIns().mopUp(hero);
	} 
	/**
	 * 领取斩杀奖励 1111
	 */
	public void getKillAward(Hero hero, Object[] datas){
		GuanqiaManager.getIns().getKillAward(hero);
	} 
	/**
	 * 请求挑战关卡Boss 1113
	 */
	public void challengeBoss(Hero hero, Object[] datas){
		GuanqiaManager.getIns().challengeBoss(hero);
	} 
	/**
	 * 领取大关卡通关奖励 1115
	 * @param bigId| 大关卡id| int
	 */
	public void getBigReward(Hero hero, Object[] datas){
		int bigId = (int)datas[0];
		GuanqiaManager.getIns().getBigReward(hero, bigId);
	} 
	/**
	 * 前往下一个大关卡 1117
	 */
	public void nextBigGuanqia(Hero hero, Object[] datas){
		GuanqiaManager.getIns().nextBigGuanqia(hero);
	} 
}