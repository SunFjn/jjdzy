package com.teamtop.system.activity.ativitys.hyperPointGeneral;

import java.util.List;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.hyperPointGeneral.model.HyperPointGeneral;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

import excel.struct.Struct_cjdj1_010;

public class HyperPointGeneralFunction {
	private static HyperPointGeneralFunction ins = null;

	public static HyperPointGeneralFunction getIns() {
		if (ins == null) {
			ins = new HyperPointGeneralFunction();
		}
		return ins;
	}

	private HyperPointGeneralFunction() {
	}

	public void rechargeYB(Hero hero, int rmb) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_HYPERPOINTGENERAL)) {
			return;
		}
		HyperPointGeneral hyperPointGeneral = (HyperPointGeneral) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.Act_HYPERPOINTGENERAL);
		hyperPointGeneral.setRechargeYBNum(hyperPointGeneral.getRechargeYBNum() + rmb);
		boolean isRed = false;
		List<Struct_cjdj1_010> configList = HyperPointGeneralCache.getConfigMap().get(hyperPointGeneral.getPeriods())
				.getConfigList();
		for (Struct_cjdj1_010 struct_cjdj1_010 : configList) {
			if (hyperPointGeneral.getNextTimes() == struct_cjdj1_010.getCishu()
					&& hyperPointGeneral.getRechargeYBNum() >= struct_cjdj1_010.getYuanbao()) {
				hyperPointGeneral.setNextTimes(hyperPointGeneral.getNextTimes() + 1);
				hyperPointGeneral.setRestTimes(hyperPointGeneral.getRestTimes() + 1);
				isRed = true;
			}
		}
		if (isRed) {// 当点将次数从无到有就会发红点
			RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.Act_WONDERFULACTIVITY,
					HyperPointGeneralConst.RESTTIMES_REDPOINT, RedPointConst.HAS_RED);
			RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.Act_HYPERPOINTGENERAL,
					HyperPointGeneralConst.RESTTIMES_REDPOINT, RedPointConst.HAS_RED);
		}
		HyperPointGeneralManager.getIns().openUI(hero);
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
		HyperPointGeneral hyperPointGeneral = (HyperPointGeneral) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.Act_HYPERPOINTGENERAL);
		int restTimes = hyperPointGeneral.getRestTimes();
		if (restTimes > 0) {// 有剩余次数时发红点
			RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.Act_WONDERFULACTIVITY,
					HyperPointGeneralConst.RESTTIMES_REDPOINT, RedPointConst.HAS_RED);
			RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.Act_HYPERPOINTGENERAL,
					HyperPointGeneralConst.RESTTIMES_REDPOINT, RedPointConst.HAS_RED);
		}
	}

	/**
	 * 快速发送红点
	 * 
	 * @param hero
	 */
	public void fastSendRedPoint(Hero hero) {
		HyperPointGeneral hyperPointGeneral = (HyperPointGeneral) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.Act_HYPERPOINTGENERAL);
		int restTimes = hyperPointGeneral.getRestTimes();
		if (restTimes > 0) {// 有剩余次数时发红点
			RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.Act_WONDERFULACTIVITY,
					HyperPointGeneralConst.RESTTIMES_REDPOINT, RedPointConst.HAS_RED);
			RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.Act_HYPERPOINTGENERAL,
					HyperPointGeneralConst.RESTTIMES_REDPOINT, RedPointConst.HAS_RED);
		}
	}

}
