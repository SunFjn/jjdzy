package com.teamtop.system.countrySkill;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import com.teamtop.system.event.fightAttrEvent.IFightAttrEvent;
import com.teamtop.system.hero.FightAttr;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_gjjn_748;
import excel.struct.Struct_gjjn_748;

public class CountrySkillFightEvent implements IFightAttrEvent {

	@Override
	public long[][] calcHero(Hero hero, FightAttr allAttrs) {
		// TODO Auto-generated method stub
		int skillId1 = 0;
		long[][] attr = null;
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.COUNTRYSKILL_SYSID)) {
				return null;
			}
			int countryType = hero.getCountryType();
			if (countryType == 0) {
				// 没有加入国家
				return null;
			}
			HashMap<Integer, Long> attrMap = new HashMap<Integer, Long>();
			Map<Integer, Integer> countrySkillMap = CountrySkillCache.getCountrySkillByTypeMap().get(countryType);
			for (int skillId : countrySkillMap.values()) {
				skillId1 = skillId;
				Struct_gjjn_748 struct_gjjn_748 = Config_gjjn_748.getIns().get(skillId);
				int[][] tempAttr = struct_gjjn_748.getAttr();
				CommonUtil.arrChargeMap(tempAttr, attrMap);
			}
			attr = CommonUtil.mapToArr(attrMap);
			if (attr != null) {
				FightCalcFunction.setFightValue(attr, allAttrs);
			}

			return attr;
		} catch (Exception e) {
			// TODO: handle exception
			StringBuilder stringBuilder = new StringBuilder();
			if (attr != null) {
				for (long[] attr1 : attr) {
					String attrStr = Arrays.toString(attr1);
					stringBuilder.append(attrStr);
				}
			}
			LogTool.error(e, this, hero.getId(), hero.getName(), "CountrySkillFightEvent calcHero skillId1:" + skillId1,
					" attr:" + stringBuilder);
		}
		return null;
	}

}
