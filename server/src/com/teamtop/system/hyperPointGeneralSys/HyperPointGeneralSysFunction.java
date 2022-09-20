package com.teamtop.system.hyperPointGeneralSys;

import java.util.List;

import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.hyperPointGeneral.HyperPointGeneralConst;
import com.teamtop.system.activity.ativitys.hyperPointGeneral.model.HyperPointGeneral;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hyperPointGeneralSys.model.HyperPointGeneralSys;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_cjdj_010;
import excel.struct.Struct_cjdj_010;

public class HyperPointGeneralSysFunction {
	private static HyperPointGeneralSysFunction ins = null;

	public static HyperPointGeneralSysFunction getIns() {
		if (ins == null) {
			ins = new HyperPointGeneralSysFunction();
		}
		return ins;
	}

	private HyperPointGeneralSysFunction() {
	}

	public void rechargeYB(Hero hero, int rmb) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, HyperPointGeneralSysConst.SYS_ID)) {
			return;
		}
		HyperPointGeneralSys hyperPointGeneralSys = hero.getHyperPointGeneralSys();
		hyperPointGeneralSys.setRechargeYBNum(hyperPointGeneralSys.getRechargeYBNum() + rmb);
		boolean isRed = false;
		List<Struct_cjdj_010> sortList = Config_cjdj_010.getIns().getSortList();
		for (Struct_cjdj_010 struct_cjdj_010 : sortList) {
			if (hyperPointGeneralSys.getNextTimes() == struct_cjdj_010.getCishu()
					&& hyperPointGeneralSys.getRechargeYBNum() >= struct_cjdj_010.getYuanbao()) {
				hyperPointGeneralSys.setNextTimes(hyperPointGeneralSys.getNextTimes() + 1);
				hyperPointGeneralSys.setRestTimes(hyperPointGeneralSys.getRestTimes() + 1);
				isRed = true;
			}
		}
		if (isRed) {// 当点将次数从无到有就会发红点
			RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.Act_WONDERFULACTIVITY,
					HyperPointGeneralConst.RESTTIMES_REDPOINT, RedPointConst.HAS_RED);
			RedPointFunction.getIns().fastUpdateRedPoint(hero, HyperPointGeneralSysConst.SYS_ID,
					HyperPointGeneralConst.RESTTIMES_REDPOINT, RedPointConst.HAS_RED);
		}
		HyperPointGeneralSysManager.getIns().openUI(hero);
	}

	/**
	 * 添加日志
	 * 
	 * @param hero
	 * @param hyperPointGeneral
	 */
	public void addLog(Hero hero, HyperPointGeneral hyperPointGeneral) {
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
		HyperPointGeneralSys hyperPointGeneralSys = hero.getHyperPointGeneralSys();
		int restTimes = hyperPointGeneralSys.getRestTimes();
		if (restTimes > 0) {// 有剩余次数时发红点
			RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.Act_WONDERFULACTIVITY,
					HyperPointGeneralConst.RESTTIMES_REDPOINT, RedPointConst.HAS_RED);
			RedPointFunction.getIns().addLoginRedPoint(hero, HyperPointGeneralSysConst.SYS_ID,
					HyperPointGeneralConst.RESTTIMES_REDPOINT, RedPointConst.HAS_RED);
		}
	}

	/**
	 * 快速发送红点
	 * 
	 * @param hero
	 */
	public void fastSendRedPoint(Hero hero) {
		HyperPointGeneralSys hyperPointGeneralSys = hero.getHyperPointGeneralSys();
		int restTimes = hyperPointGeneralSys.getRestTimes();
		if (restTimes > 0) {// 有剩余次数时发红点
			RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.Act_WONDERFULACTIVITY,
					HyperPointGeneralConst.RESTTIMES_REDPOINT, RedPointConst.HAS_RED);
			RedPointFunction.getIns().fastUpdateRedPoint(hero, HyperPointGeneralSysConst.SYS_ID,
					HyperPointGeneralConst.RESTTIMES_REDPOINT, RedPointConst.HAS_RED);
		}
	}

}
