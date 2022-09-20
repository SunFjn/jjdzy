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
import com.teamtop.system.treasure.TreasureSender;
import com.teamtop.system.treasure.model.TreasureData;
import com.teamtop.util.log.LogTool;

import excel.config.Config_baolv_214;
import excel.config.Config_zsd_257;

public class TreasureDirectUP extends DirectUPAbs {

	public TreasureDirectUP(Integer type) {
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
			TreasureData treasureData = hero.getTreasureData();
			int up = Config_zsd_257.getIns().get(type).getUp();
			if (treasureData.getLevel() < up) {// 直升10级
				if (!checkIsCanUp(DirectUPConst.UP_TEN_LEVEL, hero)) {
					return false;
				}
				treasureData.setLevel(treasureData.getLevel() + DirectUPConst.UP_TEN_LEVEL);
			} else {// 直升1级
				if (!checkIsCanUp(DirectUPConst.UP_ONE_LEVEL, hero)) {
					return false;
				}
				treasureData.setLevel(treasureData.getLevel() + DirectUPConst.UP_ONE_LEVEL);
			}
		} catch (Exception e) {
			// TODO: handle exception
			String methodName = Thread.currentThread().getStackTrace()[1].getMethodName();
			LogTool.error(e, this, hero.getId(), hero.getName(), methodName + "exp:" + hero.getTreasureData().getExp());
		}
		return true;
	}

	@Override
	protected void directUPHandler(Hero hero) {
		// TODO Auto-generated method stub
		TreasureData treasureData = hero.getTreasureData();
		TreasureSender.sendCmd_946(hero.getId(), 1, treasureData.getLevel(), treasureData.getExp());
		// 重新计算战力
		FightCalcFunction.setRecalcAll(hero, FightCalcConst.TREASURE_UPGRADE, SystemIdConst.Treasure_SYSID);
		PromotionFunction.getIns().updatePromotionTask(hero.getId(), PromotionTaskType.TREASURE_LEVEL, null);
		// 任务
		TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_12, 0);
	}

	/**
	 * 检查是否可升阶
	 * 
	 * @param add
	 * @param hero
	 */
	public boolean checkIsCanUp(int add, Hero hero) {
		TreasureData treasureData = hero.getTreasureData();
		int level = treasureData.getLevel();
		if (add == 0) {
			if (level >= Config_baolv_214.getIns().size()) {
				treasureData.setExp(0);
				TreasureSender.sendCmd_946(hero.getId(), 0, level, treasureData.getExp());
				return false;
			}
		} else {
			if ((level + add) > Config_baolv_214.getIns().size()) {
				TreasureSender.sendCmd_946(hero.getId(), 0, level, treasureData.getExp());
				return false;
			}
		}
		return true;
	}

}
