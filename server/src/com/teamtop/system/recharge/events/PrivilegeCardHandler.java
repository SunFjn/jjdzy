package com.teamtop.system.recharge.events;

import java.util.List;
import java.util.Map;

import com.teamtop.houtaiHttp.events.recharge.RechargeConst;
import com.teamtop.system.LoginLuxuryGifts.LoginLuxuryGiftsFunction;
import com.teamtop.system.achievement.AchievementEnum;
import com.teamtop.system.achievement.AchievementFunction;
import com.teamtop.system.activity.ativitys.loginLuxuryGiftsNew.LoginLuxuryGiftsNewFunction;
import com.teamtop.system.guanqia.GuanqiaConst;
import com.teamtop.system.guanqia.GuanqiaFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.privilegeCard.PrivilegeCardConst;
import com.teamtop.system.privilegeCard.PrivilegeCardFunction;
import com.teamtop.system.privilegeCard.PrivilegeCardManager;
import com.teamtop.system.recharge.AbsRechargeEvent;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_shop_011;
import excel.config.Config_tqk_719;
import excel.struct.Struct_tqk_719;

public class PrivilegeCardHandler extends AbsRechargeEvent {

	@Override
	public void recharge(Hero hero, int money, int product_id) {
		int pType = Config_shop_011.getIns().get(product_id).getType();
		if (pType != RechargeConst.TEQUANKA) {
			return;
		}
		Map<Integer, int[]> privilegeCardMap = hero.getPrivilegeCardMap();
		List<Struct_tqk_719> sortList = Config_tqk_719.getIns().getSortList();
		int size = sortList.size();
		Struct_tqk_719 tqk = null;
		Struct_tqk_719 tempTqk = null;
		for (int i = 0; i < size; i++) {
			tempTqk = sortList.get(i);
			if (money == tempTqk.getCOIN()) {
				tqk = tempTqk;
				break;
			}
		}
		if (tqk == null) {
			return;
		}
		int id = tqk.getID();
		int[] info = privilegeCardMap.get(id);
		// if (info != null) {
		// return;
		// }
		int currentTime = TimeDateUtil.getCurrentTime();
		int endTime = currentTime;
		if (info == null) {
			info = new int[] { PrivilegeCardConst.CAN_GET, endTime };
			privilegeCardMap.put(id, info);
		} else {
			endTime = info[1];
		}
		int qixian = tqk.getQIXIAN();
		if (qixian > 0) {
			endTime += qixian;
		} else {
			endTime = 0;
		}
		info[1] = endTime;
		PrivilegeCardFunction.getIns().checkPrivilegeCard(hero);
		PrivilegeCardManager.getIns().openPrivilegeCard(hero);
		if (hero.isOnline()) {
			GuanqiaFunction.getIns().updateExpAddition(hero, GuanqiaConst.ADD_TYPE2, 0);
			LoginLuxuryGiftsNewFunction.getIns().checkRewardState(hero);
			LoginLuxuryGiftsFunction.getIns().checkRewardState(hero);
		}
		// 成就
		AchievementFunction.getIns().checkTask(hero, AchievementEnum.GOAL_45, 0);
	}

}
