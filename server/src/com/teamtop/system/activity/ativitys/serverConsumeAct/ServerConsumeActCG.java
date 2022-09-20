package com.teamtop.system.activity.ativitys.serverConsumeAct;
import com.teamtop.system.hero.Hero;

/**
 * ServerConsumeActCG.java
 * 新活动-全服消费
 */
public class ServerConsumeActCG{

	private static ServerConsumeActCG ins = null;

	public static ServerConsumeActCG getIns(){
		if(ins == null){
			ins = new ServerConsumeActCG();
		}
		return ins;
	}

	/**
	 * 领取奖励 10421
	 * @param rewardId| 要领取的奖励id| int
	 */
	public void getReward(Hero hero, Object[] datas){
		int rewardId = (int)datas[0];
		ServerConsumeActManager.getIns().getReward(hero, rewardId);
	} 
}