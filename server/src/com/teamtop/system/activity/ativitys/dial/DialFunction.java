package com.teamtop.system.activity.ativitys.dial;

import java.util.List;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.dial.model.Dial;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_czzpreward_281;
import excel.struct.Struct_czzpreward_281;

public class DialFunction {

	private static DialFunction ins;

	private DialFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized DialFunction getIns() {
		if (ins == null) {
			ins = new DialFunction();
		}
		return ins;
	}

	public void rechargeHandle(Hero hero, int money) {
		long hid = hero.getId();
		try {
			boolean checkHeroActOpen = ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_DIAL);
			if (!checkHeroActOpen) {
				return;
			}
			Dial dial = (Dial) hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.ACT_DIAL);
			int totalRecharge = dial.getTotalRecharge();
			dial.setTotalRecharge(totalRecharge + money);
			updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, DialFunction.class, hid, hero.getName(), "DialFunction rechargeHandle");
		}
	}

	/**
	 * 更新红点
	 * 
	 * @param hero
	 */
	public void updateRedPoint(Hero hero) {
		try {
			boolean checkHeroActOpen = ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_DIAL);
			if (!checkHeroActOpen) {
				return;
			}
			boolean redPoint = checkRedPoint(hero);
			if (redPoint) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.ACT_DIAL,
						RedPointConst.RED_1, RedPointConst.HAS_RED);
			} else {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.ACT_DIAL,
						RedPointConst.RED_1, RedPointConst.NO_RED);
			}
		} catch (Exception e) {
			LogTool.error(e, DialFunction.class, hero.getId(), hero.getName(), "DialFunction updateRedPoint");
		}
	}

	/**
	 * 检测红点
	 * 
	 * @param hero
	 * @return
	 */
	public boolean checkRedPoint(Hero hero) {
		try {
			boolean checkHeroActOpen = ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_DIAL);
			if (!checkHeroActOpen) {
				return false;
			}
			Dial dial = (Dial) hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.ACT_DIAL);
			int totalRecharge = dial.getTotalRecharge();
			int turnNum = dial.getTurnNum();
			int periods = dial.getPeriods();
			List<Struct_czzpreward_281> sortList = Config_czzpreward_281.getIns().getSortList();
			int size = sortList.size();
			if (turnNum >= size) {
				// 已全部抽完
				return false;
			}
			int canTurn = 0;
			for (int i = 0; i < size; i++) {
				Struct_czzpreward_281 czzpreward_281 = sortList.get(i);
				int cz = czzpreward_281.getCz();
				int qs = czzpreward_281.getQs();
				if (periods != qs) {
					continue;
				}
				if (totalRecharge >= cz) {
					canTurn++;
				}
			}
			if (turnNum < canTurn) {
				return true;
			}
		} catch (Exception e) {
			LogTool.error(e, DialFunction.class, hero.getId(), hero.getName(), "DialFunction checkRedPoint");
		}
		return false;
	}

}
