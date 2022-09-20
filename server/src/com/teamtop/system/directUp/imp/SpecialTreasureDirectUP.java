package com.teamtop.system.directUp.imp;

import com.teamtop.system.bingfa.BingFaSender;
import com.teamtop.system.directUp.DirectUPAbs;
import com.teamtop.system.directUp.DirectUPConst;
import com.teamtop.system.hero.FightCalcConst;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.specialTreasure.SpecialTreasure;
import com.teamtop.util.log.LogTool;

import excel.config.Config_yblv_217;
import excel.config.Config_zsd_257;

public class SpecialTreasureDirectUP extends DirectUPAbs {

	public SpecialTreasureDirectUP(Integer type) {
		// TODO Auto-generated constructor stub
		super.type = type;
	}

	@Override
	protected boolean directUPHandlerBefore(Hero hero) {
		// TODO Auto-generated method stub
		try {
			if (!checkIsCanUp(0, hero)) {
				return false;
			}
			SpecialTreasure specialTreasure = hero.getSpecialTreasure();
			int up = Config_zsd_257.getIns().get(type).getUp();
			if (specialTreasure.getJieLv() < up) {// 直升10级
				if (!checkIsCanUp(DirectUPConst.UP_TEN_LEVEL, hero)) {
					return false;
				}
				specialTreasure.setJieLv(specialTreasure.getJieLv() + DirectUPConst.UP_TEN_LEVEL);
			} else {// 直升1级
				if (!checkIsCanUp(DirectUPConst.UP_ONE_LEVEL, hero)) {
					return false;
				}
				specialTreasure.setJieLv(specialTreasure.getJieLv() + DirectUPConst.UP_ONE_LEVEL);
			}
		} catch (Exception e) {
			// TODO: handle exception
			String methodName = Thread.currentThread().getStackTrace()[1].getMethodName();
			LogTool.error(e, this, hero.getId(), hero.getName(),
					methodName + "exp:" + hero.getSpecialTreasure().getJieexp());
		}
		return true;
	}

	@Override
	protected void directUPHandler(Hero hero) {
		// TODO Auto-generated method stub
		SpecialTreasure specialTreasure = hero.getSpecialTreasure();
		BingFaSender.sendCmd_912(hero.getId(), 2, 0, specialTreasure.getJieLv(), specialTreasure.getJieexp());
		FightCalcFunction.setRecalcAll(hero, FightCalcConst.UPJIE_SPETREASURE, SystemIdConst.SpeTreasure_SYSID);
	}

	/**
	 * 检查是否可升阶
	 * 
	 * @param add
	 * @param hero
	 */
	public boolean checkIsCanUp(int add, Hero hero) {
		SpecialTreasure specialTreasure = hero.getSpecialTreasure();
		int jieLv = specialTreasure.getJieLv();
		if (add == 0) {
			if (jieLv >= Config_yblv_217.getIns().size()) {
				specialTreasure.setJieexp(0);
				BingFaSender.sendCmd_912(hero.getId(), 2, 1, jieLv, specialTreasure.getJieexp());
				return false;
			}
		} else {
			if ((jieLv + add) > Config_yblv_217.getIns().size()) {
				BingFaSender.sendCmd_912(hero.getId(), 2, 1, jieLv, specialTreasure.getJieexp());
				return false;
			}
		}
		return true;
	}

}
