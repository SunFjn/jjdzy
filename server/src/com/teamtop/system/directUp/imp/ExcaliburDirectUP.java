package com.teamtop.system.directUp.imp;

import com.teamtop.system.bingfa.BingFaSender;
import com.teamtop.system.directUp.DirectUPAbs;
import com.teamtop.system.directUp.DirectUPConst;
import com.teamtop.system.excalibur.model.Excalibur;
import com.teamtop.system.hero.FightCalcConst;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.util.log.LogTool;

import excel.config.Config_swordlv_216;
import excel.config.Config_zsd_257;

public class ExcaliburDirectUP extends DirectUPAbs {

	public ExcaliburDirectUP(Integer type) {
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
			Excalibur excalibur = hero.getExcalibur();
			int up = Config_zsd_257.getIns().get(type).getUp();
			if (excalibur.getJieLv() < up) {// 直升10级
				if (!checkIsCanUp(DirectUPConst.UP_TEN_LEVEL, hero)) {
					return false;
				}
				excalibur.setJieLv(excalibur.getJieLv() + DirectUPConst.UP_TEN_LEVEL);
			} else {// 直升1级
				if (!checkIsCanUp(DirectUPConst.UP_ONE_LEVEL, hero)) {
					return false;
				}
				excalibur.setJieLv(excalibur.getJieLv() + DirectUPConst.UP_ONE_LEVEL);
			}
			BingFaSender.sendCmd_912(hero.getId(), 1, 0, excalibur.getJieLv(), excalibur.getJieexp());
			FightCalcFunction.setRecalcAll(hero, FightCalcConst.UPJIE_SHENGJIE, SystemIdConst.Excalibur_SYSID);
		} catch (Exception e) {
			// TODO: handle exception
			String methodName = Thread.currentThread().getStackTrace()[1].getMethodName();
			LogTool.error(e, this, hero.getId(), hero.getName(), methodName + "exp:" + hero.getExcalibur().getJieexp());
		}
		return true;
	}

	@Override
	protected void directUPHandler(Hero hero) {
		// TODO Auto-generated method stub
		Excalibur excalibur = hero.getExcalibur();
		BingFaSender.sendCmd_912(hero.getId(), 1, 0, excalibur.getJieLv(), excalibur.getJieexp());
		FightCalcFunction.setRecalcAll(hero, FightCalcConst.UPJIE_SHENGJIE, SystemIdConst.Excalibur_SYSID);
	}

	/**
	 * 检查是否可升阶
	 * 
	 * @param add
	 * @param hero
	 */
	public boolean checkIsCanUp(int add, Hero hero) {
		Excalibur excalibur = hero.getExcalibur();
		int jieLv = excalibur.getJieLv();
		if (add == 0) {
			if (jieLv >= Config_swordlv_216.getIns().size()) {
				excalibur.setJieexp(0);
				BingFaSender.sendCmd_912(hero.getId(), 1, 1, jieLv, excalibur.getJieexp());
				return false;
			}
		} else {
			if ((jieLv + add) > Config_swordlv_216.getIns().size()) {
				BingFaSender.sendCmd_912(hero.getId(), 1, 1, jieLv, excalibur.getJieexp());
				return false;
			}
		}
		return true;
	}

}
