package com.teamtop.system.specialTreasure;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map.Entry;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.achievement.AchievementEnum;
import com.teamtop.system.achievement.AchievementFunction;
import com.teamtop.system.bag.BagFunction;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.equip.model.Equip;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.FightAttr;
import com.teamtop.system.hero.FightCalcConst;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroConst;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.promotion.PromotionFunction;
import com.teamtop.system.promotion.PromotionTaskType;
import com.teamtop.system.wujiang.WuJiangConst;
import com.teamtop.system.zhanjia.ZhanJiaFunction;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

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

public class SpecialTreasureManager {
	
	private static SpecialTreasureManager ins;
	public static SpecialTreasureManager getIns(){
		if(ins == null) {
			ins = new SpecialTreasureManager();
		}
		return ins;
	}
	/**
	 * 打开异宝ui
	 * @param hero
	 */
	public void speTreasureUI(Hero hero) {
		try {
			Object[] treasure=new Object[] {};
			if (hero.getSpecialTreasure().getTreasureStar().size()>0) {
				treasure=new Object[hero.getSpecialTreasure().getTreasureStar().size()];
				int a=0;
				for (Entry<Integer, Integer> entry:hero.getSpecialTreasure().getTreasureStar().entrySet()) {
					int treasureid=entry.getKey();
					int star=entry.getValue();
					treasure[a]=new Object[] {treasureid,star};
					a++;
				}
			}
			SpecialTreasureSender.sendCmd_1042(hero.getId(), treasure,  hero.getDanyao().get(HeroConst.DAN9));
			return;
		} catch (Exception e) {
			LogTool.error(e, SpecialTreasureManager.class, hero.getId(), hero.getName(), "speTreasureUI has wrong");
		}
		
	}
	/**
	 * CG 激活/升星异宝 1043
	 * @param treasureid| 异宝id| int
	 */
	public void upStar(Hero hero, int treasureid) {
		try {
			if (hero.getSpecialTreasure().getTreasureStar().containsKey(treasureid)) {
				Struct_yb_217 struct_yb_217 = Config_yb_217.getIns().get(treasureid);
				if (UseAddUtil.canUse(hero, struct_yb_217.getItem())) {
					int star=hero.getSpecialTreasure().getTreasureStar().get(treasureid);
					if (star<struct_yb_217.getStar()) {
						UseAddUtil.use(hero, struct_yb_217.getItem(), SourceGoodConst.SPETREASURE_STAR, true);
						int starNum=hero.getSpecialTreasure().getTreasureStar().get(treasureid)+1;
						hero.getSpecialTreasure().getTreasureStar().put(treasureid, starNum);
						FightCalcFunction.setRecalcAll(hero, FightCalcConst.SPECIALTREASURE,SystemIdConst.SpeTreasure_SYSID);
						SpecialTreasureSender.sendCmd_1044(hero.getId(), 0, treasureid, starNum);
						// 成就
						AchievementFunction.getIns().checkTask(hero, AchievementEnum.GOAL_16, 0);
						star=hero.getSpecialTreasure().getTreasureStar().get(treasureid);
						if (starNum>=struct_yb_217.getStar()) {
							//星级已经是最高    觉醒红点
							ZhanJiaFunction.getIns().jueXingRedPonint(hero,false);
						}
						return;
					}
				}
			}else {
				//激活
				Struct_yb_217 struct_yb_217 = Config_yb_217.getIns().get(treasureid);
				if (UseAddUtil.canUse(hero, struct_yb_217.getItem())) {
					UseAddUtil.use(hero, struct_yb_217.getItem(), SourceGoodConst.SPETREASURE_STAR, true);
					hero.getSpecialTreasure().getTreasureStar().put(treasureid, 1);
					//觉醒之力
					if (hero.getSpecialTreasure().getJueXingSkills()==null) {
						hero.getSpecialTreasure().setJueXingSkills(new HashMap<>());
					}
					HashMap<Integer, Integer> hashMap = hero.getSpecialTreasure().getJueXingSkills().get(treasureid);
					if (hashMap==null||hashMap.size()==0) {
						hashMap=new HashMap<>();
						hashMap.put(GameConst.JUEXING_SKILL1, 0);
						hashMap.put(GameConst.JUEXING_SKILL2, 0);
						hashMap.put(GameConst.JUEXING_SKILL3, 0);
						hashMap.put(GameConst.JUEXING_SKILL4, 0);
					}
					hero.getSpecialTreasure().getJueXingSkills().put(treasureid, hashMap);
					// 成就
					AchievementFunction.getIns().checkTask(hero, AchievementEnum.GOAL_15, 0);
					SpecialTreasureSender.sendCmd_1044(hero.getId(), 0, treasureid, 1);
					FightCalcFunction.setRecalcAll(hero, FightCalcConst.SPECIALTREASURE,SystemIdConst.SpeTreasure_SYSID);
					PromotionFunction.getIns().updatePromotionTask(hero.getId(),
							PromotionTaskType.ACTIVATE_SPECIALTREASURE, null);
					if (struct_yb_217.getPin()>=Config_xtcs_004.getIns().get(ChatConst.BROCAST_GOODPING).getNum()) {
						ChatManager.getIns().broadCast(ChatConst.BROCAST_SPECIALTREASURE,
								new Object[] { hero.getName(), struct_yb_217.getId() }); // 全服广播
					}
					return;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, SpecialTreasureManager.class, hero.getId(), hero.getName(), "upStar has wrong");
		}
		
	}
	/**
	 * 
	 * @param hero
	 * @param type
	 */
	public void eatDan(Hero hero, int type) {
		try {
			int itemid=Config_drug_200.getIns().get(HeroConst.DAN9).getId();
			int useNum=hero.getDanyao().get(HeroConst.DAN9);
			int maxNum=getMaxDanNum(hero);
			int num=0;
			int canUseNum=0;
			
			if (useNum>=maxNum) {
				canUseNum=0;
				SpecialTreasureSender.sendCmd_1046(hero.getId(), 1, type, hero.getDanyao().get(HeroConst.DAN9));
				return;
			}else {
				canUseNum=maxNum-useNum;
			}
			
			int hasNum=BagFunction.getIns().getGoodsNumBySysId(hero.getId(), itemid);
			if (hasNum<=0) {
				SpecialTreasureSender.sendCmd_1046(hero.getId(), 1, type, hero.getDanyao().get(HeroConst.DAN9));
				return;
			}
			if (type==0) {
				num=1;
			}else {
				if (canUseNum>hasNum) {
					num=hasNum;
				}else {
					num=canUseNum;
				}
			}
			if (UseAddUtil.canUse(hero, GameConst.TOOL, num, itemid)) {
				UseAddUtil.use(hero, GameConst.TOOL, num, itemid, SourceGoodConst.SPETREASURE_DAN9, true);
				hero.getDanyao().put(HeroConst.DAN9, hero.getDanyao().get(HeroConst.DAN9)+num);
				FightCalcFunction.setRecalcAll(hero, FightCalcConst.SPETREASURE_DAN9,SystemIdConst.SpeTreasure_SYSID);
				SpecialTreasureSender.sendCmd_1046(hero.getId(), 0, type, hero.getDanyao().get(HeroConst.DAN9));	
				return;
			}
		} catch (Exception e) {
			LogTool.error(e, SpecialTreasureManager.class, hero.getId(), hero.getName(), "upStar has wrong");
		}
	}
	
	
	/**
	 * 获得属性丹
	 * @param hero
	 * @return
	 */
	public int getMaxDanNum(Hero hero) {
		int danNums=0;
		for (Entry<Integer, Integer> entry:hero.getSpecialTreasure().getTreasureStar().entrySet()) {
			int treasureid=entry.getKey();
			int star=entry.getValue();
			danNums=danNums+Config_yb_217.getIns().get(treasureid).getMax()*star;
		}
		return danNums;
	}
	
	/**
	 * 获取神剑战力
	 * @param hero
	 * @return
	 */
	public long getSpeTreasureTotalStrength(Hero hero) {
		SpecialTreasure specialTreasure = hero.getSpecialTreasure();
		if (specialTreasure != null) {
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
						Struct_jxzl_271 struct_jxzl_271 = Config_jxzl_271.getIns().get(jueXingSkills.get(i));
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
			long[][] totalAttr = CommonUtil.mapToArr(attrMap);
			FinalFightAttr finalAttr = new FinalFightAttr();
			FightAttr attr = new FightAttr();
			FightCalcFunction.setFightValue(totalAttr, attr);
			FightCalcFunction.calcEquipAttr(finalAttr, attr, 0);
			return finalAttr.getStrength();
		}
		return 0;
	}
	
	
	
	public long getSpeTreasureStrengthByid(Hero hero,int index) {
		SpecialTreasure specialTreasure = hero.getSpecialTreasure();
		HashMap<Integer, Long> attrMap=new HashMap<Integer, Long>();
		int starNum=specialTreasure.getTreasureStar().get(index);
		Struct_yb_217 struct_yb_217 = Config_yb_217.getIns().get(index);
		int starid = struct_yb_217.getStarid();
		//升星
		int starindex=starid*1000+starNum;
		int[][] data = Config_ybstar_217.getIns().get(starindex).getAttr();
		if (data!=null) {
			CommonUtil.arrChargeMap(data, attrMap);
		}
		//进阶
		/*if (Config_yblv_217.getIns().get(specialTreasure.getJieLv())!=null) {
			CommonUtil.arrChargeMap(Config_yblv_217.getIns().get(specialTreasure.getJieLv()).getAttr(), attrMap);
		}*/
		long[][] totalAttr = CommonUtil.mapToArr(attrMap);
		FinalFightAttr finalAttr = new FinalFightAttr();
		FightAttr attr = new FightAttr();
		FightCalcFunction.setFightValue(totalAttr, attr);
		FightCalcFunction.calcEquipAttr(finalAttr, attr, 0);
		return finalAttr.getStrength();
	}
}
