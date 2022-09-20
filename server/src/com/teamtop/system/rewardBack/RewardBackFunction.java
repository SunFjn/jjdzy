package com.teamtop.system.rewardBack;

import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.system.rewardBack.model.RewardBack;
import com.teamtop.system.rewardBack.model.RewardBackData;
import com.teamtop.system.rewardBack.model.RewardBackData2;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.struct.Struct_rewardback_270;

public class RewardBackFunction {
	private static RewardBackFunction ins;

	private RewardBackFunction() {
		// TODO Auto-generated constructor stub
	}

	public static RewardBackFunction getIns() {
		if (ins == null) {
			ins = new RewardBackFunction();
		}
		return ins;
	}

	/**
	 * 奖励找回处理
	 * 
	 * @param hero
	 * @param sysId 系统id
	 * @param param 额外参数 0为数据重置前，1为数据重置后
	 */
	public void handle(Hero hero, int sysId, Object... param) {
		try {
			int zeroTime = hero.getZeroTime();
			int betweenDay = TimeDateUtil.betweenCurrTimeOverDay(zeroTime) - 1;
			if (betweenDay == 1 && (Integer) param[0] == 1) {
				// 发昨天未完成的奖励
				return;
			} else if (betweenDay > 1 && (Integer) param[0] == 0) {
				// 超过2天未登录,则重置后发奖励
				return;
			}
			RewardBack rewardBack = hero.getRewardBack();
			Map<Integer, RewardBackData> dataMapBySysId = rewardBack.getDataMapBySysId();
			dataMapBySysId.remove(sysId);
			// 如果策划之后从配置表删除了要奖励的系统id，则该系统不会再进行奖励找回
			Map<Integer, Struct_rewardback_270> map = RewardBackCache.getConfigMap().get(sysId);
			if (map == null || !HeroFunction.getIns().checkSystemOpenZero(hero, sysId)) {
				return;
			}
			Map<Integer, RewardBackAbs> rewardBackAbsMap = RewardBackCache.getRewardBackAbsMap();
			RewardBackAbs rewardBackAbs = rewardBackAbsMap.get(sysId);
			rewardBackAbs.handle(hero, sysId, param);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(), "sysId:" + sysId);
		}
	}

	/**
	 * 奖励map转换为Object[][]数组形式
	 * 
	 * @param awardMap
	 * @return
	 */
	public Object[][] awardMap2ObjcetArray(Map<Integer, Map<Integer, Integer>> awardMap) {
		int len = 0;
		for (Map<Integer, Integer> idMap : awardMap.values()) {
			len += idMap.size();
		}
		Object[][] awardObjectArray = new Object[len][];
		int i = 0;
		for (Entry<Integer, Map<Integer, Integer>> entryType : awardMap.entrySet()) {
			Integer type = entryType.getKey();
			Map<Integer, Integer> value = entryType.getValue();
			for (Entry<Integer, Integer> entryid : value.entrySet()) {
				Integer id = entryid.getKey();
				Integer num = entryid.getValue();
				awardObjectArray[i++] = new Object[] { type, id, num };
			}
		}
		return awardObjectArray;
	}

	/**
	 * 奖励map转换为int[][]数组形式
	 * 
	 * @param awardMap
	 * @return
	 */
	public int[][] awardMap2IntArray(Map<Integer, Map<Integer, Integer>> awardMap) {
		int len = 0;
		for (Map<Integer, Integer> idMap : awardMap.values()) {
			len += idMap.size();
		}
		int[][] awardIntArray = new int[len][];
		int i = 0;
		for (Entry<Integer, Map<Integer, Integer>> entryType : awardMap.entrySet()) {
			Integer type = entryType.getKey();
			Map<Integer, Integer> value = entryType.getValue();
			for (Entry<Integer, Integer> entryid : value.entrySet()) {
				Integer id = entryid.getKey();
				Integer num = entryid.getValue();
				awardIntArray[i++] = new int[] { type, id, num };
			}
		}
		return awardIntArray;
	}

	/**
	 * 数据处理类，用来供RewardBackAbs抽象类的实现类调用
	 * 
	 * @param hero
	 * @param sysId     系统id
	 * @param fbId      副本id
	 * @param restTimes 剩余次数
	 * @param param     额外参数
	 */
	public void handleData(Hero hero, Integer sysId, Integer fbId, int restTimes, int csInt) {
		if (restTimes <= 0 || csInt <= 0) {
			return;
		}
		Map<Integer, Struct_rewardback_270> configMap = RewardBackCache.getConfigMap().get(sysId);
		Struct_rewardback_270 struct_rewardback_270 = configMap.get(fbId);
		int xs = struct_rewardback_270.getXs();
		if (xs == 0) {
			return;
		}
		// 找回奖励=配置奖励*系数*剩余次数*额外参数
		RewardBack rewardBack = hero.getRewardBack();
		Map<Integer, RewardBackData> dataMapBySysId = rewardBack.getDataMapBySysId();
		double cs = xs / RewardBackConst.XSBASE * csInt;
		RewardBackData rewardBackData = dataMapBySysId.get(sysId);
		if (rewardBackData == null) {
			rewardBackData = new RewardBackData();
			rewardBackData.setMap(new HashMap<>());
			dataMapBySysId.put(sysId, rewardBackData);
		}
		rewardBackData.setState(RewardBackConst.CAN_GET);
		Map<Integer, RewardBackData2> map = rewardBackData.getMap();
		RewardBackData2 rewardBackData2 = map.get(fbId);
		if (rewardBackData2 == null) {
			rewardBackData2 = new RewardBackData2();
			map.put(fbId, rewardBackData2);
		}
		rewardBackData2.setRewardCs(cs);
		rewardBackData2.setConsumeCs(restTimes);
	}

	/**
	 * 根据奖励数组(来自配置表)，并根据系数计算填充awardMap(向下取整)
	 * 
	 * @param awardMap 奖励Map
	 * @param objArray 奖励int[][]
	 * @param cs       系数
	 */
	public void arrayIntoMap(Map<Integer, Map<Integer, Integer>> awardMap, int[][] objArray, double cs) {
		// 找回奖励=配置奖励*系数
		objArray = CommonUtil.copyArrayAndNumFloor(objArray, cs);
		for (int[] array : objArray) {
			Map<Integer, Integer> map = awardMap.get(array[0]);
			if (map == null) {
				map = new HashMap<>();
				awardMap.put(array[0], map);
			}
			Integer num = map.get(array[1]);
			if (num == null) {
				num = 0;
			}
			map.put(array[1], array[2] + num);
		}
	}

	/**
	 * 红点发送
	 * 
	 * @param isLogin 是否登录状态
	 */
	public void redPoint(Hero hero, boolean isLogin) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.REWARDBACK_SYSID)) {
			return;
		}
		RewardBack rewardBack = hero.getRewardBack();
		Map<Integer, RewardBackData> dataMapBySysId = rewardBack.getDataMapBySysId();
		for (Entry<Integer, RewardBackData> entry : dataMapBySysId.entrySet()) {
			Integer sysId = entry.getKey();
			if (!HeroFunction.getIns().checkSystemOpenZero(hero, sysId)) {
				continue;
			}
			RewardBackData rewardBackData = entry.getValue();
			int state = rewardBackData.getState();
			if (state == RewardBackConst.CAN_GET) {
				if (isLogin) {
					RedPointFunction.getIns().addLoginRedPoint(hero, RewardBackConst.FULI_SYSID, 1,
							RedPointConst.HAS_RED);
					RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.REWARDBACK_SYSID, 1,
							RedPointConst.HAS_RED);
					return;
				} else {
					RedPointFunction.getIns().fastUpdateRedPoint(hero, RewardBackConst.FULI_SYSID, 1,
							RedPointConst.HAS_RED);
					RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.REWARDBACK_SYSID, 1,
							RedPointConst.HAS_RED);
					return;
				}
			}
		}

	}

}
