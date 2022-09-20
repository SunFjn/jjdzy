package com.teamtop.system.exclusiveActivity.exTotalRecharge;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.exclusiveActivity.tempConfig.Temp_Config_zshdljcz_315;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.util.cache.union.UC;

import excel.config.Config_zshdljcz_315;
import excel.struct.Struct_zshdljcz_315;

public class ExActTotalRechargeCache extends AbsServerEvent {
	
	private static Map<Integer, Map<Integer, Struct_zshdljcz_315>> qsMap = UC.reg("OtherTotalRechargeQsMap",
			new HashMap<Integer, Map<Integer, Struct_zshdljcz_315>>());

	private static Map<Integer, List<Struct_zshdljcz_315>> qsListMap = UC.reg("OtherTotalRechargeQsListMap",
			new HashMap<Integer, List<Struct_zshdljcz_315>>());

	public static Map<Integer, Map<Integer, Struct_zshdljcz_315>> getQsMap() {
		return qsMap;
	}

	public static void setQsMap(Map<Integer, Map<Integer, Struct_zshdljcz_315>> qsMap) {
		ExActTotalRechargeCache.qsMap = qsMap;
	}

	public static Map<Integer, List<Struct_zshdljcz_315>> getQsListMap() {
		return qsListMap;
	}

	public static void setQsListMap(Map<Integer, List<Struct_zshdljcz_315>> qsListMap) {
		ExActTotalRechargeCache.qsListMap = qsListMap;
	}

	@Override
	public void startServer() throws RunServerException {
		GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.EXT_ACTIVITY_TOTAL_RECHARGE);
		String content = globalData.getContent();
		if (content == null || content.equals("") || content.equals("{}")) {

		} else {
			Temp_Config_zshdljcz_315 temp_Config_zshdljcz_315 = JSONObject.parseObject(content,
					Temp_Config_zshdljcz_315.class);
			// 设置数据
			temp_Config_zshdljcz_315.setConfig();
		}
	}

	@Override
	public void shutdownServer() {
		GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.EXT_ACTIVITY_TOTAL_RECHARGE);
		Temp_Config_zshdljcz_315 temp_Config_zshdljcz_315 = new Temp_Config_zshdljcz_315();
		// 设置临时保存对象数据
		temp_Config_zshdljcz_315.setTemp_Config();
		globalData.setContent(JSON.toJSONString(temp_Config_zshdljcz_315));
		GlobalCache.doSync(globalData);
	}
	
	@Override
	public void initExcel() throws RunServerException{
		qsMap.clear();
		qsListMap.clear();
		List<Struct_zshdljcz_315> sortList = Config_zshdljcz_315.getIns().getSortList();
		int size = sortList.size();
		for (int i = 0; i < size; i++) {
			Struct_zshdljcz_315 xzdd3_252 = sortList.get(i);
			int qs = xzdd3_252.getQs();
			Map<Integer, Struct_zshdljcz_315> map = qsMap.get(qs);
			if (map == null) {
				map = new HashMap<>();
				qsMap.put(qs, map);
			}
			map.put(xzdd3_252.getId(), xzdd3_252);
			List<Struct_zshdljcz_315> list = qsListMap.get(qs);
			if (list == null) {
				list = new ArrayList<>();
				qsListMap.put(qs, list);
			}
			list.add(xzdd3_252);
		}
	}

	public static void houtaiInitExcel() {
		qsMap.clear();
		qsListMap.clear();
		List<Struct_zshdljcz_315> sortList = Config_zshdljcz_315.getIns().getSortList();
		int size = sortList.size();
		for (int i = 0; i < size; i++) {
			Struct_zshdljcz_315 xzdd3_252 = sortList.get(i);
			int qs = xzdd3_252.getQs();
			Map<Integer, Struct_zshdljcz_315> map = qsMap.get(qs);
			if (map == null) {
				map = new HashMap<>();
				qsMap.put(qs, map);
			}
			map.put(xzdd3_252.getId(), xzdd3_252);
			List<Struct_zshdljcz_315> list = qsListMap.get(qs);
			if (list == null) {
				list = new ArrayList<>();
				qsListMap.put(qs, list);
			}
			list.add(xzdd3_252);
		}
	}

}
