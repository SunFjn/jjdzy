package com.teamtop.system.crossDynastyWarriors;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.TreeSet;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentSkipListSet;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossFunction;
import com.teamtop.cross.upload.CrossHeroBaseModel;
import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.crossDynastyWarriors.cross.DynastyWarriorsCrossType;
import com.teamtop.system.crossDynastyWarriors.model.DynastyWarriorsModel;
import com.teamtop.system.crossDynastyWarriors.model.PondData;
import com.teamtop.system.crossSoloRun.cross.CrossSoloRunSysCache;
import com.teamtop.system.crossSoloRun.model.SoloRunRank;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroConst;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.rankNew.RankingCache;
import com.teamtop.system.rankNew.RankingConst;
import com.teamtop.system.rankNew.rankModel.BaseRankModel;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.system.title.TitleFunction;
import com.teamtop.util.ProbabilityEvent.RandomUtil;
import com.teamtop.util.clone.CloneUtils;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_double_230;
import excel.config.Config_doublereward_230;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_double_230;
import excel.struct.Struct_doublereward_230;
import io.netty.channel.Channel;

/**
 * 三国无双
 * @author hzp
 *
 */
public class DynastyWarriorsFunction {

	private static DynastyWarriorsFunction dynastyWarriorsFunction;

	private DynastyWarriorsFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized DynastyWarriorsFunction getIns() {
		if (dynastyWarriorsFunction == null) {
			dynastyWarriorsFunction = new DynastyWarriorsFunction();
		}
		return dynastyWarriorsFunction;
	}

	/** 初始化活动缓存 */
	public void initDynastyWarriors() {
		try {
			Map<Integer, ConcurrentSkipListSet<SoloRunRank>> pCrossRankSet = CrossSoloRunSysCache.getpCrossRankSet();
			Iterator<Integer> pcrIter = pCrossRankSet.keySet().iterator();
			Map<Integer, DynastyWarriorsCache> cacheMap = DynastyWarriorsSysCache.getCacheMap();
			for (; pcrIter.hasNext();) {
				int partId = pcrIter.next();
				if (partId == 0) {
					continue;
				}
				DynastyWarriorsCache dwCache = cacheMap.get(partId);
				if (dwCache == null) {
					dwCache = new DynastyWarriorsCache();
					dwCache.setPartId(partId);
					cacheMap.put(partId, dwCache);
				}
			}
			cacheMap.remove(0);
			Iterator<Entry<Integer, DynastyWarriorsCache>> allIterator = cacheMap.entrySet().iterator();
			for (; allIterator.hasNext();) {
				Entry<Integer, DynastyWarriorsCache> entry = allIterator.next();
				Integer partId = entry.getKey();
				DynastyWarriorsCache dwCache = entry.getValue();
				int ranking = 1;
				try {
					Map<Long, CrossHeroBaseModel> figtherMap = dwCache.getFighterMap();
					// 重置活动相关数据
					figtherMap.clear();
					dwCache.getMatchMap().clear();
					dwCache.getBetMap().clear();
					dwCache.getRoundWinnerMap().clear();
					dwCache.getPondMap().clear();
					dwCache.getEliminateMap().clear();
					dwCache.getSynSet().clear();
					dwCache.setActRound(0);
					dwCache.setActState(0);
					dwCache.setStateTime(0);
					dwCache.setAwardRound(0);

					ConcurrentSkipListSet<SoloRunRank> crossRankSet = pCrossRankSet.get(partId);
					if (crossRankSet == null || crossRankSet.size() == 0) {
						continue;
					}
					Iterator<SoloRunRank> iterator = crossRankSet.iterator();
					long hid = 0;
					SoloRunRank soloRunRank = null;
					for (; iterator.hasNext();) {
						if (ranking > DynastyWarriorsConst.JOIN_NUM) {
							break;
						}
						soloRunRank = iterator.next();
						hid = soloRunRank.getHid();
						CrossHeroBaseModel model = CrossSoloRunSysCache.getModelMap().get(hid);
						figtherMap.put(hid, model);
						ranking++;
					}
					dwCache.setActRound(DynastyWarriorsConst.ROUND_1);
					dwCache.setActState(DynastyWarriorsConst.READY_STATE);
					DynastyWarriorsFunction.getIns().updataActState(partId);
					// 初始化第一轮比赛（16强）数据
					List<Long> fighterList = new ArrayList<>(figtherMap.keySet());
					initRoundOne(fighterList, DynastyWarriorsConst.ROUND_1, partId);
					// 初始化奖池
					initPond(partId);
					// 同步数据
					synMatchData(partId);
					// DynastyWarriorsSysCache.ACT_STAGE = DynastyWarriorsConst.ROUND_1;
				} catch (Exception e) {
					LogTool.error(e, DynastyWarriorsFunction.class, "DynastyWarriorsFunction initDynastyWarriors fail, partId="+partId);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, DynastyWarriorsFunction.class, "DynastyWarriorsFunction initDynastyWarriors fail");
		}
	}

	/** 初始化比赛数据 */
	public void initRoundOne(List<Long> fighterList, int round, int partId) {
		try {
			DynastyWarriorsCache dwCache = DynastyWarriorsSysCache.getDynastyWarriorsCache(partId);
			Map<Integer, List<List<Long>>> matchMap = dwCache.getMatchMap();
			Map<Integer, Map<Long, Set<Long>>> betMap = dwCache.getBetMap();
//			matchMap.clear();
//			betMap.clear();
			Map<Long, Set<Long>> heroBetMap = new HashMap<>();
			List<Long> left = new ArrayList<>();
			List<Long> right = new ArrayList<>();
			long hid = 0;
			int fSize = fighterList.size();
			int size = DynastyWarriorsConst.JOIN_NUM / (int)(Math.pow(2, round));
			for (int i = 1; i <= fSize; i++) {
				if(size==1) {
					left.add(randomFighter(fighterList, round, true));
				}else {					
					if (i <= size) {
						left.add(randomFighter(fighterList, round, true));
					} else {
						right.add(randomFighter(fighterList, round, true));
					}
				}
			}
			List<List<Long>> roundList = new ArrayList<>(size);
			int partSize = size/2;
			if(partSize==0) {
				partSize = 1;
			}
			handlePart(left, heroBetMap, roundList, partSize, round);
			handlePart(right, heroBetMap, roundList, partSize, round);
			matchMap.put(round, roundList);
			betMap.put(round, heroBetMap);
		} catch (Exception e) {
			LogTool.error(e, DynastyWarriorsFunction.class, "DynastyWarriorsFunction initRoundOne fail");
		}
	}
	
	private void handlePart(List<Long> partList, Map<Long, Set<Long>> heroBetMap, List<List<Long>> roundList,
			int partSize, int round) {
		List<Long> group = null;
		long hid = 0;
		for (int i = 1; i <= partSize; i++) {
			group = new ArrayList<>();// 对战分组
			if (partList.size() > 0) {
				hid = randomFighter(partList, round, false);
				group.add(hid);// 第一个
				heroBetMap.put(hid, new HashSet<Long>());
			} else {
				break;
			}
			if (partList.size() > 0) {
				hid = randomFighter(partList, round, false);
				group.add(hid);// 第二个
				heroBetMap.put(hid, new HashSet<Long>());
			}
			// else {
			// break;
			// }
			roundList.add(group);
		}
	}

	/** 初始化奖池数据 */
	public void initPond(int partId) {
		try {
			Map<Integer, PondData> pondMap = DynastyWarriorsSysCache.getDynastyWarriorsCache(partId).getPondMap();
			pondMap.clear();
			List<Struct_doublereward_230> sortList = Config_doublereward_230.getIns().getSortList();
			int size = sortList.size();
			Struct_doublereward_230 pondAward = null;
			for (int i = 0; i < size; i++) {
				pondAward = sortList.get(i);
				PondData pondData = new PondData();
				pondData.setId(pondAward.getId());
				pondData.setName("");
				pondMap.put(pondAward.getId(), pondData);
			}
			// // 更新子服奖池数据
			// ConcurrentHashMap<Integer, Channel> zoneidToChannel =
			// CrossCache.getZoneidToChannel();
			// Set<Integer> zeneidSet = new HashSet<>(zoneidToChannel.keySet());
			// Iterator<Integer> iterator = zeneidSet.iterator();
			// for (; iterator.hasNext();) {
			// int zoneid = iterator.next();
			// Channel tempChannel = zoneidToChannel.get(zoneid);
			// CrossData newCrossData = new CrossData();
			// newCrossData.putObject(DynastyWarriorsCrossType.POND_DATA, pondMap);
			// NettyWrite.writeXData(tempChannel, CrossConst.DYNASTYWARRIORS_GS_UPDATEPOND,
			// newCrossData);
			// }
		} catch (Exception e) {
			LogTool.error(e, DynastyWarriorsFunction.class, "DynastyWarriorsFunction initPond");
		}
	}

	private long randomFighter(List<Long> fighterList, int round, boolean first) {
		if (fighterList.size() == 1) {
			return fighterList.remove(0);
		}
		Long hid = 0L;
		if (round == 1 && first) {
			int size = fighterList.size() - 1;
			int randomNum = RandomUtil.getRandomNumInAreas(0, size);
			hid = fighterList.remove(randomNum);
		} else {
			hid = fighterList.remove(0);
		}
		return hid;
	}

	public void fightHandle(int partId) {
		try {
			// 比赛战斗处理
			DynastyWarriorsCache dwCache = DynastyWarriorsSysCache.getDynastyWarriorsCache(partId);
			Map<Integer, List<List<Long>>> matchMap = dwCache.getMatchMap();
			int actRound = dwCache.getActRound();
			List<List<Long>> roundList = matchMap.get(actRound);
			int size = roundList.size();
			Map<Long, CrossHeroBaseModel> fighterMap = dwCache.getFighterMap();
			List<Long> winList = new ArrayList<>();
			Map<Integer, List<Long>> roundWinnerMap = dwCache.getRoundWinnerMap();
			List<Long> eliminateList = new ArrayList<>();
			Map<Integer, List<Long>> eliminateMap = dwCache.getEliminateMap();
			Map<Integer, Map<Integer, List<CrossHeroBaseModel>>> matchVideoMap = dwCache.getMatchVideoMap();
			Map<Integer, List<CrossHeroBaseModel>> videoMap = new HashMap<>();
			List<Long> groupList = null;
			long first = 0;
			long second = 0;
			for (int i = 0; i < size; i++) {
				groupList = new ArrayList<>(roundList.get(i));
				if (groupList.size() == 1) {
					winList.addAll(groupList);
				} else if (groupList.size() > 1) {
					first = groupList.get(0);
					second = groupList.get(1);
					if (fighterMap.get(first).getTotalStrength() >= fighterMap.get(second).getTotalStrength()) {
						winList.add(first);
						eliminateList.add(second);
					} else {
						winList.add(second);
						eliminateList.add(first);
					}
					CrossHeroBaseModel fModel = (CrossHeroBaseModel) CloneUtils.deepClone(fighterMap.get(first));
					CrossHeroBaseModel sModel = (CrossHeroBaseModel) CloneUtils.deepClone(fighterMap.get(second));
					List<CrossHeroBaseModel> mList = new ArrayList<>();
					mList.add(fModel);
					mList.add(sModel);
					videoMap.put(i + 1, mList);
				}
			}
			if (actRound == DynastyWarriorsConst.ROUND_4) {
				eliminateMap.put(DynastyWarriorsConst.ROUND_5, new ArrayList<>(winList));
				List<List<Long>> tempRoundList = new ArrayList<>();
				List<Long> gList = new ArrayList<>();
				gList.add(winList.get(0));
				tempRoundList.add(gList);
				matchMap.put(DynastyWarriorsConst.ROUND_5, tempRoundList);
				Map<Long, Set<Long>> heroBetMap = new HashMap<>();
				dwCache.getBetMap().put(DynastyWarriorsConst.ROUND_5, heroBetMap);
			}
			matchVideoMap.put(actRound, videoMap);
			roundWinnerMap.put(actRound, new ArrayList<>(winList));
			eliminateMap.put(actRound, eliminateList);
			if (actRound != DynastyWarriorsConst.ROUND_4) {				
				initRoundOne(winList, actRound + 1, partId);
			}
			// 同步数据
			synMatchData(partId);
		} catch (Exception e) {
			LogTool.error(e, DynastyWarriorsFunction.class, "DynastyWarriorsFunction fightHandle");
		}
	}

	/**
	 * 同步比赛数据到子服
	 */
	public void synMatchData(int partId) {
		try {
			ConcurrentHashMap<Channel, List<Integer>> channelToZoneid = CrossCache.getChannelToZoneidByPartId(partId);
			Iterator<Channel> zoneIdIterator = channelToZoneid.keySet().iterator();
			CrossData newCrossData = new CrossData();
			DynastyWarriorsCache dwCache = DynastyWarriorsSysCache.getDynastyWarriorsCache(partId);
			newCrossData.putObject(DynastyWarriorsCrossType.FIGHT_MODEL, dwCache.getFighterMap());
			newCrossData.putObject(DynastyWarriorsCrossType.POND_DATA, dwCache.getPondMap());
			newCrossData.putObject(DynastyWarriorsCrossType.MATCH_DATA, dwCache.getMatchMap());
			newCrossData.putObject(DynastyWarriorsCrossType.BET_DATA, dwCache.getBetMap());
			newCrossData.putObject(DynastyWarriorsCrossType.WINNER_DATA, dwCache.getRoundWinnerMap());
			newCrossData.putObject(DynastyWarriorsCrossType.ELIMINATE_DATA, dwCache.getEliminateMap());
			newCrossData.putObject(DynastyWarriorsCrossType.VIDEO_DATA, dwCache.getMatchVideoMap());
			int zoneid = 0;
			Channel tempChannel = null;
			for (; zoneIdIterator.hasNext();) {
				tempChannel = zoneIdIterator.next();
				if (tempChannel == null) {
					continue;
				}
				NettyWrite.writeXData(tempChannel, CrossConst.DYNASTYWARRIORS_GS_UPDATEMATCH, newCrossData);
			}
		} catch (Exception e) {
			LogTool.error(e, DynastyWarriorsFunction.class, "DynastyWarriorsFunction synMatchData fail");
		}
	}

	/**
	 * 更新活动状态
	 */
	public void updataActState(int partId) {
		try {
			DynastyWarriorsCache dwCache = DynastyWarriorsSysCache.getDynastyWarriorsCache(partId);
			ConcurrentHashMap<Channel, List<Integer>> channelToZoneid = CrossCache.getChannelToZoneidByPartId(partId);
			CrossData newCrossData = new CrossData();
			newCrossData.putObject(DynastyWarriorsCrossType.ACT_ROUND, dwCache.getActRound());
			newCrossData.putObject(DynastyWarriorsCrossType.ACT_STATE, dwCache.getActState());
			newCrossData.putObject(DynastyWarriorsCrossType.ACT_STATE_TIME, dwCache.getStateTime());
			Iterator<Channel> zoneIdIterator = channelToZoneid.keySet().iterator();

			Channel tempChannel = null;
			for (; zoneIdIterator.hasNext();) {
				tempChannel = zoneIdIterator.next();
				if (tempChannel == null) {
					continue;
				}
				NettyWrite.writeXData(tempChannel, CrossConst.DYNASTYWARRIORS_GS_UPDATESTATE, newCrossData);
			}
		} catch (Exception e) {
			LogTool.error(e, DynastyWarriorsFunction.class, "DynastyWarriorsFunction updataActState fail");
		}
	}

	/**
	 * 发放下注奖励
	 **/
	public void sendBetAward(int round, int partId) {
		if (round == 0) {
			return;
		}
		DynastyWarriorsCache dwCache = DynastyWarriorsSysCache.getDynastyWarriorsCache(partId);
		if (dwCache.getActRound() == round) {
			// 已发过
			return;
		}
		dwCache.setAwardRound(round);
		Map<Long, Set<Long>> roundBetMap = dwCache.getBetMap().get(round);
		if (roundBetMap == null) {
			return;
		}
		List<Long> list = dwCache.getRoundWinnerMap().get(round);
		if (list == null) {
			return;
		}
		Iterator<Long> iterator = roundBetMap.keySet().iterator();
		long hid = 0;
		Set<Long> set = null;
		for (; iterator.hasNext();) {
			hid = iterator.next();
			if (list.contains(hid)) {
				// 猜对
				set = roundBetMap.get(hid);
				if (set != null && set.size() > 0) {
					sendBet(set, 1);
				}
			} else {
				set = roundBetMap.get(hid);
				if (set != null && set.size() > 0) {
					sendBet(set, 0);
				}
			}
		}
	}

	/**
	 * 发送下注奖励邮件
	 * 
	 * @param set
	 * @param type
	 */
	private void sendBet(Set<Long> set, int type) {
		try {
			int cost = Config_xtcs_004.getIns().get(DynastyWarriorsConst.BET_COST).getNum();
			int award = 0;
			int mailId = 0;
			int[][] awardData = new int[1][];
			if (type == 1) {// 猜对
				award = cost * 2;
				mailId = MailConst.MAIL_ID_DW_BET_WIN;
			} else {
				award = cost / 2;
				mailId = MailConst.MAIL_ID_DW_BET_LOSE;
			}
			awardData[0] = new int[] { GameConst.YUANBAO, 0, award };
			Iterator<Long> iterator = set.iterator();
			long hid = 0;
			for (; iterator.hasNext();) {
				hid = iterator.next();
				MailFunction.getIns().sendMailWithFujianData2(hid, mailId, new Object[] { mailId }, awardData);
			}
		} catch (Exception e) {
			LogTool.error(e, DynastyWarriorsFunction.class, "DynastyWarriorsFunction sendBet fail");
		}
	}

	/**
	 * 发送排行奖励
	 */
	public void sendRankingReward(int partId) {
		try {
			DynastyWarriorsCache dwCache = DynastyWarriorsSysCache.getDynastyWarriorsCache(partId);
			Map<Integer, List<Long>> eliminateMap = dwCache.getEliminateMap();
			if (eliminateMap.size() == 0) {
				return;
			}
			Map<Long, CrossHeroBaseModel> fighterMap = dwCache.getFighterMap();
			Set<Integer> roundSet = eliminateMap.keySet();
			Iterator<Integer> iterator = roundSet.iterator();
			for (; iterator.hasNext();) {
				int round = iterator.next();
				List<Long> list = eliminateMap.get(round);
				int size = list.size();
				if(size==0) {
					continue;
				}
				int index = DynastyWarriorsConst.ROUND_5 - round + 1;
				Struct_double_230 rankReward = Config_double_230.getIns().get(index);
				int[][] reward = rankReward.getReward();
				String tips = rankReward.getTips();
				int mailId = MailConst.MAIL_ID_DW_RANKING_REWARD;
				for(int i=0;i<size;i++) {
					long hid = list.get(i);
					CrossHeroBaseModel model = fighterMap.get(hid);
					if(GameProperties.zoneids.contains(model.getZoneid())) {
						//本服处理
						MailFunction.getIns().sendMailWithFujianData2(hid, mailId, new Object[] {mailId, tips}, reward);
						if (round == DynastyWarriorsConst.ROUND_5) {
							TitleFunction.getIns().addTitle(hid, DynastyWarriorsConst.CAMPION_TITLE);
						}
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, DynastyWarriorsFunction.class, "DynastyWarriorsFunction sendRankingReward fail");
		}
	}

	/**
	 * 中央服同步数据到子服
	 */
	public void synData(int partId) {
		DynastyWarriorsCache dwCache = DynastyWarriorsSysCache.getCacheMap().get(partId);
		Iterator<Channel> iterator = CrossCache.getPchToZoneMap().get(partId).keySet().iterator();
		CrossData newCrossData = new CrossData();
		newCrossData.putObject(DynastyWarriorsCrossType.FIGHT_MODEL, dwCache.getFighterMap());
		Channel tempChannel = null;
		for (; iterator.hasNext();) {
			tempChannel = iterator.next();
			if (tempChannel == null) {
				continue;
			}
			NettyWrite.writeXData(tempChannel, CrossConst.DYNASTYWARRIORS_GS_UPDATEHERODATA, newCrossData);
		}
	}

	/**
	 * 改名处理
	 * @param hero
	 */
	public void changeName(Hero hero) {
		try {
			long hid = hero.getId();
			int partId = CrossCache.getlocalPartId();
			DynastyWarriorsCache dwCache = DynastyWarriorsSysCache.getDynastyWarriorsCache(partId);
			// int actRound = dwCache.getActRound();
			// if(actRound>=DynastyWarriorsConst.ROUND_1) {
			// return;
			// }
			Map<Long, CrossHeroBaseModel> fighterMap = dwCache.getFighterMap();
			CrossHeroBaseModel model = fighterMap.get(hid);
			if (model == null) {
				return;
			}
			Map<Long, CrossHeroBaseModel> sendMap = new HashMap<>();
			sendMap.put(hid, model);
			model.setName(hero.getName());
			model.setNameZoneid(hero.getNameZoneid());
			Channel crossChannel = Client_2.getIns().getCrossChannel();
			CrossData crossData = new CrossData();
			crossData.putObject(DynastyWarriorsCrossType.FIGHT_MODEL, sendMap);
			NettyWrite.writeXData(crossChannel, CrossConst.DYNASTYWARRIORS_SG_UPDATEHERO, crossData);
		} catch (Exception e) {
			LogTool.error(e, DynastyWarriorsFunction.class, hero.getId(), hero.getName(),
					"DynastyWarriorsFunction changeName");
		}
	}

	/**
	 * 红点检测
	 * @param hero
	 * @return
	 */
	public boolean checkRedPoint(Hero hero) {
		try {
			DynastyWarriorsModel model = hero.getDynastyWarriorsModel();
			if (model == null) {
				return false;
			}
			int partId = CrossCache.getlocalPartId();
			DynastyWarriorsCache dwCache = DynastyWarriorsSysCache.getDynastyWarriorsCache(partId);
			int actRound = dwCache.getActRound();
			if (actRound == 0) {
				return false;
			}
			Map<Integer, Integer> pondAward = model.getPondAward();
			Map<Integer, PondData> pondMap = dwCache.getPondMap();
			List<Struct_doublereward_230> sortList = Config_doublereward_230.getIns().getSortList();
			int size = sortList.size();
			for (int i = 0; i < size; i++) {
				Struct_doublereward_230 struct_reward = sortList.get(i);
				int pondId = struct_reward.getId();
				if (pondId >= actRound) {
					// 未到对应阶段不能领取
					continue;
				}
				if (pondAward.containsKey(pondId)) {
					// 已经领取过
					continue;
				}
				PondData pondData = pondMap.get(pondId);
				if(pondData == null) {
					continue;
				}
				if (pondData.getPlayerNum() < struct_reward.getNum()) {
					return true;
				}
			}
			// 下注红点
			Map<Integer, Long> betMap = model.getBetMap();
			if (betMap.containsKey(actRound)) {
				return true;
			}
		} catch (Exception e) {
			LogTool.error(e, DynastyWarriorsFunction.class, hero.getId(), hero.getName(),
					"DynastyWarriorsFunction checkPoint");
		}
		return false;
	}

	/**
	 * 更新红点
	 */
	public void updateRedPoint() {
		try {
			Iterator<Long> iterator = HeroCache.getHeroMap().keySet().iterator();
			for (; iterator.hasNext();) {
				Long hid = iterator.next();
				if (hid != null) {
					Hero hero = HeroCache.getHeroMap().get(hid);
					if (hero != null) {
						updateRedPoint(hero);
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, DynastyWarriorsFunction.class, "DynastyWarriorsFunction updateRedPoint");
		}
	}

	/**
	 * 更新个人红点
	 * 
	 * @param hero
	 */
	public void updateRedPoint(Hero hero) {
		try {
			boolean redPoint = checkRedPoint(hero);
			if (redPoint) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.DYNASTY_WARRIORS,
						DynastyWarriorsConst.RED_POINT, RedPointConst.HAS_RED);
			}
		} catch (Exception e) {
			LogTool.error(e, DynastyWarriorsFunction.class, hero.getId(), hero.getName(),
					"DynastyWarriorsFunction updateRedPoint");
		}
	}

	public void gmHandle(String[] param) {
		int type = Integer.parseInt(param[0]);
		if (type == 1) {
			ConcurrentSkipListSet<BaseRankModel> treeSet = RankingCache.getRankingmap().get(RankingConst.STRENGTH_RANKING);
			Map<Long, CrossHeroBaseModel> sendMap = new HashMap<>();
			int num = 1;
			for (BaseRankModel model : treeSet) {
				if (num > DynastyWarriorsConst.JOIN_NUM) {
					break;
				}
				CrossHeroBaseModel bModel = new CrossHeroBaseModel();
				Hero hero = HeroCache.getHero(model.getHid(), HeroConst.FIND_TYPE_BATTLE);
				CrossFunction.makeCrossBaseHeroModel(bModel, hero);
				sendMap.put(model.getHid(), bModel);
				num++;
			}
			Channel crossChannel = Client_2.getIns().getCrossChannel();
			CrossData crossData = new CrossData();
			crossData.putObject(DynastyWarriorsCrossType.GM, type);
			crossData.putObject(DynastyWarriorsCrossType.GM_DATA, sendMap);
			NettyWrite.writeXData(crossChannel, CrossConst.DYNASTYWARRIORS_SG_GM, crossData);
		}
		if (type == 2) {
			int round = Integer.parseInt(param[1]);
			int state = Integer.parseInt(param[2]);
			if (round == 1 && state == 1) {
				Map<Long, Hero> heroMap = HeroCache.getHeroMap();
				for (Hero hero : heroMap.values()) {
					DynastyWarriorsModel dynastyWarriorsModel = hero.getDynastyWarriorsModel();
					if (dynastyWarriorsModel != null) {
						dynastyWarriorsModel.setWeekResetTime(TimeDateUtil.getCurrentTime());
						dynastyWarriorsModel.getBetMap().clear();
						dynastyWarriorsModel.getPondAward().clear();
					}
				}
			}
			CrossData crossData = new CrossData();
			crossData.putObject(DynastyWarriorsCrossType.GM, type);
			crossData.putObject(DynastyWarriorsCrossType.GM_ROUND, round);
			crossData.putObject(DynastyWarriorsCrossType.GM_STATE, state);
			Channel crossChannel = Client_2.getIns().getCrossChannel();
			NettyWrite.writeXData(crossChannel, CrossConst.DYNASTYWARRIORS_SG_GM, crossData);
		}
	}

}
