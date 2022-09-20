package com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationShop;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationShop.model.CelebrationShop;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.log.LogTool;

import excel.struct.Struct_sgqdsc_261;

public class CelebrationShopFunction {

	private static CelebrationShopFunction ins;

	public CelebrationShopFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized CelebrationShopFunction getIns() {
		if (ins == null) {
			ins = new CelebrationShopFunction();
		}
		return ins;
	}

	public boolean checkRedPoint(Hero hero) {
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.CELEBRATION_SHOP)) {
				return false;
			}
			CelebrationShop celebrationShop = (CelebrationShop) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.CELEBRATION_SHOP);
			Map<Integer, Integer> alreadyByMap = celebrationShop.getAlreadyByMap();
			Map<Integer, Map<Integer, Struct_sgqdsc_261>> qsMap = CelebrationShopSysCache.getQsMap();
			int id = 0;
			int qs = celebrationShop.getPeriods();
			Map<Integer, Struct_sgqdsc_261> map = qsMap.get(qs);
			Iterator<Integer> iterator = map.keySet().iterator();
			List<Object[]> list = new ArrayList<>();
			Struct_sgqdsc_261 sgqdsc_261 = null;
			int time = 0;
			for (; iterator.hasNext();) {
				id = iterator.next();
				sgqdsc_261 = map.get(id);
				Integer num = alreadyByMap.get(id);
				if (num == null) {
					num = 0;
				}
				time = sgqdsc_261.getTime();
				if (time == 0) {
					return true;
				}
				if (time > 0 && num < time) {
					return true;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, CelebrationShopFunction.class, hero.getId(), hero.getName(), "");
		}
		return false;
	}

}
