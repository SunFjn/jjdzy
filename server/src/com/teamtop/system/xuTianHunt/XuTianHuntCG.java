package com.teamtop.system.xuTianHunt;
import com.teamtop.system.hero.Hero;

/**
 * XuTianHuntCG.java
 * 许田围猎
 */
public class XuTianHuntCG{

	private static XuTianHuntCG ins = null;

	public static XuTianHuntCG getIns(){
		if(ins == null){
			ins = new XuTianHuntCG();
		}
		return ins;
	}

	/**
	 * 打开界面 11821
	 */
	public void openUI(Hero hero, Object[] datas){
		XuTianHuntManager.getIns().openUI(hero);
	} 
	/**
	 * 购买狩猎次数 11823
	 * @param buyNum| 要买的次数| byte
	 */
	public void buyHunt(Hero hero, Object[] datas){
		int buyNum = (byte)datas[0];
		XuTianHuntManager.getIns().buyHunt(hero, buyNum);
	} 
	/**
	 * 开始狩猎 11825
	 */
	public void startHunt(Hero hero, Object[] datas){
		XuTianHuntManager.getIns().startHunt(hero);
	} 
	/**
	 * 请求击杀猎物 11827
	 * @param type| 猎物类型（1：奖励，2：buff）| byte
	 * @param uid| 猎物唯一id| int
	 */
	public void hunt(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		int uid = (int)datas[1];
		XuTianHuntManager.getIns().hunt(hero, type, uid);
	} 
	/**
	 * 围猎结束 11829
	 */
	public void endHunt(Hero hero, Object[] datas){
		XuTianHuntManager.getIns().endHunt(hero);
	} 
	/**
	 * 打开围猎仓库 11831
	 */
	public void openWareHouse(Hero hero, Object[] datas){
		XuTianHuntManager.getIns().openWareHouse(hero);
	} 
}