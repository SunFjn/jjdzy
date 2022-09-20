package com.teamtop.system.guardArea;
import com.teamtop.system.hero.Hero;

/**
 * GuardAreaCG.java
 * 镇守四方
 */
public class GuardAreaCG{

	private static GuardAreaCG ins = null;

	public static GuardAreaCG getIns(){
		if(ins == null){
			ins = new GuardAreaCG();
		}
		return ins;
	}

	/**
	 * 打开界面 10901
	 */
	public void openUI(Hero hero, Object[] datas){
		GuardAreaManager.getIns().openUI(hero);
	} 
	/**
	 * 派遣 10903
	 * @param cityId| 城池id| int
	 * @param wuJiangId| 武将id| int
	 */
	public void dispatch(Hero hero, Object[] datas){
		int cityId = (int)datas[0];
		int wuJiangId = (int)datas[1];
		GuardAreaManager.getIns().dispatch(hero, cityId, wuJiangId);
	} 
	/**
	 * 领取奖励 10905
	 * @param cityId| 城池id| int
	 */
	public void getAward(Hero hero, Object[] datas){
		int cityId = (int)datas[0];
		GuardAreaManager.getIns().getAward(hero, cityId);
	} 
	/**
	 * 提前召回 10907
	 * @param cityId| 城池id| int
	 */
	public void recall(Hero hero, Object[] datas){
		int cityId = (int)datas[0];
		GuardAreaManager.getIns().recall(hero, cityId);
	} 
	/**
	 * 打开掠夺界面 10909
	 */
	public void openPlunderUI(Hero hero, Object[] datas){
		GuardAreaManager.getIns().openPlunderUI(hero);
	} 
	/**
	 * 掠夺 10911
	 * @param cityId| 城池id| int
	 */
	public void plunder(Hero hero, Object[] datas){
		int cityId = (int)datas[0];
		GuardAreaManager.getIns().plunder(hero, cityId);
	} 
	/**
	 * 刷新掠夺界面 10913
	 * @param state| 是否免费:0-免费,1-元宝刷新| int
	 */
	public void refresh(Hero hero, Object[] datas){
		int state = (int)datas[0];
		GuardAreaManager.getIns().refresh(hero, state);
	} 
	/**
	 * 打开战报 10915
	 */
	public void openReportUI(Hero hero, Object[] datas){
		GuardAreaManager.getIns().openReportUI(hero);
	} 
	/**
	 * 打开商城界面 10917
	 */
	public void openShopUI(Hero hero, Object[] datas){
		GuardAreaManager.getIns().openShopUI(hero);
	} 
	/**
	 * 购买商品 10919
	 * @param itemId| 商品id| int
	 */
	public void buyItem(Hero hero, Object[] datas){
		int itemId = (int)datas[0];
		GuardAreaManager.getIns().buyItem(hero, itemId);
	} 
	/**
	 * 前端发送战斗结果 10921
	 * @param result| 战斗结果0失败1成功2退出| byte
	 */
	public void battleResult(Hero hero, Object[] datas){
		int result = (byte)datas[0];
		GuardAreaManager.getIns().battleResult(hero, result);
	} 
}