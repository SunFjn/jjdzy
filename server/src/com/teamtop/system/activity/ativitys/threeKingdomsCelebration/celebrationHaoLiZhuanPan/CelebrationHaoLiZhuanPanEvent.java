package com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationHaoLiZhuanPan;

import java.util.Map;
import java.util.Map.Entry;

import com.alibaba.fastjson.JSON;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationHaoLiZhuanPan.model.CelebrationHaoLiZhuanPan;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_sgzpmb_261;
import excel.struct.Struct_sgzpmb_261;

public class CelebrationHaoLiZhuanPanEvent extends AbsSystemEvent {
	private static CelebrationHaoLiZhuanPanEvent ins;

	public static CelebrationHaoLiZhuanPanEvent getIns() {
		if (ins == null) {
			ins = new CelebrationHaoLiZhuanPanEvent();
		}
		return ins;
	}

	private CelebrationHaoLiZhuanPanEvent() {
	}

	@Override
	public void init(Hero hero) {
	}

	@Override
	public void login(Hero hero) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.CELEBRATION_HAO_LI_ZHUAN_PAN)) {
			return;
		}
		CelebrationHaoLiZhuanPan model = (CelebrationHaoLiZhuanPan) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.CELEBRATION_HAO_LI_ZHUAN_PAN);
		Map<Integer, Integer> targetAwardStateMap = model.getTargetAwardStateMap();
		for (int state : targetAwardStateMap.values()) {
			if (state == CelebrationHaoLiZhuanPanConst.CAN_GET) {
				RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.ACT_THREEKINGDOMSCELEBRATION, 1,
						RedPointConst.HAS_RED);
				RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.CELEBRATION_HAO_LI_ZHUAN_PAN, 1,
						RedPointConst.HAS_RED);
				return;
			}
		}
	}

	@Override
	public void zeroHero(final Hero hero, final int now) {
		loginReset(hero, now);
	}

	@Override
	public void loginReset(Hero hero, int now) {
		// 发放目标奖励
		CelebrationHaoLiZhuanPan model = null;
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.CELEBRATION_HAO_LI_ZHUAN_PAN)) {
				return;
			}
			model = (CelebrationHaoLiZhuanPan) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.CELEBRATION_HAO_LI_ZHUAN_PAN);
			if (!TimeDateUtil.isActEndBeforeDay(model.getIndexId(), CelebrationHaoLiZhuanPanConst.DAY_ID)) {
				return;
			}
			Map<Integer, Integer> targetAwardStateMap = model.getTargetAwardStateMap();
			for (Entry<Integer, Integer> entry : targetAwardStateMap.entrySet()) {
				Integer value = entry.getValue();
				if (value == CelebrationHaoLiZhuanPanConst.CAN_GET) {
					entry.setValue(CelebrationHaoLiZhuanPanConst.GETTED);
					Integer id = entry.getKey();
					try {
						Struct_sgzpmb_261 struct_sgzpmb_261 = Config_sgzpmb_261.getIns().get(id);
						int[][] reward = struct_sgzpmb_261.getReward();
						MailFunction.getIns().sendMailWithFujianData2(hero.getId(),
								MailConst.MAIL_ID_CELEBRATION_HAO_LI_ZHUAN_PAN_TARGETAWARD,
								new Object[] { MailConst.MAIL_ID_CELEBRATION_HAO_LI_ZHUAN_PAN_TARGETAWARD }, reward);// 邮件发放目标奖励
					} catch (Exception e) {
						// TODO: handle exception
						LogTool.error(e, this, hero.getId(), hero.getName(),
								"CelebrationHaoLiZhuanPanEvent loginReset id:" + id);
					}
				}
			}
		} catch (Exception e) {
			// TODO: handle exception
			if (model == null) {
				LogTool.error(e, this, hero.getId(), hero.getName(), "CelebrationHaoLiZhuanPanEvent loginReset");
			} else {
				LogTool.error(e, this, hero.getId(), hero.getName(),
						"CelebrationHaoLiZhuanPanEvent loginReset" + " qs:" + model.getPeriods() + " times:"
								+ model.getParameter() + " targetAwardStateMap:"
								+ JSON.toJSONString(model.getTargetAwardStateMap()));
			}
		}
	}

}
