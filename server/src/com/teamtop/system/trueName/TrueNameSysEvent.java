package com.teamtop.system.trueName;

import com.teamtop.houtaiHttp.events.trueNameAndAntiAddiction.TrueNameAndAntiAddictionCache;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.trueName.model.TrueNameModel;

public class TrueNameSysEvent extends AbsSystemEvent {

	private static TrueNameSysEvent ins;

	private TrueNameSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized TrueNameSysEvent getIns() {
		if (ins == null) {
			ins = new TrueNameSysEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		TrueNameModel trueNameModel = hero.getTrueNameModel();
		if (trueNameModel == null) {
			trueNameModel = new TrueNameModel();
			trueNameModel.setHid(hero.getId());
			hero.setTrueNameModel(trueNameModel);
		}
	}

	@Override
	public void login(Hero hero) {
		if (TrueNameAndAntiAddictionCache.TRUENAME_SWITCH == 1) {
			// 通知前端实名验证开启
			TrueNameModel trueNameModel = hero.getTrueNameModel();
			int rewardState = trueNameModel.getReward();
			int checkState = trueNameModel.getCheckState();
			int state = 0;
			if (rewardState == 1) {
				state = 2;
			} else if (checkState == 1) {
				state = 1;
			}
			TrueNameSender.sendCmd_5290(hero.getId(), TrueNameAndAntiAddictionCache.TRUENAME_SWITCH, state);
		}
	}

}
