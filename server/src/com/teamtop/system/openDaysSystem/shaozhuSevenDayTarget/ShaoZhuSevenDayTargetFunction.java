package com.teamtop.system.openDaysSystem.shaozhuSevenDayTarget;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.shaozhuSevenDayTarget.model.ShaoZhuSevenDayTarget;
import com.teamtop.system.openDaysSystem.shaozhuSevenDayTarget.model.ShaoZhuSevenDayTargetModel;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

import excel.struct.Struct_scqrmb_272;

public class ShaoZhuSevenDayTargetFunction {
	private static volatile ShaoZhuSevenDayTargetFunction ins = null;

	public static ShaoZhuSevenDayTargetFunction getIns() {
		if (ins == null) {
			synchronized (ShaoZhuSevenDayTargetFunction.class) {
				if (ins == null) {
					ins = new ShaoZhuSevenDayTargetFunction();
				}
			}
		}
		return ins;
	}

	private ShaoZhuSevenDayTargetFunction() {
	}

	/**
	 * 取得少主活动-七日目标model
	 * 
	 * @param hero
	 * @return
	 */
	public ShaoZhuSevenDayTarget getModel(Hero hero) {
		int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.SHAOZHU_SEVENDAYTARGET);
		ShaoZhuSevenDayTarget model = (ShaoZhuSevenDayTarget) ShaoZhuSevenDayTargetManager.getIns().getSystemModel(hero,
				uid);
		return model;
	}

	/**
	 * 少主活动-七日目标 更新处理
	 * 
	 * @param hero
	 * @param type
	 * @param obj
	 */
	public void updateHandle(Hero hero, int[] typeArray, Object... objArray) {
		int type1 = 0;
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.SHAOZHU_SEVENDAYTARGET)) {
				return;
			}
			if (typeArray != null) {
				if (typeArray.length == 0) {
					LogTool.warn("updateHandle typeArray.length=0", this);
					return;
				}
				for (int type : typeArray) {
					type1 = type;
					ShaoZhuSevenDayTargetAbs sevenDayTargetAbs = ShaoZhuSevenDayTargetCache.getSevenDayTargetAbsMap()
							.get(type);
					ShaoZhuSevenDayTarget sevenDayTarget = ShaoZhuSevenDayTargetFunction.getIns().getModel(hero);
					Map<Integer, ShaoZhuSevenDayTargetModel> modelByTypeMap = sevenDayTarget.getModelByTypeMap();
					ShaoZhuSevenDayTargetModel sevenDayTargetModel = modelByTypeMap.get(type);
					if (sevenDayTargetModel == null) {
						sevenDayTargetModel = createAndInitModel();
						modelByTypeMap.put(type, sevenDayTargetModel);
					}
					sevenDayTargetAbs.updateHandle(hero, type, objArray);

					Map<Integer, Map<Integer, List<Struct_scqrmb_272>>> configListMap = ShaoZhuSevenDayTargetCache
							.getConfigListMap();
					Map<Integer, List<Struct_scqrmb_272>> configMap = configListMap.get(type);
					for (Entry<Integer, List<Struct_scqrmb_272>> entry : configMap.entrySet()) {
						Integer c2 = entry.getKey();
						Map<Integer, Integer> scheduleMap = sevenDayTargetModel.getScheduleMap();
						int schedule = sevenDayTargetAbs.scheduleHandle(hero, c2);
						scheduleMap.put(c2, schedule);
						List<Struct_scqrmb_272> list = entry.getValue();
						int size = list.size();
						Map<Integer, Integer> awardStateMapById = sevenDayTargetModel.getAwardStateMapById();
						for (int i = 0; i < size; i++) {
							Struct_scqrmb_272 struct_scqrmb_272 = list.get(i);
							Integer state = awardStateMapById.get(struct_scqrmb_272.getId());
							if (state == null) {
								int c1 = struct_scqrmb_272.getC1();
								if (schedule >= c1) {
									awardStateMapById.put(struct_scqrmb_272.getId(),
											ShaoZhuSevenDayTargetConst.CAN_GET);
									RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.SHAO_ZHU_HUO_DONG,
											type, RedPointConst.HAS_RED);
									RedPointFunction.getIns().fastUpdateRedPoint(hero,
											SystemIdConst.SHAOZHU_SEVENDAYTARGET, type, RedPointConst.HAS_RED);
								}
							}
						}
					}
				}
			}
		} catch (Exception e) {
			// TODO: handle exception
			StringBuilder str = new StringBuilder();
			if (objArray != null) {
				for (Object obj : objArray) {
					str.append(obj.toString()).append(" ,");
				}
			}
			LogTool.error(e, this, hero.getId(), hero.getName(), "updateHandle type:" + type1 + " objArray:" + str);
		}
	}

	/**
	 * 创建和初始化SevenDayTargetModel
	 * 
	 * @return
	 */
	private ShaoZhuSevenDayTargetModel createAndInitModel() {
		ShaoZhuSevenDayTargetModel sevenDayTargetModel = new ShaoZhuSevenDayTargetModel();
		sevenDayTargetModel.setAwardStateMapById(new HashMap<>());
		sevenDayTargetModel.setScheduleMap(new HashMap<>());
		return sevenDayTargetModel;
	}

	/**
	 * 红点发送
	 * 
	 * @param isLogin 是否登录状态
	 */
	public void redPoint(Hero hero, boolean isLogin) {
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.SHAOZHU_SEVENDAYTARGET)) {
			return;
		}
		ShaoZhuSevenDayTarget sevenDayTarget = ShaoZhuSevenDayTargetFunction.getIns().getModel(hero);
		Map<Integer, ShaoZhuSevenDayTargetModel> modelByTypeMap = sevenDayTarget.getModelByTypeMap();
		for (Entry<Integer, ShaoZhuSevenDayTargetModel> entry : modelByTypeMap.entrySet()) {
			Integer type = entry.getKey();
			ShaoZhuSevenDayTargetModel model = entry.getValue();
			Map<Integer, Integer> awardStateMapById = model.getAwardStateMapById();
			for (Integer state : awardStateMapById.values()) {
				if (state == ShaoZhuSevenDayTargetConst.CAN_GET) {
					if (isLogin) {
						RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.SHAO_ZHU_HUO_DONG, type,
								RedPointConst.HAS_RED);
						RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.SHAOZHU_SEVENDAYTARGET, type,
								RedPointConst.HAS_RED);
						break;
					} else {
						RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.SHAO_ZHU_HUO_DONG, type,
								RedPointConst.HAS_RED);
						RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.SHAOZHU_SEVENDAYTARGET, type,
								RedPointConst.HAS_RED);
						break;
					}
				}
			}
		}
	}
}
