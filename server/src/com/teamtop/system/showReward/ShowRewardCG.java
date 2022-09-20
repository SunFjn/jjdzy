package com.teamtop.system.showReward;
import com.teamtop.system.hero.Hero;

/**
 * ShowRewardCG.java
 * 分享
 */
public class ShowRewardCG{

	private static ShowRewardCG ins = null;

	public static ShowRewardCG getIns(){
		if(ins == null){
			ins = new ShowRewardCG();
		}
		return ins;
	}

	/**
	 * CG 获取奖励 2701
	 * @param index| 分享序号| byte
	 */
	public void getreward(Hero hero, Object[] datas){
		int index = (byte)datas[0];
		ShowRewardManager.getIns().getreward(hero, index);
	} 
}