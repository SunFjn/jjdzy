package com.teamtop.system.crossWenDingTianXia;
import com.teamtop.system.hero.Hero;

/**
 * CrossWenDingTianXiaCG.java
 * 问鼎天下
 */
public class CrossWenDingTianXiaCG{

	private static CrossWenDingTianXiaCG ins = null;

	public static CrossWenDingTianXiaCG getIns(){
		if(ins == null){
			ins = new CrossWenDingTianXiaCG();
		}
		return ins;
	}

	/**
	 * （跨服）挑战玩家 4207
	 * @param hidOth| 其他玩家ID| long
	 */
	public void battle(Hero hero, Object[] datas){
		long hidOth = (long)datas[0];
		CrossWenDingTianXiaManager.getIns().battle(hero, hidOth);
	} 
	/**
	 * （跨服）打开排名排行榜 4213
	 */
	public void openRank(Hero hero, Object[] datas){
		CrossWenDingTianXiaManager.getIns().openRank(hero);
	} 
	/**
	 * （跨服）打开连斩奖励 4215
	 */
	public void openKillAwards(Hero hero, Object[] datas){
		CrossWenDingTianXiaManager.getIns().openKillAwards(hero);
	} 
	/**
	 * （跨服）打开楼层奖励 4217
	 */
	public void openLayerAwards(Hero hero, Object[] datas){
		CrossWenDingTianXiaManager.getIns().openLayerAwards(hero);
	} 
	/**
	 * （跨服）领取连斩奖励 4219
	 * @param id| 配置表ID| byte
	 */
	public void getKillAwards(Hero hero, Object[] datas){
		int id = (byte)datas[0];
		CrossWenDingTianXiaManager.getIns().getKillAwards(hero, id);
	} 
	/**
	 * （跨服）领取楼层奖励 4221
	 * @param layer| 层数| byte
	 */
	public void getLayerAwards(Hero hero, Object[] datas){
		int layer = (byte)datas[0];
		CrossWenDingTianXiaManager.getIns().getLayerAwards(hero, layer);
	} 
	/**
	 * （子服）请求进入跨服 4223
	 */
	public void goToCross(Hero hero, Object[] datas){
		CrossWenDingTianXiaManager.getIns().goToCross(hero);
	} 
	/**
	 * 请求刷一遍场景玩家怪物数据 4225
	 */
	public void getSceneData(Hero hero, Object[] datas){
		CrossWenDingTianXiaManager.getIns().getSceneData(hero);
	} 
	/**
	 * （跨服）挑战怪物 4227
	 * @param mID| 怪物ID| long
	 */
	public void battleMonster(Hero hero, Object[] datas){
		long mID = (long)datas[0];
		CrossWenDingTianXiaManager.getIns().battleMonster(hero, mID);
	} 
	/**
	 * 复活 4231
	 */
	public void fuHuo(Hero hero, Object[] datas){
		CrossWenDingTianXiaManager.getIns().fuHuo(hero);
	} 
	/**
	 * （跨服）挑战怪物结束 4233
	 * @param result| 战斗结果| byte
	 */
	public void battleMonsterEnd(Hero hero, Object[] datas){
		int result = (byte)datas[0];
		CrossWenDingTianXiaManager.getIns().battleMonsterEnd(hero, result);
	} 
	/**
	 * （跨服）打开积分奖励  4235
	 */
	public void openScoreAwards(Hero hero, Object[] datas){
		CrossWenDingTianXiaManager.getIns().openScoreAwards(hero);
	} 
	/**
	 * 领取积分奖励 4237
	 * @param id| id| byte
	 */
	public void getScoreAwards(Hero hero, Object[] datas){
		int id = (byte)datas[0];
		CrossWenDingTianXiaManager.getIns().getScoreAwards(hero, id);
	} 
}