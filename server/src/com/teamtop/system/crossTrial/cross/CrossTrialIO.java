package com.teamtop.system.crossTrial.cross;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentSkipListSet;

import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossFunction;
import com.teamtop.cross.upload.CrossHeroBaseModel;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.crossTrial.CrossTrialConst;
import com.teamtop.system.event.systemEvent.SystemEventFunction;
import com.teamtop.system.hero.FightCalcConst;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroDao;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.rankNew.RankingCache;
import com.teamtop.system.rankNew.RankingConst;
import com.teamtop.system.rankNew.rankModel.BaseRankModel;
import com.teamtop.system.robot.CrossHeroBaseRobot;
import com.teamtop.util.ProbabilityEvent.RandomUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_xtcs_004;
import io.netty.channel.Channel;

public class CrossTrialIO {

	private static CrossTrialIO ins;

	public CrossTrialIO() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized CrossTrialIO getIns() {
		if (ins == null) {
			ins = new CrossTrialIO();
		}
		return ins;
	}

	public void getEnemyInfo(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_TRIAL_GET_ENEMY;
		Type classType = new TypeReference<Map<Integer, Long>>() {
		}.getType();
		if (CrossTrialSysCache.getCache().getFirst() == 0) {
			// 第一次初始化
			CrossTrialSysCache.getCache().setFirst(1);
			CrossTrialCentralFunction.getIns().initMatchMap();
		}
		Map<Integer, Long> enemys = crossData.getObject(CrossTrialEnum.getenemy.name(), classType);
		int floor = crossData.getObject(CrossTrialEnum.floor.name(), Integer.class);
		if (enemys.size() > 0) {
			Map<Long, CrossHeroBaseModel> fightMap = CrossTrialSysCache.getFightMap();
			Map<Integer, CrossHeroBaseModel> enemyMap = new HashMap<>();
			for (int type : enemys.keySet()) {
				CrossHeroBaseModel model = fightMap.get(enemys.get(type));
				enemyMap.put(type, model);
			}
			crossData.putObject(CrossTrialEnum.enemyData.name(), enemyMap);
		} else {
			Map<Integer, Map<Integer, List<Long>>> floorMatchMap = CrossTrialSysCache.getFloorMatchMap();
			Map<Long, CrossHeroBaseModel> fightMap = CrossTrialSysCache.getFightMap();
			Map<Integer, List<Long>> typeMap = floorMatchMap.get(floor);
			if (typeMap == null) {
				typeMap = new HashMap<>();
				floorMatchMap.put(floor, typeMap);
			}
			Map<Integer, CrossHeroBaseModel> enemyMap = new HashMap<>();
			Map<Integer, Long> typeEnemy = new HashMap<>();
			for (int type = 1; type <= 3; type++) {
				List<Long> list = typeMap.get(type);
				if (list == null) {
					CrossTrialCentralFunction.getIns().createRobot(floor, 10, type);
					list = typeMap.get(type);
				}
				if (list.size() == 0) {
					CrossTrialCentralFunction.getIns().createRobot(floor, 10, type);
					list = typeMap.get(type);
				}
				int size = list.size() - 1;
				int random = RandomUtil.getRandomNumInAreas(0, size);
				Long hid = list.get(random);
				CrossHeroBaseModel model = fightMap.get(hid);
				enemyMap.put(type, model);
				typeEnemy.put(type, hid);
			}
			crossData.putObject(CrossTrialEnum.typeEnemy.name(), typeEnemy);
			crossData.putObject(CrossTrialEnum.enemyData.name(), enemyMap);
		}
		NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
	}
	
	/**
	 * 获取下一层战斗对象
	 * @param channel
	 * @param crossData
	 */
	public void getNextEnemy(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_TRIAL_NEXT_ENEMY;
		try {
			int floor = crossData.getObject(CrossTrialEnum.floor.name(), Integer.class);
			Map<Integer, Map<Integer, List<Long>>> floorMatchMap = CrossTrialSysCache.getFloorMatchMap();
			Map<Long, CrossHeroBaseModel> fightMap = CrossTrialSysCache.getFightMap();
			Map<Integer, List<Long>> typeMap = floorMatchMap.get(floor);
			if (typeMap == null) {
				typeMap = new HashMap<>();
				floorMatchMap.put(floor, typeMap);
			}
			Map<Integer, CrossHeroBaseModel> enemyMap = new HashMap<>();
			for (int type = 1; type <= 3; type++) {
				List<Long> list = typeMap.get(type);
				if (list == null) {
					CrossTrialCentralFunction.getIns().createRobot(floor, 10, type);
					list = typeMap.get(type);
				}
				if (list.size() == 0) {
					CrossTrialCentralFunction.getIns().createRobot(floor, 10, type);
					list = typeMap.get(type);
				}
				int size = list.size() - 1;
				int random = RandomUtil.getRandomNumInAreas(0, size);
				Long hid = list.get(random);
				CrossHeroBaseModel model = fightMap.get(hid);
				enemyMap.put(type, model);
			}
			crossData.putObject(CrossTrialEnum.enemyData.name(), enemyMap);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
		} catch (Exception e) {
			LogTool.error(e, CrossTrialIO.class, "CrossTrialIO getNextEnemy");
		}
	}

	/**
	 * 中央服收到子服上传排行数据
	 * @param channel
	 * @param crossData
	 */
	public void uploadRankingData(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_TRIAL_UPLOAD_RANK;
		try {
			Type type = new TypeReference<List<CrossHeroBaseRobot>>() {
			}.getType();
			List<CrossHeroBaseModel> list = crossData.getObject(CrossTrialEnum.rankData.name(), type);
			int zoneid = crossData.getObject(CrossTrialEnum.zoneid.name(), Integer.class);
			int index = Config_xtcs_004.getIns().get(CrossTrialConst.AverageRanking).getNum();
			if (list.size() > index) {
				CrossHeroBaseModel crossHeroBaseRobot = list.get(index);
				Map<Integer, Long> standardMap = CrossTrialSysCache.getStandardMap();
				standardMap.put(zoneid, crossHeroBaseRobot.getTotalStrength());
			}
			Map<Long, CrossHeroBaseModel> fightMap = CrossTrialSysCache.getFightMap();
			if (fightMap.size() > 2000) {
				return;
			}
			for (CrossHeroBaseModel robot : list) {
				if (fightMap.size() > 2000) {
					return;
				}
				fightMap.put(robot.getId(), robot);
			}
		} catch (Exception e) {
			LogTool.error(e, CrossTrialIO.class, "CrossTrialIO uploadRankingData");
		}
	}

	/**
	 * 子服收到中央服通知上传数据
	 * @param channel
	 * @param crossData
	 */
	public void askUpload(Channel channel, CrossData crossData) {
		try {
			ConcurrentSkipListSet<BaseRankModel> treeSet = RankingCache.getRankingmap().get(RankingConst.STRENGTH_RANKING);
			if (treeSet != null) {
				List<CrossHeroBaseModel> rankList = new ArrayList<>();
				for (BaseRankModel model : treeSet) {
					long hid = model.getHid();
					try {
						Hero hero = HeroCache.getHero(hid);
						if (hero == null) {
							hero = HeroDao.getIns().find(hid, null);
							SystemEventFunction.triggerInitEvent(hero);
							FightCalcFunction.setRecalcAll(hero, FightCalcConst.LOGIN, SystemIdConst.SYSID);
						}
						if (hero != null) {
							CrossHeroBaseModel cmodel = new CrossHeroBaseModel();
							CrossFunction.makeCrossBaseHeroModel(cmodel, hero);
							rankList.add(cmodel);
						}
					} catch (Exception e) {
						LogTool.error(e, this, "CrossTrialIO askUpload hid=" + hid);
					}
				}
				crossData.putObject(CrossTrialEnum.rankData.name(), rankList);
				crossData.putObject(CrossTrialEnum.zoneid.name(), GameProperties.getFirstZoneId());
				NettyWrite.writeXData(channel, CrossConst.CROSS_TRIAL_UPLOAD_RANK, crossData);
			}
		} catch (Exception e) {
			LogTool.error(e, CrossTrialIO.class, "CrossTrialIO askUpload");
		}
	}

	public void gmCrossTrialClear(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_TRIAL_CLEAR;
		try {
			CrossTrialCentralFunction.getIns().clearAll();
		} catch (Exception e) {
			LogTool.error(e, CrossTrialIO.class, "CrossTrialIO gmClear");
		}
	}

}
