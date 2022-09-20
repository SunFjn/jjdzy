package com.teamtop.system.boss.personalBoss;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.ativitys.doubleProduce.DoubleProduceFunction;
import com.teamtop.system.activity.ativitys.warOrder.WarOrderEnum;
import com.teamtop.system.activity.ativitys.warOrder.WarOrderFunction;
import com.teamtop.system.bag.BagFunction;
import com.teamtop.system.battle.BattleConst;
import com.teamtop.system.battle.BattleFunction;
import com.teamtop.system.boss.Boss;
import com.teamtop.system.boss.personalBoss.model.BossInfo;
import com.teamtop.system.boss.personalBoss.model.PersonalBoss;
import com.teamtop.system.daytask.DayTaskConst;
import com.teamtop.system.daytask.DayTaskFunction;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.openDaysSystem.warOrder.WarOrderNewEnum;
import com.teamtop.system.openDaysSystem.warOrder.WarOrderNewFunction;
import com.teamtop.system.task.TaskUserConst;
import com.teamtop.system.task.TaskUserFunction;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_solo_220;
import excel.struct.Struct_solo_220;

public class PersonalBossManager {

	private static PersonalBossManager personalBossManager;

	private PersonalBossManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized PersonalBossManager getIns() {
		if (personalBossManager == null) {
			personalBossManager = new PersonalBossManager();
		}
		return personalBossManager;
	}

	/**
	 * 打开个人boss界面
	 * 
	 * @param hero
	 */
	public void openBoss(Hero hero) {
		if (hero == null) {
			return;
		}
		try {
			Boss boss = hero.getBoss();
			if (boss == null) {
				return;
			}
			PersonalBoss personalBoss = boss.getPersonalBoss();
			if (personalBoss == null) {
				personalBoss = new PersonalBoss();
				Map<Integer, BossInfo> bossMap = new HashMap<>();
				personalBoss.setBossMap(bossMap);
				boss.setPersonalBoss(personalBoss);
			}
			int currentTime = TimeDateUtil.getCurrentTime();
			List<Object[]> bossInfo = new ArrayList<>();
			List<Struct_solo_220> sortList = Config_solo_220.getIns().getSortList();
			int size = sortList.size();
			Map<Integer, BossInfo> bossMap = personalBoss.getBossMap();
			BossInfo info = null;
			int bossId = 0;
			int leftTime = 0;// 冷却时间
			int leftCha = 0;// 剩余挑战次数
			Struct_solo_220 solo = null;
			for (int i = 0; i < size; i++) {
				leftTime = 0;
				solo = sortList.get(i);
				bossId = solo.getId();
				info = bossMap.get(bossId);
				if (info != null) {
					if (info.getLastChallengeTime()>0) {
						if ((currentTime - info.getLastChallengeTime())<0) {
							info.setLastChallengeTime(0);
						}
						if ((currentTime - info.getLastChallengeTime())<solo.getTime()) {
							leftTime=solo.getTime()-currentTime + info.getLastChallengeTime();
						}
					}
					leftCha = solo.getFight() - info.getChallengeNum();
					bossInfo.add(new Object[] { bossId, leftCha, leftTime, info.getIswin() });
				} else {
					bossInfo.add(new Object[] { bossId, solo.getFight(), 0, 0 });
				}
			}
			PersonalBossSender.sendCmd_1252(hero.getId(), bossInfo.toArray());
		} catch (Exception e) {
			LogTool.error(e, PersonalBossManager.class, hero.getId(), hero.getName(), "PersonalBoss openBoss fail");
		}
	}

	/**
	 * 请求挑战boss
	 * 
	 * @param hero
	 * @param bossId
	 */
	public void challengeBoss(Hero hero, int bossId) {
		if (hero == null) {
			return;
		}
		try {
			Boss boss = hero.getBoss();
			if (boss == null) {
				return;
			}
			long hid = hero.getId();
			PersonalBoss personalBoss = boss.getPersonalBoss();
			if (personalBoss == null) {
				personalBoss = new PersonalBoss();
				Map<Integer, BossInfo> bossMap = new HashMap<>();
				personalBoss.setBossMap(bossMap);
				boss.setPersonalBoss(personalBoss);
			}
			int equipEmptyGrid = BagFunction.getIns().getEquipEmptyGrid(hero, BagFunction.getIns().getEquipData(hero));
			if (equipEmptyGrid < PersonalBossConst.BAG_EMPTY_GRID_NUM) {
				// 装备背包格子不足
				PersonalBossSender.sendCmd_1254(hid, 0, 1, 0);
				return;
			}
			Struct_solo_220 solo = Config_solo_220.getIns().get(bossId);
			int[][] con = solo.getCon();
			if (!checkCondition(hero, con)) {
				// boss未开启
				PersonalBossSender.sendCmd_1254(hid, 0, 2, 0);
				return;
			}
			Map<Integer, BossInfo> bossMap = personalBoss.getBossMap();
			BossInfo bossInfo = bossMap.get(bossId);
			if (bossInfo == null) {
				bossInfo = new BossInfo();
				bossInfo.setBossId(bossId);
				bossMap.put(bossId, bossInfo);
			}
			int challengeNum = bossInfo.getChallengeNum();
			if (challengeNum >= solo.getFight()) {
				// 已无挑战次数
				PersonalBossSender.sendCmd_1254(hid, 0, 3, 0);
				return;
			}
			int currentTime = TimeDateUtil.getCurrentTime();
			int cdTime = solo.getTime() - (currentTime - bossInfo.getLastChallengeTime());
			if (cdTime > 0) {
				// boss未复活
				PersonalBossSender.sendCmd_1254(hid, 0, 4, 0);
				return;
			}
			
			int npcid = solo.getBoss()[0][1];
			int result = BattleFunction.checkWinBoss(hero, npcid, BattleConst.OTHER);

			PersonalBossSender.sendCmd_1254(hid, 1, bossId, result);
		} catch (Exception e) {
			LogTool.error(e, PersonalBossManager.class, hero.getId(), hero.getName(),
					"PersonalBoss challengeBoss fail");
		}
	}

	private boolean checkCondition(Hero hero, int[][] condition) {
		if (hero.getRealLevel() >= condition[0][0] && hero.getRebornlv() >= condition[0][1]) {
			return true;
		}
		return false;
	}

	/**
	 * 战斗结束 请求结算
	 * 
	 * @param hero
	 * @param result
	 * @param bossId
	 */
	public void beatBossWin(Hero hero, int result, int bossId) {
		if (hero == null) {
			return;
		}
		if (result==0) {
			return;
		}
		try {
			Boss boss = hero.getBoss();
			if (boss == null) {
				return;
			}
			long hid = hero.getId();
			PersonalBoss personalBoss = boss.getPersonalBoss();
			if (personalBoss == null) {
				personalBoss = new PersonalBoss();
				Map<Integer, BossInfo> bossMap = new HashMap<>();
				personalBoss.setBossMap(bossMap);
				boss.setPersonalBoss(personalBoss);
			}
			Map<Integer, BossInfo> bossMap = personalBoss.getBossMap();
			BossInfo bossInfo = bossMap.get(bossId);
			if (bossInfo == null) {
				// （防止直接发送协议非法操作）
				return;
			}
			Struct_solo_220 solo = Config_solo_220.getIns().get(bossId);
			int challengeNum = bossInfo.getChallengeNum();
			if (challengeNum >= solo.getFight()) {
				// 已无挑战次数（防止直接发送协议非法操作）
				return;
			}
			int currentTime = TimeDateUtil.getCurrentTime();
			int cdTime = solo.getTime() - (currentTime - bossInfo.getLastChallengeTime());
			if (cdTime > 0) {
				// boss未复活（防止直接发送协议非法操作）
				return;
			}
			int npcid = solo.getBoss()[0][1];
			int checkResult = BattleFunction.checkWinBoss(hero, npcid, BattleConst.OTHER);
			if (checkResult == 2) {
				checkResult = result;
			}
			if (checkResult == 0) {
				PersonalBossSender.sendCmd_1256(hid, bossId, 0, null);
				return;
			}
			List<Object[]> dropTips = new ArrayList<Object[]>();
			List<Object[]> dropTips2 = new ArrayList<Object[]>();
			List<ProbabilityEventModel> pelist = PersonalBossCache.getBossDropMap().get(bossId);
			int size = pelist.size();
			List<int[]> dropArr = new ArrayList<int[]>();
			boolean isDoubel = DoubleProduceFunction.getIns().checkIsStart(hero);
			for (int i = 0; i < size; i++) {
				ProbabilityEventModel pe = pelist.get(i);
				int[] js = (int[]) ProbabilityEventUtil.getEventByProbability(pe);
				if (js != null) {
					int type = js[0];
					if (type == GameConst.GENDROP) {
						int num = js[2];
						ProbabilityEventModel droppe = HeroCache.getDrop(js[1]);
						for (int j = 1; j <= num; j++) {
							js = (int[]) ProbabilityEventUtil.getEventByProbability(droppe);
							dropArr.add(js);
							dropTips.add(new Object[] { js[0], js[1], js[2] ,0});
							if(isDoubel) {
								dropArr.add(js);
								dropTips2.add(new Object[] { js[0], js[1], js[2] ,4});
							}
						}
					} else {
						dropArr.add(js);
						dropTips.add(new Object[] { js[0], js[1], js[2] ,0});
						if(isDoubel) {
							dropArr.add(js);
							dropTips2.add(new Object[] { js[0], js[1], js[2] ,4});
						}
					}
				}
			}
			if(!dropTips2.isEmpty()) {
				dropTips.addAll(0, dropTips2);
			}
			int[][] drops = new int[dropArr.size()][];
			dropArr.toArray(drops);
			if (UseAddUtil.canAdd(hero, drops, false)) {
				UseAddUtil.add(hero, drops, SourceGoodConst.PERSONAL_BOSS_DROP, null, false);
			}
			int newCha = bossInfo.getChallengeNum() + 1;
			bossInfo.setChallengeNum(newCha);// 已挑战次数
			bossInfo.setIswin(1);
			int leftCha = solo.getFight()-newCha;
			bossInfo.setLastChallengeTime(TimeDateUtil.getCurrentTime());// 最后一次挑战时间

			PersonalBossSender.sendCmd_1256(hid, bossId, leftCha, dropTips.toArray());
			//任务
			TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_19, 1);
			//每日任务
			DayTaskFunction.getIns().successDayTaskType(hero, DayTaskConst.DATTASK_TYPE11);
			// 犒赏三军(活动)
			WarOrderFunction.getIns().updateTaskNum(hero, WarOrderEnum.GOAL_5, 1);
			// 犒赏三军(开服)
			WarOrderNewFunction.getIns().updateTaskNum(hero, WarOrderNewEnum.GOAL_5, 1);
		} catch (Exception e) {
			LogTool.error(e, PersonalBossManager.class, hero.getId(), hero.getName(), "");
		}
	}

	/**
	 * 扫荡
	 * 
	 * @param hero
	 */
	public void mopUp(Hero hero) {
		if (hero == null) {
			return;
		}
		try {
			Boss boss = hero.getBoss();
			if (boss == null) {
				return;
			}
			long hid = hero.getId();
			PersonalBoss personalBoss = boss.getPersonalBoss();
			if (personalBoss == null) {
				personalBoss = new PersonalBoss();
				Map<Integer, BossInfo> bossMap = new HashMap<>();
				personalBoss.setBossMap(bossMap);
				boss.setPersonalBoss(personalBoss);
			}
			int currentTime = TimeDateUtil.getCurrentTime();
			List<Integer> mopUpBossList = new ArrayList<>();
			List<Object[]> bossList = new ArrayList<>();
			Map<Integer, BossInfo> bossMap = personalBoss.getBossMap();
			List<Struct_solo_220> sortList = Config_solo_220.getIns().getSortList();
			int size = sortList.size();
			BossInfo bossInfo = null;
			for (int i = 0; i < size; i++) {
				Struct_solo_220 solo = sortList.get(i);
				int bossId = solo.getId();
				bossInfo = bossMap.get(bossId);
				// 通关过一次才能扫荡
				if (bossInfo == null) {
					continue;
				}
				if (bossInfo.getIswin()==0) {
					continue;
				}
				int cdTime = solo.getTime() - (currentTime - bossInfo.getLastChallengeTime());
				if (cdTime > 0) {
					// boss未复活
					continue;
				}
				if (bossInfo.getChallengeNum() >=solo.getFight()) {
					continue;
				}
				int newCha = bossInfo.getChallengeNum() + 1;
				bossInfo.setChallengeNum(newCha);
				bossInfo.setLastChallengeTime(currentTime);
				mopUpBossList.add(bossId);
				int leftCha = solo.getFight()-newCha;
				bossList.add(new Object[] { bossId, leftCha });
			}
			Map<Integer, Map<Integer, Integer>> dropMap = new HashMap<>();
			size = mopUpBossList.size();
			if(size==0) {
				return;
			}
			boolean isDoubel = DoubleProduceFunction.getIns().checkIsStart(hero);
			for (int i = 0; i < size; i++) {
				int bossId = mopUpBossList.get(i);
				List<ProbabilityEventModel> pelist = PersonalBossCache.getBossDropMap().get(bossId);
				int peSize = pelist.size();
				for (int n = 0; n < peSize; n++) {
					ProbabilityEventModel pe = pelist.get(n);
					int[] js = (int[]) ProbabilityEventUtil.getEventByProbability(pe);
					if (js != null) {
						int type = js[0];
						if (type == GameConst.GENDROP) {
							int num = js[2];
							ProbabilityEventModel droppe = HeroCache.getDrop(js[1]);
							for (int j = 1; j <= num; j++) {
								js = (int[]) ProbabilityEventUtil.getEventByProbability(droppe);
								addToDropMap(dropMap, js);
								if(isDoubel) {
									addToDropMap(dropMap, js);
								}
							}
						} else {
							addToDropMap(dropMap, js);
							if(isDoubel) {
								addToDropMap(dropMap, js);
							}
						}
					}
				}
			}
			Object[] objs = dropMapToArr(dropMap);
			int[][] drops = (int[][]) objs[0];
			@SuppressWarnings("unchecked")
			List<Object[]> dropTips = (List<Object[]>) objs[1];
			if (UseAddUtil.canAdd(hero, drops, false)) {
				UseAddUtil.add(hero, drops, SourceGoodConst.PERSONAL_BOSS_DROP, null, false);
			}
			PersonalBossSender.sendCmd_1258(hid, bossList.toArray(), dropTips.toArray());
			//任务
			TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_19, 1);
			//每日任务
			DayTaskFunction.getIns().successDayTaskType(hero, DayTaskConst.DATTASK_TYPE11);
			// 犒赏三军(活动)
			WarOrderFunction.getIns().updateTaskNum(hero, WarOrderEnum.GOAL_5, 1);
			// 犒赏三军(开服)
			WarOrderNewFunction.getIns().updateTaskNum(hero, WarOrderNewEnum.GOAL_5, 1);
		} catch (Exception e) {
			LogTool.error(e, PersonalBossManager.class, hero.getId(), hero.getName(), "");
		}
	}

	private void addToDropMap(Map<Integer, Map<Integer, Integer>> dropMap, int[] js) {
		Map<Integer, Integer> map = dropMap.get(js[0]);
		if (map == null) {
			map = new HashMap<>();
			dropMap.put(js[0], map);
		}
		Integer value = map.get(js[1]);
		if (value == null) {
			value = 0;
		}
		map.put(js[1], value + js[2]);
	}

	private Object[] dropMapToArr(Map<Integer, Map<Integer, Integer>> dropMap) {
		List<int[]> dropArr = new ArrayList<int[]>();
		List<Object[]> dropTips = new ArrayList<Object[]>();
		Iterator<Integer> iterator = dropMap.keySet().iterator();
		Map<Integer, Integer> map = null;
		Iterator<Entry<Integer, Integer>> infoIterator = null;
		Entry<Integer, Integer> entry = null;
		for (; iterator.hasNext();) {
			int type = iterator.next();
			map = dropMap.get(type);
			infoIterator = map.entrySet().iterator();
			for (; infoIterator.hasNext();) {
				entry = infoIterator.next();
				dropArr.add(new int[] { type, entry.getKey(), entry.getValue() });
				dropTips.add(new Object[] { type, entry.getKey(), entry.getValue() });
			}
		}
		int[][] drops = new int[dropArr.size()][];
		dropArr.toArray(drops);
		return new Object[] { drops, dropTips };
	}

}
