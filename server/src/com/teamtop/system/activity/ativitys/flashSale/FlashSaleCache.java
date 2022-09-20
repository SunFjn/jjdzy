package com.teamtop.system.activity.ativitys.flashSale;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.util.log.LogTool;

import excel.config.Config_xhdxsqg_403;
import excel.struct.Struct_xhdxsqg_403;

public class FlashSaleCache extends AbsServerEvent {
	/** 限时抢购配置表 <期数，<配置表id,抢购数据>> **/
	private static Map<Integer, Map<Integer, Struct_xhdxsqg_403>> excelConfig = new HashMap<>();
	/**<抢购ID,已购次数> */
	public static ConcurrentHashMap<Integer, Integer> buyMap = new ConcurrentHashMap<>();
	
	@Override
	public void startServer() throws RunServerException {
		String content = null;
		try {
			content = GlobalCache.getGlobalData(GlobalConst.FLASHSALE_ACT).getContent();
			if (content == null || content.equals("") || content.equals("{}")) {
			} else {
				FlashSaleCache.buyMap = JSONObject.parseObject(content, new TypeReference<ConcurrentHashMap<Integer,Integer>>() {}.getType());
			}
		} catch (Exception e) {
			LogTool.error(e, this, "FlashSaleCache startServer 异常 content:" + content);
		}
	}

	@Override
	public void shutdownServer() {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.FLASHSALE_ACT);
			String content = JSON.toJSONString(FlashSaleCache.buyMap);
			globalData.setContent(content);
			GlobalCache.doSync(globalData);
		} catch (Exception e) {
			LogTool.error(e, this, "FlashSaleCache shutdownServer:异常");
		}
	}
	
	@Override
	public void initExcel() throws RunServerException{
		try {
			excelConfig.clear();
			List<Struct_xhdxsqg_403> sortList = Config_xhdxsqg_403.getIns().getSortList();
			for(Struct_xhdxsqg_403 excel : sortList) {
				int qs = excel.getQx();
				Map<Integer, Struct_xhdxsqg_403> map = excelConfig.get(qs);
				if(map == null) {
					map = new HashMap<Integer, Struct_xhdxsqg_403>();
					excelConfig.put(qs, map);
				}
				map.put(excel.getID(), excel);
			}
		}catch (Exception e) {
			LogTool.error(e, this, "FlashSaleCache initExcel has wrong");
		}
	}
	
	//获得对应期数的抢购数据
	public static Struct_xhdxsqg_403 getStruct_xhdxsqg_403(int qs, int id) {
		Map<Integer, Struct_xhdxsqg_403> ec= getExcelConfig().get(qs);
		if(ec != null) {
			return ec.get(id);
		}
		return null;
	}
	
	//获得全局购买次数
	public static int getGlobalNum(int id) {
		Integer num = buyMap.get(id);
		if(num == null) {
			num = 0;
		}
		return num;
	}
	
	public static void addGlobalNum(int id) {
		Integer num = buyMap.get(id);
		if(num == null) {
			num = 0;
		}
		buyMap.put(id, num+1);
	}

	public static Map<Integer, Map<Integer, Struct_xhdxsqg_403>> getExcelConfig() {
		return excelConfig;
	}

	public static void setExcelConfig(Map<Integer, Map<Integer, Struct_xhdxsqg_403>> excelConfig) {
		FlashSaleCache.excelConfig = excelConfig;
	}

	/*
	 * public static int getPeriods() { return periods; }
	 * 
	 * public static void setPeriods(int periods) { FlashSaleCache.periods =
	 * periods; }
	 */
	
}
