package com.teamtop.system.activity.ativitys.skyRichGift;

import java.util.List;
import java.util.Set;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.skyRichGift.model.SkyRichGiftData;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

import excel.struct.Struct_tjhl_335;

public class SkyRichGiftDataFunction {

	private static SkyRichGiftDataFunction ins;

	private SkyRichGiftDataFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized SkyRichGiftDataFunction getIns() {
		if (ins == null) {
			ins = new SkyRichGiftDataFunction();
		}
		return ins;
	}

	/**
	 * 更新红点
	 * @param hero
	 */
	public void updateRedPoint(Hero hero) {
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_SKY_RICH_GIFT)) {
				return;
			}
			boolean checkRedPoint = checkRedPoint(hero);
			if (checkRedPoint) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.ACT_SKY_RICH_GIFT, RedPointConst.RED_1,
						RedPointConst.HAS_RED);
			} else {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.ACT_SKY_RICH_GIFT, RedPointConst.RED_1,
						RedPointConst.NO_RED);
			}
		} catch (Exception e) {
			LogTool.error(e, SkyRichGiftDataFunction.class, hero.getId(), hero.getName(),
					"SkyRichGiftDataFunction updateRedPoint");
		}
	}

	/**
	 * 检测红点
	 * @param hero
	 * @return
	 */
	public boolean checkRedPoint(Hero hero) {
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_SKY_RICH_GIFT)) {
				return false;
			}
			SkyRichGiftData model = (SkyRichGiftData) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.ACT_SKY_RICH_GIFT);
			int rechargeValue = model.getRechargeValue();
			Set<Integer> rewardSet = model.getRewardSet();
			List<Struct_tjhl_335> list = SkyRichGiftDataSysCache.getQsMap().get(model.getPeriods());
			int size = list.size();
			for (int i = 0; i < size; i++) {
				Struct_tjhl_335 struct_tjhl_335 = list.get(i);
				if (rewardSet.contains(struct_tjhl_335.getId())) {
					continue;
				}
				if (rechargeValue >= struct_tjhl_335.getLj()) {
					return true;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, SkyRichGiftDataFunction.class, hero.getId(), hero.getName(),
					"SkyRichGiftDataFunction checkRedPoint");
		}
		return false;

	}

}
