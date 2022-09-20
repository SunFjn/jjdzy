package com.teamtop.system.openDaysSystem.shaozhuSevenDayTarget;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.openDaysSystem.shaozhuSevenDayTarget.imp.ShaozhuOtherSkillLvImp;
import com.teamtop.system.openDaysSystem.shaozhuSevenDayTarget.imp.ShaozhuQinmiduLvImp;
import com.teamtop.system.openDaysSystem.shaozhuSevenDayTarget.imp.ShaozhuStarImp;
import com.teamtop.system.openDaysSystem.shaozhuSevenDayTarget.imp.ShaozhuStrengthImp;
import com.teamtop.system.openDaysSystem.shaozhuSevenDayTarget.imp.ShaozhuWashNumImp;

import excel.config.Config_scqrmb_272;
import excel.struct.Struct_scqrmb_272;

public class ShaoZhuSevenDayTargetCache extends AbsServerEvent {
	/** 少主活动-七日目标表配置 第一层key:type 第二层key:配置表id value:配置表 */
	private static Map<Integer, Map<Integer, Struct_scqrmb_272>> configMap = new HashMap<>();
	/** 少主活动-七日目标表配置 第一层key:type 第二层key:配置表参数c2 value:配置表List */
	private static Map<Integer, Map<Integer, List<Struct_scqrmb_272>>> configListMap = new HashMap<>();
	/** 少主活动-七日目标各系统实现缓存 */
	private static Map<Integer, ShaoZhuSevenDayTargetAbs> sevenDayTargetAbsMap = new HashMap<>();

	public static Map<Integer, Map<Integer, Struct_scqrmb_272>> getConfigMap() {
		return configMap;
	}

	public static Map<Integer, Map<Integer, List<Struct_scqrmb_272>>> getConfigListMap() {
		return configListMap;
	}

	public static Map<Integer, ShaoZhuSevenDayTargetAbs> getSevenDayTargetAbsMap() {
		return sevenDayTargetAbsMap;
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub
		sevenDayTargetAbsMap.put(ShaoZhuSevenDayTargetConst.SHAOZHU_STAR, new ShaozhuStarImp());
		sevenDayTargetAbsMap.put(ShaoZhuSevenDayTargetConst.QINMIDU, new ShaozhuQinmiduLvImp());
		sevenDayTargetAbsMap.put(ShaoZhuSevenDayTargetConst.SKILL_XILIAN, new ShaozhuWashNumImp());
		sevenDayTargetAbsMap.put(ShaoZhuSevenDayTargetConst.SKILL_STAR, new ShaozhuOtherSkillLvImp());
		sevenDayTargetAbsMap.put(ShaoZhuSevenDayTargetConst.SHAOZHU_STRENGTH, new ShaozhuStrengthImp());
	}

	@Override
	public void initExcel() throws RunServerException {
		// TODO Auto-generated method stub
		configMap.clear();
		configListMap.clear();
		List<Struct_scqrmb_272> sortList = Config_scqrmb_272.getIns().getSortList();
		for (Struct_scqrmb_272 struct_scqrmb_272 : sortList) {
			int id = struct_scqrmb_272.getId();
			int type = id / 1000;
			Map<Integer, Struct_scqrmb_272> map = configMap.get(type);
			if (map == null) {
				map = new HashMap<>();
				configMap.put(type, map);
			}
			map.put(id, struct_scqrmb_272);

			Map<Integer, List<Struct_scqrmb_272>> map2 = configListMap.get(type);
			if (map2 == null) {
				map2 = new HashMap<>();
				configListMap.put(type, map2);
			}
			int c2 = struct_scqrmb_272.getC2();
			List<Struct_scqrmb_272> list = map2.get(c2);
			if (list == null) {
				list = new ArrayList<>();
				map2.put(c2, list);
			}
			list.add(struct_scqrmb_272);
		}
	}

}
