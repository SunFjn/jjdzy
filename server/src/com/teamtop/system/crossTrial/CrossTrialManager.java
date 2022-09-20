package com.teamtop.system.crossTrial;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.callback.Callback;
import com.teamtop.cross.upload.CrossHeroBaseModel;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.battle.BattleFunction;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.crossTrial.cross.CrossTrialEnum;
import com.teamtop.system.crossTrial.model.FightInfo;
import com.teamtop.system.crossTrial.model.FloorBuffInfo;
import com.teamtop.system.crossTrial.model.FloorFightInfo;
import com.teamtop.system.crossTrial.model.SelectBuff;
import com.teamtop.system.crossTrial.model.TrialModel;
import com.teamtop.system.daytask.DayTaskConst;
import com.teamtop.system.daytask.DayTaskFunction;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.fashionClothes.FashionClothesManager;
import com.teamtop.system.godWeapon.GodWeaponFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mount.Mount;
import com.teamtop.system.robot.RobotFunction;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_kfsl_767;
import excel.config.Config_slbx_767;
import excel.struct.Struct_slbx_767;
import io.netty.channel.Channel;

public class CrossTrialManager {

	private static CrossTrialManager ins;

	private CrossTrialManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized CrossTrialManager getIns() {
		if (ins == null) {
			ins = new CrossTrialManager();
		}
		return ins;
	}

	/**
	 * 打开界面
	 * @param hero
	 */
	public void openUI(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_TRIAL)) {
				return;
			}
			if (!checkTime(hid)) {
				return;
			}
			TrialModel trialModel = hero.getTrialModel();
			int floor = trialModel.getFloor();
			int passFloor = trialModel.getPassFloor();
			int historyFloor = trialModel.getHistoryFloor();
			int trailPoint = trialModel.getTrailPoint();
			int chestNum = 0;
			int tempFloor = floor;
			int maxFloor = Config_kfsl_767.getIns().size();
			if (floor > maxFloor) {
				tempFloor = maxFloor;
			}
			int lx = Config_kfsl_767.getIns().get(tempFloor).getLx();
			int fType = lx / 100;
			List<Object[]> enemyData = new ArrayList<>();
			if (fType == CrossTrialConst.FIGHT_FLOOR) {
				Map<Integer, CrossHeroBaseModel> enemyDetialMap = trialModel.getEnemyDetialMap();
				if (enemyDetialMap.size() > 0) {
					for (int type = 1; type <= 3; type++) {
						CrossHeroBaseModel model = enemyDetialMap.get(type);
						Mount mount = model.getMount();
						int mountId = 0;
						if(mount != null) {
							mountId = mount.getRideId();
						}
						int godWeapon = GodWeaponFunction.getIns().getNowGodWeapon(model);
						int body = FashionClothesManager.getIns().getBodyid(model.getJob(), model.getBodyModel());
						enemyData.add(new Object[] { model.getId(), type, model.getNameZoneid(),
								model.getTotalStrength(), body, godWeapon, mountId });
					}
				} else {
					Map<Integer, Long> enemyMap = trialModel.getEnemyMap();
					CrossData crossData = new CrossData();
					crossData.putObject(CrossTrialEnum.getenemy.name(), enemyMap);
					crossData.putObject(CrossTrialEnum.floor.name(), lx);
					Channel channel = Client_2.getIns().getCrossChannel();
					NettyWrite.writeXData(channel, CrossConst.CROSS_TRIAL_GET_ENEMY, crossData, new Callback() {

						@Override
						public void dataReci(Channel channel, CrossData crossData) {
							if (enemyMap.size() == 0) {
								Type classType = new TypeReference<Map<Integer, Long>>() {
								}.getType();
								Map<Integer, Long> typeEnemy = crossData.getObject(CrossTrialEnum.typeEnemy.name(),
										classType);
								enemyMap.putAll(typeEnemy);
							}
							callBackEnemyDataHandle(crossData, hero);
						}
					});
					return;
				}
			}
			if (fType == CrossTrialConst.CHEST_FLOOR) {
				Integer num = trialModel.getGetChestMap().get(floor);
				if (num != null) {
					chestNum = num;
				}
			}
			List<Object[]> buffData = new ArrayList<>();
			if (fType == CrossTrialConst.BUFF_FLOOR) {
				Map<Integer, SelectBuff> buffMap = trialModel.getBuffMap();
				for (int type = 1; type <= 3; type++) {
					SelectBuff selectBuff = buffMap.get(type);
					int[] is = selectBuff.getAttr();
					int state = selectBuff.getState();
					buffData.add(new Object[] { type, is[0], is[1], state });
				}
			}
			List<int[]> buffAttr = trialModel.getBuffAttr();
			List<Object[]> myBuffData = new ArrayList<>();
			if (buffAttr != null) {
				for (int[] arr : buffAttr) {
					myBuffData.add(new Object[] { arr[0], arr[1] });
				}
			}
			CrossTrialSender.sendCmd_10472(hid, floor, passFloor, historyFloor, trailPoint, chestNum,
					enemyData.toArray(),
					buffData.toArray(), myBuffData.toArray());
		} catch (Exception e) {
			LogTool.error(e, CrossTrialManager.class, hid, hero.getName(), "CrossTrialManager openUI");
		}
	}
	
	/**
	 * 中央服返回对手数据处理
	 * @param crossData
	 * @param hero
	 */
	public void callBackEnemyDataHandle(CrossData crossData, Hero hero) {
		try {
			long hid = hero.getId();
			TrialModel trialModel = hero.getTrialModel();
			int floor = trialModel.getFloor();
			int passFloor = trialModel.getPassFloor();
			int historyFloor = trialModel.getHistoryFloor();
			int trailPoint = trialModel.getTrailPoint();
			int chestNum = 0;
			int lx = Config_kfsl_767.getIns().get(floor).getLx();
			int fType = lx / 100;
			Map<Integer, CrossHeroBaseModel> enemyDetialMap = trialModel.getEnemyDetialMap();
			Map<Integer, Long> enemyMap = trialModel.getEnemyMap();
			List<Object[]> enemyData = new ArrayList<>();
			Type type = new TypeReference<Map<Integer, CrossHeroBaseModel>>() {}.getType();
			Map<Integer, CrossHeroBaseModel> tempEnemyDetialMap = crossData.getObject(CrossTrialEnum.enemyData.name(),
					type);
			if (tempEnemyDetialMap != null) {
				for (int eType = 1; eType <= 3; eType++) {
					CrossHeroBaseModel model = tempEnemyDetialMap.get(eType);
					if (model.getJob() == 0) {
						RobotFunction.getIns().setViewAndFightAttrTwo(hero, model);
					}
					Mount mount = model.getMount();
					int mountId = 0;
					if(mount != null) {
						mountId = mount.getRideId();
					}
					enemyMap.put(eType, model.getId());
					enemyDetialMap.putAll(tempEnemyDetialMap);
					int godWeapon = GodWeaponFunction.getIns().getNowGodWeapon(model);
					int body = FashionClothesManager.getIns().getBodyid(model.getJob(), model.getBodyModel());
					enemyData.add(new Object[] { model.getId(), eType, model.getNameZoneid(), model.getTotalStrength(),
							body, godWeapon, mountId });
				}
			}
			List<Object[]> buffData = new ArrayList<>();
			List<int[]> buffAttr = trialModel.getBuffAttr();
			List<Object[]> myBuffData = new ArrayList<>();
			if (buffAttr != null) {
				for (int[] arr : buffAttr) {
					myBuffData.add(new Object[] { arr[0], arr[1] });
				}
			}
			CrossTrialSender.sendCmd_10472(hid, floor, passFloor, historyFloor, trailPoint, chestNum,
					enemyData.toArray(),
					buffData.toArray(), myBuffData.toArray());
		} catch (Exception e) {
			LogTool.error(e, CrossTrialManager.class, hero.getId(), hero.getName(),
					"CrossTrialManager callBackEnemyDataHandle");
		}
	}

	public boolean checkTime(long hid) {
		int hour = TimeDateUtil.getHour();
		if (hour == 0) {
			int minute = TimeDateUtil.getMinute();
			if (minute < 5) {
				CrossTrialSender.sendCmd_10474(hid, 0, 4);
				return false;
			}
		}
		return true;
	}

	/**
	 * 挑战
	 * @param hero
	 * @param type 类型（1普通，2困难，3噩梦）
	 */
	public void challenge(Hero hero, int type) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_TRIAL)) {
				return;
			}
			if (!checkTime(hid)) {
				return;
			}
			TrialModel trialModel = hero.getTrialModel();
			int floor = trialModel.getFloor();
			int lx = Config_kfsl_767.getIns().get(floor).getLx();
			int fType = lx / 100;
			if (fType != CrossTrialConst.FIGHT_FLOOR) {
				// 不是战斗层
				CrossTrialSender.sendCmd_10474(hid, 0, 1);
				return;
			}
			int passFloor = trialModel.getPassFloor();
			int size = Config_kfsl_767.getIns().getSortList().size();
			if (passFloor >= size) {
				// 已达最高层
				CrossTrialSender.sendCmd_10474(hid, 0, 2);
				return;
			}
			if (floor == passFloor) {
				// 已通关
				CrossTrialSender.sendCmd_10474(hid, 0, 3);
				return;
			}
			Map<Long, FightInfo> fightMap = CrossTrialCache.getFightMap();
			if(fightMap.containsKey(hid)) {
				FightInfo fightInfo = fightMap.get(hid);
				int currentTime = TimeDateUtil.getCurrentTime();
				int time = fightInfo.getTime();
				int passTime = currentTime - time;
				if(passTime>300) {
					fightMap.remove(hid);
				}else {
					//战斗中
					CrossTrialSender.sendCmd_10474(hid, 0, 4);
					return;
				}
			}
			CrossHeroBaseModel model = trialModel.getEnemyDetialMap().get(type);
			FightInfo fightInfo = new FightInfo();
			fightInfo.setFloor(floor);
			fightInfo.setTime(TimeDateUtil.getCurrentTime());
			fightInfo.setModel(model);
			fightMap.put(hid, fightInfo);
			trialModel.setFightType(type);
			HeroFunction.getIns().sendBattleHeroAttr(hero, model);
			CrossTrialSender.sendCmd_10474(hid, 1, model.getId());
			// 每日任务
			DayTaskFunction.getIns().successDayTaskType(hero, DayTaskConst.DATTASK_TYPE32);
		} catch (Exception e) {
			LogTool.error(e, CrossTrialManager.class, hid, hero.getName(), "CrossTrialManager challenge");
			CrossTrialCache.getFightMap().remove(hid);
		}
	}

	/***
	 * 战斗结果
	 * @param hero
	 */
	public void fightEnd(Hero hero, int result) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_TRIAL)) {
				return;
			}
			TrialModel trialModel = hero.getTrialModel();
			Map<Long, FightInfo> fightMap = CrossTrialCache.getFightMap();
			if(!fightMap.containsKey(hid)) {
				return;
			}
			FightInfo tempFightInfo = fightMap.get(hid);
			int floor = tempFightInfo.getFloor();
			int lx = Config_kfsl_767.getIns().get(floor).getLx();
			int fType = lx / 100;
			List<Object[]> rewardData = new ArrayList<>();
			if (fType != CrossTrialConst.FIGHT_FLOOR) {
				// 不是战斗层
				CrossTrialSender.sendCmd_10476(hid, 0, rewardData.toArray());
				return;
			}
			int passFloor = trialModel.getPassFloor();
			int size = Config_kfsl_767.getIns().getSortList().size();
			if (passFloor >= size) {
				// 已达最高层
				CrossTrialSender.sendCmd_10476(hid, 0, rewardData.toArray());
				return;
			}
			if (floor == passFloor) {
				// 已通关
				CrossTrialSender.sendCmd_10476(hid, 0, rewardData.toArray());
				return;
			}
			long myTotalStrength = hero.getTotalStrength();
			int fightType = trialModel.getFightType();
			CrossHeroBaseModel model = tempFightInfo.getModel();
			long enermyStrength = model.getTotalStrength();
			int checkResult = BattleFunction.checkWinByFightForCrossTrial(myTotalStrength, enermyStrength,
					SystemIdConst.CROSS_TRIAL);
			if (checkResult == 0) {
				result = 0;
			}
			if (result == 1) {
				// 胜利
				Map<Integer, FloorFightInfo> map = CrossTrialCache.getFloorFigthMap().get(lx);
				FloorFightInfo fightInfo = map.get(fightType);
				int[][] reward = fightInfo.getReward();
				for (int[] info : reward) {
					rewardData.add(new Object[] { info[0], info[1], info[2] });
				}
				UseAddUtil.add(hero, reward, SourceGoodConst.CROSS_TRIAL_FIGHT_REWARD, UseAddUtil.getDefaultMail(),
						false);
				int rewardTrialPoint = fightInfo.getRewardTrialPoint();
				CrossTrialSender.sendCmd_10476(hid, result, rewardData.toArray());
				if(trialModel.getFloor()==floor) {					
					trialModel.setTrailPoint(trialModel.getTrailPoint() + rewardTrialPoint);
					nextFloor(hero);
				}
				int historyFloor = trialModel.getHistoryFloor();
				if (floor > historyFloor) {
					trialModel.setHistoryFloor(floor);
				}
			} else {
				CrossTrialSender.sendCmd_10476(hid, result, rewardData.toArray());
			}
		} catch (Exception e) {
			LogTool.error(e, CrossTrialManager.class, hid, hero.getName(), "CrossTrialManager fightEnd");
		} finally {
			CrossTrialCache.getFightMap().remove(hid);
		}
	}

	/**
	 * 扫荡
	 * @param hero
	 */
	public void mopUp(Hero hero, int type) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_TRIAL)) {
				return;
			}
			TrialModel trialModel = hero.getTrialModel();
			trialModel.setFightType(type);
			int floor = trialModel.getFloor();
			int lx = Config_kfsl_767.getIns().get(floor).getLx();
			int fType = lx / 100;
			List<Object[]> rewardData = new ArrayList<>();
			if (fType != CrossTrialConst.FIGHT_FLOOR) {
				// 不是战斗层
				CrossTrialSender.sendCmd_10476(hid, 0, rewardData.toArray());
				return;
			}
			int historyFloor = trialModel.getHistoryFloor();
			if (floor > (historyFloor - 10)) {
				return;
			}
			int passFloor = trialModel.getPassFloor();
			int size = Config_kfsl_767.getIns().getSortList().size();
			if (passFloor >= size) {
				// 已达最高层
				CrossTrialSender.sendCmd_10476(hid, 0, rewardData.toArray());
				return;
			}
			if (floor == passFloor) {
				// 已通关
				CrossTrialSender.sendCmd_10476(hid, 0, rewardData.toArray());
				return;
			}
			long myTotalStrength = hero.getTotalStrength();
			int fightType = trialModel.getFightType();
			CrossHeroBaseModel model = trialModel.getEnemyDetialMap().get(type);
			long enermyStrength = model.getTotalStrength();
			int checkResult = BattleFunction.checkWinByFightForCrossTrial(myTotalStrength, enermyStrength,
					SystemIdConst.CROSS_TRIAL);
			if (checkResult == 0) {
				return;
			}
			// 胜利
			Map<Integer, FloorFightInfo> map = CrossTrialCache.getFloorFigthMap().get(lx);
			FloorFightInfo fightInfo = map.get(fightType);
			int[][] reward = fightInfo.getReward();
			for (int[] info : reward) {
				rewardData.add(new Object[] { info[0], info[1], info[2] });
			}
			UseAddUtil.add(hero, reward, SourceGoodConst.CROSS_TRIAL_FIGHT_REWARD, UseAddUtil.getDefaultMail(), false);
			int rewardTrialPoint = fightInfo.getRewardTrialPoint();
			CrossTrialSender.sendCmd_10484(hid, rewardData.toArray());
			if (trialModel.getFloor() == floor) {
				trialModel.setTrailPoint(trialModel.getTrailPoint() + rewardTrialPoint);
				nextFloor(hero);
			}
			// 每日任务
			DayTaskFunction.getIns().successDayTaskType(hero, DayTaskConst.DATTASK_TYPE32);
		} catch (Exception e) {
			LogTool.error(e, CrossTrialManager.class, hid, hero.getName(), "CrossTrialManager mopUp");
		}
	}

	/**
	 * 选择buff
	 * @param opType 操作类型
	 * @param buffType buff类型
	 */
	public void selectBuff(Hero hero, Object[] buffTypes) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_TRIAL)) {
				return;
			}
			if (!checkTime(hid)) {
				return;
			}
			TrialModel trialModel = hero.getTrialModel();
			int trailPoint = trialModel.getTrailPoint();
			int floor = trialModel.getFloor();
			Map<Integer, SelectBuff> buffMap = trialModel.getBuffMap();
			int lx = Config_kfsl_767.getIns().get(floor).getLx();
			int fType = lx / 100;
			List<Object[]> buffData = new ArrayList<>();
			if (fType != CrossTrialConst.BUFF_FLOOR) {
				// 不是buff层
				CrossTrialSender.sendCmd_10478(hid, 0, buffData.toArray());
				return;
			}
			Map<Integer, FloorBuffInfo> map = CrossTrialCache.getFloorBuffMap().get(lx);
			int totalCost = 0;
			int[][] buffAttr = new int[0][];
			for (Object buffType : buffTypes) {
				int bType = ((Byte) buffType).intValue();
				FloorBuffInfo buffInfo = map.get(bType);
				int cost = buffInfo.getCost();
				totalCost += cost;
				buffData.add(new Object[] { buffType });
				SelectBuff selectBuff = buffMap.get(bType);
				int[] buff = selectBuff.getAttr();
				int[][] attr = new int[1][];
				attr[0] = buff;
				buffAttr = CommonUtil.arrayPlusArrays(buffAttr, attr);
			}
			if (trailPoint < totalCost) {
				// 试炼点不足
				CrossTrialSender.sendCmd_10478(hid, 0, buffData.toArray());
				return;
			}
			int leftTrailPoint = trailPoint - totalCost;
			trialModel.setTrailPoint(leftTrailPoint);
			List<int[]> nowBuff = trialModel.getBuffAttr();
			if (buffAttr.length > 0) {
				for (int[] attr : buffAttr) {
					nowBuff.add(attr);
				}
			}
			for (Object buffType : buffTypes) {
				int bType = ((Byte) buffType).intValue();
				SelectBuff selectBuff = buffMap.get(bType);
				selectBuff.setState(1);
			}
			LogTool.info(hid, hero.getName(), "CrossTrialManager selectBuff leftTrailPoint="+leftTrailPoint+", trailPoint="+trailPoint, this);
			CrossTrialSender.sendCmd_10478(hid, 1, buffData.toArray());
		} catch (Exception e) {
			LogTool.error(e, CrossTrialManager.class, hid, hero.getName(), "CrossTrialManager selectBuff");
		}
	}

	/**
	 * 领取宝箱奖励
	 */
	public void getChest(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_TRIAL)) {
				return;
			}
			if (!checkTime(hid)) {
				return;
			}
			List<Object[]> rewardData = new ArrayList<>();
			TrialModel trialModel = hero.getTrialModel();
			int floor = trialModel.getFloor();
			int lx = Config_kfsl_767.getIns().get(floor).getLx();
			int fType = lx / 100;
			if (fType != CrossTrialConst.CHEST_FLOOR) {
				// 不是宝箱层
				CrossTrialSender.sendCmd_10480(hid, 0, 1, rewardData.toArray());
				return;
			}
			Map<Integer, Integer> getChestMap = trialModel.getGetChestMap();
			Integer num = getChestMap.get(floor);
			Map<Integer, List<ProbabilityEventModel>> floorChestMap = CrossTrialCache.getFloorChestMap();
			if (num == null) {
				num = 0;
			} else {
				Struct_slbx_767 struct_slbx_767 = Config_slbx_767.getIns().get(lx);
				int sx = struct_slbx_767.getSx();
				if (num >= sx) {
					// 已达领取上限
					CrossTrialSender.sendCmd_10480(hid, 0, 2, rewardData.toArray());
					return;
				}
				int[][] xh = struct_slbx_767.getXh();
				if (!UseAddUtil.canUse(hero, xh)) {
					// 元宝不足
					CrossTrialSender.sendCmd_10480(hid, 0, 3, rewardData.toArray());
					return;
				}
				UseAddUtil.use(hero, xh, SourceGoodConst.CROSS_TRIAL_CHEST, true);
			}
			List<ProbabilityEventModel> proList = floorChestMap.get(lx);
			num += 1;
			getChestMap.put(floor, num);
			List<int[]> rewardList = new ArrayList<>();
			String nameZoneid = hero.getNameZoneid();
			for (ProbabilityEventModel proModel : proList) {
				int[] reward = (int[]) ProbabilityEventUtil.getEventByProbability(proModel);
				if (reward != null) {
					rewardList.add(reward);
					rewardData.add(new Object[] { reward[0], reward[1], reward[2] });
					if (reward[4] == 1) {
						// 广播
						ChatManager.getIns().broadCast(ChatConst.CROSS_TRIAL_CHEST,
								new Object[] { nameZoneid, reward[1], reward[2] });
					}
				}
			}
			int maxFloor = Config_kfsl_767.getIns().size();
			if (floor == maxFloor) {
				trialModel.setHistoryFloor(maxFloor);
			}
			int[][] rewardArr = new int[rewardList.size()][];
			rewardList.toArray(rewardArr);
			UseAddUtil.add(hero, rewardArr, SourceGoodConst.CROSS_TRIAL_CHEST, UseAddUtil.getDefaultMail(), false);
			CrossTrialSender.sendCmd_10480(hid, 1, num, rewardData.toArray());
		} catch (Exception e) {
			LogTool.error(e, CrossTrialManager.class, hid, hero.getName(), "CrossTrialManager getChest");
		}
	}

	/**
	 * 下一层
	 */
	public void nextFloor(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_TRIAL)) {
				return;
			}
			if (!checkTime(hid)) {
				return;
			}
			TrialModel trialModel = hero.getTrialModel();
			int floor = trialModel.getFloor();
			int maxFloor = Config_kfsl_767.getIns().size();
			if (floor > maxFloor) {
				return;
			}
			int historyFloor = trialModel.getHistoryFloor();
			if (floor > historyFloor) {
				trialModel.setHistoryFloor(floor);
			}
			int newFloor = floor + 1;
			trialModel.setPassFloor(floor);
			trialModel.setFloor(newFloor);
			if (floor == maxFloor) {
				openUI(hero);
			}
			int newlx = Config_kfsl_767.getIns().get(newFloor).getLx();
			int newFType = newlx / 100;
			if (newFType == CrossTrialConst.FIGHT_FLOOR) {
				CrossData crossData = new CrossData();
				crossData.putObject(CrossTrialEnum.floor.name(), newlx);
				Channel channel = Client_2.getIns().getCrossChannel();
				NettyWrite.writeXData(channel, CrossConst.CROSS_TRIAL_NEXT_ENEMY, crossData, new Callback() {
					
					@Override
					public void dataReci(Channel channel, CrossData crossData) {
						callBackEnemyDataHandle(crossData, hero);
					}
				});
			}
			if (newFType == CrossTrialConst.BUFF_FLOOR) {
				Map<Integer, FloorBuffInfo> map = CrossTrialCache.getFloorBuffMap().get(newlx);
				Map<Integer, SelectBuff> buffMap = trialModel.getBuffMap();
				for (int type = 1; type <= 3; type++) {
					int[] buff = map.get(type).getBuff();
					SelectBuff selectBuff = new SelectBuff();
					selectBuff.setAttr(buff);
					buffMap.put(type, selectBuff);
				}
				openUI(hero);
			}
			if (newFType == CrossTrialConst.CHEST_FLOOR) {
				openUI(hero);
			}
		} catch (Exception e) {
			LogTool.error(e, CrossTrialManager.class, hid, hero.getName(), "CrossTrialManager nextFloor");
		}
	}

}
