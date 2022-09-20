package com.teamtop.system.activity.ativitys.overCallbackYB;

import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.overCallbackYB.model.OverCallbackYB;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.struct.Struct_ybfl2_735;

public class OverCallbackYBFunction {
	private static OverCallbackYBFunction ins = null;

	public static OverCallbackYBFunction getIns() {
		if (ins == null) {
			ins = new OverCallbackYBFunction();
		}
		return ins;
	}

	private OverCallbackYBFunction() {
	}

	/**
	 * 增加消耗道具数量
	 * 
	 * @param hero
	 * @param consumeNum 消耗道具数量
	 */
	public void addconsumeYBNum(Hero hero, int type, int itemId, long consumeYBNum) {
		if (ActivityFunction.getIns().getActivityData(hero, ActivitySysId.Act_OVERCALLBACK_YB) != null
				&& type == GameConst.YUANBAO) {
			int openDays = TimeDateUtil.betweenOpen();
			if (openDays < 8) {
				return;
			}
			if (consumeYBNum > Integer.MAX_VALUE) {
				consumeYBNum = Integer.MAX_VALUE;
			}
			OverCallbackYB overCallbackYB = (OverCallbackYB) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.Act_OVERCALLBACK_YB);
			int oldConsumeYBNum = overCallbackYB.getConsumeYBNum();
			overCallbackYB.setConsumeYBNum(oldConsumeYBNum + (int) consumeYBNum);
			updateAwardStateList(hero, overCallbackYB);
			OverCallbackYBFunction.getIns().updateRedPoint(hero);
		}

	}

	/**
	 * 更新奖励状态列表
	 * 
	 * @param hero
	 */
	public void updateAwardStateList(Hero hero, OverCallbackYB overCallbackYB) {
		Map<Integer, Integer> awardStateMap = overCallbackYB.getAwardStateMap();
		int redPointFlag = 0;
		int consumeYBNum = overCallbackYB.getConsumeYBNum();
		Map<Integer, Map<Integer, Struct_ybfl2_735>> ybConfigMap = OverCallbackYBCache.getYbConfigMap();
		int week = TimeDateUtil.getWeek();
		Map<Integer, Struct_ybfl2_735> map = ybConfigMap.get(week);
		Iterator<Struct_ybfl2_735> iterator = map.values().iterator();
		Struct_ybfl2_735 struct_ybfl2_7352 = null;
		for (; iterator.hasNext();) {
			struct_ybfl2_7352 = iterator.next();
			int id = struct_ybfl2_7352.getId();
			if (awardStateMap.containsKey(id)) {
				continue;
			}
			int[] needConsume = struct_ybfl2_7352.getConsume()[0];
			if (consumeYBNum >= needConsume[2]) {
				awardStateMap.put(id, OverCallbackYBConst.CAN_GET);
				if (redPointFlag == 0) {
					redPointFlag = 2;
				}
			}
		}
	}

	/**
	 * 检查是否有红点
	 * @param hero
	 * @return
	 */
	public boolean checkRedPoint(Hero hero) {
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_OVERCALLBACK_YB)) {
				return false;
			}
			OverCallbackYB overCallbackYB = (OverCallbackYB) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.Act_OVERCALLBACK_YB);
			Map<Integer, Integer> awardStateMap = overCallbackYB.getAwardStateMap();
			for (int state : awardStateMap.values()) {
				if (state == OverCallbackYBConst.CAN_GET) {
					return true;
				}
			}
		} catch (Exception e) {
			// TODO: handle exception
		}
		return false;
	}

	/**
	 * 登录发送红点
	 * 
	 * @param hero
	 */
	public void loginSendRedPoint(Hero hero) {
		boolean redPont = checkRedPoint(hero);
		if (redPont) {
			RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.Act_OVERCALLBACK,
					OverCallbackYBConst.BX_REDPOINT, RedPointConst.HAS_RED);
			RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.Act_OVERCALLBACK_YB,
					OverCallbackYBConst.BX_REDPOINT, RedPointConst.HAS_RED);
		}
	}

	/**
	 * 快速发送红点
	 * 
	 * @param hero
	 */
	public void updateRedPoint(Hero hero) {
		boolean redPont = checkRedPoint(hero);
		if (redPont) {
			RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.Act_OVERCALLBACK,
					OverCallbackYBConst.BX_REDPOINT, RedPointConst.HAS_RED);
			RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.Act_OVERCALLBACK_YB,
					OverCallbackYBConst.BX_REDPOINT, RedPointConst.HAS_RED);
		} else {
			RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.Act_OVERCALLBACK_YB,
					OverCallbackYBConst.BX_REDPOINT, RedPointConst.NO_RED);
		}
	}

	public void sendAward(Hero hero) {
		int week = -1;
		try {
			int openDays = TimeDateUtil.betweenOpen();
			if (openDays < 8) {
				return;
			}
			OverCallbackYB overCallbackYB = (OverCallbackYB) ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.Act_OVERCALLBACK_YB);
			Map<Integer, Integer> awardStateMap = overCallbackYB.getAwardStateMap();
			week = overCallbackYB.getWeek();
			Map<Integer, Struct_ybfl2_735> map = OverCallbackYBCache.getYbConfigMap().get(week);
			Iterator<Entry<Integer, Integer>> iterator = awardStateMap.entrySet().iterator();
			Entry<Integer, Integer> entry = null;
			for (; iterator.hasNext();) {
				entry = iterator.next();
				int state = entry.getValue();
				if (state == OverCallbackYBConst.CAN_GET) {
					entry.setValue(OverCallbackYBConst.GETTED);
					Struct_ybfl2_735 struct_ybfl2_735 = map.get(entry.getKey());
					if(struct_ybfl2_735==null) {
						LogTool.info(hero.getId(), hero.getName(), "OverCallbackYBFunction sendAward id=" + entry.getKey(),
								OverCallbackYBFunction.class);
					}
					int[][] reward = struct_ybfl2_735.getReward();
					MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.OVERCALLBACKYB,
							new Object[] { MailConst.OVERCALLBACKYB }, reward);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, OverCallbackYBFunction.class, hero.getId(), hero.getName(),
					"OverCallbackYBFunction sendAward week=" + week);
		}
	}
}
