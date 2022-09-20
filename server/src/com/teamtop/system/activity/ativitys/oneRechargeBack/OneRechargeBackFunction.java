package com.teamtop.system.activity.ativitys.oneRechargeBack;

import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Optional;

import com.teamtop.houtaiHttp.events.recharge.RechargeConst;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.oneRechargeBack.model.OneRechargeBack;
import com.teamtop.system.bag.BagFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_dbfl_281;
import excel.config.Config_shop_011;
import excel.struct.Struct_dbfl_281;
import excel.struct.Struct_shop_011;

public class OneRechargeBackFunction {
	private static volatile OneRechargeBackFunction ins = null;

	public static OneRechargeBackFunction getIns() {
		if (ins == null) {
			synchronized (OneRechargeBackFunction.class) {
				if (ins == null) {
					ins = new OneRechargeBackFunction();
				}
			}
		}
		return ins;
	}

	private OneRechargeBackFunction() {
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
			// 外网当天更新前的充值也要记录
			boolean checkHeroActOpen = ActivityFunction.getIns().checkHeroActOpen(hero,
					ActivitySysId.ACT_ONERECHARGEBACK);
			if (!checkHeroActOpen) {
				return;
			}
			Struct_shop_011 struct_shop_011 = Config_shop_011.getIns().get(product_id);
			int type = struct_shop_011.getType();
			if (type == RechargeConst.YB) {
				// 首充,特权卡,每日直购,基金等不计算
				OneRechargeBack model = (OneRechargeBack) hero.getHeroActivityData().getActivityDataMap()
						.get(ActivitySysId.ACT_ONERECHARGEBACK);
				Map<Integer, Integer[]> awardMap = model.getAwardMap();
				List<Struct_dbfl_281> sortList = Config_dbfl_281.getIns().getSortList();
				boolean flag = false;
				int size = sortList.size();
				for (int i = 0; i < size; i++) {
					Struct_dbfl_281 struct_dbfl_281 = sortList.get(i);
					int id = struct_dbfl_281.getId();
					int cz = struct_dbfl_281.getCz();
					int time = struct_dbfl_281.getTime();
					if (product_id == cz) {
						Integer[] array = Optional.ofNullable(awardMap).map(map -> map.get(id))
								.orElse(new Integer[] { 0, 0 });
						if (array[0] < time) {
							// 奖励未领完，可领数量+1
							array[0] = array[0] + 1;
						}
						awardMap.put(id, array);
						flag = true;
						break;
					}
				}
				if (flag) {
					RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.ACT_ONERECHARGEBACK, 1,
							RedPointConst.HAS_RED);
				}
				OneRechargeBackManager.getIns().openUI(hero);
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
		boolean checkHeroActOpen = ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_ONERECHARGEBACK);
		if (!checkHeroActOpen) {
			return;
		}
		OneRechargeBack model = (OneRechargeBack) hero.getHeroActivityData().getActivityDataMap()
				.get(ActivitySysId.ACT_ONERECHARGEBACK);
		Map<Integer, Integer[]> awardMap = model.getAwardMap();
		for (Entry<Integer, Integer[]> entry : awardMap.entrySet()) {
			Integer[] array = entry.getValue();
			Integer id = entry.getKey();
			Struct_dbfl_281 struct_dbfl_281 = Config_dbfl_281.getIns().get(id);
			int keyId = struct_dbfl_281.getReward()[0][1];
			// 背包中该钥匙数量
			int keyNum = BagFunction.getIns().getGoodsNumBySysId(hero.getId(), keyId);
			int canNum = array[0];
			int gettedNum = array[1];
			int restNum = canNum - gettedNum;
			if (restNum > 0 || keyNum > 0) {
				// 有可领取数量或者背包中有钥匙时有红点
				if (isLogin) {
					RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.ACT_ONERECHARGEBACK, 1,
							RedPointConst.HAS_RED);
					break;
				} else {
					RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.ACT_ONERECHARGEBACK, 1,
							RedPointConst.HAS_RED);
					break;
				}
			}
		}
	}

}
