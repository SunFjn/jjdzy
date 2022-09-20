package com.teamtop.system.rewardBack.imp;

import java.util.List;

import com.teamtop.system.battleVixens.BattleVixensCache;
import com.teamtop.system.battleVixens.model.BattleVixens;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.rewardBack.RewardBackAbs;
import com.teamtop.system.rewardBack.RewardBackFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_yiqi_007;
import excel.struct.Struct_yiqi_007;

/**
 * 一骑当千
 * 
 * @author jjjjyyy
 *
 */
public class BattleVixensRewardBackImp extends RewardBackAbs {

	@Override
	public void handle(Hero hero, Integer sysId, Object... param) {
		// TODO Auto-generated method stub
		int hardType = 0;
		int restTimes = 0;
		int maxPassId = 0;
		try {
			BattleVixens battleVixens = hero.getBattleVixens();
			int challengeNum = battleVixens.getChallengeNum();
			int buyNum = battleVixens.getBuyNum();
			int addNum = battleVixens.getAddNum();
			int freeCha = battleVixens.getFreeCha();
			restTimes = freeCha + addNum + buyNum - challengeNum;
			// 最大通关难度
			hardType = battleVixens.getHardType();
			// 该难度最大通关数
			maxPassId = battleVixens.getMaxPassId();
			List<Struct_yiqi_007> list = BattleVixensCache.getHardTypeMap().get(hardType);
			Struct_yiqi_007 struct_yiqi_007 = list.get(0);
			int index = struct_yiqi_007.getIndex();
			if (index > maxPassId) {
			} else {
				struct_yiqi_007 = Config_yiqi_007.getIns().get(maxPassId);
			}
			int maxPassBo = struct_yiqi_007.getBo();
			// 一骑当千 找回奖励=次数*当前难度基础奖励*当前难度波数
			RewardBackFunction.getIns().handleData(hero, sysId, hardType, restTimes, restTimes * maxPassBo);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(),
					"hardType:" + hardType + " restTimes:" + restTimes + " maxPassId:" + maxPassId);
		}
	}

}
