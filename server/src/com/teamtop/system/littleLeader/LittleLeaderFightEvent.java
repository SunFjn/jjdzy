package com.teamtop.system.littleLeader;

import java.util.HashMap;
import java.util.List;
import java.util.Map.Entry;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.system.event.fightAttrEvent.IFightAttrEvent;
import com.teamtop.system.hero.FightAttr;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.common.CommonUtil;

import excel.config.Config_sonqm_267;
import excel.config.Config_sonqn_267;
import excel.config.Config_sonshow_267;
import excel.config.Config_sonsixschool_267;
import excel.config.Config_sonskill_267;
import excel.struct.Struct_sonqm_267;
import excel.struct.Struct_sonqn_267;
import excel.struct.Struct_sonshow_267;
import excel.struct.Struct_sonsix_267;
import excel.struct.Struct_sonsixschool_267;
import excel.struct.Struct_sonskill_267;
import excel.struct.Struct_sonstar_267;

public class LittleLeaderFightEvent implements IFightAttrEvent{

	@Override
	public long[][] calcHero(Hero hero, FightAttr allAttrs) {
		HashMap<Integer, Long> attrMap=new HashMap<Integer, Long>();
		LittleLeader littleLeader=hero.getLittleLeader();
		HashMap<Integer, LittleLeaderModel> hasLittleLeaderModels = littleLeader.getHasLittleLeaderModels();
		if (hasLittleLeaderModels.size()>0) {
			for (LittleLeaderModel littleLeaderModel:hasLittleLeaderModels.values()) {
				//升星战力
				ConcurrentHashMap<Integer, Struct_sonstar_267> concurrentHashMap = LittleLeaderSysCache.leaderByStarMap.get(littleLeaderModel.getIndex());
				Struct_sonstar_267 struct_sonstar_267 = concurrentHashMap.get(littleLeaderModel.getStar());
				if (struct_sonstar_267!=null) {
					CommonUtil.arrChargeMap(struct_sonstar_267.getAttr(), attrMap);
				}
				//亲密度等级
				int qimiduLv = littleLeaderModel.getQimiduLv();
				Struct_sonqm_267 struct_sonqm_267 = Config_sonqm_267.getIns().get(qimiduLv);
				if (struct_sonqm_267!=null) {
					CommonUtil.arrChargeMap(struct_sonqm_267.getAttr(), attrMap);
				}
				//少主主动技能在总战力加
			    
				//时装
				HashMap<Integer, Integer> clothesStar = littleLeaderModel.getClothesStar();
				for (int key:clothesStar.keySet()) {
					int clothid=key;
					int starNum=clothesStar.get(key);
					Struct_sonshow_267 struct_sonshow_267 = Config_sonshow_267.getIns().get(clothid);
					CommonUtil.arrChargeMap(struct_sonshow_267.getAttr(), attrMap, starNum);
				}
				//被动技能
				HashMap<Integer, Integer> otherSkillLv = littleLeaderModel.getOtherSkillLv();
				int size = otherSkillLv.size();
				for (int i = 0; i < size; i++) {
					Integer skillid = otherSkillLv.get(i);
					if (skillid>0) {
						Struct_sonskill_267 struct_sonskill_267 = Config_sonskill_267.getIns().get(skillid);
						if (struct_sonskill_267!=null) {
							CommonUtil.arrChargeMap(struct_sonskill_267.getAttr(), attrMap);
						}
					}
				}
				
				//少主学堂
				int schoolId = littleLeaderModel.getSchoolId();
				Struct_sonsixschool_267 struct_sonsixschool_267 = Config_sonsixschool_267.getIns().get(schoolId);
				if(struct_sonsixschool_267 != null) {
					CommonUtil.arrChargeMap(struct_sonsixschool_267.getAttr(), attrMap);
				}
				
				//提升升星属性百分比
				int[][] tishengStarAttr = LittleLeaderFunction.getIns().tishengStarAttr(struct_sonstar_267.getAttr(), struct_sonsixschool_267.getJc1());
				if(tishengStarAttr != null) {
					CommonUtil.arrChargeMap(tishengStarAttr, attrMap);
				}
				
				//少主六艺
				HashMap<Integer, SixArtsModel> sixArts = littleLeaderModel.getSixArts();
				if(sixArts!=null && sixArts.size()>0) {
					for(Entry<Integer,SixArtsModel> entry : sixArts.entrySet()) {
						int id = entry.getKey();
						SixArtsModel sixArt = entry.getValue();
						int level = sixArt.getLevel();
						Struct_sonsix_267 struct_sonsix_267 = LittleLeaderFunction.getIns().getStruct_sonsix_267(id,level);
						if(struct_sonsix_267 != null) {
							CommonUtil.arrChargeMap(struct_sonsix_267.getAttr(), attrMap);
						}
					}
				}
				
				//少主潜能
				int qiannengId = littleLeaderModel.getQiannengId();
				Struct_sonqn_267 struct_sonqn_267 = Config_sonqn_267.getIns().get(qiannengId);
				if(struct_sonqn_267 !=  null) {
					CommonUtil.arrChargeMap(struct_sonqn_267.getAttr(), attrMap);
				}
				//潜能提升少主升星属性百分比
				int[][] qiannengStarAttr = LittleLeaderFunction.getIns().tishengStarAttr(struct_sonstar_267.getAttr(), struct_sonqn_267.getJc1());
				if(qiannengStarAttr != null) {
					CommonUtil.arrChargeMap(qiannengStarAttr, attrMap);
				}
				//潜能丹药增加角色属性
				List<int[][]> attrList = LittleLeaderFunction.getIns().danyaoAttr(littleLeaderModel);
				if(attrList!=null && attrList.size()>0) {
					for(int[][] attr : attrList) {
						CommonUtil.arrChargeMap(attr, attrMap);
					}
				}
				
			}
		}
		long[][] attr=CommonUtil.mapToArr(attrMap);
		if (attr!=null) {
			FightCalcFunction.setFightValue(attr,allAttrs);
		}
		return attr;
	}

}
