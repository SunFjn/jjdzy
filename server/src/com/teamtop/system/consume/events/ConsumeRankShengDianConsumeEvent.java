package com.teamtop.system.consume.events;

import com.teamtop.system.consume.AbsConsumeEvent;
import com.teamtop.system.hero.Hero;
/**
 * 盛典消费排行事件
 * @author lobbyer
 * @date 2017年6月26日
 */
public class ConsumeRankShengDianConsumeEvent extends AbsConsumeEvent {

	@Override
	public void consumeHandle(Hero hero, int consumeNum, int reason) {
		//判断活动是否开启
	}

}
