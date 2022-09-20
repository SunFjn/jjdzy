package com.teamtop.system.openDaysSystem.talentSendGiftActive;

import java.util.Iterator;
import java.util.Map;

import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.talentSendGiftActive.model.TalentSendGiftActive;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

import excel.struct.Struct_lffwxltf_285;

public class TalentSendGiftActiveFunction {

	private static TalentSendGiftActiveFunction ins;

	private TalentSendGiftActiveFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized TalentSendGiftActiveFunction getIns() {
		if (ins == null) {
			ins = new TalentSendGiftActiveFunction();
		}
		return ins;
	}

	public void updateTaskNum(Hero hero, int addNum) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.TALENT_SEND_GIFT);
			if(uid==-1) {
				return;
			}
			TalentSendGiftActive model = (TalentSendGiftActive) TalentSendGiftActiveManager.getIns()
					.getSystemModel(hero, uid);
			if (model == null) {
				return;
			}
			model.setActiveNum(model.getActiveNum() + addNum);
			checkTask(hero, model.getActiveNum());
		} catch (Exception e) {
			LogTool.error(e, TalentSendGiftActiveFunction.class, hid, hero.getName(),
					"TalentSendGiftActiveFunction updateTaskNum");
		}
	}

	/**
	 * 检测任务状态
	 * 
	 * @param hero
	 * @param value
	 */
	public void checkTask(Hero hero, int value) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.TALENT_SEND_GIFT);
			TalentSendGiftActive model = (TalentSendGiftActive) TalentSendGiftActiveManager
					.getIns().getSystemModel(hero, uid);
			if (model == null) {
				return;
			}
			Map<Integer, Integer> rewardMap = model.getRewardMap();
			int qs = model.getQs();
			Map<Integer, Struct_lffwxltf_285> taskMap = TalentSendGiftActiveSysCache.getqsTaskMap().get(qs);
			if (taskMap == null) {
				return;
			}
			Iterator<Struct_lffwxltf_285> iterator = taskMap.values().iterator();
			Struct_lffwxltf_285 lffwxltf_285 = null;
			int id = 0;
			for (; iterator.hasNext();) {
				lffwxltf_285 = iterator.next();
				id = lffwxltf_285.getXh();
				if (value >= lffwxltf_285.getCs() && (!rewardMap.containsKey(id))) {
					rewardMap.put(id, TalentSendGiftActiveConst.CAN_GET);
				}
			}
			updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, TalentSendGiftActiveFunction.class, hid, hero.getName(),
					"TalentSendGiftActiveFunction checkTask");
		}
	}

	/**
	 * 检测红点
	 * 
	 * @param hero
	 * @return
	 */
	public boolean checkRedPoint(Hero hero) {
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.TALENT_SEND_GIFT)) {
				return false;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.TALENT_SEND_GIFT);
			TalentSendGiftActive model = (TalentSendGiftActive) TalentSendGiftActiveManager
					.getIns().getSystemModel(hero, uid);
			Map<Integer, Integer> rewardMap = model.getRewardMap();
			Iterator<Integer> iterator = rewardMap.values().iterator();
			for (; iterator.hasNext();) {
				Integer state = iterator.next();
					if (state != null && state == TalentSendGiftActiveConst.CAN_GET) {
						return true;
					}
				}
		} catch (Exception e) {
			LogTool.error(e, TalentSendGiftActiveFunction.class, hero.getId(), hero.getName(),
					"TalentSendGiftActiveFunction checkRedPoint");
		}
		return false;
	}

	/**
	 * 更新红点
	 * 
	 * @param hero
	 */
	public void updateRedPoint(Hero hero) {
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.TALENT_SEND_GIFT)) {
				return;
			}
			boolean redPoint = checkRedPoint(hero);
			if (redPoint) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.TALENT_SEND_GIFT,
						RedPointConst.RED_1, RedPointConst.HAS_RED);
			} else {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.TALENT_SEND_GIFT,
						RedPointConst.RED_1, RedPointConst.NO_RED);
			}
		} catch (Exception e) {
			LogTool.error(e, TalentSendGiftActiveFunction.class, hero.getId(), hero.getName(),
					"TalentSendGiftActiveFunction updateRedPoint");
		}
	}

}
