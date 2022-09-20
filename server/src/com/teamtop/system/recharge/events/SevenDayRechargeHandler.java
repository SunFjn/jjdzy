package com.teamtop.system.recharge.events;

import java.util.HashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.recharge.AbsRechargeEvent;
import com.teamtop.system.sevenDayRecharge.SevenDayRecharge;
import com.teamtop.system.sevenDayRecharge.SevenDayRechargeCache;
import com.teamtop.system.sevenDayRecharge.SevenDayRechargeSender;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.struct.Struct_drlc1_734;

public class SevenDayRechargeHandler extends AbsRechargeEvent{

	@Override
	public void recharge(Hero hero, int money, int product_id) {
		if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SEVENDAYRECHARGE)) return;
		SevenDayRecharge sevenDayRecharge=hero.getSevenDayRecharge();
		int openFuDay = TimeDateUtil.betweenOpen();
		if (!SevenDayRechargeCache.sevenDayRechargeHashMap.containsKey(openFuDay)) {
			LogTool.warn("hid:"+hero.getId()+"name:"+hero.getName()+"openFuDay:"+openFuDay, SevenDayRechargeHandler.class);
			return;
		}
		boolean isChargeNum=false;
		sevenDayRecharge.setTodayRecharge(sevenDayRecharge.getTodayRecharge()+money);
		HashMap<Integer, Struct_drlc1_734> hashMap = SevenDayRechargeCache.sevenDayRechargeHashMap.get(openFuDay);
		for (Struct_drlc1_734 drlc1_734 : hashMap.values()) {
			if (sevenDayRecharge.getReward().get(drlc1_734.getId())==GameConst.REWARD_0&&sevenDayRecharge.getTodayRecharge()>=drlc1_734.getCoin()) {
				sevenDayRecharge.getReward().put(drlc1_734.getId(), GameConst.REWARD_1);
				SevenDayRechargeSender.sendCmd_2914(hero.getId(), sevenDayRecharge.getTodayRecharge(), drlc1_734.getId(), GameConst.REWARD_1);
				isChargeNum=true;
			}
		}
		if (!isChargeNum) {
			SevenDayRechargeSender.sendCmd_2914(hero.getId(), sevenDayRecharge.getTodayRecharge(), 0, 0);
		}
		
		
	}

}
