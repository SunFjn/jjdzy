package com.teamtop.system.overCallbackYBSe;

import java.util.Iterator;
import java.util.Map;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.overCallbackYBSe.model.OverCallbackYBSe;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.struct.Struct_ybfl1_735;

public class OverCallbackYBSeFunction {

	private static OverCallbackYBSeFunction ins;

	public OverCallbackYBSeFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized OverCallbackYBSeFunction getIns() {
		if (ins == null) {
			ins = new OverCallbackYBSeFunction();
		}
		return ins;
	}

	/**
	 * 增加消耗道具数量
	 * 
	 * @param hero
	 * @param consumeNum
	 *            消耗道具数量
	 */
	public void addconsumeYBNum(Hero hero, int type, int itemId, long consumeYBNum) {
		int day = TimeDateUtil.betweenOpen();
		if (day >= OverCallbackYBSeConst.End_Open) {
			return;
		}
		if (type == GameConst.YUANBAO) {
			if (consumeYBNum > Integer.MAX_VALUE) {
				consumeYBNum = Integer.MAX_VALUE;
			}
			OverCallbackYBSe overCallbackYBSe = hero.getOverCallbackYBSe();
			int oldConsumeYBNum = overCallbackYBSe.getConsumeYBNum();
			overCallbackYBSe.setConsumeYBNum(oldConsumeYBNum + (int) consumeYBNum);
			updateAwardStateList(hero, overCallbackYBSe);
		}

	}

	/**
	 * 更新奖励状态列表
	 * 
	 * @param hero
	 */
	public void updateAwardStateList(Hero hero, OverCallbackYBSe overCallbackYBSe) {
		Map<Integer, Integer> awardStateMap = overCallbackYBSe.getAwardStateMap();
		int consumeYBNum = overCallbackYBSe.getConsumeYBNum();
		Map<Integer, Map<Integer, Struct_ybfl1_735>> ybConfigMap = OverCallbackYBSeCache.getYbConfigMap();
		int day = TimeDateUtil.betweenOpen();
		Map<Integer, Struct_ybfl1_735> map = ybConfigMap.get(day);
		Iterator<Struct_ybfl1_735> iterator = map.values().iterator();
		Struct_ybfl1_735 Struct_ybfl1_7352 = null;
		boolean update = false;
		for (; iterator.hasNext();) {
			Struct_ybfl1_7352 = iterator.next();
			int id = Struct_ybfl1_7352.getId();
			if (awardStateMap.containsKey(id)) {
				continue;
			}
			int[] needConsume = Struct_ybfl1_7352.getConsume()[0];
			if (consumeYBNum >= needConsume[2]) {
				awardStateMap.put(id, OverCallbackYBSeConst.CAN_GET);
				update = true;
			}
		}
		if(update) {			
			updateRedPoint(hero);
		}
	}

	/**
	 * 检测红点
	 * 
	 * @param hero
	 */
	public boolean checkRedPoint(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, OverCallbackYBSeConst.SysId)) {
				return false;
			}
			OverCallbackYBSe overCallbackYBSe = hero.getOverCallbackYBSe();
			Map<Integer, Integer> awardStateMap = overCallbackYBSe.getAwardStateMap();
			for (int state : awardStateMap.values()) {
				if (state == OverCallbackYBSeConst.CAN_GET) {
					return true;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, OverCallbackYBSeFunction.class, hero.getId(), hero.getName(),
					"OverCallbackYBSeFunction checkRedPoint");
		}
		return false;
	}

	/**
	 * 更新红点
	 * 
	 * @param hero
	 */
	public void updateRedPoint(Hero hero) {
		try {
			boolean redPoint = checkRedPoint(hero);
			if (redPoint) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.Act_OVERCALLBACK,
						OverCallbackYBSeConst.BX_REDPOINT, RedPointConst.HAS_RED);
				RedPointFunction.getIns().fastUpdateRedPoint(hero, OverCallbackYBSeConst.SysId,
						OverCallbackYBSeConst.BX_REDPOINT, RedPointConst.HAS_RED);
			} else {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.Act_OVERCALLBACK,
						OverCallbackYBSeConst.BX_REDPOINT, RedPointConst.HAS_RED);
				RedPointFunction.getIns().fastUpdateRedPoint(hero, OverCallbackYBSeConst.SysId,
						OverCallbackYBSeConst.BX_REDPOINT, RedPointConst.NO_RED);
			}
		} catch (Exception e) {
			LogTool.error(e, OverCallbackYBSeFunction.class, hero.getId(), hero.getName(),
					"OverCallbackYBSeFunction updateRedPoint");
		}
	}

}
