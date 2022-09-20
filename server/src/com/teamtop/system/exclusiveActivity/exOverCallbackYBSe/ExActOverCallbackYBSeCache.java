package com.teamtop.system.exclusiveActivity.exOverCallbackYBSe;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.exclusiveActivity.tempConfig.Temp_Config_zshdybfl_315;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.util.cache.union.UC;

import excel.config.Config_zshdybfl_315;
import excel.struct.Struct_zshdybfl_315;

public class ExActOverCallbackYBSeCache extends AbsServerEvent {

	private static Map<Integer, Map<Integer, Struct_zshdybfl_315>> ybConfigMap = UC.reg("otherYbConfigMap",
			new HashMap<Integer, Map<Integer, Struct_zshdybfl_315>>());

	public static Map<Integer, Map<Integer, Struct_zshdybfl_315>> getYbConfigMap() {
		return ybConfigMap;
	}

	@Override
	public void startServer() throws RunServerException {
		GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.EXT_ACTIVITY_YB_BACK);
		String content = globalData.getContent();
		if (content == null || content.equals("") || content.equals("{}")) {

		} else {
			Temp_Config_zshdybfl_315 temp_Config_zshdybfl_315 = JSONObject.parseObject(content,
					Temp_Config_zshdybfl_315.class);
			// 设置数据
			temp_Config_zshdybfl_315.setConfig();
		}
	}

	@Override
	public void shutdownServer() {
		GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.EXT_ACTIVITY_YB_BACK);
		Temp_Config_zshdybfl_315 temp_Config_zshdybfl_315 = new Temp_Config_zshdybfl_315();
		// 设置临时保存对象数据
		temp_Config_zshdybfl_315.setTemp_Config();
		globalData.setContent(JSON.toJSONString(temp_Config_zshdybfl_315));
		GlobalCache.doSync(globalData);
	}

	@Override
	public void initExcel() throws RunServerException {
		ybConfigMap.clear();
		List<Struct_zshdybfl_315> ybsortList = Config_zshdybfl_315.getIns().getSortList();
		for (Struct_zshdybfl_315 struct_zshdybfl_315 : ybsortList) {
			int qs = struct_zshdybfl_315.getQs();
			Map<Integer, Struct_zshdybfl_315> map = ybConfigMap.get(qs);
			if (map == null) {
				map = new HashMap<>();
				ybConfigMap.put(qs, map);
			}
			map.put(struct_zshdybfl_315.getId(), struct_zshdybfl_315);
		}
	}

	public static void houtaiInitExcel() {
		ybConfigMap.clear();
		List<Struct_zshdybfl_315> ybsortList = Config_zshdybfl_315.getIns().getSortList();
		for (Struct_zshdybfl_315 struct_zshdybfl_315 : ybsortList) {
			int qs = struct_zshdybfl_315.getQs();
			Map<Integer, Struct_zshdybfl_315> map = ybConfigMap.get(qs);
			if (map == null) {
				map = new HashMap<>();
				ybConfigMap.put(qs, map);
			}
			map.put(struct_zshdybfl_315.getId(), struct_zshdybfl_315);
		}
	}

}
