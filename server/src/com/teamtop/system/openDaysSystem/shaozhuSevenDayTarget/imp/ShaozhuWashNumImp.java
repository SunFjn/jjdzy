package com.teamtop.system.openDaysSystem.shaozhuSevenDayTarget.imp;

import java.util.Map;
import java.util.Optional;

import com.teamtop.system.hero.Hero;
import com.teamtop.system.openDaysSystem.shaozhuSevenDayTarget.ShaoZhuSevenDayTargetAbs;
import com.teamtop.system.openDaysSystem.shaozhuSevenDayTarget.ShaoZhuSevenDayTargetFunction;
import com.teamtop.system.openDaysSystem.shaozhuSevenDayTarget.model.ShaoZhuSevenDayTarget;
import com.teamtop.util.log.LogTool;

/**
 * 技能洗练
 * 
 * @author jjjjyyy
 *
 */
public class ShaozhuWashNumImp extends ShaoZhuSevenDayTargetAbs {

	@Override
	public int scheduleHandle(Hero hero, int c2) {
		// TODO Auto-generated method stub
		int num = 0;
		try {
			ShaoZhuSevenDayTarget sevenDayTarget = ShaoZhuSevenDayTargetFunction.getIns().getModel(hero);
			Map<Integer, Integer> washNumMap = sevenDayTarget.getWashNumMap();
			for (Integer times : washNumMap.values()) {
				// 玩家洗练少主技能达到XX次
				num += times;
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "ShaozhuWashNumImp scheduleHandle num:" + num);
		}
		return num;
	}

	@Override
	public void updateHandle(Hero hero, int type, Object... obj) {
		// TODO Auto-generated method stub
		if (obj == null || obj.length == 0) {
			return;
		}
		ShaoZhuSevenDayTarget sevenDayTarget = ShaoZhuSevenDayTargetFunction.getIns().getModel(hero);
		Map<Integer, Integer> washNumMap = sevenDayTarget.getWashNumMap();
		Integer index = (Integer) obj[0];
		Integer addTimes = (Integer) obj[1];
		Integer times = Optional.ofNullable(washNumMap).map(map -> map.get(index)).orElse(0);
		washNumMap.put(index, times + addTimes);
	}

}
