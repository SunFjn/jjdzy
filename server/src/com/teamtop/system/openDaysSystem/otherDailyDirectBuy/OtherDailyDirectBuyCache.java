package com.teamtop.system.openDaysSystem.otherDailyDirectBuy;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.houtaiHttp.events.recharge.RechargeConst;
import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.hero.SystemIdConst;

import excel.config.Config_mrzg3_256;
import excel.config.Config_mrzgmb_256;
import excel.config.Config_shop_011;
import excel.struct.Struct_mrzg3_256;
import excel.struct.Struct_mrzgmb_256;
import excel.struct.Struct_shop_011;

public class OtherDailyDirectBuyCache extends AbsServerEvent {
	/** 每日直购按期数分类配置表，第一层key:期数，第二层key:天数 **/
	private static Map<Integer, Map<Integer, List<Struct_mrzg3_256>>> dailyDirectBuyConfigMap = new HashMap<>();
	/** 每日直购，key:充值商品配置表index value为每日直购按天分类配置表List的index 从0开始 **/
	private static Map<Integer, Integer> configIndexToArrayIndex = new HashMap<>();
	/** 每日直购目标表按期数分类Map key:期数，value:配置表List **/
	private static Map<Integer, List<Struct_mrzgmb_256>> targetAwardConfigMap = new HashMap<>();

	public static Map<Integer, Map<Integer, List<Struct_mrzg3_256>>> getDailyDirectBuyConfigMap() {
		return dailyDirectBuyConfigMap;
	}

	public static Map<Integer, Integer> getConfigIndexToArrayIndex() {
		return configIndexToArrayIndex;
	}

	public static Map<Integer, List<Struct_mrzgmb_256>> getTargetAwardConfigMap() {
		return targetAwardConfigMap;
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void initExcel() throws RunServerException {
		dailyDirectBuyConfigMap.clear();
		configIndexToArrayIndex.clear();
		targetAwardConfigMap.clear();
		List<Struct_mrzg3_256> sortList = Config_mrzg3_256.getIns().getSortList();
		for (int i = 0; i < sortList.size(); i++) {
			Struct_mrzg3_256 struct_mrzg3_256 = sortList.get(i);
			int qs = struct_mrzg3_256.getQs();
			Map<Integer, List<Struct_mrzg3_256>> map = dailyDirectBuyConfigMap.get(qs);
			if (map == null) {
				map = new HashMap<>();
				dailyDirectBuyConfigMap.put(qs, map);
			}

			int day = struct_mrzg3_256.getDay();
			List<Struct_mrzg3_256> list = map.get(day);
			if (list == null) {
				list = new ArrayList<>();
				map.put(day, list);
			}
			list.add(struct_mrzg3_256);
		}

		for (Map<Integer, List<Struct_mrzg3_256>> map : dailyDirectBuyConfigMap.values()) {
			for (List<Struct_mrzg3_256> list : map.values()) {
				Collections.sort(list, new ConfigRankModelSys());
			}
		}

		List<Struct_shop_011> sortList2 = Config_shop_011.getIns().getSortList();
		int j = 0;
		for (int i = 0; i < sortList2.size(); i++) {
			Struct_shop_011 struct_shop_011 = sortList2.get(i);
			if (struct_shop_011.getType() == RechargeConst.DAILYDIRECTBUY) {
				configIndexToArrayIndex.put(struct_shop_011.getIndex(), j++);
			}
		}

		List<Struct_mrzgmb_256> configList = Config_mrzgmb_256.getIns().getSortList();
		int size = configList.size();
		for (int i = 0; i < size; i++) {
			Struct_mrzgmb_256 struct_mrzgmb_256 = configList.get(i);
			if (struct_mrzgmb_256.getId() == SystemIdConst.OTHER_DAILYBUY) {
				int qs = struct_mrzgmb_256.getDay();
				List<Struct_mrzgmb_256> list = targetAwardConfigMap.get(qs);
				if (list == null) {
					list = new ArrayList<>();
					targetAwardConfigMap.put(qs, list);
				}
				list.add(struct_mrzgmb_256);
			}
		}
	}

}
