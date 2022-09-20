package com.teamtop.system.battleGoods;
import com.teamtop.system.hero.Hero;

/**
 * BattleGoodsCG.java
 * 粮草抢夺
 */
public class BattleGoodsCG{

	private static BattleGoodsCG ins = null;

	public static BattleGoodsCG getIns(){
		if(ins == null){
			ins = new BattleGoodsCG();
		}
		return ins;
	}

	/**
	 * CG参加活动请求进入场景（跨服） 10101
	 */
	public void inscene(Hero hero, Object[] datas){
		BattleGoodsManager.getIns().inscene(hero);
	} 
	/**
	 * CG请求挑战怪物 10105
	 * @param mid| 请求挑战怪物| long
	 */
	public void battleMonster(Hero hero, Object[] datas){
		long mid = (long)datas[0];
		BattleGoodsManager.getIns().battleMonster(hero, mid);
	} 
	/**
	 * CG 通知后端pve战斗结果获取奖励与否 10107
	 * @param monsterid| 怪物id| long
	 * @param rest| 0输了 1赢了 | byte
	 */
	public void getBatMonReward(Hero hero, Object[] datas){
		long monsterid = (long)datas[0];
		int rest = (byte)datas[1];
		BattleGoodsManager.getIns().getBatMonReward(hero, monsterid, rest);
	} 
	/**
	 * CG采集宝箱 10109
	 * @param boxid| 宝箱唯一id| long
	 */
	public void getBox(Hero hero, Object[] datas){
		long boxid = (long)datas[0];
		BattleGoodsManager.getIns().getBox(hero, boxid);
	} 
	/**
	 * CG 终止采集 10111
	 * @param boxid| 宝箱唯一id| long
	 */
	public void stopgetbox(Hero hero, Object[] datas){
		long boxid = (long)datas[0];
		BattleGoodsManager.getIns().stopgetbox(hero, boxid);
	} 
	/**
	 * CG 采集成功获取奖励 10113
	 * @param boxid| 宝箱唯一id| long
	 */
	public void getBoxReward(Hero hero, Object[] datas){
		long boxid = (long)datas[0];
		BattleGoodsManager.getIns().getBoxReward(hero, boxid);
	} 
	/**
	 * CG 怼某个玩家 10115
	 * @param battlehid| 玩家id| long
	 */
	public void battlePvp(Hero hero, Object[] datas){
		long battlehid = (long)datas[0];
		BattleGoodsManager.getIns().battlePvp(hero, battlehid);
	} 
	/**
	 * CG 奖励目标ui 10123
	 */
	public void openRewardUi(Hero hero, Object[] datas){
		BattleGoodsManager.getIns().openRewardUi(hero);
	} 
	/**
	 * CG 获取奖励 10125
	 * @param index| 奖励序号| byte
	 */
	public void getreward(Hero hero, Object[] datas){
		int index = (byte)datas[0];
		BattleGoodsManager.getIns().getreward(hero, index);
	} 
	/**
	 * CG 退出场景 10127
	 */
	public void outscene(Hero hero, Object[] datas){
		BattleGoodsManager.getIns().outscene(hero);
	} 
	/**
	 * CG 获取排行榜 10129
	 * @param type| 0个人排行 1区服排名| byte
	 */
	public void openRankUi(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		BattleGoodsManager.getIns().openRankUi(hero, type);
	} 
	/**
	 * CG 买活 10133
	 */
	public void buyLive(Hero hero, Object[] datas){
		BattleGoodsManager.getIns().buyLive(hero);
	} 
}