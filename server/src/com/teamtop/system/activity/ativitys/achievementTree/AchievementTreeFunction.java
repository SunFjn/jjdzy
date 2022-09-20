package com.teamtop.system.activity.ativitys.achievementTree;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.achievementTree.model.AchievementTree;
import com.teamtop.system.activity.ativitys.achievementTree.model.GoalNumInfo;
import com.teamtop.system.destiny.model.DestinyBagData;
import com.teamtop.system.destiny.model.PersonalDestiny;
import com.teamtop.system.guanqia.Guanqia;
import com.teamtop.system.hero.FightCalcFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.huoShaoChiBi.HuoShaoChiBi;
import com.teamtop.system.liuChuQiShan.model.LiuChuQiShan;
import com.teamtop.system.monsterSpirit.model.MonsterSpiritEquip;
import com.teamtop.system.monsterSpirit.model.MonsterSpiritInfo;
import com.teamtop.system.monsterSpirit.model.MonsterSpiritModel;
import com.teamtop.system.peacockFloor.PeacockFloor;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.system.specialAnimalDir.model.SpecialAnimalDir;
import com.teamtop.system.specialAnimalDir.model.SpecialAnimalDirInfo;
import com.teamtop.system.wujiang.WuJiang;
import com.teamtop.system.wujiang.WuJiangModel;
import com.teamtop.util.log.LogTool;

import excel.config.Config_bztzf_261;
import excel.config.Config_hero_211;
import excel.config.Config_sb_750;
import excel.config.Config_son_267;
import excel.config.Config_sonstar_267;
import excel.struct.Struct_bztzf_261;
import excel.struct.Struct_cjs_769;
import excel.struct.Struct_hero_211;
import excel.struct.Struct_sb_750;
import excel.struct.Struct_son_267;
import excel.struct.Struct_sonstar_267;

public class AchievementTreeFunction {

	private static AchievementTreeFunction ins;

	private AchievementTreeFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized AchievementTreeFunction getIns() {
		if (ins == null) {
			ins = new AchievementTreeFunction();
		}
		return ins;
	}


	public void checkTask(Hero hero, AchievementTreeEnum type, int addNum, int parameter) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACHIEVEMENT_TREE_ACT)) {
				return;
			}
			AchievementTree model = (AchievementTree) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.ACHIEVEMENT_TREE_ACT);
			if (model == null) {
				return;
			}
			int periods = model.getPeriods();
			Map<Integer, Struct_cjs_769> map = AchievementTreeSysCache.getTypeTaskMap(periods).get(type.getType());
			if (map == null) {
				return;
			}
			long c1 = 0l;
			int c2 = 0;
			Map<Integer, Integer> msMap = null;
			Map<Integer, Integer> fwMap = null;
			Map<Integer, Integer> wjMap = null;
			Struct_bztzf_261 struct_bztzf_261 = null;
			Map<Integer, GoalNumInfo> goalNumMap = model.getGoalNumMap();
			int msType = type.getType();
			GoalNumInfo goalNumInfo = goalNumMap.get(msType);
			if (goalNumInfo == null) {
				goalNumInfo = new GoalNumInfo();
				goalNumMap.put(msType, goalNumInfo);
			}
			Map<Integer, Integer> goalMap = goalNumInfo.getGoalMap();
			if (goalMap == null) {
				goalMap = new HashMap<>();
				goalNumInfo.setGoalMap(goalMap);
			}
			switch (type) {
			case TASK_9:
				Map<Integer, Map<Integer, Integer>> addMap = model.getAddMap();
				Map<Integer, Integer> typeMap = addMap.get(msType);
				if (typeMap == null) {
					typeMap = new HashMap<>();
					addMap.put(msType, typeMap);
				}
				for (int i = 1; i <= parameter; i++) {
					Integer getNum = typeMap.get(i);
					if (getNum == null) {
						getNum = 0;
					}
					typeMap.put(i, getNum + addNum);
				}
				break;
			case TASK_20:
				Map<Integer, Map<Integer, Integer>> addMap0 = model.getAddMap();
				Map<Integer, Integer> map0 = addMap0.get(msType);
				if (map0 == null) {
					map0 = new HashMap<>();
					addMap0.put(msType, map0);
				}
				Integer getNum0 = map0.get(parameter);
				if (getNum0 == null) {
					getNum0 = 0;
				}
				map0.put(parameter, getNum0 + addNum);
				break;
			case TASK_22:
				PeacockFloor peacockFloor = hero.getPeacockFloor();
				if (peacockFloor != null) {
					goalNumInfo.setNum(peacockFloor.getFloorNum());
				}
				break;
			case TASK_23:
				Guanqia guanqia = hero.getGuanqia();
				if (guanqia != null) {
					goalNumInfo.setNum(guanqia.getCurGuanqia());
				}
				break;
			case TASK_24:
				HuoShaoChiBi huoShaoChiBi = hero.getHuoShaoChiBi();
				if (huoShaoChiBi != null) {
					goalNumInfo.setNum(huoShaoChiBi.getFloorNum());
				}
				break;
			case TASK_25:
				LiuChuQiShan liuChuQiShan = hero.getLiuChuQiShan();
				if (liuChuQiShan != null) {
					goalNumInfo.setNum((liuChuQiShan.getGqId() / 1000) - 1);
				}
				break;
			case TASK_28:
				struct_bztzf_261 = Config_bztzf_261.getIns().get(parameter);
				if (struct_bztzf_261 != null) {
					int pz = struct_bztzf_261.getPz();
					Map<Integer, Map<Integer, Integer>> addMap1 = model.getAddMap();
					Map<Integer, Integer> map1 = addMap1.get(msType);
					if (map1 == null) {
						map1 = new HashMap<>();
						addMap1.put(msType, map1);
					}
					for (int i = 1; i <= pz; i++) {
						Integer getNum1 = map1.get(i);
						if (getNum1 == null) {
							getNum1 = 0;
						}
						map1.put(i, getNum1 + addNum);
					}
				}
				break;
			case TASK_30:
				Map<Integer, Map<Integer, Integer>> addMap2 = model.getAddMap();
				Map<Integer, Integer> map2 = addMap2.get(msType);
				if (map2 == null) {
					map2 = new HashMap<>();
					addMap2.put(msType, map2);
				}
				for (int i = 1; i <= parameter; i++) {
					Integer getNum2 = map2.get(i);
					if (getNum2 == null) {
						getNum2 = 0;
					}
					map2.put(i, getNum2 + addNum);
				}
				break;
			case TASK_31:
				Map<Integer, Map<Integer, Integer>> addMap3 = model.getAddMap();
				Map<Integer, Integer> map3 = addMap3.get(msType);
				if (map3 == null) {
					map3 = new HashMap<>();
					addMap3.put(msType, map3);
				}
				Integer getNum3 = map3.get(parameter);
				if (getNum3 == null) {
					getNum3 = 0;
				}
				map3.put(parameter, getNum3 + addNum);
				break;
			case TASK_32:
				Map<Integer, Map<Integer, Integer>> addMap4 = model.getAddMap();
				Map<Integer, Integer> map4 = addMap4.get(msType);
				if (map4 == null) {
					map4 = new HashMap<>();
					addMap4.put(msType, map4);
				}
				for (int i = 1; i <= parameter; i++) {
					Integer getNum4 = map4.get(i);
					if (getNum4 == null) {
						getNum4 = 0;
					}
					map4.put(i, getNum4 + addNum);
				}
				break;
			case TASK_33:
				// 存八阵图的战力
				goalNumInfo.setNum(addNum);
				break;
			case TASK_34:
				SpecialAnimalDir specialAnimalDir = hero.getSpecialAnimalDir();
				int sum = 0;
				if (specialAnimalDir != null) {
					Map<Integer, SpecialAnimalDirInfo> infoMap = specialAnimalDir.getInfoMap();
					Iterator<Integer> iterator = infoMap.keySet().iterator();
					while (iterator.hasNext()) {
						Integer id = iterator.next();
						SpecialAnimalDirInfo specialAnimalDirInfo = infoMap.get(id);
						int step = specialAnimalDirInfo.getStep();
						sum += step;
					}
					goalNumInfo.setNum(sum);
				}
				break;
			case TASK_35:
				WuJiang wujiang = hero.getWujiang();
				int count = 0;
				if (wujiang != null) {
					Map<Integer, WuJiangModel> wujiangMap0 = wujiang.getWujiangs();
					Iterator<Integer> iterator = wujiangMap0.keySet().iterator();
					while (iterator.hasNext()) {
						Integer id = iterator.next();
						WuJiangModel wuJiangModel = wujiangMap0.get(id);
						int xiulianLv = wuJiangModel.getXiulianLv() / 10;
						count += xiulianLv;
						goalNumInfo.setNum(count);
					}
				}
				break;
			case TASK_36:
				MonsterSpiritModel monsterSpiritModel = hero.getMonsterSpiritModel();
				if (monsterSpiritModel != null) {
					msMap = new HashMap<>();
					Map<Integer, MonsterSpiritInfo> monsterSpiritMap = monsterSpiritModel.getMonsterSpiritMap();
					Iterator<Integer> iterator = monsterSpiritMap.keySet().iterator();
					while (iterator.hasNext()) {
						Integer id = iterator.next();
						MonsterSpiritInfo monsterSpiritInfo = monsterSpiritMap.get(id);
						if (monsterSpiritInfo != null) {
							Map<Integer, MonsterSpiritEquip> msEquipMap = monsterSpiritInfo.getMsEquipMap();
							Iterator<Integer> iterator2 = msEquipMap.keySet().iterator();
							while (iterator2.hasNext()) {
								Integer next = iterator2.next();
								MonsterSpiritEquip monsterSpiritEquip = msEquipMap.get(next);
								int start = monsterSpiritEquip.getStart();
								for (int i = 1; i <= start; i++) {
									Integer num = msMap.get(start);
									if (num == null) {
										num = 0;
									}
									msMap.put(i, num + 1);
								}
							}
						}
					}
				}
				break;
			case TASK_37:
				PersonalDestiny personalDestiny = hero.getPersonalDestiny();
				if (personalDestiny != null) {
					fwMap = new HashMap<>();
					ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, DestinyBagData>> bodyData = personalDestiny
							.getBodyData();
					ConcurrentHashMap<Integer, DestinyBagData> concurrentHashMap = bodyData.get(0);
					if (concurrentHashMap != null) {
						for (DestinyBagData destinyBagData : concurrentHashMap.values()) {
							if (destinyBagData.getDestinyId() != 0) {
								struct_bztzf_261 = Config_bztzf_261.getIns()
										.get(destinyBagData.getDestinyId());
								int destinypz = struct_bztzf_261.getPz();
								for (int i = 1; i <= destinypz; i++) {
									Integer num = fwMap.get(i);
									if (num == null) {
										num = 0;
									}
									fwMap.put(i, num + 1);
								}
							}
						}
					}
				}
				break;
			case TASK_38:
				WuJiang wujiang1 = hero.getWujiang();
				if (wujiang1 != null) {
					Map<Integer, WuJiangModel> wujiangMap = wujiang1.getWujiangs();
					wjMap = new HashMap<>();
					int num = 0;
					for (WuJiangModel wuJiangModel : wujiangMap.values()) {
						int type2 = wuJiangModel.getType();
						int pinzhi = Config_hero_211.getIns().get(type2).getPinzhi();
						int star = wuJiangModel.getStar();
						for (int i = 1; i <= pinzhi; i++) {
							if (wjMap.get(i) == null) {
								num = 0;
								wjMap.put(i, num);
							}
							num = star + wjMap.get(i);
							wjMap.put(i, num);
						}
					}
				}
				break;
			default:
				goalNumInfo.setNum(goalNumInfo.getNum() + addNum);
				break;
			}
			Map<Integer, Integer> taskMap = model.getGoalTaskMap().get(type.getType());
			if (taskMap == null) {
				taskMap = new HashMap<>();
				model.getGoalTaskMap().put(type.getType(), taskMap);
			}
			Iterator<Struct_cjs_769> iterator = map.values().iterator();
			Struct_cjs_769 cjs_769 = null;
			for (; iterator.hasNext();) {
				cjs_769 = iterator.next();
				c1 = cjs_769.getCs1();
				c2 = cjs_769.getCs2();
				if (taskMap.containsKey(cjs_769.getId())) {
					continue;
				}
				switch (type) {
				case TASK_9:
					Integer Num = model.getAddMap().get(type.getType()).get(c2);
					if (Num == null) {
						Num = 0;
					}
					goalMap.put(cjs_769.getId(), Num);
					if (Num >= c1) {
						taskMap.put(cjs_769.getId(), AchievementTreeConst.CAN_GET);
					}
					break;
				case TASK_20:
					Integer Num0 = model.getAddMap().get(type.getType()).get(c2);
					if (Num0 == null) {
						Num0 = 0;
					}
					goalMap.put(cjs_769.getId(), Num0);
					if (Num0 >= c1) {
						taskMap.put(cjs_769.getId(), AchievementTreeConst.CAN_GET);
					}
					break;
				case TASK_28:
					Map<Integer, Integer> map11 = model.getAddMap().get(type.getType());
					if(map11!=null) {
						Integer Num1 = map11.get(c2);
						if (Num1 == null) {
							Num1 = 0;
						}
						goalMap.put(cjs_769.getId(), Num1);
						if (Num1 >= c1) {
							taskMap.put(cjs_769.getId(), AchievementTreeConst.CAN_GET);
						}
					}
					break;
				case TASK_30:
					Integer Num2 = model.getAddMap().get(type.getType()).get(c2);
					if (Num2 == null) {
						Num2 = 0;
					}
					goalMap.put(cjs_769.getId(), Num2);
					if (Num2 >= c1) {
						taskMap.put(cjs_769.getId(), AchievementTreeConst.CAN_GET);
					}
					break;
				case TASK_31:
					Integer Num3 = model.getAddMap().get(type.getType()).get(c2);
					if (Num3 == null) {
						Num3 = 0;
					}
					goalMap.put(cjs_769.getId(), Num3);
					if (Num3 >= c1) {
						taskMap.put(cjs_769.getId(), AchievementTreeConst.CAN_GET);
					}
					break;
				case TASK_32:
					Integer Num4 = model.getAddMap().get(type.getType()).get(c2);
					if (Num4 == null) {
						Num4 = 0;
					}
					goalMap.put(cjs_769.getId(), Num4);
					if (Num4 >= c1) {
						taskMap.put(cjs_769.getId(), AchievementTreeConst.CAN_GET);
					}
					break;
				case TASK_36:
					Integer msNum = msMap.get((int) c2);
					if (msNum == null) {
						msNum = 0;
					}
					Map<Integer, Integer> goalMap1 = goalNumInfo.getGoalMap();
					goalMap1.put(cjs_769.getId(), msNum);
					if (msNum >= c1) {
						taskMap.put(cjs_769.getId(), AchievementTreeConst.CAN_GET);
					}
					break;
				case TASK_37:
					Integer fwNum = fwMap.get((int) c2);
					if (fwNum == null) {
						fwNum = 0;
					}
					Map<Integer, Integer> goalMap2 = goalNumInfo.getGoalMap();
					goalMap2.put(cjs_769.getId(), fwNum);
					if (fwNum >= c1) {
						taskMap.put(cjs_769.getId(), AchievementTreeConst.CAN_GET);
					}
					break;
				case TASK_38:
					Integer wjNum = wjMap.get((int) c2);
					if (wjNum == null) {
						wjNum = 0;
					}
					Map<Integer, Integer> goalMap3 = goalNumInfo.getGoalMap();
					goalMap3.put(cjs_769.getId(), wjNum);
					if (wjNum >= c1) {
						taskMap.put(cjs_769.getId(), AchievementTreeConst.CAN_GET);
					}
					break;
				default:
					if (goalNumInfo.getNum() >= c1) {
						taskMap.put(cjs_769.getId(), AchievementTreeConst.CAN_GET);
					}
					break;
				}
			}
			updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, AchievementTreeFunction.class, hid, hero.getName(),
					"AchievementTreeFunction checkTask, type=" + type);
		}
	}

	/**
	 * 检测所有类型任务
	 * 
	 * @param hero
	 */
	public void checkAllTask(Hero hero) {
		checkTask(hero, AchievementTreeEnum.TASK_20, 0, 0);
		checkTask(hero, AchievementTreeEnum.TASK_22, 0, 0);
		checkTask(hero, AchievementTreeEnum.TASK_23, 0, 0);
		checkTask(hero, AchievementTreeEnum.TASK_24, 0, 0);
		checkTask(hero, AchievementTreeEnum.TASK_25, 0, 0);
		checkTask(hero, AchievementTreeEnum.TASK_28, 0, 0);
		checkTask(hero, AchievementTreeEnum.TASK_30, 0, 0);
		checkTask(hero, AchievementTreeEnum.TASK_31, 0, 0);
		checkTask(hero, AchievementTreeEnum.TASK_32, 0, 0);
		// 计算八阵图战力
		FightCalcFunction.triggerCalcHeroEvent(hero, SystemIdConst.DESTINY_SYSID);
		checkTask(hero, AchievementTreeEnum.TASK_34, 0, 0);
		checkTask(hero, AchievementTreeEnum.TASK_35, 0, 0);
		checkTask(hero, AchievementTreeEnum.TASK_36, 0, 0);
		checkTask(hero, AchievementTreeEnum.TASK_37, 0, 0);
		checkTask(hero, AchievementTreeEnum.TASK_38, 0, 0);

	}

	/**
	 * 更新红点
	 * 
	 * @param hero
	 */
	public void updateRedPoint(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, ActivitySysId.ACHIEVEMENT_TREE_ACT)) {
				return;
			}
			boolean redPoint = checkRedPoint(hero);
			if (redPoint) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.ACHIEVEMENT_TREE_ACT,
						RedPointConst.RED_1,
						RedPointConst.HAS_RED);
			} else {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.ACHIEVEMENT_TREE_ACT,
						RedPointConst.RED_1,
						RedPointConst.NO_RED);
			}
		} catch (Exception e) {
			LogTool.error(e, AchievementTreeFunction.class, hero.getId(), hero.getName(),
					"AchievementTreeFunction checkRedPoint");
		}
	}

	/**
	 * 检测红点
	 * 
	 * @param hero
	 * @return
	 */
	public boolean checkRedPoint(Hero hero) {
		if (hero == null) {
			return false;
		}
		long hid = hero.getId();
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACHIEVEMENT_TREE_ACT)) {
				return false;
			}
			AchievementTree model = (AchievementTree) hero.getHeroActivityData().getActivityDataMap()
					.get(ActivitySysId.ACHIEVEMENT_TREE_ACT);
			Map<Integer, Integer> rewardMap = model.getRewardMap();
			Iterator<Integer> iterator2 = rewardMap.values().iterator();
			while (iterator2.hasNext()) {
				Integer state = iterator2.next();
				if (state != null && state == AchievementTreeConst.CAN_GET) {
					return true;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, AchievementTreeFunction.class, hero.getId(), hero.getName(),
					"AchievementTreeFunction checkRedPoint");
		}
		return false;
	}

	/**
	 * 道具增加事件
	 * 
	 * @param hero
	 * @return
	 */
	public void addFunctionHandle(Hero hero, int type, int itemId, long num) {
		if (hero == null) {
			return;
		}
		try {
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACHIEVEMENT_TREE_ACT)) {
				return;
			}
			List<Struct_hero_211> sortList = Config_hero_211.getIns().getSortList();
			Iterator<Struct_hero_211> iterator = sortList.iterator();
			while (iterator.hasNext()) {
				Struct_hero_211 next = iterator.next();
				int[][] activation = next.getActivation();
				if (activation[0][1] == itemId) {
					int pz = next.getPinzhi();
					AchievementTreeFunction.getIns().checkTask(hero, AchievementTreeEnum.TASK_30, (int) num, pz);
				}
			}
			List<Struct_son_267> sortList2 = Config_son_267.getIns().getSortList();
			Iterator<Struct_son_267> iterator2 = sortList2.iterator();
			while (iterator2.hasNext()) {
				Struct_son_267 next = iterator2.next();
				int id = next.getId() * 1000;
				Struct_sonstar_267 struct_sonstar_267 = Config_sonstar_267.getIns().get(id);
				if (struct_sonstar_267 != null) {
					int[][] conmuse = struct_sonstar_267.getConmuse();
					if (conmuse[0][1] == itemId) {
						AchievementTreeFunction.getIns().checkTask(hero, AchievementTreeEnum.TASK_31, (int) num,
								itemId);
					}
				}
			}
			List<Struct_sb_750> sortList1 = Config_sb_750.getIns().getSortList();
			Iterator<Struct_sb_750> iterator1 = sortList1.iterator();
			while (iterator1.hasNext()) {
				Struct_sb_750 next = iterator1.next();
				int[][] activation = next.getActivation();
				if (activation[0][1] == itemId) {
					int pz = next.getPinzhi();
					AchievementTreeFunction.getIns().checkTask(hero, AchievementTreeEnum.TASK_32, (int) num, pz);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, AchievementTreeFunction.class, hero.getId(), hero.getName(),
					"AchievementTreeFunction addFunctionHandle");
		}
	}

	/**
	 * Gm调层数
	 * 
	 * @param hero
	 * @param param
	 */
	public void GM(Hero hero, String[] param) {
		int num = Integer.parseInt(param[0]);
		if (hero == null) {
			return;
		}
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACHIEVEMENT_TREE_ACT)) {
			return;
		}
		AchievementTree model = (AchievementTree) hero.getHeroActivityData().getActivityDataMap()
				.get(ActivitySysId.ACHIEVEMENT_TREE_ACT);
		model.setFloor(num);
		int periods = model.getPeriods();
		Map<Integer, Integer> qsCjsjlMap = AchievementTreeSysCache.getQsCjsjlMap(periods);
		for (int i = 1; i < num; i++) {
			Integer index = qsCjsjlMap.get(i);
			Map<Integer, Integer> rewardMap = model.getRewardMap();
			Integer state = rewardMap.get(index);
			if (state == null) {
				state = 0;
			}
			if (state != AchievementTreeConst.ALREADY_GET) {
			rewardMap.put(index, AchievementTreeConst.CAN_GET);// 点亮本层任务后状态改为可领取
			}
		}
		updateRedPoint(hero);
		AchievementTreeManager.getIns().openUI(hero);
	}

}
