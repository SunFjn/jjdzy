package com.teamtop.system.rewardBack.imp;

import com.teamtop.system.crossRebornFB.RebornFBConst;
import com.teamtop.system.crossRebornFB.model.BatterInfo;
import com.teamtop.system.crossRebornFB.model.RebornFBLocal;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.rewardBack.RewardBackAbs;
import com.teamtop.system.rewardBack.RewardBackFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_xtcs_004;

/**
 * 轮回副本
 * 
 * @author jjjjyyy
 *
 */
public class RebornFBRewardBackImp extends RewardBackAbs {

	@Override
	public void handle(Hero hero, Integer sysId, Object... param) {
		try {
			RebornFBLocal local = hero.getRebornFBLocal();
			int max = hero.getReincarnationLevel();
			int maxTimes = Config_xtcs_004.getIns().get(RebornFBConst.CONST_8231).getNum();
			for (int i = 1; i <= max; i++) {
				BatterInfo info = local.getBatterInfoMap().get(i);
				if (info == null) {
					continue;
				}
				int restTimes = maxTimes - info.getTimes();
				RewardBackFunction.getIns().handleData(hero, sysId, i, restTimes, restTimes);
			}
		} catch (Exception e) {
			LogTool.error(e, this, hero.getId(), hero.getName());
		}

	}

}
