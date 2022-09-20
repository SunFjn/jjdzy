package com.teamtop.system.shaozhuqiyuan;

import com.teamtop.system.bag.BagFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.saintMonsterGoal.SaintMonsterGoalFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

public class ShaoZhuQiYuanFunction {
	private static ShaoZhuQiYuanFunction ins = null;

	public static ShaoZhuQiYuanFunction getIns() {
		if (ins == null) {
			ins = new ShaoZhuQiYuanFunction();
		}
		return ins;
	}

	private ShaoZhuQiYuanFunction() {
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
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SHAO_ZHU_QI_YUAN)) {
				return;
			}
			boolean redPoint = checkRedPoint(hero);
			if (redPoint) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.SHAO_ZHU_QI_YUAN, RedPointConst.RED_1,
						RedPointConst.HAS_RED);
			} else {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.SHAO_ZHU_QI_YUAN, RedPointConst.RED_1,
						RedPointConst.NO_RED);
			}
		} catch (Exception e) {
			LogTool.error(e, SaintMonsterGoalFunction.class, hero.getId(), hero.getName(),
					"SaintMonsterGoalFunction checkRedPoint");
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
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SHAO_ZHU_QI_YUAN)) {
				return false;
			}
			int qyfNum = BagFunction.getIns().getGoodsNumBySysId(hero.getId(), ShaoZhuQiYuanConst.QIYUANFU_ID);
			if (qyfNum > 0) {
				return true;
			}

			// 积分宝箱可领
			ShaoZhuQiYuan shaoZhuQiYuan = hero.getShaozhuqiyuan();
			for (int canGetCount : shaoZhuQiYuan.getScoreAwardStateMap().values()) {
				if (canGetCount > 0) {
					return true;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, SaintMonsterGoalFunction.class, hero.getId(), hero.getName(),
					"SaintMonsterGoalFunction checkRedPoint");
		}
		return false;
	}

}
