package com.teamtop.system.openDaysSystem.shaozhuSevenDayTarget.imp;

import java.util.Map;

import com.teamtop.system.hero.Hero;
import com.teamtop.system.littleLeader.LittleLeader;
import com.teamtop.system.littleLeader.LittleLeaderFunction;
import com.teamtop.system.littleLeader.LittleLeaderModel;
import com.teamtop.system.openDaysSystem.shaozhuSevenDayTarget.ShaoZhuSevenDayTargetAbs;
import com.teamtop.util.log.LogTool;

/**
 * 少主战力
 * 
 * @author jjjjyyy
 *
 */
public class ShaozhuStrengthImp extends ShaoZhuSevenDayTargetAbs {

	@Override
	public int scheduleHandle(Hero hero, int c2) {
		// TODO Auto-generated method stub
		int totalStrength = 0;
		int shaozhu = 0;
		try {
			LittleLeader littleLeader = hero.getLittleLeader();
			Map<Integer, LittleLeaderModel> hasLittleLeaderModels = littleLeader.getHasLittleLeaderModels();
			// 玩家圣兽战力达到XX 战力=少主星级战力+少主亲密度战力+少主时装战力+少主主动技能战力+少主被动技能战力
			for (Integer shaozhuId : hasLittleLeaderModels.keySet()) {
				shaozhu = shaozhuId;
				long strenght = LittleLeaderFunction.getIns().getLittleLeaderStrenght(hero, shaozhuId);
				totalStrength += (int) strenght;
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(),
					" ShaozhuStrengthImp scheduleHandle totalStrength:" + totalStrength + " shaozhuId:" + shaozhu);
		}
		return totalStrength;
	}

}
