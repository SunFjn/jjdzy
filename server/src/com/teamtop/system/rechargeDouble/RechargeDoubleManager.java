package com.teamtop.system.rechargeDouble;

import com.teamtop.system.hero.Hero;

/**
 * 充值双倍
 * @author Administrator
 *
 */
public class RechargeDoubleManager {
	private static RechargeDoubleManager ins = null;

	public static RechargeDoubleManager getIns() {
		if (ins == null) {
			ins = new RechargeDoubleManager();
		}
		return ins;
	}
	/**
	 * 打开UI 1441
	 */
	public void openUI(Hero hero) {
		RechargeDoubleSender.sendCmd_1442(hero.getId(), null);
	}
	
}
