package com.teamtop.system.house.maid;

import java.util.HashMap;

import com.teamtop.system.event.fightAttrEvent.IFightAttrEvent;
import com.teamtop.system.hero.FightAttr;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.house.maid.model.MaidModel;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_shinv_020;
import excel.config.Config_snsj_020;
import excel.config.Config_snsx_020;
import excel.struct.Struct_shinv_020;
import excel.struct.Struct_snsx_020;

public class MaidFightEvent implements IFightAttrEvent {

	@Override
	public long[][] calcHero(Hero hero, FightAttr allAttrs) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.MAID)) {
				return null;
			}
			HashMap<Integer, Long> attrMap = new HashMap<Integer, Long>();
			if (hero.getMaid().getMaidMap() != null) {
				for (MaidModel MaidModel : hero.getMaid().getMaidMap().values()) {
					// 激活
					int pingzhi = 0;
					if (Config_shinv_020.getIns().get(MaidModel.getIndex()) != null) {
						Struct_shinv_020 struct_shinv_020 = Config_shinv_020.getIns().get(MaidModel.getIndex());
						pingzhi = struct_shinv_020.getPinzhi();
					}
					// 升星
					int starindex = pingzhi * 1000 + MaidModel.getStar();
					Struct_snsx_020 struct_snsx_020 = Config_snsx_020.getIns().get(starindex);
					if (struct_snsx_020 != null) {
						int[][] data = struct_snsx_020.getAttr();
						CommonUtil.arrChargeMap(data, attrMap);
					}
					// 升级
					int sjindex = MaidModel.getLevel() + pingzhi * 10000;
					if (Config_snsj_020.getIns().get(sjindex) != null) {
						int[][] data = Config_snsj_020.getIns().get(sjindex).getSx();
						CommonUtil.arrChargeMap(data, attrMap);
					}
				}
			}

			long[][] totalAttr = CommonUtil.mapToArr(attrMap);
			if (totalAttr != null) {
				FightCalcFunction.setFightValue(totalAttr, allAttrs);
			}
			// 设置战力
			FinalFightAttr finalAttr = new FinalFightAttr();
			FightAttr fAttr = new FightAttr();
			FightCalcFunction.setFightValue(totalAttr, fAttr);
			FightCalcFunction.calcEquipAttr(finalAttr, fAttr, 0);
			hero.getMaid().setStrength(finalAttr.getStrength());// 记录侍女系统总战力
			return totalAttr;
		} catch (Exception e) {
			LogTool.error(e, MaidFightEvent.class, hero.getId(), hero.getName(), "calcHero has wrong");
		}
		return null;
	}
}
