package com.teamtop.system.rewardBack.imp;

import java.util.Map;

import com.teamtop.system.crossSJMiJing.CrossSJMiJingConst;
import com.teamtop.system.crossSJMiJing.CrossSJMiJingFunction;
import com.teamtop.system.crossSJMiJing.model.CrossSJMiJing;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.rewardBack.RewardBackAbs;
import com.teamtop.system.rewardBack.RewardBackFunction;
import com.teamtop.system.weekCard.WeekCardFunction;
import com.teamtop.util.log.LogTool;

/**
 * 升阶秘境
 * 
 * @author jjjjyyy
 *
 */
public class CrossSJMiJingRewardBackImp extends RewardBackAbs {

	@Override
	public void handle(Hero hero, Integer sysId, Object... param) {
		// TODO Auto-generated method stub
		int restTimes = 0;
		int maxID = 0;
		try {
			CrossSJMiJing crossSJMiJing = hero.getCrossSJMiJing();
			Map<Integer, Integer> miJingIDMap = crossSJMiJing.getMiJingIDMap();
			maxID = getMaxID(miJingIDMap);
			if (maxID == 0) {
				return;
			}
			int typeByID = CrossSJMiJingFunction.getIns().getTypeByID(maxID);
			Map<Integer, Integer> saoDangMap = crossSJMiJing.getSaoDangMap();
			Integer numSaoDang = saoDangMap.get(typeByID);
			numSaoDang = numSaoDang == null ? 0 : numSaoDang;
			int weekCardAdd = WeekCardFunction.getIns().getMJMopUp(hero);
			int totalNum = CrossSJMiJingConst.SAO_DANG_NUM + weekCardAdd;
			restTimes = totalNum - numSaoDang;
			// 组队副本 找回奖励=当前转基础奖励*次数*typeByID
			RewardBackFunction.getIns().handleData(hero, sysId, 1, restTimes, restTimes * maxID / 1000);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "restTimes:" + restTimes + " maxID:" + maxID);
		}
	}

	private int getMaxID(Map<Integer, Integer> miJingIDMap) {
		int maxID = 0;
		for (Integer id : miJingIDMap.keySet()) {
			if (id > maxID) {
				maxID = id;
			}
		}

		return maxID;
	}

}
