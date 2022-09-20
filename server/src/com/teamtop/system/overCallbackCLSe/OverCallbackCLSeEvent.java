package com.teamtop.system.overCallbackCLSe;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

import com.teamtop.system.SystemStateEnum;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.overCallbackCLSe.model.OverCallbackCLSe;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_clfl1_736;
import excel.struct.Struct_clfl1_736;

public class OverCallbackCLSeEvent extends AbsSystemEvent {

	private static OverCallbackCLSeEvent ins;

	private OverCallbackCLSeEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized OverCallbackCLSeEvent getIns() {
		if (ins == null) {
			ins = new OverCallbackCLSeEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		OverCallbackCLSe overCallbackCLSe = hero.getOverCallbackCLSe();
		if (overCallbackCLSe == null) {
			overCallbackCLSe = new OverCallbackCLSe();
			Map<Integer, Integer> awardStateMap = new HashMap<>();
			overCallbackCLSe.setAwardStateMap(awardStateMap);
			int openDays = TimeDateUtil.betweenOpen();
			overCallbackCLSe.setOpenDays(openDays);
			hero.setOverCallbackCLSe(overCallbackCLSe);
		}
	}

	@Override
	public void login(Hero hero) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, OverCallbackCLSeConst.SysId)) {
			return;
		}
		boolean redPoint = OverCallbackCLSeFunction.getIns().checkRedPoint(hero);
		if (redPoint) {
			RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.Act_OVERCALLBACK,
					OverCallbackCLSeConst.RedPoint, RedPointConst.HAS_RED);
			RedPointFunction.getIns().addLoginRedPoint(hero, OverCallbackCLSeConst.SysId,
					OverCallbackCLSeConst.RedPoint, RedPointConst.HAS_RED);
		}
	}

	@Override
	public void loginReset(Hero hero, int now) {
		dailyReset(hero, now);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		dailyReset(hero, now);
		int days = TimeDateUtil.betweenOpen();
		if (days == OverCallbackCLSeConst.END_DAYS) {
			HeroFunction.getIns().sendSystemState(hero.getId(), OverCallbackCLSeConst.SysId,
					SystemStateEnum.StateEnum.NOT_OPEN.getState());
		}
		if (days <= OverCallbackCLSeConst.END_DAYS) {
			OverCallbackCLSeFunction.getIns().updateRedPoint(hero);
		}
	}

	/**
	 * 重置
	 * 
	 * @param hero
	 * @param now
	 */
	public void dailyReset(Hero hero, int now) {
		int days = TimeDateUtil.betweenOpen();
		if (days <= OverCallbackCLSeConst.END_DAYS) {
			sendAward(hero);
		}
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, OverCallbackCLSeConst.SysId)) {
				return;
			}
			OverCallbackCLSe overCallbackCLSe = hero.getOverCallbackCLSe();
			overCallbackCLSe.getAwardStateMap().clear();
			overCallbackCLSe.setConsumeNum(0);
			overCallbackCLSe.setOpenDays(days);
			if (days == OverCallbackCLSeConst.END_DAYS) {
				HeroFunction.getIns().sendSystemState(hero.getId(), OverCallbackCLSeConst.SysId,
						SystemStateEnum.StateEnum.NOT_OPEN.getState());
			}
			OverCallbackCLSeFunction.getIns().updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, OverCallbackCLSeEvent.class, hero.getId(), hero.getName(),
					"OverCallbackCLSeEvent dailyReset");
		}
	}

	/**
	 * 补发奖励
	 * 
	 * @param hero
	 */
	public void sendAward(Hero hero) {
		try {
			OverCallbackCLSe overCallbackCLSe = hero.getOverCallbackCLSe();
			OverCallbackCLSeFunction.getIns().updateAward(hero);
			Map<Integer, Integer> awardStateMap = overCallbackCLSe.getAwardStateMap();
			Iterator<Entry<Integer, Integer>> iterator = awardStateMap.entrySet().iterator();
			Struct_clfl1_736 struct_clfl1_736 = null;
			int[][] reward = null;
			for (; iterator.hasNext();) {
				Entry<Integer, Integer> entry = iterator.next();
				int id = entry.getKey();
				int state = entry.getValue();
				if (state == OverCallbackCLSeConst.GETTED) {
					continue;
				}
				entry.setValue(OverCallbackCLSeConst.GETTED);
				struct_clfl1_736 = Config_clfl1_736.getIns().get(id);
				reward = struct_clfl1_736.getReward();
				MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.OVERCALLBACKCL,
						new Object[] { MailConst.OVERCALLBACKCL }, reward);
			}
		} catch (Exception e) {
			LogTool.error(e, OverCallbackCLSeEvent.class, hero.getId(), hero.getName(),
					"OverCallbackCLSeEvent sendAward");
		}
	}

	@Override
	public void passGuanqia(Hero hero, int passGuanqia) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, OverCallbackCLSeConst.SysId)) {
			return;
		}
		OverCallbackCLSeFunction.getIns().updateAward(hero);
	}

}
