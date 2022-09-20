package com.teamtop.system.openDaysSystem.shaozhuSevenDayTarget.imp;

import java.util.Map;

import com.teamtop.system.hero.Hero;
import com.teamtop.system.littleLeader.LittleLeader;
import com.teamtop.system.littleLeader.LittleLeaderModel;
import com.teamtop.system.openDaysSystem.shaozhuSevenDayTarget.ShaoZhuSevenDayTargetAbs;
import com.teamtop.util.log.LogTool;

/**
 * 少主星级
 * 
 * @author jjjjyyy
 *
 */
public class ShaozhuStarImp extends ShaoZhuSevenDayTargetAbs {

	public int scheduleHandle(Hero hero, int c2) {
		int num = 0;
		int star = 0;
		try {
			LittleLeader littleLeader = hero.getLittleLeader();
			Map<Integer, LittleLeaderModel> hasLittleLeaderModels = littleLeader.getHasLittleLeaderModels();
			for (LittleLeaderModel littleLeaderModel : hasLittleLeaderModels.values()) {
				star = littleLeaderModel.getStar();
				if (star >= c2) {
					// 玩家拥有X个X星少主
					num++;
				}
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(),
					"ShaozhuStarImp scheduleHandle num:" + num + " star:" + star + " c2:" + c2);
		}
		return num;
	}

}
