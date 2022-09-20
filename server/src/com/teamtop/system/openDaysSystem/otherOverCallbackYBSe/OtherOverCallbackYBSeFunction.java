package com.teamtop.system.openDaysSystem.otherOverCallbackYBSe;

import java.util.Iterator;
import java.util.Map;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.otherOverCallbackYBSe.model.OtherOverCallbackYBSe;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.struct.Struct_ybfl3_735;

public class OtherOverCallbackYBSeFunction {

	private static OtherOverCallbackYBSeFunction ins;

	public OtherOverCallbackYBSeFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized OtherOverCallbackYBSeFunction getIns() {
		if (ins == null) {
			ins = new OtherOverCallbackYBSeFunction();
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
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.OTHER_BACK_YB)) {
			return;
		}
		if (type == GameConst.YUANBAO) {
			if (consumeYBNum > Integer.MAX_VALUE) {
				consumeYBNum = Integer.MAX_VALUE;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.OTHER_BACK_YB);
			OtherOverCallbackYBSe overCallbackYBSe = (OtherOverCallbackYBSe) OtherOverCallbackYBSeManager.getIns()
					.getSystemModel(hero, uid);
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
	public void updateAwardStateList(Hero hero, OtherOverCallbackYBSe overCallbackYBSe) {
		Map<Integer, Integer> awardStateMap = overCallbackYBSe.getAwardStateMap();
		int consumeYBNum = overCallbackYBSe.getConsumeYBNum();
		Map<Integer, Map<Integer, Struct_ybfl3_735>> ybConfigMap = OtherOverCallbackYBSeCache.getYbConfigMap();
		int day = TimeDateUtil.betweenOpen();
		Map<Integer, Struct_ybfl3_735> map = ybConfigMap.get(day);
		if (map == null) {
			return;
		}
		Iterator<Struct_ybfl3_735> iterator = map.values().iterator();
		Struct_ybfl3_735 Struct_ybfl3_7352 = null;
		boolean update = false;
		for (; iterator.hasNext();) {
			Struct_ybfl3_7352 = iterator.next();
			int id = Struct_ybfl3_7352.getId();
			if (awardStateMap.containsKey(id)) {
				continue;
			}
			int[] needConsume = Struct_ybfl3_7352.getConsume()[0];
			if (consumeYBNum >= needConsume[2]) {
				awardStateMap.put(id, OtherOverCallbackYBSeConst.CAN_GET);
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
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.OTHER_BACK_YB)) {
				return false;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.OTHER_BACK_YB);
			OtherOverCallbackYBSe overCallbackYBSe = (OtherOverCallbackYBSe) OtherOverCallbackYBSeManager.getIns()
					.getSystemModel(hero, uid);
			Map<Integer, Integer> awardStateMap = overCallbackYBSe.getAwardStateMap();
			for (int state : awardStateMap.values()) {
				if (state == OtherOverCallbackYBSeConst.CAN_GET) {
					return true;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, OtherOverCallbackYBSeFunction.class, hero.getId(), hero.getName(),
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
						OtherOverCallbackYBSeConst.BX_REDPOINT, RedPointConst.HAS_RED);
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.OTHER_BACK_YB,
						OtherOverCallbackYBSeConst.BX_REDPOINT, RedPointConst.HAS_RED);
			} else {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.Act_OVERCALLBACK,
						OtherOverCallbackYBSeConst.BX_REDPOINT, RedPointConst.HAS_RED);
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.OTHER_BACK_YB,
						OtherOverCallbackYBSeConst.BX_REDPOINT, RedPointConst.NO_RED);
			}
		} catch (Exception e) {
			LogTool.error(e, OtherOverCallbackYBSeFunction.class, hero.getId(), hero.getName(),
					"OverCallbackYBSeFunction updateRedPoint");
		}
	}

}
