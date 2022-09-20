package com.teamtop.system.rewardBack.imp;

import java.util.List;
import java.util.Map;

import com.teamtop.system.boss.Boss;
import com.teamtop.system.boss.personalBoss.model.BossInfo;
import com.teamtop.system.boss.personalBoss.model.PersonalBoss;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.rewardBack.RewardBackAbs;
import com.teamtop.system.rewardBack.RewardBackFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_solo_220;
import excel.struct.Struct_solo_220;

/**
 * 个人boss
 * 
 * @author jjjjyyy
 *
 */
public class PersonalBossRewardBackImp extends RewardBackAbs {

	@Override
	public void handle(Hero hero, Integer sysId, Object... param) {
		// TODO Auto-generated method stub
		Boss boss = hero.getBoss();
		PersonalBoss personalBoss = boss.getPersonalBoss();
		Map<Integer, BossInfo> bossMap = personalBoss.getBossMap();
		List<Struct_solo_220> sortList = Config_solo_220.getIns().getSortList();
		for (Struct_solo_220 struct_solo_220 : sortList) {
			int restTimes = 0;
			int bossId = 0;
			try {
				int[][] con = struct_solo_220.getCon();
				boolean isOpen = checkCondition(hero, con);
				if (!isOpen) {
					continue;
				}
				BossInfo bossInfo = bossMap.get(struct_solo_220.getId());
				int challengeNum = 0;
				if (bossInfo != null) {
					challengeNum = bossInfo.getChallengeNum();
				}
				int configNum = struct_solo_220.getFight();
				if (configNum - challengeNum <= 0) {
					continue;
				}
				bossId = struct_solo_220.getId();
				restTimes = configNum - challengeNum;
				// 个人BOSS 找回奖励=次数*（1转奖励+2转奖励+……+当前转奖励）
				RewardBackFunction.getIns().handleData(hero, sysId, bossId, restTimes, restTimes);
			} catch (Exception e) {
				// TODO: handle exception
				LogTool.error(e, this, hero.getId(), hero.getName(), "bossId:" + bossId + " restTimes:" + restTimes);
			}
		}

	}

	private boolean checkCondition(Hero hero, int[][] condition) {
		if (hero.getRealLevel() >= condition[0][0] && hero.getRebornlv() >= condition[0][1]) {
			return true;
		}
		return false;
	}

}
