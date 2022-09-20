package com.teamtop.system.activity.ativitys.overTurntable;

import java.util.List;
import java.util.Map;

import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.synHandleCore.orderedRunnable.RankingOpTaskRunnable;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.overTurntable.model.OverTurntable;
import com.teamtop.system.activity.ativitys.overTurntable.model.OverTurntableNoticeModel;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_czzpbox_726;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_czzpbox_726;

public class OverTurntableFunction {
	private static OverTurntableFunction ins = null;

	public static OverTurntableFunction getIns() {
		if (ins == null) {
			ins = new OverTurntableFunction();
		}
		return ins;
	}

	private OverTurntableFunction() {
	}

	/**
	 * 刷新获奖公告列表
	 * 
	 * @param hero
	 * @param awardId 为0用来改名
	 */
	public void refreshAwardNoticeList(final Hero hero, final int awardId) {
		try {
			OpTaskExecutorService.PublicOrderService.execute(new RankingOpTaskRunnable() {
				@Override
				public void run() {
					List<OverTurntableNoticeModel> awardNoticeList = OverTurntableSysCache.getAwardNoticeList();
					if (awardId == 0) {
						for (OverTurntableNoticeModel overTurntableNoticeModel : awardNoticeList) {
							if (overTurntableNoticeModel.getId() == hero.getId()) {
								overTurntableNoticeModel.setName(hero.getName());
							}
						}
					} else {
						OverTurntableNoticeModel overTurntableNoticeModel = new OverTurntableNoticeModel();
						overTurntableNoticeModel.setId(hero.getId());
						overTurntableNoticeModel.setName(hero.getName());
						overTurntableNoticeModel.setAwardId(awardId);
						int size = awardNoticeList.size();
						if (size < OverTurntableConst.AWARD_NOTICE_NUM) {
							awardNoticeList.add(overTurntableNoticeModel);
						} else {
							awardNoticeList.remove(0);
							awardNoticeList.add(overTurntableNoticeModel);
						}
					}
				}

				@Override
				public Object getSession() {
					return OpTaskConst.OVERTURNTABLE_AWARDNOTICE;
				}
			});
		} catch (Exception e) {
			LogTool.error(e, this, "OverTurntableFunction refreshAwardNoticeList has wrong");
		}
	}

	/**
	 * 消费元宝事件
	 * 
	 * @param hero
	 * @param yuanbao
	 */
	public void consumeYB(Hero hero, int yuanbao) {
		try {
			ActivityData activityData = ActivityFunction.getIns().getActivityData(hero,
					ActivitySysId.Act_OVERTURNTABLE);
			int redPointFlag = 0;
			if (activityData != null) {
				OverTurntable overTurntable = (OverTurntable) activityData;
				int consumeYb = overTurntable.getConsumeYb();
				int num = Config_xtcs_004.getIns().get(OverTurntableConst.CONSUMEYB_XTCS).getNum();
				int times = (yuanbao + consumeYb % num) / num;
				int restTimes = overTurntable.getRestTimes();
				if (restTimes == 0) {
					redPointFlag = 1;
				}
				overTurntable.setRestTimes(restTimes + times);
				overTurntable.setConsumeYb(consumeYb + yuanbao);
				if (overTurntable.getRestTimes() > 0) { // 拥有抽奖次数红点
//					sendRedPoint(hero, OverTurntableConst.RESTTIMES_REDPOINT);
					if (redPointFlag == 1) {
						redPointFlag = 2;
					}
				}
				if (redPointFlag == 2) {// 发送拥有抽奖次数红点
					RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.Act_OVERCALLBACK,
							OverTurntableConst.REDPOINT, RedPointConst.HAS_RED);
					RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.Act_OVERTURNTABLE,
							OverTurntableConst.REDPOINT, RedPointConst.HAS_RED);
				}
				updateAwardStateList(hero, false);
			}
		} catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName(),
					"OverTurntableFunction consumeYB has wrong" + "YB" + yuanbao);
		}
	}

	/**
	 * 更新宝箱奖励状态列表
	 * 
	 * @param hero
	 */
	public void updateAwardStateList(Hero hero, boolean isLogin) {
		OverTurntable overTurntable = (OverTurntable) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.Act_OVERTURNTABLE);
		int redPointFlag = 0;
		Map<Integer, Integer> bxAwardStateMap = overTurntable.getBxAwardStateMap();
		int consumeYb = overTurntable.getConsumeYb();
		List<Struct_czzpbox_726> sortList = Config_czzpbox_726.getIns().getSortList();
		int size = sortList.size();
		for (int i = 0; i < size; i++) {
			Struct_czzpbox_726 struct_czzpbox_726 = sortList.get(i);
			Integer state = bxAwardStateMap.get(struct_czzpbox_726.getId());
			if (state == null) {
				int needYB = struct_czzpbox_726.getCoin();
				if (consumeYb >= needYB) {
					bxAwardStateMap.put(struct_czzpbox_726.getId(), OverTurntableConst.CAN_GET);
					redPointFlag = 1;
				} else {
					break;
				}
			}
		}
		if (!isLogin && redPointFlag == 1) {// 当之前没有宝箱奖励现在满足条件时出现红点
			RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.Act_OVERCALLBACK,
					OverTurntableConst.REDPOINT, RedPointConst.HAS_RED);
			RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.Act_OVERTURNTABLE,
					OverTurntableConst.REDPOINT, RedPointConst.HAS_RED);
		}
	}

	/**
	 * 登录发送红点
	 * 
	 * @param hero
	 */
	public void loginSendRedPoint(Hero hero) {
		OverTurntable overTurntable = (OverTurntable) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.Act_OVERTURNTABLE);
		for (int state : overTurntable.getBxAwardStateMap().values()) {
			if (state == OverTurntableConst.CAN_GET) {// 有可领取宝箱奖励红点
				RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.Act_OVERCALLBACK,
						OverTurntableConst.REDPOINT, RedPointConst.HAS_RED);
				RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.Act_OVERTURNTABLE,
						OverTurntableConst.REDPOINT, RedPointConst.HAS_RED);
				return;
			}
		}
		if (overTurntable.getRestTimes() > 0) {// 发送拥有抽奖次数红点
			RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.Act_OVERCALLBACK,
					OverTurntableConst.REDPOINT, RedPointConst.HAS_RED);
			RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.Act_OVERTURNTABLE,
					OverTurntableConst.REDPOINT, RedPointConst.HAS_RED);
			return;
		}
	}

	/**
	 * 快速发送红点
	 * 
	 * @param hero
	 */
	public void fastSendRedPoint(Hero hero) {
		OverTurntable overTurntable = (OverTurntable) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.Act_OVERTURNTABLE);
		for (int state : overTurntable.getBxAwardStateMap().values()) {
			if (state == OverTurntableConst.CAN_GET) {// 有可领取宝箱奖励红点
				RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.Act_OVERCALLBACK,
						OverTurntableConst.REDPOINT, RedPointConst.HAS_RED);
				RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.Act_OVERTURNTABLE,
						OverTurntableConst.REDPOINT, RedPointConst.HAS_RED);
				return;
			}
		}
		if (overTurntable.getRestTimes() > 0) {// 发送拥有抽奖次数红点
			RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.Act_OVERCALLBACK,
					OverTurntableConst.REDPOINT, RedPointConst.HAS_RED);
			RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.Act_OVERTURNTABLE,
					OverTurntableConst.REDPOINT, RedPointConst.HAS_RED);
			return;
		}
	}
}
