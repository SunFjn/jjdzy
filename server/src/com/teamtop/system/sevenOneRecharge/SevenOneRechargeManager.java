package com.teamtop.system.sevenOneRecharge;

import java.util.HashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_dbcz1_733;
import excel.struct.Struct_dbcz1_733;


public class SevenOneRechargeManager {
	
	public static SevenOneRechargeManager ins;
	public static  SevenOneRechargeManager getIns() {
		if(ins == null){
			ins = new SevenOneRechargeManager();
		}
		return ins;
	}
	public void openUI(Hero hero) {
		try {
			if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SEVENNOERECHARGE)) return;
			SevenOneRecharge sevenOneRecharge=hero.getSevenOneRecharge();
			int openFuDay = TimeDateUtil.betweenOpen();
			if (!SevenOneRechargeCache.sevenOneRechargeHashMap.containsKey(openFuDay)) {
				LogTool.warn("hid:"+hero.getId()+"name:"+hero.getName()+"openFuDay:"+openFuDay, SevenOneRechargeEvent.class);
				return;
			}
			//+档次
			for (Struct_dbcz1_733 dbcz1_733:Config_dbcz1_733.getIns().getSortList()) {
				int cishu=dbcz1_733.getCs();
				int xh = dbcz1_733.getXh();
				if (!sevenOneRecharge.getReward().containsKey(xh)) {
					HashMap<Integer, Integer> hashMap = new HashMap<Integer,Integer>();
					sevenOneRecharge.getReward().put(xh, hashMap);
				}
				HashMap<Integer, Integer> hashMap = sevenOneRecharge.getReward().get(xh);
				for (int i = 0; i <cishu; i++) {
					if(!hashMap.containsKey(i)) {
						hashMap.put(i,GameConst.REWARD_0);
					}
				}
				if (sevenOneRecharge.getHasRewardNum().get(xh)==null) {
					Integer[] getRewardNum=new Integer[] {0,0};
					sevenOneRecharge.getHasRewardNum().put(xh, getRewardNum);
				}
			}
			
			HashMap<Integer, Struct_dbcz1_733> hashMap = SevenOneRechargeCache.sevenOneRechargeHashMap.get(openFuDay);
			Object[] rewardstate=new Object[hashMap.size()];
			int i=0;
			for (Struct_dbcz1_733 dbcz1_733 : hashMap.values()) {
				int index = dbcz1_733.getXh();
				Integer[] integers = sevenOneRecharge.getHasRewardNum().get(index);
				Integer canNum= integers[0];
				Integer hasCt = integers[1];
				rewardstate[i]=new Object[] {index,canNum,hasCt};
				i++;
			}
			SevenOneRechargeSender.sendCmd_2972(hero.getId(), rewardstate);
			
		} catch (Exception e) {
			LogTool.error(e, SevenOneRechargeManager.class, hero.getId(), hero.getName(), "openUI has wrong");
		}
		
	}
	public void getreward(Hero hero, int index) {
		try {
			if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SEVENNOERECHARGE)) return;
			SevenOneRecharge sevenOneRecharge=hero.getSevenOneRecharge();
			int openFuDay = TimeDateUtil.betweenOpen();
			if (!SevenOneRechargeCache.sevenOneRechargeHashMap.containsKey(openFuDay)) {
				LogTool.warn("hid:"+hero.getId()+"name:"+hero.getName()+"openFuDay:"+openFuDay, SevenOneRechargeEvent.class);
				return;
			}
			HashMap<Integer, Struct_dbcz1_733> hashMap = SevenOneRechargeCache.sevenOneRechargeHashMap.get(openFuDay);
			if (hashMap.containsKey(index)) {
				Struct_dbcz1_733 struct_dbcz1_733 = hashMap.get(index);
				HashMap<Integer, Integer> hashMap2 = sevenOneRecharge.getReward().get(index);
				Integer[] integers = sevenOneRecharge.getHasRewardNum().get(index);
				Integer canNum= integers[0];
				Integer hasCt = integers[1];
				if (canNum<=0) {
					return;
				}
				if (hashMap2.containsKey(hasCt)&&hashMap2.get(hasCt)==GameConst.REWARD_1) {
					if (UseAddUtil.canAddJK(hero, struct_dbcz1_733.getJl(), false, struct_dbcz1_733.getJiankong())) {
						hashMap2.put(hasCt, GameConst.REWARD_2);
						UseAddUtil.addJK(hero, struct_dbcz1_733.getJl(), SourceGoodConst.REWARD_SEONERECHARGE, null, true, struct_dbcz1_733.getJiankong());
					    //已领次数+1 可领取次数-1
						hasCt=hasCt+1;
						sevenOneRecharge.getHasRewardNum().put(index, new Integer[] {canNum,hasCt});
					}
					SevenOneRechargeSender.sendCmd_2974(hero.getId(), index,canNum, hasCt);
					return;
				}
				
				SevenOneRechargeSender.sendCmd_2974(hero.getId(), index,canNum, hasCt);
				return;
			}
		} catch (Exception e) {
			LogTool.error(e, SevenOneRechargeManager.class, hero.getId(), hero.getName(), "getreward has wrong");
		}
		
	}
	
	

}
