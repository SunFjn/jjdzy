package com.teamtop.system.rechargeDouble;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;

/**
 * 充值双倍
 * @author Administrator
 *
 */
public class RechargeDoubleEvent extends AbsSystemEvent{
	private static RechargeDoubleEvent ins = null;

	public static RechargeDoubleEvent getIns() {
		if (ins == null) {
			ins = new RechargeDoubleEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		// Map<Integer, Integer> rechargeDouble = hero.getRechargeDouble();
		// if(rechargeDouble==null){
		// hero.setRechargeDouble(new HashMap<Integer, Integer>());
		// }
	}

	@Override
	public void login(Hero hero) {
		// Map<Integer, Integer> rechargeDouble = hero.getRechargeDouble();
		// RechargeDoubleSender.sendCmd_1440(hero.getId(),1);
	}

}
