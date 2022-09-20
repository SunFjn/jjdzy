package com.teamtop.system.excalibur;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.equip.model.Equip;
import com.teamtop.system.event.fightAttrEvent.IFightAttrEvent;
import com.teamtop.system.excalibur.model.Excalibur;
import com.teamtop.system.excalibur.model.ExcaliburModel;
import com.teamtop.system.hero.FightAttr;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.rankNew.RankingFunction;
import com.teamtop.system.sevenHappy.SevenHappyConst;
import com.teamtop.system.sevenHappy.SevenHappyFunction;
import com.teamtop.system.sevenWuShenRank.SevenWuShenRankConst;
import com.teamtop.system.sevenWuShenRank.SevenWuShenRankFunction;
import com.teamtop.system.wujiang.WuJiangConst;
import com.teamtop.util.common.CommonUtil;

import excel.config.Config_drug_200;
import excel.config.Config_jx_271;
import excel.config.Config_jxzl_271;
import excel.config.Config_sword_216;
import excel.config.Config_swordlv_216;
import excel.config.Config_swordlvskill_216;
import excel.config.Config_swordstar_216;
import excel.config.Config_swordsuit_216;
import excel.config.Config_xtcs_004;
import excel.config.Config_zhuangbei_204;
import excel.struct.Struct_jx_271;
import excel.struct.Struct_jxzl_271;
import excel.struct.Struct_sword_216;
import excel.struct.Struct_swordlv_216;
import excel.struct.Struct_swordsuit_216;
import excel.struct.Struct_zhuangbei_204;

public class ExcaliburFightEvent implements IFightAttrEvent {

	@Override
	public long[][] calcHero(Hero hero, FightAttr allAttrs) {
		Excalibur excalibur = hero.getExcalibur();
		if (excalibur == null) {
			return null;
		}
		Map<Integer, Long> attrMap = new HashMap<>();
		HashMap<Integer, Long> attrMapStarAndlv=new HashMap<Integer, Long>();
		Map<Integer, ExcaliburModel> excaliburMap = excalibur.getExcaliburMap();
		Iterator<ExcaliburModel> iterator = excaliburMap.values().iterator();
		ExcaliburModel excaliburModel = null;
		Struct_sword_216 struct_sword_216 = null;
		int id = 0;
		int starLevel = 0;
		int[][] starattr = null;
		for (; iterator.hasNext();) {
			excaliburModel = iterator.next();
			id = excaliburModel.getId();
			starLevel = excaliburModel.getStarLevel();
			struct_sword_216 = Config_sword_216.getIns().get(id);
			int pingzhi= struct_sword_216.getPin();
			int starid = struct_sword_216.getStarid();
			if (struct_sword_216 != null) {
				// 星级
				int starindex=starid*1000+starLevel;
				starattr = Config_swordstar_216.getIns().get(starindex).getAttr();
				if (starattr!=null) {
					CommonUtil.arrChargeMap(starattr, attrMap);
					CommonUtil.arrChargeMap(starattr, attrMapStarAndlv);
				}
			}
			
			//觉醒之力
			HashMap<Integer, Integer> jueXingSkills = excaliburModel.getJueXingSkills();
			for (int i = GameConst.JUEXING_SKILL1; i <=GameConst.JUEXING_SKILL4; i++) {
				if (i!=GameConst.JUEXING_SKILL4) {
					//觉醒技能
				    //id=品质id*10000+觉醒技能id*1000+等级
				    int goalIndex=pingzhi*10000+i*1000+jueXingSkills.get(i);
				    Struct_jx_271 struct_jx_271 = Config_jx_271.getIns().get(goalIndex);
					if (struct_jx_271!=null) {
						CommonUtil.arrChargeMap(struct_jx_271.getAttr(), attrMap);
					}
				}else {
					//觉醒之力
				    //id=品质id*100+等级
				    int goalIndex=pingzhi*100+jueXingSkills.get(i);
					Struct_jxzl_271 struct_jxzl_271 = Config_jxzl_271.getIns().get(goalIndex);
					if (struct_jxzl_271!=null) {
						CommonUtil.arrChargeMap(struct_jxzl_271.getAttr(), attrMap);
					}
					
				}
			}
		}
		//进阶
		if (Config_swordlv_216.getIns().get(excalibur.getJieLv())!=null) {
			Struct_swordlv_216 struct_swordlv_216 = Config_swordlv_216.getIns().get(excalibur.getJieLv());
			CommonUtil.arrChargeMap(struct_swordlv_216.getAttr(), attrMap);
			CommonUtil.arrChargeMap(struct_swordlv_216.getAttr(), attrMapStarAndlv);
		}
		long[][] starAndlvAttr=CommonUtil.mapToArr(attrMapStarAndlv);
		int num=Config_xtcs_004.getIns().get(ExcaliburConst.TAOZHUANG_NUM).getNum();
		//套装表
		for (int i = 1; i <=num; i++) {
			Integer integer = excalibur.getTaozhuangs().get(i);
			if (Config_swordsuit_216.getIns().get(integer)!=null) {
				Struct_swordsuit_216 struct_swordsuit_216 = Config_swordsuit_216.getIns().get(integer);
				//套装基础属性
				CommonUtil.arrChargeMap(struct_swordsuit_216.getAttr(), attrMap);
				//套装羁绊属性
				CommonUtil.arrChargeMap(struct_swordsuit_216.getAttr1(), attrMap);
				
				int jc = struct_swordsuit_216.getJc();
				double jcx=jc/100000.0000;
				if (jc>0) {
					//套装加强 升星升阶属性万分比
					long[][] newAddAttr=CommonUtil.copyDyadicArray(starAndlvAttr);
					for(long[] d : newAddAttr){
						double x1=d[1]*jcx;
						d[1] =(long) (x1);
					}
					//套装羁绊百分比属性
					CommonUtil.arrChargeMap(newAddAttr, attrMap);
				}
			}
		}
		//神剑额外装备
		for (int i = GameConst.INDEX_60; i <=GameConst.INDEX_63; i++) {
			Equip equip = hero.getOnbodyEquip().get(i);
			if (equip!=null) {
				Struct_zhuangbei_204 zhuangbei_602 = Config_zhuangbei_204.getIns().get(equip.getSysId());
				int[][] attr = CommonUtil.copyDyadicArray(zhuangbei_602.getAttr());
				CommonUtil.arrChargeMap(attr, attrMap);
			}
		}
		//技能
		for (int i = 1; i <=WuJiangConst.SKILLNUM; i++) {
			if (Config_swordlvskill_216.getIns().get(excalibur.getSkills().get(i))!=null) {
				CommonUtil.arrChargeMap(Config_swordlvskill_216.getIns().get(excalibur.getSkills().get(i)).getAttr(), attrMap);
			}
		}
		//属性丹3
		int num1=hero.getDanyao().get(ExcaliburConst.Dan7);
		if (num1>0) {
			int[][] data1 = CommonUtil.copyDyadicArray(Config_drug_200.getIns().get(ExcaliburConst.Dan7).getAttr());
			for(int[] d : data1){
				d[1] = d[1]*num1;
			}
			CommonUtil.arrChargeMap(data1, attrMap);
		}
		
		long[][] totalAttr=CommonUtil.mapToArr(attrMap);
		if (totalAttr!=null) {
			FightCalcFunction.setFightValue(totalAttr, allAttrs);
		}
		// 设置战力
		FinalFightAttr finalAttr = new FinalFightAttr();
		FightAttr fAttr = new FightAttr();
		FightCalcFunction.setFightValue(totalAttr, fAttr);
		FightCalcFunction.calcEquipAttr(finalAttr, fAttr, 0);
		excalibur.setStrength((int)finalAttr.getStrength());
		// 刷新排行
		RankingFunction.getIns().refreshExcaliburRankList(hero);
		//七日武圣榜
		SevenWuShenRankFunction.getIns().refreshSevenWuShenRank(hero, SevenWuShenRankConst.TYPE_EXCALIBUR);
		//开服狂欢
		SevenHappyFunction.getIns().refreshSevenWuShenRank(hero, SevenHappyConst.TYPE_13);
		return totalAttr;
	}

}
