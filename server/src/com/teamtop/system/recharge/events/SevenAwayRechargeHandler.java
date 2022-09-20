package com.teamtop.system.recharge.events;

import java.util.HashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.recharge.AbsRechargeEvent;
import com.teamtop.system.sevenAwayRecharge.SevenAwayRecharge;
import com.teamtop.system.sevenAwayRecharge.SevenAwayRechargeSender;
import com.teamtop.util.log.LogTool;

import excel.config.Config_lxlc1_745;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_lxlc1_745;

public class SevenAwayRechargeHandler extends AbsRechargeEvent{

	@Override
	public void recharge(Hero hero, int money, int product_id) {
		if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SEVENAWAYRECHARGE)) return;
		if (hero.getSevenAwayRecharge()==null) {
			LogTool.warn("id:"+hero.getId(), SevenAwayRechargeHandler.class);
			return;
		}
		SevenAwayRecharge sevenAwayRecharge=hero.getSevenAwayRecharge();
		sevenAwayRecharge.setTodayRecharge(sevenAwayRecharge.getTodayRecharge()+money);
		int value=Config_xtcs_004.getIns().get(3201).getNum();
		if (sevenAwayRecharge.getTodayRecharge()>=value&&sevenAwayRecharge.getTodayIsSuccess()==0) {
			sevenAwayRecharge.setSuccessNum(sevenAwayRecharge.getSuccessNum()+1);
			sevenAwayRecharge.setTodayIsSuccess(1);
			sevenAwayRecharge.setTodayRewardSate(GameConst.REWARD_1);
			HashMap<Integer, Integer> bigReward = sevenAwayRecharge.getBigReward();
			int successNum = sevenAwayRecharge.getSuccessNum();
			for (Struct_lxlc1_745 lxlc1_745:Config_lxlc1_745.getIns().getSortList()) {
				int id = lxlc1_745.getId();
				if (!bigReward.containsKey(id)) {
					bigReward.put(id, GameConst.REWARD_0);
				}
				if (bigReward.get(id)==GameConst.REWARD_0&&successNum>=lxlc1_745.getTianshu()) {
					bigReward.put(id, GameConst.REWARD_1);
					SevenAwayRechargeSender.sendCmd_2776(hero.getId(), sevenAwayRecharge.getSuccessNum(), id, GameConst.REWARD_1);
				}
			}
			/*for (Struct_lxlc1_745 lxlc1_745:Config_lxlc1_745.getIns().getSortList()) {
				bigReward.put(lxlc1_745.getId(), GameConst.REWARD_0);
			}*/
			/*for(Struct_lxlc1_728 sortList:Config_lxlc1_728.getIns().getSortList()) {
				if(sevenAwayRecharge.getReward().get(sortList.getId())==GameConst.REWARD_0&&sevenAwayRecharge.getSuccessNum()>=sortList.getTianshu()) {
					sevenAwayRecharge.getReward().put(sortList.getId(), GameConst.REWARD_1);
					SevenAwayRechargeSender.sendCmd_2776(hero.getId(), sevenAwayRecharge.getSuccessNum(), sortList.getId(), GameConst.REWARD_1);
				}
			}*/
			//SevenAwayRechargeSender.sendCmd_2776(hero.getId(), sevenAwayRecharge.getSuccessNum(), 0, 0);
			return;
		}
		SevenAwayRechargeSender.sendCmd_2778(hero.getId(),sevenAwayRecharge.getTodayRewardSate(),sevenAwayRecharge.getTodayRecharge());
		
	}

}
