package com.teamtop.system.qice;

import java.util.HashMap;

import com.teamtop.system.hero.FightAttr;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.qice.model.QiCe;
import com.teamtop.system.qice.model.QiCeModel;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_qc_760;
import excel.config.Config_qcsx_760;
import excel.struct.Struct_qcsx_760;

public class QiCeFunction {
	
	private static QiCeFunction ins;
	public static QiCeFunction getIns(){
		if(ins == null) {
			ins = new QiCeFunction();
		}
		return ins;
	}
		
	/**
	 * 展示某个奇策的战力
	 * 
	 * @param hero
	 * @param index
	 *            奇策id
	 * @return
	 */
	public int getQiCeMaptrByid(Hero hero, int index) {
		int score=0;
		FinalFightAttr finalAttr = new FinalFightAttr();
		FightAttr attr = new FightAttr();
		QiCeModel qiCeModel = hero.getQiCe().getQiCeMap().get(index);
		HashMap<Integer, Long> attrMap=new HashMap<Integer, Long>();
		//激活
		int pingzhi=0;
		if (Config_qc_760.getIns().get(qiCeModel.getIndex()) != null) {
			pingzhi = Config_qc_760.getIns().get(qiCeModel.getIndex()).getPz();
		}
		//升星
		int starindex = pingzhi * 1000 + qiCeModel.getStar();
		Struct_qcsx_760 struct_qcsx_760 = Config_qcsx_760.getIns().get(starindex);
		if (struct_qcsx_760 != null) {
			int[][] data = struct_qcsx_760.getAttr();
			CommonUtil.arrChargeMap(data, attrMap);
		}
		long[][] data=CommonUtil.mapToArr(attrMap);
		FightCalcFunction.setFightValue(data, attr);
		FightCalcFunction.calcEquipAttr(finalAttr, attr,0);
		score = (int)finalAttr.getStrength();
		return score;
	}
	
	/**
	 * 检测红点
	 * 
	 * @param hero
	 * @return
	 */
	public boolean checkRedPoint(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.QICE)) {
				return false;
			}
			QiCe qiCe = hero.getQiCe();
			if (qiCe == null) {
				return false;
			}
			int taozhuangLv = qiCe.getTaozhuangLv();
			boolean manZuTiaoJian = QiCeManager.getIns().isManZuTiaoJian(hero, taozhuangLv);
			if (manZuTiaoJian) {
				return true;
			}
		} catch (Exception e) {
			LogTool.error(e, QiCeFunction.class, hero.getId(), hero.getName(), "QiCeFunction checkRedPoint");
		}
		return false;
	}

	/**
	 * 更新红点
	 * 
	 * @param hero
	 */
	public void updateRedPoint(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.QICE)) {
				return;
			}
			boolean redPoint = checkRedPoint(hero);
			if (redPoint) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.QICE, RedPointConst.RED_1,
						RedPointConst.HAS_RED);
			} else {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.QICE, RedPointConst.RED_1,
						RedPointConst.NO_RED);
			}
		} catch (Exception e) {
			LogTool.error(e, QiCeFunction.class, hero.getId(), hero.getName(),
					"QiCeFunction updateRedPoint");
		}
	}
}
