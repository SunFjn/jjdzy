package com.teamtop.system.alarmSystem.crossActAlarm;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.system.alarmSystem.crossActAlarm.imp.CrossBattleGoodsHandleImp;
import com.teamtop.system.alarmSystem.crossActAlarm.imp.CrossFireBeaconHandleImp;
import com.teamtop.system.alarmSystem.crossActAlarm.imp.CrossWenDingTianXiaHandleImp;
import com.teamtop.system.hero.SystemIdConst;

import excel.config.Config_hdyl_259;
import excel.struct.Struct_hdyl_259;

public class CrossActAlarmCache {
	/** 跨服活动监控id集合,必须是活动预览表id */
	public static Map<Integer, CrossActAlarmHandleAbs> crossActHandleMap = new HashMap<>();

	public static Map<Integer, Map<Integer, Struct_hdyl_259>> crossActConfigMap = new HashMap<>();
	/**
	 * 跨服活动监控id集合
	 */
	static {
		crossActHandleMap.put(SystemIdConst.CROSS_FIRE_BEACON, new CrossFireBeaconHandleImp());
		crossActHandleMap.put(SystemIdConst.CROSS_WEN_DING_TIAN_XIA, new CrossWenDingTianXiaHandleImp());
		crossActHandleMap.put(SystemIdConst.CROSS_BTTLE_GOOD, new CrossBattleGoodsHandleImp());

		initCrossActHandleMap();
	}

	public static void initCrossActHandleMap() {
		for (Integer actId : crossActHandleMap.keySet()) {
			List<Struct_hdyl_259> sortList = Config_hdyl_259.getIns().getSortList();
			for (Struct_hdyl_259 struct_hdyl_259 : sortList) {
				if (struct_hdyl_259.getSysid() == actId) {
					Map<Integer, Struct_hdyl_259> map = crossActConfigMap.get(actId);
					if (map == null) {
						map = new HashMap<>();
						crossActConfigMap.put(actId, map);
					}
					map.put(struct_hdyl_259.getDay(), struct_hdyl_259);
				}
			}
		}
	}
}
