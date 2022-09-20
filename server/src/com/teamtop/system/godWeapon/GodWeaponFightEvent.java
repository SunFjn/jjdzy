package com.teamtop.system.godWeapon;

import java.util.HashMap;

import com.teamtop.system.event.fightAttrEvent.IFightAttrEvent;
import com.teamtop.system.hero.FightAttr;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_sb_750;
import excel.config.Config_sbcl_750;
import excel.config.Config_sbsx_750;
import excel.config.Config_sbsz_750;
import excel.config.Config_sbzs_750;
import excel.struct.Struct_sb_750;
import excel.struct.Struct_sbcl_750;
import excel.struct.Struct_sbsx_750;
import excel.struct.Struct_sbsz_750;
import excel.struct.Struct_sbzs_750;

public class GodWeaponFightEvent implements IFightAttrEvent{

	@Override
	public long[][] calcHero(Hero hero, FightAttr allAttrs) {
		HashMap<Integer, Long> attrMap=new HashMap<Integer, Long>();
		
		try {
			if (hero.getGodWeapon().getWeaponIdByWuJiang()!=null) {
				HashMap<Integer, GodWeaponInfo> weaponIdByWuJiang = hero.getGodWeapon().getWeaponIdByWuJiang();
				for (GodWeaponInfo godWeaponInfo:weaponIdByWuJiang.values()) {
					HashMap<Integer, Long> attrMapStarAndlv=new HashMap<Integer, Long>();
					int type = godWeaponInfo.getType();
					int index=type*1000;
					
					Struct_sb_750 struct_sb_750 = Config_sb_750.getIns().get(index);
					//升星属性
					int pinzhi = struct_sb_750.getPinzhi();
					int starNum= godWeaponInfo.getStar();
					int starindex=pinzhi*1000+starNum;
					Struct_sbsx_750 struct_sbsx_750 = Config_sbsx_750.getIns().getMap().get(starindex);
					if (struct_sbsx_750!=null) {
						int [][] data=struct_sbsx_750.getAttr();
						if (data!=null) {
							CommonUtil.arrChargeMap(data, attrMap);
							CommonUtil.arrChargeMap(data, attrMapStarAndlv);
						}
					}
					//专属神兵套装属性
					int taozhuangindex=godWeaponInfo.getType()*1000+godWeaponInfo.getZhuanshuLevel();
					Struct_sbzs_750 struct_sbzs_750 = Config_sbzs_750.getIns().get(taozhuangindex);
					if (struct_sbzs_750!=null) {
						CommonUtil.arrChargeMap(struct_sbzs_750.getShuxing(), attrMap);
					}
					//淬炼等级
					int cuilianindex = pinzhi * 10000 + godWeaponInfo.getCuilianLevel();
					Struct_sbcl_750 struct_sbcl_750 = Config_sbcl_750.getIns().get(cuilianindex);
					if (struct_sbcl_750!=null) {
						CommonUtil.arrChargeMap(struct_sbcl_750.getAttr(), attrMap);
						CommonUtil.arrChargeMap(struct_sbcl_750.getAttr(), attrMapStarAndlv);
					}
					//神铸
					long[][] starAndlvAttr=CommonUtil.mapToArr(attrMapStarAndlv);
					for (int i = 1; i <=3; i++) {
						Integer lv = godWeaponInfo.getGodForges().get(i);
						if (lv>0) {
							Struct_sbsz_750 struct_sbsz_750 = Config_sbsz_750.getIns().get(i);
							if (struct_sbsz_750.getAttr2()>0) {
								//固定比例增加
								long[][] newAddAttr=CommonUtil.copyDyadicArray(starAndlvAttr);
								double jcx=struct_sbsz_750.getAttr2() * lv /100000.0000;
								for(long[] d : newAddAttr){
									double x1=d[1]*jcx;
									d[1] =(long) (x1);
								}
								//神铸百分比属性
								CommonUtil.arrChargeMap(newAddAttr, attrMap);
							}else {
								int[][] newAddAttr=CommonUtil.copyDyadicArray(struct_sbsz_750.getAttr1());
								for(int[] d : newAddAttr){
									d[1] = d[1] * lv;
								}
								//固定属性
								CommonUtil.arrChargeMap(newAddAttr, attrMap);
							}
						}
					}
				}
				
					
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
			hero.getGodWeapon().setStrength((int)finalAttr.getStrength());
			return totalAttr;
		} catch (Exception e) {
			LogTool.error(e, GodWeaponFightEvent.class, "GodWeaponFightEvent has wrong");
		}
		
		return null;
	}

}
