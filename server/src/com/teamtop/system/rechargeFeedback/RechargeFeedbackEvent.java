package com.teamtop.system.rechargeFeedback;

import java.util.HashMap;
import java.util.Map;

import com.teamtop.system.SystemStateEnum;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.rechargeFeedback.moel.RechargeFeedback;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;

import excel.config.Config_lchk_744;

public class RechargeFeedbackEvent extends AbsSystemEvent {
	private static RechargeFeedbackEvent ins = null;

	public static RechargeFeedbackEvent getIns() {
		if (ins == null) {
			ins = new RechargeFeedbackEvent();
		}
		return ins;
	}

	private RechargeFeedbackEvent() {
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub
		RechargeFeedback rechargeFeedback = hero.getRechargeFeedback();
		if (rechargeFeedback == null) {
			rechargeFeedback = new RechargeFeedback();
			rechargeFeedback.setHid(hero.getId());
			rechargeFeedback.setAwardStateMap(new HashMap<>());
			hero.setRechargeFeedback(rechargeFeedback);
		}
	}

	@Override
	public void login(Hero hero) {
		// TODO Auto-generated method stub
		Map<Integer, Integer> awardStateMap = hero.getRechargeFeedback().getAwardStateMap();
		int size = Config_lchk_744.getIns().getSortList().size();
		boolean openFlag = false;
		if (awardStateMap.size() < size) {
			HeroFunction.getIns().addLoginSytemState(hero, RechargeFeedbackConst.SYS,
					SystemStateEnum.StateEnum.OPEN_NOW.getState());
			openFlag = true;
		}
		for (Integer state : awardStateMap.values()) {
			if (state == RechargeFeedbackConst.CAN_GET) {
				if (!openFlag) {
					HeroFunction.getIns().addLoginSytemState(hero, RechargeFeedbackConst.SYS,
							SystemStateEnum.StateEnum.OPEN_NOW.getState());
					openFlag = true;
				}
				RedPointFunction.getIns().addLoginRedPoint(hero, RechargeFeedbackConst.SYS, 1, RedPointConst.HAS_RED);
				return;
			}
		}
	}

}
