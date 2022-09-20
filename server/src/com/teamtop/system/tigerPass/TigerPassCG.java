package com.teamtop.system.tigerPass;
import com.teamtop.system.hero.Hero;

/**
 * TigerPassCG.java
 * 虎牢关
 */
public class TigerPassCG{

	private static TigerPassCG ins = null;

	public static TigerPassCG getIns(){
		if(ins == null){
			ins = new TigerPassCG();
		}
		return ins;
	}

	/**
	 * CG 打开ui 8901
	 */
	public void openUi(Hero hero, Object[] datas){
		TigerPassManager.getIns().openUi(hero);
	} 
	/**
	 * CG 进入副本 8903
	 */
	public void battleboss(Hero hero, Object[] datas){
		TigerPassManager.getIns().battleboss(hero);
	} 
	/**
	 * CG 通知后端本人和佣兵都已经死亡 申请参与奖励 8907
	 */
	public void die(Hero hero, Object[] datas){
		TigerPassManager.getIns().die(hero);
	} 
	/**
	 * CG 打开雇佣界面 8909
	 */
	public void openemploy(Hero hero, Object[] datas){
		TigerPassManager.getIns().openemploy(hero);
	} 
	/**
	 * CG 选择雇佣玩家ID 8911
	 * @param hid| 雇佣兵id| long
	 */
	public void chooseemploy(Hero hero, Object[] datas){
		long hid = (long)datas[0];
		TigerPassManager.getIns().chooseemploy(hero, hid);
	} 
	/**
	 * CG 报名加入雇佣行列 8913
	 */
	public void joinemlpoy(Hero hero, Object[] datas){
		TigerPassManager.getIns().joinemlpoy(hero);
	} 
	/**
	 * CG 刷新雇佣列表 8915
	 */
	public void refreshEmploy(Hero hero, Object[] datas){
		TigerPassManager.getIns().refreshEmploy(hero);
	} 
	/**
	 * CG 获取通关奖励 8917
	 * @param lay| 层数| byte
	 */
	public void getReward(Hero hero, Object[] datas){
		int lay = (byte)datas[0];
		TigerPassManager.getIns().getReward(hero, lay);
	} 
}