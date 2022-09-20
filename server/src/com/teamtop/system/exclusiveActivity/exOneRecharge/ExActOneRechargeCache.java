package com.teamtop.system.exclusiveActivity.exOneRecharge;

import java.util.concurrent.ConcurrentHashMap;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.exclusiveActivity.tempConfig.Temp_Config_zshddbcz_315;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.util.cache.union.UC;

import excel.config.Config_zshddbcz_315;
import excel.struct.Struct_zshddbcz_315;


public class ExActOneRechargeCache extends AbsServerEvent{

	/**
	 * 星期x-》单笔累充2id-》单笔累充2
	 */
	public static ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, Struct_zshddbcz_315>> NewOneReChargeHashMap = UC
			.reg("otherNewOneReChargeHashMap", new ConcurrentHashMap<>());
	
	@Override
	public void startServer() throws RunServerException {
		GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.EXT_ACTIVITY_ONE_RECHAREG);
		String content = globalData.getContent();
		if (content == null || content.equals("") || content.equals("{}")) {

		} else {
			Temp_Config_zshddbcz_315 temp_Config_zshddbcz_315 = JSONObject.parseObject(content,
					Temp_Config_zshddbcz_315.class);
			// 设置数据
			temp_Config_zshddbcz_315.setConfig();
		}
	}

	@Override
	public void shutdownServer() {
		GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.EXT_ACTIVITY_ONE_RECHAREG);
		Temp_Config_zshddbcz_315 temp_Config_zshddbcz_315 = new Temp_Config_zshddbcz_315();
		// 设置临时保存对象数据
		temp_Config_zshddbcz_315.setTemp_Config();
		globalData.setContent(JSON.toJSONString(temp_Config_zshddbcz_315));
		GlobalCache.doSync(globalData);
	}
	
	@Override
	public void initExcel() throws RunServerException{
		NewOneReChargeHashMap.clear();
		for (Struct_zshddbcz_315 zshddbcz_315 : Config_zshddbcz_315.getIns().getSortList()) {
			if (zshddbcz_315!=null) {
				int qs = zshddbcz_315.getQs();
				if (!NewOneReChargeHashMap.containsKey(qs)) {
					NewOneReChargeHashMap.put(qs, new ConcurrentHashMap<Integer, Struct_zshddbcz_315>());
				}
				NewOneReChargeHashMap.get(qs).put(zshddbcz_315.getXh(), zshddbcz_315);
			}
		}
	}

	public static void houtaiInitExcel() {
		NewOneReChargeHashMap.clear();
		for (Struct_zshddbcz_315 zshddbcz_315 : Config_zshddbcz_315.getIns().getSortList()) {
			if (zshddbcz_315!=null) {
				int qs = zshddbcz_315.getQs();
				if (!NewOneReChargeHashMap.containsKey(qs)) {
					NewOneReChargeHashMap.put(qs, new ConcurrentHashMap<Integer, Struct_zshddbcz_315>());
				}
				NewOneReChargeHashMap.get(qs).put(zshddbcz_315.getXh(), zshddbcz_315);
			}
		}
	}

}
