package com.teamtop.system.rewardBack.imp;

import java.util.List;

import com.teamtop.system.crossTeamFuBen.model.CrossTeamFuBen;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.XTCS004Const;
import com.teamtop.system.rewardBack.RewardBackAbs;
import com.teamtop.system.rewardBack.RewardBackFunction;
import com.teamtop.util.log.LogTool;

import excel.config.Config_xtcs_004;
import excel.config.Config_zdfb_255;
import excel.struct.Struct_xtcs_004;
import excel.struct.Struct_zdfb_255;

/**
 * 跨服组队
 * 
 * @author jjjjyyy
 *
 */
public class CrossTeamFubenRewardBackImp extends RewardBackAbs {

	@Override
	public void handle(Hero hero, Integer sysId, Object... param) {
		// TODO Auto-generated method stub
		int fubenId = 0;
		int restTimes = 0;
		int zhuanNum = 0;
		try {
			fubenId = getFubenIdByRebornlv(hero);
			CrossTeamFuBen crossTeamFuBen = hero.getCrossTeamFuBen();
			Struct_xtcs_004 excel = Config_xtcs_004.getIns().get(XTCS004Const.CROSS_TEAM_FUBEN_AWARDS_TIMES);
			int awardsNumMax = excel.getNum() + crossTeamFuBen.getAddTimes();
			int timesBattled = crossTeamFuBen.getTimesBattled();
			restTimes = awardsNumMax - timesBattled <= 0 ? 0 : awardsNumMax - timesBattled;
			zhuanNum = hero.getRebornlv() / 1000;
			// 组队副本 找回奖励=当前转基础奖励*次数
			RewardBackFunction.getIns().handleData(hero, sysId, fubenId, restTimes, restTimes);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(),
					"fubenId:" + fubenId + " restTimes:" + restTimes + " zhuanNum:" + zhuanNum);
		}
	}

	private int getFubenIdByRebornlv(Hero hero) {
		List<Struct_zdfb_255> sortList = Config_zdfb_255.getIns().getSortList();
		for (Struct_zdfb_255 struct_zdfb_255 : sortList) {
			int zs = struct_zdfb_255.getZs() / 1000;
			int rebornlv = hero.getRebornlv() / 1000;
			if (rebornlv == zs) {
				return struct_zdfb_255.getId();
			}
		}
		return 0;
	}

}
