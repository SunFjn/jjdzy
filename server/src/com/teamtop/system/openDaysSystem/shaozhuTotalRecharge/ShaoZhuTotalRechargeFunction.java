package com.teamtop.system.openDaysSystem.shaozhuTotalRecharge;

import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.shaozhuTotalRecharge.model.ShaoZhuTotalRecharge;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_scljcz_272;
import excel.struct.Struct_scljcz_272;

public class ShaoZhuTotalRechargeFunction {
	private static volatile ShaoZhuTotalRechargeFunction ins = null;

	public static ShaoZhuTotalRechargeFunction getIns() {
		if (ins == null) {
			synchronized (ShaoZhuTotalRechargeFunction.class) {
				if (ins == null) {
					ins = new ShaoZhuTotalRechargeFunction();
				}
			}
		}
		return ins;
	}

	private ShaoZhuTotalRechargeFunction() {
	}

	/**
	 * 取得少主活动-累计充值model
	 * 
	 * @param hero
	 * @return
	 */
	public ShaoZhuTotalRecharge getModel(Hero hero) {
		int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.SHAOZHU_TOTALRECHARGE);
		ShaoZhuTotalRecharge model = (ShaoZhuTotalRecharge) ShaoZhuTotalRechargeManager.getIns().getSystemModel(hero,
				uid);
		return model;
	}

	public void rechargeYB(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub
		try {
			// 玩家未开启活动,但只要是在活动期间充值就要计算.注意外网当天更新前的充值也要记录
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(SystemIdConst.SHAOZHU_TOTALRECHARGE)) {
				return;
			}
			ShaoZhuTotalRecharge shaoZhuTotalRecharge = getModel(hero);
			Map<Integer, Integer> awardStateMap = shaoZhuTotalRecharge.getAwardStateMap();
			int rechargeYb = shaoZhuTotalRecharge.getRechargeYb();
			shaoZhuTotalRecharge.setRechargeYb(rechargeYb + money);
			int newRechargeYb = shaoZhuTotalRecharge.getRechargeYb();

			List<Struct_scljcz_272> sortList = Config_scljcz_272.getIns().getSortList();
			boolean flag = false;
			for (Struct_scljcz_272 struct_scljcz_272 : sortList) {
				int id = struct_scljcz_272.getId();
				if (newRechargeYb >= struct_scljcz_272.getLj() && awardStateMap.get(id) == null) {
					awardStateMap.put(id, ShaoZhuTotalRechargeConst.CAN_GET);
					flag = true;
				}
			}

			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.SHAOZHU_TOTALRECHARGE)) {
				return;
			}
			if (flag) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.SHAO_ZHU_HUO_DONG, 1,
						RedPointConst.HAS_RED);
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.SHAOZHU_TOTALRECHARGE, 1,
						RedPointConst.HAS_RED);
			}
			ShaoZhuTotalRechargeManager.getIns().openUI(hero);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(),
					"rechargeYB money:" + money + " product_id:" + product_id);
		}
	}

	/**
	 * 红点发送
	 * 
	 * @param isLogin 是否登录状态
	 */
	public void redPoint(Hero hero, boolean isLogin) {
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.SHAOZHU_TOTALRECHARGE)) {
			return;
		}
		ShaoZhuTotalRecharge shaoZhuTotalRecharge = getModel(hero);
		Map<Integer, Integer> awardStateMap = shaoZhuTotalRecharge.getAwardStateMap();
		for (Entry<Integer, Integer> entry : awardStateMap.entrySet()) {
			Integer state = entry.getValue();
			if (state == ShaoZhuTotalRechargeConst.CAN_GET) {
				if (isLogin) {
					RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.SHAO_ZHU_HUO_DONG, 1,
							RedPointConst.HAS_RED);
					RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.SHAOZHU_TOTALRECHARGE, 1,
							RedPointConst.HAS_RED);
					break;
				} else {
					RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.SHAO_ZHU_HUO_DONG, 1,
							RedPointConst.HAS_RED);
					RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.SHAOZHU_TOTALRECHARGE, 1,
							RedPointConst.HAS_RED);
					break;
				}
			}
		}
	}

}
