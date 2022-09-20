package com.teamtop.system.crossFireBeacon;
import com.teamtop.system.hero.Hero;

/**
 * CrossFireBeaconCG.java
 * 烽火狼烟
 */
public class CrossFireBeaconCG{

	private static CrossFireBeaconCG ins = null;

	public static CrossFireBeaconCG getIns(){
		if(ins == null){
			ins = new CrossFireBeaconCG();
		}
		return ins;
	}

	/**
	 * 打开UI（本地） 3551
	 */
	public void openUI(Hero hero, Object[] datas){
		CrossFireBeaconManager.getIns().openUI(hero);
	} 
	/**
	 * 获取个人排行榜 3553
	 */
	public void getPersonalRanking(Hero hero, Object[] datas){
		CrossFireBeaconManager.getIns().getPersonalRanking(hero);
	} 
	/**
	 * 获取区排行 3555
	 */
	public void getZoneRanking(Hero hero, Object[] datas){
		CrossFireBeaconManager.getIns().getZoneRanking(hero);
	} 
	/**
	 * 请求进入活动（本地） 3557
	 */
	public void enterMatch(Hero hero, Object[] datas){
		CrossFireBeaconManager.getIns().enterMatch(hero);
	} 
	/**
	 * 查看城信息 3559
	 * @param cityId| 都城id| int
	 */
	public void showCityInfo(Hero hero, Object[] datas){
		int cityId = (int)datas[0];
		CrossFireBeaconManager.getIns().showCityInfo(hero, cityId);
	} 
	/**
	 * 移动 3561
	 * @param posX| 目的地X坐标| int
	 * @param posY| 目的地Y坐标| int
	 */
	public void move(Hero hero, Object[] datas){
		int posX = (int)datas[0];
		int posY = (int)datas[1];
		CrossFireBeaconManager.getIns().move(hero, posX, posY);
	} 
	/**
	 * 请求占领都城 3565
	 * @param cityId| 都城id| int
	 */
	public void occupyCity(Hero hero, Object[] datas){
		int cityId = (int)datas[0];
		CrossFireBeaconManager.getIns().occupyCity(hero, cityId);
	} 
	/**
	 * 战斗结算 3567
	 * @param battleUid| 战斗唯一Id| int
	 */
	public void fightEnd(Hero hero, Object[] datas){
		int battleUid = (int)datas[0];
		// CrossFireBeaconManager.getIns().fightEnd(hero, battleUid);
	} 
	/**
	 * 领取积分奖励 3569
	 * @param id| 积分奖励id| byte
	 */
	public void getScoreAward(Hero hero, Object[] datas){
		int id = (byte)datas[0];
		CrossFireBeaconManager.getIns().getScoreAward(hero, id);
	} 
	/**
	 * 获取积分奖励状态列表 3571
	 */
	public void getScoreAwardList(Hero hero, Object[] datas){
		CrossFireBeaconManager.getIns().getScoreAwardList(hero);
	} 
	/**
	 * 征收 3573
	 * @param cityId| 都城id| int
	 */
	public void levy(Hero hero, Object[] datas){
		int cityId = (int)datas[0];
		CrossFireBeaconManager.getIns().levy(hero, cityId);
	} 
	/**
	 * 退出 3575
	 */
	public void leave(Hero hero, Object[] datas){
		CrossFireBeaconManager.getIns().leave(hero, false);
	} 
	/**
	 * 获取征收成员信息 3577
	 * @param cityId| 都城id| int
	 */
	public void getMemberList(Hero hero, Object[] datas){
		int cityId = (int)datas[0];
		CrossFireBeaconManager.getIns().getMemberList(hero, cityId);
	} 
	/**
	 * 结算一次征收积分 3579
	 */
	public void calculateScore(Hero hero, Object[] datas){
		CrossFireBeaconManager.getIns().calculateScore(hero);
	} 
	/**
	 * 请求元宝复活 3591
	 */
	public void revive(Hero hero, Object[] datas){
		CrossFireBeaconManager.getIns().revive(hero);
	} 
}