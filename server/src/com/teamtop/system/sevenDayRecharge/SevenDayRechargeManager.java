package com.teamtop.system.sevenDayRecharge;

import java.util.HashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.struct.Struct_drlc1_734;

public class SevenDayRechargeManager {
	
	
	private static SevenDayRechargeManager ins;
	public static SevenDayRechargeManager getIns(){
		if(ins == null) {
			ins = new SevenDayRechargeManager();
		}
		return ins;
	}
	
	public void openUi(Hero hero) {
		try {
			if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SEVENDAYRECHARGE)) return;
			SevenDayRecharge sevenDayRecharge=hero.getSevenDayRecharge();
			int openFuDay = TimeDateUtil.betweenOpen();
			if (!SevenDayRechargeCache.sevenDayRechargeHashMap.containsKey(openFuDay)) {
				LogTool.warn("hid:"+hero.getId()+"name:"+hero.getName()+"openFuDay:"+openFuDay, SevenDayRechargeEvent.class);
				return;
			}
			HashMap<Integer, Struct_drlc1_734> hashMap = SevenDayRechargeCache.sevenDayRechargeHashMap.get(openFuDay);
			Object[] rewardstate=new Object[hashMap.size()];
			int i=0;
			for (Struct_drlc1_734 drlc1_734 : hashMap.values()) {
				rewardstate[i]=new Object[] {drlc1_734.getId(),sevenDayRecharge.getReward().get(drlc1_734.getId())};
				i++;
			}
			SevenDayRechargeSender.sendCmd_2912(hero.getId(), sevenDayRecharge.getTodayRecharge(), rewardstate);
		} catch (Exception e) {
			LogTool.error(e, SevenDayRechargeManager.class, hero.getId(), hero.getName(),"openUi has wrong");
		}
		
	}

	public void getreward(Hero hero, int index) {
		try {
			if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SEVENDAYRECHARGE)) return;
			SevenDayRecharge sevenDayRecharge=hero.getSevenDayRecharge();
			int openFuDay = TimeDateUtil.betweenOpen();
			if (!SevenDayRechargeCache.sevenDayRechargeHashMap.containsKey(openFuDay)) {
				LogTool.warn("hid:"+hero.getId()+"name:"+hero.getName()+"openFuDay:"+openFuDay, SevenDayRechargeEvent.class);
				return;
			}
			HashMap<Integer, Struct_drlc1_734> hashMap = SevenDayRechargeCache.sevenDayRechargeHashMap.get(openFuDay);
			if (hashMap.containsKey(index)) {
				Struct_drlc1_734 struct_drlc1_734 = hashMap.get(index);
				if (sevenDayRecharge.getReward().get(index)==GameConst.REWARD_1) {
					if (UseAddUtil.canAddJK(hero, struct_drlc1_734.getReward(), false, struct_drlc1_734.getJiankong())) {
						sevenDayRecharge.getReward().put(index, GameConst.REWARD_2);
						UseAddUtil.addJK(hero, struct_drlc1_734.getReward(), SourceGoodConst.REWARD_SEDAYRECHARGE, null, true, struct_drlc1_734.getJiankong());
					}
					SevenDayRechargeSender.sendCmd_2914(hero.getId(), sevenDayRecharge.getTodayRecharge(), index, sevenDayRecharge.getReward().get(index));
				}
			}
		} catch (Exception e) {
			LogTool.error(e, SevenDayRechargeManager.class, hero.getId(), hero.getName(),"getreward has wrong index+"+index);
		}
		
	}
	
	
	
}
