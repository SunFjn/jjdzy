package com.teamtop.system.wujiang;

import java.util.HashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.equip.model.Equip;
import com.teamtop.system.event.fightAttrEvent.IFightAttrEvent;
import com.teamtop.system.fashionClothes.FashionClothes;
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

import excel.config.Config_drug_200;
import excel.config.Config_godherotf_289;
import excel.config.Config_hero_211;
import excel.config.Config_herogod_211;
import excel.config.Config_herogodskill_211;
import excel.config.Config_herolv_211;
import excel.config.Config_herolvskill_211;
import excel.config.Config_herostar_211;
import excel.config.Config_herosuit_211;
import excel.config.Config_jx_271;
import excel.config.Config_jxzl_271;
import excel.config.Config_sz_739;
import excel.config.Config_xtcs_004;
import excel.config.Config_zhuangbei_204;
import excel.struct.Struct_godherotf_289;
import excel.struct.Struct_hero_211;
import excel.struct.Struct_herogod_211;
import excel.struct.Struct_herogodskill_211;
import excel.struct.Struct_herostar_211;
import excel.struct.Struct_herosuit_211;
import excel.struct.Struct_jx_271;
import excel.struct.Struct_jxzl_271;
import excel.struct.Struct_sz_739;
import excel.struct.Struct_zhuangbei_204;

/**
 * 战斗属性加成
 * @author jjjjyyy
 *
 */
public class WuJiangFightEvent implements IFightAttrEvent{
	@Override
	public long[][] calcHero(Hero hero, FightAttr allAttrs) {
		WuJiang wujiang = hero.getWujiang();
		HashMap<Integer, Long> attrMap = new HashMap<Integer, Long>();
		HashMap<Integer, Long> attrMapStarAndlv=new HashMap<Integer, Long>();
		if (wujiang.getWujiangs()!=null) {
			for (WuJiangModel wuJiangModel:wujiang.getWujiangs().values()) {
				int pinzhi=0;
				//激活武将
				if (Config_hero_211.getIns().get(wuJiangModel.getType())!=null) {
					Struct_hero_211 struct_hero_211 = Config_hero_211.getIns().get(wuJiangModel.getType());
					pinzhi=struct_hero_211.getPinzhi();

				}
				//武将升星
				int starindex=pinzhi*1000+wuJiangModel.getStar();
				Struct_hero_211 struct_hero_211 = Config_hero_211.getIns().get(wuJiangModel.getType());
				if(struct_hero_211.getGodhero() == 1) {
					starindex=pinzhi*1000+wuJiangModel.getXiulianLv();
				}
				Struct_herostar_211 struct_herostar_211 = Config_herostar_211.getIns().get(starindex);
				if (struct_herostar_211!=null) {
					int[][] data = CommonUtil.copyDyadicArray(struct_herostar_211.getAttr());
					CommonUtil.arrChargeMap(data, attrMap);
					CommonUtil.arrChargeMap(data, attrMapStarAndlv);
				}
				
				if(struct_hero_211.getGodhero() == 1) {
					//神将激活属性
					CommonUtil.arrChargeMap(struct_hero_211.getAttr(), attrMap);
					//神将天赋属性
					Struct_godherotf_289 struct_godherotf_289 = Config_godherotf_289.getIns().get(wuJiangModel.getTalentLv());
					if(struct_godherotf_289 != null) {
						CommonUtil.arrChargeMap(struct_godherotf_289.getAttr(), attrMap);
					}
					// 觉醒之力
					HashMap<Integer, Integer> jueXingSkills = wuJiangModel.getJueXingSkills();
					if (jueXingSkills != null && jueXingSkills.size() > 0) {
						for (int i = GameConst.JUEXING_SKILL1; i <= GameConst.JUEXING_SKILL4; i++) {
							if (i != GameConst.JUEXING_SKILL4) {
								// 觉醒技能
								// id=品质id*10000+觉醒技能id*1000+等级
								int goalIndex = pinzhi * 10000 + i * 1000 + jueXingSkills.get(i);
								Struct_jx_271 struct_jx_271 = Config_jx_271.getIns().get(goalIndex);
								if (struct_jx_271 != null) {
									CommonUtil.arrChargeMap(struct_jx_271.getAttr(), attrMap);
								}
							} else {
								// 觉醒之力
								// id=品质id*100+等级
								int goalIndex = pinzhi * 100 + jueXingSkills.get(i);
								Struct_jxzl_271 struct_jxzl_271 = Config_jxzl_271.getIns().get(goalIndex);
								if (struct_jxzl_271 != null) {
									CommonUtil.arrChargeMap(struct_jxzl_271.getAttr(), attrMap);
								}

							}
						}
					}
				}else {
					//武将-神将之力
					int godStar = wuJiangModel.getGodStar();
					if (godStar>0) {
						int goalindex=wuJiangModel.getType()*100+godStar;
						Struct_herogod_211 struct_herogod_211 = Config_herogod_211.getIns().get(goalindex);
						if (struct_herogod_211!=null) {
							CommonUtil.arrChargeMap(struct_herogod_211.getAttr(), attrMap);
						}
						
					}
					// 武将-神将之力技能进阶
					int godSkillLevel = wuJiangModel.getGodSkillLevel();
					if (godSkillLevel > 0) {
						int goalindex = WuJiangFunction.getIns().godSkillLvToId(wuJiangModel.getType(), godSkillLevel);
						Struct_herogodskill_211 struct_herogodskill_211 = Config_herogodskill_211.getIns()
								.get(goalindex);
						if (struct_herogodskill_211 != null) {
							CommonUtil.arrChargeMap(struct_herogodskill_211.getAttr(), attrMap);
						}

					}
					//觉醒之力
					HashMap<Integer, Integer> jueXingSkills = wuJiangModel.getJueXingSkills();
					if(jueXingSkills!=null && jueXingSkills.size()>0) {
						for (int i = GameConst.JUEXING_SKILL1; i <=GameConst.JUEXING_SKILL4; i++) {
							if (i!=GameConst.JUEXING_SKILL4) {
								//觉醒技能
								//id=品质id*10000+觉醒技能id*1000+等级
								int goalIndex=pinzhi*10000+i*1000+jueXingSkills.get(i);
								Struct_jx_271 struct_jx_271 = Config_jx_271.getIns().get(goalIndex);
								if (struct_jx_271!=null) {
									CommonUtil.arrChargeMap(struct_jx_271.getAttr(), attrMap);
								}
							}else {
								//觉醒之力
								//id=品质id*100+等级
								int goalIndex=pinzhi*100+jueXingSkills.get(i);
								Struct_jxzl_271 struct_jxzl_271 = Config_jxzl_271.getIns().get(goalIndex);
								if (struct_jxzl_271!=null) {
									CommonUtil.arrChargeMap(struct_jxzl_271.getAttr(), attrMap);
								}
								
							}
						}
					}
				}
			}
		}
		//武将进阶
		if (Config_herolv_211.getIns().get(wujiang.getJieLv())!=null) {
			int[][] attr = Config_herolv_211.getIns().get(wujiang.getJieLv()).getAttr();
			CommonUtil.arrChargeMap(attr, attrMap);
			CommonUtil.arrChargeMap(attr, attrMapStarAndlv);
		}
		long[][] starAndlvAttr=CommonUtil.mapToArr(attrMapStarAndlv);
		
		int num=Config_xtcs_004.getIns().get(WuJiangConst.TAOZHUANG_NUM).getNum();
		//武将套装表
		for (int i = 1; i <=num; i++) {
			Integer integer = wujiang.getTaozhuangs().get(i);
			if (Config_herosuit_211.getIns().get(integer)!=null) {
				Struct_herosuit_211 struct_herosuit_211 = Config_herosuit_211.getIns().get(integer);
				//套装基础属性
				CommonUtil.arrChargeMap(struct_herosuit_211.getAttr(), attrMap);
				//套装羁绊属性
				CommonUtil.arrChargeMap(struct_herosuit_211.getAttr1(), attrMap);
				
				int jc = struct_herosuit_211.getJc();
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
		
		
		//武将技能
		for (int i = 1; i <=WuJiangConst.SKILLNUM; i++) {
			if (Config_herolvskill_211.getIns().get(wujiang.getWujiangSkill().get(i))!=null) {
				CommonUtil.arrChargeMap(Config_herolvskill_211.getIns().get(wujiang.getWujiangSkill().get(i)).getAttr(), attrMap);
			}
		}
		//武将时装
		FashionClothes fashionClothes=hero.getFashionClothes();
		if (fashionClothes.getClothesStar().size()>0) {
			for (int key : fashionClothes.getClothesStar().keySet()) {
				Struct_sz_739 struct_sz_739 = Config_sz_739.getIns().get(key);
				//激活武将时装
				if (struct_sz_739!=null) {
					CommonUtil.arrChargeMap(struct_sz_739.getShuxing(), attrMap);	
				}
				//武将时装升星
				int starNum=fashionClothes.getClothesStar().get(key)-1;
				if (starNum>0) {
					if (struct_sz_739!=null) {
						int[][] data = CommonUtil.copyDyadicArray(struct_sz_739.getShengxing());
						for(int[] d : data){
							d[1] = d[1]*starNum;
						}
						CommonUtil.arrChargeMap(data, attrMap);
					}
				}
			}
		}
		//将印装备
		for (int i = GameConst.INDEX_WUJING_0; i <=GameConst.INDEX_WUJING_9; i++) {
			 Equip equip = hero.getOnbodyEquip().get(i);
			 if (equip!=null) {
				 Struct_zhuangbei_204 zhuangbei_602 = Config_zhuangbei_204.getIns().get(equip.getSysId());
				 int[][] attr = CommonUtil.copyDyadicArray(zhuangbei_602.getAttr());
				 CommonUtil.arrChargeMap(attr, attrMap);
			}
		}
		//武将装备
		for (int i = GameConst.INDEX_40; i <=GameConst.INDEX_43; i++) {
			 Equip equip = hero.getOnbodyEquip().get(i);
			 if (equip!=null) {
				 Struct_zhuangbei_204 zhuangbei_602 = Config_zhuangbei_204.getIns().get(equip.getSysId());
				 int[][] attr = CommonUtil.copyDyadicArray(zhuangbei_602.getAttr());
				 CommonUtil.arrChargeMap(attr, attrMap);
			}
		}
		//武将属性丹
		int num1=hero.getDanyao().get(WuJiangConst.INDEX1);
		if (num1>0) {
			int[][] data1 = CommonUtil.copyDyadicArray(Config_drug_200.getIns().get(WuJiangConst.INDEX1).getAttr());
			for(int[] d : data1){
				d[1] = d[1]*num1;
			}
			CommonUtil.arrChargeMap(data1, attrMap);
		}
		//武将培养丹
		int num2=hero.getDanyao().get(WuJiangConst.INDEX2);
		if (num2>0) {
			int[][] data2 = CommonUtil.copyDyadicArray(Config_drug_200.getIns().get(WuJiangConst.INDEX2).getAttr());
			for(int[] d : data2){
				d[1] = d[1]*num2;
			}
			CommonUtil.arrChargeMap(data2, attrMap);
		}
		long[][] arr=CommonUtil.mapToArr(attrMap);
		if (arr!=null) {
			FightCalcFunction.setFightValue(arr, allAttrs);
		}
		// 设置战力
		FinalFightAttr finalAttr = new FinalFightAttr();
		FightAttr fAttr = new FightAttr();
		FightCalcFunction.setFightValue(arr, fAttr);
		FightCalcFunction.calcEquipAttr(finalAttr, fAttr, 0);
		wujiang.setStrength((int)finalAttr.getStrength());
		// 刷新排行
		RankingFunction.getIns().refreshWujiangRankList(hero);
		//七日武圣榜
		SevenWuShenRankFunction.getIns().refreshSevenWuShenRank(hero, SevenWuShenRankConst.TYPE_WUJIANG);
		//开服狂欢
		SevenHappyFunction.getIns().refreshSevenWuShenRank(hero, SevenHappyConst.TYPE_5);
		return arr;
	}

}
