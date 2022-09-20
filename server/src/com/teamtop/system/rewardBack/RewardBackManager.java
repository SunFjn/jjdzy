package com.teamtop.system.rewardBack;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.rewardBack.model.RewardBack;
import com.teamtop.system.rewardBack.model.RewardBackData;
import com.teamtop.system.rewardBack.model.RewardBackData2;
import com.teamtop.util.log.LogTool;

import excel.struct.Struct_rewardback_270;

public class RewardBackManager {
	private static RewardBackManager ins;

	private RewardBackManager() {
		// TODO Auto-generated constructor stub
	}

	public static RewardBackManager getIns() {
		if (ins == null) {
			ins = new RewardBackManager();
		}
		return ins;
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
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.REWARDBACK_SYSID)) {
			return;
		}
		RewardBack rewardBack = hero.getRewardBack();
		Map<Integer, RewardBackData> dataMapBySysId = rewardBack.getDataMapBySysId();
		List<Object[]> rewardBackList = new ArrayList<>();
		int allRewardBackYb = 0;
		for (Entry<Integer, RewardBackData> entry : dataMapBySysId.entrySet()) {
			Integer sysId = entry.getKey();
			if (!HeroFunction.getIns().checkSystemOpenZero(hero, sysId)) {
				continue;
			}
			RewardBackData value = entry.getValue();
			if (value == null) {
				continue;
			}
			int stateInt = value.getState();
			Map<Integer, RewardBackData2> map = value.getMap();
			if (map == null || map.size() == 0) {
				continue;
			}
			int id = 0;
			Map<Integer, Map<Integer, Integer>> awardMap = new HashMap<>();
			Map<Integer, Map<Integer, Integer>> coinMap = new HashMap<>();
			Map<Integer, Map<Integer, Integer>> ybMap = new HashMap<>();
			for (Entry<Integer, RewardBackData2> fubenIdEntry : map.entrySet()) {
				int fubenId = fubenIdEntry.getKey();
				double rewardCs = fubenIdEntry.getValue().getRewardCs();
				int consumeCs = fubenIdEntry.getValue().getConsumeCs();
				Map<Integer, Struct_rewardback_270> configMap = RewardBackCache.getConfigMap().get(sysId);
				Struct_rewardback_270 struct_rewardback_270 = configMap.get(fubenId);
				id = struct_rewardback_270.getId();
				int[][] reward = struct_rewardback_270.getReward();
				RewardBackFunction.getIns().arrayIntoMap(awardMap, reward, rewardCs);
				int[][] coinConmuse = struct_rewardback_270.getConmuse();
				RewardBackFunction.getIns().arrayIntoMap(coinMap, coinConmuse, consumeCs);
				int[][] ybConmuse = struct_rewardback_270.getConmuse1();
				RewardBackFunction.getIns().arrayIntoMap(ybMap, ybConmuse, consumeCs);
			}
			Object[][] awardArray = RewardBackFunction.getIns().awardMap2ObjcetArray(awardMap);
			int[][] coinArray = RewardBackFunction.getIns().awardMap2IntArray(coinMap);
			int[][] ybArray = RewardBackFunction.getIns().awardMap2IntArray(ybMap);
			int coin = coinArray[0][2];
			int yb = ybArray[0][2];
			rewardBackList.add(new Object[] { id, coin, yb, stateInt, awardArray });
			if (stateInt == RewardBackConst.CAN_GET) {
				allRewardBackYb += yb;
			}
		}
		RewardBackSender.sendCmd_5272(hero.getId(), rewardBackList.toArray(), allRewardBackYb);
	}

	/**
	 * 领取奖励
	 * 
	 * @param hero
	 * @param type  找回类型，1：铜钱找回，2：元宝找回，3：全部找回
	 * @param sysId 系统id,全部找回时系统id必须为0
	 */
	public void getAward(Hero hero, int type, int sysId) {
		// TODO Auto-generated method stub
		if (hero == null) {
			return;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.REWARDBACK_SYSID)) {
			return;
		}
		int fubenId = 0;
		double rewardCs = 0;
		int consumeCs = 0;
		try {
			int[][] consume = null;
			int[][] newReward = null;
			RewardBack rewardBack = hero.getRewardBack();
			Map<Integer, RewardBackData> dataMapBySysId = rewardBack.getDataMapBySysId();
			if (sysId != 0) {
				Map<Integer, Struct_rewardback_270> configMap = RewardBackCache.getConfigMap().get(sysId);
				if (configMap == null) {
					// 不可领取
					RewardBackSender.sendCmd_5274(hero.getId(), RewardBackConst.FAILURE_NOT_AWARD, type, sysId);
					return;
				}
				if (!HeroFunction.getIns().checkSystemOpenZero(hero, sysId)) {
					return;
				}
				RewardBackData rewardBackData = dataMapBySysId.get(sysId);
				if (rewardBackData == null) {
					// 不可领取
					RewardBackSender.sendCmd_5274(hero.getId(), RewardBackConst.FAILURE_NOT_AWARD, type, sysId);
					return;
				}
				Map<Integer, RewardBackData2> map = rewardBackData.getMap();
				int stateInt = rewardBackData.getState();
				if (stateInt == 0) {
					// 不可领取
					RewardBackSender.sendCmd_5274(hero.getId(), RewardBackConst.FAILURE_NOT_REACH, type, sysId);
					return;
				}
				if (stateInt == RewardBackConst.GETTED) {
					// 已领取
					RewardBackSender.sendCmd_5274(hero.getId(), RewardBackConst.FAILURE_NOT_REP, type, sysId);
					return;
				}

				Map<Integer, Map<Integer, Integer>> awardMap = new HashMap<>();
				if (type == 1) {
					// 铜钱找回
					Map<Integer, Map<Integer, Integer>> coinMap = new HashMap<>();
					for (Entry<Integer, RewardBackData2> fubenIdEntry : map.entrySet()) {
						fubenId = fubenIdEntry.getKey();
						rewardCs = fubenIdEntry.getValue().getRewardCs();
						consumeCs = fubenIdEntry.getValue().getConsumeCs();
						Struct_rewardback_270 struct_rewardback_270 = configMap.get(fubenId);
						int[][] reward = struct_rewardback_270.getReward();
						RewardBackFunction.getIns().arrayIntoMap(awardMap, reward,
								rewardCs * RewardBackConst.TONGBI_PER);
						int[][] coinConmuse = struct_rewardback_270.getConmuse();
						RewardBackFunction.getIns().arrayIntoMap(coinMap, coinConmuse, consumeCs);
					}
					consume = RewardBackFunction.getIns().awardMap2IntArray(coinMap);
					newReward = RewardBackFunction.getIns().awardMap2IntArray(awardMap);
				} else if (type == 2) {
					// 元宝找回
					Map<Integer, Map<Integer, Integer>> ybMap = new HashMap<>();
					for (Entry<Integer, RewardBackData2> fubenIdEntry : map.entrySet()) {
						fubenId = fubenIdEntry.getKey();
						rewardCs = fubenIdEntry.getValue().getRewardCs();
						consumeCs = fubenIdEntry.getValue().getConsumeCs();
						Struct_rewardback_270 struct_rewardback_270 = configMap.get(fubenId);
						int[][] reward = struct_rewardback_270.getReward();
						RewardBackFunction.getIns().arrayIntoMap(awardMap, reward, rewardCs);
						int[][] ybConmuse = struct_rewardback_270.getConmuse1();
						RewardBackFunction.getIns().arrayIntoMap(ybMap, ybConmuse, consumeCs);
					}
					consume = RewardBackFunction.getIns().awardMap2IntArray(ybMap);
					newReward = RewardBackFunction.getIns().awardMap2IntArray(awardMap);
				} else {
					return;
				}
			} else if (sysId == 0 && type == 3) {
				// 全部找回
				Map<Integer, Map<Integer, Integer>> awardMap = new HashMap<>();
				Map<Integer, Map<Integer, Integer>> ybMap = new HashMap<>();
				for (Entry<Integer, RewardBackData> entry : dataMapBySysId.entrySet()) {
					Integer sysIdKey = entry.getKey();
					if (!HeroFunction.getIns().checkSystemOpenZero(hero, sysIdKey)) {
						continue;
					}
					RewardBackData value = entry.getValue();
					int state = value.getState();
					if (state == 0 || state == RewardBackConst.GETTED) {
						continue;
					}
					Map<Integer, Struct_rewardback_270> configMap = RewardBackCache.getConfigMap().get(sysIdKey);
					Map<Integer, RewardBackData2> map = value.getMap();
					for (Entry<Integer, RewardBackData2> fubenIdEntry : map.entrySet()) {
						fubenId = fubenIdEntry.getKey();
						rewardCs = fubenIdEntry.getValue().getRewardCs();
						consumeCs = fubenIdEntry.getValue().getConsumeCs();
						Struct_rewardback_270 struct_rewardback_270 = configMap.get(fubenId);
						int[][] reward = struct_rewardback_270.getReward();
						RewardBackFunction.getIns().arrayIntoMap(awardMap, reward, rewardCs);
						int[][] ybConmuse = struct_rewardback_270.getConmuse1();
						RewardBackFunction.getIns().arrayIntoMap(ybMap, ybConmuse, consumeCs);

					}
				}
				if (awardMap.size() == 0 || ybMap.size() == 0) {
					return;
				}
				consume = RewardBackFunction.getIns().awardMap2IntArray(ybMap);
				newReward = RewardBackFunction.getIns().awardMap2IntArray(awardMap);
			} else {
				return;
			}
			if (!UseAddUtil.canUse(hero, consume)) {
				// 元宝或铜币不足
				RewardBackSender.sendCmd_5274(hero.getId(), RewardBackConst.FAILURE_NOT_YB, type, sysId);
				return;
			}

			if (type == 1 || type == 2) {
				RewardBackData rewardBackData = dataMapBySysId.get(sysId);
				rewardBackData.setState(RewardBackConst.GETTED);
			} else {
				for (RewardBackData rewardBackData : dataMapBySysId.values()) {
					rewardBackData.setState(RewardBackConst.GETTED);
				}
			}
			UseAddUtil.use(hero, consume, SourceGoodConst.REWARDBACK_CONSUMEYB, true);// 消耗
			UseAddUtil.add(hero, newReward, SourceGoodConst.REWARDBACK_GETREWARD, UseAddUtil.getDefaultMail(), true);
			RewardBackSender.sendCmd_5274(hero.getId(), RewardBackConst.SUCCESS, type, sysId);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "type:" + type + " sysId:" + sysId + " fubenId:"
					+ fubenId + " rewardCs:" + rewardCs + " consumeCs:" + consumeCs);
		}
	}

}
