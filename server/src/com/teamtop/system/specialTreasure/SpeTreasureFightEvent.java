package com.teamtop.system.specialTreasure;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map.Entry;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.equip.model.Equip;
import com.teamtop.system.event.fightAttrEvent.IFightAttrEvent;
import com.teamtop.system.hero.FightAttr;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroConst;
import com.teamtop.system.sevenHappy.SevenHappyConst;
import com.teamtop.system.sevenHappy.SevenHappyFunction;
import com.teamtop.system.sevenWuShenRank.SevenWuShenRankConst;
import com.teamtop.system.sevenWuShenRank.SevenWuShenRankFunction;
import com.teamtop.system.wujiang.WuJiangConst;
import com.teamtop.util.common.CommonUtil;

import excel.config.Config_drug_200;
import excel.config.Config_jx_271;
import excel.config.Config_jxzl_271;
import excel.config.Config_xtcs_004;
import excel.config.Config_yb_217;
import excel.config.Config_yblv_217;
import excel.config.Config_yblvskill_217;
import excel.config.Config_ybstar_217;
import excel.config.Config_ybsuit_217;
import excel.config.Config_zhuangbei_204;
import excel.struct.Struct_jx_271;
import excel.struct.Struct_jxzl_271;
import excel.struct.Struct_yb_217;
import excel.struct.Struct_ybsuit_217;
import excel.struct.Struct_zhuangbei_204;

public class SpeTreasureFightEvent implements IFightAttrEvent {
	@Override
	public long[][] calcHero(Hero hero, FightAttr allAttrs) {
		SpecialTreasure specialTreasure=hero.getSpecialTreasure();
		HashMap<Integer, Long> attrMap=new HashMap<Integer, Long>();
		HashMap<Integer, Long> attrMapStarAndlv=new HashMap<Integer, Long>();
		Iterator<Entry<Integer, Integer>> iterator=hero.getSpecialTreasure().getTreasureStar().entrySet().iterator();
		Entry<Integer, Integer> entry = null;
		
		while (iterator.hasNext()) {
			entry = iterator.next();
			int treasureid=entry.getKey();
			int starNum=entry.getValue();
			
			Struct_yb_217 struct_yb_217 = Config_yb_217.getIns().get(treasureid);
			int starid = struct_yb_217.getStarid();
			int pingzhi=struct_yb_217.getPin();
			//升星
			int starindex=starid*1000+starNum;
			int[][] data = Config_ybstar_217.getIns().get(starindex).getAttr();
			if (data!=null) {
				CommonUtil.arrChargeMap(data, attrMap);
				CommonUtil.arrChargeMap(data, attrMapStarAndlv);
			}
			//觉醒之力
			HashMap<Integer, Integer> jueXingSkills = specialTreasure.getJueXingSkills().get(treasureid);
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
		if (Config_yblv_217.getIns().get(specialTreasure.getJieLv())!=null) {
			int[][] attr = Config_yblv_217.getIns().get(specialTreasure.getJieLv()).getAttr();
			CommonUtil.arrChargeMap(attr, attrMap);
			CommonUtil.arrChargeMap(attr, attrMapStarAndlv);
		}
		
		long[][] starAndlvAttr=CommonUtil.mapToArr(attrMapStarAndlv);
		int num=Config_xtcs_004.getIns().get(SpecialTreasureConst.TAOZHUANG_NUM).getNum();
		//套装表
		for (int i = 1; i <=num; i++) {
			Integer integer = specialTreasure.getTaozhuangs().get(i);
			if (Config_ybsuit_217.getIns().get(integer)!=null) {
				Struct_ybsuit_217 struct_ybsuit_217 = Config_ybsuit_217.getIns().get(integer);
				//套装基础属性
				CommonUtil.arrChargeMap(struct_ybsuit_217.getAttr(), attrMap);
				//套装羁绊属性
				CommonUtil.arrChargeMap(struct_ybsuit_217.getAttr1(), attrMap);
				
				int jc = struct_ybsuit_217.getJc();
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
		
		//异宝额外装备
		for (int i = GameConst.INDEX_70; i <=GameConst.INDEX_73; i++) {
			 Equip equip = hero.getOnbodyEquip().get(i);
			 if (equip!=null) {
				 Struct_zhuangbei_204 zhuangbei_602 = Config_zhuangbei_204.getIns().get(equip.getSysId());
				 int[][] attr = CommonUtil.copyDyadicArray(zhuangbei_602.getAttr());
				 CommonUtil.arrChargeMap(attr, attrMap);
			}
		}
	
		//技能
		for (int i = 1; i <=WuJiangConst.SKILLNUM; i++) {
			if (Config_yblvskill_217.getIns().get(specialTreasure.getSkills().get(i))!=null) {
				CommonUtil.arrChargeMap(Config_yblvskill_217.getIns().get(specialTreasure.getSkills().get(i)).getAttr(), attrMap);
			}
		}
		//属性丹3
		int num1=hero.getDanyao().get(HeroConst.DAN9);
		if (num1>0) {
			int[][] data1 = CommonUtil.copyDyadicArray(Config_drug_200.getIns().get(HeroConst.DAN9).getAttr());
			for(int[] d : data1){
				d[1] = d[1]*num1;
			}
			CommonUtil.arrChargeMap(data1, attrMap);
		}
		long[][] totalAttr=CommonUtil.mapToArr(attrMap);
		if (totalAttr!=null) {
			FightCalcFunction.setFightValue(totalAttr, allAttrs);
		}
		//七日武圣榜
		SevenWuShenRankFunction.getIns().refreshSevenWuShenRank(hero, SevenWuShenRankConst.TYPE_SPETREASURE);
		//开服狂欢
		SevenHappyFunction.getIns().refreshSevenWuShenRank(hero, SevenHappyConst.TYPE_14);
		return totalAttr;

	}

}
