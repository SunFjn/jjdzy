package com.teamtop.system.runningMan;
import com.teamtop.system.hero.Hero;

/**
 * RunningManCG.java
 * 过关斩将
 */
public class RunningManCG{

	private static RunningManCG ins = null;

	public static RunningManCG getIns(){
		if(ins == null){
			ins = new RunningManCG();
		}
		return ins;
	}

	/**
	 * GC 打开过关斩将ui 1551
	 */
	public void openUi(Hero hero, Object[] datas){
		RunningManManager.getIns().openUi(hero);
	} 
	/**
	 * CG 选择关卡难度挑战 1553
	 * @param type| 难度| byte
	 */
	public void battleType(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		RunningManManager.getIns().battleType(hero, type);
	} 
	/**
	 * CG 获取某类关卡奖励 1555
	 * @param type| 关卡难度类型| byte
	 */
	public void getreward(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		RunningManManager.getIns().getreward(hero, type);
	} 
	/**
	 * CG 扫荡过关斩将 1557
	 * @param type| 副本难度| byte
	 */
	public void oneKey(Hero hero, Object[] datas){
		int type = (byte)datas[0];
		RunningManManager.getIns().oneKey(hero, type);
	} 
}