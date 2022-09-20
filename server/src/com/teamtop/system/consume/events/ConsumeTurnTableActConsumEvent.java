package com.teamtop.system.consume.events;

import com.teamtop.system.activity.ativitys.consumeTurnCardAct.ConsumeTurnCardActFunction;
import com.teamtop.system.activity.ativitys.consumeTurnTableAct.ConsumeTurnTableActFunction;
import com.teamtop.system.activity.ativitys.dropRedPacket.DropRedPacketFunction;
import com.teamtop.system.activity.ativitys.serverConsumeAct.ServerConsumeActFunction;
import com.teamtop.system.consume.AbsConsumeEvent;
import com.teamtop.system.hero.Hero;

/**
 * 消费转盘(活动)，消费翻牌(活动)消费事件
 *
 * @author 13640
 *
 */
public class ConsumeTurnTableActConsumEvent extends AbsConsumeEvent {

	@Override
	public void consumeHandle(Hero hero, int consumeNum, int reason) {
		ConsumeTurnTableActFunction.getIns().consumeHandle(hero, consumeNum, reason);
		ConsumeTurnCardActFunction.getIns().consumeHandle(hero, consumeNum, reason);
		ServerConsumeActFunction.getIns().heroConsumeHandler(hero, consumeNum, reason);
		DropRedPacketFunction.getIns().taskHandler(hero, 2, consumeNum);
	}
}
