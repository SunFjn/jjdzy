package com.teamtop.system.activity.ativitys.happySoloRun;
import com.teamtop.system.hero.Hero;

/**
 * HappySoloRunCG.java
 * 全民狂欢-单刀赴会
 */
public class HappySoloRunCG{

	private static HappySoloRunCG ins = null;

	public static HappySoloRunCG getIns(){
		if(ins == null){
			ins = new HappySoloRunCG();
		}
		return ins;
	}

	/**
	 * CG 打开ui 2601
	 */
	public void openUI(Hero hero, Object[] datas){
		HappySoloRunManager.getIns().openUI(hero);
	} 
	/**
	 * CG 获取奖励 2603
	 * @param index| 奖励序号| byte
	 */
	public void getreward(Hero hero, Object[] datas){
		int index = (byte)datas[0];
		HappySoloRunManager.getIns().getreward(hero, index);
	} 
}