package com.teamtop.system.activity.ativitys.dailyFirstRecharge;

import java.util.List;

import com.teamtop.system.SystemStateEnum;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.dailyFirstRecharge.model.DailyFirstRecharge;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;

import excel.config.Config_meirishouchong_715;
import excel.config.Config_mrbx_715;
import excel.struct.Struct_mrbx_715;

public class DailyFirstRechargeEvent extends AbsSystemEvent {
	private static DailyFirstRechargeEvent ins;

	public static DailyFirstRechargeEvent getIns() {
		if (ins == null) {
			ins = new DailyFirstRechargeEvent();
		}
		return ins;
	}

	private DailyFirstRechargeEvent() {
	}

	@Override
	public void zeroHero(final Hero hero, final int now) { // 零点在线处理
		if (ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_DailyRecharge)) {
//			if (!DailyFirstRechargeFunction.getIns().isOpen(hero)) {
//				return;
//			}
			HeroFunction.getIns().sendSystemState(hero.getId(), ActivitySysId.Act_DailyRecharge,
					SystemStateEnum.StateEnum.OPEN_NOW.getState());
			loginReset(hero, now);
		}
	}

	@Override
	public void loginReset(Hero hero, int now) {
		if (ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_DailyRecharge)) {
//			if (!DailyFirstRechargeFunction.getIns().isOpen(hero)) {
//				return;
//			}
			DailyFirstRecharge dailyFirstRecharge = (DailyFirstRecharge) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.Act_DailyRecharge);
			if (dailyFirstRecharge.getIsGetted() == DailyFirstRechargeConst.CAN_GET) {// 每日充值奖励未领取上线通过邮件发放
				int[][] award = Config_meirishouchong_715.getIns().get(1).getAWARD();
				Object[] contentData = new Object[] { MailConst.MAIL_ID_DAILYFIRSTRECHARGE_AWARD };
				MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.MAIL_ID_DAILYFIRSTRECHARGE_AWARD,
						contentData, award);
			}
			dailyFirstRecharge.setIsGetted(DailyFirstRechargeConst.NOT_REACH);// 重置每日首充奖励状态，改为未充值
			List<Integer> baoXiangList = dailyFirstRecharge.getBaoXiangList();
			int size = baoXiangList.size();
			List<Struct_mrbx_715> mrbxList = Config_mrbx_715.getIns().getSortList();
			for (int i = 0; i < size; i++) {
				Integer integer = baoXiangList.get(i);
				if (integer == DailyFirstRechargeConst.CAN_GET) {
					int[][] award = mrbxList.get(i).getAWARD();
					Object[] contentData = new Object[] { MailConst.MAIL_ID_DAILYFIRSTRECHARGE_AWARD };
					MailFunction.getIns().sendMailWithFujianData2(hero.getId(),
							MailConst.MAIL_ID_DAILYFIRSTRECHARGE_AWARD, contentData, award);
					baoXiangList.set(i, DailyFirstRechargeConst.GETTED);
				}
			}
			int needDay = mrbxList.get(mrbxList.size() - 1).getNEED();
			int rechargeDay = dailyFirstRecharge.getRechargeDay();
			if (rechargeDay % needDay == 0) {
				for (int i = 0; i < size; i++) {
					baoXiangList.set(i, DailyFirstRechargeConst.NOT_REACH);
				}
				dailyFirstRecharge.setRechargeDay(0);
			}
		}
	}

	@Override
	public void init(Hero hero) {
	}

	@Override
	public void login(Hero hero) {
		if (ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_DailyRecharge)) {
//			if (!DailyFirstRechargeFunction.getIns().isOpen(hero)) {
//				return;
//			}
			HeroFunction.getIns().addLoginSytemState(hero, ActivitySysId.Act_DailyRecharge,
					SystemStateEnum.StateEnum.OPEN_NOW.getState());
			DailyFirstRechargeFunction.getIns().loginSendRedPoint(hero);
		}
	}

	@Override
	public void passGuanqia(Hero hero, int passGuanqia) {
		// TODO Auto-generated method stub
		if (ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_DailyRecharge)) {
			DailyFirstRechargeFunction.getIns().fastSendRedPoint(hero);
		}
	}

}
