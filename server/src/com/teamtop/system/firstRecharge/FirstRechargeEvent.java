package com.teamtop.system.firstRecharge;

import com.teamtop.system.SystemStateEnum;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_shouchong_714;

public class FirstRechargeEvent extends AbsSystemEvent {
	private static FirstRechargeEvent ins;

	public static FirstRechargeEvent getIns() {
		if (ins == null) {
			ins = new FirstRechargeEvent();
		}
		return ins;
	}

	private FirstRechargeEvent() {
	}

	@Override
	public void init(Hero hero) {
	}

	@Override
	public void login(Hero hero) {
		int secondFirstRechargeZeroTime = TimeDateUtil.getOneDayZeroTime(hero.getFirstRechargeTime())
				+ TimeDateUtil.SECONDS_IN_DAY;
		int currentTime = TimeDateUtil.getCurrentTime();
		int frAwardsState = hero.getFrAwardsState();
		if (hero.getFirstRechargeTime() != 0 && currentTime >= secondFirstRechargeZeroTime
				&& frAwardsState == FirstRechargeConst.CAN_GET) {
			int[][] award = Config_shouchong_714.getIns().get(1).getAWARD();
			MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.MAIL_ID_FIRSTRECHARGE_AWARD,
					new Object[] { MailConst.MAIL_ID_FIRSTRECHARGE_AWARD }, award);
			hero.setFrAwardsState(FirstRechargeConst.GETTED);
		} else {
			if (frAwardsState == FirstRechargeConst.NOT_REACH) {
				HeroFunction.getIns().addLoginSytemState(hero, FirstRechargeConst.FIRSTRECHARGE,
						SystemStateEnum.StateEnum.OPEN_NOW.getState());
			}
			if (frAwardsState == FirstRechargeConst.CAN_GET) {
				HeroFunction.getIns().addLoginSytemState(hero, FirstRechargeConst.FIRSTRECHARGE,
						SystemStateEnum.StateEnum.OPEN_NOW.getState());
				RedPointFunction.getIns().addLoginRedPoint(hero, FirstRechargeConst.FIRSTRECHARGE,
						FirstRechargeConst.CAN_GET, RedPointConst.HAS_RED);
			}

		}
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		// TODO Auto-generated method stub
		int secondFirstRechargeZeroTime = TimeDateUtil.getOneDayZeroTime(hero.getFirstRechargeTime())
				+ TimeDateUtil.SECONDS_IN_DAY;
		int currentTime = TimeDateUtil.getCurrentTime();
		int frAwardsState = hero.getFrAwardsState();
		if (hero.getFirstRechargeTime() != 0 && currentTime >= secondFirstRechargeZeroTime
				&& frAwardsState == FirstRechargeConst.CAN_GET) {
			int[][] award = Config_shouchong_714.getIns().get(1).getAWARD();
			//邮件发放奖励
			MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.MAIL_ID_FIRSTRECHARGE_AWARD,
					new Object[] { MailConst.MAIL_ID_FIRSTRECHARGE_AWARD }, award);
			hero.setFrAwardsState(FirstRechargeConst.GETTED);
			//关闭首充界面
			HeroFunction.getIns().sendSystemState(hero.getId(), FirstRechargeConst.FIRSTRECHARGE,
					SystemStateEnum.StateEnum.NOT_OPEN.getState());
		}
	}

}
