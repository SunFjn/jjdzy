package com.teamtop.system.openDaysSystem.otherHyperPointGeneralSys;

import java.util.List;

import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.otherHyperPointGeneralSys.model.OtherHyperPointGeneralSys;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

import excel.struct.Struct_cjdj3_010;


public class OtherHyperPointGeneralSysFunction {
	private static OtherHyperPointGeneralSysFunction ins = null;

	public static OtherHyperPointGeneralSysFunction getIns() {
		if (ins == null) {
			ins = new OtherHyperPointGeneralSysFunction();
		}
		return ins;
	}

	private OtherHyperPointGeneralSysFunction() {
	}

	public void rechargeYB(Hero hero, int rmb) {
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.OTHER_HYPERPOINT_GENERAL)) {
			return;
		}
		int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.OTHER_HYPERPOINT_GENERAL);
		OtherHyperPointGeneralSys hyperPointGeneralSys = (OtherHyperPointGeneralSys) OtherHyperPointGeneralSysManager
				.getIns().getSystemModel(hero, uid);
		hyperPointGeneralSys.setRechargeYBNum(hyperPointGeneralSys.getRechargeYBNum() + rmb);
		boolean isRed = false;
		int qs = hyperPointGeneralSys.getQs();
		List<Struct_cjdj3_010> sortList = OtherHyperPointGeneralSysCache.getQsListMap().get(qs);
		for (Struct_cjdj3_010 Struct_cjdj3_010 : sortList) {
			if (hyperPointGeneralSys.getNextTimes() == Struct_cjdj3_010.getCishu()
					&& hyperPointGeneralSys.getRechargeYBNum() >= Struct_cjdj3_010.getYuanbao()) {
				hyperPointGeneralSys.setNextTimes(hyperPointGeneralSys.getNextTimes() + 1);
				hyperPointGeneralSys.setRestTimes(hyperPointGeneralSys.getRestTimes() + 1);
				isRed = true;
			}
		}
		if (isRed) {// 当点将次数从无到有就会发红点
			RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.Act_WONDERFULACTIVITY,
					OtherHyperPointGeneralSysConst.RESTTIMES_REDPOINT, RedPointConst.HAS_RED);
			RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.OTHER_HYPERPOINT_GENERAL,
					OtherHyperPointGeneralSysConst.RESTTIMES_REDPOINT, RedPointConst.HAS_RED);
		}
		OtherHyperPointGeneralSysManager.getIns().openUI(hero);
	}

	/**
	 * 添加日志
	 * 
	 * @param hero
	 * @param hyperPointGeneral
	 */
	public void addLog(Hero hero, OtherHyperPointGeneralSys hyperPointGeneral) {
		StringBuffer stringBuffer = new StringBuffer();
		stringBuffer.append("hid:").append(hero.getId()).append("rechargeYBNum:")
				.append(hyperPointGeneral.getRechargeYBNum()).append("restTimes:")
				.append(hyperPointGeneral.getRestTimes());
		LogTool.info(stringBuffer.toString(), this);
	}

	/**
	 * 登录发送红点
	 * 
	 * @param hero
	 */
	public void loginSendRedPoint(Hero hero) {
		int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.OTHER_HYPERPOINT_GENERAL);
		if(uid==-1) {
			return;
		}
		OtherHyperPointGeneralSys hyperPointGeneralSys = (OtherHyperPointGeneralSys) OtherHyperPointGeneralSysManager
				.getIns().getSystemModel(hero, uid);
		int restTimes = hyperPointGeneralSys.getRestTimes();
		if (restTimes > 0) {// 有剩余次数时发红点
			RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.Act_WONDERFULACTIVITY,
					OtherHyperPointGeneralSysConst.RESTTIMES_REDPOINT, RedPointConst.HAS_RED);
			RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.OTHER_HYPERPOINT_GENERAL,
					OtherHyperPointGeneralSysConst.RESTTIMES_REDPOINT, RedPointConst.HAS_RED);
		}
	}

	/**
	 * 快速发送红点
	 * 
	 * @param hero
	 */
	public void fastSendRedPoint(Hero hero) {
		int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.OTHER_HYPERPOINT_GENERAL);
		if(uid==-1) {
			return;
		}
		OtherHyperPointGeneralSys hyperPointGeneralSys = (OtherHyperPointGeneralSys) OtherHyperPointGeneralSysManager
				.getIns().getSystemModel(hero, uid);
		int restTimes = hyperPointGeneralSys.getRestTimes();
		if (restTimes > 0) {// 有剩余次数时发红点
			RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.Act_WONDERFULACTIVITY,
					OtherHyperPointGeneralSysConst.RESTTIMES_REDPOINT, RedPointConst.HAS_RED);
			RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.OTHER_HYPERPOINT_GENERAL,
					OtherHyperPointGeneralSysConst.RESTTIMES_REDPOINT, RedPointConst.HAS_RED);
		}
	}

}
