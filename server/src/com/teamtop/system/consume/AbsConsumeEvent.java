package com.teamtop.system.consume;

import com.teamtop.system.hero.Hero;

public  abstract class  AbsConsumeEvent {
	/**
	 * 每次消费额度  （除了市场和邮件、交易花费的元宝其他途径都算）
	 * @param hero
	 * @param consumeNum 消费金额（元宝以及绑定元宝）
	 */
	public abstract void consumeHandle(Hero hero,int consumeNum,int reason);
	
}
