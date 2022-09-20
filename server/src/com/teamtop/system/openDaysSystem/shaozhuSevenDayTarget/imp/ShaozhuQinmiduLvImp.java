package com.teamtop.system.openDaysSystem.shaozhuSevenDayTarget.imp;

import java.util.Map;

import com.teamtop.system.hero.Hero;
import com.teamtop.system.littleLeader.LittleLeader;
import com.teamtop.system.littleLeader.LittleLeaderModel;
import com.teamtop.system.openDaysSystem.shaozhuSevenDayTarget.ShaoZhuSevenDayTargetAbs;
import com.teamtop.util.log.LogTool;

/**
 * 亲密度
 * 
 * @author jjjjyyy
 *
 */
public class ShaozhuQinmiduLvImp extends ShaoZhuSevenDayTargetAbs {

	@Override
	public int scheduleHandle(Hero hero, int c2) {
		// TODO Auto-generated method stub
		int num = 0;
		int qimiduLv = 0;
		try {
			LittleLeader littleLeader = hero.getLittleLeader();
			Map<Integer, LittleLeaderModel> hasLittleLeaderModels = littleLeader.getHasLittleLeaderModels();
			for (LittleLeaderModel littleLeaderModel : hasLittleLeaderModels.values()) {
				qimiduLv = littleLeaderModel.getQimiduLv();
				if (qimiduLv >= c2) {
					// 玩家拥有X个X级亲密度少主
					num++;
				}
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(),
					"ShaozhuQinmiduLvImp scheduleHandle num:" + num + " qimiduLv:" + qimiduLv + " c2:" + c2);
		}
		return num;
	}

}
