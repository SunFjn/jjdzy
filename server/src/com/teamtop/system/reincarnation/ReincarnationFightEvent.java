package com.teamtop.system.reincarnation;

import java.util.Arrays;
import java.util.HashMap;

import com.teamtop.system.event.fightAttrEvent.IFightAttrEvent;
import com.teamtop.system.hero.FightAttr;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_lunhui_274;
import excel.struct.Struct_lunhui_274;

public class ReincarnationFightEvent implements IFightAttrEvent {

	@Override
	public long[][] calcHero(Hero hero, FightAttr allAttrs) {
		int reincarnationLevel = 0;
		long[][] attr= null;
		HashMap<Integer, Long> attrMap=new HashMap<Integer, Long>();
		if (hero == null) {
			return null;
		}
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.REINCARNATION)) {
				return null;
			}

			reincarnationLevel = hero.getReincarnationLevel();
			Struct_lunhui_274 config = Config_lunhui_274.getIns().get(reincarnationLevel);
			if (config == null) {
				// 配置不存在
				return null;
			}
			CommonUtil.arrChargeMap(config.getAttr(), attrMap);
			attr=CommonUtil.mapToArr(attrMap);
			if (attr != null) {
				FightCalcFunction.setFightValue(attr, allAttrs);
			}
		} catch (Exception e) {
			StringBuilder stringBuilder = new StringBuilder();
			if (attr != null) {
				for (long[] attr1 : attr) {
					String attrStr = Arrays.toString(attr1);
					stringBuilder.append(attrStr);
				}
			}
			LogTool.error(e, this, hero.getId(), hero.getName(),
					"ReincarnationFightEvent calcHero reincarnationLevel:" + reincarnationLevel,
					" attr:" + stringBuilder);
		}
		return attr;
	}

}
