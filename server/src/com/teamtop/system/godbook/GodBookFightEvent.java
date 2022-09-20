package com.teamtop.system.godbook;

import java.util.HashMap;

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
import com.teamtop.system.wujiang.WuJiangConst;
import com.teamtop.util.common.CommonUtil;

import excel.config.Config_book_215;
import excel.config.Config_booklv_215;
import excel.config.Config_booklvskill_215;
import excel.config.Config_bookstar_215;
import excel.config.Config_booksuit_215;
import excel.config.Config_drug_200;
import excel.config.Config_jx_271;
import excel.config.Config_jxzl_271;
import excel.config.Config_xtcs_004;
import excel.config.Config_zhuangbei_204;
import excel.struct.Struct_book_215;
import excel.struct.Struct_booksuit_215;
import excel.struct.Struct_jx_271;
import excel.struct.Struct_jxzl_271;
import excel.struct.Struct_zhuangbei_204;


public class GodBookFightEvent implements IFightAttrEvent{

	@Override
	public long[][] calcHero(Hero hero, FightAttr allAttrs) {
		HashMap<Integer, Long> attrMap=new HashMap<Integer, Long>();
		HashMap<Integer, Long> attrMapStarAndlv=new HashMap<Integer, Long>();
		if (hero.getGodbook().getHasBooks()!=null) {
			for (GodBookModel godBookModel:hero.getGodbook().getHasBooks().values()) {
				//激活
				int pingzhi=0;
				if (Config_book_215.getIns().get(godBookModel.getId())!=null) {
					Struct_book_215 struct_book_215 = Config_book_215.getIns().get(godBookModel.getId());
					pingzhi=struct_book_215.getPin();
				}
				//升星
				int starindex=pingzhi*1000+godBookModel.getStar();
				int[][] data = Config_bookstar_215.getIns().get(starindex).getAttr();
				if (data!=null) {
					CommonUtil.arrChargeMap(data, attrMap);
					CommonUtil.arrChargeMap(data, attrMapStarAndlv);
					//FightCalcFunction.setFightValue(data, allAttrs);
				}
				
				//觉醒之力
				HashMap<Integer, Integer> jueXingSkills = godBookModel.getJueXingSkills();
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
		//升级
		if (hero.getGodbook().getLevel()>0) {
			int[][] attr = Config_booklv_215.getIns().get(hero.getGodbook().getLevel()).getAttr();
			CommonUtil.arrChargeMap(attr, attrMap);
			CommonUtil.arrChargeMap(attr, attrMapStarAndlv);
		}

		long[][] starAndlvAttr=CommonUtil.mapToArr(attrMapStarAndlv);
		int taozhuangSize=Config_xtcs_004.getIns().get(GodBookConst.TAOZHUANGNUM).getNum();
		//套装表
		for (int i = 1; i <=taozhuangSize; i++) {
			Integer integer = hero.getGodbook().getTaozhuangs().get(i);
			if (Config_booksuit_215.getIns().get(integer)!=null) {
				Struct_booksuit_215 struct_booksuit_215 = Config_booksuit_215.getIns().get(integer);
				//套装基础属性
				CommonUtil.arrChargeMap(struct_booksuit_215.getAttr(), attrMap);
				//套装羁绊属性
				CommonUtil.arrChargeMap(struct_booksuit_215.getAttr1(), attrMap);
				
				int jc = struct_booksuit_215.getJc();
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
		
		
		//额外装备
		for (int i = GameConst.INDEX_100; i <=GameConst.INDEX_103; i++) {
			 Equip equip = hero.getOnbodyEquip().get(i);
			 if (equip!=null) {
				 Struct_zhuangbei_204 zhuangbei_602 = Config_zhuangbei_204.getIns().get(equip.getSysId());
				 int[][] attr1 = CommonUtil.copyDyadicArray(zhuangbei_602.getAttr());
				 CommonUtil.arrChargeMap(attr1, attrMap);
			}
		}
		GodBook godbook = hero.getGodbook();
		//技能
		for (int i = 1; i <=WuJiangConst.SKILLNUM; i++) {
			if (Config_booklvskill_215.getIns().get(godbook.getSkills().get(i))!=null) {
				CommonUtil.arrChargeMap(Config_booklvskill_215.getIns().get(godbook.getSkills().get(i)).getAttr(), attrMap);
			}
		}
		//天书属性丹3
		int num1=hero.getDanyao().get(GodBookConst.DAN8);
		if (num1>0) {
			int[][] data1 = CommonUtil.copyDyadicArray(Config_drug_200.getIns().get(GodBookConst.DAN8).getAttr());
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
		hero.getGodbook().setStrength((int)finalAttr.getStrength());
		// 刷新排行
		RankingFunction.getIns().refreshGodBookRankList(hero);
		//武圣榜
		SevenWuShenRankFunction.getIns().refreshSevenWuShenRank(hero, SevenWuShenRankConst.TYPE_GODBOOK);
		//开服狂欢
		SevenHappyFunction.getIns().refreshSevenWuShenRank(hero, SevenHappyConst.TYPE_11);
		return totalAttr;
	}

}
