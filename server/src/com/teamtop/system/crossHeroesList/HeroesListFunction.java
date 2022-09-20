package com.teamtop.system.crossHeroesList;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;

import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.crossHeroesList.cross.HeroesListCrossType;
import com.teamtop.system.crossHeroesList.model.HeroesListData;
import com.teamtop.system.crossHeroesList.model.HeroesListRank;
import com.teamtop.system.event.useAddEvent.UseAddCache;
import com.teamtop.system.global.GlobalData;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroConst;
import com.teamtop.system.hero.HeroDao;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.ProbabilityEvent.RandomUtil;
import com.teamtop.util.db.trans.ObjStrTransUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_kuafu_200;
import excel.config.Config_qy_235;
import excel.struct.Struct_kuafu_200;
import excel.struct.Struct_qy_235;
import excel.struct.Struct_qypoint_235;
import io.netty.channel.Channel;

public class HeroesListFunction {

	private static HeroesListFunction heroesListFunction;

	private HeroesListFunction() {
	}

	public static synchronized HeroesListFunction getIns() {
		if (heroesListFunction == null) {
			heroesListFunction = new HeroesListFunction();
		}
		return heroesListFunction;
	}

	/** 增加群英榜积分 */
	public void addScore(Hero hero, int type, int itemId, long num) {
		try {
			//判断是否活动结束时间   每天23点结束
			int hour = TimeDateUtil.getHour();
			int minute = TimeDateUtil.getMinute();
			if (hour == 00 && minute < 5) {
				return;
			}
			if(type==UseAddCache.BAG_TYPE) {
				type = 1;
			}
			HeroesListData heroesListData = hero.getHeroesListData();
			int addScore = 0;
			int week = TimeDateUtil.getWeek();
			Struct_qy_235 qy = Config_qy_235.getIns().get(week);
			int[][] item = qy.getItem();
			if (type == item[0][0] && itemId == item[0][1]) {
				if (num > Integer.MAX_VALUE) {
					num = Integer.MAX_VALUE;
				}
				int times = (int) (num / item[0][2]);
				addScore = qy.getPoint() * times;
			}
			if (addScore > 0) {
				if (!HeroFunction.getIns().checkSystemOpen(hero, HeroesListConst.SysId)) {
					// 未开启先加入临时保存字段
					heroesListData.setTempScore(heroesListData.getTempScore() + addScore);
				} else {
					int score = heroesListData.getScore() + addScore;
					heroesListData.setScore(score);
					updateRedPoint(hero);
					// 检测同步到中央服
					if (score >= HeroesListConst.RANK_SCORE) {
						TreeSet<HeroesListRank> rankSet = HeroesListSysCache.getHeroesListCache().getRankSet();
						int rankSize = rankSet.size();
						if (rankSize >= HeroesListConst.RANK_SIZE) {
							HeroesListRank rank = rankSet.last();
							if (score >= rank.getScore()) {
								updateMyRank(hero, score);
							}
						} else {
							updateMyRank(hero, score);
						}
					}
				}

				LogTool.info(hero.getId(), hero.getName(),
						"HeroesList addScore=" + addScore + ", Score=" + heroesListData.getScore(),
						HeroesListFunction.class);
			}
		} catch (Exception e) {
			LogTool.error(e, HeroesListFunction.class, hero.getId(), hero.getName(), "HeroesListFunction addScore");
		}
	}

	public void updateMyRank(Hero hero, int score) {
		try {
			Channel crossChannel = Client_2.getIns().getCrossChannel();
			CrossData crossData = new CrossData();
			HeroesListRank myRank = new HeroesListRank();
			myRank.setHid(hero.getId());
			myRank.setName(hero.getNameZoneid());
			myRank.setScore(score);
			myRank.setIcon(hero.getSettingData().getIcon());
			myRank.setFrame(hero.getSettingData().getFrame());
			myRank.setUpdateTime(TimeDateUtil.getCurrentTime());
			myRank.setZoneid(hero.getZoneid());
			crossData.putObject(HeroesListCrossType.ScoreRank.name(), myRank);
			NettyWrite.writeXData(crossChannel, CrossConst.HEROESLIST_SG_UPDATESCORE, crossData);
		} catch (Exception e) {
			LogTool.error(e, HeroesListFunction.class, hero.getId(), hero.getName(), "HeroesListFunction updateMyRank");
		}
	}
	
	/**
	 * 红点检测
	 * @param hero
	 */
	public boolean checkRedPoint(Hero hero) {
		try {
			int week = TimeDateUtil.getWeek();
			List<Struct_qypoint_235> sortList = HeroesListSysCache.getWeekRewardMap().get(week);
			HeroesListData heroesListData = hero.getHeroesListData();
			Set<Integer> scoreReward = heroesListData.getScoreReward();
			int score = heroesListData.getScore();
//			List<Struct_qypoint_235> sortList = Config_qypoint_235.getIns().getSortList();
			int size = sortList.size();
			Struct_qypoint_235 qypoint = null;
			for(int i=0;i<size;i++) {
				qypoint = sortList.get(i);
				if (scoreReward.contains(qypoint.getHb())) {
					// 已领取过
					continue;
				}
				if (score >= qypoint.getPoint()) {
					return true;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, HeroesListFunction.class, hero.getId(), hero.getName(), "HeroesListFunction checkRedPoint");
		}
		return false;
	}
	
	/**
	 * 更新红点
	 * @param hero
	 */
	public void updateRedPoint(Hero hero) {
		try {
			boolean redPoint = checkRedPoint(hero);
			if(redPoint) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, HeroesListConst.SysId, HeroesListConst.Red_Point, RedPointConst.HAS_RED);
			}
		} catch (Exception e) {
			LogTool.error(e, HeroesListFunction.class, hero.getId(), hero.getName(), "HeroesListFunction updateRedPoint");
		}
	}

	/** 群英榜刷新名字 */
	public void reflashName(Hero hero) {
		try {
			//判断是否活动结束时间   每天23点结束
			int hour = TimeDateUtil.getHour();
			if(hour>=23) {
				return;
			}
			HeroesListData heroesListData = hero.getHeroesListData();
			if( heroesListData==null)
				return;
			if (!HeroFunction.getIns().checkSystemOpen(hero, HeroesListConst.SysId)) {
				return;
			} else {
				int score = heroesListData.getScore();
				if (score <= 0) {
					return;
				}
				//检测同步到中央服
				TreeSet<HeroesListRank> rankSet = HeroesListSysCache.getHeroesListCache().getRankSet();
				Iterator<HeroesListRank> iterator = rankSet.iterator();
				while( iterator.hasNext()){
					HeroesListRank next = iterator.next();
					long hid = next.getHid();
					if( hero.getId()==hid){
						if (score >= HeroesListConst.RANK_SCORE) {
							updateMyRank(hero, score);
						}
						LogTool.info(hero.getId(), hero.getName(),"HeroesList reflash name.score=" + heroesListData.getScore(),HeroesListFunction.class);
						break;
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, HeroesListFunction.class, hero.getId(), hero.getName(), "HeroesListFunction reflash name");
		}
	}

	/**
	 * 补充排行榜gm
	 */
	public void gmAddRankList() {
		try {
			List<Long> list = HeroDao.getIns().findAllHidByConditions(GameProperties.getFirstZoneId(), 100, 9999, 0, 0,
					0, 0);
			for (long hid : list) {
				Hero hero = HeroCache.getHero(hid, HeroConst.FIND_TYPE_ALL);
				HeroesListSysEvent.getIns().init(hero);
				HeroesListData heroesListData = hero.getHeroesListData();
				int addScore = RandomUtil.getRandomNumInAreas(6000, 200000);
				int week = TimeDateUtil.getWeek();

				if (addScore > 0) {
					if (!HeroFunction.getIns().checkSystemOpen(hero, HeroesListConst.SysId)) {
						// 未开启先加入临时保存字段
						heroesListData.setTempScore(heroesListData.getTempScore() + addScore);
					} else {
						int score = heroesListData.getScore() + addScore;
						heroesListData.setScore(score);
						updateRedPoint(hero);
						// 检测同步到中央服
						if (score >= HeroesListConst.RANK_SCORE) {
							TreeSet<HeroesListRank> rankSet = HeroesListSysCache.getHeroesListCache().getRankSet();
							int rankSize = rankSet.size();
							if (rankSize >= HeroesListConst.RANK_SIZE) {
								HeroesListRank rank = rankSet.last();
								if (score >= rank.getScore()) {
									updateMyRank(hero, score);
								}
							} else {
								updateMyRank(hero, score);
							}
						}
					}

					LogTool.info(hero.getId(), hero.getName(),
							"HeroesList addScore=" + addScore + ", Score=" + heroesListData.getScore(),
							HeroesListFunction.class);
				}
//				HeroDao.getIns().update(hero);
			}
		} catch (Exception e) {
			LogTool.error(e, HeroesListFunction.class, "");
		}
	}
	
	/**
	 * 处理中央服合并 数据合并
	 * 
	 * @throws Exception
	 */
	public void setBigHeFuData(int firstZoneid,List<GlobalData> dataAll, GlobalData globalData) throws Exception {
		
		Map<Integer, TreeSet<HeroesListRank>> rankSetMap =new HashMap<Integer, TreeSet<HeroesListRank>>();
		
		for (GlobalData globalTemp : dataAll) {
			String content = globalTemp.getContent();
			if (content == null || content.equals("") || content.equals("{}")) {
			} else {
				try {
					HeroesListCache obj = ObjStrTransUtil.toObj(content, HeroesListCache.class);
					Map<Integer, TreeSet<HeroesListRank>> tempRankSetMap = obj.getRankSetMap();
					for (Integer key: tempRankSetMap.keySet()) {
						if (!rankSetMap.containsKey(key)) {
							rankSetMap.put(key, tempRankSetMap.get(key));
						}
					}
				} catch (Exception e) {
					LogTool.error(e, HeroesListFunction.class, "setHeFuData has wrong");

				}
			}
		}
		for (TreeSet<HeroesListRank> rankSet: rankSetMap.values()) {
			int size = rankSet.size();
			if (size>HeroesListConst.RANK_SIZE) {
				int i=0;
				for(Iterator<HeroesListRank> iter = rankSet.descendingIterator(); iter.hasNext(); ) {
					HeroesListRank next = iter.next();
					i++;
					if (i>HeroesListConst.RANK_SIZE) {
						iter.remove();
					}
				}
			}
		}
		HeroesListCache data = new HeroesListCache();
		data.setRankSetMap(rankSetMap);
		globalData.setContent(ObjStrTransUtil.toStr(data));
		LogTool.info("setBigHeFuData herosList success", HeroesListFunction.class);
		
	}
	
	
	/**
	 * 处理大合跨服区数据
	 * 
	 * @throws Exception
	 */
	public void setCrossBigHeZuData(List<GlobalData> dataAll, GlobalData globalData) throws Exception {
		
		Map<Integer, TreeSet<HeroesListRank>> rankSetMap =new HashMap<Integer, TreeSet<HeroesListRank>>();
		
		for (GlobalData globalTemp : dataAll) {
			String content = globalTemp.getContent();
			if (content == null || content.equals("") || content.equals("{}")) {
			} else {
				try {
					Map<Integer, Struct_kuafu_200> map = Config_kuafu_200.getIns().getMap();
					HeroesListCache obj = ObjStrTransUtil.toObj(content, HeroesListCache.class);
					Map<Integer, TreeSet<HeroesListRank>> tempRankSetMap = obj.getRankSetMap();
					for (Integer key: tempRankSetMap.keySet()) {
						int goalKey=key;
						Struct_kuafu_200 struct_kuafu_200 = map.get(key);
						if(struct_kuafu_200.getCl()==1) {
							int mb = struct_kuafu_200.getMb();
							goalKey=mb;
						}
						if (!rankSetMap.containsKey(goalKey)) {
							rankSetMap.put(goalKey, tempRankSetMap.get(key));
						}else {
							TreeSet<HeroesListRank> treeSet = rankSetMap.get(goalKey);
							treeSet.addAll(tempRankSetMap.get(key));
						}
					}
				} catch (Exception e) {
					LogTool.error(e, HeroesListFunction.class, "setHeFuData has wrong");

				}
			}
		}
		for (TreeSet<HeroesListRank> rankSet: rankSetMap.values()) {
			int size = rankSet.size();
			if (size>HeroesListConst.RANK_SIZE) {
				int i=0;
				for(Iterator<HeroesListRank> iter = rankSet.descendingIterator(); iter.hasNext(); ) {
					HeroesListRank next = iter.next();
					i++;
					if (i>HeroesListConst.RANK_SIZE) {
						iter.remove();
					}
				}
			}
		}
		HeroesListCache data = new HeroesListCache();
		data.setRankSetMap(rankSetMap);
		globalData.setContent(ObjStrTransUtil.toStr(data));
		LogTool.info("setCrossZuHeFuData heroesList success", HeroesListFunction.class);
	}
	

}
