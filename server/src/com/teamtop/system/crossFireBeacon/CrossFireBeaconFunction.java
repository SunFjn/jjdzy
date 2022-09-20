package com.teamtop.system.crossFireBeacon;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.TreeSet;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossSender;
import com.teamtop.cross.CrossZone;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.CrossFireBeaconOpTaskRunnable;
import com.teamtop.synHandleCore.orderedRunnable.HeroOpTaskRunnable;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.system.actHall.ActHallInterface;
import com.teamtop.system.battleNew.BattleNewSysCache;
import com.teamtop.system.battleNew.model.BattleNewInfo;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.crossFireBeacon.cross.CrossFireBeaconType;
import com.teamtop.system.crossFireBeacon.model.BattleInfo;
import com.teamtop.system.crossFireBeacon.model.FireBeacon;
import com.teamtop.system.crossFireBeacon.model.FireBeaconCity;
import com.teamtop.system.crossFireBeacon.model.FireBeaconModel;
import com.teamtop.system.crossFireBeacon.model.FireBeaconRoom;
import com.teamtop.system.crossFireBeacon.model.FireBeaconServer;
import com.teamtop.system.crossFireBeacon.model.ZoneScore;
import com.teamtop.system.hero.FinalFightAttr;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.HeroSender;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_fhly_254;
import excel.config.Config_fhlypotion_254;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_fhly_254;
import excel.struct.Struct_fhlypotion_254;
import excel.struct.Struct_fhlyreward_254;
import io.netty.channel.Channel;

public class CrossFireBeaconFunction implements ActHallInterface {

	private static CrossFireBeaconFunction ins;

	private CrossFireBeaconFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized CrossFireBeaconFunction getIns() {
		if (ins == null) {
			ins = new CrossFireBeaconFunction();
		}
		return ins;
	}

	/**
	 * 征收
	 */
	public void levyHandle(Hero hero, boolean isLeave) {
		try {
			OpTaskExecutorService.DefaultService.execute(new HeroOpTaskRunnable() {

				@Override
				public void run() {
					try {
						long hid = hero.getId();
						int partId = CrossCache.getPartId(hero.getBelongZoneid());
						FireBeaconModel fireBeaconModel = CrossFireBeaconSysCache.getPlayerMap(partId).get(hid);
						int cityId = fireBeaconModel.getCityId();
						if (cityId == 0) {
							return;
						}
						int lastAwardTime = fireBeaconModel.getLastAwardTime();
						long updateTime = TimeDateUtil.getCurrentTimeInMillis();
						int currentTime = TimeDateUtil.getCurrentTime();
						if (lastAwardTime == 0) {
							fireBeaconModel.setLastAwardTime(currentTime);
							return;
						}
						int passTime = currentTime - lastAwardTime;
						Struct_fhly_254 struct_fhly_254 = Config_fhly_254.getIns().getMap().get(cityId);
						int time = struct_fhly_254.getTime();
						if (passTime >= time) {
							boolean guardianState = fireBeaconModel.isGuardianState();
							int potion = struct_fhly_254.getPotion();
							if(guardianState) {
								potion = struct_fhly_254.getPotion1();
							}
							fireBeaconModel.addScore(potion);
							fireBeaconModel.setLastAwardTime(currentTime - (passTime - time));
							fireBeaconModel.setUpdateTime(updateTime);
							refreshPersonalRank(fireBeaconModel, partId);
							addServerScore(fireBeaconModel.getBelongZoneid(), potion, partId);
							updateServerScore(fireBeaconModel.getRoomId(), hid, partId);
							CrossFireBeaconSender.sendCmd_3584(hid, 1, fireBeaconModel.getScore(), 0, 0);
							updateRedPoint(hero);
							CrossData crossData = new CrossData();
							crossData.putObject(CrossFireBeaconType.hid.name(), hid);
							crossData.putObject(CrossFireBeaconType.cityId.name(), cityId);
							crossData.putObject(CrossFireBeaconType.guardian.name(), guardianState);
							Channel channel = CrossCache.getChannel(fireBeaconModel.getBelongZoneid());
							NettyWrite.writeXData(channel, CrossConst.FIREBEACON_GS_LEVY_AWARD, crossData);
							CrossFireBeaconSender.sendCmd_3596(hid);
						}
						if (isLeave) {
							fireBeaconModel.setCityId(0);
							fireBeaconModel.setGuardianState(false);
							fireBeaconModel.setLastAwardTime(0);
							fireBeaconModel.setOccupyTime(0);
						}
					} catch (Exception e) {
						LogTool.error(e, CrossFireBeaconFunction.class, hero.getId(), hero.getNameZoneid(),
								"CrossFireBeaconFunction levyHandle");
					}
				}

				@Override
				public Object getSession() {
					return hero.getId();
				}
			});
		} catch (Exception e) {
			LogTool.error(e, CrossFireBeaconFunction.class, hero.getId(), hero.getName(),
					"CrossFireBeaconFunction levyHandle");
		}
	}

	/** 战斗检测处理 */
	public void battleCheck(FireBeaconRoom fireBeaconRoom) {
		try {
			int currentTime = TimeDateUtil.getCurrentTime();
			ConcurrentHashMap<Long, BattleInfo> battleInfoMap = fireBeaconRoom.getBattleInfoMap();
			Iterator<BattleInfo> iterator = battleInfoMap.values().iterator();
			for (; iterator.hasNext();) {
				BattleInfo battleInfo = iterator.next();
				try {
					int time = battleInfo.getTime();
					int passTime = currentTime - time;
					if (passTime < CrossFireBeaconConst.Battle_Time_Limit) {
						continue;
					}
					// 超时强制结束
					long battleId = battleInfo.getBattleId();
					long chaHid = battleInfo.getChaHid();
					Hero hero = HeroCache.getHero(chaHid);
					long guardian = battleInfo.getGuardian();
					long gLeftHp = battleInfo.getgLeftHp();
					long gLeftHudun = battleInfo.getgLeftHudun();
					BattleNewInfo battleNewInfo = BattleNewSysCache.getBattleMap().get(battleId);
					CrossFireBeaconManager.getIns().fightEnd(hero, battleNewInfo, guardian, gLeftHp, gLeftHudun);
					// ConcurrentHashMap<Long, Long> battleMap = fireBeaconRoom.getBattleMap();
					// if (battleMap != null) {
					// battleMap.remove(chaHid);
					// battleMap.remove(guardian);
					// }
					// iterator.remove();
				} catch (Exception e) {
					long chaId = 0;
					long guardian = 0;
					if (battleInfo != null) {
						chaId = battleInfo.getChaHid();
						guardian = battleInfo.getGuardian();
					}
					LogTool.error(e, CrossFireBeaconFunction.class,
							"CrossFireBeaconFunction battleCheck chaId=" + chaId + ", guardian=" + guardian);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, CrossFireBeaconFunction.class, "CrossFireBeaconFunction battleCheck");
		}
	}

	/**
	 * 广播
	 */
	public void broadcast() {
		try {

		} catch (Exception e) {
			LogTool.error(e, CrossFireBeaconFunction.class, "CrossFireBeaconFunction broadcast");
		}
	}

	/**
	 * 服务匹配（分配房间） 每10个服务器中两两随机匹配
	 */
	public void roomMatch() {
		try {

		} catch (Exception e) {
			LogTool.error(e, CrossFireBeaconFunction.class, "CrossFireBeaconFunction broadcast");
		}
	}

	public void resetData(Hero hero) {
		try {
			long hid = hero.getId();
			FireBeacon fireBeacon = hero.getFireBeacon();
			long currentTime = TimeDateUtil.getCurrentTimeInMillis();
			long lastResetTime = fireBeacon.getLastResetTime();
			scoreReward(hero);
			if (!TimeDateUtil.isSameDay(currentTime, lastResetTime)) {
				fireBeacon.setLastResetTime(currentTime);
				Set<Integer> alreadyGet = fireBeacon.getAlreadyGet();
				alreadyGet.clear();
				fireBeacon.setScore(0);
				LogTool.info(hid, hero.getName(), "CrossFireBeaconFunction resetData", CrossFireBeaconFunction.class);
			}
		} catch (Exception e) {
			LogTool.error(e, CrossFireBeaconFunction.class, hero.getId(), hero.getName(),
					"CrossFireBeaconFunction resetData");
		}
	}

	/**
	 * 子服活动结束处理
	 */
	public void actEndHandle() {
		Iterator<Hero> iterator = HeroCache.getHeroMap().values().iterator();
		for (; iterator.hasNext();) {
			try {
				Hero hero = iterator.next();
				if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_FIRE_BEACON)) {
					continue;
				}
				OpTaskExecutorService.DefaultService.execute(new HeroOpTaskRunnable() {

					@Override
					public void run() {
						CrossFireBeaconFunction.getIns().scoreReward(hero);
					}

					@Override
					public Object getSession() {
						return hero.getId();
					}
				});
			} catch (Exception e) {
				LogTool.error(e, CrossFireBeaconFunction.class, "CrossFireBeaconFunction scoreReward");
			}
		}
	}

	/**
	 * 补发积分奖励
	 */
	public void scoreReward(Hero hero) {
		try {
			FireBeacon fireBeacon = hero.getFireBeacon();
			long hid = hero.getId();
			Long score = CrossFireBeaconSysCache.membersScoreMap.remove(hid);
			if (score != null) {
				fireBeacon.setScore(score);
			} else {
				score = fireBeacon.getScore();
			}
			if (score == 0) {
				return;
			}
			// CrossFireBeaconSysCache.membersScoreMap.remove(hid);
			int mailScore = CrossFireBeaconConst.SCORE_AWARD_MAIL;
			Set<Integer> alreadyGet = fireBeacon.getAlreadyGet();
			if (score > 0) {
				List<Struct_fhlypotion_254> sortList = Config_fhlypotion_254.getIns().getSortList();
				int size = sortList.size();
				for (int i = 0; i < size; i++) {
					Struct_fhlypotion_254 scoreAward = sortList.get(i);
					if (alreadyGet.contains(scoreAward.getId())) {
						continue;
					}
					if (score >= scoreAward.getPotion()) {
						alreadyGet.add(scoreAward.getId());
						int[][] reward = scoreAward.getReward();
						MailFunction.getIns().sendMailWithFujianData2(hid, mailScore, new Object[] { mailScore },
								reward);
					}
				}
			}
			fireBeacon.setScore(0);
		} catch (Exception e) {
			LogTool.error(e, CrossFireBeaconFunction.class, hero.getId(), hero.getName(),
					"CrossFireBeaconFunction scoreReward");
		}
	}

	/** 发放排行奖励 */
	public void sendRankAward(int partId) {
		try {
			Map<Integer, Map<Long, Long>> awardNameListMap = new HashMap<>();
			Iterator<FireBeaconModel> playerIterator = CrossFireBeaconSysCache.getPlayerMap(partId).values().iterator();
			FireBeaconModel model = null;
			for (; playerIterator.hasNext();) {
				model = playerIterator.next();
				long hid = model.getHid();
				long score = model.getScore();
				int zoneid = model.getBelongZoneid();
				Map<Long, Long> map = awardNameListMap.get(zoneid);
				if (map == null) {
					map = new HashMap<>();
					awardNameListMap.put(zoneid, map);
				}
				map.put(hid, score);
			}
			Iterator<FireBeaconRoom> iterator = CrossFireBeaconSysCache.getRoomMap(partId).values().iterator();
			FireBeaconRoom room = null;
			for (; iterator.hasNext();) {
				room = iterator.next();
				List<Integer> zoneBelong = room.getZoneBelong();
				Integer sZoneId = zoneBelong.get(0);
				int size = zoneBelong.size();
				TreeSet<FireBeaconServer> zoneRankList = room.getZoneRankList();
				TreeSet<FireBeaconModel> personalRankList = room.getPersonalRankList();
				Iterator<FireBeaconServer> iterator2 = zoneRankList.iterator();
				List<ZoneScore> list = new ArrayList<>();
				for (; iterator2.hasNext();) {
					FireBeaconServer server = iterator2.next();
					ZoneScore zs = new ZoneScore();
					zs.setZoneId(server.getZoneId());
					zs.setScore(server.getTotalScore());
					list.add(zs);
				}
				for (int i = 0; i < size; i++) {
					int zoneid = zoneBelong.get(i);
					CrossData crossData = new CrossData();
					crossData.putObject(CrossFireBeaconType.personalRank.name(), personalRankList);
					crossData.putObject(CrossFireBeaconType.zoneRank.name(), zoneRankList);
					crossData.putObject(CrossFireBeaconType.lastScore.name(), list);
					crossData.putObject(CrossFireBeaconType.zoneId.name(), sZoneId);
					Map<Long, Long> map = awardNameListMap.get(zoneid);
					if (map != null) {
						crossData.putObject(CrossFireBeaconType.members.name(), map);
					}
					Channel channel = CrossCache.getChannel(zoneid);
					NettyWrite.writeXData(channel, CrossConst.FIREBEACON_GS_SENDAWARD, crossData);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, CrossFireBeaconFunction.class, "CrossFireBeaconFunction broadcast");
		}
	}

	/**
	 * 发送个人排行奖励
	 * @param personalRank 排名
	 * @param 胜利区号
	 */
	public void sendPersonalRankAward(TreeSet<FireBeaconModel> personalRank, int winZoneId, int partId) {
		try {
			if (personalRank.size() == 0) {
				CrossFireBeaconSysCache.LastMvp = "";
				CrossFireBeaconSysCache.LastMvpIcon = 0;
				CrossFireBeaconSysCache.LastMvpFrame = 0;
			}
			int mailSysId = CrossFireBeaconConst.PERSONAL_RANK_MAIL;
			int mailMvp = CrossFireBeaconConst.MVP_MAIL;
			Map<Integer, Struct_fhlyreward_254> personalRankAward = CrossFireBeaconSysCache.getPersonalRankAward();
			Iterator<FireBeaconModel> iterator = personalRank.iterator();
			int ranking = 1;
			FireBeaconModel model = null;
			Struct_fhlyreward_254 struct_fhlyreward_254 = null;
			int[][] reward = null;
			long hid = 0;
			long mvpHid = 0;
			for (; iterator.hasNext();) {
				try {
					model = iterator.next();
					hid = model.getHid();
					LogTool.info(mvpHid, model.getNameZoneid(),
							"CrossFireBeaconFunction:: score=" + model.getScore() + ", ranking=" + ranking,
							CrossFireBeaconFunction.class);
					if (mvpHid == 0 && model.getBelongZoneid() == winZoneId) {
						mvpHid = hid;
						CrossFireBeaconSysCache.LastMvp = model.getNameZoneid();
						CrossFireBeaconSysCache.LastMvpIcon = model.getIcon();
						CrossFireBeaconSysCache.LastMvpFrame = model.getFrame();
						CrossFireBeaconSysCache.getFireBeaconCache(partId).setLastMvp(CrossFireBeaconSysCache.LastMvp);
						CrossFireBeaconSysCache.getFireBeaconCache(partId)
								.setLastMvpIcon(CrossFireBeaconSysCache.LastMvpIcon);
						CrossFireBeaconSysCache.getFireBeaconCache(partId)
								.setLastMvpFrame(CrossFireBeaconSysCache.LastMvpFrame);
						ChatManager.getIns().broadCast(ChatConst.FIREBEACON_END,
								new Object[] { "S." + model.getBelongZoneid(), CrossFireBeaconSysCache.LastMvp }); // 全服广播
					}
					if (model.getBelongZoneid() == GameProperties.getFirstZoneId()) {
						struct_fhlyreward_254 = personalRankAward.get(ranking);
						reward = struct_fhlyreward_254.getReward();
						MailFunction.getIns().sendMailWithFujianData2(hid, mailSysId,
								new Object[] { mailSysId, ranking }, reward);
						if (mvpHid == hid && model.getBelongZoneid() == winZoneId) {
							int[][] mvpReward = Config_xtcs_004.getIns().get(CrossFireBeaconConst.MVP_AWARD).getOther();
							MailFunction.getIns().sendMailWithFujianData2(hid, mailMvp, new Object[] { mailMvp },
									mvpReward);
						}
						LogTool.info(hid, model.getNameZoneid(),
								"CrossFireBeaconFunction sendPersonalRankAward hid=" + hid + ", ranking=" + ranking,
								CrossFireBeaconFunction.class);
					}
				} catch (Exception e) {
					LogTool.error(e, CrossFireBeaconFunction.class, hid, "",
							"CrossFireBeaconFunction sendPersonalRankAward");
				}
				ranking++;
			}
		} catch (Exception e) {
			LogTool.error(e, CrossFireBeaconFunction.class, "CrossFireBeaconFunction sendPersonalRankAward");
		}
	}

	/**
	 * 发送区排行奖励
	 */
	public void sendServerRankAward(Map<Long, Long> members, int ranking) {
		try {
			Map<Integer, Struct_fhlyreward_254> zoneidRankAward = CrossFireBeaconSysCache.getZoneidRankAward();
			Struct_fhlyreward_254 struct_fhlyreward_254 = zoneidRankAward.get(ranking);
			int[][] reward = struct_fhlyreward_254.getReward();
			int mailSysId = CrossFireBeaconConst.ZONE_RANK_MAIL;
			Iterator<Entry<Long, Long>> iterator = members.entrySet().iterator();
			Entry<Long, Long> entry = null;
			for (; iterator.hasNext();) {
				long hid = 0;
				try {
					entry = iterator.next();
					hid = entry.getKey();
					long score = entry.getValue();
					if (score >= CrossFireBeaconConst.AWARD_SCORE_LIMIT) {
						MailFunction.getIns().sendMailWithFujianData2(hid, mailSysId,
								new Object[] { mailSysId, ranking }, reward);
					}
				} catch (Exception e) {
					LogTool.error(e, CrossFireBeaconFunction.class, hid, "", "CrossFireBeaconFunction broadcast");
				}
			}
		} catch (Exception e) {
			LogTool.error(e, CrossFireBeaconFunction.class, "CrossFireBeaconFunction broadcast");
		}
	}

	/** 活动是否开启 */
	public boolean heroIsOpen(Hero hero) {
		if (!isOpen()) {
			return false;
		}
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.CROSS_FIRE_BEACON)) {
			return false;
		}
		return true;
	}

	public boolean isOpen() {
		if (CrossFireBeaconSysCache.FireBeaconState == CrossFireBeaconConst.FB_OPEN) {
			return true;
		}
		return false;
	}


	/**
	 * 创建玩家活动数据
	 * 
	 * @param roomId
	 * @param belongZoneid
	 * @param hero
	 * @return
	 */
	public FireBeaconModel createFireBeaconModel(int roomId, int belongZoneid, Hero hero, int partId) {
		FireBeaconModel model = new FireBeaconModel();
		model.setHid(hero.getId());
		model.setNameZoneid(hero.getNameZoneid());
		model.setBelongZoneid(belongZoneid);
		FinalFightAttr finalFightAttr = hero.getFinalFightAttr();
		model.setLeftHp(finalFightAttr.getHpMax());
		model.setRoomId(roomId);
		FireBeaconServer fireBeaconServer = CrossFireBeaconSysCache.getZoneDataMap(partId).get(belongZoneid);
		byte belongType = fireBeaconServer.getBelongType();
		int[] bornPos = CrossFireBeaconFunction.getIns().getBornPos(belongType);
		model.setBelongType(belongType);
		model.setPosX(bornPos[0]);
		model.setPosY(bornPos[1]);
		model.setIcon(hero.getIcon());
		model.setFrame(hero.getFrame());
		model.setLeftHudun(finalFightAttr.getHudun());
		return model;
	}

	/**
	 * 重新进入活动重置玩家活动数据
	 */
	public void resetFireBeaconModel(Hero hero, FireBeaconModel model) {
		model.setNameZoneid(hero.getNameZoneid());
		model.setLeftHp(hero.getFinalFightAttr().getHpMax());
		byte belongType = model.getBelongType();
		int[] bornPos = CrossFireBeaconFunction.getIns().getBornPos(belongType);
		model.setPosX(bornPos[0]);
		model.setPosY(bornPos[1]);
		model.setIcon(hero.getIcon());
		model.setFrame(hero.getFrame());
		model.setLeftHudun(hero.getFinalFightAttr().getHudun());
	}

	/**
	 * 初始化房间数据
	 * 
	 * @param room
	 */
	public void initRoomData(FireBeaconRoom room, int partId) {
		List<Integer> zoneBelong = room.getZoneBelong();
		int roomId = room.getRoomId();
		// 初始化都城数据
		Map<Integer, FireBeaconCity> citys = room.getCitys();
		List<Struct_fhly_254> sortList = Config_fhly_254.getIns().getSortList();
		int size = sortList.size();
		Struct_fhly_254 struct_fhly_254 = null;
		int cityId = 0;
		for (int i = 0; i < size; i++) {
			struct_fhly_254 = sortList.get(i);
			cityId = struct_fhly_254.getId();
			FireBeaconCity city = new FireBeaconCity();
			citys.put(cityId, city);
			city.setCityId(cityId);
			city.setType(struct_fhly_254.getType());
			city.setBelongType((byte) struct_fhly_254.getGs());
		}
		// 初始化区参赛数据
		initServerData(roomId, zoneBelong.get(0), CrossFireBeaconConst.BlueType, citys, partId);
		if (zoneBelong.size() > 1) {
			initServerData(roomId, zoneBelong.get(1), CrossFireBeaconConst.RedType, citys, partId);
		}
		if (zoneBelong.size() > 2) {
			initServerData(roomId, zoneBelong.get(2), CrossFireBeaconConst.GreenType, citys, partId);
		}
	}

	/**
	 * 初始化区参赛数据
	 * 
	 * @param zoneId
	 * @param belongType
	 * @param citys
	 */
	public void initServerData(int roomId, int zoneId, byte belongType, Map<Integer, FireBeaconCity> citys, int partId) {
		FireBeaconServer fbServer = new FireBeaconServer();
		CrossFireBeaconSysCache.getZoneDataMap(partId).put(zoneId, fbServer);
		fbServer.setZoneId(zoneId);
		fbServer.setBelongType(belongType);
		fbServer.setRoomId(roomId);
		List<Integer> cityList = fbServer.getCityList();
		List<Integer> list = CrossFireBeaconSysCache.getGuardianCityMap().get(belongType);
		cityList.addAll(list);
		int size = list.size();
		int cityId = 0;
		FireBeaconCity city = null;
		for (int i = 0; i < size; i++) {
			cityId = list.get(i);
			city = citys.get(cityId);
			if (city != null) {
				city.setZoneId(zoneId);
			}
		}
	}

	/**
	 * 获取不同归属阵营的出生点坐标
	 * 
	 * @param belongType
	 * @return
	 */
	public int[] getBornPos(int belongType) {
		int[][] posArr = Config_xtcs_004.getIns().get(CrossFireBeaconConst.POS).getOther();
		for (int i = 0; i < posArr.length; i++) {
			if (belongType == posArr[i][0]) {
				return new int[] { posArr[i][1], posArr[i][2] };
			}
		}
		return null;
	}

	/** 增加区服积分 */
	public void addServerScore(int zoneId, long score, int partId) {
		FireBeaconServer fireBeaconServer = CrossFireBeaconSysCache.getZoneDataMap(partId).get(zoneId);
		fireBeaconServer.addTotalScore(score);
		fireBeaconServer.setUpdateTime(TimeDateUtil.getCurrentTimeInMillis());
		// 刷新排行榜
		refreshZoneRank(fireBeaconServer, partId);
	}

	/**
	 * 给房间内所有玩家更新区积分
	 * 
	 * @param roomId
	 */
	public void updateServerScore(int roomId, int partId) {
		FireBeaconRoom room = CrossFireBeaconSysCache.getRoomMap(partId).get(roomId);
		List<Integer> zoneBelong = room.getZoneBelong();
		long blueScore = 0;
		long redScore = 0;
		long greenScore = 0;
		for (int zoneid : zoneBelong) {
			FireBeaconServer server = CrossFireBeaconSysCache.getZoneDataMap(partId).get(zoneid);
			if (server.getBelongType() == CrossFireBeaconConst.BlueType) {
				blueScore = server.getTotalScore();
			} else if (server.getBelongType() == CrossFireBeaconConst.RedType) {
				redScore = server.getTotalScore();
			} else {
				greenScore = server.getTotalScore();
			}
		}
		Set<Long> members = room.getMembers();
		Iterator<Long> iterator = members.iterator();
		for (; iterator.hasNext();) {
			long hid = iterator.next();
			CrossFireBeaconSender.sendCmd_3584(hid, 2, blueScore, redScore, greenScore);
		}
	}

	/**
	 * 给对应玩家更新区积分
	 * 
	 * @param roomId 房间id
	 * @param hid 玩家id
	 */
	public void updateServerScore(int roomId, long hid, int partId) {
		FireBeaconRoom room = CrossFireBeaconSysCache.getRoomMap(partId).get(roomId);
		List<Integer> zoneBelong = room.getZoneBelong();
		long blueScore = 0;
		long redScore = 0;
		long greenScore = 0;
		for (int zoneid : zoneBelong) {
			FireBeaconServer server = CrossFireBeaconSysCache.getZoneDataMap(partId).get(zoneid);
			if (server.getBelongType() == CrossFireBeaconConst.BlueType) {
				blueScore = server.getTotalScore();
			} else if (server.getBelongType() == CrossFireBeaconConst.RedType) {
				redScore = server.getTotalScore();
			} else {
				greenScore = server.getTotalScore();
			}
		}
		CrossFireBeaconSender.sendCmd_3584(hid, 2, blueScore, redScore, greenScore);
	}

	/**
	 * 刷新区服排行
	 * 
	 * @param fireBeaconServer
	 */
	public void refreshZoneRank(FireBeaconServer fireBeaconServer, int partId) {
		try {
			if (fireBeaconServer.getTotalScore() == 0) {
				return;
			}
			OpTaskExecutorService.PublicOrderService.execute(new CrossFireBeaconOpTaskRunnable() {

				@Override
				public void run() {
					try {
						int roomId = fireBeaconServer.getRoomId();
						FireBeaconRoom fireBeaconRoom = CrossFireBeaconSysCache.getRoomMap(partId).get(roomId);
						TreeSet<FireBeaconServer> zoneRankList = fireBeaconRoom.getZoneRankList();
						boolean find = false;
						Iterator<FireBeaconServer> iterator = zoneRankList.iterator();
						for (; iterator.hasNext();) {
							FireBeaconServer server = iterator.next();
							if (server.getZoneId() == fireBeaconServer.getZoneId()) {
								find = true;
								iterator.remove();
							}
						}
						if (find) {
							zoneRankList.add(fireBeaconServer);
						} else {
							if (zoneRankList.size() < CrossFireBeaconConst.FIGHT_SIDES) {
								zoneRankList.add(fireBeaconServer);
							}
						}
					} catch (Exception e) {
						LogTool.error(e, CrossFireBeaconFunction.class, "CrossFireBeaconFunction refreshZoneRank");
					}
				}
				@Override
				public Object getSession() {
					return OpTaskConst.FIRE_BEACON_REFRESH_RANK;
				}
			});
		} catch (Exception e) {
			LogTool.error(e, CrossFireBeaconFunction.class, "CrossFireBeaconFunction refreshZoneRank");
		}
	}

	/** 刷新个人排名 */
	public void refreshPersonalRank(FireBeaconModel model, int partId) {
		try {
			if (model.getScore() == 0) {
				return;
			}
			OpTaskExecutorService.PublicOrderService.execute(new CrossFireBeaconOpTaskRunnable() {

				@Override
				public void run() {
					try {
						int roomId = model.getRoomId();
						FireBeaconRoom fireBeaconRoom = CrossFireBeaconSysCache.getRoomMap(partId).get(roomId);
						TreeSet<FireBeaconModel> personalRankList = fireBeaconRoom.getPersonalRankList();
						if (personalRankList.size() >= CrossFireBeaconConst.PERSONAL_RANK_NUM) {
							FireBeaconModel last = personalRankList.last();
							if (model.getHid() != last.getHid() && model.getScore() <= last.getScore()) {
								return;
							}
						}
						boolean find = false;
						Iterator<FireBeaconModel> iterator = personalRankList.iterator();
						for (; iterator.hasNext();) {
							FireBeaconModel old = iterator.next();
							if (model.getHid() == old.getHid()) {
								find = true;
								iterator.remove();
							}
						}
						if (find) {
							personalRankList.add(model);
						} else {
							if (personalRankList.size() < CrossFireBeaconConst.PERSONAL_RANK_NUM) {
								personalRankList.add(model);
							} else {
								personalRankList.add(model);
								personalRankList.pollLast();
							}
						}
					} catch (Exception e) {
						LogTool.error(e, CrossFireBeaconFunction.class, "CrossFireBeaconFunction refreshPersonalRank");
					}
				}

				@Override
				public Object getSession() {
					return OpTaskConst.FIRE_BEACON_REFRESH_RANK;
				}
			});
		} catch (Exception e) {
			LogTool.error(e, CrossFireBeaconFunction.class, "CrossFireBeaconFunction refreshPersonalRank");
		}
	}

	/**
	 * 活动结束通知玩家断开跨服连接
	 */
	public void disconnetFromCross() {
		Set<Integer> keySet = CrossFireBeaconSysCache.getFireBeaconCacheMap().keySet();
		for (int partId : keySet) {
			Set<Long> playerSet = CrossFireBeaconSysCache.getPlayerMap(partId).keySet();
			Iterator<Long> iterator = playerSet.iterator();
			for (; iterator.hasNext();) {
				long hid = iterator.next();
				CrossSender.sendCmd_1666(hid, SystemIdConst.CROSS_FIRE_BEACON);
			}
		}
	}

	/**
	 * 活动结束清除缓存数据
	 */
	public void clearAll() {
		Set<Integer> keySet = CrossFireBeaconSysCache.getFireBeaconCacheMap().keySet();
		for (int partId : keySet) {
			CrossFireBeaconSysCache.getPlayerMap(partId).clear();
			CrossFireBeaconSysCache.getRoomMap(partId).clear();
			CrossFireBeaconSysCache.getZoneDataMap(partId).clear();
			CrossFireBeaconSysCache.getZoneIds(partId).clear();
		}
		CrossFireBeaconSysCache.getFireBeaconCacheMap().clear();
		CrossFireBeaconSysCache.roomIdCreator.set(1);
	}

	@Override
	public void getActHallData(List<Object[]> list) {
		list.add(new Object[] { SystemIdConst.CROSS_FIRE_BEACON, CrossFireBeaconSysCache.LastMvp });
	}

	/**
	 * 红点检测
	 */
	public boolean checkRedPoint(Hero hero) {
		if (hero == null) {
			return false;
		}
		long hid = hero.getId();
		try {
			if (!CrossZone.isCrossServer()) {
				return false;
			}
			if (!CrossFireBeaconFunction.getIns().isOpen()) {
				return false;
			}
			int partId = CrossCache.getPartId(hero.getBelongZoneid());
			FireBeaconModel model = CrossFireBeaconSysCache.getPlayerMap(partId).get(hid);
			Set<Integer> alreadyGet = model.getAlreadyGet();
			long score = model.getScore();
			if (score > 0) {
				List<Struct_fhlypotion_254> sortList = Config_fhlypotion_254.getIns().getSortList();
				int size = sortList.size();
				for (int i = 0; i < size; i++) {
					Struct_fhlypotion_254 scoreAward = sortList.get(i);
					if (score >= scoreAward.getPotion()) {
						if (!alreadyGet.contains(scoreAward.getId())) {
							return true;
						}
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, CrossFireBeaconFunction.class, hid, hero.getNameZoneid(),
					"CrossFireBeaconFunction checkRedPiont");
		}
		return false;
	}
	
	public void updateRedPoint(Hero hero) {
		try {
			if(hero==null){
				return;
			}
			if (!CrossZone.isCrossServer()) {
				return;
			}
			if (!CrossFireBeaconFunction.getIns().isOpen()) {
				return;
			}
			boolean redPoint = checkRedPoint(hero);
			int state = RedPointConst.NO_RED;
			if (redPoint) {
				state = RedPointConst.HAS_RED;
			}
			RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.CROSS_FIRE_BEACON,
					CrossFireBeaconConst.redPoint, RedPointConst.HAS_RED);
			List<Object[]> list = new ArrayList<>();
			List<Object[]> stateList = new ArrayList<>();
			stateList.add(new Object[] { CrossFireBeaconConst.redPoint, state });
			list.add(new Object[] { SystemIdConst.CROSS_FIRE_BEACON, stateList.toArray() });
			HeroSender.sendCmd_160(hero.getId(), list.toArray());
		} catch (Exception e) {
			LogTool.error(e, CrossFireBeaconFunction.class, hero.getId(), hero.getNameZoneid(),
					"CrossFireBeaconFunction checkRedPiont");
		}
	}

}
