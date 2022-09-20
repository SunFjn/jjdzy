package com.teamtop.system.openDaysSystem.shaozhuSevenDayTarget.imp;

import java.util.Map;

import com.teamtop.system.hero.Hero;
import com.teamtop.system.littleLeader.LittleLeader;
import com.teamtop.system.littleLeader.LittleLeaderModel;
import com.teamtop.system.openDaysSystem.shaozhuSevenDayTarget.ShaoZhuSevenDayTargetAbs;
import com.teamtop.util.log.LogTool;

import excel.config.Config_sonskill_267;
import excel.struct.Struct_sonskill_267;

/**
 * 技能星级
 * 
 * @author jjjjyyy
 *
 */
public class ShaozhuOtherSkillLvImp extends ShaoZhuSevenDayTargetAbs {

	@Override
	public int scheduleHandle(Hero hero, int c2) {
		// TODO Auto-generated method stub
		int num = 0;
		int skill = 0;
		try {
			LittleLeader littleLeader = hero.getLittleLeader();
			Map<Integer, LittleLeaderModel> hasLittleLeaderModels = littleLeader.getHasLittleLeaderModels();
			for (LittleLeaderModel littleLeaderModel : hasLittleLeaderModels.values()) {
				Map<Integer, Integer> otherSkillLv = littleLeaderModel.getOtherSkillLv();
				for (Integer skillId : otherSkillLv.values()) {
					skill = skillId;
					if (skillId == 0) {
						continue;
					}
					Struct_sonskill_267 struct_sonskill_267 = Config_sonskill_267.getIns().get(skillId);
					int star = struct_sonskill_267.getStar();
					if (star >= c2) {
						// 玩家拥有X个X星技能(要镶嵌,未镶嵌不算)
						num++;
					}
				}
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(),
					"ShaozhuOtherSkillLvImp scheduleHandle num:" + num + " skill:" + skill + " c2:" + c2);
		}
		return num;
	}

}
