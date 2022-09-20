package com.teamtop.system.activity.ativitys.happyMonsterGod;
import com.teamtop.system.hero.Hero;

/**
 * HappyMonsterGodCG.java
 * 全民狂欢-魔神吕布
 */
public class HappyMonsterGodCG{

	private static HappyMonsterGodCG ins = null;

	public static HappyMonsterGodCG getIns(){
		if(ins == null){
			ins = new HappyMonsterGodCG();
		}
		return ins;
	}

	/**
	 * CG 打开ui 2591
	 */
	public void openUI(Hero hero, Object[] datas){
		HappyMonsterGodManager.getIns().openUI(hero);
	} 
	/**
	 * CG 获取奖励 2593
	 * @param index| 奖励序号| byte
	 */
	public void getreward(Hero hero, Object[] datas){
		int index = (byte)datas[0];
		HappyMonsterGodManager.getIns().getreward(hero, index);
	} 
}