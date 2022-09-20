package com.teamtop.system.activity;
import com.teamtop.system.hero.Hero;

/**
 * ActivityCG.java
 * 活动
 */
public class ActivityCG{

	private static ActivityCG ins = null;

	public static ActivityCG getIns(){
		if(ins == null){
			ins = new ActivityCG();
		}
		return ins;
	}

	/**
	 * 打开活动界面 2251
	 * @param actType| 活动类型| int
	 */
	public void openActivityUI(Hero hero, Object[] datas){
		int actType = (int)datas[0];
		ActivityManager.getIns().openActivityUI(hero, actType);
	} 
	/**
	 * 请求某活动数据 2253
	 * @param actId| 活动id| int
	 */
	public void openAct(Hero hero, Object[] datas){
		int actId = (int)datas[0];
		ActivityManager.getIns().openAct(hero, actId);
	} 
	/**
	 * 查看活动时间（隐藏协议） 2287
	 * @param id| 暗号| int
	 */
	public void openActivityTime(Hero hero, Object[] datas){
		int id = (int)datas[0];
		ActivityManager.getIns().openActivityTime(hero, id);
	} 
}