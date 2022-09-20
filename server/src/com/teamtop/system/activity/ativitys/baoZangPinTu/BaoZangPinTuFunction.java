package com.teamtop.system.activity.ativitys.baoZangPinTu;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;

import excel.config.Config_bzptjlb_333;
import excel.config.Config_bzptrwb_333;
import excel.struct.Struct_bzptjlb_333;
import excel.struct.Struct_bzptrwb_333;

public class BaoZangPinTuFunction {
	private static volatile BaoZangPinTuFunction ins = null;

	public static BaoZangPinTuFunction getIns() {
		if (ins == null) {
			synchronized (BaoZangPinTuFunction.class) {
				if (ins == null) {
					ins = new BaoZangPinTuFunction();
				}
			}
		}
		return ins;
	}

	private BaoZangPinTuFunction() {
	}

	public BaoZangPinTu getModel(Hero hero) {
		BaoZangPinTu model = (BaoZangPinTu) hero.getHeroActivityData().getActivityDataMap()
				.get(ActivitySysId.BAO_ZANG_PIN_TU_ACT);
		return model;
	}

	public void checkTask(Hero hero, int taskType, int value) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.BAO_ZANG_PIN_TU_ACT)) {
			return;
		}
		BaoZangPinTu model = getModel(hero);
		Map<Integer, TaskInfo> taskInfoMap = model.getTaskInfoMap();
		for (Entry<Integer, TaskInfo> entry : taskInfoMap.entrySet()) {
			TaskInfo taskInfo = entry.getValue();
			Struct_bzptrwb_333 config = Config_bzptrwb_333.getIns().get(taskInfo.getTaskId());
			if (config == null) {
				return;
			}
			if (config.getRw() == taskType) {
				if (taskInfo.getState() != 0) {
					return;
				}
				if (taskType == BaoZangPinTuConst.TASK_TYPE_8) {
					// 乱世段位特殊处理
					taskInfo.setValue(value);
				} else {
					taskInfo.setValue(taskInfo.getValue() + value);
				}

				if (taskInfo.getValue() >= config.getCs()) {
					taskInfo.setState(1);
					redPoint(hero, false);
				}
			}
		}

	}

	public void checkBox(Hero hero) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.BAO_ZANG_PIN_TU_ACT)) {
			return;
		}
		BaoZangPinTu model = getModel(hero);
		Map<Integer, Integer> boxInfoMap = model.getBoxInfoMap();
		List<Integer> canGetList = new ArrayList<>();
		for (Entry<Integer, Integer> entry : boxInfoMap.entrySet()) {
			Integer cfgId = entry.getKey();
			Integer state = entry.getValue();
			if (state != 0) {
				continue;
			}
			Struct_bzptjlb_333 config = Config_bzptjlb_333.getIns().get(cfgId);
			if (config == null) {
				continue;
			}
			int[][] rws = config.getRw();
			boolean isCanGet = true;
			for (int[] rw : rws) {
				TaskInfo taskInfo = model.getTaskInfoMap().get(rw[0]);
				if (taskInfo == null) {
					// 配置出错
					isCanGet = false;
					break;
				}
				if (taskInfo.getState() != 2) {
					isCanGet = false;
					break;
				}
			}
			if (isCanGet) {
				canGetList.add(config.getId());
			}
		}
		for (int id : canGetList) {
			model.getBoxInfoMap().put(id, 1);
		}
		redPoint(hero, false);
	}

	/**
	 * 红点发送
	 * 
	 * @param isLogin
	 *            是否登录状态
	 */
	public void redPoint(Hero hero, boolean isLogin) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.BAO_ZANG_PIN_TU_ACT)) {
			return;
		}
		BaoZangPinTu model = getModel(hero);
		Map<Integer, Integer> boxInfoMap = model.getBoxInfoMap();
		for (Entry<Integer, Integer> entry : boxInfoMap.entrySet()) {
			Integer state = entry.getValue();
			if (state == 1) {
				if (isLogin) {
					RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.BAO_ZANG_PIN_TU_ACT, 1,
							RedPointConst.HAS_RED);
					RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.BAO_ZANG_PIN_TU_ACT, 1,
							RedPointConst.HAS_RED);
					return;
				} else {
					RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.BAO_ZANG_PIN_TU_ACT, 1,
							RedPointConst.HAS_RED);
					RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.BAO_ZANG_PIN_TU_ACT, 1,
							RedPointConst.HAS_RED);
					return;
				}
			}
		}

		Map<Integer, TaskInfo> taskInfoMap = model.getTaskInfoMap();
		for (Entry<Integer, TaskInfo> entry : taskInfoMap.entrySet()) {
			TaskInfo taskInfo = entry.getValue();
			if (taskInfo.getState() == 1) {
				if (isLogin) {
					RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.BAO_ZANG_PIN_TU_ACT, 1,
							RedPointConst.HAS_RED);
					RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.BAO_ZANG_PIN_TU_ACT, 1,
							RedPointConst.HAS_RED);
					return;
				} else {
					RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.BAO_ZANG_PIN_TU_ACT, 1,
							RedPointConst.HAS_RED);
					RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.BAO_ZANG_PIN_TU_ACT, 1,
							RedPointConst.HAS_RED);
					return;
				}
			}
		}

		if (!isLogin) {
			RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.BAO_ZANG_PIN_TU_ACT, 1,
					RedPointConst.NO_RED);
			RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.BAO_ZANG_PIN_TU_ACT, 1,
					RedPointConst.NO_RED);
		}
	}
}
