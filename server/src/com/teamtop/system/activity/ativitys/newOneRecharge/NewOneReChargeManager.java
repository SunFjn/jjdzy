package com.teamtop.system.activity.ativitys.newOneRecharge;

import java.util.HashMap;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_dbcz2_733;
import excel.struct.Struct_dbcz2_733;


public class NewOneReChargeManager extends AbstractActivityManager{
	
	public static NewOneReChargeManager ins;
	public static synchronized NewOneReChargeManager getIns() {
		if(ins == null){
			ins = new NewOneReChargeManager();
		}
		return ins;
	}
	
	@Override
	public void actOpen() {
		
		
	}

	@Override
	public void heroActOpen(Hero hero) {
		NewOneReCharge newOneRecharge = (NewOneReCharge)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.Act_NEWONERECHARGE);
		newOneRecharge.setHid(hero.getId());
		HashMap<Integer,Integer[]> hasRewardNum=new HashMap<>();
		HashMap<Integer,HashMap<Integer,Integer>> reward=new HashMap<>();
		newOneRecharge.setReward(reward);
		newOneRecharge.setHasRewardNum(hasRewardNum);
		for (Struct_dbcz2_733 dbcz2_733:Config_dbcz2_733.getIns().getSortList()) {
			int cishu=dbcz2_733.getCs();
			int xh = dbcz2_733.getXh();
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

	@Override
	public void actEnd() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void heroActEnd(Hero hero) {
		NewOneReCharge newOneRecharge = (NewOneReCharge)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.Act_NEWONERECHARGE);
		newOneRecharge.setHid(hero.getId());
		for (Struct_dbcz2_733 dbcz2_733:Config_dbcz2_733.getIns().getSortList()) {
			int xh = dbcz2_733.getXh();
			int cishu=dbcz2_733.getCs();
			Integer[] integers = newOneRecharge.getHasRewardNum().get(xh);
			if (integers == null) {
				continue;
			}
			Integer canNum= integers[0];
			Integer hasCt = integers[1];
			HashMap<Integer, Integer> rewardhashmap = newOneRecharge.getReward().get(xh);
			for (int i = 0; i <cishu; i++) {
				if (rewardhashmap.get(i)==GameConst.REWARD_1) {
					rewardhashmap.put(i, GameConst.REWARD_2);
					hasCt=hasCt+1;
					newOneRecharge.getHasRewardNum().put(xh, new Integer[] {canNum,hasCt});
					MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.ONERECHARGE_AWARD, new Object[] {MailConst.ONERECHARGE_AWARD}, dbcz2_733.getJl());
				}
			}
		}
		
	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		NewOneReCharge newOneRecharge= new NewOneReCharge();
		newOneRecharge.setHid(hero.getId());
		newOneRecharge.setIndexId(activityInfo.getIndex());
		newOneRecharge.setActId(activityInfo.getActId());
		newOneRecharge.setPeriods(activityInfo.getPeriods());
		/*
		改版
		newOneRecharge.setRewardMap(new HashMap<>());
		for (Struct_dbcz2_733 dbcz2_733:Config_dbcz2_733.getIns().getSortList()) {
			newOneRecharge.getRewardMap().put(dbcz2_733.getXh(), GameConst.REWARD_0);
		}*/
		HashMap<Integer,Integer[]> hasRewardNum=new HashMap<>();
		HashMap<Integer,HashMap<Integer,Integer>> reward=new HashMap<>();
		newOneRecharge.setReward(reward);
		newOneRecharge.setHasRewardNum(hasRewardNum);
		for (Struct_dbcz2_733 dbcz2_733:Config_dbcz2_733.getIns().getSortList()) {
			int cishu=dbcz2_733.getCs();
			int xh = dbcz2_733.getXh();
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
		return newOneRecharge;
	}

	@Override
	public Class<?> getActivityData() {
		return NewOneReCharge.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		try {
			boolean checkHeroActOpen = ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_NEWONERECHARGE);
			if (!checkHeroActOpen) {
				return;
			}
			NewOneReCharge newOneRecharge = (NewOneReCharge)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.Act_NEWONERECHARGE);
			
			if (newOneRecharge.getHasRewardNum()==null) {
				//新版本 重新初始化活动数据 把老数据放入新活动数据中
				//改版
				HashMap<Integer,Integer[]> hasRewardNum=new HashMap<>();
				HashMap<Integer,HashMap<Integer,Integer>> reward=new HashMap<>();
				newOneRecharge.setReward(reward);
				newOneRecharge.setHasRewardNum(hasRewardNum);
				
				for (Struct_dbcz2_733 dbcz2_733:Config_dbcz2_733.getIns().getSortList()) {
					int cishu=dbcz2_733.getCs();
					int xh = dbcz2_733.getXh();
					if (!newOneRecharge.getReward().containsKey(xh)) {
						HashMap<Integer, Integer> hashMap = new HashMap<Integer,Integer>();
						newOneRecharge.getReward().put(xh, hashMap);
					}
					HashMap<Integer, Integer> hashMap = newOneRecharge.getReward().get(xh);
					for (int i = 0; i <cishu; i++) {
						if (i==0&&newOneRecharge.getRewardMap()!=null) {
							if (newOneRecharge.getRewardMap().containsKey(xh)) {
								int rewardstate=newOneRecharge.getRewardMap().get(xh);
								if(!hashMap.containsKey(i)) {
									hashMap.put(i,rewardstate);
								}
							}
						}
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
			
			int week = TimeDateUtil.getWeek();
			ConcurrentHashMap<Integer, Struct_dbcz2_733> concurrentHashMap = NewOneReChargeCache.NewOneReChargeHashMap.get(week);
			for (Struct_dbcz2_733 dbcz2_733:concurrentHashMap.values()) {
				int cishu=dbcz2_733.getCs();
				int xh = dbcz2_733.getXh();
				Integer[] integers = newOneRecharge.getHasRewardNum().get(xh);
				Integer canNum= integers[0];
				Integer hasCt = integers[1];
				HashMap<Integer, Integer> rewardhashmap = newOneRecharge.getReward().get(xh);
				for (int i = 0; i <cishu; i++) {
					if (!rewardhashmap.containsKey(i)) {
						rewardhashmap.put(i, GameConst.REWARD_0);
					}
					if (rewardhashmap.get(i)==GameConst.REWARD_0&&money==dbcz2_733.getJe()) {
						rewardhashmap.put(i, GameConst.REWARD_1);
						canNum=canNum+1;
						integers[0]=canNum;
						NewOneReChargeSender.sendCmd_3004(hero.getId(), dbcz2_733.getXh(),canNum,hasCt);
						return;
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, NewOneReChargeManager.class, hero.getId(), hero.getName(), "rechargeHandle has wrong");
		}
		
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		return NewOneReChargeEvent.getIns();
	}

	@Override
	public void openUI(Hero hero) {
		try {
			boolean checkHeroActOpen = ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_NEWONERECHARGE);
			if (!checkHeroActOpen) {
				return;
			}
			NewOneReCharge newOneRecharge = (NewOneReCharge)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.Act_NEWONERECHARGE);
			
			if (newOneRecharge.getHasRewardNum()==null) {
				//新版本 重新初始化活动数据 把老数据放入新活动数据中
				//改版
				HashMap<Integer,Integer[]> hasRewardNum=new HashMap<>();
				HashMap<Integer,HashMap<Integer,Integer>> reward=new HashMap<>();
				newOneRecharge.setReward(reward);
				newOneRecharge.setHasRewardNum(hasRewardNum);
				
				for (Struct_dbcz2_733 dbcz2_733:Config_dbcz2_733.getIns().getSortList()) {
					int cishu=dbcz2_733.getCs();
					int xh = dbcz2_733.getXh();
					if (!newOneRecharge.getReward().containsKey(xh)) {
						HashMap<Integer, Integer> hashMap = new HashMap<Integer,Integer>();
						newOneRecharge.getReward().put(xh, hashMap);
					}
					HashMap<Integer, Integer> hashMap = newOneRecharge.getReward().get(xh);
					for (int i = 0; i <cishu; i++) {
						if (i==0&&newOneRecharge.getRewardMap()!=null) {
							if (newOneRecharge.getRewardMap().containsKey(xh)) {
								int rewardstate=newOneRecharge.getRewardMap().get(xh);
								if(!hashMap.containsKey(i)) {
									hashMap.put(i,rewardstate);
								}
							}
						}
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
			int week = TimeDateUtil.getWeek();
			ConcurrentHashMap<Integer, Struct_dbcz2_733> concurrentHashMap = NewOneReChargeCache.NewOneReChargeHashMap.get(week);
		    Object[] states=new Object[concurrentHashMap.size()];
		    int i=0;
			for (Struct_dbcz2_733 dbcz2_733:concurrentHashMap.values()) {
				int index = dbcz2_733.getXh();
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
			NewOneReChargeSender.sendCmd_3002(hero.getId(), week, states);
		    return;
			
		} catch (Exception e) {
			LogTool.error(e, NewOneReChargeManager.class, hero.getId(), hero.getName(), "openUI has wrong");
		}
		
	}

	public void getreward(Hero hero, int index) {
		try {
			boolean checkHeroActOpen = ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.Act_NEWONERECHARGE);
			if (!checkHeroActOpen) {
				return;
			}
			NewOneReCharge newOneRecharge = (NewOneReCharge)hero.getHeroActivityData().getActivityDataMap().get(ActivitySysId.Act_NEWONERECHARGE);
			int week = TimeDateUtil.getWeek();
			ConcurrentHashMap<Integer, Struct_dbcz2_733> concurrentHashMap = NewOneReChargeCache.NewOneReChargeHashMap.get(week);
			if (!concurrentHashMap.containsKey(index)) {
				LogTool.warn("HashMap.containsKey(index) :"+hero.getId()+" name:"+hero.getName(), NewOneReChargeManager.class);
				return;
			}
			Struct_dbcz2_733 struct_dbcz2_733 = concurrentHashMap.get(index);
			
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
				if (UseAddUtil.canAddJK(hero, struct_dbcz2_733.getJl(), false, struct_dbcz2_733.getJiankong())) {
					hashMap2.put(hasCt, GameConst.REWARD_2);
					UseAddUtil.addJK(hero, struct_dbcz2_733.getJl(), SourceGoodConst.REWARD_ACTONERECHARGE, null, true, struct_dbcz2_733.getJiankong());
				    //已领次数+1 
					hasCt=hasCt+1;
					newOneRecharge.getHasRewardNum().put(index, new Integer[] {canNum,hasCt});
				}
				NewOneReChargeSender.sendCmd_3004(hero.getId(), index,canNum, hasCt);
				return;
			}
			NewOneReChargeSender.sendCmd_3004(hero.getId(), index,canNum, hasCt);
			return;
		} catch (Exception e) {
			LogTool.error(e, NewOneReChargeManager.class, hero.getId(), hero.getName(), "getreward has wrong");
		}
		
	}

}
