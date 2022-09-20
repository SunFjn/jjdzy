package com.teamtop.system.openDaysSystem.otherDailyDirectBuy;

import java.util.List;
import java.util.Map;

import com.teamtop.system.activity.ativitys.dailyDirectBuy.DailyDirectBuyActConst;
import com.teamtop.system.dailyDirectBuy.DailyDirectBuyConst;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_mrzg3_256;
import excel.struct.Struct_mrzg3_256;
import excel.struct.Struct_mrzgmb_256;

public class OtherDailyDirectBuyFunction {

	private static OtherDailyDirectBuyFunction ins;

	public static OtherDailyDirectBuyFunction getIns() {
		if (ins == null) {
			ins = new OtherDailyDirectBuyFunction();
		}
		return ins;
	}

	public void dailyDirectBuyRechargeHandle(Hero hero, Map<String, String> paramMap, String parameters) {
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.OTHER_DAILYBUY)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.OTHER_DAILYBUY);
			OtherDailyDirectBuy dailyDirectBuy = (OtherDailyDirectBuy) OtherDailyDirectBuyManager.getIns()
					.getSystemModel(hero, uid);
			// 每日直购表id
			int itemid = Integer.parseInt(parameters);
			Struct_mrzg3_256 struct_mrzg3_256 = Config_mrzg3_256.getIns().get(itemid);
			if (struct_mrzg3_256 == null) {
				LogTool.warn("struct_mrzg3_256==null " + itemid, OtherDailyDirectBuyFunction.class);
				return;
			}
			int day = struct_mrzg3_256.getDay();
			if (!checkCanRechargeDate(day)) {
				LogTool.warn("OtherDailyDirectBuyFunction checkCanRechargeDate itemid:" + itemid + " name:"
						+ hero.getNameZoneid() + " hid:" + hero.getId(),
						this);
				return;
			}
			Integer state = dailyDirectBuy.getAwardMap().get(itemid);
			if (state == null) {
				LogTool.warn("state==null itemid:" + itemid + " name:" + hero.getNameZoneid() + " hid:" + hero.getId(),
						OtherDailyDirectBuyFunction.class);
				return;
			} else if (state == DailyDirectBuyConst.NOTBUY) {
				dailyDirectBuy.getAwardMap().put(itemid, DailyDirectBuyConst.BUY_NOTGET);
				targetAwardHandle(hero);
				OtherDailyDirectBuySender.sendCmd_7004(hero.getId(), itemid);
			}

		} catch (Exception e) {
			LogTool.error(e, OtherDailyDirectBuyFunction.class, "dailyDirectBuyRechargeHandle has wrong");
		}

	}

	/**
	 * 目标奖励处理
	 * 
	 * @param hero
	 */
	public void targetAwardHandle(Hero hero) {
		int targetTimes = 0;
		try {
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.OTHER_DAILYBUY);
			OtherDailyDirectBuy dailyDirectBuy = (OtherDailyDirectBuy) OtherDailyDirectBuyManager.getIns()
					.getSystemModel(hero, uid);
			int periods = dailyDirectBuy.getQs();
			Map<Integer, Integer> targetAwardMap = dailyDirectBuy.getTargetAwardMap();
			Map<Integer, Integer> awardMap = dailyDirectBuy.getAwardMap();
			for (int state : awardMap.values()) {
				if (state != DailyDirectBuyActConst.NOTBUY) {
					targetTimes++;
				}
			}
			List<Struct_mrzgmb_256> list = OtherDailyDirectBuyCache.getTargetAwardConfigMap().get(periods);
			boolean flag = false;
			for (Struct_mrzgmb_256 struct_mrzgmb_256 : list) {
				int bianhao = struct_mrzgmb_256.getBianhao();
				if (targetTimes >= struct_mrzgmb_256.getCishu() && targetAwardMap.get(bianhao) == null) {
					targetAwardMap.put(bianhao, DailyDirectBuyActConst.CAN_GET);
					flag = true;
				}
			}

			if (flag) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.OTHER_DAILYBUY,
						DailyDirectBuyActConst.TARGETREDPOINT, RedPointConst.HAS_RED);
			}
			OtherDailyDirectBuyManager.getIns().openUI(hero);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "targetAwardHandle targetTimes:" + targetTimes);
		}
	}

	public boolean checkCanRechargeDate(int day) {
		int openDays = OpenDaysSystemFunction.getIns().getOpenDays(SystemIdConst.OTHER_DAILYBUY);
		if (day <= openDays) {
			return true;
		}
		return false;

	}

}
