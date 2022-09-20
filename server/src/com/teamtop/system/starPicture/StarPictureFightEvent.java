package com.teamtop.system.starPicture;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import com.teamtop.system.event.fightAttrEvent.IFightAttrEvent;
import com.teamtop.system.hero.FightAttr;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.starPicture.model.StarPictureModel;
import com.teamtop.util.common.CommonUtil;

import excel.config.Config_xingtu_706;
import excel.struct.Struct_xingtu_706;

public class StarPictureFightEvent implements IFightAttrEvent {

	@Override
	public long[][] calcHero(Hero hero, FightAttr allAttrs) {
		Map<Integer, StarPictureModel> starPictureMap = hero.getStarPictureMap();
		if(starPictureMap==null) {
			return null;
		}
		Map<Integer, Long> attrMap = new HashMap<>();
		Iterator<StarPictureModel> iterator = starPictureMap.values().iterator();
		StarPictureModel model = null;
		Struct_xingtu_706 struct_xingtu_706 = null;
		int[][] attr = null;
		for(;iterator.hasNext();) {
			model = iterator.next();
			if(model.getId()==0) {
				continue;
			}
			struct_xingtu_706 = Config_xingtu_706.getIns().get(model.getId());
			if (struct_xingtu_706 != null) {
				attr = struct_xingtu_706.getAttr();
				CommonUtil.arrChargeMap(attr, attrMap);
			}
		}
		long[][] totalAttr=CommonUtil.mapToArr(attrMap);
		if (totalAttr!=null) {
			FightCalcFunction.setFightValue(totalAttr, allAttrs);
		}
		return totalAttr;
	}

}
