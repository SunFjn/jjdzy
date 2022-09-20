package com.teamtop.system.recharge.events;

import java.util.HashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.recharge.AbsRechargeEvent;
import com.teamtop.system.sevenOneRecharge.SevenOneRecharge;
import com.teamtop.system.sevenOneRecharge.SevenOneRechargeCache;
import com.teamtop.system.sevenOneRecharge.SevenOneRechargeSender;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.struct.Struct_dbcz1_733;

public class SevenOneRechargeHandler extends AbsRechargeEvent{
	@Override
	public void recharge(Hero hero, int money, int product_id) {
		if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SEVENNOERECHARGE)) return;
		SevenOneRecharge sevenOneRecharge=hero.getSevenOneRecharge();
		int openFuDay = TimeDateUtil.betweenOpen();
		if (!SevenOneRechargeCache.sevenOneRechargeHashMap.containsKey(openFuDay)) {
			LogTool.warn("hid:"+hero.getId()+"name:"+hero.getName()+"openFuDay:"+openFuDay, SevenOneRechargeHandler.class);
			return;
		}
		HashMap<Integer, Struct_dbcz1_733> hashMap = SevenOneRechargeCache.sevenOneRechargeHashMap.get(openFuDay);
		for (Struct_dbcz1_733 dbcz1_733 : hashMap.values()) {
			int cishu=dbcz1_733.getCs();
			int xh = dbcz1_733.getXh();
			Integer[] integers = sevenOneRecharge.getHasRewardNum().get(xh);
			Integer canNum= integers[0];
			Integer hasCt = integers[1];
			HashMap<Integer, Integer> rewardhashmap = sevenOneRecharge.getReward().get(xh);
			for (int i = 0; i <cishu; i++) {
				if (rewardhashmap.get(i)==GameConst.REWARD_0&&money==dbcz1_733.getJe()) {
					rewardhashmap.put(i, GameConst.REWARD_1);
					canNum=canNum+1;
					integers[0]=canNum;
					SevenOneRechargeSender.sendCmd_2974(hero.getId(), dbcz1_733.getXh(),canNum,hasCt);
					return;
				}
			}
		}
	}
}
