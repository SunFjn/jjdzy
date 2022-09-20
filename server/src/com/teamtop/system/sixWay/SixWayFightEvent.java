package com.teamtop.system.sixWay;

import java.util.HashMap;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.system.event.fightAttrEvent.IFightAttrEvent;
import com.teamtop.system.hero.FightAttr;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.util.common.CommonUtil;

import excel.config.Config_sixdaostar_505;
import excel.config.Config_sixdaotz_505;
import excel.config.Config_sixdaoyj_505;
import excel.struct.Struct_sixdaostar_505;
import excel.struct.Struct_sixdaotz_505;
import excel.struct.Struct_sixdaoyj_505;



public class SixWayFightEvent implements IFightAttrEvent{

	@Override
	public long[][] calcHero(Hero hero, FightAttr allAttrs) {
		//角色等级小于开启等级
		if(!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SIXWAY)){
			return null;
		}
		HashMap<Integer, Long> attrMap=new HashMap<Integer, Long>();
        SixWayFunction.getIns().updateZuHe(hero);
		SixWay sixWay = hero.getSixWay();
		if (sixWay==null) {
			return null;
		}
		ConcurrentHashMap<Integer, SixWayEquip> bodyData = sixWay.getBodyData();
		if (bodyData==null) {
			return null;
		}
		for (int part: bodyData.keySet()) {
			SixWayEquip sixWayEquip = bodyData.get(part);
			int sixEquipId = sixWayEquip.getSixEquipId();
			if (sixEquipId>0) {
				Struct_sixdaoyj_505 struct_sixdaoyj_505 = Config_sixdaoyj_505.getIns().get(sixWayEquip.getSixEquipId());
				//升级属性=印记升级属性*等级
				int[][] data = CommonUtil.copyDyadicArray(struct_sixdaoyj_505.getArrt1());
				CommonUtil.arrChargeMap(data, attrMap,sixWayEquip.getLevel());
				//印记id*100+星级
				int starIndex=sixEquipId*100+sixWayEquip.getStar();
				Struct_sixdaostar_505 struct_sixdaostar_505 = Config_sixdaostar_505.getIns().get(starIndex);
				if (struct_sixdaostar_505!=null) {
					int[][] attr = struct_sixdaostar_505.getAttr();
					CommonUtil.arrChargeMap(attr, attrMap);
				}
				
			}
			
		}
		//印记组合战力
		HashMap<Integer, Integer> zuhenum = sixWay.getZuhenum();
		for (int value:zuhenum.values()) {
			if (value>0&&Config_sixdaotz_505.getIns().getMap().containsKey(value)) {
				Struct_sixdaotz_505 struct_sixdaotz_505 = Config_sixdaotz_505.getIns().get(value);
				int[][] attr = struct_sixdaotz_505.getAttr();
				CommonUtil.arrChargeMap(attr, attrMap);
			}
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
		sixWay.setStr((int)finalAttr.getStrength());
		SixWayFunction.getIns().sendSixWayZuHe(sixWay);
		
		return attr;
	}


}
