package com.teamtop.system.activity.ativitys.threeKingdomsCelebration.consumeRank;

import java.util.ArrayList;
import java.util.List;
import java.util.TreeSet;

import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.threeKingdomsCelebration.consumeRank.model.ConsumeRank;
import com.teamtop.system.activity.ativitys.threeKingdomsCelebration.consumeRank.model.ConsumeRankModel;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.crossCommonRank.CommonRankFunction;
import com.teamtop.system.crossCommonRank.CommonRankSysCache;
import com.teamtop.system.crossCommonRank.model.CommonRankModel;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.fashionClothes.FashionClothesManager;
import com.teamtop.system.hero.Hero;

public class ConsumeRankManager extends AbstractActivityManager {
	private static ConsumeRankManager ins = null;

	public static ConsumeRankManager getIns() {
		if (ins == null) {
			ins = new ConsumeRankManager();
		}
		return ins;
	}

	private ConsumeRankManager() {
	}

	@Override
	public void openUI(Hero hero) {
		// TODO Auto-generated method stub
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_CONSUMERANK)) {
			return;
		}
		ConsumeRank consumeRank = (ConsumeRank) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.ACT_CONSUMERANK);
		Object[] openUIObjArray = CommonRankSysCache.getOpenUIObjArray(ActivitySysId.ACT_CONSUMERANK);
		List<Object> rankArrayList = new ArrayList<>();
		int myRank = 0;
		int myConsume = consumeRank.getParameter();
		int rankFlag = 0;
		if (openUIObjArray != null) {
			for (Object obj : openUIObjArray) {
				Object[] objArray = (Object[]) obj;
				int rank = (Integer) objArray[0];
				for (int j = rankFlag; j < rank - 1; j++) {
					rankArrayList.add(new Object[] { "", 0 });
				}
				if (hero.getNameZoneid().equals((String) objArray[1])) {
					myRank = (Integer) objArray[0];
					if (myConsume > 0) {
						objArray[2] = myConsume;
					}
				}
				rankArrayList.add(new Object[] { (String) objArray[1], (Integer) objArray[2] });
				rankFlag = rank;
			}
		}
		for (int i = rankArrayList.size(); i < ConsumeRankConst.RANKMAXNUM; i++) {
			rankArrayList.add(new Object[] { "", 0 });
		}
		TreeSet<CommonRankModel> rankTreeSet = CommonRankSysCache.getRankTreeSet(ActivitySysId.ACT_CONSUMERANK);
		int firstBodyid = 0;
		int firstWeaponModel = 0;
		int firstMountId = 0;
		if (rankTreeSet.size() > 0) {
			ConsumeRankModel firstModel = (ConsumeRankModel) rankTreeSet.first();
			if (firstModel.getRank() == 1) {
				firstBodyid = FashionClothesManager.getIns().getBodyid(firstModel.getJob(), firstModel.getBodyId());
				firstWeaponModel = firstModel.getGodWeapon();
				firstMountId = firstModel.getMountId();
			}
		}
		ConsumeRankSender.sendCmd_4060(hero.getId(), rankArrayList.toArray(), firstBodyid, firstWeaponModel, myRank,
				myConsume, firstMountId);
	}

	@Override
	public void actOpen() {
		// TODO Auto-generated method stub
		CommonRankFunction.getIns().clearLocalCache(ActivitySysId.ACT_CONSUMERANK);
	}

	@Override
	public void heroActOpen(Hero hero) {
		// TODO Auto-generated method stub
		int oneDayConsume = hero.getOneDayConsume();
		if (oneDayConsume > 0) {
			ConsumeRankFunction.getIns().consumeYB(hero, oneDayConsume);
		}
	}

	@Override
	public void actEnd() {
		// TODO Auto-generated method stub
	}

	@Override
	public void heroActEnd(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		// TODO Auto-generated method stub
		ConsumeRank consumeRank = new ConsumeRank(hero.getId(), activityInfo.getIndex(), activityInfo.getActId(),
				activityInfo.getPeriods());
		return consumeRank;
	}

	@Override
	public Class<?> getActivityData() {
		// TODO Auto-generated method stub
		return ConsumeRank.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub

	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		// TODO Auto-generated method stub
		return ConsumeRankEvent.getIns();
	}

}
