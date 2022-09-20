package com.teamtop.system.openDaysSystem.saintMonsterWash;

import java.util.List;
import java.util.Set;

import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.model.HeroOpenDaysSysData;
import com.teamtop.system.openDaysSystem.saintMonsterWash.model.SaintMonsterWash;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_ssshxl_268;
import excel.struct.Struct_ssshxl_268;

public class SaintMonsterWashFunction {

	private static SaintMonsterWashFunction ins;

	private SaintMonsterWashFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized SaintMonsterWashFunction getIns() {
		if (ins == null) {
			ins = new SaintMonsterWashFunction();
		}
		return ins;
	}

	/**
	 * 添加洗练次数
	 */
	public void addWashTimes(Hero hero, int addNum) {
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.SAINT_MONSTER_WASH)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.SAINT_MONSTER_WASH);
			HeroOpenDaysSysData heroOpenDaysSysData = hero.getHeroOpenDaysSysData();
			SaintMonsterWash saintMonsterWash = (SaintMonsterWash) heroOpenDaysSysData.getOpSysDataMap().get(uid);
			int washTimes = saintMonsterWash.getWashTimes();
			saintMonsterWash.setWashTimes(washTimes + addNum);
			updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, SaintMonsterWashFunction.class, hero.getId(), hero.getName(),
					"SaintMonsterWashFunction addWashTimes, addNum=" + addNum);
		}
	}
	
	/**
	 * 检测红点
	 * @param hero
	 * @return
	 */
	public boolean checkRedPoint(Hero hero) {
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.SAINT_MONSTER_WASH)) {
				return false;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.SAINT_MONSTER_WASH);
			HeroOpenDaysSysData heroOpenDaysSysData = hero.getHeroOpenDaysSysData();
			SaintMonsterWash saintMonsterWash = (SaintMonsterWash) heroOpenDaysSysData.getOpSysDataMap().get(uid);
			Set<Integer> rewardSet = saintMonsterWash.getRewardSet();
			int washTimes = saintMonsterWash.getWashTimes();
			List<Struct_ssshxl_268> sortList = Config_ssshxl_268.getIns().getSortList();
			int size = sortList.size();
			Struct_ssshxl_268 ssshxl_268 = null;
			for (int i = 0; i < size; i++) {
				ssshxl_268 = sortList.get(i);
				if (washTimes > ssshxl_268.getTime()) {
					if (!rewardSet.contains(ssshxl_268.getId())) {
						return true;
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, SaintMonsterWashFunction.class, hero.getId(), hero.getName(),
					"SaintMonsterWashFunction checkRedPoint");
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
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.SAINT_MONSTER_WASH)) {
				return;
			}
			boolean redPoint = checkRedPoint(hero);
			if (redPoint) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.SAINT_MONSTER_WASH,
						RedPointConst.RED_1, RedPointConst.HAS_RED);
			} else {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.SAINT_MONSTER_WASH,
						RedPointConst.RED_1, RedPointConst.NO_RED);
			}
		} catch (Exception e) {
			LogTool.error(e, SaintMonsterWashFunction.class, hero.getId(), hero.getName(),
					"SaintMonsterWashFunction updateRedPoint");
		}
	}

}
