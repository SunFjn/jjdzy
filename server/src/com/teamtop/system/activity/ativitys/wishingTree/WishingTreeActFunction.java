package com.teamtop.system.activity.ativitys.wishingTree;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.wishingTree.model.WishingTreeAct;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

import excel.struct.Struct_xysslb_328;

public class WishingTreeActFunction {
	private static WishingTreeActFunction ins;

	private WishingTreeActFunction() {
	}

	public static synchronized WishingTreeActFunction getIns() {
		if (ins == null) {
			ins = new WishingTreeActFunction();
		}
		return ins;
	}

	public void targetHandler(Hero hero, WishingTreeAct model) {
		// TODO Auto-generated method stub
		int times = 0;
		try {
			Map<Integer, Integer> awardStateMap = model.getAwardStateMap();
			times = model.getParameter();
			int periods = model.getPeriods();
			List<Struct_xysslb_328> list = WishingTreeActSysCache.getTargetConfigMap().get(periods);
			int size = list.size();
			for (int i = 0; i < size; i++) {
				Struct_xysslb_328 struct_xysslb_328 = list.get(i);
				int id = struct_xysslb_328.getId();
				if (times >= struct_xysslb_328.getTime() && awardStateMap.get(id) == null) {
					awardStateMap.put(id, WishingTreeActConst.CAN_GET);
				}
			}

		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "WishingTreeActFunction targetHandler times:" + times);
		}
	}

	/**
	 * 登录推送图标显示红点
	 * 
	 * @param hero
	 */
	public void loginRed(Hero hero) {
		try {
			boolean checkHeroActOpen = ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.WISHING_TREE_ACT);
			if (!checkHeroActOpen) {
				return;
			}
			WishingTreeAct model = (WishingTreeAct) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.WISHING_TREE_ACT);
			if (model == null)
				return;
			Map<Integer, Integer> awards = model.getAwards();
			if(awards == null) return;
			for(Integer num : awards.values()) {
				if(num > 0) {
					RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.WISHING_TREE_ACT,
							WishingTreeActConst.RED_POINT,
							RedPointConst.HAS_RED);
					break;
				}
			}
			Map<Integer, Integer> awardStateMap = model.getAwardStateMap();
			Iterator<Integer> iterator = awardStateMap.values().iterator();
			while (iterator.hasNext()) {
				Integer state = iterator.next();
				if (state == WishingTreeActConst.CAN_GET) {
					RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.WISHING_TREE_ACT,
							WishingTreeActConst.RED_POINT,
							RedPointConst.HAS_RED);
				}
			}
		}catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "WishingTreeActActFunction loginRed");
		}
	}

	/**
	 * 推送图标显示红点
	 * 
	 * @param hero
	 */
	public void checkRed(Hero hero) {
		try {
			boolean checkHeroActOpen = ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.WISHING_TREE_ACT);
			if (!checkHeroActOpen) {
				return;
			}
			WishingTreeAct model = (WishingTreeAct) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.WISHING_TREE_ACT);
			if (model == null)
				return;
			Map<Integer, Integer> awardStateMap = model.getAwardStateMap();
			Iterator<Integer> iterator = awardStateMap.values().iterator();
			while (iterator.hasNext()) {
				Integer state = iterator.next();
				if (state == WishingTreeActConst.CAN_GET) {
					RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.WISHING_TREE_ACT,
							WishingTreeActConst.RED_POINT,
							RedPointConst.HAS_RED);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "WishingTreeActFunction checkRed");
		}
	}
}
