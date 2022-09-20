package com.teamtop.system.activity.ativitys.godGenThisLifeAct;

import java.util.List;
import java.util.Map;

import com.teamtop.system.activity.ativitys.godGenThisLifeAct.model.GodGenThisLifeAct;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.log.LogTool;

import excel.struct.Struct_godmb_288;

public class GodGenThisLifeActFunction {

	private static volatile GodGenThisLifeActFunction ins = null;

	public static GodGenThisLifeActFunction getIns() {
		if (ins == null) {
			synchronized (GodGenThisLifeActFunction.class) {
				if (ins == null) {
					ins = new GodGenThisLifeActFunction();
				}
			}
		}
		return ins;
	}

	private GodGenThisLifeActFunction() {
	}

	public void targetHandler(Hero hero, GodGenThisLifeAct model) {
		// TODO Auto-generated method stub
		int times = 0;
		try {
			Map<Integer, Integer> awardStateMap = model.getAwardStateMap();
			times = model.getParameter();
			int periods = model.getPeriods();
			List<Struct_godmb_288> list = GodGenThisLifeActSysCache.getTargetConfigMap().get(periods);
			int size = list.size();
			for (int i = 0; i < size; i++) {
				Struct_godmb_288 struct_godmb_288 = list.get(i);
				int id = struct_godmb_288.getId();
				if (times >= struct_godmb_288.getTime() && awardStateMap.get(id) == null) {
					awardStateMap.put(id, GodGenThisLifeActConst.CAN_GET);
				}
			}

		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "GodGenThisLifeFunction targetHandler times:" + times);
		}
	}

}
