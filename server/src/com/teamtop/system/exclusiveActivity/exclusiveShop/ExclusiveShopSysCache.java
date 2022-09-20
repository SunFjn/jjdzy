package com.teamtop.system.exclusiveActivity.exclusiveShop;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.exclusiveActivity.tempConfig.Temp_Config_zshdzssd_315;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;

import excel.config.Config_zshdzssd_315;
import excel.struct.Struct_zshdzssd_315;

public class ExclusiveShopSysCache extends AbsServerEvent {

	private static Map<Integer, Map<Integer, Struct_zshdzssd_315>> qsMap = new HashMap<>();

	public static Map<Integer, Map<Integer, Struct_zshdzssd_315>> getQsMap() {
		return qsMap;
	}

	public static void setQsMap(Map<Integer, Map<Integer, Struct_zshdzssd_315>> qsMap) {
		ExclusiveShopSysCache.qsMap = qsMap;
	}

	@Override
	public void startServer() throws RunServerException {
		GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.EXT_ACTIVITY_SHOP);
		String content = globalData.getContent();
		if (content == null || content.equals("") || content.equals("{}")) {

		} else {
			Temp_Config_zshdzssd_315 temp_Config_zshdzssd_315 = JSONObject.parseObject(content,
					Temp_Config_zshdzssd_315.class);
			// 设置数据
			temp_Config_zshdzssd_315.setConfig();
		}
	}

	@Override
	public void shutdownServer() {
		GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.EXT_ACTIVITY_SHOP);
		Temp_Config_zshdzssd_315 temp_Config_zshdzssd_315 = new Temp_Config_zshdzssd_315();
		// 设置临时保存对象数据
		temp_Config_zshdzssd_315.setTemp_Config();
		globalData.setContent(JSON.toJSONString(temp_Config_zshdzssd_315));
		GlobalCache.doSync(globalData);
	}

	@Override
	public void initExcel() throws RunServerException {
		qsMap.clear();
		List<Struct_zshdzssd_315> sortList = Config_zshdzssd_315.getIns().getSortList();
		int size = sortList.size();
		Struct_zshdzssd_315 zshdzssd_315 = null;
		for (int i = 0; i < size; i++) {
			zshdzssd_315 = sortList.get(i);
			int id = zshdzssd_315.getId();
			int qs = zshdzssd_315.getQs();
			Map<Integer, Struct_zshdzssd_315> map = qsMap.get(qs);
			if (map == null) {
				map = new HashMap<>();
				qsMap.put(qs, map);
			}
			map.put(id, zshdzssd_315);
		}
	}

	public static void houtaiInitExcel() {
		qsMap.clear();
		List<Struct_zshdzssd_315> sortList = Config_zshdzssd_315.getIns().getSortList();
		int size = sortList.size();
		Struct_zshdzssd_315 zshdzssd_315 = null;
		for (int i = 0; i < size; i++) {
			zshdzssd_315 = sortList.get(i);
			int id = zshdzssd_315.getId();
			int qs = zshdzssd_315.getQs();
			Map<Integer, Struct_zshdzssd_315> map = qsMap.get(qs);
			if (map == null) {
				map = new HashMap<>();
				qsMap.put(qs, map);
			}
			map.put(id, zshdzssd_315);
		}
	}

}
