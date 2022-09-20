package com.teamtop.system.openDaysSystem.wishingTree;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.teamtop.system.activity.ativitys.wishingTree.WishingTreeActConst;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.wishingTree.model.WishingTree;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

import excel.struct.Struct_xysslb_328;

public class WishingTreeFunction {
	private static WishingTreeFunction WishingTreeFunction;

	private WishingTreeFunction() {
	}

	public static synchronized WishingTreeFunction getIns() {
		if (WishingTreeFunction == null) {
			WishingTreeFunction = new WishingTreeFunction();
		}
		return WishingTreeFunction;
	}
	
	public void targetHandler(Hero hero, WishingTree model) {
		// TODO Auto-generated method stub
		int times = 0;
		try {
			times = model.getParameter();
			Map<Integer, Integer> awardStateMap = model.getAwardStateMap();
			int periods = model.getQs();
			List<Struct_xysslb_328> list = WishingTreeSysCache.getTargetConfigMap().get(periods);
			int size = list.size();
			for (int i = 0; i < size; i++) {
				Struct_xysslb_328 struct_xysslb_328 = list.get(i);
				int id = struct_xysslb_328.getId();
				if (times >= struct_xysslb_328.getTime() && awardStateMap.get(id) == null) {
					awardStateMap.put(id, WishingTreeConst.CAN_GET);
				}
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "WishingTreeFunction targetHandler times:" + times);
		}
	}

	/**
	 * 登录推送图标显示红点
	 * 
	 * @param hero
	 */
	public void loginRed(Hero hero) {
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.WISHING_TREE)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.WISHING_TREE);
			WishingTree model = (WishingTree) WishingTreeManager.getIns().getSystemModel(hero, uid);
			if (model == null)
				return;
			Map<Integer, Integer> awards = model.getAwards();
			if(awards == null) return;
			for(Integer num : awards.values()) {
				if(num > 0) {
					RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.WISHING_TREE, WishingTreeConst.RED_POINT,
							RedPointConst.HAS_RED);
					break;
				}
			}
			Map<Integer, Integer> awardStateMap = model.getAwardStateMap();
			Iterator<Integer> iterator = awardStateMap.values().iterator();
			while (iterator.hasNext()) {
				Integer state = iterator.next();
				if (state == WishingTreeConst.CAN_GET) {
					RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.WISHING_TREE,
							WishingTreeActConst.RED_POINT,
							RedPointConst.HAS_RED);
				}
			}
		}catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "WishingTreeFunction loginRed");
		}
	}

	/**
	 * 推送图标显示红点
	 * 
	 * @param hero
	 */
	public void checkRed(Hero hero) {
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.WISHING_TREE)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.WISHING_TREE);
			WishingTree model = (WishingTree) WishingTreeManager.getIns().getSystemModel(hero, uid);
			if (model == null)
				return;
			Map<Integer, Integer> awardStateMap = model.getAwardStateMap();
			Iterator<Integer> iterator = awardStateMap.values().iterator();
			while (iterator.hasNext()) {
				Integer state = iterator.next();
				if (state == WishingTreeConst.CAN_GET) {
					RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.WISHING_TREE,
							WishingTreeActConst.RED_POINT,
							RedPointConst.HAS_RED);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(), "WishingTreeFunction checkRed");
		}
	}
}
