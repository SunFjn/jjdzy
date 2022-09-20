package com.teamtop.system.rewardBack.imp;

import com.teamtop.system.hero.Hero;
import com.teamtop.system.rewardBack.RewardBackAbs;
import com.teamtop.system.rewardBack.RewardBackFunction;
import com.teamtop.system.runningMan.RunningMan;
import com.teamtop.system.runningMan.RunningManConst;
import com.teamtop.util.log.LogTool;

/**
 * 过关斩将
 * 
 * @author jjjjyyy
 *
 */
public class RunningManRewardBackImp extends RewardBackAbs {

	@Override
	public void handle(Hero hero, Integer sysId, Object... param) {
		// TODO Auto-generated method stub
		int bewteenNum = 0;
		try {
			RunningMan runningMan = hero.getRunningMan();
			int maxtodaynum = runningMan.getMaxtodaynum();
			int maxHisnum = runningMan.getMaxHisnum();
			bewteenNum = getBewteenNum(maxtodaynum, maxHisnum);
			// 过关斩将 找回奖励=层数*基础奖励
			RewardBackFunction.getIns().handleData(hero, sysId, 1, 1, bewteenNum);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "bewteenNum:" + bewteenNum);
		}
	}

	/**
	 * 最大关卡和今日扫荡关卡之差，比如玩家可扫荡1-100关，但他自己挑战了90关，那么只能找回91-100关奖励
	 * 
	 * @param maxtodaynum
	 * @param maxHisnum
	 * @return
	 */
	private int getBewteenNum(int maxtodaynum, int maxHisnum) {
		int todayType = maxtodaynum / 1000;
		int maxType = maxHisnum / 1000;
		if (maxtodaynum == 0) {
			todayType = 1;
		}
		int maxNum = 0;
		for (int i = 0; i < maxType - todayType; i++) {
			maxNum += RunningManConst.MaxNum;
		}
		return maxNum - (maxtodaynum % 1000) + (maxHisnum % 1000);
	}

}
