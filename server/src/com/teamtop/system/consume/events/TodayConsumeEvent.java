package com.teamtop.system.consume.events;

import com.teamtop.system.consume.AbsConsumeEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.sevenHappy.SevenHappyConst;
import com.teamtop.system.sevenHappy.SevenHappyFunction;
/**
 * 每日消费事件
 * @author lobbyer
 * @date 2017年6月26日
 */
public class TodayConsumeEvent extends AbsConsumeEvent {

	@Override
	public void consumeHandle(Hero hero, int consumeNum, int reason) {
		hero.setOneDayConsmeNum(hero.getOneDayConsmeNum()+consumeNum);
		hero.setOneDayConsume(hero.getOneDayConsume()+consumeNum);
		//开服狂欢
		SevenHappyFunction.getIns().refreshSevenWuShenRank(hero, SevenHappyConst.TYPE_10);
	}

}
