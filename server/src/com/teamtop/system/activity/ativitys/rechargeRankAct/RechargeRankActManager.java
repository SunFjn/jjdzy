package com.teamtop.system.activity.ativitys.rechargeRankAct;

import java.util.TreeSet;

import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.rechargeRankAct.cross.CrossRechargeRankActLC;
import com.teamtop.system.activity.ativitys.rechargeRankAct.model.RechargeRankAct;
import com.teamtop.system.activity.ativitys.rechargeRankAct.model.RechargeRankActModel;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.fashionClothes.FashionClothesManager;
import com.teamtop.system.hero.Hero;

public class RechargeRankActManager extends AbstractActivityManager {
	private static volatile RechargeRankActManager ins = null;

	public static RechargeRankActManager getIns() {
		if (ins == null) {
			synchronized (RechargeRankActManager.class) {
				if (ins == null) {
					ins = new RechargeRankActManager();
				}
			}
		}
		return ins;
	}

	private RechargeRankActManager() {
	}

	@Override
	public void openUI(Hero hero) {
		// TODO Auto-generated method stub
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.CROSS_RECHARGE_RANK_ACT)) {
			return;
		}
		RechargeRankAct consumeRankAct = (RechargeRankAct) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.CROSS_RECHARGE_RANK_ACT);
		RechargeRankActFunction.getIns().heroDataHandle(consumeRankAct);
		int myRecharge = consumeRankAct.getTotalRecharge();
		int qs = consumeRankAct.getPeriods();
		int myRank = 0;
		Object[] openUIObjArray = RechargeRankActSysCache.getOpenUIObjArray();
		if (openUIObjArray != null) {
			for (Object obj : openUIObjArray) {
				Object[] objArray = (Object[]) obj;
				String name = (String) objArray[1];
				if (hero.getNameZoneid().equals(name)) {
					myRank = (Integer) objArray[0];
					objArray[2] = myRecharge;
				}
			}
		}
		TreeSet<RechargeRankActModel> rankTreeSet = RechargeRankActSysCache.getRankTreeSet();
		int firstBodyid = 0;
		int firstWeaponModel = 0;
		int firstMountId = 0;
		if (rankTreeSet.size() > 0) {
			RechargeRankActModel firstModel = rankTreeSet.first();
			if (firstModel.getRank() == 1) {
				firstBodyid = FashionClothesManager.getIns().getBodyid(firstModel.getJob(), firstModel.getBodyId());
				firstWeaponModel = firstModel.getWeaponModel();
				firstMountId = firstModel.getMountId();
			}
		}
		RechargeRankActSender.sendCmd_8690(hero.getId(), openUIObjArray, firstBodyid, firstWeaponModel, myRank,
				myRecharge, qs,firstMountId);
	}

	@Override
	public void actOpen() {
		// TODO Auto-generated method stub
		RechargeRankActSysCache.getRankTreeSet().clear();
		RechargeRankActSysCache.setOpenUIObjArray(null);
	}

	@Override
	public void heroActOpen(Hero hero) {
		// TODO Auto-generated method stub
		int oneDayRecharge = hero.getOneDayRecharge();
		if (oneDayRecharge > 0) {
			CrossRechargeRankActLC.getIns().addUpdateConsumeRankListToCen(hero, oneDayRecharge * 100, 0);
		}
	}

	@Override
	public void actEnd() {
		// TODO Auto-generated method stub
		RechargeRankActSysCache.getRankTreeSet().clear();
		RechargeRankActSysCache.setOpenUIObjArray(null);
	}

	@Override
	public void heroActEnd(Hero hero) {
		// TODO Auto-generated method stub
	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		// TODO Auto-generated method stub
		RechargeRankAct consumeRankAct = new RechargeRankAct(hero.getId(), activityInfo.getIndex(),
				activityInfo.getActId(), activityInfo.getPeriods());
		return consumeRankAct;
	}

	@Override
	public Class<?> getActivityData() {
		// TODO Auto-generated method stub
		return RechargeRankAct.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.CROSS_RECHARGE_RANK_ACT)) {
			return;
		}
		RechargeRankAct consumeRankAct = (RechargeRankAct) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.CROSS_RECHARGE_RANK_ACT);
		RechargeRankActFunction.getIns().heroDataHandle(consumeRankAct);
		CrossRechargeRankActLC.getIns().addUpdateConsumeRankListToCen(hero, money * 100, 0);
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		// TODO Auto-generated method stub
		return RechargeRankActEvent.getIns();
	}

}
