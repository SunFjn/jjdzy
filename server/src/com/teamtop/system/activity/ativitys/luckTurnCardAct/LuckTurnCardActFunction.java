package com.teamtop.system.activity.ativitys.luckTurnCardAct;

import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.alibaba.fastjson.JSON;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.luckTurnCardAct.model.LuckTurnCardAct;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

import excel.struct.Struct_slfplsb_330;

public class LuckTurnCardActFunction {
	private static volatile LuckTurnCardActFunction ins = null;

	public static LuckTurnCardActFunction getIns() {
		if (ins == null) {
			synchronized (LuckTurnCardActFunction.class) {
				if (ins == null) {
					ins = new LuckTurnCardActFunction();
				}
			}
		}
		return ins;
	}

	private LuckTurnCardActFunction() {
	}

	/**
	 * 奖励状态处理
	 * 
	 * @param hero
	 * @param addTimes
	 */
	public void awardStateHandler(Hero hero, byte addTimes) {
		// TODO Auto-generated method stub
		LuckTurnCardAct model = null;
		int id = 0;
		try {
			model = (LuckTurnCardAct) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.LUCKTURNCARD_NEWACT);
			Map<Integer, Byte> awardStateMap = model.getAwardStateMap();
			int victoryTimes = model.getVictoryTimes();
			model.setVictoryTimes(victoryTimes + addTimes);
			int newTimes = model.getVictoryTimes();
			boolean flag = false;
			List<Struct_slfplsb_330> configList = LuckTurnCardActSysCache.getConfigListMap().get(model.getPeriods());
			for (Struct_slfplsb_330 struct_slfplsb_330 : configList) {
				id = struct_slfplsb_330.getId();
				if (newTimes >= struct_slfplsb_330.getCs() && awardStateMap.get(id) == null) {
					awardStateMap.put(id, LuckTurnCardActConst.CAN_GET);
					flag = true;
				}
			}

			if (flag) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.NEW_ACT, 1, RedPointConst.HAS_RED);
				RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.LUCKTURNCARD_NEWACT, 1,
						RedPointConst.HAS_RED);
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "LuckTurnCardActFunction awardStateHandler addTimes:"
					+ addTimes + " id:" + id + " modelStr:" + model == null ? "" : JSON.toJSONString(model));
		}
	}

	/**
	 * 红点发送
	 * 
	 * @param isLogin 是否登录状态
	 */
	public void redPoint(Hero hero, boolean isLogin) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.LUCKTURNCARD_NEWACT)) {
			return;
		}
		LuckTurnCardAct model = (LuckTurnCardAct) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.LUCKTURNCARD_NEWACT);
		Map<Integer, Byte> awardStateMap = model.getAwardStateMap();
		for (Entry<Integer, Byte> entry : awardStateMap.entrySet()) {
			Byte state = entry.getValue();
			if (state == LuckTurnCardActConst.CAN_GET) {
				if (isLogin) {
					RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.NEW_ACT, 1, RedPointConst.HAS_RED);
					RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.LUCKTURNCARD_NEWACT, 1,
							RedPointConst.HAS_RED);
					break;
				} else {
					RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.NEW_ACT, 1, RedPointConst.HAS_RED);
					RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.LUCKTURNCARD_NEWACT, 1,
							RedPointConst.HAS_RED);
					break;
				}
			}
		}
	}

}
