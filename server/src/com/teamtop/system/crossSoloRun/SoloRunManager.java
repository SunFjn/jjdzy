package com.teamtop.system.crossSoloRun;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentSkipListSet;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossFunction;
import com.teamtop.cross.callback.Callback;
import com.teamtop.cross.upload.CrossHeroBaseModel;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.achievement.AchievementEnum;
import com.teamtop.system.achievement.AchievementFunction;
import com.teamtop.system.activity.ativitys.happySoloRun.HappySoloRunFunction;
import com.teamtop.system.activity.ativitys.wuJiangGoal.WuJiangGoalEnum;
import com.teamtop.system.activity.ativitys.wuJiangGoal.WuJiangGoalFunction;
import com.teamtop.system.battle.BattleConst;
import com.teamtop.system.battle.BattleFunction;
import com.teamtop.system.crossSoloRun.cross.CrossSoloRunSysCache;
import com.teamtop.system.crossSoloRun.cross.SoloRunCrossType;
import com.teamtop.system.crossSoloRun.model.SoloRunModel;
import com.teamtop.system.crossSoloRun.model.SoloRunRank;
import com.teamtop.system.event.backstage.events.flowHero.FlowHeroEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.openDaysSystem.monsterKingDailyActive.MonsterKingDailyActiveEnum;
import com.teamtop.system.openDaysSystem.monsterKingDailyActive.MonsterKingDailyActiveFunction;
import com.teamtop.system.openDaysSystem.saintMonsterDailyActive.SaintMonsterDailyActiveEnum;
import com.teamtop.system.openDaysSystem.saintMonsterDailyActive.SaintMonsterDailyActiveFunction;
import com.teamtop.system.openDaysSystem.shaozhugoldpig.ShaoZhuGoldPigConst;
import com.teamtop.system.openDaysSystem.shaozhugoldpig.ShaoZhuGoldPigFunction;
import com.teamtop.system.robot.CrossHeroBaseRobot;
import com.teamtop.system.robot.RobotFunction;
import com.teamtop.util.ProbabilityEvent.RandomUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_ddfh_225;
import excel.config.Config_ddfhdan_225;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_ddfh_225;
import excel.struct.Struct_ddfhdan_225;
import io.netty.channel.Channel;

/**
 * 单刀赴会
 * @author hzp
 *
 */
public class SoloRunManager {

	private static SoloRunManager soloRunManager;

	private SoloRunManager() {

	}

	public static synchronized SoloRunManager getIns() {
		if (soloRunManager == null) {
			soloRunManager = new SoloRunManager();
		}
		return soloRunManager;
	}

	/**
	 * 打开单刀赴会界面
	 * 
	 * @param hero
	 */
	public void openSoloRun(Hero hero) {
		if (hero == null) {
			return;
		}
		try {
			long hid = hero.getId();
			SoloRunModel soloRunModel = hero.getSoloRunModel();
			if (soloRunModel == null) {
				if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SOLO_RUN)) {
					return;
				}else {
					soloRunModel = SoloRunFunction.getIns().initSoloRunModel(hero);
				}
			}
			// if (!SoloRunSysCache.ACT_OPEN) {
			// return;
			// }
			int currentTime = TimeDateUtil.getCurrentTime();
			int startTime = TimeDateUtil.getOneTime(0, SoloRunConst.StartTime_Hour, SoloRunConst.StartTime_Minute, 0);

			int score = soloRunModel.getScore();
			int grade = getGrade(score);
			int chaNum = soloRunModel.getChaNum();
			int buyNum = soloRunModel.getBuyNum();
			int leftBuyNum = SoloRunConst.BUY_LIMIT - buyNum;
			int winNum = soloRunModel.getWinNum();

			int endTime = TimeDateUtil.getOneTime(0, SoloRunConst.EndTime_Hour, SoloRunConst.EndTime_Minute, 0);
			// int actTime = endTime - currentTime;
			int week = TimeDateUtil.getWeek();
			if (week == 7) {
				endTime = 0;
			}
			int myRanking = SoloRunSysCache.getLocalRanking(hid);

			Set<Integer> winAward = soloRunModel.getWinAward();
			List<Object[]> winAwardData = new ArrayList<>();
			for (Integer wa : winAward) {
				winAwardData.add(new Object[] { wa });
			}
			int time = endTime;
//			if (currentTime < startTime) {
//				time = startTime;
//			}
			SoloRunSender.sendCmd_1612(hid, grade, score, chaNum, leftBuyNum, winNum, myRanking, time,
					winAwardData.toArray());
		} catch (Exception e) {
			LogTool.error(e, SoloRunManager.class, hero.getId(), hero.getName(), "openSoloRun fail");
		}
	}

	public int getGrade(int score) {
		List<Struct_ddfhdan_225> sortList = Config_ddfhdan_225.getIns().getSortList();
		Struct_ddfhdan_225 gradeInfo = null;
		int size = sortList.size();
		int grade = 1;
		for (int i = 0; i <size; i++) {
			if(grade==size) {
				break;
			}
			gradeInfo = sortList.get(i);
			if (gradeInfo.getWin() != 0 && score >= gradeInfo.getWin()) {
				grade = gradeInfo.getDan()+1;
			}
		}
		return grade;
	}

	/**
	 * 领取每日奖励
	 * 
	 * @param hero
	 * @param winAwardId
	 */
	public void getDailyAward(Hero hero, int winAwardId) {
		if (hero == null) {
			return;
		}
		try {
			long hid = hero.getId();
			SoloRunModel soloRunModel = hero.getSoloRunModel();
			if (soloRunModel == null) {
				return;
			}
			// if (!SoloRunSysCache.ACT_OPEN) {
			// return;
			// }
			if (soloRunModel.getWinNum() < winAwardId) {
				return;
			}
			Set<Integer> winAward = soloRunModel.getWinAward();
			if (winAward.contains(winAwardId)) {
				// 已领取
				SoloRunSender.sendCmd_1614(hid, 0, 1);
				return;
			}
			Struct_ddfh_225 awardInfo = Config_ddfh_225.getIns().get(winAwardId);
			if (awardInfo == null) {
				// 奖励数据不存在
				SoloRunSender.sendCmd_1614(hid, 0, 2);
				return;
			}
			int[][] reward = awardInfo.getReward();
			winAward.add(winAwardId);
			UseAddUtil.add(hero, reward, SourceGoodConst.SOLORUN_DAILY_AWARD, null, true);
			SoloRunSender.sendCmd_1614(hid, 1, winAwardId);
			LogTool.info(hid, hero.getName(), "SoloRunManager getDailyAward winAwardId="+winAwardId, SoloRunManager.class);
		} catch (Exception e) {
			LogTool.error(e, SoloRunManager.class, hero.getId(), hero.getName(), "SoloRun getDailyAward fail");
		}
	}

	/**
	 * 领取晋级奖励
	 * @param hero
	 * @param grade
	 */
	public void getGradeAward(Hero hero, int grade) {
		if (hero == null) {
			return;
		}
		try {
			long hid = hero.getId();
			SoloRunModel soloRunModel = hero.getSoloRunModel();
			if (soloRunModel == null) {
				return;
			}
			Struct_ddfhdan_225 gradeInfo = Config_ddfhdan_225.getIns().get(grade);
			if (gradeInfo == null) {
				// 奖励数据不存在
				return;
			}
			int[][] reward = gradeInfo.getReward();
			if(reward==null) {
				return;
			}
			// UseAddUtil.add(hero, reward, SourceGoodConst.SOLORUN_GRADE_AWARD, null,
			// true);
			int mailSysId = MailConst.MAIL_ID_SOLORUN_GRADE_AWARD;
			MailFunction.getIns().sendMailWithFujianData2(hid, mailSysId,
					new Object[] { mailSysId, gradeInfo.getDan() }, reward);
			LogTool.info(hid, hero.getName(), "SoloRunManager getGradeAward grade=" + grade, SoloRunManager.class);
		} catch (Exception e) {
			LogTool.error(e, SoloRunManager.class, hero.getId(), hero.getName(), "SoloRun getGradeAward fail");
		}
	}

	/**
	 * 获取排行榜数据
	 * 
	 * @param hero
	 * @param type
	 */
	public void getRankList(Hero hero, int type) {
		if (hero == null) {
			return;
		}
		try {
			long hid = hero.getId();
			SoloRunModel soloRunModel = hero.getSoloRunModel();
			if (soloRunModel == null) {
				return;
			}
//			if (!SoloRunSysCache.ACT_OPEN) {
//				return;
//			}
			ConcurrentSkipListSet<SoloRunRank> rankSet = null;
			int rankSize = 0;
			if (type == 1) {
				rankSet = new ConcurrentSkipListSet<>(SoloRunSysCache.getRankSet());
				rankSize = SoloRunConst.LOCAL_RANK_SIZE;
			} else {
				SoloRunFunction.getIns().checkGetRankList(hid, true);
				int partId = CrossCache.getlocalPartId();
				rankSet = new ConcurrentSkipListSet<>();
				ConcurrentSkipListSet<SoloRunRank> crossRankSet = CrossSoloRunSysCache.getCrossRankSet(partId);
				if (crossRankSet != null) {
					rankSet = new ConcurrentSkipListSet<>(crossRankSet);
				}
				rankSize = SoloRunConst.CROSS_RANK_SIZE;
			}
			List<Object[]> sendList = new ArrayList<>();
			Iterator<SoloRunRank> iterator = rankSet.iterator();
			SoloRunRank rank = null;
			int myRanking = 0;
			int ranking = 1;
			for (; iterator.hasNext();) {
				rank = iterator.next();
				int score = rank.getScore();
				int grade = getGrade(score);
				sendList.add(new Object[] { ranking, grade, rank.getHid(), rank.getName(), score });
				if (rank.getHid() == hid) {
					myRanking = ranking;
				}
				if (ranking >= rankSize) {
					break;
				}
				ranking++;
			}
			int grade = getGrade(soloRunModel.getScore());
			SoloRunSender.sendCmd_1618(hid, type, sendList.toArray(), myRanking, grade);
		} catch (Exception e) {
			LogTool.error(e, SoloRunManager.class, hero.getId(), hero.getName(), "SoloRun getRankList");
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
			SoloRunModel soloRunModel = hero.getSoloRunModel();
			if (soloRunModel == null) {
				return;
			}
			if (!SoloRunSysCache.ACT_OPEN) {
				return;
			}
			int buyNum = soloRunModel.getBuyNum();
			int newNum = buyNum + num;
			if (newNum > SoloRunConst.BUY_LIMIT) {
				// 已达今日最大购买次数
				SoloRunSender.sendCmd_1620(hid, 0, 1, 0);
				return;
			}
			int[][] other = Config_xtcs_004.getIns().get(SoloRunConst.BUY_COST).getOther();
			if (!UseAddUtil.canUse(hero, other, num)) {
				// 元宝不足
				SoloRunSender.sendCmd_1620(hid, 0, 2, 0);
				return;
			}
			UseAddUtil.use(hero, other, num, SourceGoodConst.SOLORUN_BUY_CHA, true);
			buyNum += num;
			soloRunModel.setBuyNum(buyNum);
			int chaNum = soloRunModel.getChaNum() + num;
			soloRunModel.setChaNum(chaNum);
			int leftBuy = SoloRunConst.BUY_LIMIT - buyNum;
			SoloRunSender.sendCmd_1620(hid, 1, chaNum, leftBuy);
			LogTool.info(hid, hero.getName(), "SoloRunManager buyCha buyNum=" + buyNum+", num="+num, SoloRunManager.class);
		} catch (Exception e) {
			LogTool.error(e, SoloRunManager.class, hero.getId(), hero.getName(), "SoloRun buyCha fail");
		}
	}

	/**
	 * 请求匹配
	 * @param hero
	 */
	public void askMatch(final Hero hero) {
		if (hero == null) {
			return;
		}
		final long hid = hero.getId();
		try {
			SoloRunModel soloRunModel = hero.getSoloRunModel();
			if (soloRunModel == null) {
				return;
			}
			if (!SoloRunSysCache.ACT_OPEN) {
				return;
			}
			int currentTime = TimeDateUtil.getCurrentTime();
			Map<Long, int[]> matchMap = SoloRunSysCache.getMatchMap();
			if (matchMap.containsKey(hid)) {
				// 已经在匹配中
				int[] info = matchMap.get(hid);
				int startTime = info[0];
				int passTime = currentTime - startTime;
				if (passTime >= SoloRunConst.MATCH_LIMIT_TIME) {
					matchMap.remove(hid);
				} else {
					SoloRunSender.sendCmd_1622(hid, 1);
					return;
				}
			}
			int chaNum = soloRunModel.getChaNum();
			if (chaNum == 0) {
				// 已无挑战次数
				SoloRunSender.sendCmd_1622(hid, 2);
				return;
			}
			// 加入匹配记录缓存
			matchMap.put(hid, new int[] { currentTime, 0 });
			// 通知前端成功进入匹配
			SoloRunSender.sendCmd_1622(hid, 0);
			int loseStreakNum = soloRunModel.getLoseStreakNum();
			if (loseStreakNum >= 2) {// 连输2把必定匹配机器人
				CrossHeroBaseRobot beChaModel = RobotFunction.getIns().createCrossHeroBaseRobot(hero,
						SoloRunConst.ROBOT_ADDITION);
				matchEnd(hid, beChaModel);
				return;
			}
			// 发送匹配信息到跨服
			// 创建跨服数据
			Channel crossChannel = Client_2.getIns().getCrossChannel();
			if (crossChannel == null || (crossChannel != null && (!crossChannel.isActive()))) {
				SoloRunSender.sendCmd_1624(hid, 0, 0, "", 0, 0, 1);
				matchMap.remove(hid);
				return;
			}
			CrossHeroBaseModel model = new CrossHeroBaseModel();
			CrossFunction.makeCrossBaseHeroModel(model, hero);
			CrossData data = new CrossData();
			data.putObject(SoloRunCrossType.heroBaseModel.name(), model);
			int grade = getGrade(soloRunModel.getScore());
			data.putObject(SoloRunCrossType.grade, grade);
			if (!TimeDateUtil.serverOpenAtOverDays(8)) {
				data.putObject(SoloRunCrossType.match, 0);
				CrossHeroBaseModel localMatch = localMatch(hero, model, grade);
				matchEnd(hid, localMatch);
				NettyWrite.writeXData(crossChannel, CrossConst.SOLORUN_SG_MATCH, data, new Callback() {

					@Override
					public void dataReci(Channel channel, CrossData crossData) {
						// 只是为了上传不做回调处理
					}
				});
				return;
			}
			data.putObject(SoloRunCrossType.match, 1);
			NettyWrite.writeXData(crossChannel, CrossConst.SOLORUN_SG_MATCH, data, new Callback() {
				
				@Override
				public void dataReci(Channel channel, CrossData crossData) {
					CrossHeroBaseModel beChaModel = crossData.getObject(SoloRunCrossType.enemyBaseModel.name(), CrossHeroBaseModel.class);
					byte robot = crossData.getObject(SoloRunCrossType.robot.name(), Byte.class);
					if (robot == 1) {
						beChaModel = RobotFunction.getIns().createCrossHeroBaseRobot(hero, SoloRunConst.ROBOT_ADDITION);
					}
					matchEnd(hid, beChaModel);
				}
			});
		} catch (Exception e) {
			LogTool.error(e, SoloRunManager.class, hero.getId(), hero.getName(), "SoloRun askMatch fail");
			SoloRunSysCache.getMatchMap().remove(hid);
		}
	}

	public CrossHeroBaseModel localMatch(Hero hero, CrossHeroBaseModel model, int grade) {
		try {
			long hid = hero.getId();
			// HeroCache.getHeroMap().put(hid, hero);// 替换为最新的数据
			CrossSoloRunSysCache.getModelMap().put(hid, model);
			Integer oldGrade = CrossSoloRunSysCache.getHeroGradeMap().get(hid);
			if (oldGrade == null) {
				CrossSoloRunSysCache.getHeroGradeMap().put(hid, grade);// 更新段位
			}
			int partId = CrossCache.getlocalPartId();
			if (oldGrade != null && oldGrade != grade) {
				CrossSoloRunSysCache.getHeroGradeMap().put(hid, grade);// 更新段位
				CrossSoloRunSysCache.getMatchSet(oldGrade, partId).remove(hid);// 从老段位移除
			}
			// 放入匹配列表
			Set<Long> matchSet = CrossSoloRunSysCache.getMatchSet(grade, partId);
			int size = matchSet.size();
			if (size < SoloRunConst.GRADE_MATCH_LIMIT) {
				matchSet.add(hid);// 加入匹配集合
			}
			CrossHeroBaseModel beChaModel = null;
			byte robot = 0;
			if (size == 0) {
				// 匹配机器人
				robot = 1;
			} else {
				List<Long> myMatchList = CrossSoloRunSysCache.getMyMatchList(hid, grade, partId);
				if (myMatchList.size() == 0) {
					// 匹配机器人
					robot = 1;
				} else {
					int randomSize = myMatchList.size() - 1;
					int random = RandomUtil.getRandomNumInAreas(0, randomSize);
					long beChaHid = myMatchList.get(random);
					beChaModel = CrossSoloRunSysCache.getModelMap().get(beChaHid);
				}
			}
			if (robot == 1) {
				beChaModel = RobotFunction.getIns().createCrossHeroBaseRobot(hero, SoloRunConst.ROBOT_ADDITION);
			}
			return beChaModel;
		} catch (Exception e) {
			LogTool.error(e, SoloRunManager.class, "SoloRunManager localMatch hid = " + model.getId());
		}
		return null;
	}

	/**
	 * 跨服返回匹配成功
	 */
	public void matchEnd(long hid, CrossHeroBaseModel beChaModel) {
		try {
			Hero hero = HeroCache.getHero(hid);
			if (hero == null) {
				// 已下线
				return;
			}
			if (!hero.isOnline()) {
				// 已下线
				return;
			}
			SoloRunModel soloRunModel = hero.getSoloRunModel();
			// 扣除挑战次数
			int chaNum = soloRunModel.getChaNum();
			chaNum -= 1;
			soloRunModel.setChaNum(chaNum);
			HeroFunction.getIns().sendBattleHeroAttr(hero, beChaModel);
			SoloRunSysCache.getMatchPlayerMap().put(hid, beChaModel);
			long enemyId = beChaModel.getId();
			String name = beChaModel.getNameZoneid();
			int icon = beChaModel.getIcon();
			int frame = beChaModel.getFrame();
			int result = BattleFunction.checkWinPlayer(hero, beChaModel.getTotalStrength(), BattleConst.OTHER);
			Map<Long, int[]> matchMap = SoloRunSysCache.getMatchMap();
			int[] info = matchMap.get(hid);
			info[1] = result;
			SoloRunSender.sendCmd_1624(hid, 1, enemyId, name, icon, frame, result);
			//全民狂欢-单刀赴会玩法
			HappySoloRunFunction.getIns().addNumByType(hero);
			SaintMonsterDailyActiveFunction.getIns().updateTaskNum(hero, SaintMonsterDailyActiveEnum.SOLO_RUM, 1);
			// 万兽之王-每日活跃
			MonsterKingDailyActiveFunction.getIns().updateTaskNum(hero, MonsterKingDailyActiveEnum.SOLO_RUM, 1);
			String usesys = hero.getTempData().getAccount().getUsesys();
			FlowHeroEvent.addJoinSystemFlow(hero.getId(), hero.getLevel(), hero.getVipLv(), hero.getCreateJob(),
					hero.getTotalStrength(), SystemIdConst.SOLO_RUN, hero.getZoneid(), hero.getPf(), usesys,
					hero.getReincarnationLevel());
			// 限定武将
			WuJiangGoalFunction.getIns().updateTaskNum(hero, WuJiangGoalEnum.TASK_10, 1);
			// 少主活动-金猪送财
			ShaoZhuGoldPigFunction.getIns().checkTask(hero, ShaoZhuGoldPigConst.TASK_TYPE_3, 1);
		} catch (Exception e) {
			LogTool.error(e, SoloRunManager.class, "SoloRun matchEnd fail");
			SoloRunSysCache.getMatchPlayerMap().remove(hid);
			SoloRunSysCache.getMatchMap().remove(hid);
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
			SoloRunModel soloRunModel = hero.getSoloRunModel();
			if (soloRunModel == null) {
				return;
			}
			CrossHeroBaseModel crossHeroBaseModel = SoloRunSysCache.getMatchPlayerMap().get(hid);
			if (crossHeroBaseModel == null) {
				return;
			}
			int oldGrade = getGrade(soloRunModel.getScore());
			int[] info = SoloRunSysCache.getMatchMap().get(hid);
			int serverResult = info[1];
			if (serverResult == 2) {
				serverResult = result;
			}
			if (result == 2 || result == 0) {
				serverResult = 0;
			}
			int[][] reward = null;
			int getScore = 0;
			if (serverResult == 1) {
				// 积分处理
				int winNum = soloRunModel.getWinNum();
				soloRunModel.setWinNum(winNum + 1);
				int winStreakNum = soloRunModel.getWinStreakNum()+1;
				soloRunModel.setWinStreakNum(winStreakNum);
				soloRunModel.setLoseStreakNum(0);
				int extScore = (winStreakNum-1) * Config_xtcs_004.getIns().get(SoloRunConst.WINNING_ADD_SCORE).getNum();// 连胜额外积分
				int extLimit = Config_xtcs_004.getIns().get(SoloRunConst.WINNING_LIMIT).getNum();
				if (extScore > extLimit) {
					extScore = extLimit;
				}
				int winScore = Config_xtcs_004.getIns().get(SoloRunConst.WIN_SCORE).getNum();
				getScore = winScore + extScore;
				soloRunModel.setScore(soloRunModel.getScore() + getScore);// 积分
				reward = Config_xtcs_004.getIns().get(SoloRunConst.WIN_AWARD).getOther();
				UseAddUtil.add(hero, reward, SourceGoodConst.SOLORUN_FIGHT_WIN, null, true);
			}else {
				// 积分处理
				int loseScore = Config_xtcs_004.getIns().get(SoloRunConst.LOSE_SCORE).getNum();
				soloRunModel.setScore(soloRunModel.getScore() + loseScore);// 积分
				getScore = loseScore;
				// 清除连胜
				soloRunModel.setWinStreakNum(0);
				soloRunModel.setLoseStreakNum(soloRunModel.getLoseStreakNum() + 1);
				reward = Config_xtcs_004.getIns().get(SoloRunConst.LOSE_AWARD).getOther();
				UseAddUtil.add(hero, reward, SourceGoodConst.SOLORUN_FIGHT_LOSE, null, true);
			}
			List<Object[]> awardData = new ArrayList<>();
			if (reward != null) {
				for (int[] arr : reward) {
					awardData.add(new Object[] { arr[0], arr[1], arr[2] });
				}
			}
			addReport(hero, soloRunModel, serverResult, crossHeroBaseModel.getNameZoneid(), getScore);
			int totalScore = soloRunModel.getScore();
			int grade = getGrade(totalScore);
			// 更新排行
			SoloRunSysCache.addToRank(hero);
			int myRanking = SoloRunSysCache.getLocalRanking(hid);
			SoloRunSender.sendCmd_1626(hid, serverResult, awardData.toArray(), totalScore, grade, myRanking);
			// 段位积分变化通知跨服
			if(grade>oldGrade) {				
				getGradeAward(hero, grade);
				// 成就
				AchievementFunction.getIns().checkTask(hero, AchievementEnum.GOAL_42, grade);
			}
			CrossData crossData = new CrossData();
			crossData.putObject(SoloRunCrossType.hid, hid);
			crossData.putObject(SoloRunCrossType.grade, grade);
			crossData.putObject(SoloRunCrossType.score, totalScore);
			crossData.putObject(SoloRunCrossType.hName, hero.getName());
			crossData.putObject(SoloRunCrossType.hNameZoneid, hero.getNameZoneid());
			if (!TimeDateUtil.serverOpenAtOverDays(8)) {
				crossData.putObject(SoloRunCrossType.match, 0);
			} else {
				crossData.putObject(SoloRunCrossType.match, 1);
			}
			Channel crossChannel = Client_2.getIns().getCrossChannel();
			NettyWrite.writeXData(crossChannel, CrossConst.SOLORUN_SG_UPDATE_GRADE, crossData);
			LogTool.info(hid, hero.getName(), "SoloRunManager fightEnd totalScore=" + totalScore+", getScore="+getScore, SoloRunManager.class);
		} catch (Exception e) {
			LogTool.error(e, SoloRunManager.class, hero.getId(), hero.getName(), "SoloRun fightEnd fail");
		} finally {
			SoloRunSysCache.getMatchMap().remove(hid);
			SoloRunSysCache.getMatchPlayerMap().remove(hid);
		}
	}

	/**
	 * 更新战报
	 * @param hero
	 * @param soloRunModel
	 * @param serverResult
	 * @param name
	 * @param score
	 */
	private void addReport(Hero hero, SoloRunModel soloRunModel, int serverResult, String name, int score) {
		try {
			List<List<String>> reportList = soloRunModel.getReportList();
			List<String> list = new ArrayList<>();
			list.add(String.valueOf(serverResult));
			list.add(name);
			list.add(String.valueOf(score));
			reportList.add(list);
			if (reportList.size() > SoloRunConst.REPORT_NUM) {
				reportList.remove(0);
			}
		} catch (Exception e) {
			LogTool.error(e, SoloRunManager.class, hero.getId(), hero.getName(), "SoloRun addReport fail");
		}
	}

	/**
	 * 获取战报数据
	 * 
	 * @param hero
	 */
	public void getReport(Hero hero) {
		if (hero == null) {
			return;
		}
		try {
			long hid = hero.getId();
			SoloRunModel soloRunModel = hero.getSoloRunModel();
			if (soloRunModel == null) {
				return;
			}
			List<List<String>> reportList = soloRunModel.getReportList();
			int size = reportList.size();
			List<Object[]> reportData = new ArrayList<>();
			for(int i=0;i<size;i++) {
				List<String> list = reportList.get(i);
				reportData.add(new Object[] {Integer.parseInt(list.get(0)), list.get(1)==null?"":list.get(1), Integer.parseInt(list.get(2))});
			}
			SoloRunSender.sendCmd_1628(hid, reportData.toArray());
		} catch (Exception e) {
			LogTool.error(e, SoloRunManager.class, hero.getId(), hero.getName(), "SoloRun getReport fail");
		}
	}

}
