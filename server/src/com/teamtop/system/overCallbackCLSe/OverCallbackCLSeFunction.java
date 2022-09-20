package com.teamtop.system.overCallbackCLSe;

import java.util.Iterator;
import java.util.Map;

import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.overCallbackCLSe.model.OverCallbackCLSe;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.struct.Struct_clfl1_736;

public class OverCallbackCLSeFunction {

	private static OverCallbackCLSeFunction ins;

	private OverCallbackCLSeFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized OverCallbackCLSeFunction getIns() {
		if (ins == null) {
			ins = new OverCallbackCLSeFunction();
		}
		return ins;
	}

	/**
	 * 检测红点
	 * 
	 * @param hero
	 * @return
	 */
	public boolean checkRedPoint(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, OverCallbackCLSeConst.SysId)) {
				return false;
			}
			OverCallbackCLSe overCallbackCLSe = hero.getOverCallbackCLSe();
			Map<Integer, Integer> awardStateMap = overCallbackCLSe.getAwardStateMap();
			for (int state : awardStateMap.values()) {
				if (state != OverCallbackCLSeConst.GETTED) {
					return true;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, OverCallbackCLSeFunction.class, hero.getId(), hero.getName(),
					"OverCallbackCLSeFunction checkRedPoint");
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
			if (!HeroFunction.getIns().checkSystemOpen(hero, OverCallbackCLSeConst.SysId)) {
				return;
			}
			boolean redPoint = checkRedPoint(hero);
			if (redPoint) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.Act_OVERCALLBACK,
						OverCallbackCLSeConst.RedPoint, RedPointConst.HAS_RED);
				RedPointFunction.getIns().fastUpdateRedPoint(hero, OverCallbackCLSeConst.SysId,
						OverCallbackCLSeConst.RedPoint, RedPointConst.HAS_RED);
			} else {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.Act_OVERCALLBACK,
						OverCallbackCLSeConst.RedPoint, RedPointConst.NO_RED);
				RedPointFunction.getIns().fastUpdateRedPoint(hero, OverCallbackCLSeConst.SysId,
						OverCallbackCLSeConst.RedPoint, RedPointConst.NO_RED);
			}
		} catch (Exception e) {
			LogTool.error(e, OverCallbackCLSeFunction.class, hero.getId(), hero.getName(),
					"OverCallbackCLSeFunction updateRedPoint");
		}
	}

	/**
	 * 增加消耗道具数量
	 * 
	 * @param hero
	 * @param consumeNum
	 *            消耗道具数量
	 */
	public void addconsumeNum(Hero hero, int type, int itemId, long consumeNum) {
		// if (!HeroFunction.getIns().checkSystemOpen(hero,
		// OverCallbackCLSeConst.SysId)) {
		// return;
		// }
		int days = TimeDateUtil.betweenOpen();
		if (days >= OverCallbackCLSeConst.END_DAYS) {
			return;
		}
		Struct_clfl1_736 struct_clfl1_736 = OverCallbackCLSeCache.getTypeMap().get(days);
		int[][] consume = struct_clfl1_736.getConsume();
		boolean add = false;
		if (itemId == 0) {
			if (consume[0][0] == type) {
				add = true;
			}
		} else if (itemId == consume[0][1]) {
			add = true;
		}
		if (add) {
			if (consumeNum > Integer.MAX_VALUE) {
				consumeNum = Integer.MAX_VALUE;
			}
			OverCallbackCLSe overCallbackCLSe = hero.getOverCallbackCLSe();
			int oldConsumeNum = overCallbackCLSe.getConsumeNum();
			overCallbackCLSe.setConsumeNum(oldConsumeNum + (int) consumeNum);
			updateAward(hero);
		}
	}

	/**
	 * 检测更新奖励
	 */
	public void updateAward(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, OverCallbackCLSeConst.SysId)) {
				return;
			}
			int days = TimeDateUtil.betweenOpen();
			OverCallbackCLSe overCallbackCLSe = hero.getOverCallbackCLSe();
			int consumeNum = overCallbackCLSe.getConsumeNum();
			Map<Integer, Integer> awardStateMap = overCallbackCLSe.getAwardStateMap();
			Map<Integer, Map<Integer, Struct_clfl1_736>> clConfigMap = OverCallbackCLSeCache.getClConfigMap();
			Map<Integer, Struct_clfl1_736> map = clConfigMap.get(days);
			Iterator<Struct_clfl1_736> iterator = map.values().iterator();
			Struct_clfl1_736 struct_clfl1_736 = null;
			int[][] consume = null;
			boolean update = false;
			for (; iterator.hasNext();) {
				struct_clfl1_736 = iterator.next();
				int id = struct_clfl1_736.getId();
				if (awardStateMap.containsKey(id)) {
					continue;
				}
				consume = struct_clfl1_736.getConsume();
				if (consumeNum >= consume[0][2]) {
					awardStateMap.put(id, OverCallbackCLSeConst.CAN_GET);
					update = true;
				}
			}
			if (update) {
				OverCallbackCLSeFunction.getIns().updateRedPoint(hero);
			}
		} catch (Exception e) {
			LogTool.error(e, OverCallbackCLSeFunction.class, hero.getId(), hero.getName(),
					"OverCallbackCLSeFunction updateAward");
		}
	}

}
