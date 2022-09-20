package com.teamtop.system.activity.ativitys.shaoZhuQiYuanRankAct;

import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.shaoZhuQiYuanRankAct.model.ShaoZhuQiYuanRankAct;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.global.GlobalSender;
import com.teamtop.system.hero.Hero;

public class ShaoZhuQiYuanRankActManager extends AbstractActivityManager {
	private static volatile ShaoZhuQiYuanRankActManager ins = null;

	public static ShaoZhuQiYuanRankActManager getIns() {
		if (ins == null) {
			synchronized (ShaoZhuQiYuanRankActManager.class) {
				if (ins == null) {
					ins = new ShaoZhuQiYuanRankActManager();
				}
			}
		}
		return ins;
	}

	private ShaoZhuQiYuanRankActManager() {
	}

	@Override
	public void openUI(Hero hero) {
		// TODO Auto-generated method stub
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.SHAOZHU_QIYUANRANK_ACT)) {
			return;
		}
		ShaoZhuQiYuanRankAct model = (ShaoZhuQiYuanRankAct) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.SHAOZHU_QIYUANRANK_ACT);
		ShaoZhuQiYuanRankActFunction.getIns().heroDataHandle(model);
		int myTimes = model.getQiyuanTimes();
		int myRank = 0;
		Object[] rankObjArray = ShaoZhuQiYuanRankActSysCache.getRankObjArray();
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
		int firstBodyId = ShaoZhuQiYuanRankActSysCache.getFirstBodyId();
		int indexId = model.getIndexId();
		Object[] secordThirdObjArray = ShaoZhuQiYuanRankActSysCache.getSecordThirdObjArray();
		int endTime = ShaoZhuQiYuanRankActSysCache.getIndexConfigMap().get(indexId);
		GlobalSender.sendCmd_270(hero.getId(), ActivitySysId.SHAOZHU_QIYUANRANK_ACT, indexId, firstBodyId, rankObjArray,
				secordThirdObjArray, myTimes, myRank, endTime);
	}

	@Override
	public void actOpen() {
		// TODO Auto-generated method stub
		ShaoZhuQiYuanRankActSysCache.getRankTreeSet().clear();
		ShaoZhuQiYuanRankActSysCache.setRankObjArray(null);
		ShaoZhuQiYuanRankActSysCache.setSecordThirdObjArray(null);
		ShaoZhuQiYuanRankActSysCache.setFirstBodyId(0);
	}

	@Override
	public void heroActOpen(Hero hero) {
		// TODO Auto-generated method stub
	}

	@Override
	public void actEnd() {
		// TODO Auto-generated method stub
		ShaoZhuQiYuanRankActSysCache.getRankTreeSet().clear();
		ShaoZhuQiYuanRankActSysCache.setRankObjArray(null);
		ShaoZhuQiYuanRankActSysCache.setSecordThirdObjArray(null);
		ShaoZhuQiYuanRankActSysCache.setFirstBodyId(0);
	}

	@Override
	public void heroActEnd(Hero hero) {
		// TODO Auto-generated method stub
	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		// TODO Auto-generated method stub
		ShaoZhuQiYuanRankAct model = new ShaoZhuQiYuanRankAct(hero.getId(), activityInfo.getIndex(),
				activityInfo.getActId(), activityInfo.getPeriods());
		return model;
	}

	@Override
	public Class<?> getActivityData() {
		// TODO Auto-generated method stub
		return ShaoZhuQiYuanRankAct.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		// TODO Auto-generated method stub
		return ShaoZhuQiYuanRankActEvent.getIns();
	}

}
