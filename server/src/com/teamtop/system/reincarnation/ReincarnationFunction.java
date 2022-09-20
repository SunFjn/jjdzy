package com.teamtop.system.reincarnation;

import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.saintMonsterGoal.SaintMonsterGoalFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_lunhui_274;
import excel.struct.Struct_lunhui_274;

public class ReincarnationFunction {
	private static ReincarnationFunction ins = null;

	public static ReincarnationFunction getIns() {
		if (ins == null) {
			ins = new ReincarnationFunction();
		}
		return ins;
	}

	private ReincarnationFunction() {

	}

	/**
	 * 更新红点
	 * 
	 * @param hero
	 */
	public void updateRedPoint(Hero hero) {
		try {
			if (hero == null) {
				return;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.REINCARNATION)) {
				return;
			}
			boolean redPoint = checkRedPoint(hero);
			if (redPoint) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.REINCARNATION, RedPointConst.RED_1,
						RedPointConst.HAS_RED);
			} else {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.REINCARNATION, RedPointConst.RED_1,
						RedPointConst.NO_RED);
			}
		} catch (Exception e) {
			LogTool.error(e, SaintMonsterGoalFunction.class, hero.getId(), hero.getName(),
					"ReincarnationFunction checkRedPoint");
		}
	}

	/**
	 * 检测红点
	 * 
	 * @param hero
	 * @return
	 */
	public boolean checkRedPoint(Hero hero) {
		try {
			if (hero == null) {
				return false;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.REINCARNATION)) {
				return false;
			}
			int reincarnationLevel = hero.getReincarnationLevel();

			Struct_lunhui_274 config = Config_lunhui_274.getIns().get(reincarnationLevel);
			if (config == null) {
				// 配置不存在
				return false;
			}
			if (config.getNext() == 0) {
				// 已经满轮回等级
				return false;
			}

			int level = hero.getLevel();
			
			if (level >= config.getLv() && UseAddUtil.canUse(hero, config.getConmuse())) {
				// 可以轮回
				return true;
			}
		} catch (Exception e) {
			LogTool.error(e, SaintMonsterGoalFunction.class, hero.getId(), hero.getName(),
					"ReincarnationFunction checkRedPoint");
		}
		return false;
	}

	/**
	 * 返回轮回等级升级所需经验加成
	 * 
	 * @param hero
	 * @param levelExp
	 * @return
	 */
	public long expXiShu(Hero hero, long levelExp) {
		if (hero == null) {
			return levelExp;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.REINCARNATION)) {
			return levelExp;
		}

		Struct_lunhui_274 config = Config_lunhui_274.getIns().get(hero.getReincarnationLevel());
		if (config == null) {
			// 配置不存在
			return levelExp;
		}
		if (config.getExp() == 0) {
			return levelExp;
		}
		levelExp = (long) Math.ceil((double) levelExp * (100 + (double) config.getExp()) / 100);
		return levelExp;
	}

}
