package com.teamtop.system.openDaysSystem.otherOverCallbackYBSe;

import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

import com.teamtop.system.SystemStateEnum;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.otherOverCallbackYBSe.model.OtherOverCallbackYBSe;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_hdfl_012;
import excel.config.Config_ybfl3_735;
import excel.struct.Struct_hdfl_012;

public class OtherOverCallbackYBSeEvent extends AbsSystemEvent {

	private static OtherOverCallbackYBSeEvent ins;

	private OtherOverCallbackYBSeEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized OtherOverCallbackYBSeEvent getIns() {
		if (ins == null) {
			ins = new OtherOverCallbackYBSeEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {

	}

	@Override
	public void login(Hero hero) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.OTHER_BACK_YB)) {
			return;
		}
		boolean redPoint = OtherOverCallbackYBSeFunction.getIns().checkRedPoint(hero);
		if (redPoint) {
			RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.Act_OVERCALLBACK,
					OtherOverCallbackYBSeConst.BX_REDPOINT, RedPointConst.HAS_RED);
			RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.OTHER_BACK_YB,
					OtherOverCallbackYBSeConst.BX_REDPOINT, RedPointConst.HAS_RED);
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
		int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.OTHER_BACK_YB);
		Struct_hdfl_012 hdfl_012 = Config_hdfl_012.getIns().get(uid);
		int end = hdfl_012.getEnd() + 1;
		int open = hdfl_012.getOpen();
		if (days == end) {
			HeroFunction.getIns().sendSystemState(hero.getId(), SystemIdConst.OTHER_BACK_YB,
					SystemStateEnum.StateEnum.NOT_OPEN.getState());
		}
		if (days >= open && days <= end) {
			OtherOverCallbackYBSeFunction.getIns().updateRedPoint(hero);
		}
	}

	public void dailyReset(Hero hero, int now) {
		try {
			int openDays = TimeDateUtil.betweenOpen();
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.OTHER_BACK_YB);
			Struct_hdfl_012 hdfl_012 = Config_hdfl_012.getIns().get(uid);
			int end = hdfl_012.getEnd() + 1;
			int open = hdfl_012.getOpen();
			if (openDays >= open && openDays <= end) {
				sendAward(hero);
			}
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.OTHER_BACK_YB)) {
				return;
			}
			OtherOverCallbackYBSe overCallbackYBSe = (OtherOverCallbackYBSe) OtherOverCallbackYBSeManager.getIns()
					.getSystemModel(hero, uid);
			overCallbackYBSe.getAwardStateMap().clear();
			overCallbackYBSe.setConsumeYBNum(0);
			overCallbackYBSe.setOpenDays(openDays);
		} catch (Exception e) {
			LogTool.error(e, OtherOverCallbackYBSeEvent.class, hero.getId(), hero.getName(),
					"OverCallbackYBSeEvent dailyReset");
		}
	}

	/**
	 * 补发奖励
	 */
	public void sendAward(Hero hero) {
		try {
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.OTHER_BACK_YB);
			OtherOverCallbackYBSe overCallbackYBSe = (OtherOverCallbackYBSe) OtherOverCallbackYBSeManager.getIns()
					.getSystemModel(hero, uid);
			Map<Integer, Integer> awardStateMap = overCallbackYBSe.getAwardStateMap();
			Iterator<Entry<Integer, Integer>> iterator = awardStateMap.entrySet().iterator();
			Entry<Integer, Integer> entry = null;
			for (; iterator.hasNext();) {
				entry = iterator.next();
				int id = entry.getKey();
				int state = entry.getValue();
				if (state == OtherOverCallbackYBSeConst.CAN_GET) {
					entry.setValue(OtherOverCallbackYBSeConst.GETTED);
					int[][] reward = Config_ybfl3_735.getIns().get(id).getReward();
					MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.OVERCALLBACKYB,
							new Object[] { MailConst.OVERCALLBACKYB }, reward);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, OtherOverCallbackYBSeEvent.class, hero.getId(), hero.getName(),
					"OverCallbackYBSeEvent sendAward");
		}
	}

	@Override
	public void passGuanqia(Hero hero, int passGuanqia) {
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.OTHER_BACK_YB)) {
			return;
		}
		int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.OTHER_BACK_YB);
		OtherOverCallbackYBSe overCallbackYBSe = (OtherOverCallbackYBSe) OtherOverCallbackYBSeManager.getIns()
				.getSystemModel(hero, uid);
		OtherOverCallbackYBSeFunction.getIns().updateAwardStateList(hero, overCallbackYBSe);
	}

}
