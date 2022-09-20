package com.teamtop.system.recharge.events;

import com.teamtop.houtaiHttp.events.recharge.RechargeConst;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.recharge.AbsRechargeEvent;

import excel.config.Config_shop_011;
/**
 * 充值双倍
 * @author Administrator
 *
 */
public class RechargeDoubleHandler extends AbsRechargeEvent{

	@Override
	public void recharge(Hero hero, int money,int product_id) {
		int pType = Config_shop_011.getIns().get(product_id).getType();
		if(pType!=RechargeConst.YB) return;
		MailFunction.getIns().sendMailWithFujianData(hero.getId(), MailConst.MAIL_ID_SYSTEM, new Object[]{MailConst.MAIL_ID_SYSTEM,money*RechargeConst.BaseYb},new int[0][] );
	}
}
