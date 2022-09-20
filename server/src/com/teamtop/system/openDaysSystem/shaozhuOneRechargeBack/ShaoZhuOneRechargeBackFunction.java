package com.teamtop.system.openDaysSystem.shaozhuOneRechargeBack;

import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;

import com.teamtop.houtaiHttp.events.recharge.RechargeConst;
import com.teamtop.system.bag.BagFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.shaozhuOneRechargeBack.model.ShaoZhuOneRechargeBack;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_scdnfl_272;
import excel.config.Config_shop_011;
import excel.struct.Struct_scdnfl_272;
import excel.struct.Struct_shop_011;

public class ShaoZhuOneRechargeBackFunction {
	private static volatile ShaoZhuOneRechargeBackFunction ins = null;

	public static ShaoZhuOneRechargeBackFunction getIns() {
		if (ins == null) {
			synchronized (ShaoZhuOneRechargeBackFunction.class) {
				if (ins == null) {
					ins = new ShaoZhuOneRechargeBackFunction();
				}
			}
		}
		return ins;
	}

	private ShaoZhuOneRechargeBackFunction() {
	}

	/**
	 * 取得少主活动-单笔返利model
	 * 
	 * @param hero
	 * @return
	 */
	public ShaoZhuOneRechargeBack getModel(Hero hero) {
		int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.SHAOZHU_ONERECHARGEBACK);
		ShaoZhuOneRechargeBack model = (ShaoZhuOneRechargeBack) ShaoZhuOneRechargeBackManager.getIns()
				.getSystemModel(hero, uid);
		return model;
	}

	/**
	 * 充值
	 * 
	 * @param hero
	 * @param money
	 * @param product_id
	 */
	public void rechargeYB(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub
		try {
			// 玩家未开启活动,但只要是在活动期间充值就要计算.注意外网当天更新前的充值也要记录
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(SystemIdConst.SHAOZHU_ONERECHARGEBACK)) {
				return;
			}
			Struct_shop_011 struct_shop_011 = Config_shop_011.getIns().get(product_id);
			int type = struct_shop_011.getType();
			if (type == RechargeConst.YB) {
				// 首充,特权卡,每日直购,基金等不计算
				ShaoZhuOneRechargeBack model = getModel(hero);
				Map<Integer, Integer[]> awardMap = model.getAwardMap();
				List<Struct_scdnfl_272> sortList = Config_scdnfl_272.getIns().getSortList();
				boolean flag = false;
				int size = sortList.size();
				for (int i = 0; i < size; i++) {
					Struct_scdnfl_272 struct_scdnfl_272 = sortList.get(i);
					int id = struct_scdnfl_272.getId();
					int cz = struct_scdnfl_272.getCz();
					int time = struct_scdnfl_272.getTime();
					if (product_id == cz) {
						Integer[] array = Optional.ofNullable(awardMap).map(map -> map.get(id))
								.orElse(new Integer[] { 0, 0 });
						if (array[0] < time) {
							// 奖励未领完，可领数量+1
							array[0] = array[0] + 1;
//							int[][] reward = struct_scdnfl_272.getReward();
//							// 发放钥匙
//							UseAddUtil.add(hero, reward, SourceGoodConst.SHAOZHU_ONERECHARGEBACK_KEYGET,
//									UseAddUtil.getDefaultMail(), true);
						}
						awardMap.put(id, array);
						flag = true;
						break;
					}
				}

				if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.SHAOZHU_ONERECHARGEBACK)) {
					return;
				}
				if (flag) {
					RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.SHAO_ZHU_HUO_DONG, 1,
							RedPointConst.HAS_RED);
					RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.SHAOZHU_ONERECHARGEBACK, 1,
							RedPointConst.HAS_RED);
				}
				ShaoZhuOneRechargeBackManager.getIns().openUI(hero);
			}
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
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.SHAOZHU_ONERECHARGEBACK)) {
			return;
		}
		ShaoZhuOneRechargeBack model = getModel(hero);
		Map<Integer, Integer[]> awardMap = model.getAwardMap();
		for (Entry<Integer, Integer[]> entry : awardMap.entrySet()) {
			Integer[] array = entry.getValue();
			Integer id = entry.getKey();
			Struct_scdnfl_272 struct_scdnfl_272 = Config_scdnfl_272.getIns().get(id);
			int keyId = struct_scdnfl_272.getReward()[0][1];
			// 背包中该钥匙数量
			int keyNum = BagFunction.getIns().getGoodsNumBySysId(hero.getId(), keyId);
			int canNum = array[0];
			int gettedNum = array[1];
			int restNum = canNum - gettedNum;
			if (restNum > 0 || keyNum > 0) {
				// 有可领取数量或者背包中有钥匙时有红点
				if (isLogin) {
					RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.SHAO_ZHU_HUO_DONG, 1,
							RedPointConst.HAS_RED);
					RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.SHAOZHU_ONERECHARGEBACK, 1,
							RedPointConst.HAS_RED);
					break;
				} else {
					RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.SHAO_ZHU_HUO_DONG, 1,
							RedPointConst.HAS_RED);
					RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.SHAOZHU_ONERECHARGEBACK, 1,
							RedPointConst.HAS_RED);
					break;
				}
			}
		}
	}

}
