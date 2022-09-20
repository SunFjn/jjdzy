package com.teamtop.system.zhenYan;

import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.saintMonsterGoal.SaintMonsterGoalFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_zx_766;
import excel.config.Config_zy_766;
import excel.config.Config_zysj_766;
import excel.struct.Struct_zx_766;
import excel.struct.Struct_zy_766;
import excel.struct.Struct_zysj_766;

public class ZhenYanFunction {
	private static ZhenYanFunction ins;

	public static ZhenYanFunction getIns() {
		if (ins == null) {
			ins = new ZhenYanFunction();
		}
		return ins;
	}

	/**
	 * 获取阵眼星级加成
	 * 
	 * @param hero
	 * @return
	 */
	public float getStarValue(Hero hero) {
		ZhenYan zhenYan = hero.getZhenYan();
		Struct_zx_766 config = Config_zx_766.getIns().get(zhenYan.getZhenXinLevel());
		if (config != null) {
			float value = config.getFwsx();
			value /= 100000;
			return value + 1;
		}
		return 1;
	}

	/**
	 * 获取阵眼等级加成
	 * 
	 * @param hero
	 * @return
	 */
	public float getLevelValue(Hero hero) {
		ZhenYan zhenYan = hero.getZhenYan();
		Struct_zx_766 config = Config_zx_766.getIns().get(zhenYan.getZhenXinLevel());
		if (config != null) {
			float value = config.getFwsj();
			value /= 100000;
			return value + 1;
		}
		return 1;
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
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.ZHEN_YAN)) {
				return;
			}
			boolean redPoint = checkRedPoint(hero);
			if (redPoint) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.ZHEN_YAN, RedPointConst.RED_1,
						RedPointConst.HAS_RED);
			} else {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.ZHEN_YAN, RedPointConst.RED_1,
						RedPointConst.NO_RED);
			}
		} catch (Exception e) {
			LogTool.error(e, SaintMonsterGoalFunction.class, hero.getId(), hero.getName(),
					"ZhenYanFunction updateRedPoint");
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
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.ZHEN_YAN)) {
				return false;
			}
			ZhenYan zhenYan = hero.getZhenYan();
			int level = zhenYan.getZhenXinLevel();
			Struct_zx_766 config = Config_zx_766.getIns().get(level);
			if (config != null && config.getXj() != 0) {
				int needLevel = config.getTj();
				boolean canUpLevel = true;
				for (Struct_zy_766 zy : Config_zy_766.getIns().getSortList()) {
					int nowLevel = zhenYan.getZhenYanLevelMap().get(zy.getId());
					if (nowLevel < needLevel) {
						canUpLevel = false;
						break;
					}
				}
				if (canUpLevel) {
					if (UseAddUtil.canUse(hero, config.getSxxh())) {
						// 阵心可升星
						return true;
					}
				}
			}

			for (Struct_zy_766 zy : Config_zy_766.getIns().getSortList()) {
				int nowLevel = zhenYan.getZhenYanLevelMap().get(zy.getId());
				Struct_zysj_766 zysj = Config_zysj_766.getIns().get(nowLevel);
				if (zysj != null && zysj.getXj() != 0) {
					int[][] cost = zysj.getXiaohao();
					if (zysj.getShengxing() == 1) {
						// 替换消耗道具
						cost[0][1] = zy.getDjid();
					}
					if (UseAddUtil.canUse(hero, cost)) {
						return true;
					}
				}
			}

		} catch (Exception e) {
			LogTool.error(e, SaintMonsterGoalFunction.class, hero.getId(), hero.getName(),
					"ZhenYanFunction checkRedPoint");
		}
		return false;
	}
	
	/**
	 * 获取阵心等级
	 * @param hero
	 * @return
	 */
	public int getZhenXinLevel(Hero hero) {
		ZhenYan zhenYan = hero.getZhenYan();
		int level = zhenYan.getZhenXinLevel();
		level = level % 1000;
		return level;
	}
}
