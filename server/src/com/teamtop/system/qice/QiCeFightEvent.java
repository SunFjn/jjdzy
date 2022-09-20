package com.teamtop.system.qice;

import java.util.HashMap;

import com.teamtop.system.event.fightAttrEvent.IFightAttrEvent;
import com.teamtop.system.hero.FightAttr;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.goodPolicyHasGift.GoodPolicyHasGiftFunction;
import com.teamtop.system.qice.model.QiCeModel;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_qc_760;
import excel.config.Config_qcsj_760;
import excel.config.Config_qcsx_760;
import excel.config.Config_qcts_760;
import excel.config.Config_qctz_760;
import excel.struct.Struct_qc_760;
import excel.struct.Struct_qcsx_760;
import excel.struct.Struct_qctz_760;

public class QiCeFightEvent implements IFightAttrEvent {

	@Override
	public long[][] calcHero(Hero hero, FightAttr allAttrs) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.QICE)) {
				return null;
			}
			HashMap<Integer, Long> attrMap = new HashMap<Integer, Long>();
			if (hero.getQiCe().getQiCeMap() != null) {
				for (QiCeModel QiCeModel : hero.getQiCe().getQiCeMap().values()) {
					HashMap<Integer, Long> attrMapStarAndlv = new HashMap<Integer, Long>();// 单独增加各自奇策的万分比
					// 激活
					int pingzhi = 0;
					if (Config_qc_760.getIns().get(QiCeModel.getIndex()) != null) {
						Struct_qc_760 struct_qc_760 = Config_qc_760.getIns().get(QiCeModel.getIndex());
						pingzhi = struct_qc_760.getPz();
					}
					// 升星
					int starindex = pingzhi * 1000 + QiCeModel.getStar();
					Struct_qcsx_760 struct_qcsx_760 = Config_qcsx_760.getIns().get(starindex);
					if (struct_qcsx_760 != null) {
						int[][] data = struct_qcsx_760.getAttr();
						CommonUtil.arrChargeMap(data, attrMap);
						CommonUtil.arrChargeMap(data, attrMapStarAndlv);
						}
					// 进阶
					int sjindex = QiCeModel.getJieLv() + pingzhi * 10000;
					if (Config_qcsj_760.getIns().get(sjindex) != null) {
						int[][] data = Config_qcsj_760.getIns().get(sjindex).getSx();
						CommonUtil.arrChargeMap(data, attrMap);
						CommonUtil.arrChargeMap(data, attrMapStarAndlv);
						}
					// 属性丹
					int num1 = QiCeModel.getDanyao().get(QiCeConst.DAN0);// 百万将魂加的战力
					int num2 = QiCeModel.getDanyao().get(QiCeConst.DAN1);// 千古兵魂加的战力
					if (num1 > 0) {
						int[][] data1 = CommonUtil
								.copyDyadicArray(Config_qcts_760.getIns().get(QiCeConst.DAN0).getAttr1());
						for (int[] d : data1) {
							d[1] = d[1] * num1;
						}
						CommonUtil.arrChargeMap(data1, attrMap);
							}
					if (num2 > 0) {
						long[][] starAndlvAttr = CommonUtil.mapToArr(attrMapStarAndlv);
						int jc = Config_qcts_760.getIns().get(QiCeConst.DAN1).getAttr2();
						double jcx = jc * num2 / 100000.0000;
						if (jc > 0) {
							// 套装加强 升星升阶属性十万分比
							long[][] newAddAttr = CommonUtil.copyDyadicArray(starAndlvAttr);
							for (long[] d : newAddAttr) {
								double x1 = d[1] * jcx;
								d[1] = (long) (x1);
							}
							// 十万分比属性
							CommonUtil.arrChargeMap(newAddAttr, attrMap);
						}
							}
						}
					}

			// 奇策套装表
			int tzLevel = hero.getQiCe().getTaozhuangLv();
			if (Config_qctz_760.getIns().get(tzLevel) != null) {
				Struct_qctz_760 struct_qctz_760 = Config_qctz_760.getIns().get(tzLevel);
				// 套装基础属性
				CommonUtil.arrChargeMap(struct_qctz_760.getSx(), attrMap);
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
			hero.getQiCe().setStrength(finalAttr.getStrength());// 记录奇策系统总战力
			// 运筹帷幄_奇策有礼 奇策战力
			GoodPolicyHasGiftFunction.getIns().taskHandler(hero, 3);
			return totalAttr;
		} catch (Exception e) {
			LogTool.error(e, QiCeManager.class, hero.getId(), hero.getName(), "calcHero has wrong");
			}
		return null;
		}
	}
