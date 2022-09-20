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
import com.teamtop.system.zhanjia.ZhanJia;
import com.teamtop.system.zhanjia.ZhanJiaSender;
import com.teamtop.util.log.LogTool;

import excel.config.Config_clotheslv_212;
import excel.config.Config_zsd_257;

public class ZhanJiaDirectUP extends DirectUPAbs {

	public ZhanJiaDirectUP(Integer type) {
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
			ZhanJia zhanJia = hero.getZhanJia();
			int up = Config_zsd_257.getIns().get(type).getUp();
			if (zhanJia.getJieLv() < up) {// 直升10级
				if (!checkIsCanUp(DirectUPConst.UP_TEN_LEVEL, hero)) {
					return false;
				}
				zhanJia.setJieLv(zhanJia.getJieLv() + DirectUPConst.UP_TEN_LEVEL);
			} else {// 直升1级
				if (!checkIsCanUp(DirectUPConst.UP_ONE_LEVEL, hero)) {
					return false;
				}
				zhanJia.setJieLv(zhanJia.getJieLv() + DirectUPConst.UP_ONE_LEVEL);
			}
		} catch (Exception e) {
			// TODO: handle exception
			String methodName = Thread.currentThread().getStackTrace()[1].getMethodName();
			LogTool.error(e, this, hero.getId(), hero.getName(), methodName + "exp:" + hero.getZhanJia().getExp());
		}
		return true;
	}

	@Override
	protected void directUPHandler(Hero hero) {
		// TODO Auto-generated method stub
		ZhanJia zhanJia = hero.getZhanJia();
		ZhanJiaSender.sendCmd_804(hero.getId(), 0, zhanJia.getJieLv(), zhanJia.getExp());
		FightCalcFunction.setRecalcAll(hero, FightCalcConst.ZHANJIA_UP_JIE, SystemIdConst.zhanjia_SYSID);
		PromotionFunction.getIns().updatePromotionTask(hero.getId(), PromotionTaskType.ZHANJIA_LEVEL, null);
		// 任务
		TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_11, 0);
//		// 每日任务
//		DayTaskFunction.getIns().successDayTaskType(hero, DayTaskConst.DATTASK_TYPE6);
	}

	/**
	 * 检查是否可升阶
	 * 
	 * @param add
	 * @param hero
	 */
	public boolean checkIsCanUp(int add, Hero hero) {
		ZhanJia zhanJia = hero.getZhanJia();
		int jieLv = zhanJia.getJieLv();
		if (add == 0) {
			if (jieLv >= Config_clotheslv_212.getIns().size()) {
				zhanJia.setExp(0);
				ZhanJiaSender.sendCmd_804(hero.getId(), 1, jieLv, zhanJia.getExp());
				return false;
			}
		} else {
			if ((jieLv + add) > Config_clotheslv_212.getIns().size()) {
				ZhanJiaSender.sendCmd_804(hero.getId(), 1, jieLv, zhanJia.getExp());
				return false;
			}
		}
		return true;
	}

}
