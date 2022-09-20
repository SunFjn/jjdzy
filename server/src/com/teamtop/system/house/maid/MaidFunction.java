package com.teamtop.system.house.maid;

import java.util.HashMap;
import java.util.Iterator;

import com.teamtop.system.bag.BagFunction;
import com.teamtop.system.hero.FightAttr;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.house.maid.model.Maid;
import com.teamtop.system.house.maid.model.MaidModel;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_fdsj_019;
import excel.config.Config_shinv_020;
import excel.config.Config_snsj_020;
import excel.config.Config_snsx_020;
import excel.struct.Struct_snsj_020;
import excel.struct.Struct_snsx_020;

public class MaidFunction {
	
	private static MaidFunction ins;

	public static MaidFunction getIns() {
		if(ins == null) {
			ins = new MaidFunction();
		}
		return ins;
	}
		
	/**
	 * 展示某个侍女的战力
	 * 
	 * @param hero
	 * @param index
	 *            侍女id
	 * @return
	 */
	public int getMaidMaptrByid(Hero hero, int index) {
		int score=0;
		FinalFightAttr finalAttr = new FinalFightAttr();
		FightAttr attr = new FightAttr();
		MaidModel MaidModel = hero.getMaid().getMaidMap().get(index);
		HashMap<Integer, Long> attrMap=new HashMap<Integer, Long>();
		//激活
		int pingzhi=0;
		if (Config_shinv_020.getIns().get(MaidModel.getIndex()) != null) {
			pingzhi = Config_shinv_020.getIns().get(MaidModel.getIndex()).getPinzhi();
		}
		//升星
		int starindex = pingzhi * 1000 + MaidModel.getStar();
		Struct_snsx_020 struct_snsx_020 = Config_snsx_020.getIns().get(starindex);
		if (struct_snsx_020 != null) {
			int[][] data = struct_snsx_020.getAttr();
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
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.MAID)) {
				return false;
			}
			Maid maid = hero.getMaid();
			if (maid == null) {
				return false;
			}
			Iterator<MaidModel> iterator = maid.getMaidMap().values().iterator();
			while (iterator.hasNext()) {
				MaidModel model = iterator.next();
				int curExp = model.getCurExp();
				int canUseNum = BagFunction.getIns().getGoodsNumBySysId(hero.getId(), MaidConst.PROP_ID);
				int Level = model.getLevel();
				int index = model.getIndex();
				int houseLv = hero.getLocalHouse().getHouseLv();
				int shinv = Config_fdsj_019.getIns().get(houseLv).getShinv();
				if (Level >= shinv) {
					return false;
				}
				int Pinzhi = Config_shinv_020.getIns().get(index).getPinzhi();
				int excelIndex = Pinzhi * 10000 + Level;
				Struct_snsj_020 struct_snsj_020 = Config_snsj_020.getIns().get(excelIndex);
				int needExp = struct_snsj_020.getXh()[0][2] * 10;
				int needNum = (needExp - curExp) / 10;
				if (canUseNum >= needNum) {
					return true;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, MaidFunction.class, hero.getId(), hero.getName(), "MaidFunction checkRedPoint");
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
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.MAID)) {
				return;
			}
			boolean redPoint = checkRedPoint(hero);
			if (redPoint) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.MAID, RedPointConst.RED_1,
						RedPointConst.HAS_RED);
			} else {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.MAID, RedPointConst.RED_1,
						RedPointConst.NO_RED);
			}
		} catch (Exception e) {
			LogTool.error(e, MaidFunction.class, hero.getId(), hero.getName(), "MaidFunction updateRedPoint");
		}
	}
}
