package com.teamtop.system.activity.ativitys.luckSign;

import java.util.Iterator;
import java.util.Map;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.luckSign.model.LuckSign;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;

import excel.config.Config_xyfqmr_508;
import excel.struct.Struct_xyfqmr_508;

public class LuckSignEvent extends AbsSystemEvent {

	private static LuckSignEvent LuckSignEvent;

	private LuckSignEvent() {
	}

	public static synchronized LuckSignEvent getIns() {
		if (LuckSignEvent == null) {
			LuckSignEvent = new LuckSignEvent();
		}
		return LuckSignEvent;
	}

	@Override
	public void init(Hero hero) {
	}

	@Override
	public void login(Hero hero) {
		LuckSignFunction.getIns().loginRed(hero);
	}

	@Override
	public void loginReset(Hero hero, int now) {
		zeroHero(hero, now);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		boolean checkHeroActOpen = ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.LUCK_SIGN);
		if (!checkHeroActOpen) {
			return;
		}
		// 每日目标补发
		int mailId = MailConst.LUCK_SIGN_REWARD;
		LuckSign model = (LuckSign) hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.LUCK_SIGN);
		// 重置每日抽奖次数
		model.setDayNum(0);

		Map<Integer, Integer> rewardMap = model.getAwards();
		int periods = model.getPeriods();
		Iterator<Integer> iterator = rewardMap.keySet().iterator();
		while (iterator.hasNext()) {
			int id = iterator.next();
			Integer state = rewardMap.get(id);
			if (state != null && state == LuckSignConst.CAN_GET) {
				Struct_xyfqmr_508 struct_xyfqmr_508 = Config_xyfqmr_508.getIns().get(id);
				if (struct_xyfqmr_508.getQs() != periods) {
					continue;
				}
				int[][] reward = struct_xyfqmr_508.getReward();
				if (reward != null) {
					MailFunction.getIns().sendMailWithFujianData2(hero.getId(), mailId, new Object[] { mailId },
							reward);
					rewardMap.put(id, LuckSignConst.GETTED);
				}
			}
		}
		// 重置每日抽奖目标
		rewardMap.clear();
	}
}
