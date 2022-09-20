
package com.teamtop.system.exclusiveActivity;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.codehaus.jackson.map.ObjectMapper;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossZone;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.exclusiveActivity.exOneRecharge.ExActOneRechargeManager;
import com.teamtop.system.exclusiveActivity.exOneRechargeBack.ExActOneRechargeBackManager;
import com.teamtop.system.exclusiveActivity.exOverCallbackYBSe.ExActOverCallbackYBSeManager;
import com.teamtop.system.exclusiveActivity.exTotalRecharge.ExActTotalRechargeSysManager;
import com.teamtop.system.exclusiveActivity.exclusiveShop.ExclusiveShopManager;
import com.teamtop.system.exclusiveActivity.model.ExclusiveActivityInfo;
import com.teamtop.system.exclusiveActivity.tempConfig.Temp_Config;
import com.teamtop.system.exclusiveActivity.tempConfig.Temp_Config_zshdb_315;
import com.teamtop.system.exclusiveActivity.tempConfig.Temp_Config_zshddbcz_315;
import com.teamtop.system.exclusiveActivity.tempConfig.Temp_Config_zshddbfl_315;
import com.teamtop.system.exclusiveActivity.tempConfig.Temp_Config_zshdljcz_315;
import com.teamtop.system.exclusiveActivity.tempConfig.Temp_Config_zshdybfl_315;
import com.teamtop.system.exclusiveActivity.tempConfig.Temp_Config_zshdzssd_315;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.util.cache.union.UC;
import com.teamtop.util.excel.ConfigBase;
import com.teamtop.util.log.LogTool;

import excel.config.Config_zshdb_315;
import excel.config.Config_zshddbcz_315;
import excel.config.Config_zshddbfl_315;
import excel.config.Config_zshdljcz_315;
import excel.config.Config_zshdybfl_315;
import excel.config.Config_zshdzssd_315;
import excel.struct.Struct_zshdb_315;
import excel.struct.Struct_zshddbcz_315;
import excel.struct.Struct_zshddbfl_315;
import excel.struct.Struct_zshdljcz_315;
import excel.struct.Struct_zshdybfl_315;
import excel.struct.Struct_zshdzssd_315;

public class ExclusiveActivitySysCache extends AbsServerEvent {
	
	/** 1：开启，2：关闭*/
	public static int EXCLUSIVE_STATE = 1;
	
	private static Map<Integer, Struct_zshdb_315> exActPfMap = new HashMap<>();

	/***/
	private static Map<Integer, Set<Integer>> actUidSetMap = new HashMap<>();

	/** 在开专属活动*/
	private static Map<Integer, ExclusiveActivityInfo> openExActMap = UC.reg("openExActMap", new HashMap<>());

	/**
	 * key:活动id, value:活动逻辑处理类
	 */
	private static Map<Integer, AbsExclusiveActivityManager> exActManagerMap = UC.reg("exActManagerMap", new HashMap<>());

	/**
	 * key:活动id, value:数据表结构类
	 */
	private static Map<Integer, Class<?>> exActStructMap = UC.reg("exActStructMap", new HashMap<>());

	/**
	 * key:活动id, value:数据表数据集合类
	 */
	private static Map<Integer, Class<?>> exActConfigMap = UC.reg("exActConfigMap", new HashMap<>());

	/**
	 * key:活动id, value:数据表对象
	 */
	private static Map<Integer, ConfigBase> exActConfigInsMap = UC.reg("exActConfigMap", new HashMap<>());

	/**
	 * key:活动id, value:数据表对象
	 */
	private static Map<Integer, Class<?>> tempConfigInsMap = UC.reg("exActConfigMap", new HashMap<>());

	public static Map<Integer, ExclusiveActivityInfo> getOpenExActMap() {
		return openExActMap;
	}

	public static void setOpenExActMap(Map<Integer, ExclusiveActivityInfo> openExActMap) {
		ExclusiveActivitySysCache.openExActMap = openExActMap;
	}

	public static Map<Integer, AbsExclusiveActivityManager> getExActManagerMap() {
		return exActManagerMap;
	}

	public static void setExActManagerMap(Map<Integer, AbsExclusiveActivityManager> exActManagerMap) {
		ExclusiveActivitySysCache.exActManagerMap = exActManagerMap;
	}

	public static Map<Integer, Set<Integer>> getActUidSetMap() {
		return actUidSetMap;
	}

	public static void setActUidSetMap(Map<Integer, Set<Integer>> actUidSetMap) {
		ExclusiveActivitySysCache.actUidSetMap = actUidSetMap;
	}

	public static Map<Integer, Struct_zshdb_315> getExActPfMap() {
		return exActPfMap;
	}

	public static void setExActPfMap(Map<Integer, Struct_zshdb_315> exActPfMap) {
		ExclusiveActivitySysCache.exActPfMap = exActPfMap;
	}

	public static AbsExclusiveActivityManager getExActMgr(int actId) {
		return exActManagerMap.get(actId);
	}

	public static Map<Integer, Class<?>> getExActStructMap() {
		return exActStructMap;
	}

	public static void setExActStructMap(Map<Integer, Class<?>> exActStructMap) {
		ExclusiveActivitySysCache.exActStructMap = exActStructMap;
	}

	public static Map<Integer, Class<?>> getExActConfigMap() {
		return exActConfigMap;
	}

	public static void setExActConfigMap(Map<Integer, Class<?>> exActConfigMap) {
		ExclusiveActivitySysCache.exActConfigMap = exActConfigMap;
	}

	public static Map<Integer, ConfigBase> getExActConfigInsMap() {
		return exActConfigInsMap;
	}

	public static void setExActConfigInsMap(Map<Integer, ConfigBase> exActConfigInsMap) {
		ExclusiveActivitySysCache.exActConfigInsMap = exActConfigInsMap;
	}

	public static boolean isOpenState() {
		return EXCLUSIVE_STATE == 1;
	}

	public static void initExActStruct() {
		exActStructMap.put(SystemIdConst.EXACT_ONE_RECHARGE, Struct_zshddbcz_315.class);
		exActStructMap.put(SystemIdConst.EXCLUSIVE_SHOP, Struct_zshdzssd_315.class);
		exActStructMap.put(SystemIdConst.EXCLUSIVE_ONE_BACK, Struct_zshddbfl_315.class);
		exActStructMap.put(SystemIdConst.EXCLUSIVE_YB_BACK, Struct_zshdybfl_315.class);
		exActStructMap.put(SystemIdConst.EXCLUSIVE_TOTAL_RECHARGE, Struct_zshdljcz_315.class);
	}

	public static void initExActConfig() {
		exActConfigMap.put(SystemIdConst.EXACT_ONE_RECHARGE, Config_zshddbcz_315.class);
		exActConfigMap.put(SystemIdConst.EXCLUSIVE_SHOP, Config_zshdzssd_315.class);
		exActConfigMap.put(SystemIdConst.EXCLUSIVE_ONE_BACK, Config_zshddbfl_315.class);
		exActConfigMap.put(SystemIdConst.EXCLUSIVE_YB_BACK, Config_zshdybfl_315.class);
		exActConfigMap.put(SystemIdConst.EXCLUSIVE_TOTAL_RECHARGE, Config_zshdljcz_315.class);
	}

	public static void initTemp_Config() {
		tempConfigInsMap.put(SystemIdConst.EXACT_ONE_RECHARGE, Temp_Config_zshddbcz_315.class);
		tempConfigInsMap.put(SystemIdConst.EXCLUSIVE_SHOP, Temp_Config_zshdzssd_315.class);
		tempConfigInsMap.put(SystemIdConst.EXCLUSIVE_ONE_BACK, Temp_Config_zshddbfl_315.class);
		tempConfigInsMap.put(SystemIdConst.EXCLUSIVE_YB_BACK, Temp_Config_zshdybfl_315.class);
		tempConfigInsMap.put(SystemIdConst.EXCLUSIVE_TOTAL_RECHARGE, Temp_Config_zshdljcz_315.class);
	}

	public static void initExActConfigIns() {
		exActConfigInsMap.put(SystemIdConst.EXACT_ONE_RECHARGE, Config_zshddbcz_315.getIns());
		exActConfigInsMap.put(SystemIdConst.EXCLUSIVE_SHOP, Config_zshdzssd_315.getIns());
		exActConfigInsMap.put(SystemIdConst.EXCLUSIVE_ONE_BACK, Config_zshddbfl_315.getIns());
		exActConfigInsMap.put(SystemIdConst.EXCLUSIVE_YB_BACK, Config_zshdybfl_315.getIns());
		exActConfigInsMap.put(SystemIdConst.EXCLUSIVE_TOTAL_RECHARGE, Config_zshdljcz_315.getIns());
	}

	public static void initExActManager() {
		exActManagerMap.put(SystemIdConst.EXACT_ONE_RECHARGE, ExActOneRechargeManager.getIns());
		exActManagerMap.put(SystemIdConst.EXCLUSIVE_SHOP, ExclusiveShopManager.getIns());
		exActManagerMap.put(SystemIdConst.EXCLUSIVE_ONE_BACK, ExActOneRechargeBackManager.getIns());
		exActManagerMap.put(SystemIdConst.EXCLUSIVE_YB_BACK, ExActOverCallbackYBSeManager.getIns());
		exActManagerMap.put(SystemIdConst.EXCLUSIVE_TOTAL_RECHARGE, ExActTotalRechargeSysManager.getIns());
	}

	@Override
	public void startServer() throws RunServerException {
		try {
			if (!CrossZone.isCrossServer()) {
				GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.EXT_ACTIVITY);
				String content = globalData.getContent();
				if (content == null || content.equals("") || content.equals("{}")) {

				} else {
					Type type = new TypeReference<Map<Integer, ExclusiveActivityInfo>>() {
					}.getType();
					Map<Integer, ExclusiveActivityInfo> tempOpenExActMap = JSONObject.parseObject(content, type);
					if (tempOpenExActMap != null) {
						openExActMap = tempOpenExActMap;
					}
				}
			}
			GlobalData globalDataState = GlobalCache.getGlobalData(GlobalConst.EXT_ACTIVITY_STATE);
			String stateContent = globalDataState.getContent();
			if (stateContent == null || stateContent.equals("") || stateContent.equals("{}")) {

			} else {
				EXCLUSIVE_STATE = Integer.parseInt(stateContent);
			}
			// 初始化各活动逻辑处理类
			initExActManager();

			initExActStruct();
			initExActConfig();
			initExActConfigIns();
			
			// 活动表数据
			GlobalData globalDataTable = GlobalCache.getGlobalData(GlobalConst.EXT_ACTIVITY_TABLE);
			String tableContent = globalDataTable.getContent();
			if (tableContent == null || tableContent.equals("") || tableContent.equals("{}")) {

			} else {
				Temp_Config_zshdb_315 temp_Config_zshdb_315 = JSONObject.parseObject(tableContent,
						Temp_Config_zshdb_315.class);
				// 设置数据
				temp_Config_zshdb_315.setConfig();
			}

			// 活动奖励数据
//			GlobalData rewardTable = GlobalCache.getGlobalData(GlobalConst.EXT_ACTIVITY_REWARD_TABLE);
//			String rewardContent = rewardTable.getContent();
//			if (rewardContent == null || rewardContent.equals("") || rewardContent.equals("{}")) {
//
//			} else {
//				Type type = new TypeReference<Map<Integer, String>>() {}.getType();
//				Map<Integer, String> map = JSONObject.parseObject(rewardContent, type);
//				Iterator<Integer> iterator = map.keySet().iterator();
//				for (; iterator.hasNext();) {
//					int actId = iterator.next();
//					String tempStr = map.get(actId);
//					Temp_Config temp = (Temp_Config) JSONObject.parseObject(tempStr, tempConfigInsMap.get(actId));
//					temp.setConfig();
//				}
//			}
		} catch (Exception e) {
			LogTool.error(e, ExclusiveActivitySysCache.class, "ExclusiveActivitySysCache startServer");
			throw new RunServerException(e, "");
		}
	}

	@Override
	public void shutdownServer() {
		try {
			if (!CrossZone.isCrossServer()) {
				GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.EXT_ACTIVITY);
				globalData.setContent(JSON.toJSONString(openExActMap));
				GlobalCache.doSync(globalData);
			}
			// 状态
			GlobalData globalDataState = GlobalCache.getGlobalData(GlobalConst.EXT_ACTIVITY_STATE);
			globalDataState.setContent(EXCLUSIVE_STATE + "");
			GlobalCache.doSync(globalDataState);

			// 活动表数据
			GlobalData globalDataTable = GlobalCache.getGlobalData(GlobalConst.EXT_ACTIVITY_TABLE);
			Temp_Config_zshdb_315 temp_Config_zshdb_315 = new Temp_Config_zshdb_315();
			// 设置临时保存对象数据
			temp_Config_zshdb_315.setTemp_Config();
			globalDataTable.setContent(JSON.toJSONString(temp_Config_zshdb_315));
			GlobalCache.doSync(globalDataTable);

			// 活动奖励数据
//			GlobalData rewardTable = GlobalCache.getGlobalData(GlobalConst.EXT_ACTIVITY_REWARD_TABLE);
//			Map<Integer, String> map = new HashMap<>();
//			Iterator<Integer> iterator = tempConfigInsMap.keySet().iterator();
//			for (; iterator.hasNext();) {
//				Integer actId = iterator.next();
//				Class<?> clazz = tempConfigInsMap.get(actId);
//				Temp_Config config = (Temp_Config) clazz.newInstance();
//				config.setTemp_Config();
//				map.put(actId, JSON.toJSONString(config));
//			}
//			rewardTable.setContent(JSON.toJSONString(map));
//			GlobalCache.doSync(rewardTable);
		} catch (Exception e) {
			LogTool.error(e, ExclusiveActivitySysCache.class, "ExclusiveActivitySysCache shutdownServer");
		}
	}

	@Override
	public void initExcel() throws RunServerException {
		exActPfMap.clear();
		List<Struct_zshdb_315> sortList = Config_zshdb_315.getIns().getSortList();
		int size = sortList.size();
		for (int i = 0; i < size; i++) {
			Struct_zshdb_315 zshdb_315 = sortList.get(i);
			if (GameProperties.platform.equals(zshdb_315.getWdid())) {
				exActPfMap.put(zshdb_315.getId(), zshdb_315);
			}
		}
		// 定时检测活动状态
		ExclusiveActivityFunction.getIns().checkActTime();
		// 是否有活动结束
		ExclusiveActivityFunction.getIns().checkExActEnd();
		// 是否有活动开启
		ExclusiveActivityFunction.getIns().checkActOpenInitExcel();
	}

	public static void houtaiInitExcel() {
		exActPfMap.clear();
		List<Struct_zshdb_315> sortList = Config_zshdb_315.getIns().getSortList();
		int size = sortList.size();
		for (int i = 0; i < size; i++) {
			Struct_zshdb_315 zshdb_315 = sortList.get(i);
			if (GameProperties.platform.equals(zshdb_315.getWdid())) {
				exActPfMap.put(zshdb_315.getId(), zshdb_315);
			}
		}
	}

	public static void main(String[] args) {
		try {
			initTemp_Config();
			Map<Integer, String> map1 = new HashMap<>();
			ObjectMapper mapper = new ObjectMapper();
			Iterator<Integer> iterator1 = tempConfigInsMap.keySet().iterator();
			for (; iterator1.hasNext();) {
				Integer actId = iterator1.next();
				Class<?> clazz = tempConfigInsMap.get(actId);
				Temp_Config config = (Temp_Config) clazz.newInstance();
				config.setTemp_Config();
				map1.put(actId, JSON.toJSONString(config));
			}
			String rewardContent = JSON.toJSONString(map1);
			Type type = new TypeReference<Map<Integer, String>>() {
			}.getType();
			Map<Integer, String> map = JSONObject.parseObject(rewardContent, type);
			Iterator<Integer> iterator = map.keySet().iterator();
			for (; iterator.hasNext();) {
				int actId = iterator.next();
				String tempStr = map.get(actId);
				Temp_Config temp = (Temp_Config) JSONObject.parseObject(tempStr, tempConfigInsMap.get(actId));
				temp.setConfig();
			}
			System.err.println(Config_zshdzssd_315.getIns().getSortList().size());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
