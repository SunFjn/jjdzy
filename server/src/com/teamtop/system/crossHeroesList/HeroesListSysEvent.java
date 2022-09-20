package com.teamtop.system.crossHeroesList;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;

import com.teamtop.system.SystemStateEnum;
import com.teamtop.system.crossHeroesList.model.HeroesListData;
import com.teamtop.system.crossHeroesList.model.HeroesListRank;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_qyrank_235;
import excel.struct.Struct_qypoint_235;
import excel.struct.Struct_qyrank_235;

public class HeroesListSysEvent extends AbsSystemEvent {

	private static HeroesListSysEvent heroesListSysEvent;

	private HeroesListSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized HeroesListSysEvent getIns() {
		if (heroesListSysEvent == null) {
			heroesListSysEvent = new HeroesListSysEvent();
		}
		return heroesListSysEvent;
	}

	@Override
	public void init(Hero hero) {
		HeroesListData heroesListData = hero.getHeroesListData();
		if(heroesListData==null) {
			heroesListData = new HeroesListData();
			heroesListData.setHid(hero.getId());
			Set<Integer> scoreReward = new HashSet<>();
			heroesListData.setScoreReward(scoreReward);
			hero.setHeroesListData(heroesListData);
		}
	}

	@Override
	public void login(Hero hero) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, HeroesListConst.SysId)) {
			return;
		}
		HeroFunction.getIns().addLoginSytemState(hero, HeroesListConst.SysId,
				SystemStateEnum.StateEnum.OPEN_NOW.getState());
		boolean redPoint = HeroesListFunction.getIns().checkRedPoint(hero);
		if(redPoint) {
			RedPointFunction.getIns().addLoginRedPoint(hero, HeroesListConst.SysId, HeroesListConst.Red_Point, RedPointConst.HAS_RED);
		}
		int score = hero.getHeroesListData().getScore();
		if (score >= HeroesListConst.RANK_SCORE) {
			TreeSet<HeroesListRank> rankSet = HeroesListSysCache.getHeroesListCache().getRankSet();
			int rankSize = rankSet.size();
			if (rankSize >= HeroesListConst.RANK_SIZE) {
				HeroesListRank rank = rankSet.last();
				if (score >= rank.getScore()) {
					HeroesListFunction.getIns().updateMyRank(hero, score);
				}
			} else {
				HeroesListFunction.getIns().updateMyRank(hero, score);
			}
		}
		LogTool.info(hero.getId(), hero.getName(), "heroeslist score="+score, HeroesListSysEvent.class);
	}
	
	@Override
	public void loginReset(Hero hero, int now) {
		dailyReset(hero, now);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		dailyReset(hero, now);
		if (!HeroFunction.getIns().checkSystemOpen(hero, HeroesListConst.SysId)) {
			return;
		}
		HeroFunction.getIns().sendSystemState(hero.getId(), HeroesListConst.SysId,
				SystemStateEnum.StateEnum.OPEN_NOW.getState());
	}

	private void dailyReset(Hero hero, int now) {
		try {
			HeroesListData heroesListData = hero.getHeroesListData();
			int score = heroesListData.getScore();
			if (score > 0) {
				int week = heroesListData.getWeek();
				if(week>0){					
					long hid = hero.getId();
					int mailSysId = MailConst.MAIL_ID_HEROESLIST_SCORE;
					Set<Integer> scoreReward = heroesListData.getScoreReward();
					List<Struct_qypoint_235> list = HeroesListSysCache.getWeekRewardMap().get(week);
					int size = list.size();
					Struct_qypoint_235 pointData = null;
					for (int i = 0; i < size; i++) {
						pointData = list.get(i);
						if (score >= pointData.getPoint() && (!scoreReward.contains(pointData.getHb()))) {
							// 邮件发放奖励
							MailFunction.getIns().sendMailWithFujianData2(hid, mailSysId, new Object[] { mailSysId },
									pointData.getReward());
						}
					}
				}
			}
			heroesListData.setWeek(TimeDateUtil.getWeek());
			heroesListData.setScore(0);
			heroesListData.setTempScore(0);
			heroesListData.getScoreReward().clear();
			LogTool.info(hero.getId(), hero.getName(), "HeroesList score="+score, HeroesListSysEvent.class);
		} catch (Exception e) {
			LogTool.error(e, HeroesListSysEvent.class, hero.getId(), hero.getName(), "HeroesListSysEvent dailyReset");
		}
	}

	@Override
	public void zeroPub(int now) {
		// 发放排行奖励
		// TreeSet<HeroesListRank> rankSet =
		// HeroesListSysCache.getHeroesListCache().getRankSet();
		// Iterator<HeroesListRank> iterator = rankSet.iterator();
		// HeroesListRank rank = null;
		// int mailSysId = MailConst.MAIL_ID_HEROESLIST_RANK;
		// int ranking = 0;
		// for (; iterator.hasNext();) {
		// rank = iterator.next();
		// if (GameProperties.zoneids.contains(rank.getZoneid())) {
		// // 邮件发放奖励
		// int[][] rankReward = getRankReward(ranking);
		// MailFunction.getIns().sendMailWithFujianData2(rank.getHid(), mailSysId,
		// new Object[] { mailSysId, ranking }, rankReward);
		// }
		// ranking++;
		// }
		// HeroesListSysCache.getHeroesListCache().getRankSet().clear();
	}

	private int[][] getRankReward(int ranking) {
		int week = TimeDateUtil.getWeek();
		if (week == 1) {
			week = 7;
		} else {
			week -= 1;
		}
		List<Struct_qyrank_235> sortList = Config_qyrank_235.getIns().getSortList();
		int size = sortList.size();
		Struct_qyrank_235 rankData = null;
		int[][] rank = null;
		for (int i = 0; i < size; i++) {
			rankData = sortList.get(i);
			rank = rankData.getRank();
			if (ranking >= rank[0][0] && ranking >= rank[0][1]) {
				int[][] reward = HeroesListSysCache.getRankRewardMap().get(rankData.getId()).get(week - 1);
				return reward;
			}
		}
		return null;
	}

	@Override
	public void passGuanqia(Hero hero, int passGuanqia) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, HeroesListConst.SysId)) {
			return;
		}
		HeroFunction.getIns().sendSystemState(hero.getId(), HeroesListConst.SysId,
				SystemStateEnum.StateEnum.OPEN_NOW.getState());
		HeroesListData heroesListData = hero.getHeroesListData();
		if (heroesListData != null) {
			int tempScore = heroesListData.getTempScore();
			heroesListData.setTempScore(0);
			if (tempScore > 0) {
				int score = heroesListData.getScore() + tempScore;
				heroesListData.setScore(score);
			}
		}
		boolean redPoint = HeroesListFunction.getIns().checkRedPoint(hero);
		if(redPoint) {
			RedPointFunction.getIns().addLoginRedPoint(hero, HeroesListConst.SysId, HeroesListConst.Red_Point, RedPointConst.HAS_RED);
		}
	}

	@Override
	public void fixTime(int cmdId, int now) {
		if (cmdId == 1) {
			try {
				HeroesListSysCache.getHeroesListCache().getRankSet().clear();
			} catch (Exception e) {
				LogTool.error(e, HeroesListSysEvent.class, "HeroesListSysEvent cmdId=" + cmdId);
			}
		}
	}

}
