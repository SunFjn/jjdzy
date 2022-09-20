package com.teamtop.system.consume.events;

import com.teamtop.system.consume.AbsConsumeEvent;
import com.teamtop.system.hero.Hero;
/**
 * 每日消费重置
 * @author lobbyer
 * @date 2017年6月26日
 */
public class OneDayConsmeEvent extends AbsConsumeEvent{

	@Override
	public void consumeHandle(Hero hero, int consumeNum, int reason) {
		//hero.setOneDayConsmeNum(hero.getOneDayConsmeNum()+consumeNum);
	}
	
	

}
