package com.teamtop.system.country.fightNorthAndSouth;

import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossZone;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.HeroOpTaskRunnable;
import com.teamtop.system.country.CountryType;
import com.teamtop.system.country.fightNorthAndSouth.model.CountryScoreRank;
import com.teamtop.system.country.fightNorthAndSouth.model.FightNSModel;
import com.teamtop.system.country.fightNorthAndSouth.model.FightNSScoreRank;
import com.teamtop.system.country.model.CountryData;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.struct.Struct_nzbz_226;

public class FightNSSysEvent extends AbsSystemEvent {

	private static FightNSSysEvent fightNSSysEvent;

	private FightNSSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized FightNSSysEvent getIns() {
		if (fightNSSysEvent == null) {
			fightNSSysEvent = new FightNSSysEvent();
		}
		return fightNSSysEvent;
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void login(final Hero hero) {
		// OpTaskExecutorService.DefaultService.execute(new HeroOpTaskRunnable() {
		//
		// @Override
		// public void run() {
		weekReset(hero);
		// }
		//
		// @Override
		// public Object getSession() {
		// return hero.getId();
		// }
		// });
		CountryData countryData = hero.getCountryData();
		if (countryData != null) {
			FightNSModel fightNSModel = countryData.getFightNSModel();
			if (fightNSModel != null) {
				int score = fightNSModel.getScore();
				if (score > 0) {
					FightNSFunction.getIns().addToRandomMap(hero, score);
				}
			}
		}
		boolean redPoint = FightNSFunction.getIns().checkRedPoint(hero);
		if (redPoint) {
			RedPointFunction.getIns().addLoginRedPoint(hero, FightNSConst.SysId, FightNSConst.FightNS,
					RedPointConst.HAS_RED);
		}
	}

	@Override
	public void logout(Hero hero) {
		FightNSManager.getIns().fightEnd(hero, 2);
	}

	@Override
	public void passGuanqia(Hero hero, int passGuanqia) {
		CountryData countryData = hero.getCountryData();
		if (countryData != null) {
			FightNSModel fightNSModel = countryData.getFightNSModel();
			if (fightNSModel != null) {
				return;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, FightNSConst.SysId)) {
				return;
			}
			fightNSModel = new FightNSModel();
			countryData.setFightNSModel(fightNSModel);
			Set<Integer> scoreAward = new HashSet<>();
			fightNSModel.setScoreAward(scoreAward);
			int mondayZeroTime = TimeDateUtil.getMondayZeroTime();
			fightNSModel.setWeekResetTime(mondayZeroTime);
			boolean redPoint = FightNSFunction.getIns().checkRedPoint(hero);
			if (redPoint) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, FightNSConst.SysId, FightNSConst.FightNS,
						RedPointConst.HAS_RED);
			}
		}
	}

	@Override
	public void loginReset(Hero hero, int now) {
		dailyReset(hero, now);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		dailyReset(hero, now);
	}

	public void dailyReset(Hero hero, int now) {
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
		fightNSModel.setBuyCha(0);// 购买次数重置
	}

	/**
	 * 周重置
	 */
	private void weekReset(Hero hero) {
		try {
			int countryType = hero.getCountryType();
			if (countryType == 0) {
				return;
			}
			CountryData countryData = hero.getCountryData();
			if (countryData == null) {
				return;
			}
			FightNSModel fightNSModel = countryData.getFightNSModel();
			if (fightNSModel == null) {
				return;
			}
			// 数据重置
			int weekResetTime = fightNSModel.getWeekResetTime();
			int mondayZeroTime = TimeDateUtil.getMondayZeroTime();
			if (weekResetTime != mondayZeroTime) {
				// 国家奖励
				if (fightNSModel.getScore() > 0) {
					sendCountryAward(countryType, hero.getId());
				}
				fightNSModel.setScore(0);
				fightNSModel.getScoreAward().clear();
				fightNSModel.setWeekResetTime(mondayZeroTime);
			}
		} catch (Exception e) {
			LogTool.error(e, FightNSSysEvent.class, hero.getId(), hero.getName(), "fns country award");
		}
	}

	@Override
	public void fixTime(int cmdId, final int now) {
		if (CrossZone.isCrossServer()) {
			return;
		}
		if (cmdId == 1) {
			try {
				// 零点发放排行奖励
				TreeSet<FightNSScoreRank> rankSet = new TreeSet<>(FightNSSysCache.getRankSet());
				Iterator<FightNSScoreRank> iterator = rankSet.iterator();
				int ranking = 1;
				int type = 2;
				FightNSScoreRank scoreRank = null;
				int[][] award = null;
				Object[] content = null;
				for (; iterator.hasNext();) {
					if (ranking > FightNSConst.RANK_SIZE) {
						break;
					}
					scoreRank = iterator.next();
					long hid = scoreRank.getHid();
					try {
						award = getAward(type, ranking);
						content = new Object[] { MailConst.MAIL_ID_FNS_PERSONAL, ranking };
						MailFunction.getIns().sendMailWithFujianDataExcel(hid, MailConst.MAIL_ID_FNS_PERSONAL, content,
								award);
						LogTool.info(hid, "", "personal ranking=" + ranking, FightNSSysEvent.class);
						ranking++;
					} catch (Exception e) {
						LogTool.error(e, FightNSSysEvent.class, hid, "", "fns personal ranking=" + ranking);
					}
				}
				// 国家排行数据备份
				copyCountryRanking();
				// 发放奖励并重置
				Map<Long, Hero> heroMap = HeroCache.getHeroMap();
				Iterator<Hero> heroIterator = heroMap.values().iterator();
				for (; heroIterator.hasNext();) {
					final Hero hero = heroIterator.next();
					try {
						OpTaskExecutorService.DefaultService.execute(new HeroOpTaskRunnable() {

							@Override
							public void run() {
								weekReset(hero);
							}

							@Override
							public Object getSession() {
								return hero.getId();
							}
						});
					} catch (Exception e) {
						LogTool.error(e, FightNSSysEvent.class, hero.getId(), hero.getName(), "fns country award");
					}
				}
				// s
			} catch (Exception e) {
				LogTool.error(e, FightNSSysEvent.class, "fns fixTime");
			} finally {
				// 个人排行重置
				FightNSSysCache.getRankSet().clear();
				// 国家排行重置
				ConcurrentHashMap<Integer, CountryScoreRank> coutryScoreMap = FightNSSysCache.getCoutryScoreMap();
				coutryScoreMap.clear();
				if(coutryScoreMap.size()==0) {				
					CountryType[] types = CountryType.values();
					for(CountryType type : types) {
						int countryType = type.getCountryType();
						CountryScoreRank rank = new CountryScoreRank();
						rank.setCountryType(countryType);
						coutryScoreMap.put(countryType, rank);
					}
				}
				// 匹配集合重置
				FightNSSysCache.getRandomMap().clear();
				FightNSSysCache.initRandomMap();
			}
		}
	}

	private void sendCountryAward(int countryType, long hid) {
		Map<Integer, Integer> lastWeekMap = FightNSSysCache.getLastWeekMap();
		if (lastWeekMap.size() == 0) {
			return;
		}
		int[][] award = null;
		Object[] content = null;
		int type = 1;
		Integer countryRanking = lastWeekMap.get(countryType);
		award = getAward(type, countryRanking);
		content = new Object[] { MailConst.MAIL_ID_FNS_COUNTRY, countryRanking };
		MailFunction.getIns().sendMailWithFujianDataExcel(hid, MailConst.MAIL_ID_FNS_COUNTRY, content, award);
		LogTool.info(hid, "", "fns country ranking=" + countryRanking, FightNSSysEvent.class);
	}

	private void copyCountryRanking() {
		List<CountryScoreRank> countryScoreRankList = FightNSSysCache.getCountryScoreRankList();
		CountryScoreRank countryScoreRank = null;
		int size = countryScoreRankList.size();
		int countryRanking = 0;
		Map<Integer, Integer> lastWeekMap = FightNSSysCache.getLastWeekMap();
		for (int i = 0; i < size; i++) {
			countryRanking = i + 1;
			countryScoreRank = countryScoreRankList.get(i);
			lastWeekMap.put(countryScoreRank.getCountryType(), countryRanking);
		}
	}

	private int[][] getAward(int type, int ranking) {
		List<Struct_nzbz_226> list = FightNSSysCache.getRankAwardMap().get(type);
		int size = list.size();
		for (int i = 0; i < size; i++) {
			Struct_nzbz_226 nzbz = list.get(i);
			int[][] rank = nzbz.getRank();
			if (ranking >= rank[0][0] && ranking <= rank[0][1]) {
				return nzbz.getReward1();
			}
		}
		return null;
	}

}
