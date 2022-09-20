package com.teamtop.system.openDaysSystem.otherNewOneRecharge;

import java.util.HashMap;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.OpenDaysSystemSysCache;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_dbcz3_733;
import excel.config.Config_hdfl_012;
import excel.struct.Struct_dbcz3_733;
import excel.struct.Struct_hdfl_012;


public class OtherNewOneRechargeEvent extends AbsSystemEvent{
	
	public static OtherNewOneRechargeEvent ins;
	public static synchronized OtherNewOneRechargeEvent getIns() {
		if(ins == null){
			ins = new OtherNewOneRechargeEvent();
		}
		return ins;
	}
	
	@Override
	public void init(Hero hero) {
		
		
	}

	@Override
	public void login(Hero hero) {
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.OTHER_ONE_RECHARGE)) {
			return;
		}
		int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.OTHER_ONE_RECHARGE);
		OtherNewOneRecharge newOneRecharge = (OtherNewOneRecharge) OtherNewOneRechargeManager.getIns()
				.getSystemModel(hero, uid);
		if (newOneRecharge.getHasRewardNum()==null) {
			return;
		}
		Struct_hdfl_012 hdfl_012 = Config_hdfl_012.getIns().get(uid);
		int open = hdfl_012.getOpen();
		int end = hdfl_012.getEnd();
		for (Struct_dbcz3_733 dbcz3_733 : Config_dbcz3_733.getIns().getSortList()) {
			int cishu = dbcz3_733.getCs();
			int xh = dbcz3_733.getXh();
			int ts = dbcz3_733.getTs();
			if (ts < open || ts > end) {
				continue;
			}
			if (!newOneRecharge.getReward().containsKey(xh)) {
				HashMap<Integer, Integer> hashMap = new HashMap<Integer,Integer>();
				newOneRecharge.getReward().put(xh, hashMap);
			}
			HashMap<Integer, Integer> hashMap = newOneRecharge.getReward().get(xh);
			for (int i = 0; i <cishu; i++) {
				if(!hashMap.containsKey(i)) {
					hashMap.put(i,GameConst.REWARD_0);
				}
			}
			if (newOneRecharge.getHasRewardNum().get(xh)==null) {
				Integer[] getRewardNum=new Integer[] {0,0};
				newOneRecharge.getHasRewardNum().put(xh, getRewardNum);
			}
		}
		
		int openDays = TimeDateUtil.betweenOpen();
		Struct_hdfl_012 struct_hdfl_012 = Config_hdfl_012.getIns().get(uid);
		if (struct_hdfl_012.getPd() == 1) {
			// 活动分类表强开一期(兼容以后开服天数不对的时候获取不到正确集合报错)
			int endTime = OpenDaysSystemSysCache.getOpenMap().get(uid).getEndTime();// 活动的结束时间
			int currentTime = TimeDateUtil.getCurrentTime();
			int daysBetween = TimeDateUtil.getDaysBetween(currentTime, endTime);// 离结束还差多少天
			int end2 = struct_hdfl_012.getEnd();
			openDays = end2 - daysBetween;// 计算当天的活动天数
		}
		ConcurrentHashMap<Integer, Struct_dbcz3_733> concurrentHashMap = OtherNewOneRechargeCache.NewOneReChargeHashMap
				.get(openDays);
		for (Struct_dbcz3_733 dbcz3_733 : concurrentHashMap.values()) {
			int xh = dbcz3_733.getXh();
			int cishu = dbcz3_733.getCs();
			HashMap<Integer, Integer> rewardhashmap = newOneRecharge.getReward().get(xh);
			for (int i = 0; i <cishu; i++) {
				if (rewardhashmap.get(i)==GameConst.REWARD_1) {
					RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.OTHER_ONE_RECHARGE,
							1, RedPointConst.HAS_RED);
					return;
				}
			}
		}
		
	}
	
	@Override
	public void loginReset(Hero hero,int now){
		zeroHero(hero, now);
	}

	@Override
	public void zeroHero(Hero hero,int now){
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.OTHER_ONE_RECHARGE)) {
			return;
		}
		int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.OTHER_ONE_RECHARGE);
		OtherNewOneRecharge newOneRecharge = (OtherNewOneRecharge) OtherNewOneRechargeManager.getIns()
				.getSystemModel(hero, uid);
		if (newOneRecharge.getHasRewardNum()==null) {
			return;
		}
		int openDays = TimeDateUtil.betweenOpen() - 1;
		Struct_hdfl_012 struct_hdfl_012 = Config_hdfl_012.getIns().get(uid);
		if (struct_hdfl_012.getPd() == 1) {
			// 活动分类表强开一期(兼容以后开服天数不对的时候获取不到正确集合报错)
			int endTime = OpenDaysSystemSysCache.getOpenMap().get(uid).getEndTime();// 活动的结束时间
			int currentTime = TimeDateUtil.getCurrentTime();
			int daysBetween = TimeDateUtil.getDaysBetween(currentTime, endTime);// 离结束还差多少天
			int end2 = struct_hdfl_012.getEnd();
			openDays = end2 - daysBetween - 1;// 计算昨天的活动天数
		}
		ConcurrentHashMap<Integer, Struct_dbcz3_733> concurrentHashMap = OtherNewOneRechargeCache.NewOneReChargeHashMap
				.get(openDays);

		if (concurrentHashMap == null) {
			return;
		}
		for (Struct_dbcz3_733 dbcz3_733 : concurrentHashMap.values()) {
			int cishu = dbcz3_733.getCs();
			int xh = dbcz3_733.getXh();
			if (newOneRecharge.getHasRewardNum().containsKey(xh)) {
				Integer[] integers = newOneRecharge.getHasRewardNum().get(xh);
				Integer canNum= integers[0];
				Integer hasCt = integers[1];
				HashMap<Integer, Integer> rewardhashmap = newOneRecharge.getReward().get(xh);
				for (int i = 0; i <cishu; i++) {
					if (rewardhashmap.get(i)==GameConst.REWARD_1) {
						rewardhashmap.put(i, GameConst.REWARD_2);
						hasCt=hasCt+1;
						newOneRecharge.getHasRewardNum().put(xh, new Integer[] {canNum,hasCt});
						MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.ONERECHARGE_AWARD,
								new Object[] { MailConst.ONERECHARGE_AWARD }, dbcz3_733.getJl());
					}
				}
			}
		}
	
	}
}
