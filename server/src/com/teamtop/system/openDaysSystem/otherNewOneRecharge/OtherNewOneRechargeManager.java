package com.teamtop.system.openDaysSystem.otherNewOneRecharge;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.openDaysSystem.AbsOpenDaysManager;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.OpenDaysSystemSysCache;
import com.teamtop.system.openDaysSystem.model.AbsOpenDaysSystemModel;
import com.teamtop.system.openDaysSystem.model.HeroOpenDaysSysData;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_dbcz3_733;
import excel.config.Config_hdfl_012;
import excel.struct.Struct_dbcz3_733;
import excel.struct.Struct_hdfl_012;


public class OtherNewOneRechargeManager extends AbsOpenDaysManager {
	
	public static OtherNewOneRechargeManager ins;
	public static synchronized OtherNewOneRechargeManager getIns() {
		if(ins == null){
			ins = new OtherNewOneRechargeManager();
		}
		return ins;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.OTHER_ONE_RECHARGE)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.OTHER_ONE_RECHARGE);
			OtherNewOneRecharge newOneRecharge = (OtherNewOneRecharge) getSystemModel(hero, uid);
			
			if (newOneRecharge.getHasRewardNum()==null) {
				//新版本 重新初始化活动数据 把老数据放入新活动数据中
				//改版
				HashMap<Integer,Integer[]> hasRewardNum=new HashMap<>();
				HashMap<Integer,HashMap<Integer,Integer>> reward=new HashMap<>();
				newOneRecharge.setReward(reward);
				newOneRecharge.setHasRewardNum(hasRewardNum);
				
				for (Struct_dbcz3_733 dbcz3_733 : Config_dbcz3_733.getIns().getSortList()) {
					int cishu = dbcz3_733.getCs();
					int xh = dbcz3_733.getXh();
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
				
			}
			
			int openDays = TimeDateUtil.betweenOpen();
			Struct_hdfl_012 struct_hdfl_012 = Config_hdfl_012.getIns().get(uid);
			if (struct_hdfl_012.getPd() == 1) {
				// 活动分类表强开一期(兼容以后开服天数不对的时候获取不到正确集合报错)
				int endTime = OpenDaysSystemSysCache.getOpenMap().get(uid).getEndTime();// 活动的结束时间
				int currentTime = TimeDateUtil.getCurrentTime();
				int daysBetween = TimeDateUtil.getDaysBetween(currentTime, endTime);// 离结束还差多少天
				int end = struct_hdfl_012.getEnd();
				openDays = end - daysBetween;// 计算当天的活动天数
			}
			ConcurrentHashMap<Integer, Struct_dbcz3_733> concurrentHashMap = OtherNewOneRechargeCache.NewOneReChargeHashMap
					.get(openDays);
			for (Struct_dbcz3_733 dbcz3_733 : concurrentHashMap.values()) {
				int cishu = dbcz3_733.getCs();
				int xh = dbcz3_733.getXh();
				Integer[] integers = newOneRecharge.getHasRewardNum().get(xh);
				Integer canNum= integers[0];
				Integer hasCt = integers[1];
				HashMap<Integer, Integer> rewardhashmap = newOneRecharge.getReward().get(xh);
				for (int i = 0; i <cishu; i++) {
					if (!rewardhashmap.containsKey(i)) {
						rewardhashmap.put(i, GameConst.REWARD_0);
					}
					if (rewardhashmap.get(i) == GameConst.REWARD_0 && money == dbcz3_733.getJe()) {
						rewardhashmap.put(i, GameConst.REWARD_1);
						canNum=canNum+1;
						integers[0]=canNum;
						OtherNewOneRechargeSender.sendCmd_4652(hero.getId(), dbcz3_733.getXh(), canNum, hasCt);
						return;
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, OtherNewOneRechargeManager.class, hero.getId(), hero.getName(), "rechargeHandle has wrong");
		}
		
	}

	public AbsSystemEvent getSystemEvent() {
		return OtherNewOneRechargeEvent.getIns();
	}

	@Override
	public void openUI(Hero hero) {
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.OTHER_ONE_RECHARGE)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.OTHER_ONE_RECHARGE);
			OtherNewOneRecharge newOneRecharge = (OtherNewOneRecharge) getSystemModel(hero, uid);
			
			if (newOneRecharge.getHasRewardNum()==null) {
				//新版本 重新初始化活动数据 把老数据放入新活动数据中
				//改版
				HashMap<Integer,Integer[]> hasRewardNum=new HashMap<>();
				HashMap<Integer,HashMap<Integer,Integer>> reward=new HashMap<>();
				newOneRecharge.setReward(reward);
				newOneRecharge.setHasRewardNum(hasRewardNum);
				
				for (Struct_dbcz3_733 dbcz3_733 : Config_dbcz3_733.getIns().getSortList()) {
					int cishu = dbcz3_733.getCs();
					int xh = dbcz3_733.getXh();
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
				
			}
			int openDays = TimeDateUtil.betweenOpen();
			Struct_hdfl_012 struct_hdfl_012 = Config_hdfl_012.getIns().get(uid);
			if (struct_hdfl_012.getPd() == 1) {
				// 活动分类表强开一期(兼容以后开服天数不对的时候获取不到正确集合报错)
				int endTime = OpenDaysSystemSysCache.getOpenMap().get(uid).getEndTime();// 活动的结束时间
				int currentTime = TimeDateUtil.getCurrentTime();
				int daysBetween = TimeDateUtil.getDaysBetween(currentTime, endTime);// 离结束还差多少天
				int end = struct_hdfl_012.getEnd();
				openDays = end - daysBetween;// 计算当天的活动天数
			}
			ConcurrentHashMap<Integer, Struct_dbcz3_733> concurrentHashMap = OtherNewOneRechargeCache.NewOneReChargeHashMap
					.get(openDays);
		    Object[] states=new Object[concurrentHashMap.size()];
		    int i=0;
			for (Struct_dbcz3_733 dbcz3_733 : concurrentHashMap.values()) {
				int index = dbcz3_733.getXh();
				Integer[] integers = newOneRecharge.getHasRewardNum().get(index);
				Integer canNum= integers[0];
				Integer hasCt = integers[1];
				states[i]=new Object[] {index,canNum,hasCt};
				i++;
				HashMap<Integer, Integer> hashMap2 = newOneRecharge.getReward().get(index);
				//修正已领次数  190417bug
				int hasCtNum=0;
				int canNum1=0;
				for (int key:hashMap2.keySet()) {
					if(hashMap2.get(key)==GameConst.REWARD_2) {
						hasCtNum=hasCtNum+1;
					}
					if (hashMap2.get(key)!=GameConst.REWARD_0) {
						canNum1=canNum1+1;
					}
				}
				if (canNum!=canNum1) {
					canNum=canNum1;
					integers[0]=canNum1;
				}
				if (hasCt!=hasCtNum) {
					hasCt=hasCtNum;
					integers[1]=hasCtNum;
				}
			}
			OtherNewOneRechargeSender.sendCmd_4650(hero.getId(), openDays, states);
		    return;
			
		} catch (Exception e) {
			LogTool.error(e, OtherNewOneRechargeManager.class, hero.getId(), hero.getName(), "openUI has wrong");
		}
		
	}

	public void getReward(Hero hero, int index) {
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.OTHER_ONE_RECHARGE)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.OTHER_ONE_RECHARGE);
			OtherNewOneRecharge newOneRecharge = (OtherNewOneRecharge) getSystemModel(hero, uid);
			int openDays = TimeDateUtil.betweenOpen();
			Struct_hdfl_012 struct_hdfl_012 = Config_hdfl_012.getIns().get(uid);
			if (struct_hdfl_012.getPd() == 1) {
				// 活动分类表强开一期(兼容以后开服天数不对的时候获取不到正确集合报错)
				int endTime = OpenDaysSystemSysCache.getOpenMap().get(uid).getEndTime();// 活动的结束时间
				int currentTime = TimeDateUtil.getCurrentTime();
				int daysBetween = TimeDateUtil.getDaysBetween(currentTime, endTime);// 离结束还差多少天
				int end = struct_hdfl_012.getEnd();
				openDays = end - daysBetween;// 计算当天的活动天数
			}
			ConcurrentHashMap<Integer, Struct_dbcz3_733> concurrentHashMap = OtherNewOneRechargeCache.NewOneReChargeHashMap
					.get(openDays);
			if (!concurrentHashMap.containsKey(index)) {
				LogTool.warn("HashMap.containsKey(index) :"+hero.getId()+" name:"+hero.getName(), OtherNewOneRechargeManager.class);
				return;
			}
			Struct_dbcz3_733 struct_dbcz3_733 = concurrentHashMap.get(index);
			
			HashMap<Integer, Integer> hashMap2 = newOneRecharge.getReward().get(index);
			Integer[] integers = newOneRecharge.getHasRewardNum().get(index);
			Integer canNum= integers[0];
			Integer hasCt = integers[1];
			if (canNum<=0) {
				return;
			}
			//修正已领次数  190417bug
			if (hasCt==0) {
				int hasCtNum=0;
				int canNum1=0;
				for (int key:hashMap2.keySet()) {
					if(hashMap2.get(key)==GameConst.REWARD_2) {
						hasCtNum=hasCtNum+1;
					}
					if (hashMap2.get(key)!=GameConst.REWARD_0) {
						canNum1=canNum1+1;
					}
					
				}
				if (canNum!=canNum1) {
					canNum=canNum1;
					integers[0]=canNum1;
				}
				if (hasCt!=hasCtNum) {
					hasCt=hasCtNum;
					integers[1]=hasCtNum;
				}
			}
			
			if (hashMap2.containsKey(hasCt)&&hashMap2.get(hasCt)==GameConst.REWARD_1) {
				if (UseAddUtil.canAdd(hero, struct_dbcz3_733.getJl(), false)) {
					hashMap2.put(hasCt, GameConst.REWARD_2);
					UseAddUtil.add(hero, struct_dbcz3_733.getJl(), SourceGoodConst.REWARD_ACTONERECHARGE, null, true);
				    //已领次数+1 
					hasCt=hasCt+1;
					newOneRecharge.getHasRewardNum().put(index, new Integer[] {canNum,hasCt});
				}
				OtherNewOneRechargeSender.sendCmd_4652(hero.getId(), index, canNum, hasCt);
				return;
			}
			OtherNewOneRechargeSender.sendCmd_4652(hero.getId(), index, canNum, hasCt);
			return;
		} catch (Exception e) {
			LogTool.error(e, OtherNewOneRechargeManager.class, hero.getId(), hero.getName(), "getreward has wrong");
		}
		
	}

	@Override
	public void handleOpenPub() {
		// TODO Auto-generated method stub

	}

	@Override
	public void handleOpen(Hero hero, int uid) {
		OtherNewOneRecharge newOneRecharge = (OtherNewOneRecharge) getSystemModel(hero, uid);
		newOneRecharge.setHid(hero.getId());
		HashMap<Integer, Integer[]> hasRewardNum = new HashMap<>();
		HashMap<Integer, HashMap<Integer, Integer>> reward = new HashMap<>();
		newOneRecharge.setReward(reward);
		newOneRecharge.setHasRewardNum(hasRewardNum);
		for (Struct_dbcz3_733 dbcz3_733 : Config_dbcz3_733.getIns().getSortList()) {
			int cishu = dbcz3_733.getCs();
			int xh = dbcz3_733.getXh();
			if (!newOneRecharge.getReward().containsKey(xh)) {
				HashMap<Integer, Integer> hashMap = new HashMap<Integer, Integer>();
				newOneRecharge.getReward().put(xh, hashMap);
			}
			HashMap<Integer, Integer> hashMap = newOneRecharge.getReward().get(xh);
			for (int i = 0; i < cishu; i++) {
				if (!hashMap.containsKey(i)) {
					hashMap.put(i, GameConst.REWARD_0);
				}
			}
			if (newOneRecharge.getHasRewardNum().get(xh) == null) {
				Integer[] getRewardNum = new Integer[] { 0, 0 };
				newOneRecharge.getHasRewardNum().put(xh, getRewardNum);
			}
		}
	}

	@Override
	public void handleEndPub() {
		// TODO Auto-generated method stub

	}

	@Override
	public void handleEnd(Hero hero, int uid) {
		OtherNewOneRecharge newOneRecharge = (OtherNewOneRecharge) getSystemModel(hero, uid);
		newOneRecharge.setHid(hero.getId());
		for (Struct_dbcz3_733 dbcz3_733 : Config_dbcz3_733.getIns().getSortList()) {
			int xh = dbcz3_733.getXh();
			int cishu = dbcz3_733.getCs();
			Integer[] integers = newOneRecharge.getHasRewardNum().get(xh);
			if(integers==null) {
				continue;
			}
			Integer canNum = integers[0];
			Integer hasCt = integers[1];
			HashMap<Integer, Integer> rewardhashmap = newOneRecharge.getReward().get(xh);
			for (int i = 0; i < cishu; i++) {
				if (rewardhashmap.get(i) == GameConst.REWARD_1) {
					rewardhashmap.put(i, GameConst.REWARD_2);
					hasCt = hasCt + 1;
					newOneRecharge.getHasRewardNum().put(xh, new Integer[] { canNum, hasCt });
					MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.ONERECHARGE_AWARD,
							new Object[] { MailConst.ONERECHARGE_AWARD }, dbcz3_733.getJl());
				}
			}
		}
	}

	@Override
	public AbsOpenDaysSystemModel getSystemModel(Hero hero, int uid) {
		HeroOpenDaysSysData heroOpenDaysSysData = hero.getHeroOpenDaysSysData();
		Map<Integer, AbsOpenDaysSystemModel> opSysDataMap = heroOpenDaysSysData.getOpSysDataMap();
		OtherNewOneRecharge newOneReCharge = (OtherNewOneRecharge) opSysDataMap.get(uid);
		if (newOneReCharge == null) {
			Struct_hdfl_012 hdfl_012 = Config_hdfl_012.getIns().get(uid);
			int open = hdfl_012.getOpen();
			int end = hdfl_012.getEnd();
			newOneReCharge = new OtherNewOneRecharge();
			HashMap<Integer, Integer[]> hasRewardNum = new HashMap<>();
			HashMap<Integer, HashMap<Integer, Integer>> reward = new HashMap<>();
			newOneReCharge.setReward(reward);
			newOneReCharge.setHasRewardNum(hasRewardNum);
			for (Struct_dbcz3_733 dbcz3_733 : Config_dbcz3_733.getIns().getSortList()) {
				int cishu = dbcz3_733.getCs();
				int ts = dbcz3_733.getTs();
				if (ts < open || ts > end) {
					continue;
				}
				int xh = dbcz3_733.getXh();
				if (!newOneReCharge.getReward().containsKey(xh)) {
					HashMap<Integer, Integer> hashMap = new HashMap<Integer, Integer>();
					newOneReCharge.getReward().put(xh, hashMap);
				}
				HashMap<Integer, Integer> hashMap = newOneReCharge.getReward().get(xh);
				for (int i = 0; i < cishu; i++) {
					if (!hashMap.containsKey(i)) {
						hashMap.put(i, GameConst.REWARD_0);
					}
				}
				if (newOneReCharge.getHasRewardNum().get(xh) == null) {
					Integer[] getRewardNum = new Integer[] { 0, 0 };
					newOneReCharge.getHasRewardNum().put(xh, getRewardNum);
				}
			}
		}
		return newOneReCharge;
	}

	@Override
	public Class<?> getSystemModel() {
		// TODO Auto-generated method stub
		return OtherNewOneRecharge.class;
	}

	@Override
	public void consumeHandle(Hero hero, int consumeNum, int reason) {
		// TODO Auto-generated method stub

	}

}
