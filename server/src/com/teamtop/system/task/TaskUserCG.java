package com.teamtop.system.task;
import com.teamtop.system.hero.Hero;

/**
 * TaskUserCG.java
 * 任务
 */
public class TaskUserCG{

	private static TaskUserCG ins = null;

	public static TaskUserCG getIns(){
		if(ins == null){
			ins = new TaskUserCG();
		}
		return ins;
	}

	/**
	 * CG 获取任务奖励 2551
	 * @param index| 任务编号| int
	 */
	public void getreward(Hero hero, Object[] datas){
		int index = (int)datas[0];
		TaskUserManager.getIns().getreward(hero, index);
	} 
	/**
	 * GC 完成特殊任务  2553
	 * @param canshu| 特殊任务| int
	 */
	public void specialtask(Hero hero, Object[] datas){
		int canshu = (int)datas[0];
		TaskUserManager.getIns().specialtask(hero, canshu);
	} 
}