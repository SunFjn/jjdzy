package com.teamtop.system.destiny;

import java.util.HashMap;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.system.activity.ativitys.achievementTree.AchievementTreeEnum;
import com.teamtop.system.activity.ativitys.achievementTree.AchievementTreeFunction;
import com.teamtop.system.destiny.model.DestinyBagData;
import com.teamtop.system.destiny.model.PersonalDestiny;
import com.teamtop.system.event.fightAttrEvent.IFightAttrEvent;
import com.teamtop.system.hero.FightAttr;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.zhenYan.ZhenYanFunction;
import com.teamtop.util.common.CommonUtil;

import excel.config.Config_bzt_261;
import excel.config.Config_bztfwtz_261;
import excel.config.Config_bztzf_261;
import excel.config.Config_runestar_261;
import excel.struct.Struct_bztfwtz_261;
import excel.struct.Struct_bztzf_261;
import excel.struct.Struct_runestar_261;

public class DestinyFightEvent implements IFightAttrEvent{

	@Override
	public long[][] calcHero(Hero hero, FightAttr allAttrs) {
		HashMap<Integer, Long> attrMap=new HashMap<Integer, Long>();
		
		PersonalDestiny personalDestiny= hero.getPersonalDestiny();
		if (personalDestiny==null) {
			return null;
		}
		ConcurrentHashMap<Integer, DestinyBagData> concurrentHashMap = personalDestiny.getBodyData().get(0);
		if (concurrentHashMap==null) {
			return null;
		}
		int size = Config_bzt_261.getIns().size();
		for (int i = 1; i <=size; i++) {
			if (concurrentHashMap.containsKey(i)) {
				DestinyBagData destinyBagData = concurrentHashMap.get(i);
				int destinyId = destinyBagData.getDestinyId();
				if (destinyId!=0) {
					int starNum=destinyBagData.getStar();
					int level=destinyBagData.getLevel();
					Struct_bztzf_261 struct_bztzf_261 = Config_bztzf_261.getIns().get(destinyId);
					int runestarId = destinyId *100 +starNum;
					Struct_runestar_261 struct_runestar_261 = Config_runestar_261.getIns().get(runestarId);
					if (starNum > 0) {
						// 改为按照数值规定的表来让升星的属性变成可配可变化
						int[][] data = CommonUtil.copyDyadicArray(struct_runestar_261.getAttr());
						// 阵眼加成
						CommonUtil.arrChargeMap(data, attrMap,ZhenYanFunction.getIns().getStarValue(hero));
					}
		         	/*if (starNum>0) {
						int[][] data = CommonUtil.copyDyadicArray(struct_bztzf_261.getArrt());
						for(int[] d : data){
							d[1] = d[1]*starNum;
						}
						CommonUtil.arrChargeMap(data, attrMap);
					}*/
					if (level>0) {
						int[][] data = CommonUtil.copyDyadicArray(struct_bztzf_261.getArrt1());
						for(int[] d : data){
							d[1] = d[1]*level;
						}
						// 阵眼加成
						CommonUtil.arrChargeMap(data, attrMap,ZhenYanFunction.getIns().getLevelValue(hero));
					}
				}
			}
		}
		//符文大师增加属性战力
		int destinyMasterId = personalDestiny.getDestinyMasterId();
		if(destinyMasterId!=0) {
			Struct_bztfwtz_261 struct_bztfwtz_261 = Config_bztfwtz_261.getIns().get(destinyMasterId);
			int[][] attr = struct_bztfwtz_261.getAttr();
			CommonUtil.arrChargeMap(attr, attrMap);
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
		// 成就树
		AchievementTreeFunction.getIns().checkTask(hero, AchievementTreeEnum.TASK_33, (int) finalAttr.getStrength(), 0);
		return attr;
	}

}
