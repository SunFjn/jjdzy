package com.teamtop.system.directUp.imp;

import com.teamtop.system.bingfa.BingFa;
import com.teamtop.system.bingfa.BingFaSender;
import com.teamtop.system.directUp.DirectUPAbs;
import com.teamtop.system.directUp.DirectUPConst;
import com.teamtop.system.hero.FightCalcConst;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.util.log.LogTool;

import excel.config.Config_booklv_213;
import excel.config.Config_zsd_257;

public class BingFaDirectUP extends DirectUPAbs {

	public BingFaDirectUP(Integer type) {
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
			BingFa bingfa = hero.getBingfa();
			int up = Config_zsd_257.getIns().get(type).getUp();
			if (bingfa.getJieLv() < up) {// 直升10级
				if (!checkIsCanUp(DirectUPConst.UP_TEN_LEVEL, hero)) {
					return false;
				}
				bingfa.setJieLv(bingfa.getJieLv() + DirectUPConst.UP_TEN_LEVEL);
			} else {// 直升1级
				if (!checkIsCanUp(DirectUPConst.UP_ONE_LEVEL, hero)) {
					return false;
				}
				bingfa.setJieLv(bingfa.getJieLv() + DirectUPConst.UP_ONE_LEVEL);
			}
		} catch (Exception e) {
			// TODO: handle exception
			String methodName = Thread.currentThread().getStackTrace()[1].getMethodName();
			LogTool.error(e, this, hero.getId(), hero.getName(), methodName + "exp:" + hero.getBingfa().getJieexp());
		}
		return true;
	}

	@Override
	protected void directUPHandler(Hero hero) {
		// TODO Auto-generated method stub
		BingFa bingfa = hero.getBingfa();
		BingFaSender.sendCmd_912(hero.getId(), 3, 0, bingfa.getJieLv(), bingfa.getJieexp());
		FightCalcFunction.setRecalcAll(hero, FightCalcConst.UPJIE_BINGFA, SystemIdConst.BingFa_SYSID);
	}

	/**
	 * 检查是否可升阶
	 * 
	 * @param add
	 * @param hero
	 */
	public boolean checkIsCanUp(int add, Hero hero) {
		BingFa bingfa = hero.getBingfa();
		int jieLv = bingfa.getJieLv();
		if (add == 0) {
			if (jieLv >= Config_booklv_213.getIns().size()) {
				bingfa.setJieexp(0);
				BingFaSender.sendCmd_912(hero.getId(), 3, 1, jieLv, bingfa.getJieexp());
				return false;
			}
		} else {
			if ((jieLv + add) > Config_booklv_213.getIns().size()) {
				BingFaSender.sendCmd_912(hero.getId(), 3, 1, jieLv, bingfa.getJieexp());
				return false;
			}
		}
		return true;
	}

}
