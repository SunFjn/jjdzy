package com.teamtop.system.activity.ativitys.happyQMboss;
import com.teamtop.system.hero.Hero;

/**
 * HappyQMbossCG.java
 * 全民狂欢—全民boss
 */
public class HappyQMbossCG{

	private static HappyQMbossCG ins = null;

	public static HappyQMbossCG getIns(){
		if(ins == null){
			ins = new HappyQMbossCG();
		}
		return ins;
	}

	/**
	 * GC 打开ui信息 2571
	 */
	public void openUI(Hero hero, Object[] datas){
		HappyQMbossManager.getIns().openUI(hero);
	} 
	/**
	 * 获取奖励 2573
	 * @param index| 奖励序号| byte
	 */
	public void getreward(Hero hero, Object[] datas){
		int index = (byte)datas[0];
		HappyQMbossManager.getIns().getreward(hero, index);
	} 
}