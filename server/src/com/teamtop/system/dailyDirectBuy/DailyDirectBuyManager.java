package com.teamtop.system.dailyDirectBuy;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.dailyDirectBuy.model.DailyDirectBuy;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_mrzg1_256;
import excel.config.Config_mrzgmb_256;
import excel.struct.Struct_mrzg1_256;
import excel.struct.Struct_mrzgmb_256;

public class DailyDirectBuyManager {
	private static DailyDirectBuyManager ins = null;

	public static DailyDirectBuyManager getIns() {
		if (ins == null) {
			ins = new DailyDirectBuyManager();
		}
		return ins;
	}

	private DailyDirectBuyManager() {
	}

	/**
	 * 打开界面
	 * 
	 * @param hero
	 */
	public void openUI(Hero hero) {
		// TODO Auto-generated method stub
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, DailyDirectBuyConst.SYSTEMID)) {
			return;
		}
		Map<Integer, Integer> awardList = hero.getDailyDirectBuy().getAwardMap();

		int betweenOpen = TimeDateUtil.betweenOpen();
		// [[B:每日直购表idB:0:未购买，1:已购买但未领取，2:已领取]奖励档次列表，第一层为天数，第二层为奖励状态]奖励列表I:开服第几天
		Object[] twoArray = new Object[7];
		for (int i = 0; i < 7; i++) {
			List<Struct_mrzg1_256> list = DailyDirectBuyCache.getDailyDirectBuyConfigMap().get(i + 1);
			Object[] awardArray = new Object[list.size()];
			for (int j = 0; j < list.size(); j++) {
				int id = list.get(j).getId();
				Integer state = awardList.get(id);
				if (state == null) {
					state = 0;
				}
				awardArray[j] = new Object[] { id, state };
			}
			twoArray[i] = new Object[] { awardArray };
		}

		/*
		 * for (int i = 0; i < awardList.size(); i++) { Map<Integer, Integer> map =
		 * awardList.get(i); List<Struct_mrzg1_256> list =
		 * DailyDirectBuyCache.getDailyDirectBuyConfigMap().get(i + 1); Object[]
		 * twoArray = new Object[list.size()]; for (int j = 0; j < list.size(); j++) {
		 * int id = list.get(j).getId(); Integer status = map.get(id); if (status ==
		 * null) { status = DailyDirectBuyConst.NOTBUY; } twoArray[j] = new Object[] {
		 * id, status }; } awardArray[i] = new Object[] { twoArray }; }
		 */
		// 目标奖励
		Map<Integer, Integer> targetAwardMap = hero.getDailyDirectBuy().getTargetAwardMap();
		List<Struct_mrzgmb_256> targetAwardConfigList = DailyDirectBuyCache.getTargetAwardConfigList();
		int size = targetAwardConfigList.size();
		List<Object[]> objTargetList = new ArrayList<>();
		for (int i = 0; i < size; i++) {
			int id = targetAwardConfigList.get(i).getBianhao();
			Integer state = Optional.ofNullable(targetAwardMap).map(mapper -> mapper.get(id))
					.orElse(DailyDirectBuyConst.NOT_REACH);
			objTargetList.add(new Object[] { id, state });
		}
		int targetTimes = awardList.size();
		int endTime = DailyDirectBuyFunction.getIns().getEndTime();
		DailyDirectBuySender.sendCmd_3702(hero.getId(), twoArray, betweenOpen, objTargetList.toArray(), targetTimes,
				endTime);
	}

	/**
	 * 领取奖励
	 * 
	 * @param hero
	 * @param id    领取的天数id，第一天就为1
	 * @param level 领取的档次，为每日直购表id
	 */
	public void getAward(Hero hero, int id, int level) {
		// TODO Auto-generated method stub
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, DailyDirectBuyConst.SYSTEMID)) {
			return;
		}
		Struct_mrzg1_256 struct_mrzg1_256 = Config_mrzg1_256.getIns().get(level);
		if (struct_mrzg1_256 == null) {
			LogTool.warn("struct_mrzg1_256==null :" + level, DailyDirectBuyManager.class);
			return;
		}
		Integer state = hero.getDailyDirectBuy().getAwardMap().get(level);

		if (state == null) {
			LogTool.warn("hero.getDailyDirectBuy().getAwardMap().get(level)==null :" + level,
					DailyDirectBuyManager.class);
			return;
		}
		int[][] reward = struct_mrzg1_256.getReward();

		if (state == DailyDirectBuyConst.BUY_NOTGET) {
			hero.getDailyDirectBuy().getAwardMap().put(level, DailyDirectBuyConst.GETTED);
			UseAddUtil.add(hero, reward, SourceGoodConst.DAILYDIRECTBUY_AWARD, UseAddUtil.getDefaultMail(), true); // 发放奖励
			DailyDirectBuySender.sendCmd_3704(hero.getId(), DailyDirectBuyConst.SUCCESS, level);
			return;
		} else {
			LogTool.warn("state:  " + state, DailyDirectBuyManager.class);
			return;
		}

	}

	/**
	 * 领取目标奖励 3707
	 * 
	 * @param targetId| 目标表id| int
	 */
	public void getTargetAward(Hero hero, int targetId) {
		// TODO Auto-generated method stub
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, DailyDirectBuyConst.SYSTEMID)) {
				return;
			}
			Struct_mrzgmb_256 struct_mrzgmb_256 = Config_mrzgmb_256.getIns().get(targetId);
			if (struct_mrzgmb_256 == null) {
				DailyDirectBuySender.sendCmd_3708(hero.getId(), DailyDirectBuyConst.FAILURE_NOT_AWARD, targetId);
				return;
			}
			DailyDirectBuy dailyDirectBuy = hero.getDailyDirectBuy();
			Map<Integer, Integer> targetAwardMap = dailyDirectBuy.getTargetAwardMap();
			Integer state = targetAwardMap.get(targetId);
			if (state == null) {
				DailyDirectBuySender.sendCmd_3708(hero.getId(), DailyDirectBuyConst.FAILURE_NOT_REACH, targetId);
				return;
			}
			if (state == DailyDirectBuyConst.GETTED) {
				DailyDirectBuySender.sendCmd_3708(hero.getId(), DailyDirectBuyConst.FAILURE_NOT_REP, targetId);
				return;
			}
			targetAwardMap.put(targetId, DailyDirectBuyConst.GETTED);
			int[][] reward = struct_mrzgmb_256.getReward();
			// 发放奖励
			UseAddUtil.add(hero, reward, SourceGoodConst.DAILYDIRECTBUY_SYS_TARGET_AWARD, UseAddUtil.getDefaultMail(),
					true);
			DailyDirectBuySender.sendCmd_3708(hero.getId(), DailyDirectBuyConst.SUCCESS, targetId);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "getTargetAward targetId:" + targetId);
		}
	}

}
