package com.teamtop.system.crossAttackCity;
import com.teamtop.system.hero.Hero;

/**
 * AttackCityCG.java
 * 攻城拔寨
 */
public class AttackCityCG{

	private static AttackCityCG ins = null;

	public static AttackCityCG getIns(){
		if(ins == null){
			ins = new AttackCityCG();
		}
		return ins;
	}

	/**
	 * 打开界面 12051
	 */
	public void openUI(Hero hero, Object[] datas){
		AttackCityManager.getIns().openUI(hero);
	} 
	/**
	 * 驻守 12053
	 * @param cityId| 城池id| int
	 */
	public void dispatch(Hero hero, Object[] datas){
		int cityId = (int)datas[0];
		AttackCityManager.getIns().dispatch(hero, cityId);
	} 
	/**
	 * 领取奖励 12055
	 */
	public void getAward(Hero hero, Object[] datas){
		AttackCityManager.getIns().getAward(hero);
	} 
	/**
	 * 挑战城池(玩家) 12057
	 * @param cityId| 城池id| int
	 */
	public void plunder(Hero hero, Object[] datas){
		int cityId = (int)datas[0];
		AttackCityManager.getIns().plunder(hero, cityId);
	} 
	/**
	 * 挑战玩家结果 12059
	 * @param state| 战斗结果 0失败 1成功 2退出| byte
	 */
	public void battleResult(Hero hero, Object[] datas){
		int state = (byte)datas[0];
		AttackCityManager.getIns().battleResult(hero, state);
	} 
	/**
	 * 挑战NPC 12061
	 * @param cityId| 城池id| int
	 */
	public void attackNPC(Hero hero, Object[] datas){
		int cityId = (int)datas[0];
		AttackCityManager.getIns().attackNPC(hero, cityId);
	} 
	/**
	 * 挑战NPC胜利申请奖励 12063
	 */
	public void battleNPCResult(Hero hero, Object[] datas){
		AttackCityManager.getIns().battleNPCResult(hero);
	} 
	/**
	 * 打开商店 12065
	 */
	public void openShopUI(Hero hero, Object[] datas){
		AttackCityManager.getIns().openShopUI(hero);
	} 
	/**
	 * 购买商品 12067
	 * @param id| 商品id| int
	 */
	public void buyItem(Hero hero, Object[] datas){
		int id = (int)datas[0];
		AttackCityManager.getIns().buyItem(hero, id);
	} 
	/**
	 * 打开战报 12069
	 */
	public void openReportUI(Hero hero, Object[] datas){
		AttackCityManager.getIns().openReportUI(hero);
	} 
	/**
	 * 重置挑战关卡 12071
	 */
	public void again(Hero hero, Object[] datas){
		AttackCityManager.getIns().again(hero);
	} 
	/**
	 * 购买次数 12073
	 * @param num| 购买次数| int
	 */
	public void buyTimes(Hero hero, Object[] datas){
		int num = (int)datas[0];
		AttackCityManager.getIns().buyTimes(hero, num);
	} 
	/**
	 * 移动到下一关 12075
	 * @param cid| 移动到的城池id| int
	 */
	public void move(Hero hero, Object[] datas){
		int cid = (int)datas[0];
		AttackCityManager.getIns().move(hero, cid);
	} 
	/**
	 * 每日选择的难度 12077
	 * @param nd| 选择的难度| int
	 * @param cityId| 初始城池id| int
	 */
	public void choose(Hero hero, Object[] datas){
		int nd = (int)datas[0];
		int cityId = (int)datas[1];
		AttackCityManager.getIns().choose(hero, nd, cityId);
	} 
	/**
	 * 查看宝箱奖励 12081
	 */
	public void checkBox(Hero hero, Object[] datas){
		AttackCityManager.getIns().checkBox(hero);
	} 
}