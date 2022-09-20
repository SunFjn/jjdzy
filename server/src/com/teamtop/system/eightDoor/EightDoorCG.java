package com.teamtop.system.eightDoor;
import com.teamtop.system.hero.Hero;

/**
 * EightDoorCG.java
 * 八门金锁
 */
public class EightDoorCG{

	private static EightDoorCG ins = null;

	public static EightDoorCG getIns(){
		if(ins == null){
			ins = new EightDoorCG();
		}
		return ins;
	}

	/**
	 * CG 打开八门金锁ui 4521
	 */
	public void openUi(Hero hero, Object[] datas){
		EightDoorManager.getIns().openUi(hero);
	} 
	/**
	 * CG 领取任务奖励 4523
	 * @param taskid| 任务id| int
	 */
	public void gettask(Hero hero, Object[] datas){
		int taskid = (int)datas[0];
		EightDoorManager.getIns().gettask(hero, taskid);
	} 
	/**
	 * CG 领取大奖 4525
	 * @param bigid| 大奖类型id| int
	 */
	public void getBig(Hero hero, Object[] datas){
		int bigid = (int)datas[0];
		EightDoorManager.getIns().getBig(hero, bigid);
	} 
}