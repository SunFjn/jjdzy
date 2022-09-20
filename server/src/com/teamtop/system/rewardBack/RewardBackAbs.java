package com.teamtop.system.rewardBack;

import com.teamtop.system.hero.Hero;

public abstract class RewardBackAbs {
	/**
	 * 奖励找回处理类
	 * 
	 * @param hero
	 * @param sysId
	 * @param param
	 */
	public abstract void handle(Hero hero, Integer sysId, Object... param);

}
