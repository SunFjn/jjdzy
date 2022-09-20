package com.teamtop.system.reincarnationGodfate;

import java.util.HashMap;
import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.teamtop.system.event.fightAttrEvent.IFightAttrEvent;
import com.teamtop.system.hero.FightAttr;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.reincarnationGodfate.model.ReincarnationGodFate;
import com.teamtop.system.reincarnationGodfate.model.ReincarnationGodFateInfo;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_tmlv_292;
import excel.config.Config_tmpin_292;
import excel.struct.Struct_tmlv_292;
import excel.struct.Struct_tmpin_292;

public class ReincarnationGodFateFightEvent implements IFightAttrEvent {

	@Override
	public long[][] calcHero(Hero hero, FightAttr allAttrs) {
		// TODO Auto-generated method stub
		ReincarnationGodFate godFate = null;
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.REINCARNATION_GODFATE)) {
				return null;
			}
			HashMap<Integer, Long> attrMap = new HashMap<Integer, Long>();
			godFate = hero.getGodFate();
			Map<Integer, ReincarnationGodFateInfo> infoMap = godFate.getInfoMap();
			for (ReincarnationGodFateInfo info : infoMap.values()) {
				int upLvId = info.getUpLvId();
				Struct_tmlv_292 struct_tmlv_292 = Config_tmlv_292.getIns().get(upLvId);
				int[][] upLvAttr = struct_tmlv_292.getAttr();
				CommonUtil.arrChargeMap(upLvAttr, attrMap);
				int upQualityId = info.getUpQualityId();
				Struct_tmpin_292 struct_tmpin_292 = Config_tmpin_292.getIns().get(upQualityId);
				int[][] upQualityAttr = struct_tmpin_292.getAttr();
				CommonUtil.arrChargeMap(upQualityAttr, attrMap);
			}
			long[][] attr = CommonUtil.mapToArr(attrMap);
			if (attr != null) {
				FightCalcFunction.setFightValue(attr, allAttrs);
			}
			return attr;
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(),
					"ReincarnationGodFateFightEvent calcHero godFateStr:" + godFate == null ? ""
							: JSON.toJSONString(godFate));
		}
		return null;
	}

}
