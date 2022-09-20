package com.teamtop.system.exclusiveActivity.exOneRechargeBack;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.exclusiveActivity.tempConfig.Temp_Config_zshddbfl_315;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.util.cache.union.UC;

import excel.config.Config_zshddbfl_315;
import excel.struct.Struct_zshddbfl_315;

public class ExActOneRechargeBackSysCache extends AbsServerEvent {

	private static Map<Integer, Map<Integer, Struct_zshddbfl_315>> qsMap = UC.reg("celeOneRechargeBackQsMap",
			new HashMap<>());

	public static Map<Integer, Map<Integer, Struct_zshddbfl_315>> getQsMap() {
		return qsMap;
	}

	public static void setQsMap(Map<Integer, Map<Integer, Struct_zshddbfl_315>> qsMap) {
		ExActOneRechargeBackSysCache.qsMap = qsMap;
	}

	@Override
	public void startServer() throws RunServerException {
		GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.EXT_ACTIVITY_ONE_RECHAREG_BACK);
		String content = globalData.getContent();
		if (content == null || content.equals("") || content.equals("{}")) {

		} else {
			Temp_Config_zshddbfl_315 temp_Config_zshddbfl_315 = JSONObject.parseObject(content,
					Temp_Config_zshddbfl_315.class);
			// 设置数据
			temp_Config_zshddbfl_315.setConfig();
		}
	}

	@Override
	public void shutdownServer() {
		GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.EXT_ACTIVITY_ONE_RECHAREG_BACK);
		Temp_Config_zshddbfl_315 temp_Config_zshddbfl_315 = new Temp_Config_zshddbfl_315();
		// 设置临时保存对象数据
		temp_Config_zshddbfl_315.setTemp_Config();
		globalData.setContent(JSON.toJSONString(temp_Config_zshddbfl_315));
		GlobalCache.doSync(globalData);
	}

	@Override
	public void initExcel() throws RunServerException {
		qsMap.clear();
		List<Struct_zshddbfl_315> sortList = Config_zshddbfl_315.getIns().getSortList();
		int size = sortList.size();
		for (int i = 0; i < size; i++) {
			Struct_zshddbfl_315 zshddbfl_315 = sortList.get(i);
			int qs = zshddbfl_315.getQs();
			int je = zshddbfl_315.getJe();
			Map<Integer, Struct_zshddbfl_315> map = qsMap.get(qs);
			if (map == null) {
				map = new HashMap<>();
				qsMap.put(qs, map);
			}
			map.put(je, zshddbfl_315);
		}
	}

	public static void houtaiInitExcel() {
		qsMap.clear();
		List<Struct_zshddbfl_315> sortList = Config_zshddbfl_315.getIns().getSortList();
		int size = sortList.size();
		for (int i = 0; i < size; i++) {
			Struct_zshddbfl_315 zshddbfl_315 = sortList.get(i);
			int qs = zshddbfl_315.getQs();
			int je = zshddbfl_315.getJe();
			Map<Integer, Struct_zshddbfl_315> map = qsMap.get(qs);
			if (map == null) {
				map = new HashMap<>();
				qsMap.put(qs, map);
			}
			map.put(je, zshddbfl_315);
		}
	}

}
