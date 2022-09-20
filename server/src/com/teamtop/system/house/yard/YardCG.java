package com.teamtop.system.house.yard;
import com.teamtop.system.hero.Hero;

/**
 * YardCG.java
 * 府邸
 */
public class YardCG{

	private static YardCG ins = null;

	public static YardCG getIns(){
		if(ins == null){
			ins = new YardCG();
		}
		return ins;
	}

	/**
	 * 进入院子 11101
	 * @param heroId| 角色id| long
	 */
	public void gotoYard(Hero hero, Object[] datas){
		long heroId = (long)datas[0];
		YardManager.getIns().gotoYard(hero, heroId);
	} 
	/**
	 * 退出府邸 11103
	 */
	public void outHouse(Hero hero, Object[] datas){
		YardManager.getIns().outHouse(hero);
	} 
	/**
	 * 升级府邸等级 11105
	 */
	public void upHouseLv(Hero hero, Object[] datas){
		YardManager.getIns().upHouseLv(hero);
	} 
	/**
	 * 升级府邸档次 11107
	 */
	public void upHouseDc(Hero hero, Object[] datas){
		YardManager.getIns().upHouseDc(hero);
	} 
	/**
	 * 升级装饰等级 11109
	 * @param type| 装饰类型| int
	 */
	public void upDecorateLv(Hero hero, Object[] datas){
		int type = (int)datas[0];
		YardManager.getIns().upDecorateLv(hero, type);
	} 
	/**
	 * 摇钱行为 11111
	 */
	public void shakeTree(Hero hero, Object[] datas){
		YardManager.getIns().shakeTree(hero);
	} 
	/**
	 * 收获府邸币 11113
	 * @param heroId| 角色id| long
	 */
	public void harvestMoney(Hero hero, Object[] datas){
		long heroId = (long)datas[0];
		YardManager.getIns().harvestMoney(hero, heroId);
	} 
	/**
	 * 天工炉抽奖 11115
	 * @param heroId| 角色id| long
	 */
	public void drawAward(Hero hero, Object[] datas){
		long heroId = (long)datas[0];
		YardManager.getIns().drawAward(hero, heroId);
	} 
	/**
	 * 天工炉献祭 11117
	 * @param itemInfo| 献祭物品信息| Object[]
	 */
	public void sacrifice(Hero hero, Object[] datas){
		Object[] itemInfo = (Object[])datas[0];
		YardManager.getIns().sacrifice(hero, itemInfo);
	} 
	/**
	 * 前往别人府邸 11119
	 * @param heroId| 角色id| long
	 */
	public void gotoRoom(Hero hero, Object[] datas){
		long heroId = (long)datas[0];
		YardManager.getIns().gotoRoom(hero, heroId);
	} 
	/**
	 * 打开排名榜 11121
	 */
	public void openRankUI(Hero hero, Object[] datas){
		YardManager.getIns().openRankUI(hero);
	} 
	/**
	 * 获取事件奖励 11123
	 * @param heroId| 角色id| long
	 * @param eventId| 事件id| int
	 */
	public void getEventAward(Hero hero, Object[] datas){
		long heroId = (long)datas[0];
		int eventId = (int)datas[1];
		YardManager.getIns().getEventAward(hero, heroId, eventId);
	} 
	/**
	 * 请求挑战强盗 11127
	 * @param heroId| 府邸主人id| long
	 * @param mid| 请求挑战怪物| long
	 */
	public void battleMonster(Hero hero, Object[] datas){
		long heroId = (long)datas[0];
		long mid = (long)datas[1];
		YardManager.getIns().battleMonster(hero, heroId, mid);
	} 
	/**
	 * 通知后端挑战强盗结果 11129
	 * @param heroId| 府邸主人id| long
	 * @param monsterid| 怪物id| long
	 * @param rest| 0输了 1赢了 | byte
	 */
	public void getBatMonReward(Hero hero, Object[] datas){
		long heroId = (long)datas[0];
		long monsterid = (long)datas[1];
		int rest = (byte)datas[2];
		YardManager.getIns().getBatMonReward(hero, heroId, monsterid, rest);
	} 
	/**
	 * 获取金库信息 11131
	 */
	public void getGoldInfo(Hero hero, Object[] datas){
		YardManager.getIns().getGoldInfo(hero);
	} 
	/**
	 * 打开记录 11133
	 * @param type| 类型：1金库记录 2天宫炉记录| byte
	 */
	public void openLog(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		YardManager.getIns().openLog(hero, type);
	} 
}