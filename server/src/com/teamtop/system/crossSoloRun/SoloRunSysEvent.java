package com.teamtop.system.crossSoloRun;

import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentSkipListSet;

import com.alibaba.fastjson.JSON;
import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossZone;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.houtaiHttp.events.crossActivitySwitch.CrossActivitySwitchCache;
import com.teamtop.system.SystemStateEnum;
import com.teamtop.system.crossSoloRun.cross.CrossSoloRunSysCache;
import com.teamtop.system.crossSoloRun.model.SoloRunModel;
import com.teamtop.system.crossSoloRun.model.SoloRunRank;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_ddfh_225;
import excel.config.Config_ddfhrank_225;
import excel.struct.Struct_ddfh_225;
import excel.struct.Struct_ddfhrank_225;

public class SoloRunSysEvent extends AbsSystemEvent {

	private static SoloRunSysEvent soloRunSysEvent;

	private SoloRunSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized SoloRunSysEvent getIns() {
		if (soloRunSysEvent == null) {
			soloRunSysEvent = new SoloRunSysEvent();
		}
		return soloRunSysEvent;
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void login(Hero hero) {
		weekReset(hero);
		SoloRunModel soloRunModel = hero.getSoloRunModel();
		if (soloRunModel == null) {
			return;
		}
		if (SoloRunSysCache.ACT_OPEN) {
			HeroFunction.getIns().addLoginSytemState(hero, SystemIdConst.SOLO_RUN,
					SystemStateEnum.StateEnum.OPEN_NOW.getState());
			boolean redPoint = SoloRunFunction.getIns().checkRedPoint(hero);
			if (redPoint) {
				RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.SOLO_RUN, SoloRunConst.RedPoint,
						RedPointConst.HAS_RED);
			}
		}
	}

	@Override
	public void logout(Hero hero) {
		SoloRunManager.getIns().fightEnd(hero, 2);// 退出即失败
		SoloRunSysCache.getMatchMap().remove(hero.getId());
	}

	@Override
	public void loginReset(Hero hero, int now) {
		dailyReset(hero, now);
		weekReset(hero);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		dailyReset(hero, now);
		weekReset(hero);
	}

	public void weekReset(Hero hero) {
		try {
			SoloRunModel soloRunModel = hero.getSoloRunModel();
			if (soloRunModel == null) {
				return;
			}
			// int sundayZeroTime = TimeDateUtil.getMondayZeroTime() -
			// TimeDateUtil.ONE_DAY_INT;
			int mondayZeroTime = TimeDateUtil.getMondayZeroTime();
			if (soloRunModel.getWeekResetTime() != mondayZeroTime) {
				soloRunModel.setWeekResetTime(mondayZeroTime);
				soloRunModel.setScore(0);
				soloRunModel.setChaNum(SoloRunConst.DAILY_ADD_CHA);
				soloRunModel.getReportList().clear();
			}
		} catch (Exception e) {
			LogTool.error(e, SoloRunSysEvent.class, hero.getId(), hero.getName(), "week reset error");
		}
	}

	public void dailyReset(Hero hero, int now) {
		try {
			SoloRunModel soloRunModel = hero.getSoloRunModel();
			if (soloRunModel != null) {
				long hid = hero.getId();
				soloRunModel.setBuyNum(0);// 每日购买次数重置
				int winNum = soloRunModel.getWinNum();
				soloRunModel.setWinNum(0);// 每日胜利次数
				soloRunModel.setWinStreakNum(0);// 连胜次数
				int week = TimeDateUtil.getWeek();
				if (week < 7) {
					// 周一到六每天增加挑战次数
					soloRunModel.setChaNum(soloRunModel.getChaNum() + SoloRunConst.DAILY_ADD_CHA);
				}
				// 发放未领取的每日奖励
				// MAIL_ID_SOLORUN_DAILY_AWARD
				Set<Integer> winAward = soloRunModel.getWinAward();
				List<Struct_ddfh_225> sortList = Config_ddfh_225.getIns().getSortList();
				int size = sortList.size();
				int mailSysId = MailConst.MAIL_ID_SOLORUN_DAILY_AWARD;
				Struct_ddfh_225 winAwardData = null;
				for (int i = 0; i < size; i++) {
					winAwardData = sortList.get(i);
					if (winNum < winAwardData.getNum()) {
						continue;
					}
					if (winAward.contains(winAwardData.getNum())) {
						continue;
					}
					winAward.add(winAwardData.getNum());
					MailFunction.getIns().sendMailWithFujianData2(hid, mailSysId,
							new Object[] { mailSysId, winAwardData.getNum() }, winAwardData.getReward());
				}
				winAward.clear();
			}
		} catch (Exception e) {
			LogTool.error(e, SoloRunSysEvent.class, hero.getId(), hero.getName(), "dailyReset error");
		}
	}

	@Override
	public void passGuanqia(Hero hero, int passGuanqia) {
		if (hero.getSoloRunModel() == null) {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SOLO_RUN)) {
				return;
			}
			SoloRunFunction.getIns().initSoloRunModel(hero);
			if (SoloRunSysCache.ACT_OPEN) {
				HeroFunction.getIns().sendSystemState(hero.getId(), SystemIdConst.SOLO_RUN,
						SystemStateEnum.StateEnum.OPEN_NOW.getState());
			}
		}
	}

	@Override
	public void fixTime(int cmdId, int now) {
		if(CrossZone.isCrossServer()) {
			return;
		}
		if (!CrossActivitySwitchCache.checkCrossOpen(SystemIdConst.SOLO_RUN)) {
			return;
		}
		if (cmdId == 1) {
			// 周日0点重置
			// int todayZeroTime = TimeDateUtil.getTodayZeroTimeReturnInt();
			// Map<Long, Hero> heroMap = HeroCache.getHeroMap();
			// Iterator<Hero> iterator = heroMap.values().iterator();
			// for (; iterator.hasNext();) {
			// Hero hero = iterator.next();
			// try {
			// SoloRunModel soloRunModel = hero.getSoloRunModel();
			// if (soloRunModel == null) {
			// continue;
			// }
			// if (soloRunModel.getWeekResetTime() != todayZeroTime) {
			// soloRunModel.setWeekResetTime(todayZeroTime);
			// soloRunModel.setScore(0);
			// soloRunModel.setChaNum(SoloRunConst.DAILY_ADD_CHA);
			// soloRunModel.getReportList().clear();
			// }
			// } catch (Exception e) {
			// LogTool.error(e, SoloRunSysEvent.class, hero.getId(), hero.getName(), "week
			// reset error");
			// }
			// }
			// 发放本服排行奖励
			sendLocalRankReward();
			// 发放跨服奖励
			sendCrossRankReward();
		}
		if (cmdId == 5) {
			int partId = CrossCache.getlocalPartId();
			// 清除缓存
			SoloRunSysCache.getMatchMap().clear();
			SoloRunSysCache.getMatchPlayerMap().clear();
			SoloRunSysCache.getRankSet().clear();
			if (CrossSoloRunSysCache.getMatchMap(partId) != null) {
				CrossSoloRunSysCache.getMatchMap(partId).clear();
			}
			if (CrossSoloRunSysCache.getMatchMap(partId) != null) {
				CrossSoloRunSysCache.getMatchMap(partId).clear();
			}
			CrossSoloRunSysCache.getHeroGradeMap().clear();
			if (CrossSoloRunSysCache.getCrossRankSet(partId) != null) {
				CrossSoloRunSysCache.getCrossRankSet(partId).clear();
			}
		}
		if (cmdId == 2) {
			// 活动开启
			int week = TimeDateUtil.getWeek();
			if (week == 7) {
				return;
			}
			SoloRunSysCache.ACT_OPEN = true;
			Map<Long, Hero> heroMap = HeroCache.getHeroMap();
			Iterator<Hero> iterator = heroMap.values().iterator();
			for (; iterator.hasNext();) {
				Hero hero = iterator.next();
				try {
					SoloRunModel soloRunModel = hero.getSoloRunModel();
					if (soloRunModel == null) {
						continue;
					}
					HeroFunction.getIns().sendSystemState(hero.getId(), SystemIdConst.SOLO_RUN,
							SystemStateEnum.StateEnum.OPEN_NOW.getState());
				} catch (Exception e) {
					LogTool.error(e, SoloRunSysEvent.class, hero.getId(), hero.getName(), "week reset error");
				}
			}
		}
		if (cmdId == 3) {
			// 活动结束
			int week = TimeDateUtil.getWeek();
			if (week == 7) {
				return;
			}
			SoloRunSysCache.ACT_OPEN = false;
			Map<Long, Hero> heroMap = HeroCache.getHeroMap();
			Iterator<Hero> iterator = heroMap.values().iterator();
			for (; iterator.hasNext();) {
				Hero hero = iterator.next();
				try {
					SoloRunModel soloRunModel = hero.getSoloRunModel();
					if (soloRunModel == null) {
						continue;
					}
					HeroFunction.getIns().sendSystemState(hero.getId(), SystemIdConst.SOLO_RUN,
							SystemStateEnum.StateEnum.NOT_OPEN.getState());
				} catch (Exception e) {
					LogTool.error(e, SoloRunSysEvent.class, hero.getId(), hero.getName(), "week reset error");
				}
			}
		}
		if (cmdId == 4) {
			// 请求同步跨服数据
			SoloRunFunction.getIns().checkGetRankList(0, false);
		}
	}

	/**
	 * 发送本服排行奖励
	 */
	public void sendLocalRankReward() {
		try {
			ConcurrentSkipListSet<SoloRunRank> rankSet = new ConcurrentSkipListSet<>(SoloRunSysCache.getRankSet());
			LogTool.info("soloRun local rank:" + JSON.toJSONString(rankSet), SoloRunSysEvent.class);
			Iterator<SoloRunRank> rankIterator = rankSet.iterator();
			SoloRunRank soloRunRank = null;
			int ranking = 1;
			int type = 1;
			int mailSysId = MailConst.MAIL_ID_SOLORUN_LOCAL_RANK;
			for (; rankIterator.hasNext();) {
				soloRunRank = rankIterator.next();
				try {
					int[][] reward = getRankingReward(type, ranking);
					MailFunction.getIns().sendMailWithFujianData2(soloRunRank.getHid(), mailSysId,
							new Object[] { mailSysId, ranking }, reward);
				} catch (Exception e) {
					LogTool.error(e, SoloRunSysEvent.class, soloRunRank.getHid(), soloRunRank.getName(),
							"local rank award error");
				}
				ranking++;
			}
		} catch (Exception e) {
			LogTool.error(e, SoloRunSysEvent.class, "soloRun send local rank award error");
		}
	}
	
	/**
	 * 发送跨服排行奖励
	 */
	public void sendCrossRankReward() {
		try {
			int partId = CrossCache.getlocalPartId();
			ConcurrentSkipListSet<SoloRunRank> crossRankSet = CrossSoloRunSysCache.getCrossRankSet(partId);
			if (crossRankSet == null) {
				return;
			}
			ConcurrentSkipListSet<SoloRunRank> rankSet = new ConcurrentSkipListSet<>(crossRankSet);
			LogTool.info("soloRun cross rank:" + JSON.toJSONString(rankSet), SoloRunSysEvent.class);
			Iterator<SoloRunRank> rankIterator = rankSet.iterator();
			SoloRunRank soloRunRank = null;
			int ranking = 1;
			int type = 2;
			int mailSysId = MailConst.MAIL_ID_SOLORUN_CROSS_RANK;
			for (; rankIterator.hasNext();) {
				soloRunRank = rankIterator.next();
				try {
					int zonid = soloRunRank.getZonid();
					if (GameProperties.zoneids.contains(zonid)) {
						// 只处理本服的玩家
						long hid = soloRunRank.getHid();
						int[][] reward = getRankingReward(type, ranking);
						MailFunction.getIns().sendMailWithFujianData2(hid, mailSysId,
								new Object[] { mailSysId, ranking }, reward);
					}
				} catch (Exception e) {
					LogTool.error(e, SoloRunSysEvent.class, soloRunRank.getHid(), soloRunRank.getName(),
							"cross rank award error");
				}
				ranking++;
			}
		} catch (Exception e) {
			LogTool.error(e, SoloRunSysEvent.class, "soloRun send cross rank award error");
		}
	}

	/**
	 * 获得排行奖励数据
	 * 
	 * @param type
	 *            1 本服，2 跨服
	 * @param ranking
	 *            排名
	 */
	public int[][] getRankingReward(int type, int ranking) {
		List<Struct_ddfhrank_225> sortList = Config_ddfhrank_225.getIns().getSortList();
		int size = sortList.size();
		for (int i = 0; i < size; i++) {
			Struct_ddfhrank_225 rankData = sortList.get(i);
			int rankType = rankData.getId() / 100;
			if (rankType == type) {
				int[][] rank = rankData.getRank();
				if (ranking >= rank[0][0] && ranking <= rank[0][1]) {
					return rankData.getReward();
				}
			}
		}
		return null;
	}

}
