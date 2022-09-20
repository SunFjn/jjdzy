package com.teamtop.system.openDaysSystem.runeAppraise;

import java.util.List;
import java.util.Set;

import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.runeAppraise.model.RuneAppraiseModel;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_fwjd_264;
import excel.config.Config_hdfl_012;
import excel.struct.Struct_fwjd_264;

public class RuneAppraiseFunction {

	private static RuneAppraiseFunction ins;

	private RuneAppraiseFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized RuneAppraiseFunction getIns() {
		if (ins == null) {
			ins = new RuneAppraiseFunction();
		}
		return ins;
	}

	/**
	 * 完美鉴定次数
	 */
	public void addPerfactAppraise(Hero hero, int addNum) {
		try {
			if (addNum < 1) {
				return;
			}
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.RUNE_APPRAISE)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.RUNE_APPRAISE);
			RuneAppraiseModel model = (RuneAppraiseModel) RuneAppraiseManager.getIns().getSystemModel(hero, uid);
			int appraiseNum = model.getAppraiseNum();
			model.setAppraiseNum(appraiseNum + addNum);
			updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, RuneAppraiseFunction.class, hero.getId(), hero.getName(),
					"RuneAppraiseFunction addPerfactAppraise");
		}
	}

	/**
	 * 更新红点
	 */
	public void updateRedPoint(Hero hero) {
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.RUNE_APPRAISE)) {
				return;
			}
			boolean redPoint = checkRedPoint(hero);
			if (redPoint) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.RUNE_APPRAISE, RedPointConst.RED_1,
						RedPointConst.HAS_RED);
			} else {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.RUNE_APPRAISE, RedPointConst.RED_1,
						RedPointConst.NO_RED);
			}
		} catch (Exception e) {
			LogTool.error(e, RuneAppraiseFunction.class, hero.getId(), hero.getName(),
					"RuneAppraiseFunction updateRedPoint");
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
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.RUNE_APPRAISE)) {
				return false;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.RUNE_APPRAISE);
			RuneAppraiseModel model = (RuneAppraiseModel) RuneAppraiseManager.getIns().getSystemModel(hero, uid);
			int sysQs = Config_hdfl_012.getIns().get(uid).getQs();
			Set<Integer> rewardSet = model.getRewardSet();
			int appraiseNum = model.getAppraiseNum();
			List<Struct_fwjd_264> sortList = Config_fwjd_264.getIns().getSortList();
			int size = sortList.size();
			for (int i = 0; i < size; i++) {
				Struct_fwjd_264 fwjd_264 = sortList.get(i);
				int id = fwjd_264.getId();
				if (rewardSet.contains(id)) {
					continue;
				}
				int qs = fwjd_264.getQs();
				if (sysQs != qs) {
					continue;
				}
				int time = fwjd_264.getTime();
				if (appraiseNum >= time) {
					return true;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, RuneAppraiseFunction.class, hero.getId(), hero.getName(),
					"RuneAppraiseFunction checkRedPoint");
		}
		return false;
	}

}
