package com.teamtop.system.excalibur;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.system.equip.model.Equip;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.excalibur.model.Excalibur;
import com.teamtop.system.excalibur.model.ExcaliburModel;
import com.teamtop.system.hero.FightAttr;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.wujiang.WuJiangConst;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

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
import excel.struct.Struct_swordsuit_216;
import excel.struct.Struct_zhuangbei_204;

public class ExcaliburFunction {

	private static ExcaliburFunction excaliburFunction;

	private ExcaliburFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized ExcaliburFunction getIns() {
		if (excaliburFunction == null) {
			excaliburFunction = new ExcaliburFunction();
		}
		return excaliburFunction;
	}
	
	public int getExcaliburByPinZhi(Hero hero,int goal) {
		int num=0;
		Excalibur excalibur = hero.getExcalibur();
		ExcaliburModel excaliburModel = null;
		Struct_sword_216 struct_sword_216 = null;
		Map<Integer, ExcaliburModel> excaliburMap = excalibur.getExcaliburMap();
		Iterator<ExcaliburModel> iterator = excaliburMap.values().iterator();
		if (excalibur != null) {
			for (; iterator.hasNext();) {
				excaliburModel = iterator.next();
				struct_sword_216 = Config_sword_216.getIns().get(excaliburModel.getId());
				if (struct_sword_216.getPin()>=goal) {
					num++;
				}
			}
		}
		return num;
	}

	/**
	 * 获取神剑战力
	 * @param hero
	 * @return
	 */
	public long getExcaliburTotalStrength(Hero hero) {
		Excalibur excalibur = hero.getExcalibur();
		if (excalibur != null) {
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
						Struct_jxzl_271 struct_jxzl_271 = Config_jxzl_271.getIns().get(jueXingSkills.get(i));
						if (struct_jxzl_271!=null) {
							CommonUtil.arrChargeMap(struct_jxzl_271.getAttr(), attrMap);
						}
						
					}
				}
			}
			//进阶
			if (Config_swordlv_216.getIns().get(excalibur.getJieLv())!=null) {
				int[][] attr = Config_swordlv_216.getIns().get(excalibur.getJieLv()).getAttr();
				CommonUtil.arrChargeMap(attr,attrMap);
				CommonUtil.arrChargeMap(attr, attrMapStarAndlv);
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
			long[][] totalAttr = CommonUtil.mapToArr(attrMap);
			FinalFightAttr finalAttr = new FinalFightAttr();
			FightAttr attr = new FightAttr();
			FightCalcFunction.setFightValue(totalAttr, attr);
			FightCalcFunction.calcEquipAttr(finalAttr, attr, 0);
			return finalAttr.getStrength();
		}
		return 0;
	}
	/***
	 * 获取单个神剑战力
	 * @param hero
	 * @param index
	 * @return
	 */
	public long getExcaliburStrengthByIndex(Hero hero,int index) {
		Excalibur excalibur = hero.getExcalibur();
		if (excalibur != null) {
			Map<Integer, Long> attrMap = new HashMap<>();
			ExcaliburModel excaliburModel = excalibur.getExcaliburMap().get(index);
			Struct_sword_216 struct_sword_216 = null;
			int id = 0;
			int starLevel = 0;
			int[][] baseAttr = null;
			int[][] starattr = null;
			id = excaliburModel.getId();
			starLevel = excaliburModel.getStarLevel();
			struct_sword_216 = Config_sword_216.getIns().get(id);
			if (struct_sword_216 != null) {
				int pingzhi= struct_sword_216.getPin();
				int starid = struct_sword_216.getStarid();
				// 基础
				baseAttr = struct_sword_216.getAttr();
				//CommonUtil.arrChargeMap(baseAttr, attrMap);
				// 星级
				int starindex=starid*1000+starLevel;
				starattr = Config_swordstar_216.getIns().get(starindex).getAttr();
				if (starattr!=null) {
					CommonUtil.arrChargeMap(starattr, attrMap);
				}
			}
			//进阶
			/*if (Config_swordlv_216.getIns().get(excalibur.getJieLv())!=null) {
				CommonUtil.arrChargeMap(Config_swordlv_216.getIns().get(excalibur.getJieLv()).getAttr(), attrMap);
			}*/
			long[][] totalAttr = CommonUtil.mapToArr(attrMap);
			FinalFightAttr finalAttr = new FinalFightAttr();
			FightAttr attr = new FightAttr();
			FightCalcFunction.setFightValue(totalAttr, attr);
			FightCalcFunction.calcEquipAttr(finalAttr, attr, 0);
			return finalAttr.getStrength();
		}
		return 0;
	}
	
	
	

	public boolean checkRedPoint(Hero hero) {
		try {
			Excalibur excalibur = hero.getExcalibur();
			if (excalibur != null) {
				Map<Integer, ExcaliburModel> excaliburMap = excalibur.getExcaliburMap();
				List<Struct_sword_216> sortList = Config_sword_216.getIns().getSortList();
				int size = sortList.size();
				Struct_sword_216 sword = null;
				int[][] item = null;
				for(int i=0;i<size;i++) {
					sword = sortList.get(i);
					ExcaliburModel model = excaliburMap.get(sword.getId());
					item = sword.getItem();
					if(model!=null){						
						if(model.getStarLevel()>=sword.getMax()) {
							continue;
						}
					}
					if (UseAddUtil.canUse(hero, item)) {
						return true;
					}
				}
				Iterator<ExcaliburModel> iterator = excaliburMap.values().iterator();
				ExcaliburModel model = null;
				for (; iterator.hasNext();) {
					model = iterator.next();
					Struct_sword_216 struct_sword_216 = Config_sword_216.getIns().get(model.getId());
					item = struct_sword_216.getItem();
					if (UseAddUtil.canUse(hero, item)) {
						return true;
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, ExcaliburFunction.class, hero.getId(), hero.getName(), "ExcaliburFunction checkRedPoint fail");
		}
		return false;
	}

}
