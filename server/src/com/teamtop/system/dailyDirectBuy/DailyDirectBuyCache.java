package com.teamtop.system.dailyDirectBuy;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.houtaiHttp.events.recharge.RechargeConst;
import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.log.LogTool;

import excel.config.Config_mrzg1_256;
import excel.config.Config_mrzgmb_256;
import excel.config.Config_shop_011;
import excel.struct.Struct_mrzg1_256;
import excel.struct.Struct_mrzgmb_256;
import excel.struct.Struct_shop_011;

public class DailyDirectBuyCache extends AbsServerEvent {
	/** 每日直购按天分类配置表，key:开服天数 **/
	private static Map<Integer, List<Struct_mrzg1_256>> dailyDirectBuyConfigMap = new HashMap<>();
	/** 每日直购，key:充值商品配置表index value为每日直购按天分类配置表List的index 从0开始 **/
	private static Map<Integer, Integer> configIndexToArrayIndex = new HashMap<>();
	/** 每日直购目标表List **/
	private static List<Struct_mrzgmb_256> targetAwardConfigList = new ArrayList<>();

	public static List<Struct_mrzgmb_256> getTargetAwardConfigList() {
		return targetAwardConfigList;
	}

	public static Map<Integer, List<Struct_mrzg1_256>> getDailyDirectBuyConfigMap() {
		return dailyDirectBuyConfigMap;
	}

	public static Map<Integer, Integer> getConfigIndexToArrayIndex() {
		return configIndexToArrayIndex;
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void initExcel() throws RunServerException {
		// TODO Auto-generated method stub
		dailyDirectBuyConfigMap.clear();
		configIndexToArrayIndex.clear();
		targetAwardConfigList.clear();
		LogTool.info("DailyDirectBuyCache clear finish", this);
		List<Struct_mrzg1_256> sortList = Config_mrzg1_256.getIns().getSortList();
		for (int i = 0; i < sortList.size(); i++) {
			Struct_mrzg1_256 struct_mrzg1_256 = sortList.get(i);
			int day = struct_mrzg1_256.getDay();
			List<Struct_mrzg1_256> list = dailyDirectBuyConfigMap.get(day);
			if (list == null) {
				list = new ArrayList<>();
				dailyDirectBuyConfigMap.put(day, list);
			}
			list.add(struct_mrzg1_256);
		}

		for (List<Struct_mrzg1_256> list : dailyDirectBuyConfigMap.values()) {
			Collections.sort(list, new ConfigRankModel());
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
			if (struct_mrzgmb_256.getId() == DailyDirectBuyConst.SYSTEMID) {
				targetAwardConfigList.add(struct_mrzgmb_256);
			}
		}
	}

}
