package com.teamtop.system.activity.ativitys.nianMonsterMakeSpring;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.nianMonsterMakeSpring.model.NianMonsterMakeSpringModel;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_daoju_204;
import excel.config.Config_nianpoint_299;
import excel.struct.Struct_daoju_204;
import excel.struct.Struct_nianpoint_299;

public class NianMonsterMakeSpringFunction {

	private static NianMonsterMakeSpringFunction ins;

	private NianMonsterMakeSpringFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized NianMonsterMakeSpringFunction getIns() {
		if (ins == null) {
			ins = new NianMonsterMakeSpringFunction();
		}
		return ins;
	}

	public boolean addBoomNum(Hero hero, int id, int num) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_NIAN_MONSTER_MAKE_SPRINGT)) {
			return false;
		}
		NianMonsterMakeSpringModel actData = (NianMonsterMakeSpringModel) hero.getHeroActivityData()
				.getActivityDataMap().get(ActivitySysId.ACT_NIAN_MONSTER_MAKE_SPRINGT);
		Struct_daoju_204 struct_daoju_204 = Config_daoju_204.getIns().get(id);
		if (struct_daoju_204 == null) {
			return false;
		}
		int[][] reward = struct_daoju_204.getReward();
		NianMonsterMakeSpringManager.getIns().checkBoomNum(hero);
		int addNum = reward[0][0] * num;
		actData.changeBoomNum(addNum);
		NianMonsterMakeSpringSender.sendCmd_11562(hero.getId(), addNum);
		return true;
	}

	/**
	 * 更新红点
	 * @param hero
	 */
	public void updateRedPoint(Hero hero) {
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_NIAN_MONSTER_MAKE_SPRINGT)) {
				return;
			}
			boolean checkRedPoint = checkRedPoint(hero);
			if (checkRedPoint) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.ACT_NIAN_MONSTER_MAKE_SPRINGT,
						RedPointConst.RED_1, RedPointConst.HAS_RED);
			} else {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.ACT_NIAN_MONSTER_MAKE_SPRINGT,
						RedPointConst.RED_1, RedPointConst.NO_RED);
			}
		} catch (Exception e) {
			LogTool.error(e, NianMonsterMakeSpringFunction.class, hero.getId(), hero.getName(),
					"NianMonsterMakeSpringFunction updateRedPooint");
		}
	}

	/**
	 * 检测红点
	 * @param hero
	 * @return
	 */
	public boolean checkRedPoint(Hero hero) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_NIAN_MONSTER_MAKE_SPRINGT)) {
			return false;
		}

		NianMonsterMakeSpringModel actData = (NianMonsterMakeSpringModel) hero.getHeroActivityData()
				.getActivityDataMap().get(ActivitySysId.ACT_NIAN_MONSTER_MAKE_SPRINGT);
		if (actData == null) {
			return false;
		}
		int monsterHp = actData.getMonsterHp();
		int boomNum = actData.getBoomNum();
		if (monsterHp > 0 && boomNum > 0) {
			return true;
		}
		int score = actData.getScore();
		// 目标奖励
		HashSet<Integer> goalRewardSet = actData.getGoalRewardSet();
		List<Struct_nianpoint_299> sortList = Config_nianpoint_299.getIns().getSortList();
		int size = sortList.size();
		Struct_nianpoint_299 nianpoint_299 = null;
		for (int i = 0; i < size; i++) {
			nianpoint_299 = sortList.get(i);
			if (score >= nianpoint_299.getPoint() && (!goalRewardSet.contains(nianpoint_299.getId()))) {
				return true;
			}
		}
		// 奖池奖励
		int currentTime = TimeDateUtil.getCurrentTime();
		ArrayList<int[]> rewardPoolList = actData.getRewardPoolList();
		size = rewardPoolList.size();
		int[] info = null;
		for (int i = 0; i < size; i++) {
			info = rewardPoolList.get(i);
			if (currentTime > info[1]) {
				return true;
			}
		}
		return false;
	}

}
