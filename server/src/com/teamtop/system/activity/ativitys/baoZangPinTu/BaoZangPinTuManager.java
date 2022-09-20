package com.teamtop.system.activity.ativitys.baoZangPinTu;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;

import excel.config.Config_bzptjlb_333;
import excel.config.Config_bzptrwb_333;
import excel.struct.Struct_bzptjlb_333;
import excel.struct.Struct_bzptrwb_333;

public class BaoZangPinTuManager extends AbstractActivityManager {
	private static volatile BaoZangPinTuManager ins = null;

	public static BaoZangPinTuManager getIns() {
		if (ins == null) {
			synchronized (BaoZangPinTuManager.class) {
				if (ins == null) {
					ins = new BaoZangPinTuManager();
				}
			}
		}
		return ins;
	}

	private BaoZangPinTuManager() {
	}

	public void activate(Hero hero, int cfgId) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.BAO_ZANG_PIN_TU_ACT)) {
			return;
		}
		BaoZangPinTu model = BaoZangPinTuFunction.getIns().getModel(hero);
		TaskInfo taskInfo = model.getTaskInfoMap().get(cfgId);
		if (taskInfo == null) {
			// 任务不存在
			return;
		}
		if (taskInfo.getState() == 0) {
			// 任务未完成
			return;
		}
		if (taskInfo.getState() == 2) {
			// 任务已激活
			return;
		}

		taskInfo.setState(2);
		// 检查宝箱状态
		BaoZangPinTuFunction.getIns().checkBox(hero);

		BaoZangPinTuSender.sendCmd_10652(hero.getId(), 0, cfgId, taskInfo.getState());

		BaoZangPinTuFunction.getIns().redPoint(hero, false);
	}

	public void gotAward(Hero hero, int cfgId) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.BAO_ZANG_PIN_TU_ACT)) {
			return;
		}
		BaoZangPinTu model = BaoZangPinTuFunction.getIns().getModel(hero);
		Integer state = model.getBoxInfoMap().get(cfgId);
		if (state == null) {
			// 宝箱不存在
			return;
		}
		if (state == 0) {
			// 宝箱不可领取
			return;
		}
		if (state == 2) {
			// 宝箱已领取
			return;
		}

		Struct_bzptjlb_333 config = Config_bzptjlb_333.getIns().get(cfgId);
		if (config == null) {
			// 配置不存在
			return;
		}

		model.getBoxInfoMap().put(cfgId, 2);

		UseAddUtil.add(hero, config.getJl(), SourceGoodConst.BAO_ZANG_PIN_TU_BOX_AWARD, UseAddUtil.getDefaultMail(),
				true);

		BaoZangPinTuSender.sendCmd_10654(hero.getId(), 0, cfgId);

		BaoZangPinTuFunction.getIns().redPoint(hero, false);
	}

	@Override
	public void openUI(Hero hero) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.BAO_ZANG_PIN_TU_ACT)) {
			return;
		}
		BaoZangPinTu model = BaoZangPinTuFunction.getIns().getModel(hero);

		List<Object[]> taskInfos = new ArrayList<>();
		List<Object[]> boxInfos = new ArrayList<>();

		Map<Integer, TaskInfo> taskInfoMap = model.getTaskInfoMap();
		for (Entry<Integer, TaskInfo> entry : taskInfoMap.entrySet()) {
			TaskInfo taskInfo = entry.getValue();
			taskInfos.add(new Object[] { taskInfo.getTaskId(), taskInfo.getState(), taskInfo.getValue() });
		}

		Map<Integer, Integer> boxInfoMap = model.getBoxInfoMap();
		for (Entry<Integer, Integer> entry : boxInfoMap.entrySet()) {
			Integer cfgId = entry.getKey();
			Integer state = entry.getValue();
			boxInfos.add(new Object[] { cfgId, state });
		}

		BaoZangPinTuSender.sendCmd_10650(hero.getId(), taskInfos.toArray(), boxInfos.toArray());
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		return BaoZangPinTuEvent.getIns();
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		BaoZangPinTuFunction.getIns().checkTask(hero, BaoZangPinTuConst.TASK_TYPE_1, money);
	}

	@Override
	public void actOpen() {

	}

	@Override
	public void heroActOpen(Hero hero) {
		BaoZangPinTu model = BaoZangPinTuFunction.getIns().getModel(hero);
		// 初始化任务
		for (Struct_bzptrwb_333 config : Config_bzptrwb_333.getIns().getSortList()) {
			if (config.getQs() == model.getPeriods()) {
				TaskInfo taskInfo = new TaskInfo();
				taskInfo.setTaskId(config.getId());
				taskInfo.setState(0);
				taskInfo.setValue(0);
				model.getTaskInfoMap().put(config.getId(), taskInfo);
			}
		}
		// 初始化宝箱
		for (Struct_bzptjlb_333 config : Config_bzptjlb_333.getIns().getSortList()) {
			if (config.getQs() == model.getPeriods()) {
				model.getBoxInfoMap().put(config.getId(), 0);
			}
		}

		// 检查任务完成状态1,2,8
		BaoZangPinTuFunction.getIns().checkTask(hero, BaoZangPinTuConst.TASK_TYPE_1, hero.getOneDayRecharge());
		BaoZangPinTuFunction.getIns().checkTask(hero, BaoZangPinTuConst.TASK_TYPE_2, hero.getOneDayConsume());
		BaoZangPinTuFunction.getIns().checkTask(hero, BaoZangPinTuConst.TASK_TYPE_8, hero.getCrossKing().getDuanwei());
	}

	@Override
	public void actEnd() {
	}

	@Override
	public void heroActEnd(Hero hero) {
		BaoZangPinTu model = BaoZangPinTuFunction.getIns().getModel(hero);
		Map<Integer, Integer> boxInfoMap = model.getBoxInfoMap();
		List<Integer> hadGetList = new ArrayList<>();
		for (Entry<Integer, Integer> entry : boxInfoMap.entrySet()) {
			Integer cfgId = entry.getKey();
			Integer state = entry.getValue();
			if (state == 1) {
				// 有未领取宝箱
				Struct_bzptjlb_333 config = Config_bzptjlb_333.getIns().get(cfgId);
				if (config == null) {
					// 配置不存在
					continue;
				}
				MailFunction.getIns().sendMailWithFujianData2(hero.getId(), MailConst.BAO_ZANG_PIN_TU_REWARD,
						new Object[] { MailConst.BAO_ZANG_PIN_TU_REWARD }, config.getJl());
				hadGetList.add(cfgId);
			}
		}

		for (int id : hadGetList) {
			model.getBoxInfoMap().put(id, 2);
		}
	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		BaoZangPinTu model = new BaoZangPinTu();
		model.setTaskInfoMap(new HashMap<>());
		model.setBoxInfoMap(new HashMap<>());
		model.setPeriods(activityInfo.getPeriods());
		model.setHid(hero.getId());
		model.setActId(activityInfo.getActId());
		model.setIndexId(activityInfo.getIndex());
		return model;
	}

	@Override
	public Class<?> getActivityData() {
		return BaoZangPinTu.class;
	}
}
