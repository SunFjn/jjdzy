package com.teamtop.system.activity.ativitys.dailyFirstRecharge;

import java.util.List;
import java.util.Map;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.dailyFirstRecharge.model.DailyFirstRecharge;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_mrbx_715;
import excel.struct.Struct_mrbx_715;

public class DailyFirstRechargeFunction {

	private static DailyFirstRechargeFunction ins;

	public static DailyFirstRechargeFunction getIns() {
		if (ins == null) {
			ins = new DailyFirstRechargeFunction();
		}
		return ins;
	}

	/**
	 * 每日首充+1
	 * 
	 * @param hero
	 */
	public void addRechargeDay(Hero hero, int money) {
		int currentTime = TimeDateUtil.getCurrentTime();
		DailyFirstRecharge dailyFirstRecharge = (DailyFirstRecharge) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.Act_DailyRecharge);
		int flag = 0;
		int oneDayRecharge = hero.getOneDayRecharge()+money;
		if(oneDayRecharge<6){
			return;
		}
		if (!TimeDateUtil.compareTimeForSameDay(currentTime, dailyFirstRecharge.getRecentlyRechargeTime())) {
			int rechargeDay = dailyFirstRecharge.getRechargeDay();
			dailyFirstRecharge.setRechargeDay(rechargeDay + 1);
			dailyFirstRecharge.setIsGetted(DailyFirstRechargeConst.CAN_GET); // 每日首充奖励领取状态改为可领取
			Map<Integer, Struct_mrbx_715> map = Config_mrbx_715.getIns().getMap();
			List<Integer> baoXiangList = dailyFirstRecharge.getBaoXiangList();
			int size = baoXiangList.size();
			int newRechargeDay = dailyFirstRecharge.getRechargeDay();
			for (int i = 1; i <= size; i++) { // 更新宝箱状态列表
				int baoxiangState = baoXiangList.get(i - 1);
				if (baoxiangState == DailyFirstRechargeConst.CAN_GET) {
					flag = 1;
				}
				if (baoxiangState == DailyFirstRechargeConst.NOT_REACH) {
					int need = map.get(i).getNEED();
					if (newRechargeDay == need) {
						baoXiangList.set(i - 1, DailyFirstRechargeConst.CAN_GET);
						if (flag == 0) {
							flag = 2;
						}
					}
					break;
				}
			}
			dailyFirstRecharge.setRecentlyRechargeTime(currentTime); // 设置最近一次充值时间
			RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.Act_DailyRecharge, // 领取按钮红点
					DailyFirstRechargeConst.BUTTON_REDPOINT, RedPointConst.HAS_RED);
			if (flag == 2) {// 当之前没有宝箱奖励现在满足条件时出现红点
				RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.Act_DailyRecharge,
						DailyFirstRechargeConst.BX_REDPOINT, RedPointConst.HAS_RED);
			}
			DailyFirstRechargeManager.getIns().openUI(hero);
		}
	}

	/**
	 * 登录发送红点
	 * 
	 * @param hero
	 */
	public void loginSendRedPoint(Hero hero) {
		DailyFirstRecharge dailyFirstRecharge = (DailyFirstRecharge) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.Act_DailyRecharge);
		List<Integer> awardStateList = dailyFirstRecharge.getBaoXiangList();
		for (int state : awardStateList) {
			if (state == DailyFirstRechargeConst.CAN_GET) {// 有可领取宝箱奖励红点
				RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.Act_DailyRecharge,
						DailyFirstRechargeConst.BX_REDPOINT, RedPointConst.HAS_RED);
				break;
			}
		}
		if (dailyFirstRecharge.getIsGetted() == DailyFirstRechargeConst.CAN_GET) {// 领取按钮红点
			RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.Act_DailyRecharge,
					DailyFirstRechargeConst.BUTTON_REDPOINT, RedPointConst.HAS_RED);
		}
	}

	/**
	 * 快速发送红点
	 * 
	 * @param hero
	 */
	public void fastSendRedPoint(Hero hero) {
		DailyFirstRecharge dailyFirstRecharge = (DailyFirstRecharge) ActivityFunction.getIns().getActivityData(hero,
				ActivitySysId.Act_DailyRecharge);
		List<Integer> awardStateList = dailyFirstRecharge.getBaoXiangList();
		for (int state : awardStateList) {
			if (state == DailyFirstRechargeConst.CAN_GET) {// 有可领取宝箱奖励红点
				RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.Act_DailyRecharge,
						DailyFirstRechargeConst.BX_REDPOINT, RedPointConst.HAS_RED);
				break;
			}
		}
		if (dailyFirstRecharge.getIsGetted() == DailyFirstRechargeConst.CAN_GET) {// 领取按钮红点
			RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.Act_DailyRecharge,
					DailyFirstRechargeConst.BUTTON_REDPOINT, RedPointConst.HAS_RED);
		}
	}

	/**
	 * 判断是否开启(首充第二天开启)
	 * 
	 * @param hero
	 * @return
	 */
	public boolean isOpen(Hero hero) {
		boolean isOpen = false;
		if (hero.getFirstRechargeTime() != 0) {
			int secondFirstRechargeZeroTime = TimeDateUtil.getOneDayZeroTime(hero.getFirstRechargeTime())
					+ TimeDateUtil.SECONDS_IN_DAY;
			int currentTime = TimeDateUtil.getCurrentTime();
			if (currentTime >= secondFirstRechargeZeroTime) {
				isOpen = true;
			}
		}
		return isOpen;
	}

}
