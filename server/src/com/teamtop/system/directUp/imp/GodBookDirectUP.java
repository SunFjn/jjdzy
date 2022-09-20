package com.teamtop.system.directUp.imp;

import com.teamtop.system.directUp.DirectUPAbs;
import com.teamtop.system.directUp.DirectUPConst;
import com.teamtop.system.godbook.GodBook;
import com.teamtop.system.godbook.GodBookSender;
import com.teamtop.system.hero.FightCalcConst;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.task.TaskUserConst;
import com.teamtop.system.task.TaskUserFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_booklv_215;
import excel.config.Config_zsd_257;

public class GodBookDirectUP extends DirectUPAbs {

	public GodBookDirectUP(Integer type) {
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
			GodBook godbook = hero.getGodbook();
			int up = Config_zsd_257.getIns().get(type).getUp();
			if (godbook.getLevel() < up) {// 直升10级
				if (!checkIsCanUp(DirectUPConst.UP_TEN_LEVEL, hero)) {
					return false;
				}
				godbook.setLevel(godbook.getLevel() + DirectUPConst.UP_TEN_LEVEL);
			} else {// 直升1级
				if (!checkIsCanUp(DirectUPConst.UP_ONE_LEVEL, hero)) {
					return false;
				}
				godbook.setLevel(godbook.getLevel() + DirectUPConst.UP_ONE_LEVEL);
			}
		} catch (Exception e) {
			// TODO: handle exception
			String methodName = Thread.currentThread().getStackTrace()[1].getMethodName();
			LogTool.error(e, this, hero.getId(), hero.getName(), methodName + "exp:" + hero.getGodbook().getExp());
		}
		return true;

	}

	@Override
	protected void directUPHandler(Hero hero) {
		// TODO Auto-generated method stub
		GodBook godbook = hero.getGodbook();
		GodBookSender.sendCmd_976(hero.getId(), 0, godbook.getExp(), godbook.getLevel());
		FightCalcFunction.setRecalcAll(hero, FightCalcConst.STAR_BOOK, SystemIdConst.GodBook_SYSID);
		// 任务
		TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_13, 0);
	}

	/**
	 * 检查是否可升阶
	 * 
	 * @param add
	 * @param hero
	 */
	public boolean checkIsCanUp(int add, Hero hero) {
		GodBook godbook = hero.getGodbook();
		int level = godbook.getLevel();
		if (add == 0) {
			if (level >= Config_booklv_215.getIns().size()) {
				godbook.setExp(0);
				GodBookSender.sendCmd_976(hero.getId(), 1, godbook.getExp(), level);
				return false;
			}
		} else {
			if ((level + add) > Config_booklv_215.getIns().size()) {
				GodBookSender.sendCmd_976(hero.getId(), 1, godbook.getExp(), level);
				return false;
			}
		}
		return true;
	}

}
