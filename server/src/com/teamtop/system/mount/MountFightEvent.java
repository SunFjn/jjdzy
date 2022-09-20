package com.teamtop.system.mount;

import java.util.HashMap;

import com.teamtop.system.event.fightAttrEvent.IFightAttrEvent;
import com.teamtop.system.hero.FightAttr;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.common.CommonUtil;

import excel.config.Config_horsepy_507;
import excel.config.Config_zqsj_773;
import excel.config.Config_zqsx_773;
import excel.struct.Struct_horsepy_507;
import excel.struct.Struct_zqsj_773;
import excel.struct.Struct_zqsx_773;

public class MountFightEvent implements IFightAttrEvent{

	@Override
	public long[][] calcHero(Hero hero, FightAttr allAttrs) {
		HashMap<Integer, Long> attrMap=new HashMap<Integer, Long>();
		Mount mount = hero.getMount();
		HashMap<Integer, MountModel> mountModels = mount.getMountModels();
		if (mountModels.size()>0) {
			for (MountModel mountModel : mountModels.values()) {
				//升星战力
				Struct_zqsx_773 struct_zqsx_773 = Config_zqsx_773.getIns().get(mountModel.getStarId());
				if (struct_zqsx_773 != null) {
					CommonUtil.arrChargeMap(struct_zqsx_773.getSx(), attrMap);
				}
				 
				//坐骑升级战力
				Struct_zqsj_773 struct_zqsj_773 = Config_zqsj_773.getIns().get(mountModel.getUpgradeLv());
				if(struct_zqsj_773 != null) {
					CommonUtil.arrChargeMap(struct_zqsj_773.getAttr(), attrMap);
				}
				
				//坐骑幻化战力
				Struct_horsepy_507 struct_horsepy_507 = Config_horsepy_507.getIns().get(mountModel.getUnrealId());
				if(struct_horsepy_507 != null) {
					CommonUtil.arrChargeMap(struct_horsepy_507.getAttr(), attrMap);
				}
			}
		}
		long[][] attr=CommonUtil.mapToArr(attrMap);
		if (attr!=null) {
			FightCalcFunction.setFightValue(attr,allAttrs);
		}
		return attr;
	}

}
