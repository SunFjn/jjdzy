package com.teamtop.system.discountStore;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import com.teamtop.system.discountStore.model.ConfigModel;
import com.teamtop.system.discountStore.model.DiscountStore;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.OpenDaysSystemSysCache;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_hdfl_012;
import excel.config.Config_offstore1_244;
import excel.config.Config_offstore2_244;
import excel.struct.Struct_hdfl_012;
import excel.struct.Struct_offstore1_244;
import excel.struct.Struct_offstore2_244;

public class DiscountStoreFunction {
	private static DiscountStoreFunction ins = null;

	public static DiscountStoreFunction getIns() {
		if (ins == null) {
			ins = new DiscountStoreFunction();
		}
		return ins;
	}

	private DiscountStoreFunction() {
	}

	/**
	 * 初始化配置表
	 */
	public void initConfig() {
		Map<Integer, Map<Integer, ConfigModel>> configGoodsMap = DiscountStoreCache.getConfigGoodsMap();
		// 开服前七天
		for (Struct_offstore1_244 struct_offstore1_244 : Config_offstore1_244.getIns().getSortList()) {
			int indexday = struct_offstore1_244.getDay();
			if (!configGoodsMap.containsKey(indexday)) {
				configGoodsMap.put(indexday, new HashMap<>());
			}
			ConfigModel configModel = new ConfigModel(struct_offstore1_244.getId(), struct_offstore1_244.getItem(),
					struct_offstore1_244.getMoney(), struct_offstore1_244.getTime(), struct_offstore1_244.getVip());
			configGoodsMap.get(indexday).put(struct_offstore1_244.getId(), configModel);

		}
		// 开服7七天后
		for (Struct_offstore2_244 struct_offstore2_244 : Config_offstore2_244.getIns().getSortList()) {
			int indexday = 10 + struct_offstore2_244.getDay();
			if (!configGoodsMap.containsKey(indexday)) {
				configGoodsMap.put(indexday, new HashMap<>());
			}
			ConfigModel configModel = new ConfigModel(struct_offstore2_244.getId(), struct_offstore2_244.getItem(),
					struct_offstore2_244.getMoney(), struct_offstore2_244.getTime(), struct_offstore2_244.getVip());
			configGoodsMap.get(indexday).put(struct_offstore2_244.getId(), configModel);

		}

	}

	/**
	 * 折扣商店计算配置表索引
	 * 
	 * @return返回 标记天数 indexday
	 */
	public int getIndexDay() {
		int a = 0;
		if (TimeDateUtil.betweenOpen() <= DiscountStoreConst.OPEN_DAY) {
			// 开服7天前
			a = TimeDateUtil.betweenOpen() + a;
		} else {
			// 开服7天后
			a = 10;
			a = TimeDateUtil.getWeek() + a;
		}
		return a;
	}

	/**
	 * 检测8~28是否可开启
	 * 
	 * @param hero
	 * @return
	 */
	public boolean checkCanOpen(Hero hero) {
		try {
			int openDays = TimeDateUtil.betweenOpen();
			DiscountStore discountStore = hero.getDiscountStore();
			int oneTime = discountStore.getOneTime();
			Set<Integer> set = OpenDaysSystemSysCache.sysMap.get(SystemIdConst.OTHER_DISCOUNT_SHOP);
			int uid = 11;
			for(int tUid : set) {
				uid = tUid;
			}
			Struct_hdfl_012 hdfl_012 = Config_hdfl_012.getIns().get(uid);
			if(hdfl_012.getOpen()==0) {
				return false;
			}
			if(openDays<=7) {
				return false;
			}
			if (openDays > 7 && openDays < 29) {
				if (oneTime == 0) {
					discountStore.setOneTime(TimeDateUtil.getCurrentTime());
					discountStore.setState(1);
				}
			} else {
				if (oneTime == 0) {
					discountStore.setOneTime(TimeDateUtil.getCurrentTime());
				}
			}
			if (openDays > 7 && openDays < 29) {
				if (discountStore.getState() == 1) {
					return false;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, DiscountStoreFunction.class, hero.getId(), hero.getName(),
					"DiscountStoreFunction checkCanOpen");
		}
		return true;
	}

}
