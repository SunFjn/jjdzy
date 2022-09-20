package com.teamtop.system.exclusiveActivity;
import com.teamtop.system.hero.Hero;

/**
 * ExclusiveActivityCG.java
 * 专属活动
 */
public class ExclusiveActivityCG{

	private static ExclusiveActivityCG ins = null;

	public static ExclusiveActivityCG getIns(){
		if(ins == null){
			ins = new ExclusiveActivityCG();
		}
		return ins;
	}

	/**
	 * 请求某活动数据 7901
	 * @param id| 唯一id| int
	 */
	public void openExAct(Hero hero, Object[] datas){
		int id = (int)datas[0];
		ExclusiveActivityManager.getIns().openExAct(hero, id);
	} 
}