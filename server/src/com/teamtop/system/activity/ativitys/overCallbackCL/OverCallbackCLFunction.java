package com.teamtop.system.activity.ativitys.overCallbackCL;

import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.overCallbackCL.model.OverCallbackCL;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.struct.Struct_clfl2_736;

public class OverCallbackCLFunction {
	private static OverCallbackCLFunction ins = null;

	public static OverCallbackCLFunction getIns() {
		if (ins == null) {
			ins = new OverCallbackCLFunction();
		}
		return ins;
	}

	private OverCallbackCLFunction() {
	}

	/**
	 * 增加消耗道具数量
	 * 
	 * @param hero
	 * @param consumeNum 消耗道具数量
	 */
	public void addconsumeNum(Hero hero, int type, int itemId, long consumeNum) {
		if (ActivityFunction.getIns().getActivityData(hero, ActivitySysId.Act_OVERCALLBACK_CL) != null) {
			int openDays = TimeDateUtil.betweenOpen();
			if (openDays < 8) {
				return;
			}
			int week = TimeDateUtil.getWeek();
			Map<Integer, Struct_clfl2_736> map = OverCallbackCLCache.getClConfigMap().get(week);
			Struct_clfl2_736 struct_clfl2_736 = null;
			for(Struct_clfl2_736 clfl : map.values()) {
				struct_clfl2_736 = clfl;
				break;
			}
			int[][] consume = struct_clfl2_736.getConsume();
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
				OverCallbackCL overCallbackCL = (OverCallbackCL) ActivityFunction.getIns().getActivityData(hero,
						ActivitySysId.Act_OVERCALLBACK_CL);
				int oldConsumeNum = overCallbackCL.getConsumeNum();
				overCallbackCL.setConsumeNum(oldConsumeNum + (int) consumeNum);
				updateAwardStateList(hero, overCallbackCL);
			}
		}

	}

	/**
	 * 更新奖励状态列表
	 * 
	 * @param hero
	 */
	public void updateAwardStateList(Hero hero, OverCallbackCL overCallbackCL) {
		Map<Integer, Integer> awardStateMap = overCallbackCL.getAwardStateMap();
		int consumeNum = overCallbackCL.getConsumeNum();
		Map<Integer, Map<Integer, Struct_clfl2_736>> clConfigMap = OverCallbackCLCache.getClConfigMap();
		int week = TimeDateUtil.getWeek();
		Map<Integer, Struct_clfl2_736> map = clConfigMap.get(week);
		Iterator<Struct_clfl2_736> iterator = map.values().iterator();
		Struct_clfl2_736 struct_clfl2_736 = null;
		for (; iterator.hasNext();) {
			struct_clfl2_736 = iterator.next();
			int id = struct_clfl2_736.getId();
			if (awardStateMap.containsKey(id)) {
				continue;
			}
			int[] needConsume = struct_clfl2_736.getConsume()[0];
			if (consumeNum >= needConsume[2]) {
				awardStateMap.put(id, OverCallbackCLConst.CAN_GET);
				fastSendRedPoint(hero);
			}
		}
	}

	/**
	 * 登录发送红点
	 * 
	 * @param hero
	 */
	public void loginSendRedPoint(Hero hero) {
		OverCallbackCL overCallbackCL = (OverCallbackCL) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.Act_OVERCALLBACK_CL);
		Map<Integer, Integer> awardStateMap = overCallbackCL.getAwardStateMap();
		for (int state : awardStateMap.values()) {
			if (state == OverCallbackCLConst.CAN_GET) {
				RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.Act_OVERCALLBACK,
						OverCallbackCLConst.BX_REDPOINT, RedPointConst.HAS_RED);
				RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.Act_OVERCALLBACK_CL,
						OverCallbackCLConst.BX_REDPOINT, RedPointConst.HAS_RED);
				break;
			}
		}
	}

	/**
	 * 快速发送红点
	 * 
	 * @param hero
	 */
	public void fastSendRedPoint(Hero hero) {
		OverCallbackCL overCallbackCL = (OverCallbackCL) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.Act_OVERCALLBACK_CL);
		Map<Integer, Integer> awardStateMap = overCallbackCL.getAwardStateMap();
		for (int state : awardStateMap.values()) {
			if (state == OverCallbackCLConst.CAN_GET) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.Act_OVERCALLBACK,
						OverCallbackCLConst.BX_REDPOINT, RedPointConst.HAS_RED);
				RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.Act_OVERCALLBACK_CL,
						OverCallbackCLConst.BX_REDPOINT, RedPointConst.HAS_RED);
				return;
			}
		}
		RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.Act_OVERCALLBACK,
				OverCallbackCLConst.BX_REDPOINT, RedPointConst.NO_RED);
		RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.Act_OVERCALLBACK_CL,
				OverCallbackCLConst.BX_REDPOINT, RedPointConst.NO_RED);
	}

	/**
	 * 补发奖励
	 * 
	 * @param hero
	 */
	public void sendAward(Hero hero) {
		int week = -1;
		try {
			int openDays = TimeDateUtil.betweenOpen();
			if (openDays < 8) {
				return;
			}
			OverCallbackCL overCallbackCL = (OverCallbackCL) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.Act_OVERCALLBACK_CL);
			Map<Integer, Integer> awardStateMap = overCallbackCL.getAwardStateMap();
			week = overCallbackCL.getWeek();
			Map<Integer, Struct_clfl2_736> map = OverCallbackCLCache.getClConfigMap().get(week);
			Iterator<Entry<Integer, Integer>> iterator = awardStateMap.entrySet().iterator();
			for (; iterator.hasNext();) {
				Entry<Integer, Integer> entry = iterator.next();
				int id = entry.getKey();
				int state = entry.getValue();
				if (state == OverCallbackCLConst.CAN_GET) {
					entry.setValue(OverCallbackCLConst.GETTED);
					Struct_clfl2_736 struct_clfl2_736 = map.get(id);
					if (struct_clfl2_736 == null) {
						LogTool.info(hero.getId(), hero.getName(), "OverCallbackCL sendAward id=" + id,
								OverCallbackCLFunction.class);
					}
					int[][] reward = struct_clfl2_736.getReward();
					MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.OVERCALLBACKCL,
							new Object[] { MailConst.OVERCALLBACKCL }, reward);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, OverCallbackCLFunction.class, hero.getId(), hero.getName(),
					"OverCallbackCL sendAward fail week=" + week);
		}
	}

}
