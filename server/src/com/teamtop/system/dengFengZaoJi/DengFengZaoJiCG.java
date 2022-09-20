package com.teamtop.system.dengFengZaoJi;
import com.teamtop.system.hero.Hero;

/**
 * DengFengZaoJiCG.java
 * 登峰造极
 */
public class DengFengZaoJiCG{

	private static DengFengZaoJiCG ins = null;

	public static DengFengZaoJiCG getIns(){
		if(ins == null){
			ins = new DengFengZaoJiCG();
		}
		return ins;
	}

	/**
	 * 获取登峰造极数据 11951
	 * @param type| 0.海选 1.决赛| byte
	 */
	public void openUI(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		DengFengZaoJiManager.getIns().openUI(hero, type);
	} 
	/**
	 * 购买挑战次数 11953
	 * @param type| 0.海选 1.决赛| byte
	 * @param num| 次数| int
	 */
	public void buyTime(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		int num = (int)datas[1];
		DengFengZaoJiManager.getIns().buyTime(hero, type, num);
	} 
	/**
	 * 获取排名奖励 11955
	 * @param type| 0.海选 1.决赛| byte
	 */
	public void rankReward(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		DengFengZaoJiManager.getIns().rankReward(hero, type);
	} 
	/**
	 * 获取积分奖励数据 11957
	 */
	public void scoreReward(Hero hero, Object[] datas){
		DengFengZaoJiManager.getIns().scoreReward(hero);
	} 
	/**
	 * 换一批 11959
	 * @param type| 0.海选 1.决赛| byte
	 */
	public void replace(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		DengFengZaoJiManager.getIns().replace(hero, type);
	} 
	/**
	 * 获取冠军预测数据 11961
	 */
	public void getPredictData(Hero hero, Object[] datas){
		DengFengZaoJiManager.getIns().getPredictData(hero);
	} 
	/**
	 * 下注 11963
	 * @param thid| 玩家id| long
	 */
	public void bet(Hero hero, Object[] datas){
		long thid = (long)datas[0];
		DengFengZaoJiManager.getIns().bet(hero, thid);
	} 
	/**
	 * 挑战 11965
	 * @param type| 0.海选 1.决赛| byte
	 * @param thid| 角色id| long
	 */
	public void battle(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		long thid = (long)datas[1];
		DengFengZaoJiManager.getIns().battle(hero, type, thid);
	} 
	/**
	 * 战斗结果 11967
	 * @param state| 前段结果 0：失败，1：胜利，2：退出| byte
	 */
	public void battlerest(Hero hero, Object[] datas){
		int state = (byte)datas[0];
		DengFengZaoJiManager.getIns().battlerest(hero, state);
	} 
	/**
	 * 领取积分奖励 11969
	 * @param id| 积分id| int
	 */
	public void receive(Hero hero, Object[] datas){
		int id = (int)datas[0];
		DengFengZaoJiManager.getIns().receive(hero, id);
	} 
}