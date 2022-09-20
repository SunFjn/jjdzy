package com.teamtop.system.exclusiveActivity.exOverCallbackYBSe;

import java.util.Iterator;
import java.util.Map;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.exclusiveActivity.ExclusiveActivityFunction;
import com.teamtop.system.exclusiveActivity.exOverCallbackYBSe.model.ExActOverCallbackYBSe;
import com.teamtop.system.exclusiveActivity.model.ExclusiveActivityData;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

import excel.struct.Struct_zshdybfl_315;

public class ExActOverCallbackYBSeFunction {

	private static ExActOverCallbackYBSeFunction ins;

	public ExActOverCallbackYBSeFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized ExActOverCallbackYBSeFunction getIns() {
		if (ins == null) {
			ins = new ExActOverCallbackYBSeFunction();
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
	public void addconsumeYBNum(Hero hero, int type, int itemId, long consumeYBNum, int id) {
//		if (!ExclusiveActivityFunction.getIns().checkHeroExActOpen(hero, id)) {
//			return;
//		}
		if(!ExclusiveActivityFunction.getIns().checkHasData(hero, id)) {
			return;
		}
		if (type == GameConst.YUANBAO) {
			if (consumeYBNum > Integer.MAX_VALUE) {
				consumeYBNum = Integer.MAX_VALUE;
			}
			ExclusiveActivityData activityData = hero.getExclusiveActivityData();
			ExActOverCallbackYBSe overCallbackYBSe = (ExActOverCallbackYBSe) activityData.getExActivityMap().get(id);
			int oldConsumeYBNum = overCallbackYBSe.getConsumeYBNum();
			overCallbackYBSe.setConsumeYBNum(oldConsumeYBNum + (int) consumeYBNum);
			updateAwardStateList(hero, overCallbackYBSe, id);
		}

	}

	/**
	 * 更新奖励状态列表
	 * 
	 * @param hero
	 */
	public void updateAwardStateList(Hero hero, ExActOverCallbackYBSe overCallbackYBSe, int id) {
		Map<Integer, Integer> awardStateMap = overCallbackYBSe.getAwardStateMap();
		int consumeYBNum = overCallbackYBSe.getConsumeYBNum();
		Map<Integer, Map<Integer, Struct_zshdybfl_315>> ybConfigMap = ExActOverCallbackYBSeCache.getYbConfigMap();
		int qs = overCallbackYBSe.getQs();
		Map<Integer, Struct_zshdybfl_315> map = ybConfigMap.get(qs);
		if (map == null) {
			return;
		}
		Iterator<Struct_zshdybfl_315> iterator = map.values().iterator();
		Struct_zshdybfl_315 zshdybfl_315 = null;
		boolean update = false;
		for (; iterator.hasNext();) {
			zshdybfl_315 = iterator.next();
			int index = zshdybfl_315.getId();
			if (awardStateMap.containsKey(index)) {
				continue;
			}
			int[] needConsume = zshdybfl_315.getXh()[0];
			if (consumeYBNum >= needConsume[2]) {
				awardStateMap.put(index, ExActOverCallbackYBSeConst.CAN_GET);
				update = true;
			}
		}
		if(update) {			
			updateRedPoint(hero, id);
		}
	}

	/**
	 * 检测红点
	 * 
	 * @param hero
	 */
	public boolean checkRedPoint(Hero hero, int id) {
		try {
//			if (!ExclusiveActivityFunction.getIns().checkHeroExActOpen(hero, id)) {
//				return false;
//			}
			if(!ExclusiveActivityFunction.getIns().checkHasData(hero, id)) {
				return false;
			}
			ExclusiveActivityData activityData = hero.getExclusiveActivityData();
			ExActOverCallbackYBSe overCallbackYBSe = (ExActOverCallbackYBSe) activityData.getExActivityMap().get(id);
			Map<Integer, Integer> awardStateMap = overCallbackYBSe.getAwardStateMap();
			for (int state : awardStateMap.values()) {
				if (state == ExActOverCallbackYBSeConst.CAN_GET) {
					return true;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, ExActOverCallbackYBSeFunction.class, hero.getId(), hero.getName(),
					"OverCallbackYBSeFunction checkRedPoint");
		}
		return false;
	}

	/**
	 * 更新红点
	 * 
	 * @param hero
	 */
	public void updateRedPoint(Hero hero, int id) {
		try {
			boolean redPoint = checkRedPoint(hero, id);
			if (redPoint) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.EXACT_ACT, 1, RedPointConst.HAS_RED);
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.EXCLUSIVE_YB_BACK,
						id, RedPointConst.HAS_RED);
			} else {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.EXACT_ACT, 1, RedPointConst.NO_RED);
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.EXCLUSIVE_YB_BACK,
						id, RedPointConst.NO_RED);
			}
		} catch (Exception e) {
			LogTool.error(e, ExActOverCallbackYBSeFunction.class, hero.getId(), hero.getName(),
					"OverCallbackYBSeFunction updateRedPoint");
		}
	}

}
