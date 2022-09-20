package com.teamtop.system.zhanjia;

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
import com.teamtop.util.common.CommonUtil;

import excel.config.Config_clothes_212;
import excel.config.Config_clotheslv_212;
import excel.config.Config_clotheslvskill_212;
import excel.config.Config_clothesstar_212;
import excel.config.Config_clothessuit_212;
import excel.config.Config_drug_200;
import excel.config.Config_jx_271;
import excel.config.Config_jxzl_271;
import excel.config.Config_xtcs_004;
import excel.config.Config_zhuangbei_204;
import excel.struct.Struct_clothes_212;
import excel.struct.Struct_clothessuit_212;
import excel.struct.Struct_jx_271;
import excel.struct.Struct_jxzl_271;
import excel.struct.Struct_zhuangbei_204;



public class ZhanJiaFightEvent implements IFightAttrEvent{

	@Override
	public long[][] calcHero(Hero hero, FightAttr allAttrs) {
		HashMap<Integer, Long> attrMap=new HashMap<Integer, Long>();
		HashMap<Integer, Long> attrMapStarAndlv=new HashMap<Integer, Long>();
		if (hero.getZhanJia().getZhanjias()!=null) {
			for (ZhanJiaModel zhanJiaModel:hero.getZhanJia().getZhanjias().values()) {
				//激活
				int pingzhi=0;
				if (Config_clothes_212.getIns().get(zhanJiaModel.getType())!=null) {
					Struct_clothes_212 struct_clothes_212 = Config_clothes_212.getIns().get(zhanJiaModel.getType());
					pingzhi=struct_clothes_212.getPinzhi();
				}
				//升星
				int starindex=pingzhi*1000+zhanJiaModel.getStar();
				int[][] data = Config_clothesstar_212.getIns().get(starindex).getAttr();
				if (data!=null) {
					CommonUtil.arrChargeMap(data, attrMap);
					CommonUtil.arrChargeMap(data, attrMapStarAndlv);
				}
				//觉醒之力
				HashMap<Integer, Integer> jueXingSkills = zhanJiaModel.getJueXingSkills();
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
		//进阶
		if (Config_clotheslv_212.getIns().get(hero.getZhanJia().getJieLv())!=null) {
			int[][] attr = Config_clotheslv_212.getIns().get(hero.getZhanJia().getJieLv()).getAttr();
			CommonUtil.arrChargeMap(attr, attrMap);
			CommonUtil.arrChargeMap(attr, attrMapStarAndlv);
		}
		
		
		long[][] starAndlvAttr=CommonUtil.mapToArr(attrMapStarAndlv);
		int taozhuangSize=Config_xtcs_004.getIns().get(ZhanJiaConst.TAOZHUANGNUM).getNum();
		//兵法套装表
		for (int i = 1; i <=taozhuangSize; i++) {
			Integer integer = hero.getZhanJia().getTaozhuangs().get(i);
			if (Config_clothessuit_212.getIns().get(integer)!=null) {
				Struct_clothessuit_212 struct_clothessuit_212 = Config_clothessuit_212.getIns().get(integer);
				//套装基础属性
				CommonUtil.arrChargeMap(struct_clothessuit_212.getAttr(), attrMap);
				//套装羁绊属性
				CommonUtil.arrChargeMap(struct_clothessuit_212.getAttr1(), attrMap);
				
				int jc = struct_clothessuit_212.getJc();
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
		
		
		//技能
		for (int i = 1; i <=ZhanJiaConst.SKILLNUM; i++) {
			if (Config_clotheslvskill_212.getIns().get(hero.getZhanJia().getZhanJiaSkill().get(i))!=null) {
				CommonUtil.arrChargeMap(Config_clotheslvskill_212.getIns().get(hero.getZhanJia().getZhanJiaSkill().get(i)).getAttr(), attrMap);
			}
		}
		//战甲额外装备
		for (int i = GameConst.INDEX_50; i <=GameConst.INDEX_53; i++) {
			 Equip equip = hero.getOnbodyEquip().get(i);
			 if (equip!=null) {
				 Struct_zhuangbei_204 zhuangbei_602 = Config_zhuangbei_204.getIns().get(equip.getSysId());
				 int[][] attr = CommonUtil.copyDyadicArray(zhuangbei_602.getAttr());
				 CommonUtil.arrChargeMap(attr, attrMap);
			}
		}
		//战甲属性丹3
		int num1=hero.getDanyao().get(ZhanJiaConst.DAN3);
		if (num1>0) {
			int[][] data1 = CommonUtil.copyDyadicArray(Config_drug_200.getIns().get(ZhanJiaConst.DAN3).getAttr());
			for(int[] d : data1){
				d[1] = d[1]*num1;
			}
			CommonUtil.arrChargeMap(data1, attrMap);
		}
		//战甲资质丹4
		int num2=hero.getDanyao().get(ZhanJiaConst.DAN4);
		if (num2>0) {
			int[][] data2 = CommonUtil.copyDyadicArray(Config_drug_200.getIns().get(ZhanJiaConst.DAN4).getAttr());
			for(int[] d : data2){
				d[1] = d[1]*num2;
			}
			CommonUtil.arrChargeMap(data2, attrMap);
		}
		
		long[][] attr=CommonUtil.mapToArr(attrMap);
		if (attr!=null) {
			FightCalcFunction.setFightValue(attr,allAttrs);
		}
		// 设置本玩法系统战力
		FinalFightAttr finalAttr = new FinalFightAttr();
		FightAttr fAttr = new FightAttr();
		FightCalcFunction.setFightValue(attr, fAttr);
		FightCalcFunction.calcEquipAttr(finalAttr, fAttr, 0);
		hero.getZhanJia().setStrength((int)finalAttr.getStrength());
		// 刷新排行榜
		RankingFunction.getIns().refreshZhanjiaRankList(hero);
		//七日武圣榜
		//SevenWuShenRankFunction.getIns().refreshSevenWuShenRank(hero, SevenWuShenRankConst.TYPE_ZHANJIA);
		//开服狂欢
		SevenHappyFunction.getIns().refreshSevenWuShenRank(hero, SevenHappyConst.TYPE_6);
		return attr;
	}

}
