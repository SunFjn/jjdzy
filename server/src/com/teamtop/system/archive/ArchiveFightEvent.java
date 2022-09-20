package com.teamtop.system.archive;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

import com.teamtop.system.archive.model.ArchiveData;
import com.teamtop.system.archive.model.ArchiveModel;
import com.teamtop.system.event.fightAttrEvent.IFightAttrEvent;
import com.teamtop.system.hero.FightAttr;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.rankNew.RankingFunction;
import com.teamtop.system.sevenHappy.SevenHappyConst;
import com.teamtop.system.sevenHappy.SevenHappyFunction;
import com.teamtop.system.sevenWuShenRank.SevenWuShenRankConst;
import com.teamtop.system.sevenWuShenRank.SevenWuShenRankFunction;
import com.teamtop.util.common.CommonUtil;

import excel.config.Config_piclv_005;
import excel.config.Config_picstar_005;
import excel.config.Config_picteam_005;
import excel.config.Config_picture_005;
import excel.struct.Struct_piclv_005;
import excel.struct.Struct_picstar_005;
import excel.struct.Struct_picteam_005;
import excel.struct.Struct_picture_005;

/**
 * 图鉴战力计算
 * 
 * @author hzp
 *
 */
public class ArchiveFightEvent implements IFightAttrEvent {

	@Override
	public long[][] calcHero(Hero hero, FightAttr allAttrs) {
		ArchiveData archiveData = hero.getArchiveData();
		if (archiveData == null) {
			return null;
		}
		Map<Integer, ArchiveModel> archiveMap = archiveData.getArchiveMap();
		if (archiveMap.size() == 0) {
			return null;
		}
		Map<Integer, Long> attrMap = new HashMap<>();
		// Map<Integer, Integer> typeLevelMap = new HashMap<>();
		Iterator<ArchiveModel> iterator = archiveMap.values().iterator();
		ArchiveModel archiveModel = null;
		Struct_picture_005 struct_picture_005 = null;
		Struct_piclv_005 struct_piclv_005 = null;
		int[][] attr = null;

		for (; iterator.hasNext();) {
			archiveModel = iterator.next();
			// 图鉴基础
			struct_picture_005 = Config_picture_005.getIns().get(archiveModel.getId());
			if(struct_picture_005!=null) {
				attr = struct_picture_005.getAttr();
				CommonUtil.arrChargeMap(attr, attrMap);
			}
			// 图鉴等级
			struct_piclv_005 = Config_piclv_005.getIns().get(archiveModel.getLevelIndex());
			if (struct_piclv_005 != null) {
				attr = struct_piclv_005.getAttr();
				CommonUtil.arrChargeMap(attr, attrMap);
			}
			// 图鉴星级
			Struct_picstar_005 struct_picstar_005 = Config_picstar_005.getIns().get(archiveModel.getStarLevelIndex());
			if (struct_picstar_005 != null) {
				attr = struct_picstar_005.getAttr();
				CommonUtil.arrChargeMap(attr, attrMap);
			}
		}
		// 图鉴套装
		Set<Integer> archiveSetList = new HashSet<>(archiveData.getArchiveSetList());
		Struct_picteam_005 struct_picteam_005 = null;
		for (int setId : archiveSetList) {
			struct_picteam_005 = Config_picteam_005.getIns().get(setId);
			if (struct_picteam_005 != null) {
				attr = struct_picteam_005.getAttr();
				CommonUtil.arrChargeMap(attr, attrMap);
			}
		}
		long[][] totalAttr=CommonUtil.mapToArr(attrMap);
		if (totalAttr!=null) {
			FightCalcFunction.setFightValue(totalAttr, allAttrs);
		}
		//设置战力
		FinalFightAttr finalAttr = new FinalFightAttr();
		FightAttr fAttr = new FightAttr();
		FightCalcFunction.setFightValue(totalAttr, fAttr);
		FightCalcFunction.calcEquipAttr(finalAttr, fAttr, 0);
		archiveData.setStrength((int)finalAttr.getStrength());
		//刷新排行
		RankingFunction.getIns().refreshArchiveRankList(hero);
		//七日武圣榜
		//SevenWuShenRankFunction.getIns().refreshSevenWuShenRank(hero, SevenWuShenRankConst.TYPE_TUJIAN);
		//开服狂欢
		SevenHappyFunction.getIns().refreshSevenWuShenRank(hero, SevenHappyConst.TYPE_7);
		return totalAttr;
	}

}
