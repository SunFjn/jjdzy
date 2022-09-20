package com.teamtop.system.rewardBack.imp;

import com.teamtop.system.boss.countryBoss.CountryBoss;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.rewardBack.RewardBackAbs;
import com.teamtop.system.rewardBack.RewardBackFunction;
import com.teamtop.util.log.LogTool;

/**
 * 国家boss
 * 
 * @author jjjjyyy
 *
 */
public class CountryBossRewardBackImp extends RewardBackAbs {

	@Override
	public void handle(Hero hero, Integer sysId, Object... param) {
		// TODO Auto-generated method stub
		int restTimes = 0;
		try {
			if (hero.getCountryType() == 0) {
				// 未加入国家
				return;
			}
			CountryBoss countryBoss = hero.getCountryBoss();
			restTimes = countryBoss.getDayTimes();
			// 国家BOSS 找回奖励=次数*基础奖励
			RewardBackFunction.getIns().handleData(hero, sysId, 1, restTimes, restTimes);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "restTimes:" + restTimes);
		}
	}

}
