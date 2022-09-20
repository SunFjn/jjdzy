package com.teamtop.system.activity.ativitys.eightDoorAppraiseRankAct;

import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.eightDoorAppraiseRankAct.model.EightDoorAppraiseRankAct;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.global.GlobalSender;
import com.teamtop.system.hero.Hero;

public class EightDoorAppraiseRankActManager extends AbstractActivityManager {
	private static volatile EightDoorAppraiseRankActManager ins = null;

	public static EightDoorAppraiseRankActManager getIns() {
		if (ins == null) {
			synchronized (EightDoorAppraiseRankActManager.class) {
				if (ins == null) {
					ins = new EightDoorAppraiseRankActManager();
				}
			}
		}
		return ins;
	}

	private EightDoorAppraiseRankActManager() {
	}

	@Override
	public void openUI(Hero hero) {
		// TODO Auto-generated method stub
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.EIGHTDOOR_APPRAISERANK_ACT)) {
			return;
		}
		EightDoorAppraiseRankAct model = (EightDoorAppraiseRankAct) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.EIGHTDOOR_APPRAISERANK_ACT);
		EightDoorAppraiseRankActFunction.getIns().heroDataHandle(model);
		int myTimes = model.getAppraiseTimes();
		int myRank = 0;
		Object[] rankObjArray = EightDoorAppraiseRankActSysCache.getRankObjArray();
		if (rankObjArray != null) {
			for (Object obj : rankObjArray) {
				Object[] objArray = (Object[]) obj;
				String name = (String) objArray[1];
				if (hero.getNameZoneid().equals(name)) {
					myRank = (Integer) objArray[0];
					objArray[2] = myTimes;
				}
			}
		}
		int firstBodyId = EightDoorAppraiseRankActSysCache.getFirstBodyId();
		int indexId = model.getIndexId();
		Object[] secordThirdObjArray = EightDoorAppraiseRankActSysCache.getSecordThirdObjArray();
		int endTime = EightDoorAppraiseRankActSysCache.getIndexConfigMap().get(indexId);
		GlobalSender.sendCmd_270(hero.getId(), ActivitySysId.EIGHTDOOR_APPRAISERANK_ACT, indexId, firstBodyId,
				rankObjArray, secordThirdObjArray, myTimes, myRank, endTime);
	}

	@Override
	public void actOpen() {
		// TODO Auto-generated method stub
		EightDoorAppraiseRankActSysCache.getRankTreeSet().clear();
		EightDoorAppraiseRankActSysCache.setRankObjArray(null);
		EightDoorAppraiseRankActSysCache.setSecordThirdObjArray(null);
		EightDoorAppraiseRankActSysCache.setFirstBodyId(0);
	}

	@Override
	public void heroActOpen(Hero hero) {
		// TODO Auto-generated method stub
	}

	@Override
	public void actEnd() {
		// TODO Auto-generated method stub
		EightDoorAppraiseRankActSysCache.getRankTreeSet().clear();
		EightDoorAppraiseRankActSysCache.setRankObjArray(null);
		EightDoorAppraiseRankActSysCache.setSecordThirdObjArray(null);
		EightDoorAppraiseRankActSysCache.setFirstBodyId(0);
	}

	@Override
	public void heroActEnd(Hero hero) {
		// TODO Auto-generated method stub
	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		// TODO Auto-generated method stub
		EightDoorAppraiseRankAct model = new EightDoorAppraiseRankAct(hero.getId(), activityInfo.getIndex(),
				activityInfo.getActId(), activityInfo.getPeriods());
		return model;
	}

	@Override
	public Class<?> getActivityData() {
		// TODO Auto-generated method stub
		return EightDoorAppraiseRankAct.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		// TODO Auto-generated method stub
		return EightDoorAppraiseRankActEvent.getIns();
	}

}
