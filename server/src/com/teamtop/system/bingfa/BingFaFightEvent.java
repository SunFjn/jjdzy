package com.teamtop.system.bingfa;

import java.util.HashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.equip.model.Equip;
import com.teamtop.system.event.fightAttrEvent.IFightAttrEvent;
import com.teamtop.system.hero.FightAttr;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.rankNew.RankingFunction;
import com.teamtop.system.wujiang.WuJiangConst;
import com.teamtop.util.common.CommonUtil;

import excel.config.Config_book_213;
import excel.config.Config_booklv_213;
import excel.config.Config_booklvskill_213;
import excel.config.Config_bookstar_213;
import excel.config.Config_booksuit_212;
import excel.config.Config_drug_200;
import excel.config.Config_jx_271;
import excel.config.Config_jxzl_271;
import excel.config.Config_xtcs_004;
import excel.config.Config_zhuangbei_204;
import excel.struct.Struct_book_213;
import excel.struct.Struct_bookstar_213;
import excel.struct.Struct_booksuit_212;
import excel.struct.Struct_jx_271;
import excel.struct.Struct_jxzl_271;
import excel.struct.Struct_zhuangbei_204;


public class BingFaFightEvent implements IFightAttrEvent {

	@Override
	public long[][]  calcHero(Hero hero, FightAttr allAttrs) {
		HashMap<Integer, Long> attrMap=new HashMap<Integer, Long>();
		HashMap<Integer, Long> attrMapStarAndlv=new HashMap<Integer, Long>();
		if (hero.getBingfa().getBingfas()!=null) {
			for (BingFaModel bingFaModel:hero.getBingfa().getBingfas().values()) {
				//激活
				int pingzhi=0;
				if (Config_book_213.getIns().get(bingFaModel.getIndex())!=null) {
					Struct_book_213 struct_book_213 = Config_book_213.getIns().get(bingFaModel.getIndex());
					pingzhi=struct_book_213.getPin();
				}
				//升星
				int starindex=pingzhi*1000+bingFaModel.getStar();
				Struct_bookstar_213 struct_bookstar_213 = Config_bookstar_213.getIns().get(starindex);
				if (struct_bookstar_213!=null) {
				    int[][] data =struct_bookstar_213.getAttr();
					CommonUtil.arrChargeMap(data, attrMap);
					CommonUtil.arrChargeMap(data, attrMapStarAndlv);
				}
				//觉醒之力
				HashMap<Integer, Integer> jueXingSkills = bingFaModel.getJueXingSkills();
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
		}
		BingFa bingFa=hero.getBingfa();
		//进阶
		if (Config_booklv_213.getIns().get(bingFa.getJieLv())!=null) {
			int[][] data  = Config_booklv_213.getIns().get(bingFa.getJieLv()).getAttr();
			CommonUtil.arrChargeMap(data, attrMap);
			CommonUtil.arrChargeMap(data, attrMapStarAndlv);
		}
		long[][] starAndlvAttr=CommonUtil.mapToArr(attrMapStarAndlv);
		int taozhuangSize=Config_xtcs_004.getIns().get(BingFaConst.TAOZHUANG_NUM).getNum();
		//兵法套装表
		for (int i = 1; i <=taozhuangSize; i++) {
			Integer integer = hero.getBingfa().getTaozhuanbfs().get(i);
			if (Config_booksuit_212.getIns().get(integer)!=null) {
				Struct_booksuit_212 struct_booksuit_212 = Config_booksuit_212.getIns().get(integer);
				//套装基础属性
				CommonUtil.arrChargeMap(struct_booksuit_212.getAttr(), attrMap);
				//套装羁绊属性
				CommonUtil.arrChargeMap(struct_booksuit_212.getAttr1(), attrMap);
				
				int jc = struct_booksuit_212.getJc();
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
		//兵法额外装备
		for (int i = GameConst.INDEX_80; i <=GameConst.INDEX_83; i++) {
			 Equip equip = hero.getOnbodyEquip().get(i);
			 if (equip!=null) {
				 Struct_zhuangbei_204 zhuangbei_602 = Config_zhuangbei_204.getIns().get(equip.getSysId());
				 int[][] attr = CommonUtil.copyDyadicArray(zhuangbei_602.getAttr());
				 CommonUtil.arrChargeMap(attr, attrMap);
			}
		}
		
		//技能
		for (int i = 1; i <=WuJiangConst.SKILLNUM; i++) {
			if (Config_booklvskill_213.getIns().get(bingFa.getSkills().get(i))!=null) {
				CommonUtil.arrChargeMap(Config_booklvskill_213.getIns().get(bingFa.getSkills().get(i)).getAttr(), attrMap);
			}
		}
		//属性丹3
		int num1=hero.getDanyao().get(BingFaConst.DAN);
		if (num1>0) {
			int[][] data1 = CommonUtil.copyDyadicArray(Config_drug_200.getIns().get(BingFaConst.DAN).getAttr());
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
		hero.getBingfa().setStrength((int)finalAttr.getStrength());
		// 刷新排行
		RankingFunction.getIns().refreshBingFaRankList(hero);
		return totalAttr;
	}

}
