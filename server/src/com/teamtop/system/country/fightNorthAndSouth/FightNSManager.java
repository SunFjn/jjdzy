package com.teamtop.system.country.fightNorthAndSouth;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.activity.ativitys.achievementTree.AchievementTreeEnum;
import com.teamtop.system.activity.ativitys.achievementTree.AchievementTreeFunction;
import com.teamtop.system.activity.ativitys.hefuRechargeBack.HeFuRechargeBackConst;
import com.teamtop.system.activity.ativitys.hefuRechargeBack.HeFuRechargeBackFunction;
import com.teamtop.system.activity.ativitys.warOrder.WarOrderEnum;
import com.teamtop.system.activity.ativitys.warOrder.WarOrderFunction;
import com.teamtop.system.activity.ativitys.wuJiangGoal.WuJiangGoalEnum;
import com.teamtop.system.activity.ativitys.wuJiangGoal.WuJiangGoalFunction;
import com.teamtop.system.battle.BattleConst;
import com.teamtop.system.battle.BattleFunction;
import com.teamtop.system.country.CountryType;
import com.teamtop.system.country.fightNorthAndSouth.model.CountryScoreRank;
import com.teamtop.system.country.fightNorthAndSouth.model.FightNSModel;
import com.teamtop.system.country.fightNorthAndSouth.model.FightNSScoreRank;
import com.teamtop.system.country.model.CountryData;
import com.teamtop.system.country.newkingship.NewKingShipFunction;
import com.teamtop.system.daytask.DayTaskConst;
import com.teamtop.system.daytask.DayTaskFunction;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.godOfWar.GodOfWarConst;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroConst;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.openDaysSystem.monsterKingDailyActive.MonsterKingDailyActiveEnum;
import com.teamtop.system.openDaysSystem.monsterKingDailyActive.MonsterKingDailyActiveFunction;
import com.teamtop.system.openDaysSystem.saintMonsterDailyActive.SaintMonsterDailyActiveEnum;
import com.teamtop.system.openDaysSystem.saintMonsterDailyActive.SaintMonsterDailyActiveFunction;
import com.teamtop.system.openDaysSystem.shaozhugoldpig.ShaoZhuGoldPigConst;
import com.teamtop.system.openDaysSystem.shaozhugoldpig.ShaoZhuGoldPigFunction;
import com.teamtop.system.openDaysSystem.warOrder.WarOrderNewEnum;
import com.teamtop.system.openDaysSystem.warOrder.WarOrderNewFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.system.setting.SettingConst;
import com.teamtop.system.taoyuanSworn.TaoyuanSwornFunction;
import com.teamtop.system.taoyuanSworn.TaoyuanSwornTaskConst;
import com.teamtop.system.task.TaskUserConst;
import com.teamtop.system.task.TaskUserFunction;
import com.teamtop.system.vip.VipAddType;
import com.teamtop.system.vip.VipConst;
import com.teamtop.system.vip.VipFunction;
import com.teamtop.util.ProbabilityEvent.RandomUtil;
import com.teamtop.util.illiegalUtil.IlliegalUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_NPC_200;
import excel.config.Config_nzbzpoint_226;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_NPC_200;
import excel.struct.Struct_nzbzpoint_226;

public class FightNSManager {

	private static FightNSManager fightNSManager;

	private FightNSManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized FightNSManager getIns() {
		if (fightNSManager == null) {
			fightNSManager = new FightNSManager();
		}
		return fightNSManager;
	}

	/**
	 * 打开南征北战
	 * 
	 * @param hero
	 */
	public void openFightNS(Hero hero) {
		if (hero == null) {
			return;
		}
		try {
			long hid = hero.getId();
			int countryType = hero.getCountryType();
			if (countryType == 0) {
				return;
			}
			CountryData countryData = hero.getCountryData();
			FightNSModel fightNSModel = countryData.getFightNSModel();
			if (fightNSModel == null) {
				if (!HeroFunction.getIns().checkSystemOpen(hero, FightNSConst.SysId)) {
					return;
				}
				fightNSModel = FightNSFunction.getIns().initFightNSModel(hero);
			}
			int official = hero.getOfficial();
			int myRanking = getMyRank(hero);
			int countryRanking = 0;
			int tempCountryRanking = 1;
			List<CountryScoreRank> countryScoreRankList = FightNSSysCache.getCountryScoreRankList();
			boolean allZero = true;
			for (CountryScoreRank rank : countryScoreRankList) {
				if (rank.getTotalScore() != 0) {
					allZero = false;
				}
			}
			for (CountryScoreRank rank : countryScoreRankList) {
				if (rank.getCountryType() == countryType) {
					countryRanking = tempCountryRanking;
					break;
				}
				tempCountryRanking++;
			}
			if (allZero) {
				countryRanking = 0;
			}

			checkCdTime(fightNSModel);
			int score = fightNSModel.getScore();
			int chaNum = fightNSModel.getChaNum();
			int buyCha = fightNSModel.getBuyCha();
			int leftBuy = FightNSConst.BUY_LIMIT - buyCha;
			int cdTime = fightNSModel.getCdTime();
			int needCdTime = 0;
			if (cdTime > 0) {
				int currentTime = TimeDateUtil.getCurrentTime();
				int passTime = currentTime - cdTime;
				if (passTime < 0) {
					passTime = 0;
					fightNSModel.setCdTime(currentTime);
				}
				needCdTime = FightNSConst.CD_TIME - passTime;
			}
			// 刷新对手
			List<FightNSScoreRank> refreshRival = refreshRivale(hero, countryType);
			List<Object[]> enemyList = new ArrayList<>();
			for (FightNSScoreRank rank : refreshRival) {
				Object[] award = getCountryAward(rank.getCountryType(), rank.getHid());
				enemyList.add(new Object[] { rank.getHid(), rank.getName(), rank.getJob(), rank.getLevel(),
						rank.getIcon(), rank.getFrame(), rank.getCountryType(), rank.getOfficial(), rank.getStrength(),
						award[0], award[1] });
			}
			// 已领取积分奖励
			Set<Integer> scoreAward = fightNSModel.getScoreAward();
			List<Object[]> awardList = new ArrayList<>();
			for (int scoreId : scoreAward) {
				awardList.add(new Object[] { scoreId });
			}
			FightNSSender.sendCmd_1572(hid, official, myRanking, countryRanking, score, chaNum, leftBuy, needCdTime,
					enemyList.toArray(), awardList.toArray());
		} catch (Exception e) {
			LogTool.error(e, FightNSManager.class, hero.getId(), hero.getName(), "FightNSManager openFightNS");
		}
	}

	public int getMyRank(Hero hero) {
		int myRanking = 0;
		try {
			long hid = hero.getId();
			List<FightNSScoreRank> rankList = FightNSSysCache.getRankList();
			int size = rankList.size();
			for (int i = 0; i < size; i++) {
				FightNSScoreRank rank = rankList.get(i);
				if (rank.getHid() == hid) {
					myRanking = i + 1;
					break;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, FightNSManager.class, hero.getId(), hero.getName(), "FightNSManager getMyRank");
		}
		return myRanking;
	}

	private Object[] getCountryAward(int countryType, long hid) {
		Object[] objs = new Object[2];
		int type = 0;
		if (NewKingShipFunction.getIns().isKing(countryType, hid)) {
			type = 1;
		} else if (NewKingShipFunction.getIns().isPrimeMinister(countryType, hid)
				|| NewKingShipFunction.getIns().isBigGeneral(countryType, hid)) {
			type = 2;
		}
		if (type == 1) {
			objs[0] = FightNSConst.BIG_SCORE;
			objs[1] = FightNSConst.BIG_AWARD;
		} else if (type == 2) {
			objs[0] = FightNSConst.MIDDLE_SCORE;
			objs[1] = FightNSConst.MIDDLE_AWARD;
		} else {
			objs[0] = FightNSConst.SMALL_SCORE;
			objs[1] = FightNSConst.SMALL_AWARD;
		}
		return objs;
	}

	public void checkCdTime(FightNSModel fightNSModel) {
		int chaNum = fightNSModel.getChaNum();
		if (chaNum >= getMaxCha()) {
			fightNSModel.setCdTime(0);
			return;
		}
		int cdTime = fightNSModel.getCdTime();
		int currentTime = TimeDateUtil.getCurrentTime();
		int passTime = currentTime - cdTime;
		if (passTime > FightNSConst.CD_TIME) {
			int addNum = passTime / FightNSConst.CD_TIME;
			chaNum = chaNum + addNum;
			if (chaNum >= getMaxCha()) {
				fightNSModel.setChaNum(getMaxCha());
				fightNSModel.setCdTime(0);
			} else {
				fightNSModel.setChaNum(chaNum);
				fightNSModel.setCdTime(cdTime + FightNSConst.CD_TIME * addNum);
			}
		}
	}

	public List<FightNSScoreRank> refreshRivale(Hero myHero, int countryType) {
		boolean mainTaskFinish = true;
		int taskid = myHero.getTaskUser().getTaskid();
		int rbTaskId = Config_xtcs_004.getIns().get(FightNSConst.T_CS_INDEX).getNum();
		if (taskid <= rbTaskId) {
			mainTaskFinish = false;
		}
		List<FightNSScoreRank> rivalList = new ArrayList<>();
		Map<Integer, Map<Long, FightNSScoreRank>> randomMap = FightNSSysCache.getRandomMap();
		Iterator<Integer> iterator = randomMap.keySet().iterator();
		for (; iterator.hasNext();) {
			int type = iterator.next();
			if (type == countryType) {
				continue;
			}
			Map<Long, FightNSScoreRank> map = randomMap.get(type);
			if (mainTaskFinish && (map != null && map.size() > 0)) {
				int fType = FightNSSysCache.getScoreType();
				Hero hero = null;
				long hid = 0;
				LogTool.info("FightNSSysCache fType="+fType, this);
				if (fType == 3) {
					hero = NewKingShipFunction.getIns().kingHero(type);
					if (hero != null) {
						hid = hero.getId();
					}
				} else if (fType == 2) {
					Hero bigGeneralHero = NewKingShipFunction.getIns().bigGeneralHero(type);
					Hero primeMinisterHero = NewKingShipFunction.getIns().primeMinisterHero(type);
					List<Hero> list = new ArrayList<>();
					if (bigGeneralHero != null) {
						list.add(bigGeneralHero);
					}
					if (primeMinisterHero != null) {
						list.add(primeMinisterHero);
					}
					int size = list.size();
					if (size > 0) {
						int random = RandomUtil.getRandomNumInAreas(0, size-1);
						hero = list.get(random);
						hid = hero.getId();
					}
				}
				if(hero!=null&&(!map.containsKey(hid))) {
					hero = null;
				}
				LogTool.info("FightNSSysCache null="+(hero==null), this);
				if (hero == null) {
					List<Long> randomList = new ArrayList<>(map.keySet());
					LogTool.info("FightNSSysCache size0="+randomList.size(), this);
					if (fType == 1) {
						Hero king = NewKingShipFunction.getIns().kingHero(type);
						if (king != null) {
							randomList.remove(king.getId());
							if (randomList.size() == 0) {
								randomList.add(king.getId());
							}
						}
						Hero bigGeneralHero = NewKingShipFunction.getIns().bigGeneralHero(type);
						if (bigGeneralHero != null) {
							randomList.remove(bigGeneralHero.getId());
							if (randomList.size() == 0) {
								randomList.add(bigGeneralHero.getId());
							}
						}
						Hero primeMinisterHero = NewKingShipFunction.getIns().primeMinisterHero(type);
						if (primeMinisterHero != null) {
							randomList.remove(primeMinisterHero.getId());
							if (randomList.size() == 0) {
								randomList.add(primeMinisterHero.getId());
							}
						}
					}
					LogTool.info("FightNSSysCache size="+randomList.size(), this);
					int random = RandomUtil.getRandomNumInAreas(0, randomList.size() - 1);
					hid = randomList.get(random);
					hero = HeroCache.getHero(hid);
				}
				LogTool.info("FightNSSysCache hid="+hid, this);
				FightNSScoreRank fightNSScoreRank = map.get(hid);
				if (hero != null) {
					long totalStrength = hero.getTotalStrength();
					fightNSScoreRank.setStrength(totalStrength);
					fightNSScoreRank.setName(hero.getName());
				}
				rivalList.add(fightNSScoreRank);
			} else {
				Map<Integer, FightNSScoreRank> robotMap = FightNSSysCache.getRobotMap();
				if (robotMap.size() == 0) {
					createRobot();
				}
				if (type == CountryType.WEI_COUNTRY.getCountryType()) {
					rivalList.add(robotMap.get(FightNSConst.WEI_NPCID));
				} else if (type == CountryType.SHU_COUNTRY.getCountryType()) {
					rivalList.add(robotMap.get(FightNSConst.SU_NPCID));
				} else if (type == CountryType.WU_COUNTRY.getCountryType()) {
					rivalList.add(robotMap.get(FightNSConst.WU_NPCID));
				}
			}
		}
		return rivalList;
	}

	private void createRobot() {
		Map<Integer, FightNSScoreRank> robotMap = FightNSSysCache.getRobotMap();
		robotMap.put(FightNSConst.WEI_NPCID,
				createNpcRobot(FightNSConst.WEI_NPCID, CountryType.WEI_COUNTRY.getCountryType()));
		robotMap.put(FightNSConst.SU_NPCID,
				createNpcRobot(FightNSConst.SU_NPCID, CountryType.SHU_COUNTRY.getCountryType()));
		robotMap.put(FightNSConst.WU_NPCID,
				createNpcRobot(FightNSConst.WU_NPCID, CountryType.WU_COUNTRY.getCountryType()));
	}

	private FightNSScoreRank createNpcRobot(int npcid, int countryType) {
		Struct_NPC_200 npc = Config_NPC_200.getIns().get(npcid);
		FightNSScoreRank rank = new FightNSScoreRank();
		String rankName = IlliegalUtil.rankName();
		rank.setHid(npc.getID());
		rank.setName(rankName);
		rank.setLevel(npc.getLv());
		rank.setCountryType(countryType);
		rank.setJob(3);
		int icon = Config_xtcs_004.getIns().get(SettingConst.DC_ICON).getNum();
		rank.setIcon(icon);
		int frameId = Config_xtcs_004.getIns().get(SettingConst.BASE_FRAME).getNum();
		rank.setFrame(frameId);
		rank.setOfficial(1);
		rank.setStrength(npc.getPower());
		rank.setScore(1);
		return rank;
	}

	/**
	 * 获取个人排行榜
	 * 
	 * @param hero
	 */
	public void getPersonalRankList(Hero hero) {
		if (hero == null) {
			return;
		}
		try {
			long hid = hero.getId();
			int countryType = hero.getCountryType();
			if (countryType == 0) {
				return;
			}
			CountryData countryData = hero.getCountryData();
			FightNSModel fightNSModel = countryData.getFightNSModel();
			if (fightNSModel == null) {
				// 系统未开启
				return;
			}
			List<FightNSScoreRank> rankList = FightNSSysCache.getRankList();
			int size = rankList.size();
			List<Object[]> sendList = new ArrayList<>();
			FightNSScoreRank rank = null;
			int myRanking = 0;
			for (int i = 0; i < size; i++) {
				rank = rankList.get(i);
				sendList.add(new Object[] { i + 1, rank.getName(), rank.getCountryType(), rank.getScore() });
				if (hid == rank.getHid()) {
					myRanking = i + 1;
				}
			}
			FightNSSender.sendCmd_1574(hid, myRanking, fightNSModel.getScore(), sendList.toArray());
		} catch (Exception e) {
			LogTool.error(e, FightNSManager.class, hero.getId(), hero.getName(), "");
		}
	}

	/**
	 * 获取国家排行
	 * 
	 * @param hero
	 */
	public void getCountryRank(Hero hero) {
		if (hero == null) {
			return;
		}
		try {
			long hid = hero.getId();
			int countryType = hero.getCountryType();
			if (countryType == 0) {
				return;
			}
			CountryData countryData = hero.getCountryData();
			FightNSModel fightNSModel = countryData.getFightNSModel();
			if (fightNSModel == null) {
				// 系统未开启
				return;
			}
			List<CountryScoreRank> rankList = FightNSSysCache.getCountryScoreRankList();
			List<Object> sendList = new ArrayList<>();
			int ranking = 1;
			String kingName = "";
			for (CountryScoreRank rank : rankList) {
				sendList.add(new Object[] { ranking, rank.getCountryType(), rank.getTotalScore() });
				if (ranking == 1) {
					kingName = NewKingShipFunction.getIns().kingName(rank.getCountryType());
				}
				ranking++;
			}
			FightNSSender.sendCmd_1576(hid, sendList.toArray(), kingName);
		} catch (Exception e) {
			LogTool.error(e, FightNSManager.class, hero.getId(), hero.getName(), "");
		}
	}

	/**
	 * 购买挑战次数
	 * 
	 * @param hero
	 */
	public void buyCha(Hero hero, int num) {
		if (hero == null) {
			return;
		}
		try {
			long hid = hero.getId();
			int countryType = hero.getCountryType();
			if (countryType == 0) {
				return;
			}
			if (!FightNSFunction.getIns().checkCanOperate()) {
				FightNSSender.sendCmd_1570(hid, FightNSConst.TIPS_1);
				return;
			}
			CountryData countryData = hero.getCountryData();
			FightNSModel fightNSModel = countryData.getFightNSModel();
			if (fightNSModel == null) {
				// 系统未开启
				return;
			}
			checkCdTime(fightNSModel);
			int chaNum = fightNSModel.getChaNum();
//			if (chaNum >= getMaxCha()) {
//				// 已达最大挑战次数
//				FightNSSender.sendCmd_1578(hid, 0, 1, 0, 0);
//				return;
//			}
			int buyCha = fightNSModel.getBuyCha();
			int newNum = buyCha + num;
			if (newNum > getMaxBuy()) {
				// 已达购买上限
				FightNSSender.sendCmd_1578(hid, 0, 2, 0, 0);
				return;
			}
			int cost = FightNSConst.BUY_COST * num;
			if (!UseAddUtil.canUse(hero, GameConst.YUANBAO, cost)) {
				// 元宝不足
				FightNSSender.sendCmd_1578(hid, 0, 3, 0, 0);
				return;
			}
			UseAddUtil.use(hero, GameConst.YUANBAO, cost, SourceGoodConst.FNS_BUY_CHA, true);
			buyCha += num;
			fightNSModel.setBuyCha(buyCha);
			int leftBuy = getMaxBuy() - buyCha;
			chaNum += num;
			fightNSModel.setChaNum(chaNum);
			if (chaNum >= getMaxCha()) {
				fightNSModel.setCdTime(0);
			}
			int cdTime = fightNSModel.getCdTime();
			int needCdTime = FightNSConst.CD_TIME - (TimeDateUtil.getCurrentTime() - cdTime);
			if (cdTime == 0) {
				needCdTime = 0;
			}
			FightNSSender.sendCmd_1578(hid, 1, chaNum, leftBuy, needCdTime);
			LogTool.info(hid, hero.getName(), "FightNSManager buyCha=" + buyCha + ", num=" + num, FightNSManager.class);
		} catch (Exception e) {
			LogTool.error(e, FightNSManager.class, hero.getId(), hero.getName(), "FightNS buyCha fail");
		}
	}

	private int getMaxCha() {
		return FightNSConst.CHA_NUM;
	}

	private int getMaxBuy() {
		return FightNSConst.BUY_LIMIT;
	}

	/**
	 * 请求挑战
	 * 
	 * @param hero
	 * @param beChaId
	 *            被挑战玩家
	 */
	public void challenge(Hero hero, long beChaId) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			int countryType = hero.getCountryType();
			if (countryType == 0) {
				return;
			}
			if (!FightNSFunction.getIns().checkCanOperate()) {
				FightNSSender.sendCmd_1570(hid, FightNSConst.TIPS_1);
				return;
			}
			CountryData countryData = hero.getCountryData();
			FightNSModel fightNSModel = countryData.getFightNSModel();
			if (fightNSModel == null) {
				// 系统未开启
				return;
			}
			byte robot = 0;
			Hero beChaHero = null;
			if (beChaId == FightNSConst.WEI_NPCID || beChaId == FightNSConst.SU_NPCID
					|| beChaId == FightNSConst.WU_NPCID) {
				robot = 1;
			} else {
				beChaHero = HeroCache.getHero(beChaId, HeroConst.FIND_TYPE_BATTLE);
				int beChaCountryType = beChaHero.getCountryType();
				if (countryType == beChaCountryType) {
					// 同国家不能挑战
					return;
				}
			}
			int result = 1;
			int currentTime = TimeDateUtil.getCurrentTime();
			Map<Long, Object[]> chaResultMap = FightNSSysCache.getChaResultMap();
			if (chaResultMap.containsKey(hid)) {
				Object[] info = chaResultMap.get(hid);
				int startTime = (int) info[1];
				if (currentTime - startTime > FightNSConst.CHA_CLEAR) {
					chaResultMap.remove(hid);
				} else {
					return;
				}
			}
			checkCdTime(fightNSModel);
			int chaNum = fightNSModel.getChaNum();
			if (chaNum == 0) {
				// 无挑战次数
				return;
			}
			Object[] info = new Object[] { 0, currentTime, beChaId };
			chaResultMap.put(hid, info);
			if (robot == 1) {
				result = 1;
			} else {
				result = BattleFunction.checkWinPlayer(hero, beChaHero, BattleConst.OTHER);
				HeroFunction.getIns().sendBattleHeroAttr(hero, beChaId);
			}
			info[0] = result;

			chaNum -= 1;
			fightNSModel.setChaNum(chaNum);
			int cdTime = fightNSModel.getCdTime();
			int needCdTime = 0;
			if (cdTime > 0) {
				int passTime = currentTime - cdTime;
				needCdTime = FightNSConst.CD_TIME - passTime;
			}
			if (cdTime == 0) {
				fightNSModel.setCdTime(currentTime);
				needCdTime = GodOfWarConst.CD_TIME;
			}
			// 记录
			chaResultMap.put(hid, new Object[] { result, currentTime, beChaId });
			FightNSSender.sendCmd_1580(hid, 1, beChaId, result, chaNum, needCdTime, robot);
			// 刷新红点
			boolean redPoint = FightNSFunction.getIns().checkRedPoint(hero);
			if (!redPoint) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, FightNSConst.SysId, FightNSConst.FightNS,
						RedPointConst.NO_RED);
			}

			// 少主活动-金猪送财
			ShaoZhuGoldPigFunction.getIns().checkTask(hero, ShaoZhuGoldPigConst.TASK_TYPE_5, 1);
			// 限定武将
			WuJiangGoalFunction.getIns().updateTaskNum(hero, WuJiangGoalEnum.TASK_2, 1);
			//合服充值返利-南征北战
			HeFuRechargeBackFunction.getIns().numCharge(hero, HeFuRechargeBackConst.NANBATTLE, 1);
			// 成就树
			AchievementTreeFunction.getIns().checkTask(hero, AchievementTreeEnum.TASK_2, 1, 0);
			// 犒赏三军(活动)
			WarOrderFunction.getIns().updateTaskNum(hero, WarOrderEnum.GOAL_17, 1);
			// 犒赏三军(开服)
			WarOrderNewFunction.getIns().updateTaskNum(hero, WarOrderNewEnum.GOAL_17, 1);
		} catch (Exception e) {
			LogTool.error(e, FightNSManager.class, hero.getId(), hero.getName(), "");
			FightNSSysCache.getChaResultMap().remove(hid);
		}
	}

	/**
	 * 战斗结算
	 * 
	 * @param hero
	 * @param result
	 */
	public void fightEnd(Hero hero, int result) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			int countryType = hero.getCountryType();
			if (countryType == 0) {
				return;
			}
			if (!FightNSFunction.getIns().checkCanOperate()) {
				FightNSSender.sendCmd_1570(hid, FightNSConst.TIPS_1);
				return;
			}
			CountryData countryData = hero.getCountryData();
			FightNSModel fightNSModel = countryData.getFightNSModel();
			if (fightNSModel == null) {
				// 系统未开启
				return;
			}
			Object[] info = FightNSSysCache.getChaResultMap().get(hid);
			if (info == null) {
				// 非法操作
				return;
			}
			int serverResult = (Integer) info[0];
			int trueResult = serverResult;
			if (serverResult == 2) {
				trueResult = result;
			}
			if (result == 2 || result == 0) {// 退出则失败
				trueResult = 0;
			}
			int score = 0;
			long beChaId = (Long) info[2];
			int beCountryType = 0;
			if (beChaId == FightNSConst.WEI_NPCID) {
				beCountryType = CountryType.WEI_COUNTRY.getCountryType();
			} else if (beChaId == FightNSConst.SU_NPCID) {
				beCountryType = CountryType.SHU_COUNTRY.getCountryType();
			} else if (beChaId == FightNSConst.WU_NPCID) {
				beCountryType = CountryType.WU_COUNTRY.getCountryType();
			} else {
				Hero beChaHero = HeroCache.getHero(beChaId, HeroConst.FIND_TYPE_BASIC);
				beCountryType = beChaHero.getCountryType();
			}

			int[][] award = null;
			if (trueResult == 0) {// 失败
				award = Config_xtcs_004.getIns().get(FightNSConst.LOSE_AWARD).getOther();
				UseAddUtil.add(hero, award, SourceGoodConst.FNS_LOSE, null, true);
				score = Config_xtcs_004.getIns().get(FightNSConst.LOSE_SCORE).getNum();
			} else {
				if (NewKingShipFunction.getIns().isKing(beCountryType, beChaId)) {
					award = Config_xtcs_004.getIns().get(FightNSConst.BIG_AWARD).getOther();
					score = Config_xtcs_004.getIns().get(FightNSConst.BIG_SCORE).getNum();
				} else if (NewKingShipFunction.getIns().isPrimeMinister(beCountryType, beChaId)
						|| NewKingShipFunction.getIns().isBigGeneral(beCountryType, beChaId)) {
					award = Config_xtcs_004.getIns().get(FightNSConst.MIDDLE_AWARD).getOther();
					score = Config_xtcs_004.getIns().get(FightNSConst.MIDDLE_SCORE).getNum();
				} else {
					award = Config_xtcs_004.getIns().get(FightNSConst.SMALL_AWARD).getOther();
					score = Config_xtcs_004.getIns().get(FightNSConst.SMALL_SCORE).getNum();
				}
				UseAddUtil.add(hero, award, SourceGoodConst.FNS_WIN, null, true);
			}
			fightNSModel.setScore(fightNSModel.getScore() + score);
			List<Object[]> awardData = new ArrayList<>();
			if (award != null) {
				for (int[] arr : award) {
					awardData.add(new Object[] { arr[0], arr[1], arr[2] });
				}
			}
			int totalScore = fightNSModel.getScore();
			FightNSFunction.getIns().addToPersonalScoreRank(hero, totalScore);
			int myRanking = getMyRank(hero);
			FightNSSender.sendCmd_1582(hid, trueResult, totalScore, myRanking, awardData.toArray());
			FightNSFunction.getIns().addToRandomMap(hero, totalScore);
			FightNSSysCache.getCoutryScoreMap().get(countryType).addScore(score);
			refreshRival(hero);
			FightNSSysCache.getChaResultMap().remove(hid);
			// 任务
			TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_25, 0);
			// 每日任务
			DayTaskFunction.getIns().successDayTaskType(hero, DayTaskConst.DATTASK_TYPE12);
			SaintMonsterDailyActiveFunction.getIns().updateTaskNum(hero, SaintMonsterDailyActiveEnum.FIGHT_NS, 1);
			// 万兽之王-每日活跃
			MonsterKingDailyActiveFunction.getIns().updateTaskNum(hero, MonsterKingDailyActiveEnum.FIGHT_NS, 1);
			//桃园结义任务
			TaoyuanSwornFunction.getIns().reshSwornTask(hero, TaoyuanSwornTaskConst.TASK_NANZHENG_6, 1);
			LogTool.info(hid, hero.getName(),
					"FightNSManager fightEnd addScore=" + score + ", totalScore=" + totalScore, FightNSManager.class);
		} catch (Exception e) {
			LogTool.error(e, FightNSManager.class, hero.getId(), hero.getName(), "");
			FightNSSysCache.getChaResultMap().remove(hid);
		}
	}

	/**
	 * 领取积分奖励
	 * 
	 * @param hero
	 * @param score
	 */
	public void getScoreAward(Hero hero, int score) {
		if (hero == null) {
			return;
		}
		try {
			long hid = hero.getId();
			int countryType = hero.getCountryType();
			if (countryType == 0) {
				return;
			}
			if (!FightNSFunction.getIns().checkCanOperate()) {
				FightNSSender.sendCmd_1570(hid, FightNSConst.TIPS_1);
				return;
			}
			CountryData countryData = hero.getCountryData();
			FightNSModel fightNSModel = countryData.getFightNSModel();
			if (fightNSModel == null) {
				// 系统未开启
				return;
			}
			int myScore = fightNSModel.getScore();
			if (score > myScore) {
				// 不满足领取条件
				FightNSSender.sendCmd_1584(hid, 0, 1);
				return;
			}
			Set<Integer> scoreAward = fightNSModel.getScoreAward();
			if (scoreAward.contains(score)) {
				// 已领取过
				FightNSSender.sendCmd_1584(hid, 0, 2);
				return;
			}
			Struct_nzbzpoint_226 nzbzpoint = Config_nzbzpoint_226.getIns().get(score);
			if (nzbzpoint == null) {
				// 奖励数据不存在
				// FightNSSender.sendCmd_1584(hid, 0, 3);
				return;
			}
			int[][] reward = nzbzpoint.getReward();
			UseAddUtil.add(hero, reward, SourceGoodConst.FNS_SCORE_AWARD, null, true);
			scoreAward.add(score);
			FightNSSender.sendCmd_1584(hid, 1, score);
			LogTool.info(hid, hero.getName(), "FightNSManager getScoreAward score=" + score, FightNSManager.class);
		} catch (Exception e) {
			LogTool.error(e, FightNSManager.class, hero.getId(), hero.getName(), "FightNS getScoreAward fail");
		}
	}

	/**
	 * 刷新对手
	 * 
	 * @param hero
	 */
	public void refreshRival(Hero hero) {
		if (hero == null) {
			return;
		}
		try {
			long hid = hero.getId();
			int countryType = hero.getCountryType();
			if (countryType == 0) {
				return;
			}
			CountryData countryData = hero.getCountryData();
			FightNSModel fightNSModel = countryData.getFightNSModel();
			if (fightNSModel == null) {
				// 系统未开启
				return;
			}
			List<FightNSScoreRank> rivaleList = refreshRivale(hero, countryType);
			List<Object[]> rivaleData = new ArrayList<>();
			for (FightNSScoreRank rank : rivaleList) {
				Object[] award = getCountryAward(rank.getCountryType(), rank.getHid());
				rivaleData.add(new Object[] { rank.getHid(), rank.getName(), rank.getJob(), rank.getLevel(),
						rank.getIcon(), rank.getFrame(), rank.getCountryType(), rank.getOfficial(), rank.getStrength(),
						award[0], award[1] });
			}
			FightNSSender.sendCmd_1586(hid, rivaleData.toArray());
		} catch (Exception e) {
			LogTool.error(e, FightNSManager.class, hero.getId(), hero.getName(), "FightNS refreshRival fail");
		}
	}

	/**
	 * 扫荡
	 * 
	 * @param hero
	 * @param beChaId
	 */
	public void mopUp(Hero hero, long beChaId) {
		if (hero == null) {
			return;
		}
		try {
			long hid = hero.getId();
			// vip检测
			int openState = VipFunction.getIns().getVipNum(hero, VipAddType.fightNSOpen);
			if (openState == VipConst.CLOSE) {
				return;
			}
			int countryType = hero.getCountryType();
			if (countryType == 0) {
				return;
			}
			if (!FightNSFunction.getIns().checkCanOperate()) {
				FightNSSender.sendCmd_1570(hid, FightNSConst.TIPS_1);
				return;
			}
			CountryData countryData = hero.getCountryData();
			FightNSModel fightNSModel = countryData.getFightNSModel();
			if (fightNSModel == null) {
				// 系统未开启
				return;
			}
			int beChaCountryType = 0;
			long strength = 0;
			if (beChaId == FightNSConst.WEI_NPCID) {
				beChaCountryType = CountryType.WEI_COUNTRY.getCountryType();
				strength = Config_NPC_200.getIns().get((int) beChaId).getPower();
			} else if (beChaId == FightNSConst.SU_NPCID) {
				beChaCountryType = CountryType.SHU_COUNTRY.getCountryType();
				strength = Config_NPC_200.getIns().get((int) beChaId).getPower();
			} else if (beChaId == FightNSConst.WU_NPCID) {
				beChaCountryType = CountryType.WU_COUNTRY.getCountryType();
				strength = Config_NPC_200.getIns().get((int) beChaId).getPower();
			} else {
				Hero beChaHero = HeroCache.getHero(beChaId, HeroConst.FIND_TYPE_BASIC);
				beChaCountryType = beChaHero.getCountryType();
				strength = beChaHero.getTotalStrength();
			}
			if (countryType == beChaCountryType) {
				// 同国家不能挑战
				return;
			}
			if (strength >= hero.getTotalStrength()) {
				// 不满足扫荡条件
				return;
			}
			int chaNum = fightNSModel.getChaNum();
			if (chaNum == 0) {
				// 无挑战次数
				return;
			}
			chaNum -= 1;
			fightNSModel.setChaNum(chaNum);
			int cdTime = fightNSModel.getCdTime();
			int currentTime = TimeDateUtil.getCurrentTime();
			int needCdTime = 0;
			if (cdTime > 0) {
				int passTime = currentTime - cdTime;
				needCdTime = FightNSConst.CD_TIME - passTime;
			}
			if (cdTime == 0) {
				fightNSModel.setCdTime(currentTime);
				needCdTime = GodOfWarConst.CD_TIME;
			}
			int score = 0;
			int[][] award = null;
			if (NewKingShipFunction.getIns().isKing(beChaCountryType, beChaId)) {
				award = Config_xtcs_004.getIns().get(FightNSConst.BIG_AWARD).getOther();
				score = Config_xtcs_004.getIns().get(FightNSConst.BIG_SCORE).getNum();
			} else if (NewKingShipFunction.getIns().isPrimeMinister(beChaCountryType, beChaId)
					|| NewKingShipFunction.getIns().isBigGeneral(beChaCountryType, beChaId)) {
				award = Config_xtcs_004.getIns().get(FightNSConst.MIDDLE_AWARD).getOther();
				score = Config_xtcs_004.getIns().get(FightNSConst.MIDDLE_SCORE).getNum();
			} else {
				award = Config_xtcs_004.getIns().get(FightNSConst.SMALL_AWARD).getOther();
				score = Config_xtcs_004.getIns().get(FightNSConst.SMALL_SCORE).getNum();
			}
			UseAddUtil.add(hero, award, SourceGoodConst.FNS_WIN, null, true);
			fightNSModel.setScore(fightNSModel.getScore() + score);
			List<Object[]> awardData = new ArrayList<>();
			if (award != null) {
				for (int[] arr : award) {
					awardData.add(new Object[] { arr[0], arr[1], arr[2] });
				}
			}
			int totalScore = fightNSModel.getScore();
			FightNSFunction.getIns().addToPersonalScoreRank(hero, totalScore);
			int myRanking = getMyRank(hero);
			FightNSSender.sendCmd_1588(hid, 1, chaNum, needCdTime, totalScore, myRanking, awardData.toArray());
			FightNSFunction.getIns().addToRandomMap(hero, totalScore);
			FightNSSysCache.getCoutryScoreMap().get(countryType).addScore(score);
			refreshRival(hero);
			// 任务
			TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_25, 0);
			// 每日任务
			DayTaskFunction.getIns().successDayTaskType(hero, DayTaskConst.DATTASK_TYPE12);
			// 圣兽降临-每日活跃
			SaintMonsterDailyActiveFunction.getIns().updateTaskNum(hero, SaintMonsterDailyActiveEnum.FIGHT_NS, 1);
			// 万兽之王-每日活跃
			MonsterKingDailyActiveFunction.getIns().updateTaskNum(hero, MonsterKingDailyActiveEnum.FIGHT_NS, 1);
			// 限定武将
			WuJiangGoalFunction.getIns().updateTaskNum(hero, WuJiangGoalEnum.TASK_2, 1);
			// 成就树
			AchievementTreeFunction.getIns().checkTask(hero, AchievementTreeEnum.TASK_2, 1, 0);
			// 刷新红点
			boolean redPoint = FightNSFunction.getIns().checkRedPoint(hero);
			if (!redPoint) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, FightNSConst.SysId, FightNSConst.FightNS,
						RedPointConst.NO_RED);
			}

			// 少主活动-金猪送财
			ShaoZhuGoldPigFunction.getIns().checkTask(hero, ShaoZhuGoldPigConst.TASK_TYPE_5, 1);
			//合服充值返利-南征北战
			HeFuRechargeBackFunction.getIns().numCharge(hero, HeFuRechargeBackConst.NANBATTLE, 1);
			//桃园结义任务
			TaoyuanSwornFunction.getIns().reshSwornTask(hero, TaoyuanSwornTaskConst.TASK_NANZHENG_6, 1);
			// 犒赏三军(活动)
			WarOrderFunction.getIns().updateTaskNum(hero, WarOrderEnum.GOAL_17, 1);
			// 犒赏三军(开服)
			WarOrderNewFunction.getIns().updateTaskNum(hero, WarOrderNewEnum.GOAL_17, 1);
		} catch (Exception e) {
			LogTool.error(e, FightNSManager.class, hero.getId(), hero.getName(), "FightNS mopUp fail");
		}
	}

}
