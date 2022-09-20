package com.teamtop.system.consume.events;

import com.teamtop.system.activity.ativitys.baoZangPinTu.BaoZangPinTuConst;
import com.teamtop.system.activity.ativitys.baoZangPinTu.BaoZangPinTuFunction;
import com.teamtop.system.consume.AbsConsumeEvent;
import com.teamtop.system.hero.Hero;

/**
 * 宝藏拼图
 * 
 * @author jjjjyyy
 *
 */
public class BaoZangPinTuActConsumEvent extends AbsConsumeEvent {

	@Override
	public void consumeHandle(Hero hero, int consumeNum, int reason) {
		BaoZangPinTuFunction.getIns().checkTask(hero, BaoZangPinTuConst.TASK_TYPE_2, consumeNum);
	}
}
