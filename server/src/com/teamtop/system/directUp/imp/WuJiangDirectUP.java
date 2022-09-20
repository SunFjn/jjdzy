package com.teamtop.system.directUp.imp;

import com.teamtop.system.directUp.DirectUPAbs;
import com.teamtop.system.directUp.DirectUPConst;
import com.teamtop.system.hero.FightCalcConst;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.promotion.PromotionFunction;
import com.teamtop.system.promotion.PromotionTaskType;
import com.teamtop.system.task.TaskUserConst;
import com.teamtop.system.task.TaskUserFunction;
import com.teamtop.system.wujiang.WuJiang;
import com.teamtop.system.wujiang.WuJiangSender;
import com.teamtop.util.log.LogTool;

import excel.config.Config_herolv_211;
import excel.config.Config_zsd_257;

public class WuJiangDirectUP extends DirectUPAbs {

	public WuJiangDirectUP(Integer type) {
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
			WuJiang wujiang = hero.getWujiang();
			int up = Config_zsd_257.getIns().get(type).getUp();
			if (wujiang.getJieLv() < up) {// 直升10级
				if (!checkIsCanUp(DirectUPConst.UP_TEN_LEVEL, hero)) {
					return false;
				}
				wujiang.setJieLv(wujiang.getJieLv() + DirectUPConst.UP_TEN_LEVEL);
			} else {// 直升1级
				if (!checkIsCanUp(DirectUPConst.UP_ONE_LEVEL, hero)) {
					return false;
				}
				wujiang.setJieLv(wujiang.getJieLv() + DirectUPConst.UP_ONE_LEVEL);
			}
		} catch (Exception e) {
			// TODO: handle exception
			String methodName = Thread.currentThread().getStackTrace()[1].getMethodName();
			LogTool.error(e, this, hero.getId(), hero.getName(), methodName + "exp:" + hero.getWujiang().getExp());
		}
		return true;
	}

	@Override
	protected void directUPHandler(Hero hero) {
		// TODO Auto-generated method stub
		WuJiang wujiang = hero.getWujiang();
		WuJiangSender.sendCmd_654(hero.getId(), 1, wujiang.getJieLv(), wujiang.getExp());
		FightCalcFunction.setRecalcAll(hero, FightCalcConst.WUJIANG_UP_JIE, SystemIdConst.WUJIANG_SYSID);
		PromotionFunction.getIns().updatePromotionTask(hero.getId(), PromotionTaskType.GENERAL_LEVEL, null);
		// 任务
		TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_10, 0);
//		// 每日任务
//		DayTaskFunction.getIns().successDayTaskType(hero, DayTaskConst.DATTASK_TYPE5);
	}

	/**
	 * 检查是否可升阶
	 * 
	 * @param add
	 * @param hero
	 */
	public boolean checkIsCanUp(int add, Hero hero) {
		WuJiang wujiang = hero.getWujiang();
		int jieLv = wujiang.getJieLv();
		if (add == 0) {
			if (jieLv >= Config_herolv_211.getIns().size()) {
				wujiang.setExp(0);
				WuJiangSender.sendCmd_654(hero.getId(), 0, jieLv, wujiang.getExp());
				return false;
			}
		} else {
			if ((jieLv + add) > Config_herolv_211.getIns().size()) {
				WuJiangSender.sendCmd_654(hero.getId(), 0, jieLv, wujiang.getExp());
				return false;
			}
		}
		return true;
	}

}
