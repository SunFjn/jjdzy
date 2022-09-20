package com.teamtop.system.activitysView;
import com.teamtop.system.hero.Hero;

/**
 * ActivitysViewCG.java
 * 活动预览
 */
public class ActivitysViewCG{

	private static ActivitysViewCG ins = null;

	public static ActivitysViewCG getIns(){
		if(ins == null){
			ins = new ActivitysViewCG();
		}
		return ins;
	}

	/**
	 * 领取每日奖励 4051
	 */
	public void getAward(Hero hero, Object[] datas){
		ActivitysViewManager.getIns().getAward(hero);
	} 
	/**
	 * CG 获取app每日奖励 4055
	 */
	public void getappreward(Hero hero, Object[] datas){
		ActivitysViewManager.getIns().getappreward(hero);
	} 
}