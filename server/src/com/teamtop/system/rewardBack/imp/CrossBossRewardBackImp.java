package com.teamtop.system.rewardBack.imp;

import java.util.List;

import com.teamtop.system.crossBoss.model.CrossBoss;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.rewardBack.RewardBackAbs;
import com.teamtop.system.rewardBack.RewardBackFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_seven_223;
import excel.struct.Struct_seven_223;

/**
 * 七擒孟获
 * 
 * @author jjjjyyy
 *
 */
public class CrossBossRewardBackImp extends RewardBackAbs {

	@Override
	public void handle(Hero hero, Integer sysId, Object... param) {
		// TODO Auto-generated method stub
		List<Struct_seven_223> sortList = Config_seven_223.getIns().getSortList();
		for (Struct_seven_223 struct_seven_223 : sortList) {
			int bossId = 0;
			int restTimes = 0;
			try {
				boolean isOpen = getBossIdByCondition(hero, struct_seven_223.getCon());
				if (!isOpen) {
					continue;
				}
				bossId = struct_seven_223.getBoss();
				CrossBoss crossBoss = hero.getCrossBoss();
				restTimes = crossBoss.getNum();
				// 七擒孟获 找回奖励=次数*当前转基础奖励
				RewardBackFunction.getIns().handleData(hero, sysId, bossId, restTimes, restTimes);
				return;
			} catch (Exception e) {
				// TODO: handle exception
				LogTool.error(e, this, hero.getId(), hero.getName(), "bossId:" + bossId + " restTimes:" + restTimes);
			}
		}
	}

	private boolean getBossIdByCondition(Hero hero, int[][] condition) {
		if (hero.getRebornlv() <= condition[0][1] && hero.getRebornlv() >= condition[0][0]) {
			return true;
		}
		return false;
	}

}
