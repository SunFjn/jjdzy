package com.teamtop.system.godOfWar;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.GodOfWarOpTaskRunnable;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.system.activity.ativitys.achievementTree.AchievementTreeEnum;
import com.teamtop.system.activity.ativitys.achievementTree.AchievementTreeFunction;
import com.teamtop.system.activity.ativitys.baoZangPinTu.BaoZangPinTuConst;
import com.teamtop.system.activity.ativitys.baoZangPinTu.BaoZangPinTuFunction;
import com.teamtop.system.activity.ativitys.hefuRechargeBack.HeFuRechargeBackConst;
import com.teamtop.system.activity.ativitys.hefuRechargeBack.HeFuRechargeBackFunction;
import com.teamtop.system.activity.ativitys.warOrder.WarOrderEnum;
import com.teamtop.system.activity.ativitys.warOrder.WarOrderFunction;
import com.teamtop.system.activity.ativitys.wuJiangGoal.WuJiangGoalEnum;
import com.teamtop.system.activity.ativitys.wuJiangGoal.WuJiangGoalFunction;
import com.teamtop.system.bag.BagFunction;
import com.teamtop.system.battle.BattleConst;
import com.teamtop.system.battle.BattleFunction;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.daytask.DayTaskConst;
import com.teamtop.system.daytask.DayTaskFunction;
import com.teamtop.system.event.backstage.events.flowHero.FlowHeroEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.fashionClothes.FashionClothesManager;
import com.teamtop.system.godOfWar.model.GodOfWar;
import com.teamtop.system.godOfWar.model.GodOfWarCache;
import com.teamtop.system.godOfWar.model.GodOfWarRank;
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
import com.teamtop.system.shop.ShopEnum;
import com.teamtop.system.taoyuanSworn.TaoyuanSwornFunction;
import com.teamtop.system.taoyuanSworn.TaoyuanSwornTaskConst;
import com.teamtop.system.task.TaskUserConst;
import com.teamtop.system.task.TaskUserFunction;
import com.teamtop.system.vip.VipAddType;
import com.teamtop.system.vip.VipConst;
import com.teamtop.system.vip.VipFunction;
import com.teamtop.util.ProbabilityEvent.RandomUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_war_222;
import excel.config.Config_warbot_222;
import excel.config.Config_warreward_222;
import excel.config.Config_warstore_222;
import excel.struct.Struct_war_222;
import excel.struct.Struct_warbot_222;
import excel.struct.Struct_warreward_222;
import excel.struct.Struct_warstore_222;

public class GodOfWarManager {

	private static GodOfWarManager godOfWarManager;

	private GodOfWarManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized GodOfWarManager getIns() {
		if (godOfWarManager == null) {
			godOfWarManager = new GodOfWarManager();
		}
		return godOfWarManager;
	}

	/**
	 * 打开三国战神
	 * 
	 * @param hero
	 */
	public void openGodOfWar(Hero hero) {
		if (hero == null) {
			return;
		}
		try {
			GodOfWar godOfWar = hero.getGodOfWar();
			if (godOfWar == null) {
				// 未开启系统
				return;
			}
			checkCdTime(hero, godOfWar);
			long hid = godOfWar.getHid();
			int chaNum = godOfWar.getChaNum();
			int buyNum = godOfWar.getBuyNum();
			int cdTime = godOfWar.getCdTime();
			int needCdTime = GodOfWarConst.CD_TIME - (TimeDateUtil.getCurrentTime() - cdTime);
			if (cdTime == 0) {
				needCdTime = 0;
			}
			int leftBuyNum = getMaxBuyCha(hero) - buyNum;
			if (leftBuyNum < 0) {
				leftBuyNum = 0;
			}
			GodOfWarRank godOfWarRank = GodOfWarCache.getGodOfWarRankMap().get(hero.getId());
			if (godOfWarRank == null) {
				GodOfWarFunction.getIns().addToGodOfWarRank(hero);
				return;
			}
			godOfWarRank.setCreateJob(hero.getCreateJob());
			int topRanking = godOfWar.getPromoteAwardRank();
			int myRanking = godOfWarRank.getRanking();
			List<GodOfWarRank> refreshList = null;
			if (godOfWar.getLastChaTime() == -1) {
				refreshList = getFirstEnermy(myRanking);
			} else {
				refreshList = refreshList(myRanking);
			}
			List<Object[]> rivalList = new ArrayList<>();
			int size = refreshList.size();
			GodOfWarRank rank = null;
			for (int i = 0; i < size; i++) {
				rank = refreshList.get(i);
				int robotId = rank.getRobotId();
				long playerId = rank.getHid();
				long strength = rank.getStrength();
				if (robotId > 0) {
					playerId = rank.getRanking();
					strength = Config_warbot_222.getIns().get(robotId).getPower();
				}
				int body = FashionClothesManager.getIns().getBodyid(rank.getJob(), rank.getBodyid());
				rivalList.add(new Object[] { rank.getRanking(), robotId, playerId, rank.getName(), body,rank.getGodWeapon(), rank.getIcon(),
						rank.getFrame(), strength, rank.getMountId()});
			}
			GodOfWarSender.sendCmd_1402(hid, rivalList.toArray(), myRanking, topRanking, chaNum, needCdTime,
					leftBuyNum);
		} catch (Exception e) {
			LogTool.error(e, GodOfWarManager.class, hero.getId(), hero.getName(), "GodOfWarManager openGodOfWar fail");
		}
	}

	public List<GodOfWarRank> getFirstEnermy(int ranking) {
		List<GodOfWarRank> godOfWarRankList = GodOfWarCache.getGodOfWarRankList();
		int size = ranking - 101;
		List<GodOfWarRank> rivalList = new ArrayList<>();
		for (int i = 0; i < 3; i++) {
			rivalList.add(godOfWarRankList.get(i));
		}
		for (int i = size; i > 3;) {
			GodOfWarRank rank = godOfWarRankList.get(i);
			if (rank.getRobotId() > 0) {
				rivalList.add(rank);
				i -= 50;
				if (rivalList.size() >= 6) {
					break;
				}
			} else {
				i--;
			}
		}
		return rivalList;
	}

	/**
	 * 刷新对手处理
	 * 
	 * @param rank
	 */
	public List<GodOfWarRank> refreshList(int ranking) {
		List<GodOfWarRank> godOfWarRankList = GodOfWarCache.getGodOfWarRankList();
		List<GodOfWarRank> rivalList = new ArrayList<>();
		for (int i = 0; i < 3; i++) {
			rivalList.add(godOfWarRankList.get(i));
		}
		List<Struct_war_222> sortList = Config_war_222.getIns().getSortList();
		int size = sortList.size();
		Struct_war_222 struct_war_222 = null;
		for (int i = 0; i < size; i++) {
			struct_war_222 = sortList.get(i);
			int[][] rank = struct_war_222.getRank();
			if (ranking >= rank[0][0] && ranking <= rank[0][1]) {
				break;
			}
		}
		int[][] range = struct_war_222.getRange();
		int symbol = 1;
		int rSize = range.length;
		for (int i = 0; i < rSize; i++) {
			int start = range[i][0];
			int end = range[i][1];
			int random = 0;
			symbol = 1;
			if (start < 0) {
				symbol = -1;
				random = RandomUtil.getRandomNumInAreas(end * symbol, start * symbol);
			} else {
				random = RandomUtil.getRandomNumInAreas(start, end);
			}
			random = random * symbol;
			int chaRanking = ranking + random;
			GodOfWarRank godOfWarRank = godOfWarRankList.get(chaRanking - 1);
			if (godOfWarRank != null) {
				rivalList.add(godOfWarRank);
			}
		}
		return rivalList;
	}

	public void checkCdTime(Hero hero, GodOfWar godOfWar) {
		int chaNum = godOfWar.getChaNum();
		if (chaNum >= getMaxCha(hero)) {
			godOfWar.setCdTime(0);
		}
		int cdTime = godOfWar.getCdTime();
		if (cdTime > 0) {
			int currentTime = TimeDateUtil.getCurrentTime();
			int passTime = currentTime - cdTime;
			if (passTime > GodOfWarConst.CD_TIME) {
				int addNum = passTime / GodOfWarConst.CD_TIME;
				chaNum = chaNum + addNum;
				if (chaNum >= getMaxCha(hero)) {
					godOfWar.setChaNum(getMaxCha(hero));
					godOfWar.setCdTime(0);
				} else {
					godOfWar.setChaNum(chaNum);
					godOfWar.setCdTime(cdTime + GodOfWarConst.CD_TIME * addNum);
				}
			}
		}
	}

	/**
	 * 最高挑战积累次数
	 * 
	 * @return
	 */
	private int getMaxCha(Hero hero) {
		return GodOfWarConst.BASE_CHA;
	}

	/**
	 * 最高购买次数
	 * 
	 * @return
	 */
	private int getMaxBuyCha(Hero hero) {
		int vipNum = VipFunction.getIns().getVipNum(hero, VipAddType.godOfWarChaNum);
		return GodOfWarConst.BASE_BUY_CHA + vipNum;// + vip
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
			GodOfWar godOfWar = hero.getGodOfWar();
			if (godOfWar == null) {
				// 未开启系统
				return;
			}
			checkCdTime(hero, godOfWar);
			int chaNum = godOfWar.getChaNum();
//			int dailyMaxCha = getMaxCha(hero);
//			if (chaNum == dailyMaxCha) {
//				// 积累挑战次数满
//				GodOfWarSender.sendCmd_1404(hid, 0, 1, 0, 0);
//				return;
//			}
			int buyNum = godOfWar.getBuyNum();
			int newNum = buyNum + num;
			if (newNum > getMaxBuyCha(hero)) {
				// 达今日购买上限
				GodOfWarSender.sendCmd_1404(hid, 0, 2, 0, 0);
				return;
			}
			int cost = GodOfWarConst.BUY_COST * num;
			if (!UseAddUtil.canUse(hero, GameConst.YUANBAO, cost)) {
				// 元宝不足
				GodOfWarSender.sendCmd_1404(hid, 0, 3, 0, 0);
				return;
			}
			UseAddUtil.use(hero, GameConst.YUANBAO, cost, SourceGoodConst.GOD_OF_WAR_BUY, true);
			buyNum += num;
			int leftBuyNum = getMaxBuyCha(hero) - buyNum;
			if (leftBuyNum < 0) {
				leftBuyNum = 0;
			}
			chaNum += num;
			if (chaNum >= getMaxCha(hero)) {
				godOfWar.setCdTime(0);
			}
			int cdTime = godOfWar.getCdTime();
			int needCdTime = GodOfWarConst.CD_TIME - (TimeDateUtil.getCurrentTime() - cdTime);
			if (cdTime == 0) {
				needCdTime = 0;
			}
			godOfWar.setChaNum(chaNum);
			godOfWar.setBuyNum(buyNum);
			GodOfWarSender.sendCmd_1404(hid, 1, chaNum, needCdTime, leftBuyNum);
			LogTool.info(hid, hero.getName(), "GodOfWarManager buyCha, buyNum=" + buyNum + ", num=" + num,
					GodOfWarManager.class);
		} catch (Exception e) {
			LogTool.error(e, GodOfWarManager.class, hero.getId(), hero.getName(), "GodOfWarManager buyCha fail");
		}
	}

	/**
	 * 刷新对手列表
	 * 
	 * @param hero
	 */
	public void refreshRival(Hero hero) {
		if (hero == null) {
			return;
		}
		try {
			GodOfWar godOfWar = hero.getGodOfWar();
			if (godOfWar == null) {
				// 未开启系统
				return;
			}
			GodOfWarRank godOfWarRank = GodOfWarCache.getGodOfWarRankMap().get(hero.getId());
			int myRanking = godOfWarRank.getRanking();
			List<GodOfWarRank> refreshList = null;
			if (godOfWar.getLastChaTime() == -1) {
				refreshList = getFirstEnermy(myRanking);
			} else {
				refreshList = refreshList(myRanking);
			}
			List<Object[]> rivalList = new ArrayList<>();
			int size = refreshList.size();
			GodOfWarRank rank = null;
			for (int i = 0; i < size; i++) {
				rank = refreshList.get(i);
				int robotId = rank.getRobotId();
				long strength = rank.getStrength();
				if (robotId > 0) {
					strength = Config_warbot_222.getIns().get(robotId).getPower();
				}
				int body=FashionClothesManager.getIns().getBodyid(rank.getJob(), rank.getBodyid());
				rivalList.add(new Object[] { rank.getRanking(), rank.getHid(), rank.getName(), body,rank.getGodWeapon(),
						rank.getIcon(), rank.getFrame(), strength, rank.getMountId()});
			}
			GodOfWarSender.sendCmd_1406(hero.getId(), rivalList.toArray());
		} catch (Exception e) {
			LogTool.error(e, GodOfWarManager.class, hero.getId(), hero.getName(), "");
		}
	}

	/**
	 * 请求挑战
	 * 
	 * @param hero
	 * @param beChaId
	 */
	public void challenge(final Hero hero, final long beChaId, final int chaRanking) {
		OpTaskExecutorService.PublicOrderService.execute(new GodOfWarOpTaskRunnable() {

			@Override
			public void run() {
				challengeHandle(hero, beChaId, chaRanking);
			}

			@Override
			public Object getSession() {
				return OpTaskConst.GOD_OF_WAR_KEY;
			}
		});
	}

	/**
	 * 请求挑战
	 * 
	 * @param hero
	 * @param beChaId
	 */
	public void challengeHandle(Hero hero, long beChaId, int chaRanking) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			GodOfWar godOfWar = hero.getGodOfWar();
			if (godOfWar == null) {
				// 未开启系统
				return;
			}
			if (hero.getId() == beChaId) {
				// 不能挑战自己
				return;
			}
			ConcurrentHashMap<Long, GodOfWarRank> godOfWarRankMap = GodOfWarCache.getGodOfWarRankMap();
			GodOfWarRank beChaRank = godOfWarRankMap.get(beChaId);
			if (beChaRank == null) {
				return;
			}
			if (beChaRank.getRanking() != chaRanking) {
				// 排行变化刷新
				GodOfWarSender.sendCmd_1408(hid, 0, 5, 0, 0, 0, 0);
				refreshRival(hero);
				return;
			}
			GodOfWarRank myRank = godOfWarRankMap.get(hid);
			if (beChaRank.getRanking() <= 3 && myRank.getRanking() > 10) {
				// 前10才能挑战前3
				GodOfWarSender.sendCmd_1408(hid, 0, 1, 0, 0, 0, 0);
				refreshRival(hero);
				return;
			}
			checkCdTime(hero, godOfWar);
			int chaNum = godOfWar.getChaNum();
			if (chaNum == 0) {
				int goodsNumBySysId = BagFunction.getIns().getGoodsNumBySysId(hero.getId(), GodOfWarConst.PROP_ID);
				if (goodsNumBySysId <= 0) {
					// 没有挑战次数
					GodOfWarSender.sendCmd_1408(hid, 0, 2, 0, 0, 0, 0);
					refreshRival(hero);
					return;
				} else {
					if (!UseAddUtil.canUse(hero, GameConst.TOOL, 1, GodOfWarConst.PROP_ID)) {
						return;
					}
					UseAddUtil.use(hero, GameConst.TOOL, 1, GodOfWarConst.PROP_ID, SourceGoodConst.GODOFWAR_REDUCE,
							true);
				}
			}
			int currentTime = TimeDateUtil.getCurrentTime();
			ConcurrentHashMap<Long, Integer> challengeMap = GodOfWarCache.getChallengeMap();
			if (challengeMap.containsKey(beChaId)) {
				Integer time = challengeMap.get(beChaId);
				if (currentTime - time > GodOfWarConst.FIGHT_LIMIT_CLEAR) {
					challengeMap.remove(beChaId);
				} else {
					// 对方在战斗中暂时不可挑战
					GodOfWarSender.sendCmd_1408(hid, 0, 3, 0, 0, 0, 0);
					refreshRival(hero);
					return;
				}
			}
			if (challengeMap.containsKey(hid)) {
				Integer time = challengeMap.get(hid);
				if (currentTime - time > GodOfWarConst.FIGHT_LIMIT_CLEAR) {
					challengeMap.remove(hid);
				} else {
					// 被挑战中不可挑战
					GodOfWarSender.sendCmd_1408(hid, 0, 4, 0, 0, 0, 0);
					refreshRival(hero);
					return;
				}
			}
			challengeMap.put(beChaId, currentTime);
			challengeMap.put(hid, currentTime);
			// Hero beChaHero = HeroCache.getHero(beChaId,
			// HeroConst.FIND_TYPE_BATTLE);//有npc
			// 扣除次数
			int leftCha = chaNum - 1;
			if (leftCha < 0) {
				leftCha = 0;
			}
			godOfWar.setChaNum(leftCha);
			int cdTime = godOfWar.getCdTime();
			int leftCdTime = GodOfWarConst.CD_TIME - (currentTime - cdTime);
			if (cdTime == 0) {
				godOfWar.setCdTime(currentTime);
				leftCdTime = GodOfWarConst.CD_TIME;
			}
			godOfWar.setLastChaTime(currentTime);
			// 检测战力 胜利
			int result = 0;
			if (beChaRank.getRobotId() > 0) {
				int[][] monster = Config_warbot_222.getIns().get(beChaRank.getRobotId()).getMonster();
				result = BattleFunction.checkWinBoss(hero, monster[0][0], 1);
			} else {
				Hero beHero = HeroCache.getHero(beChaId, HeroConst.FIND_TYPE_BATTLE);
				result = BattleFunction.checkWinPlayer(hero, beHero, BattleConst.OTHER);
				HeroFunction.getIns().sendBattleHeroAttr(hero, beChaId);
			}
			GodOfWarCache.getChallengeResultMap().put(hid, new Object[] { beChaId, result });
			GodOfWarSender.sendCmd_1408(hid, 1, beChaId, beChaRank.getRobotId(), leftCha, leftCdTime, result);
			GodOfWarFunction.getIns().updateRedPoint(hero);
			// 任务
			TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_39, 1);
			SaintMonsterDailyActiveFunction.getIns().updateTaskNum(hero, SaintMonsterDailyActiveEnum.GOD_OF_WAR, 1);
			// 万兽之王-每日活跃
			MonsterKingDailyActiveFunction.getIns().updateTaskNum(hero, MonsterKingDailyActiveEnum.GOD_OF_WAR, 1);
			LogTool.info(hid, hero.getName(), "GodOfWarManager challenge, leftCha=" + leftCha, GodOfWarManager.class);

			// 少主活动-金猪送财
			ShaoZhuGoldPigFunction.getIns().checkTask(hero, ShaoZhuGoldPigConst.TASK_TYPE_4, 1);
			// 限定武将
			WuJiangGoalFunction.getIns().updateTaskNum(hero, WuJiangGoalEnum.TASK_3, 1);
			
			//合服充值返利-三国战神
			HeFuRechargeBackFunction.getIns().numCharge(hero, HeFuRechargeBackConst.COUNTRY_TYPE, 1);
			//桃园结义任务
			TaoyuanSwornFunction.getIns().reshSwornTask(hero, TaoyuanSwornTaskConst.TASK_ZHANSHEN_5, 1);
			// 成就树
			AchievementTreeFunction.getIns().checkTask(hero, AchievementTreeEnum.TASK_3, 1, 0);
			// 宝藏拼图
			BaoZangPinTuFunction.getIns().checkTask(hero, BaoZangPinTuConst.TASK_TYPE_9, 1);
			// 犒赏三军(活动)
			WarOrderFunction.getIns().updateTaskNum(hero, WarOrderEnum.GOAL_6, 1);
			// 犒赏三军(开服)
			WarOrderNewFunction.getIns().updateTaskNum(hero, WarOrderNewEnum.GOAL_6, 1);
		} catch (Exception e) {
			LogTool.error(e, GodOfWarManager.class, hero.getId(), hero.getName(), "GodOfWarManager challenge fail");
			GodOfWarCache.getChallengeMap().remove(hid);
			GodOfWarCache.getChallengeMap().remove(beChaId);
			GodOfWarCache.getChallengeResultMap().remove(hid);
		} finally {

		}
	}

	/**
	 * 挑战结果
	 * 
	 * @param hero
	 * @param result
	 */
	public void fightResult(final Hero hero, final int result) {
		OpTaskExecutorService.PublicOrderService.execute(new GodOfWarOpTaskRunnable() {

			@Override
			public void run() {
				fightResultHandle(hero, result);
			}

			@Override
			public Object getSession() {
				return OpTaskConst.GOD_OF_WAR_KEY;
			}
		});
	}

	/**
	 * 挑战结果
	 * 
	 * @param hero
	 * @param result
	 */
	public void fightResultHandle(Hero hero, int result) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		long beChaId = 0;
		try {
			GodOfWar godOfWar = hero.getGodOfWar();
			if (godOfWar == null) {
				// 未开启系统
				return;
			}
			ConcurrentHashMap<Long, Object[]> challengeResultMap = GodOfWarCache.getChallengeResultMap();
			Object[] objs = challengeResultMap.get(hid);
			if (objs == null) {
				// 非法操作
				return;
			}
			challengeResultMap.remove(hid);
			int serverResult = (int) objs[1];// 服务计算的结果 0：失败，1：胜利，2：以前端结果为准
			beChaId = (long) objs[0];
			if (serverResult == 2) {
				serverResult = result;
			}
			if (result == 2 || result == 0) {
				serverResult = 0;
			}
			GodOfWarRank myRank = GodOfWarCache.getGodOfWarRankMap().get(hid);
			int myRanking = myRank.getRanking();
			List<Object> rewardList = new ArrayList<>();
			if (serverResult == 1) {
				List<GodOfWarRank> godOfWarRankList = GodOfWarCache.getGodOfWarRankList();
				// 挑战成功处理
				GodOfWarRank beChaRank = GodOfWarCache.getGodOfWarRankMap().get(beChaId);
				int resultRanking = myRanking;
				int beChaRanking = beChaRank.getRanking();
				if (myRanking > beChaRanking) {
					// 互换排行
					myRank.setRanking(beChaRanking);
					beChaRank.setRanking(myRanking);
					godOfWarRankList.set(beChaRanking - 1, myRank);
					godOfWarRankList.set(myRanking - 1, beChaRank);
					if (beChaRank.getRobotId() > 0) {
						Struct_warbot_222 rankRobot = getRankRobot(myRanking);
						GodOfWarCache.getGodOfWarRankMap().remove(beChaId);
						beChaRank.setRobotId(rankRobot.getId());
					}
					resultRanking = beChaRanking;
					// 是否有晋升奖励
					int promoteAwardRank = godOfWar.getPromoteAwardRank();
					if (promoteAwardRank == 0) {
						promoteAwardRank = myRanking;
						godOfWar.setPromoteAwardRank(myRanking);
					}
					if (beChaRanking < promoteAwardRank) {
						godOfWar.setPromoteAwardRank(beChaRanking);
						int[][] upgradeReward = getUpgradeReward(promoteAwardRank - 1, beChaRanking);
						if (upgradeReward != null) {
							UseAddUtil.add(hero, upgradeReward, SourceGoodConst.GOD_OF_WAR_CHA_UPGRADE, null, true);
							for (int[] reData : upgradeReward) {
								rewardList.add(new Object[] { reData[0], reData[1], reData[2] });
							}
						}
					}
					// 更新到数据库
					GodOfWarRankDao.getIns().update(myRank);
					if (beChaRank.getRobotId() > 0) {
						// 机器人先清除原来的机器人
						GodOfWarRankDao.getIns().delete(beChaRank);
						// 设置新id
						beChaRank.setHid(beChaRank.getRanking());
						GodOfWarCache.getGodOfWarRankMap().put(beChaRank.getHid(), beChaRank);
						LogTool.info(hid, "", "GodOfWarManager myRanking="+myRanking+", beChaRanking="+beChaRanking, GodOfWarManager.class);
						GodOfWarRankDao.getIns().insert(beChaRank, beChaRank.getHid(), GameProperties.zoneids.get(0));
					} else {
						GodOfWarRankDao.getIns().update(beChaRank);
					}
					if (beChaRanking == 1) {
						// 获得第一名广播
						String beName = beChaRank.getName();
						beName = beName + ".S" + beChaRank.getZoneid();
						ChatManager.getIns().broadCast(ChatConst.GOD_OF_WAR,
								new Object[] { hero.getNameZoneid(), beName });
					}
				}
				// 发送奖励
				int[][] resultReward = getResultReward(resultRanking, serverResult);
				if (resultReward != null) {
					UseAddUtil.add(hero, resultReward, SourceGoodConst.GOD_OF_WAR_CHA_RESULT, null, true);
				}
				Hero beChaHero = HeroCache.getHero(beChaId);
				if (beChaHero != null) {
					openGodOfWar(beChaHero);
				}
			} else {
				int[][] resultReward = getResultReward(myRanking, serverResult);
				if (resultReward != null) {
					UseAddUtil.add(hero, resultReward, SourceGoodConst.GOD_OF_WAR_CHA_RESULT, null, true);
				}
			}
			GodOfWarSender.sendCmd_1410(hid, serverResult, myRank.getRanking(), rewardList.toArray());
			refreshRival(hero);
			LogTool.info(hid, hero.getName(), "GodOfWarManager fightEnd, serverResult=" + serverResult,
					GodOfWarManager.class);
		} catch (Exception e) {
			LogTool.error(e, GodOfWarManager.class, hero.getId(), hero.getName(), "GodOfWarManager fightResult fail");
		} finally {
			GodOfWarCache.getChallengeMap().remove(hid);
			GodOfWarCache.getChallengeMap().remove(beChaId);
			GodOfWarCache.getChallengeResultMap().remove(hid);
		}
		// 每日任务
		DayTaskFunction.getIns().successDayTaskType(hero, DayTaskConst.DATTASK_TYPE13);
	}

	/**
	 * 获取挑战结果奖励
	 * 
	 * @param ranking
	 * @param type
	 *            0：失败，1：胜利
	 * @return
	 */
	private int[][] getResultReward(int ranking, int type) {
		List<Struct_warreward_222> sortList = Config_warreward_222.getIns().getSortList();
		Struct_warreward_222 warreward = null;
		int[][] reward = null;
		for (int i = 0; i < sortList.size(); i++) {
			warreward = sortList.get(i);
			int[][] rank = warreward.getRank();
			if (ranking >= rank[0][0] && ranking <= rank[0][1]) {
				if (type == 0) {
					reward = warreward.getReward4();
				} else if (type == 1) {
					reward = warreward.getReward3();
				}
				break;
			}
		}
		return reward;
	}

	/**
	 * 获取晋升奖励
	 * 
	 * @param startRanking
	 * @param endRanking
	 * @return
	 */
	private int[][] getUpgradeReward(int startRanking, int endRanking) {
		List<Struct_warreward_222> sortList = Config_warreward_222.getIns().getSortList();
		Struct_warreward_222 warreward = null;
		Map<Integer, Map<Integer, Integer>> rewardMap = new HashMap<>();
		for (int ranking = startRanking; ranking >= endRanking; ranking--) {
			int[][] reward = null;
			for (int i = 0; i < sortList.size(); i++) {
				warreward = sortList.get(i);
				int[][] rank = warreward.getRank();
				if (ranking >= rank[0][0] && ranking <= rank[0][1]) {
					reward = warreward.getReward2();
					break;
				}
			}
			if (reward != null) {
				for (int[] arr : reward) {
					Map<Integer, Integer> map = rewardMap.get(arr[0]);
					if (map == null) {
						map = new HashMap<>();
						rewardMap.put(arr[0], map);
					}
					Integer num = map.get(arr[1]);
					if (num == null) {
						num = 0;
					}
					map.put(arr[1], num + arr[2]);
				}
			}
		}
		int size = 0;
		for (Map<Integer, Integer> map : rewardMap.values()) {
			size += map.size();
		}
		int[][] totalReward = new int[size][];
		int i = 0;
		for (int type : rewardMap.keySet()) {
			Map<Integer, Integer> map = rewardMap.get(type);
			for (int toolId : map.keySet()) {
				totalReward[i] = new int[] { type, toolId, map.get(toolId) };
				i++;
			}
		}
		return totalReward;
	}

	/**
	 * 扫荡
	 * 
	 * @param hero
	 * @param beChaId
	 */
	public void mopUp(final Hero hero, final long beChaId) {
		OpTaskExecutorService.PublicOrderService.execute(new GodOfWarOpTaskRunnable() {

			@Override
			public void run() {
				mopUpHandle(hero, beChaId);
			}

			@Override
			public Object getSession() {
				return OpTaskConst.GOD_OF_WAR_KEY;
			}
		});
	}

	/**
	 * 扫荡
	 * 
	 * @param hero
	 * @param beChaId
	 */
	public void mopUpHandle(Hero hero, long beChaId) {
		if (hero == null) {
			return;
		}
		try {
			GodOfWar godOfWar = hero.getGodOfWar();
			if (godOfWar == null) {
				// 未开启系统
				return;
			}
			// vip检测
			int openState = VipFunction.getIns().getVipNum(hero, VipAddType.godOfWarOpen);
			if (openState == VipConst.CLOSE) {
				return;
			}
			long hid = hero.getId();
			if (hid == beChaId) {
				// 不能扫荡自己
				GodOfWarSender.sendCmd_1412(hid, 0, 1, 0);
				return;
			}
			checkCdTime(hero, godOfWar);
			int chaNum = godOfWar.getChaNum();
			if (chaNum == 0) {
				int goodsNumBySysId = BagFunction.getIns().getGoodsNumBySysId(hero.getId(), GodOfWarConst.PROP_ID);
				if (goodsNumBySysId <= 0) {
					// 没有挑战次数
					GodOfWarSender.sendCmd_1412(hid, 0, 2, 0);
					return;
				} else {
					if (!UseAddUtil.canUse(hero, GameConst.TOOL, 1, GodOfWarConst.PROP_ID)) {
						return;
					}
					UseAddUtil.use(hero, GameConst.TOOL, 1, GodOfWarConst.PROP_ID, SourceGoodConst.GODOFWAR_REDUCE,
							true);
				}
			}
			ConcurrentHashMap<Long, GodOfWarRank> godOfWarRankMap = GodOfWarCache.getGodOfWarRankMap();
			GodOfWarRank myRank = godOfWarRankMap.get(hid);
			GodOfWarRank beChaRank = godOfWarRankMap.get(beChaId);
			if (myRank.getRanking() > beChaRank.getRanking()) {
				// 只能扫荡排行低于自己的
				GodOfWarSender.sendCmd_1412(hid, 0, 3, 0);
				return;
			}
			int currentTime = TimeDateUtil.getCurrentTime();
			ConcurrentHashMap<Long, Integer> challengeMap = GodOfWarCache.getChallengeMap();
			if (challengeMap.containsKey(beChaId)) {
				Integer time = challengeMap.get(beChaId);
				if (currentTime - time > GodOfWarConst.FIGHT_LIMIT_CLEAR) {
					challengeMap.remove(beChaId);
				} else {
					// 对方在战斗中暂时不可挑战
					return;
				}
			}
			if (challengeMap.containsKey(hid)) {
				Integer time = challengeMap.get(hid);
				if (currentTime - time > GodOfWarConst.FIGHT_LIMIT_CLEAR) {
					challengeMap.remove(hid);
				} else {
					// 被挑战中不可挑战
					return;
				}
			}
			challengeMap.put(beChaId, currentTime);
			challengeMap.put(hid, currentTime);
			// 扣除挑战次数
			int leftCha = chaNum - 1;
			if (leftCha < 0) {
				leftCha = 0;
			}
			godOfWar.setChaNum(leftCha);
			int cdTime = godOfWar.getCdTime();
			// int currentTime = TimeDateUtil.getCurrentTime();
			int leftCdTime = GodOfWarConst.CD_TIME - (currentTime - cdTime);
			if (cdTime == 0) {
				godOfWar.setCdTime(currentTime);
				leftCdTime = GodOfWarConst.CD_TIME;
			}
			godOfWar.setLastChaTime(currentTime);
			// 发送奖励
			int[][] resultReward = getResultReward(myRank.getRanking(), 1);
			if (resultReward != null) {
				UseAddUtil.add(hero, resultReward, SourceGoodConst.GOD_OF_WAR_CHA_RESULT, null, true);
			}

			GodOfWarSender.sendCmd_1412(hid, 1, leftCha, leftCdTime);
			refreshRival(hero);
			// 每日任务
			DayTaskFunction.getIns().successDayTaskType(hero, DayTaskConst.DATTASK_TYPE13);
			GodOfWarFunction.getIns().updateRedPoint(hero);
			// 任务
			TaskUserFunction.getIns().reshTaskUser(hero, TaskUserConst.TASK_TYPE_39, 1);
			SaintMonsterDailyActiveFunction.getIns().updateTaskNum(hero, SaintMonsterDailyActiveEnum.GOD_OF_WAR, 1);
			// 万兽之王-每日活跃
			MonsterKingDailyActiveFunction.getIns().updateTaskNum(hero, MonsterKingDailyActiveEnum.GOD_OF_WAR, 1);
			LogTool.info(hid, hero.getName(), "GodOfWarManager mopup, leftCha=" + leftCha, GodOfWarManager.class);

			// 少主活动-金猪送财
			ShaoZhuGoldPigFunction.getIns().checkTask(hero, ShaoZhuGoldPigConst.TASK_TYPE_4, 1);
			// 限定武将
			WuJiangGoalFunction.getIns().updateTaskNum(hero, WuJiangGoalEnum.TASK_3, 1);
			//合服充值返利-三国战神
			HeFuRechargeBackFunction.getIns().numCharge(hero, HeFuRechargeBackConst.COUNTRY_TYPE, 1);
			//桃园结义任务
			TaoyuanSwornFunction.getIns().reshSwornTask(hero, TaoyuanSwornTaskConst.TASK_ZHANSHEN_5, 1);
			// 成就树
			AchievementTreeFunction.getIns().checkTask(hero, AchievementTreeEnum.TASK_3, 1, 0);
			// 宝藏拼图
			BaoZangPinTuFunction.getIns().checkTask(hero, BaoZangPinTuConst.TASK_TYPE_9, 1);
			// 犒赏三军(活动)
			WarOrderFunction.getIns().updateTaskNum(hero, WarOrderEnum.GOAL_6, 1);
			// 犒赏三军(开服)
			WarOrderNewFunction.getIns().updateTaskNum(hero, WarOrderNewEnum.GOAL_6, 1);
		} catch (Exception e) {
			LogTool.error(e, GodOfWarManager.class, hero.getId(), hero.getName(), "GodOfWarManager mopUp fail");
		} finally {
			GodOfWarCache.getChallengeMap().remove(hero.getId());
			GodOfWarCache.getChallengeMap().remove(beChaId);
		}
	}

	public Struct_warbot_222 getRankRobot(int ranking) {
		List<Struct_warbot_222> sortList = Config_warbot_222.getIns().getSortList();
		int size = sortList.size();
		Struct_warbot_222 robot = null;
		for (int i = 0; i < size; i++) {
			robot = sortList.get(i);
			int[][] rank = robot.getRank();
			if (ranking >= rank[0][0] && ranking <= rank[0][1]) {
				return robot;
			}
		}
		return null;
	}

	/** 打开宝藏界面 */
	public void openWarStore(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			GodOfWar godOfWar = hero.getGodOfWar();
			if (godOfWar == null) {
				// 未开启系统
				return;
			}
			Set<Integer> buySet = godOfWar.getBuySet();
			List<Object[]> buyData = new ArrayList<>();
			Iterator<Integer> iterator = buySet.iterator();
			for (; iterator.hasNext();) {
				int id = iterator.next();
				buyData.add(new Object[] { id });
			}
			GodOfWarSender.sendCmd_1414(hid, buyData.toArray());
		} catch (Exception e) {
			LogTool.error(e, GodOfWarManager.class, hero.getId(), hero.getName(), "GodOfWarManager openWarStore fail");
		}
	}

	/** 购买商品 */
	public void buyGoods(Hero hero, int id) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			GodOfWar godOfWar = hero.getGodOfWar();
			if (godOfWar == null) {
				// 未开启系统
				return;
			}
			Set<Integer> buySet = godOfWar.getBuySet();
			if (buySet.contains(id)) {
				// 已购买过
				GodOfWarSender.sendCmd_1416(hid, 0, 1);
				return;
			}
			Struct_warstore_222 warstore_222 = Config_warstore_222.getIns().get(id);
			int time = warstore_222.getTime();
			int topRank = godOfWar.getPromoteAwardRank();
			if (topRank > time) {
				// 历史最高排名不满足条件
				GodOfWarSender.sendCmd_1416(hid, 0, 2);
				return;
			}
			int[][] price = warstore_222.getPrice();
			if (!UseAddUtil.canUse(hero, price)) {
				return;
			}
			UseAddUtil.use(hero, price, SourceGoodConst.GODOFWAR_STORE, true);
			buySet.add(id);
			int[][] goods = warstore_222.getStore();
			UseAddUtil.add(hero, goods, SourceGoodConst.GODOFWAR_STORE, null, true);
			GodOfWarSender.sendCmd_1416(hid, 1, id);
			GodOfWarFunction.getIns().updateRedPoint(hero);
			String usesys = hero.getTempData().getAccount().getUsesys();
			int itemid = goods[0][1];
			if(itemid==0) {
				itemid = goods[0][0];
			}
			int itemcost = price[0][2];
			int buynum = 1;
			int costtype = price[0][0];
			int type = ShopEnum.GOD_OF_WAR_SHOP.getType();
			FlowHeroEvent.addShopFlow(hero.getId(), hero.getLevel(), type, itemid, itemcost, buynum, costtype,
					hero.getZoneid(), hero.getLoginPf(), usesys, hero.getReincarnationLevel());
		} catch (Exception e) {
			LogTool.error(e, GodOfWarManager.class, hero.getId(), hero.getName(), "GodOfWarManager openWarStore fail");
		}
	}

}
