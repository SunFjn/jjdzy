package com.teamtop.system.crossDynastyWarriors.cross;

import java.lang.reflect.Type;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossZone;
import com.teamtop.cross.upload.CrossHeroBaseModel;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.CrossDynastyWarriorsRunnable;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.system.SystemStateEnum;
import com.teamtop.system.crossDynastyWarriors.DynastyWarriorsCache;
import com.teamtop.system.crossDynastyWarriors.DynastyWarriorsConst;
import com.teamtop.system.crossDynastyWarriors.DynastyWarriorsFunction;
import com.teamtop.system.crossDynastyWarriors.DynastyWarriorsSysCache;
import com.teamtop.system.crossDynastyWarriors.model.PondData;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.util.ProbabilityEvent.RandomUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_doublereward_230;
import excel.struct.Struct_doublereward_230;
import io.netty.channel.Channel;

public class DynastyWarriorsIO {

	private static DynastyWarriorsIO dynastyWarriorsIO;

	private DynastyWarriorsIO() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized DynastyWarriorsIO getIns() {
		if (dynastyWarriorsIO == null) {
			dynastyWarriorsIO = new DynastyWarriorsIO();
		}
		return dynastyWarriorsIO;
	}
	
	public void getPondAward(final Channel channel, final CrossData crossData) {
		try {
			OpTaskExecutorService.PublicOrderService.execute(new CrossDynastyWarriorsRunnable() {
				
				@Override
				public void run() {
					getPondAwardHandle(channel, crossData);
				}
				
				@Override
				public Object getSession() {
					return OpTaskConst.DYNASTY_WARRIORS;
				}
			});
		} catch (Exception e) {
			LogTool.error(e, DynastyWarriorsIO.class, "DynastyWarriorsCross getPondAward fail");
		}
	}

	/**
	 * 领取奖池奖励
	 * 
	 * @param channel
	 * @param crossData
	 */
	public void getPondAwardHandle(Channel channel, CrossData crossData) {
		try {
			if (!CrossZone.isCrossServer()) {
				return;
			}
			int pondId = crossData.getObject(DynastyWarriorsCrossType.PONDID, Integer.class);
			long heroId = crossData.getObject(DynastyWarriorsCrossType.HID, Long.class);
			String heroName = crossData.getObject(DynastyWarriorsCrossType.NAME, String.class);
			crossData.finishGet();
			int partId = CrossCache.getPartId(channel);
			Map<Integer, PondData> pondMap = DynastyWarriorsSysCache.getDynastyWarriorsCache(partId).getPondMap();
			Struct_doublereward_230 pondAwardData = Config_doublereward_230.getIns().get(pondId);
			PondData pondData = pondMap.get(pondId);
			int playerNum = pondData.getPlayerNum();
			if (playerNum >= pondAwardData.getNum()) {
				// 已被全部领取
				int isSend = 0;
				if (!pondData.isNotice()) {
					crossData.putObject(DynastyWarriorsCrossType.POND_DATA, pondMap);
					isSend = 1;
				}
				crossData.putObject(DynastyWarriorsCrossType.IS_SEND, isSend);
				crossData.putObject(DynastyWarriorsCrossType.GET_POND_RESULT, 1);
				NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
				if (!pondData.isNotice()) {
					pondData.setNotice(true);
					Iterator<Channel> iterator = CrossCache.getChannelToZoneidByPartId(partId).keySet().iterator();
					for (; iterator.hasNext();) {
						Channel tempChannel = iterator.next();
						if (tempChannel == null) {
							continue;
						}
						CrossData newCrossData = new CrossData();
						newCrossData.putObject(DynastyWarriorsCrossType.POND_DATA, pondMap);
						NettyWrite.writeXData(tempChannel, CrossConst.DYNASTYWARRIORS_GS_UPDATEPOND, newCrossData);
					}
				}
			} else {
				crossData.putObject(DynastyWarriorsCrossType.GET_POND_RESULT, 0);
				int[][] yb = pondAwardData.getYb();
				int money = RandomUtil.getRandomNumInAreas(yb[0][0], yb[0][1]);
				if (pondData.getMoney() < money) {
					pondData.setMoney(money);
					pondData.setLuckyId(heroId);
					pondData.setName(heroName);
				}
				pondData.setPlayerNum(playerNum+1);
				crossData.putObject(DynastyWarriorsCrossType.PONDAWARD, money);
				crossData.putObject(DynastyWarriorsCrossType.POND_DATA, pondMap);
				crossData.putObject(DynastyWarriorsCrossType.IS_SEND, 1);
				NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
			}
		} catch (Exception e) {
			LogTool.error(e, DynastyWarriorsIO.class, "DynastyWarriorsCross getPondAward fail");
		}
	}

	/**
	 * 更新子服奖池信息
	 * 
	 * @param channel
	 * @param crossData
	 */
	public void updatePond(Channel channel, CrossData crossData) {
		try {
			if (CrossZone.isCrossServer()) {
				return;
			}
			Type type = new TypeReference<Map<Integer, PondData>>() {}.getType();
			Map<Integer, PondData> pondData = crossData.getObject(DynastyWarriorsCrossType.POND_DATA, type);
			int partId = CrossCache.getlocalPartId();
			DynastyWarriorsSysCache.getCacheMap().get(partId).setPondMap(pondData);
			DynastyWarriorsFunction.getIns().updateRedPoint();
		} catch (Exception e) {
			LogTool.error(e, DynastyWarriorsIO.class, "DynastyWarriorsCross updatePond fail");
		}
	}
	
	/**
	 * （跨服到本服）更新比赛数据
	 * 
	 * @param channel
	 * @param crossData
	 */
	public void updateMatchData(Channel channel, CrossData crossData) {
		try {
			if (CrossZone.isCrossServer()) {
				return;
			}
			Type type = new TypeReference<Map<Long, CrossHeroBaseModel>>() {}.getType();
			Map<Long, CrossHeroBaseModel> fighterMap = crossData.getObject(DynastyWarriorsCrossType.FIGHT_MODEL, type);
			
			type = new TypeReference<Map<Integer, PondData>>() {}.getType();
			Map<Integer, PondData> pondData = crossData.getObject(DynastyWarriorsCrossType.POND_DATA, type);
			
			type = new TypeReference<Map<Integer, List<List<Long>>>>() {}.getType();
			Map<Integer, List<List<Long>>> matchData = crossData.getObject(DynastyWarriorsCrossType.MATCH_DATA, type);
			
			type = new TypeReference<Map<Integer, Map<Long, Set<Long>>>>() {}.getType();
			Map<Integer, Map<Long, Set<Long>>> betData = crossData.getObject(DynastyWarriorsCrossType.BET_DATA, type);
			
			type = new TypeReference<Map<Integer, List<Long>>>() {}.getType();
			Map<Integer, List<Long>> roundWinnerMap = crossData.getObject(DynastyWarriorsCrossType.WINNER_DATA, type);

			type = new TypeReference<Map<Integer, List<Long>>>() {}.getType();
			Map<Integer, List<Long>> eliminateMap = crossData.getObject(DynastyWarriorsCrossType.ELIMINATE_DATA, type);

			type = new TypeReference<Map<Integer, Map<Integer, List<CrossHeroBaseModel>>>>() {}.getType();
			Map<Integer, Map<Integer, List<CrossHeroBaseModel>>> videoMap = crossData.getObject(DynastyWarriorsCrossType.VIDEO_DATA, type);
			int partId = CrossCache.getlocalPartId();
			DynastyWarriorsCache cache = DynastyWarriorsSysCache.getDynastyWarriorsCache(partId);
			cache.setFighterMap(fighterMap);
			cache.setPondMap(pondData);
			cache.setMatchMap(matchData);
			cache.setRoundWinnerMap(roundWinnerMap);
			cache.setEliminateMap(eliminateMap);
			cache.setMatchVideoMap(videoMap);
			Map<Integer, Map<Long, Set<Long>>> betMap = cache.getBetMap();
			Iterator<Integer> iterator = betData.keySet().iterator();
			for (; iterator.hasNext();) {
				int round = iterator.next();
				if (!betMap.containsKey(round)) {
					betMap.put(round, betData.get(round));
				}
			}
			DynastyWarriorsFunction.getIns().updateRedPoint();
		} catch (Exception e) {
			LogTool.error(e, DynastyWarriorsIO.class, "DynastyWarriorsCross updateMatchData fail");
		}
	}
	
	/**
	 * 接收跨服状态，更新本服
	 * 
	 * @param channel
	 * @param crossData
	 */
	public void updateState(Channel channel, CrossData crossData) {
		try {
			if (CrossZone.isCrossServer()) {
				return;
			}
			int round = crossData.getObject(DynastyWarriorsCrossType.ACT_ROUND, Integer.class);
			int state = crossData.getObject(DynastyWarriorsCrossType.ACT_STATE, Integer.class);
			int stateTime = crossData.getObject(DynastyWarriorsCrossType.ACT_STATE_TIME, Integer.class);
			int partId = CrossCache.getlocalPartId();
			DynastyWarriorsCache dwCache = DynastyWarriorsSysCache.getDynastyWarriorsCache(partId);
			if(round==DynastyWarriorsConst.ROUND_1&&state==DynastyWarriorsConst.READY_STATE) {
				dwCache.getFighterMap().clear();
				dwCache.getMatchMap().clear();
				dwCache.getBetMap().clear();
				dwCache.getRoundWinnerMap().clear();
				dwCache.getPondMap().clear();
				dwCache.getEliminateMap().clear();
				dwCache.setActRound(0);
				dwCache.setActState(0);
				dwCache.setStateTime(0);
				dwCache.setAwardRound(0);
			}
			dwCache.setActRound(round);
			dwCache.setActState(state);
			dwCache.setStateTime(stateTime);
			if (round > DynastyWarriorsConst.ROUND_1 && state == DynastyWarriorsConst.READY_STATE) {
				DynastyWarriorsFunction.getIns().sendBetAward(round - 1, partId);
			}
			if (dwCache.getActRound() == DynastyWarriorsConst.ROUND_5) {
				// 发放排行奖励
				DynastyWarriorsFunction.getIns().sendRankingReward(partId);
				Map<Long, Hero> heroMap = HeroCache.getHeroMap();
				Iterator<Hero> iterator = heroMap.values().iterator();
				Hero hero = null;
				for (; iterator.hasNext();) {
					hero = iterator.next();
					HeroFunction.getIns().sendSystemState(hero.getId(), SystemIdConst.DYNASTY_WARRIORS,
							SystemStateEnum.StateEnum.NOT_OPEN.getState());
				}
			}
			if (dwCache.getActRound() == DynastyWarriorsConst.ROUND_1) {
				Map<Long, Hero> heroMap = HeroCache.getHeroMap();
				Iterator<Hero> iterator = heroMap.values().iterator();
				Hero hero = null;
				for (; iterator.hasNext();) {
					hero = iterator.next();
					HeroFunction.getIns().sendSystemState(hero.getId(), SystemIdConst.DYNASTY_WARRIORS,
							SystemStateEnum.StateEnum.OPEN_NOW.getState());
				}
			}
		} catch (Exception e) {
			LogTool.error(e, DynastyWarriorsIO.class, "DynastyWarriorsCross updateState fail");
		}
	}

	/**
	 *  接收子服数据，更新参数玩家战斗数据
	 * */
	public void updateFightModel(Channel channel, CrossData crossData) {
		try {
			Type type = new TypeReference<Map<Long, CrossHeroBaseModel>>() {}.getType();
			Map<Long, CrossHeroBaseModel> modelMap = crossData.getObject(DynastyWarriorsCrossType.FIGHT_MODEL, type);
			int partId = CrossCache.getPartId(channel);
			Map<Long, CrossHeroBaseModel> fighterMap = DynastyWarriorsSysCache.getDynastyWarriorsCache(partId)
					.getFighterMap();
			Iterator<CrossHeroBaseModel> iterator = modelMap.values().iterator();
			for (; iterator.hasNext();) {
				CrossHeroBaseModel model = iterator.next();
				if (fighterMap.containsKey(model.getId())) {
					fighterMap.put(model.getId(), model);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, DynastyWarriorsIO.class, "DynastyWarriorsCross updateFightModel fail");
		}
	}
	
	/**
	 * 收到中央服同步的最新玩家战斗数据
	 */
	public void updateHeroData(Channel channel, CrossData crossData) {
		try {
			Type type = new TypeReference<Map<Long, CrossHeroBaseModel>>() {}.getType();
			Map<Long, CrossHeroBaseModel> fighterMap = crossData.getObject(DynastyWarriorsCrossType.FIGHT_MODEL, type);
//			Map<Long, CrossHeroBaseModel> fighterMap = crossData.getObjectMap(DynastyWarriorsCrossType.FIGHT_MODEL, Long.class, CrossHeroBaseModel.class);
			int partId = CrossCache.getlocalPartId();
			DynastyWarriorsCache cache = DynastyWarriorsSysCache.getDynastyWarriorsCache(partId);
			cache.setFighterMap(fighterMap);
		} catch (Exception e) {
			LogTool.error(e, DynastyWarriorsIO.class, "DynastyWarriorsCross updateHeroData fail");
		}
	}
	
	public void gmHandle(Channel channel, CrossData crossData) {
		int partId = CrossCache.getPartId(channel);
		DynastyWarriorsCache dwCache = DynastyWarriorsSysCache.getDynastyWarriorsCache(partId);
		Type type = new TypeReference<Map<Long, CrossHeroBaseModel>>() {
		}.getType();
		int gmType = crossData.getObject(DynastyWarriorsCrossType.GM, Integer.class);
		if (gmType == 1) {// 将排行榜数据当做初始战斗列表数据
			// dwCache.getMatchMap().clear();
			// dwCache.getBetMap().clear();
			// dwCache.getRoundWinnerMap().clear();
			// dwCache.getPondMap().clear();
			// dwCache.getEliminateMap().clear();
			// dwCache.setActRound(DynastyWarriorsConst.ROUND_1);
			// dwCache.setActState(DynastyWarriorsConst.READY_STATE);
			//// dwCache.setActRound(0);
			//// dwCache.setActState(0);
			//// dwCache.setStateTime(0);
			//// dwCache.setAwardRound(0);
			// Map<Long, CrossHeroBaseModel> modelMap =
			// crossData.getObject(DynastyWarriorsCrossType.GM_DATA.name(), type);
			// Map<Long, CrossHeroBaseModel> fighterMap =
			// DynastyWarriorsSysCache.getDynastyWarriorsCache().getFighterMap();
			// fighterMap.clear();
			// Iterator<CrossHeroBaseModel> iterator = modelMap.values().iterator();
			// for (; iterator.hasNext();) {
			// CrossHeroBaseModel model = iterator.next();
			//// if (!fighterMap.containsKey(model.getId())) {
			// fighterMap.put(model.getId(), model);
			//// }
			// }
			// DynastyWarriorsFunction.getIns().updataActState();
			// // 初始化第一轮比赛（16强）数据
			// List<Long> fighterList = new ArrayList<>(fighterMap.keySet());
			// DynastyWarriorsFunction.getIns().initRoundOne(fighterList,
			// DynastyWarriorsConst.ROUND_1);
			// // 初始化奖池
			// DynastyWarriorsFunction.getIns().initPond();
			// // 同步数据
			// DynastyWarriorsFunction.getIns().synMatchData();
			DynastyWarriorsFunction.getIns().initDynastyWarriors();
		} else if (gmType == 2) {
			int round = crossData.getObject(DynastyWarriorsCrossType.GM_ROUND, Integer.class);
			int state = crossData.getObject(DynastyWarriorsCrossType.GM_STATE, Integer.class);
			int actState = dwCache.getActState();
			if (round != 1) {
				if (state != 0 && state == actState) {
					return;
				}
			}
			dwCache.setActRound(round);
			if (state == DynastyWarriorsConst.READY_STATE) {
				dwCache.setActState(DynastyWarriorsConst.READY_STATE);
				dwCache.setStateTime(TimeDateUtil.getCurrentTime());
				if (round == 1) {
					state = 0;
					DynastyWarriorsFunction.getIns().initDynastyWarriors();
				} else {
					// 更新状态
					DynastyWarriorsFunction.getIns().updataActState(partId);
				}
			}
			if (state == DynastyWarriorsConst.FIGHT_STATE) {
				dwCache.setActState(DynastyWarriorsConst.FIGHT_STATE);
				dwCache.setStateTime(TimeDateUtil.getCurrentTime());
				// 更新状态
				DynastyWarriorsFunction.getIns().updataActState(partId);
				// 触发战斗处理
				DynastyWarriorsFunction.getIns().fightHandle(partId);
			}
		}
	}

}
