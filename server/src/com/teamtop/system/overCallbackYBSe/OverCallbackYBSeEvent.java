package com.teamtop.system.overCallbackYBSe;

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
import com.teamtop.system.overCallbackYBSe.model.OverCallbackYBSe;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_ybfl1_735;

public class OverCallbackYBSeEvent extends AbsSystemEvent {

	private static OverCallbackYBSeEvent ins;

	private OverCallbackYBSeEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized OverCallbackYBSeEvent getIns() {
		if (ins == null) {
			ins = new OverCallbackYBSeEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		OverCallbackYBSe overCallbackYBSe = hero.getOverCallbackYBSe();
		if (overCallbackYBSe == null) {
			overCallbackYBSe = new OverCallbackYBSe();
			Map<Integer, Integer> awardStateMap = new HashMap<>();
			overCallbackYBSe.setAwardStateMap(awardStateMap);
			int openDays = TimeDateUtil.betweenOpen();
			overCallbackYBSe.setOpenDays(openDays);
			hero.setOverCallbackYBSe(overCallbackYBSe);
		}
	}

	@Override
	public void login(Hero hero) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, OverCallbackYBSeConst.SysId)) {
			return;
		}
		boolean redPoint = OverCallbackYBSeFunction.getIns().checkRedPoint(hero);
		if (redPoint) {
			RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.Act_OVERCALLBACK,
					OverCallbackYBSeConst.BX_REDPOINT, RedPointConst.HAS_RED);
			RedPointFunction.getIns().addLoginRedPoint(hero, OverCallbackYBSeConst.SysId,
					OverCallbackYBSeConst.BX_REDPOINT, RedPointConst.HAS_RED);
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
		if (days == OverCallbackYBSeConst.End_Open) {
			HeroFunction.getIns().sendSystemState(hero.getId(), OverCallbackYBSeConst.SysId,
					SystemStateEnum.StateEnum.NOT_OPEN.getState());
		}
		if (days <= OverCallbackYBSeConst.End_Open) {
			OverCallbackYBSeFunction.getIns().updateRedPoint(hero);
		}
	}

	public void dailyReset(Hero hero, int now) {
		try {
			int openDays = TimeDateUtil.betweenOpen();
			if (openDays <= OverCallbackYBSeConst.End_Open) {
				sendAward(hero);
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, OverCallbackYBSeConst.SysId)) {
				return;
			}
			OverCallbackYBSe overCallbackYBSe = hero.getOverCallbackYBSe();
			overCallbackYBSe.getAwardStateMap().clear();
			overCallbackYBSe.setConsumeYBNum(0);
			overCallbackYBSe.setOpenDays(openDays);
		} catch (Exception e) {
			LogTool.error(e, OverCallbackYBSeEvent.class, hero.getId(), hero.getName(),
					"OverCallbackYBSeEvent dailyReset");
		}
	}

	/**
	 * 补发奖励
	 */
	public void sendAward(Hero hero) {
		try {
			OverCallbackYBSe overCallbackYBSe = hero.getOverCallbackYBSe();
			Map<Integer, Integer> awardStateMap = overCallbackYBSe.getAwardStateMap();
			Iterator<Entry<Integer, Integer>> iterator = awardStateMap.entrySet().iterator();
			Entry<Integer, Integer> entry = null;
			for (; iterator.hasNext();) {
				entry = iterator.next();
				int id = entry.getKey();
				int state = entry.getValue();
				if (state == OverCallbackYBSeConst.CAN_GET) {
					entry.setValue(OverCallbackYBSeConst.GETTED);
					int[][] reward = Config_ybfl1_735.getIns().get(id).getReward();
					MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.OVERCALLBACKYB,
							new Object[] { MailConst.OVERCALLBACKYB }, reward);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, OverCallbackYBSeEvent.class, hero.getId(), hero.getName(),
					"OverCallbackYBSeEvent sendAward");
		}
	}

	@Override
	public void passGuanqia(Hero hero, int passGuanqia) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, OverCallbackYBSeConst.SysId)) {
			return;
		}
		OverCallbackYBSe overCallbackYBSe = hero.getOverCallbackYBSe();
		OverCallbackYBSeFunction.getIns().updateAwardStateList(hero, overCallbackYBSe);
	}

}
