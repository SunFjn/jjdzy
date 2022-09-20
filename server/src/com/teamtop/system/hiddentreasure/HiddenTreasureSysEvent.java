package com.teamtop.system.hiddentreasure;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hiddentreasure.model.HiddenTreasureModel;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

public class HiddenTreasureSysEvent extends AbsSystemEvent {

	private static HiddenTreasureSysEvent ins;

	private HiddenTreasureSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized HiddenTreasureSysEvent getIns() {
		if (ins == null) {
			ins = new HiddenTreasureSysEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		HiddenTreasureModel model = hero.getHiddenTreasureModel();
		if (model == null) {
			model = new HiddenTreasureModel();
			model.setHid(hero.getId());
			hero.setHiddenTreasureModel(model);
		}
	}

	@Override
	public void login(Hero hero) {
		boolean redPoint = HiddenTreasureFunction.getIns().checkRedPoint(hero);
		if (redPoint) {
			RedPointFunction.getIns().addLoginRedPoint(hero, HiddenTreasureConst.SysId, HiddenTreasureConst.RedPoint,
					RedPointConst.HAS_RED);
		}
	}

	@Override
	public void loginReset(Hero hero, int now) {
		reset(hero);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		reset(hero);
	}

	public void reset(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, HiddenTreasureConst.SysId)) {
				return;
			}
			HiddenTreasureModel model = hero.getHiddenTreasureModel();
			model.setUseTime(0);
			HiddenTreasureFunction.getIns().updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, HiddenTreasureSysEvent.class, "HiddenTreasureSysEvent reset");
		}
	}

	@Override
	public void zeroPub(int now) {
		// // 周一0点
		// int week = TimeDateUtil.getWeek();
		// if (week == 1) {
		// int qs = HiddenTreasureCache.getQS();
		// Map<Integer, Integer> qsNextMap = HiddenTreasureCache.getQsNextMap();
		// Integer nextQs = qsNextMap.get(qs);
		// if (nextQs == null) {
		// HiddenTreasureCache.setQS(1);
		// } else {
		// HiddenTreasureCache.setQS(nextQs);
		// }
		// }
	}

}
