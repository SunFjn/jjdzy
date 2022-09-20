package com.teamtop.system.treasure;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.equip.model.Equip;
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
import com.teamtop.system.treasure.model.TreasureData;
import com.teamtop.system.treasure.model.TreasureModel;
import com.teamtop.system.wujiang.WuJiangConst;
import com.teamtop.util.common.CommonUtil;

import excel.config.Config_bao_214;
import excel.config.Config_baolv_214;
import excel.config.Config_baolvskill_214;
import excel.config.Config_baostar_214;
import excel.config.Config_baosuit_214;
import excel.config.Config_drug_200;
import excel.config.Config_jx_271;
import excel.config.Config_jxzl_271;
import excel.config.Config_xtcs_004;
import excel.config.Config_zhuangbei_204;
import excel.struct.Struct_bao_214;
import excel.struct.Struct_baosuit_214;
import excel.struct.Struct_jx_271;
import excel.struct.Struct_jxzl_271;
import excel.struct.Struct_zhuangbei_204;

public class TreasureFightEvent implements IFightAttrEvent {

	@Override
	public long[][] calcHero(Hero hero, FightAttr allAttrs) {
		TreasureData treasureData = hero.getTreasureData();
		if (treasureData == null) {
			return null;
		}
		Map<Integer, Long> attrMap = new HashMap<>();
		HashMap<Integer, Long> attrMapStarAndlv=new HashMap<Integer, Long>();
		// 等级
		int level = treasureData.getLevel();
		int[][] attr = Config_baolv_214.getIns().get(level).getAttr();
		CommonUtil.arrChargeMap(attr, attrMap);
		CommonUtil.arrChargeMap(attr, attrMapStarAndlv);
		
		Map<Integer, TreasureModel> treasureMap = treasureData.getTreasureMap();
		Iterator<TreasureModel> iterator = treasureMap.values().iterator();
		TreasureModel treasureModel = null;
		int id = 0;
		int starLevel = 0;
		Struct_bao_214 struct_bao_214 = null;
		int[][] starattr = null;
		for (; iterator.hasNext();) {
			treasureModel = iterator.next();
			id = treasureModel.getId();
			starLevel = treasureModel.getStarLevel();
			struct_bao_214 = Config_bao_214.getIns().get(id);
			int pingzhi=struct_bao_214.getPin();
			
			if (struct_bao_214 != null) {
				// 星级
				int starindex=pingzhi*1000+starLevel;
				starattr =Config_baostar_214.getIns().get(starindex).getAttr();
				if (starattr!=null) {
					CommonUtil.arrChargeMap(starattr, attrMap);
					CommonUtil.arrChargeMap(starattr, attrMapStarAndlv);
				}
			}
			//觉醒之力
			HashMap<Integer, Integer> jueXingSkills = treasureModel.getJueXingSkills();
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
		long[][] starAndlvAttr=CommonUtil.mapToArr(attrMapStarAndlv);
		int taozhuangSize=Config_xtcs_004.getIns().get(TreasureConst.TAOZHUANG_NUM).getNum();
		//套装表
		for (int i = 1; i <=taozhuangSize; i++) {
			Integer integer = treasureData.getTaozhuangs().get(i);
			if (Config_baosuit_214.getIns().get(integer)!=null) {
				Struct_baosuit_214 struct_baosuit_214 = Config_baosuit_214.getIns().get(integer);
				//套装基础属性
				CommonUtil.arrChargeMap(struct_baosuit_214.getAttr(), attrMap);
				//套装羁绊属性
				CommonUtil.arrChargeMap(struct_baosuit_214.getAttr1(), attrMap);
				
				int jc = struct_baosuit_214.getJc();
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
		//宝物额外装备
		for (int i = GameConst.INDEX_90; i <=GameConst.INDEX_93; i++) {
			 Equip equip = hero.getOnbodyEquip().get(i);
			 if (equip!=null) {
				 Struct_zhuangbei_204 zhuangbei_602 = Config_zhuangbei_204.getIns().get(equip.getSysId());
				 int[][] attr1 = CommonUtil.copyDyadicArray(zhuangbei_602.getAttr());
				 CommonUtil.arrChargeMap(attr1, attrMap);
			}
		}
		
		//技能
		for (int i = 1; i <=WuJiangConst.SKILLNUM; i++) {
			if (Config_baolvskill_214.getIns().get(treasureData.getSkills().get(i))!=null) {
				CommonUtil.arrChargeMap(Config_baolvskill_214.getIns().get(treasureData.getSkills().get(i)).getAttr(), attrMap);
			}
		}
		//宝物属性丹
		int num2=hero.getDanyao().get(TreasureConst.Dan5);
		if (num2>0) {
			int[][] data2 = CommonUtil.copyDyadicArray(Config_drug_200.getIns().get(TreasureConst.Dan5).getAttr());
			for(int[] d : data2){
				d[1] = d[1]*num2;
			}
			CommonUtil.arrChargeMap(data2, attrMap);
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
		treasureData.setStrength((int)finalAttr.getStrength());
		// 刷新排行
		RankingFunction.getIns().refreshTreasureRankList(hero);
		//七日武圣榜
		SevenWuShenRankFunction.getIns().refreshSevenWuShenRank(hero, SevenWuShenRankConst.TYPE_TREASURE);
		//开服狂欢
		SevenHappyFunction.getIns().refreshSevenWuShenRank(hero, SevenHappyConst.TYPE_3);
		return totalAttr;
	}

}
