package com.teamtop.system.exclusiveActivity.exOverCallbackYBSe;

import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

import com.teamtop.system.SystemStateEnum;
import com.teamtop.system.exclusiveActivity.AbsExActSystemEvent;
import com.teamtop.system.exclusiveActivity.ExclusiveActivityFunction;
import com.teamtop.system.exclusiveActivity.exOverCallbackYBSe.model.ExActOverCallbackYBSe;
import com.teamtop.system.exclusiveActivity.model.ExclusiveActivityData;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_zshdybfl_315;

public class ExActOverCallbackYBSeEvent extends AbsExActSystemEvent {

	private static ExActOverCallbackYBSeEvent ins;

	private ExActOverCallbackYBSeEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized ExActOverCallbackYBSeEvent getIns() {
		if (ins == null) {
			ins = new ExActOverCallbackYBSeEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero, int id) {

	}

	@Override
	public void login(Hero hero, int id) {
//		if (!ExclusiveActivityFunction.getIns().checkHeroExActOpen(hero, id)) {
//			return;
//		}
		if(!ExclusiveActivityFunction.getIns().checkHasData(hero, id)) {
			return;
		}
		boolean redPoint = ExActOverCallbackYBSeFunction.getIns().checkRedPoint(hero, id);
		if (redPoint) {
			RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.EXACT_ACT,
					ExActOverCallbackYBSeConst.BX_REDPOINT, RedPointConst.HAS_RED);
			RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.OTHER_BACK_YB,
					ExActOverCallbackYBSeConst.BX_REDPOINT, RedPointConst.HAS_RED);
		}
	}

	@Override
	public void loginReset(Hero hero, int now, int id) {
		dailyReset(hero, now, id);
	}

	@Override
	public void zeroHero(Hero hero, int now, int id) {
		dailyReset(hero, now, id);
		if (ExclusiveActivityFunction.getIns().checkHasData(hero, id)) {
			ExActOverCallbackYBSeFunction.getIns().updateRedPoint(hero, id);
		}else {
			HeroFunction.getIns().sendSystemState(hero.getId(), SystemIdConst.OTHER_BACK_YB,
					SystemStateEnum.StateEnum.NOT_OPEN.getState());
		}
	}

	public void dailyReset(Hero hero, int now, int id) {
		try {
//			int openDays = TimeDateUtil.betweenOpen();
//			if (ExclusiveActivityFunction.getIns().checkHeroExActOpen(hero, id)) {
//				sendAward(hero, id);
//			}
//			if (!ExclusiveActivityFunction.getIns().checkHeroExActOpen(hero, id)) {
//				return;
//			}
			if(!ExclusiveActivityFunction.getIns().checkHasData(hero, id)) {
				return;
			} else {
				sendAward(hero, id);
			}
			ExclusiveActivityData activityData = hero.getExclusiveActivityData();
			ExActOverCallbackYBSe overCallbackYBSe = (ExActOverCallbackYBSe) activityData.getExActivityMap().get(id);
			overCallbackYBSe.getAwardStateMap().clear();
			overCallbackYBSe.setConsumeYBNum(0);
//			overCallbackYBSe.setOpenDays(openDays);
		} catch (Exception e) {
			LogTool.error(e, ExActOverCallbackYBSeEvent.class, hero.getId(), hero.getName(),
					"OverCallbackYBSeEvent dailyReset");
		}
	}

	/**
	 * 补发奖励
	 */
	public void sendAward(Hero hero, int id) {
		try {
			ExclusiveActivityData activityData = hero.getExclusiveActivityData();
			ExActOverCallbackYBSe overCallbackYBSe = (ExActOverCallbackYBSe) activityData.getExActivityMap().get(id);
			Map<Integer, Integer> awardStateMap = overCallbackYBSe.getAwardStateMap();
			Iterator<Entry<Integer, Integer>> iterator = awardStateMap.entrySet().iterator();
			Entry<Integer, Integer> entry = null;
			for (; iterator.hasNext();) {
				entry = iterator.next();
				int index = entry.getKey();
				int state = entry.getValue();
				if (state == ExActOverCallbackYBSeConst.CAN_GET) {
					entry.setValue(ExActOverCallbackYBSeConst.GETTED);
					int[][] reward = Config_zshdybfl_315.getIns().get(index).getReward();
					MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.OVERCALLBACKYB,
							new Object[] { MailConst.OVERCALLBACKYB }, reward);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, ExActOverCallbackYBSeEvent.class, hero.getId(), hero.getName(),
					"OverCallbackYBSeEvent sendAward");
		}
	}

	@Override
	public void passGuanqia(Hero hero, int passGuanqia, int id) {
//		if (!ExclusiveActivityFunction.getIns().checkHeroExActOpen(hero, id)) {
//			return;
//		}
		if(!ExclusiveActivityFunction.getIns().checkHasData(hero, id)) {
			return;
		}
		ExclusiveActivityData activityData = hero.getExclusiveActivityData();
		ExActOverCallbackYBSe overCallbackYBSe = (ExActOverCallbackYBSe) activityData.getExActivityMap().get(id);
		ExActOverCallbackYBSeFunction.getIns().updateAwardStateList(hero, overCallbackYBSe, id);
	}

}
