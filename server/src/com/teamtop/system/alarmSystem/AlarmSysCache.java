package com.teamtop.system.alarmSystem;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

public class AlarmSysCache {
	
	/** 
	 * 元宝预警（每小时每人一次）
	 * key:玩家id， value:时间戳
	 */
	public static Map<Long, Integer> ybAlarm = new HashMap<>();
	
	/** 
	 * 铜钱预警（每小时每人一次）
	 * key:玩家id， value:时间戳
	 */
	public static Map<Long, Integer> coinAlarm = new HashMap<>();
	
	/** 
	 * 道具预警（每小时每人每种道具一次）
	 * key:玩家id， value:时间戳
	 */
	public static Map<Long, Map<Integer, Integer>> toolAlarm = new HashMap<>();
	
	/**
	 * 入库预警
	 * key:表名，value:Set<字段>
	 */
	public static Map<String, Set<String>> dbAlarm = new HashMap<>();
	
	/** 公共类型预警 */
	public static Map<AlarmType, Integer> alarmLimitMap = new HashMap<>();
	
	public static Map<AlarmType, Integer> alarmTimeMap = new HashMap<>();

	static {
		alarmTimeMap.put(AlarmType.SELF_MOTION_CHECK_NUM, AlarmConst.ALARM_TIME);
	}

	public static Map<Long, Integer> getYbAlarm() {
		return ybAlarm;
	}

	public static void setYbAlarm(Map<Long, Integer> ybAlarm) {
		AlarmSysCache.ybAlarm = ybAlarm;
	}

	public static Map<Long, Integer> getCoinAlarm() {
		return coinAlarm;
	}

	public static void setCoinAlarm(Map<Long, Integer> coinAlarm) {
		AlarmSysCache.coinAlarm = coinAlarm;
	}

	public static Map<String, Set<String>> getDbAlarm() {
		return dbAlarm;
	}

	public static void setDbAlarm(Map<String, Set<String>> dbAlarm) {
		AlarmSysCache.dbAlarm = dbAlarm;
	}

	public static Map<AlarmType, Integer> getAlarmLimitMap() {
		return alarmLimitMap;
	}

	public static void setAlarmLimitMap(Map<AlarmType, Integer> alarmLimitMap) {
		AlarmSysCache.alarmLimitMap = alarmLimitMap;
	}

	public static Map<AlarmType, Integer> getAlarmTimeMap() {
		return alarmTimeMap;
	}

	public static void setAlarmTimeMap(Map<AlarmType, Integer> alarmTimeMap) {
		AlarmSysCache.alarmTimeMap = alarmTimeMap;
	}

	public static Map<Long, Map<Integer, Integer>> getToolAlarm() {
		return toolAlarm;
	}

	public static void setToolAlarm(Map<Long, Map<Integer, Integer>> toolAlarm) {
		AlarmSysCache.toolAlarm = toolAlarm;
	}

}
