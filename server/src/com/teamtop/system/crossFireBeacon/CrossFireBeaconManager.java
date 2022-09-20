package com.teamtop.system.crossFireBeacon;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossFunction;
import com.teamtop.cross.CrossZone;
import com.teamtop.cross.callback.Callback;
import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.CrossFireBeaconOpTaskRunnable;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.system.battle.BattleFunction;
import com.teamtop.system.battleNew.BattleNewFunction;
import com.teamtop.system.battleNew.BattleNewSysCache;
import com.teamtop.system.battleNew.BttleTypeConst;
import com.teamtop.system.battleNew.model.BattleNewInfo;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.crossFireBeacon.cross.CrossFireBeaconType;
import com.teamtop.system.crossFireBeacon.model.BattleInfo;
import com.teamtop.system.crossFireBeacon.model.FireBeacon;
import com.teamtop.system.crossFireBeacon.model.FireBeaconCity;
import com.teamtop.system.crossFireBeacon.model.FireBeaconModel;
import com.teamtop.system.crossFireBeacon.model.FireBeaconRoom;
import com.teamtop.system.crossFireBeacon.model.FireBeaconServer;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.util.ProbabilityEvent.RandomUtil;
import com.teamtop.util.common.ConcurrentHashSet;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_fhly_254;
import excel.config.Config_fhlypotion_254;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_fhly_254;
import excel.struct.Struct_fhlypotion_254;
import io.netty.channel.Channel;

public class CrossFireBeaconManager {

	private static CrossFireBeaconManager ins;

	private CrossFireBeaconManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized CrossFireBeaconManager getIns() {
		if (ins == null) {
			ins = new CrossFireBeaconManager();
		}
		return ins;
	}

	/** 打开界面 */
	public void openUI(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (CrossZone.isCrossServer()) {
				return;
			}
			if (!CrossFireBeaconFunction.getIns().heroIsOpen(hero)) {
				return;
			}
			String lastMvp = "";
			if(CrossFireBeaconSysCache.LastMvp!=null) {
				lastMvp = CrossFireBeaconSysCache.LastMvp;
			}
			CrossFireBeaconSender.sendCmd_3552(hid, lastMvp);
			/*Map<Long, FireBeaconModel> playerMap = CrossFireBeaconSysCache.getPlayerMap();
			FireBeaconModel fireBeaconModel = playerMap.get(hid);
			int roomId = fireBeaconModel.getRoomId();
			FireBeaconRoom fireBeaconRoom = CrossFireBeaconSysCache.getRoomMap().get(roomId);
			byte belongType = fireBeaconModel.getBelongType();
			int index = belongType-1;
			int zoneid = fireBeaconModel.getBelongZoneid();
			CrossFireBeaconSysCache.getZoneDataMap()*/
		} catch (Exception e) {
			LogTool.error(e, CrossFireBeaconManager.class, hero.getId(), hero.getName(), "openUI");
		}
	}

	/**
	 * 获取个人排行
	 * 
	 * @param hero
	 */
	public void getPersonalRanking(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!CrossZone.isCrossServer()) {
				return;
			}
			if (!CrossFireBeaconFunction.getIns().isOpen()) {
				return;
			}
			int partId = CrossCache.getPartId(hero.getBelongZoneid());
			Map<Long, FireBeaconModel> playerMap = CrossFireBeaconSysCache.getPlayerMap(partId);
			FireBeaconModel fireBeaconModel = playerMap.get(hid);
			int roomId = fireBeaconModel.getRoomId();
			FireBeaconRoom fireBeaconRoom = CrossFireBeaconSysCache.getRoomMap(partId).get(roomId);
			TreeSet<FireBeaconModel> personalRankList = fireBeaconRoom.getPersonalRankList();
			TreeSet<FireBeaconModel> tempSet = new TreeSet<>(personalRankList);
			List<Object[]> rankList = new ArrayList<>();
			int myRanking = 0;
			int ranking = 1;
			Iterator<FireBeaconModel> iterator = tempSet.iterator();
			FireBeaconModel model = null;
			FireBeaconModel fbModel = null;
			for (; iterator.hasNext();) {
				model = iterator.next();
				long id = model.getHid();
				if (id == hero.getId()) {
					myRanking = ranking;
				}
				fbModel = playerMap.get(id);
				rankList.add(new Object[] { ranking, fbModel.getNameZoneid(), fbModel.getScore() });
				System.err.println("CrossFireBeaconSender ranking=" + ranking + ", score=" + fbModel.getScore());
				ranking++;
			}
			long score = fireBeaconModel.getScore();
			CrossFireBeaconSender.sendCmd_3554(hid, rankList.toArray(), myRanking, score);
		} catch (Exception e) {
			LogTool.error(e, CrossFireBeaconManager.class, hero.getId(), hero.getName(),
					"CrossFireBeaconManager getPersonalRanking");
		}
	}

	/**
	 * 获取区排行
	 * @param hero
	 */
	public void getZoneRanking(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!CrossZone.isCrossServer()) {
				return;
			}
			if (!CrossFireBeaconFunction.getIns().isOpen()) {
				return;
			}
			int partId = CrossCache.getPartId(hero.getBelongZoneid());
			Map<Long, FireBeaconModel> playerMap = CrossFireBeaconSysCache.getPlayerMap(partId);
			FireBeaconModel fireBeaconModel = playerMap.get(hid);
			int roomId = fireBeaconModel.getRoomId();
			FireBeaconRoom fireBeaconRoom = CrossFireBeaconSysCache.getRoomMap(partId).get(roomId);
			TreeSet<FireBeaconServer> zoneRankList = fireBeaconRoom.getZoneRankList();
			if (zoneRankList.size() == 0) {
				return;
			}
			FireBeaconServer server = zoneRankList.first();
			int zoneId = 0;
			if (server != null) {
				zoneId = server.getZoneId();
			}
			TreeSet<FireBeaconModel> personalRankList = new TreeSet<>(fireBeaconRoom.getPersonalRankList());
			Iterator<FireBeaconModel> pIterator = personalRankList.iterator();
			FireBeaconModel mvp = null;
			for (; pIterator.hasNext();) {
				FireBeaconModel model = pIterator.next();
				if (model.getBelongZoneid() == zoneId) {
					mvp = model;
					break;
				}
			}
			TreeSet<FireBeaconServer> tempSet = new TreeSet<>(zoneRankList);
			Iterator<FireBeaconServer> iterator = tempSet.iterator();
			List<Object[]> rankList = new ArrayList<>();
			int ranking = 1;
			FireBeaconServer fireBeaconServer = null;
			for (; iterator.hasNext();) {
				// I:排名U:区号L:总积分]区排行数据U:MVP玩家名L:当前MVP玩家积分
				fireBeaconServer = iterator.next();
				rankList.add(new Object[] { ranking, fireBeaconServer.getZoneId(), fireBeaconServer.getTotalScore() });
				ranking++;
			}
			long score = mvp.getScore();
			String mvpName = "";
			int mvpIcon = 0;
			int mvpFrame = 0;
			if (mvp != null) {
				mvpName = mvp.getNameZoneid();
				mvpIcon = mvp.getIcon();
				mvpFrame = mvp.getFrame();
			}
			CrossFireBeaconSender.sendCmd_3556(hid, rankList.toArray(), mvpName, score, mvpIcon, mvpFrame);
		} catch (Exception e) {
			LogTool.error(e, CrossFireBeaconManager.class, hero.getId(), hero.getName(),
					"CrossFireBeaconManager getZoneRanking");
		}
	}

	/** 进入烽火狼烟活动 */
	public void enterMatch(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!CrossFireBeaconFunction.getIns().heroIsOpen(hero)) {
				CrossFireBeaconSender.sendCmd_3558(hid, 0, 3, 0);
				return;
			}
			FireBeacon fireBeacon = hero.getFireBeacon();
			long lastResetTime = fireBeacon.getLastResetTime();
			long currentTimeInMillis = TimeDateUtil.getCurrentTimeInMillis();
			if (!TimeDateUtil.isSameDay(currentTimeInMillis, lastResetTime)) {
				fireBeacon.setLastResetTime(currentTimeInMillis);
				Set<Integer> alreadyGet = fireBeacon.getAlreadyGet();
				alreadyGet.clear();
				fireBeacon.setScore(0);
				LogTool.info(hid, hero.getName(), "CrossFireBeaconManager resetData", CrossFireBeaconManager.class);
			}
			int cdStartTime = fireBeacon.getCdStartTime();
			if (cdStartTime > 0) {
				int currentTime = TimeDateUtil.getCurrentTime();
				int passTime = currentTime - cdStartTime;
				if (passTime < CrossFireBeaconConst.JOIN_CD) {
					CrossFireBeaconSender.sendCmd_3558(hid, 0, 2, CrossFireBeaconConst.JOIN_CD - passTime);
					return;
				}
			}
			Channel crossChannel = Client_2.getIns().getCrossChannel();
			CrossData crossData = new CrossData();
			crossData.putObject(CrossFireBeaconType.zoneId.name(),
			GameProperties.getFirstZoneId());
			crossData.putObject(CrossFireBeaconType.hid.name(), hero.getId());
			NettyWrite.writeXData(crossChannel, CrossConst.FIREBEACON_SG_ENTER, crossData, new Callback() {
			
				@Override
				public void dataReci(Channel channel, CrossData crossData) {
					int result = crossData.getObject(CrossFireBeaconType.enterResult, Integer.class);
					if (result == 0) {// 满人
						CrossFireBeaconSender.sendCmd_3558(hid, 0, 1, 0);
						return;
					}
					CrossFunction.askCross(hero, SystemIdConst.CROSS_FIRE_BEACON);
				}
			});
		} catch (Exception e) {
			LogTool.error(e, CrossFireBeaconManager.class, hero.getId(), hero.getName(),
					"CrossFireBeaconManager enterMatch");
		}
	}

	/** 退出活动 */
	public void leave(Hero hero, boolean isLogout) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!CrossZone.isCrossServer()) {
				return;
			}
			if (!CrossFireBeaconFunction.getIns().isOpen()) {
				CrossFireBeaconSender.sendCmd_3558(hid, 0, 3, 0);
				return;
			}
			int partId = CrossCache.getPartId(hero.getBelongZoneid());
			Map<Long, FireBeaconModel> playerMap = CrossFireBeaconSysCache.getPlayerMap(partId);
			FireBeaconModel myFbModel = playerMap.get(hid);
			int roomId = myFbModel.getRoomId();
			FireBeaconRoom fireBeaconRoom = CrossFireBeaconSysCache.getRoomMap(partId).get(roomId);
			int cityId = myFbModel.getCityId();
			ConcurrentHashSet<Long> showList = fireBeaconRoom.getShowList();
			if (showList.contains(hid)) {
				showList.remove(hid);
			}
			if (cityId > 0) {
				FireBeaconCity fireBeaconCity = fireBeaconRoom.getCitys().get(cityId);
				ConcurrentHashSet<Long> members = fireBeaconCity.getMembers();
				if (myFbModel.isGuardianState()) {
					ConcurrentHashMap<Long, Long> battleMap = fireBeaconRoom.getBattleMap();
					if (!isLogout && battleMap.containsKey(hid)) {
						// 自己在战斗中
						CrossFireBeaconSender.sendCmd_3576(hid, 0);
						return;
					}
					// 同步坐标
					flashMoveSyn(fireBeaconCity, fireBeaconRoom, myFbModel.getBelongType(), hid, partId, true);
					members.clear();
					fireBeaconCity.setGuardian(0);
					if (fireBeaconCity.getType() != CrossFireBeaconConst.GUARDIAN_CITY) {
						fireBeaconCity.setBelongType((byte) 0);
					}
					fireBeaconCity.setZoneId(0);
					myFbModel.setGuardianState(false);
				}
				myFbModel.setCityId(0);
				members.remove(hid);
				refreshCity(hid, roomId, cityId, false, partId);
			}
			fireBeaconRoom.getMembers().remove(hid);
			FireBeaconServer fireBeaconServer = CrossFireBeaconSysCache.getZoneDataMap(partId)
					.get(myFbModel.getBelongZoneid());
			Set<Long> members = fireBeaconServer.getMembers();
			members.remove(hid);
			CrossFireBeaconFunction.getIns().resetFireBeaconModel(hero, myFbModel);
			CrossFireBeaconSender.sendCmd_3576(hid, 1);
			LogTool.info(hid, hero.getName(), "CrossFireBeaconManager leave, isLogout=" + isLogout,
					CrossFireBeaconManager.class);
			CrossData crossData = new CrossData();
			crossData.putObject(CrossFireBeaconType.hid.name(), hid);
			Channel channel = CrossCache.getChannel(myFbModel.getBelongZoneid());
			NettyWrite.writeXData(channel, CrossConst.FIREBEACON_GS_LEAVE, crossData);
		} catch (Exception e) {
			LogTool.error(e, CrossFireBeaconManager.class, hero.getId(), hero.getName(),
					"CrossFireBeaconManager leave");
		}
	}

	/**
	 * 查看都城信息
	 * 
	 * @param hero
	 */
	public void showCityInfo(Hero hero, int cityId) {
		if (hero == null) {
			return;
		}
		try {
			if (!CrossZone.isCrossServer()) {
				return;
			}
			if (!CrossFireBeaconFunction.getIns().isOpen()) {
				return;
			}
			// 返回都城信息 L:玩家idU:玩家名L:战力I:头像I:头像框L:当前血量百分比I:征收人数
			long hid = hero.getId();
			int partId = CrossCache.getPartId(hero.getBelongZoneid());
			Map<Long, FireBeaconModel> playerMap = CrossFireBeaconSysCache.getPlayerMap(partId);
			FireBeaconModel myFbModel = playerMap.get(hid);
			int roomId = myFbModel.getRoomId();
			FireBeaconRoom fireBeaconRoom = CrossFireBeaconSysCache.getRoomMap(partId).get(roomId);
			FireBeaconCity fireBeaconCity = fireBeaconRoom.getCitys().get(cityId);
			long pid = fireBeaconCity.getGuardian();
			String name = "";
			long strength = 0;
			int icon = 0;
			int frame = 0;
			int hp = 0;
			int num = fireBeaconCity.getMembers().size();
			if (pid > 0) {
				Hero guardian = HeroCache.getHero(pid);
				name = guardian.getNameZoneid();
				strength = guardian.getTotalStrength();
				icon = guardian.getIcon();
				frame = guardian.getFrame();
				FireBeaconModel model = CrossFireBeaconSysCache.getPlayerMap(partId).get(pid);
				hp = (int) (model.getLeftHp() * 100 / guardian.getFinalFightAttr().getHpMax());
			}
			CrossFireBeaconSender.sendCmd_3560(hid, pid, name, strength, icon, frame, hp, num);
		} catch (Exception e) {
			LogTool.error(e, CrossFireBeaconManager.class, hero.getId(), hero.getName(), "CrossFireBeaconManager");
		}
	}

	/**
	 * 获取征收成员列表
	 * 
	 * @param hero
	 * @param cityId
	 */
	public void getMemberList(Hero hero, int cityId) {
		try {
			if (!CrossZone.isCrossServer()) {
				return;
			}
			if (!CrossFireBeaconFunction.getIns().isOpen()) {
				return;
			}
			long hid = hero.getId();
			int partId = CrossCache.getPartId(hero.getBelongZoneid());
			Map<Long, FireBeaconModel> playerMap = CrossFireBeaconSysCache.getPlayerMap(partId);
			FireBeaconModel myFbModel = playerMap.get(hid);
			int roomId = myFbModel.getRoomId();
			FireBeaconRoom fireBeaconRoom = CrossFireBeaconSysCache.getRoomMap(partId).get(roomId);
			FireBeaconCity city = fireBeaconRoom.getCitys().get(cityId);
			List<Object[]> membersData = new ArrayList<>();
			ConcurrentHashSet<Long> members = city.getMembers();
			Iterator<Long> iterator = members.iterator();
			FireBeaconModel model = null;
			long pid = 0;
			for (; iterator.hasNext();) {
				pid = iterator.next();
				model = playerMap.get(pid);
				if (model == null) {
					continue;
				}
				membersData.add(new Object[] { pid, model.getNameZoneid() });
			}
			CrossFireBeaconSender.sendCmd_3590(hid, membersData.toArray());
		} catch (Exception e) {
			LogTool.error(e, CrossFireBeaconManager.class, hero.getId(), hero.getName(),
					"CrossFireBeaconManager getMemberList, city=" + cityId);
		}
	}

	/**
	 * 移动
	 * @param hero
	 * @param posX 目标坐标x
	 * @param posY 目标坐标y
	 */
	public void move(Hero hero, int posX, int posY) {
		if (hero == null) {
			return;
		}
		try {
			if (!CrossZone.isCrossServer()) {
				return;
			}
			if (!CrossFireBeaconFunction.getIns().isOpen()) {
				return;
			}
			long hid = hero.getId();
			int partId = CrossCache.getPartId(hero.getBelongZoneid());
			Map<Long, FireBeaconModel> playerMap = CrossFireBeaconSysCache.getPlayerMap(partId);
			FireBeaconModel myFbModel = playerMap.get(hid);
			int roomId = myFbModel.getRoomId();
			FireBeaconRoom fireBeaconRoom = CrossFireBeaconSysCache.getRoomMap(partId).get(roomId);
			ConcurrentHashMap<Long, Long> battleMap = fireBeaconRoom.getBattleMap();
			if (battleMap.containsKey(hid)) {
				CrossFireBeaconSender.sendCmd_3562(hid, 0, 1);
				return;
			}
			CrossFireBeaconFunction.getIns().levyHandle(hero, true);
			LogTool.info("name=" + hero.getName() + ", posx=" + posX + ", posy=" + posY, CrossFireBeaconManager.class);
			myFbModel.setPosX(posX);
			myFbModel.setPosY(posY);
			Set<Long> showList = fireBeaconRoom.getShowList();
			if (showList.contains(hid)) {
				// 需同步给场景中所有玩家
				Set<Long> members = fireBeaconRoom.getMembers();
				for(long id : members) {
					if (id == hid) {
						continue;
					}
					CrossFireBeaconSender.sendCmd_3564(id, hid, CrossFireBeaconConst.NOMAL_MOVE, posX, posY);
				}
			}
			CrossFireBeaconSender.sendCmd_3564(hid, hid, CrossFireBeaconConst.NOMAL_MOVE, posX, posY);
			int cityId = myFbModel.getCityId();
			if (cityId == 0) {
				myFbModel.setGuardianState(false);
			}
			if (cityId > 0) {
				FireBeaconCity fireBeaconCity = fireBeaconRoom.getCitys().get(cityId);
				ConcurrentHashSet<Long> members = fireBeaconCity.getMembers();
				if (myFbModel.isGuardianState()) {
					// 同步坐标
					flashMoveSyn(fireBeaconCity, fireBeaconRoom, myFbModel.getBelongType(), hid, partId, true);
					members.clear();
					fireBeaconCity.setGuardian(0);
					if (fireBeaconCity.getType() != CrossFireBeaconConst.GUARDIAN_CITY) {
						fireBeaconCity.setBelongType((byte) 0);
					}
					fireBeaconCity.setZoneId(0);
					myFbModel.setGuardianState(false);
				}
				myFbModel.setCityId(0);
				members.remove(hid);
				refreshCity(hid, roomId, cityId, false, partId);
			}
			CrossFireBeaconSender.sendCmd_3562(hid, 1, 0);
		} catch (Exception e) {
			LogTool.error(e, CrossFireBeaconManager.class, hero.getId(), hero.getName(), "CrossFireBeaconManager");
		}
	}

	/**
	 * 占领都城
	 */
	public void occupyCity(Hero hero, int cityId) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		ConcurrentHashMap<Long, Long> battleMap = null;
//		ConcurrentHashMap<Long, BattleInfo> battleInfoMap = null;
//		long battleId = 0;
		long guardian = 0;
		try {
			if (!CrossZone.isCrossServer()) {
				return;
			}
			if (!CrossFireBeaconFunction.getIns().isOpen()) {
				return;
			}
			int partId = CrossCache.getPartId(hero.getBelongZoneid());
			FireBeaconModel fireBeaconModel = CrossFireBeaconSysCache.getPlayerMap(partId).get(hid);
			if (fireBeaconModel.getCityId() > 0) {
				return;
			}
			int roomId = fireBeaconModel.getRoomId();
			FireBeaconRoom fireBeaconRoom = CrossFireBeaconSysCache.getRoomMap(partId).get(roomId);
			battleMap = fireBeaconRoom.getBattleMap();
			if (battleMap.containsKey(hid)) {
				// 自己在战斗中
				CrossFireBeaconSender.sendCmd_3566(hid, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0);
				return;
			}
			FireBeaconCity fireBeaconCity = fireBeaconRoom.getCitys().get(cityId);
			int type = fireBeaconCity.getType();
			if (type == CrossFireBeaconConst.GUARDIAN_CITY) {
				// 卫城不能打
				CrossFireBeaconSender.sendCmd_3566(hid, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0);
				return;
			}
			byte belongType = fireBeaconCity.getBelongType();
			if (fireBeaconModel.getBelongType() == belongType) {
				// 同阵营不能打
				CrossFireBeaconSender.sendCmd_3566(hid, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0);
				return;
			}
			guardian = fireBeaconCity.getGuardian();
			if (guardian == 0) {
				// 直接占领
				ConcurrentHashSet<Long> members = fireBeaconCity.getMembers();
				fireBeaconCity.setGuardian(hid);
				fireBeaconCity.setBelongType(fireBeaconModel.getBelongType());
				fireBeaconCity.setZoneId(fireBeaconModel.getBelongZoneid());
				fireBeaconModel.setCityId(cityId);
				fireBeaconModel.setGuardianState(true);
				int currentTime = TimeDateUtil.getCurrentTime();
				fireBeaconModel.setOccupyTime(currentTime);
				fireBeaconModel.setLastAwardTime(currentTime);
				members.add(hid);
				long cHp = fireBeaconModel.getLeftHp();
				CrossFireBeaconSender.sendCmd_3566(hid, 1, 1, hid, cHp, cHp, 0, guardian, 0, 0, 0, 0);
				refreshCity(hid, roomId, cityId, true, partId);
				if (fireBeaconCity.getType() == CrossFireBeaconConst.KING_CITY) {
					List<Integer> zoneBelong = fireBeaconRoom.getZoneBelong();
					CrossData crossData = new CrossData();
					crossData.putObject(CrossFireBeaconType.boardType.name(), ChatConst.FIREBEACON_KING);
					crossData.putObject(CrossFireBeaconType.params.name(), new Object[] { hero.getNameZoneid() });
					for (int zoneid : zoneBelong) {
						Channel channel = CrossCache.getChannel(zoneid);
						NettyWrite.writeXData(channel, CrossConst.FIREBEACON_GS_BOARD, crossData);
					}
				}
			} else {
				occupyCityfight(fireBeaconRoom, fireBeaconCity, hero, partId);
			}
		} catch (Exception e) {
			if (battleMap != null) {
				battleMap.remove(hid);
				battleMap.remove(guardian);
			}
//			if (battleInfoMap != null) {
//				battleInfoMap.remove(battleId);
//			}
			LogTool.error(e, CrossFireBeaconManager.class, hero.getId(), hero.getName(),
					"CrossFireBeaconManager occupyCity");
		}
	}

	/**
	 * 抢夺城池
	 * @param fireBeaconRoom
	 * @param fireBeaconCity
	 * @param hero
	 */
	private void occupyCityfight(FireBeaconRoom fireBeaconRoom, FireBeaconCity fireBeaconCity, Hero hero, int partId) {
		int roomId = fireBeaconRoom.getRoomId();
		OpTaskExecutorService.PublicOrderService.execute(new CrossFireBeaconOpTaskRunnable() {

			@Override
			public void run() {
				ConcurrentHashMap<Long, Long> battleMap = null;
				ConcurrentHashMap<Long, BattleInfo> battleInfoMap = null;
				long battleId = 0;
				long hid = hero.getId();
				long guardian = fireBeaconCity.getGuardian();
				try {
					battleMap = fireBeaconRoom.getBattleMap();
					if (battleMap.containsKey(guardian)) {
						// 战斗中
						CrossFireBeaconSender.sendCmd_3566(hid, 0, 4, 0, 0, 0, 0, 0, 0, 0, 0, 0);
						return;
					}
					int cityId = fireBeaconCity.getCityId();
					FireBeaconModel fireBeaconModel = CrossFireBeaconSysCache.getPlayerMap(partId).get(hid);
					battleId = BattleNewSysCache.getBattleUid();
					BattleInfo info = new BattleInfo();
					info.setBattleId(battleId);
					info.setChaHid(hid);
					info.setGuardian(guardian);
					info.setTime(TimeDateUtil.getCurrentTime());
					int fight = fireBeaconModel.getFight();
					if (fight == 0) {
						long hpMax = hero.getFinalFightAttr().getHpMax();
						fireBeaconModel.setLeftHp(hpMax);
						hero.getFinalFightAttr().setHp(hpMax);
						long hudun = hero.getFinalFightAttr().getHudun();
						fireBeaconModel.setLeftHudun(hudun);
					}
					// 战斗处理
					boolean handleFinish = fightHandle(hid, guardian, info, partId);
					if (!handleFinish) {
						return;
					}
					FireBeaconModel gModel = CrossFireBeaconSysCache.getPlayerMap(partId).get(guardian);
					gModel.setFight(1);
					fireBeaconModel.setFight(1);
					battleMap.put(hid, battleId);
					battleMap.put(guardian, battleId);
					battleInfoMap = fireBeaconRoom.getBattleInfoMap();
					battleInfoMap.put(battleId, info);
					long leftHp = fireBeaconModel.getLeftHp();
					long leftHudun = fireBeaconModel.getLeftHudun();
					Hero gHero = HeroCache.getHero(guardian);
					long gLeftHp = gModel.getLeftHp();
					long gLeftHudun = gModel.getLeftHudun();
					info.setChaLeftHp(leftHp);
					info.setChaLeftHudun(leftHudun);
					info.setgLeftHp(gLeftHp);
					info.setgLeftHudun(gLeftHudun);
					boardBattleState(roomId, cityId, CrossFireBeaconConst.BATTLE_STATE, partId);
					BattleNewFunction.getIns().startPVPBattle(hero, gHero, SystemIdConst.CROSS_FIRE_BEACON,
							BttleTypeConst.FIREBEACON, leftHp, gLeftHp, leftHudun, gLeftHudun, battleId);
				} catch (Exception e) {
					if (battleMap != null) {
						battleMap.remove(hid);
						battleMap.remove(guardian);
					}
					if (battleInfoMap != null) {
						battleInfoMap.remove(battleId);
					}
					LogTool.error(e, CrossFireBeaconManager.class, hero.getId(), hero.getName(),
							"CrossFireBeaconManager occupyCityfight");
				}
			}

			@Override
			public Object getSession() {
				return roomId;
			}
		});
	}

	/** 战斗处理 */
	private boolean fightHandle(long hid, long guardian, BattleInfo info, int partId) {
		Map<Long, FireBeaconModel> playerMap = CrossFireBeaconSysCache.getPlayerMap(partId);
		FireBeaconModel cha = playerMap.get(hid);
		FireBeaconModel beCha = playerMap.get(guardian);
		Hero hero = HeroCache.getHero(hid);
		if (hero == null) {
			return false;
		}
		Hero gHero = HeroCache.getHero(guardian);
		if (gHero == null) {
			return false;
		}
		double damage = BattleFunction.calcDamg(hero.getFinalFightAttr(), gHero.getFinalFightAttr());
		double gDamage = BattleFunction.calcDamg(gHero.getFinalFightAttr(), hero.getFinalFightAttr());
		// 生存时间
		double time = (double) cha.getLeftHp() / gDamage;
		double gTime = (double) beCha.getLeftHp() / damage;
		long winner = guardian;
		long leftHp = 0;
		if (time < gTime) {
			leftHp = (long) (beCha.getLeftHp() - (damage * time));
		} else {
			winner = hid;
			leftHp = (long) (cha.getLeftHp() - (gDamage * gTime));
		}
		if (leftHp <= 0) {
			LogTool.info("CrossFireBeaconManager fightHandle, time="+time+", gTime="+gTime+", BLeft="+beCha.getLeftHp()+", cLeft="+cha.getLeftHp()+", damage="+damage+", gDamage="+gDamage, CrossFireBeaconManager.class);
			leftHp = RandomUtil.getRandomNumInAreas(100, 200);
		}
		info.setWinner(winner);
		info.setWinnerHp(leftHp);
		return true;
	}

	/**
	 * 战斗结束
	 * @param battleUid 战斗唯一id
	 */
	public void fightEnd(Hero hero, BattleNewInfo battleNewInfo, long winner, long winnerHp, long hudun) {
		if (hero == null) {
			return;
		}
		long battleUid = battleNewInfo.getBattleUid();
		long hid = hero.getId();
		long guardian = 0;
		ConcurrentHashMap<Long, Long> battleMap = null;
		ConcurrentHashMap<Long, BattleInfo> battleInfoMap = null;
		int gRoomId = 0;
		int gCityId = 0;
		int partId = CrossCache.getPartId(hero.getBelongZoneid());
		try {
			if (!CrossFireBeaconFunction.getIns().isOpen()) {
				return;
			}
			FireBeaconModel fireBeaconModel = CrossFireBeaconSysCache.getPlayerMap(partId).get(hid);
			int roomId = fireBeaconModel.getRoomId();
			gRoomId = roomId;
			FireBeaconRoom fireBeaconRoom = CrossFireBeaconSysCache.getRoomMap(partId).get(roomId);
			battleMap = fireBeaconRoom.getBattleMap();
			Long battleId = battleMap.get(hid);
			if (battleId == null) {
				return;
			}
			if (battleId.intValue() != battleUid) {
				return;
			}
			battleInfoMap = fireBeaconRoom.getBattleInfoMap();
			if (!battleInfoMap.containsKey(battleUid)) {
				return;
			}
			BattleInfo battleInfo = battleInfoMap.get(battleUid);
			guardian = battleInfo.getGuardian();
			Map<Long, FireBeaconModel> playerMap = CrossFireBeaconSysCache.getPlayerMap(partId);
			FireBeaconModel guardianModel = playerMap.get(guardian);
			gCityId = guardianModel.getCityId();
			int tempCityId = guardianModel.getCityId();
			FireBeaconModel chaModel = playerMap.get(battleInfo.getChaHid());
			FireBeaconModel gModel = playerMap.get(battleInfo.getGuardian());
			OpTaskExecutorService.PublicOrderService.execute(new CrossFireBeaconOpTaskRunnable() {
				
				@Override
				public void run() {
					ConcurrentHashMap<Long, BattleInfo> bInfoMap = null;
					long guardian2 = 0;
					long chaHid = 0;
					int cityId = 0;
					try {
						bInfoMap = fireBeaconRoom.getBattleInfoMap();
						if (!bInfoMap.containsKey(battleUid)) {
							return;
						}
						// BattleInfo battleInfo = bInfoMap.get(battleUid);
						bInfoMap.remove(battleUid);
						chaHid = battleInfo.getChaHid();
						guardian2 = battleInfo.getGuardian();
						// long winner = battleInfo.getWinner();
						// long winnerHp = battleInfo.getWinnerHp();

						cityId = gModel.getCityId();
						if(cityId == 0) {
							cityId = tempCityId;
						}
						int winScore = Config_xtcs_004.getIns().get(CrossFireBeaconConst.WIN_SCORE).getNum();
						int loseScore = Config_xtcs_004.getIns().get(CrossFireBeaconConst.LOSE_SCORE).getNum();
						long chaAddScore = 0;
						long beChaAddScore = 0;
						int currentTime = TimeDateUtil.getCurrentTime();
						long updateTime = TimeDateUtil.getCurrentTimeInMillis();
						// 判断胜利者
						if (chaHid == winner) {
							// 占领奖励，积分
							Struct_fhly_254 struct_fhly_254 = Config_fhly_254.getIns().get(cityId);
							int potion1 = struct_fhly_254.getPotion1();
							// 剩余血量
							chaModel.setLeftHp(winnerHp);
							chaModel.setLeftHudun(hudun);
							chaModel.addScore(winScore + potion1);
							chaModel.setUpdateTime(updateTime);
							chaAddScore = winScore + potion1;
							// 占领成功
							Hero gHero = HeroCache.getHero(guardian2);
							gModel.setGuardianState(false);
							gModel.setFight(0);
							gModel.setLeftHp(gHero.getFinalFightAttr().getHpMax());
							gModel.setLeftHudun(gHero.getFinalFightAttr().getHudun());
							gModel.addScore(loseScore);
							gModel.setUpdateTime(updateTime);
							gModel.setDeadTime(currentTime);
							beChaAddScore = loseScore;
							FireBeaconCity fireBeaconCity = fireBeaconRoom.getCitys().get(cityId);
							ConcurrentHashSet<Long> members = fireBeaconCity.getMembers();
							// 提示被抢
							Iterator<Long> iterator = members.iterator();
							for (; iterator.hasNext();) {
								long pid = iterator.next();
								CrossFireBeaconSender.sendCmd_3574(pid, 0, 4);
							}
							// 离开同步坐标
							flashMoveSyn(fireBeaconCity, fireBeaconRoom, gModel.getBelongType(), 0, partId, false);
							int[] bornPos = CrossFireBeaconFunction.getIns().getBornPos(gModel.getBelongType());
							gModel.setPosX(bornPos[0]);
							gModel.setPosY(bornPos[1]);
							Set<Long> showList = fireBeaconRoom.getShowList();
							if (showList.contains(guardian2)) {
								Set<Long> roomMembers = fireBeaconRoom.getMembers();
								// 需同步给场景中所有玩家
								for (long rid : roomMembers) {
									CrossFireBeaconSender.sendCmd_3564(rid, guardian2, CrossFireBeaconConst.FLASH_MOVE,
											bornPos[0], bornPos[1]);
								}
							} else {
								CrossFireBeaconSender.sendCmd_3564(guardian2, guardian2,
										CrossFireBeaconConst.FLASH_MOVE, bornPos[0], bornPos[1]);
							}
							// 设置新的守卫者
							members.clear();
							fireBeaconCity.setGuardian(chaHid);
							fireBeaconCity.setBelongType(chaModel.getBelongType());
							fireBeaconCity.setZoneId(chaModel.getBelongZoneid());
							chaModel.setCityId(cityId);
							chaModel.setGuardianState(true);
							chaModel.setOccupyTime(currentTime);
							chaModel.setLastAwardTime(currentTime);
							members.add(chaHid);
							// 广播
							if (fireBeaconCity.getType() == CrossFireBeaconConst.KING_CITY) {
								try {
									List<Integer> zoneBelong = fireBeaconRoom.getZoneBelong();
									CrossData crossData = new CrossData();
									crossData.putObject(CrossFireBeaconType.boardType.name(),
											ChatConst.FIREBEACON_KING);
									crossData.putObject(CrossFireBeaconType.params.name(),
											new Object[] { chaModel.getNameZoneid() });
									for (int zoneid : zoneBelong) {
										Channel channel = CrossCache.getChannel(zoneid);
										NettyWrite.writeXData(channel, CrossConst.FIREBEACON_GS_BOARD, crossData);
									}
								} catch (Exception e) {
									LogTool.error(e, CrossFireBeaconManager.class, "board ChatConst.FIREBEACON_KING");
								}
							}
							CrossFireBeaconSender.sendCmd_3588(guardian2, guardian2, 2);
							// 占领道具奖励
							try {
								CrossData crossData = new CrossData();
								crossData.putObject(CrossFireBeaconType.hid.name(), chaHid);
								crossData.putObject(CrossFireBeaconType.cityId.name(), cityId);
								Channel channel = CrossCache.getChannel(chaModel.getBelongZoneid());
								NettyWrite.writeXData(channel, CrossConst.FIREBEACON_GS_OCCUPY_AWARD, crossData);
							} catch (Exception e) {
								LogTool.error(e, CrossFireBeaconManager.class,
										"FIREBEACON_GS_OCCUPY_AWARD, hid=" + chaHid);
							}
						} else {
							Hero chaHero = HeroCache.getHero(chaHid);
							chaModel.setFight(0);
							chaModel.setLeftHp(chaHero.getFinalFightAttr().getHpMax());
							chaModel.setLeftHudun(chaHero.getFinalFightAttr().getHudun());
							chaModel.setDeadTime(currentTime);
							gModel.setLeftHp(winnerHp);
							gModel.setLeftHudun(hudun);
							gModel.addScore(winScore);
							gModel.setUpdateTime(updateTime);
							beChaAddScore = winScore;
							chaModel.addScore(loseScore);
							chaModel.setUpdateTime(updateTime);
							chaAddScore = loseScore;
							int[] bornPos = CrossFireBeaconFunction.getIns().getBornPos(chaModel.getBelongType());
							chaModel.setPosX(bornPos[0]);
							chaModel.setPosY(bornPos[1]);
							Set<Long> showList = fireBeaconRoom.getShowList();
							if (showList.contains(chaHid)) {
								Set<Long> roomMembers = fireBeaconRoom.getMembers();
								// 需同步给场景中所有玩家
								for (long rid : roomMembers) {
									CrossFireBeaconSender.sendCmd_3564(rid, chaHid, CrossFireBeaconConst.FLASH_MOVE,
											bornPos[0], bornPos[1]);
								}
							} else {
								CrossFireBeaconSender.sendCmd_3564(chaHid, chaHid, CrossFireBeaconConst.FLASH_MOVE,
										bornPos[0], bornPos[1]);
								// CrossFireBeaconSender.sendCmd_3564(guardian2, chaHid,
								// CrossFireBeaconConst.FLASH_MOVE,
								// bornPos[0], bornPos[1]);
							}
						}
						CrossFireBeaconSender.sendCmd_3584(chaHid, 1, chaModel.getScore(), 0, 0);
						CrossFireBeaconSender.sendCmd_3584(guardian2, 1, gModel.getScore(), 0, 0);
						// 刷新排行
						CrossFireBeaconFunction.getIns().refreshPersonalRank(chaModel, partId);
						CrossFireBeaconFunction.getIns().addServerScore(chaModel.getBelongZoneid(), chaAddScore, partId);
						CrossFireBeaconFunction.getIns().refreshPersonalRank(gModel, partId);
						CrossFireBeaconFunction.getIns().addServerScore(gModel.getBelongZoneid(), beChaAddScore, partId);
						CrossFireBeaconFunction.getIns().updateServerScore(chaModel.getRoomId(), hid, partId);
						CrossFireBeaconFunction.getIns().updateServerScore(chaModel.getRoomId(), chaHid, partId);
						ConcurrentHashMap<Long, Long> btMap = fireBeaconRoom.getBattleMap();
						btMap.remove(chaHid);
						btMap.remove(guardian2);
						bInfoMap.remove(battleUid);
						int cResult = 0;
						int gResult = 0;
						if (chaHid == winner) {
							refreshCity(chaHid, roomId, cityId, true, partId);
							gResult = 1;
						} else {
							refreshCity(chaHid, roomId, cityId, false, partId);
							cResult = 1;
						}
						CrossFireBeaconSender.sendCmd_3598(chaHid, cResult, 1, cityId);
						CrossFireBeaconSender.sendCmd_3598(guardian2, gResult, 2, cityId);
						boardBattleState(roomId, cityId, CrossFireBeaconConst.NOMAL_STATE, partId);
						// 刷新红点
						CrossFireBeaconFunction.getIns().updateRedPoint(HeroCache.getHero(chaHid));
						CrossFireBeaconFunction.getIns().updateRedPoint(HeroCache.getHero(guardian2));
						LogTool.info(chaHid, hero.getName(),
								"CrossFireBeaconManager fightEnd, chaHid=" + chaHid + ", guardian="
								+ guardian2 + ", battleUid=" + battleUid, CrossFireBeaconManager.class);
					} catch (Exception e) {
						ConcurrentHashMap<Long, Long> battleMap2 = fireBeaconRoom.getBattleMap();
						if (battleMap2 != null) {
							battleMap2.remove(chaHid);
							battleMap2.remove(guardian2);
						}
						if (bInfoMap != null) {
							bInfoMap.remove(battleUid);
						}
						if(cityId==0) {
							cityId = tempCityId;
						}
						boardBattleState(roomId, cityId, CrossFireBeaconConst.NOMAL_STATE, partId);
						LogTool.error(e, CrossFireBeaconManager.class, hero.getId(), hero.getName(),
								"CrossFireBeaconManager fightEnd handle");
					}
				}
				
				@Override
				public Object getSession() {
					return OpTaskConst.FIRE_BEACON_SCORE;
				}
			});
		} catch (Exception e) {
			if (battleMap != null) {
				battleMap.remove(hid);
				battleMap.remove(guardian);
			}
			if (battleInfoMap != null) {
				battleInfoMap.remove(battleUid);
			}
			boardBattleState(gRoomId, gCityId, CrossFireBeaconConst.NOMAL_STATE, partId);
			LogTool.error(e, CrossFireBeaconManager.class, hero.getId(), hero.getName(),
					"CrossFireBeaconManager fightEnd");
		}
	}

	/** 
	 * 离开占领都城闪电移动同步 
	 * 
	 * @param city 都城
	 * @param room 房间
	 * @param belongType 归属
	 * @param 
	 */
	public void flashMoveSyn(FireBeaconCity city, FireBeaconRoom room, byte belongType, long skipHid, int partId, boolean isMove) {
		Map<Long, FireBeaconModel> playerMap = CrossFireBeaconSysCache.getPlayerMap(partId);
		ConcurrentHashSet<Long> members = city.getMembers();
		CrossFireBeaconFunction crossFireBeaconFunction = CrossFireBeaconFunction.getIns();
		Set<Long> showList = room.getShowList();
		int[] bornPos = CrossFireBeaconFunction.getIns().getBornPos(belongType);
		Set<Long> roomMembers = room.getMembers();
		Iterator<Long> iterator = members.iterator();
		for (; iterator.hasNext();) {
			long id = iterator.next();
			if (id == skipHid) {
				continue;
			}
			FireBeaconModel loseModel = playerMap.get(id);
			// 处理最后一次征收
			Hero hero = HeroCache.getHero(id);
			if (hero == null) {
				continue;
			}
			crossFireBeaconFunction.levyHandle(hero, true);
			int px = bornPos[0];
			int py = bornPos[1];
			if(!isMove) {
				px = loseModel.getPosX();
				py = loseModel.getPosY();
			}
			loseModel.setPosX(px);
			loseModel.setPosY(py);
			if (showList.contains(id)) {
				// 需同步给场景中所有玩家
				for (long rid : roomMembers) {
					CrossFireBeaconSender.sendCmd_3564(rid, id, CrossFireBeaconConst.FLASH_MOVE, px,
							py);
				}
			} else {
				CrossFireBeaconSender.sendCmd_3564(id, id, CrossFireBeaconConst.FLASH_MOVE, px, py);
			}
		}
	}

	/**
	 * 
	 * @param hid
	 * @param roomId
	 * @param cityId
	 * @param isIn 是进入城池
	 */
	private void refreshCity(long hid, int roomId, int cityId, boolean isIn, int partId) {
		try {
			FireBeaconRoom fireBeaconRoom = CrossFireBeaconSysCache.getRoomMap(partId).get(roomId);
			FireBeaconCity city = fireBeaconRoom.getCitys().get(cityId);
			Iterator<Long> iterator = fireBeaconRoom.getMembers().iterator();
			ConcurrentHashSet<Long> showList = fireBeaconRoom.getShowList();

			byte belongType = city.getBelongType();
			long pid = city.getGuardian();
			String name = "";
			int icon = 0;
			int frame = 0;
			int percent = 0;
			if (pid != 0) {
				Hero hero = HeroCache.getHero(pid);
				name = hero.getNameZoneid();
				icon = hero.getIcon();
				frame = hero.getFrame();
				long hpMax = hero.getFinalFightAttr().getHpMax();
				FireBeaconModel fireBeaconModel = CrossFireBeaconSysCache.getPlayerMap(partId).get(pid);
				long leftHp = fireBeaconModel.getLeftHp();
				percent = (int) (leftHp * 100 / hpMax);
			}
			int num = city.getMembers().size();
			for (; iterator.hasNext();) {
				long id = iterator.next();
				// 战斗结束刷新都城信息 I:都城idB:归属L:守城玩家idU:玩家名I:头像I:头像框B:征收玩家数量L:剩余血量百分比
				CrossFireBeaconSender.sendCmd_3568(id, cityId, belongType, pid, name, icon, frame, num, percent);
				if (isIn) {
					// 通知房间其他玩家，hid玩家入城模型消失
					if (showList.contains(hid)) {
						CrossFireBeaconSender.sendCmd_3588(id, hid, 1);
					}
					if (id == hid) {
						CrossFireBeaconSender.sendCmd_3588(id, hid, 1);
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, CrossFireBeaconManager.class, hid, "", "CrossFireBeaconManager refreshCity");
		}
	}

	public void boardBattleState(int roomId, int cityId, int state, int partId) {
		try {
			FireBeaconRoom fireBeaconRoom = CrossFireBeaconSysCache.getRoomMap(partId).get(roomId);
			Iterator<Long> iterator = fireBeaconRoom.getMembers().iterator();
			for (; iterator.hasNext();) {
				long id = iterator.next();
				CrossFireBeaconSender.sendCmd_3586(id, cityId, state);
			}
		} catch (Exception e) {
			LogTool.error(e, CrossFireBeaconManager.class, "CrossFireBeaconManager boardBattleState");
		}
	}

	/**
	 * 元宝复活
	 * 
	 * @param hero
	 */
	public void revive(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!CrossZone.isCrossServer()) {
				return;
			}
			if (!CrossFireBeaconFunction.getIns().isOpen()) {
				return;
			}
			int partId = CrossCache.getPartId(hero.getBelongZoneid());
			FireBeaconModel fireBeaconModel = CrossFireBeaconSysCache.getPlayerMap(partId).get(hid);
			int deadTime = fireBeaconModel.getDeadTime();
			if (deadTime == 0) {
				return;
			}
			int currentTime = TimeDateUtil.getCurrentTime();
			int passTime = currentTime - deadTime;
			int timeLimit = Config_xtcs_004.getIns().get(CrossFireBeaconConst.REBORN).getNum();
			if (passTime >= timeLimit) {
				fireBeaconModel.setDeadTime(0);
				CrossFireBeaconSender.sendCmd_3592(hid, 0, 1);
				return;
			}
			int cost = Config_xtcs_004.getIns().get(CrossFireBeaconConst.REBORN_COST).getNum();
			if (!UseAddUtil.canUse(hero, GameConst.YUANBAO, cost)) {
				CrossFireBeaconSender.sendCmd_3592(hid, 0, 2);
				return;
			}
			UseAddUtil.use(hero, GameConst.YUANBAO, cost, SourceGoodConst.FIREBEACON_REVIVE, true);
			fireBeaconModel.setDeadTime(0);
			CrossFireBeaconSender.sendCmd_3592(hid, 1, 0);
		} catch (Exception e) {
			LogTool.error(e, CrossFireBeaconManager.class, hid, hero.getName(), "CrossFireBeaconManager revive");
		}
	}

	/**
	 * 征收
	 */
	public void levy(Hero hero, int cityId) {
		if (hero == null) {
			return;
		}
		try {
			if (!CrossZone.isCrossServer()) {
				return;
			}
			if (!CrossFireBeaconFunction.getIns().isOpen()) {
				return;
			}
			long hid = hero.getId();
			int partId = CrossCache.getPartId(hero.getBelongZoneid());
			FireBeaconModel fireBeaconModel = CrossFireBeaconSysCache.getPlayerMap(partId).get(hid);
			if (fireBeaconModel.getCityId() > 0) {
				return;
			}
			int roomId = fireBeaconModel.getRoomId();
			FireBeaconRoom fireBeaconRoom = CrossFireBeaconSysCache.getRoomMap(partId).get(roomId);
			ConcurrentHashMap<Long, Long> battleMap = fireBeaconRoom.getBattleMap();
			if (battleMap.containsKey(hid)) {
				// 自己在战斗中
				return;
			}
			FireBeaconCity city = fireBeaconRoom.getCitys().get(cityId);
			if (city.getBelongType() != fireBeaconModel.getBelongType()) {
				if (city.getType() == CrossFireBeaconConst.GUARDIAN_CITY) {
					// 敌方卫城不可征收
					CrossFireBeaconSender.sendCmd_3574(hid, 0, 1);
				} else {
					// 未占领此城
					CrossFireBeaconSender.sendCmd_3574(hid, 0, 2);
				}
				return;
			}
			ConcurrentHashSet<Long> members = city.getMembers();
			OpTaskExecutorService.PublicOrderService.execute(new CrossFireBeaconOpTaskRunnable() {

				@Override
				public void run() {
					try {
						int size = members.size();
						Struct_fhly_254 struct_fhly_254 = Config_fhly_254.getIns().get(cityId);
						int num = struct_fhly_254.getNum();
						if (size >= num) {
							CrossFireBeaconSender.sendCmd_3574(hid, 0, 3);
							return;
						}
						fireBeaconModel.setCityId(cityId);
						// if (city.getType() != CrossFireBeaconConst.GUARDIAN_CITY && size == 0
						// && city.getGuardian() == 0) {
						// fireBeaconModel.setGuardian(true);
						// city.setGuardian(hid);
						// }
						int currentTime = TimeDateUtil.getCurrentTime();
						fireBeaconModel.setOccupyTime(currentTime);
						fireBeaconModel.setLastAwardTime(currentTime);
						members.add(hid);
						CrossFireBeaconSender.sendCmd_3574(hid, 1, 0);
						refreshCity(hid, roomId, cityId, true, partId);
					} catch (Exception e) {
						LogTool.error(e, CrossFireBeaconManager.class, hid, hero.getNameZoneid(),
								"CrossFireBeaconManager levy");
					}
				}

				@Override
				public Object getSession() {
					return OpTaskConst.FIRE_BEACON_OCCUPY_CITY;
				}
			});
		} catch (Exception e) {
			LogTool.error(e, CrossFireBeaconManager.class, hero.getId(), hero.getName(), "CrossFireBeaconManager");
		}
	}

	/**
	 * 返回积分奖励领取状态
	 */
	public void getScoreAwardList(Hero hero) {
		if (hero == null) {
			return;
		}
		try {
			if (CrossZone.isCrossServer()) {
				return;
			}
			if (!CrossFireBeaconFunction.getIns().isOpen()) {
				return;
			}
			long hid = hero.getId();
			FireBeacon fireBeacon = hero.getFireBeacon();
			Set<Integer> alreadyGet = fireBeacon.getAlreadyGet();
			// FireBeaconModel fireBeaconModel =
			// CrossFireBeaconSysCache.getPlayerMap().get(hid);
			// int roomId = fireBeaconModel.getRoomId();
			// FireBeaconRoom fireBeaconRoom =
			// CrossFireBeaconSysCache.getRoomMap().get(roomId);
			// ConcurrentHashMap<Long, Integer> battleMap = fireBeaconRoom.getBattleMap();
			// if (battleMap.containsKey(hid)) {
			// // 自己在战斗中
			// return;
			// }
			List<Object[]> stateData = new ArrayList<>();
			Iterator<Integer> iterator = alreadyGet.iterator();
			for (; iterator.hasNext();) {
				int id = iterator.next();
				stateData.add(new Object[] { id });
			}
			CrossFireBeaconSender.sendCmd_3572(hid, stateData.toArray());
		} catch (Exception e) {
			LogTool.error(e, CrossFireBeaconManager.class, hero.getId(), hero.getName(), "CrossFireBeaconManager");
		}
	}

	/**
	 * 领取积分奖励
	 * @param hero
	 */
	public void getScoreAward(Hero hero, int aid) {
		if (hero == null) {
			return;
		}
		try {
			if (CrossZone.isCrossServer()) {
				return;
			}
			if (!CrossFireBeaconFunction.getIns().isOpen()) {
				return;
			}
			long hid = hero.getId();
			FireBeacon fireBeacon = hero.getFireBeacon();
			Set<Integer> alreadyGet = fireBeacon.getAlreadyGet();
			if (alreadyGet.contains(aid)) {
				// 已领取
				CrossFireBeaconSender.sendCmd_3570(hid, 0, 1);
				return;
			}
			Map<Integer, Struct_fhlypotion_254> map = Config_fhlypotion_254.getIns().getMap();
			if (!map.keySet().contains(aid)) {
				CrossFireBeaconSender.sendCmd_3570(hid, 0, 2);
				return;
			}
			CrossData crossData = new CrossData();
			crossData.putObject(CrossFireBeaconType.hid.name(), hid);
			Channel crossChannel = Client_2.getIns().getCrossChannel();
			NettyWrite.writeXData(crossChannel, CrossConst.FIREBEACON_SG_GET_SCORE, crossData, new Callback() {

				@Override
				public void dataReci(Channel channel, CrossData crossData) {
					long score = crossData.getObject(CrossFireBeaconType.score.name(), Long.class);
					crossData.finishGet();
					if (score == 0) {
						return;
					}
					fireBeacon.setScore(score);
					Struct_fhlypotion_254 struct_fhlypotion_254 = map.get(aid);
					if (score >= struct_fhlypotion_254.getPotion()) {
						alreadyGet.add(aid);
						int[][] reward = struct_fhlypotion_254.getReward();
						UseAddUtil.add(hero, reward, SourceGoodConst.FIREBEACON_SCORE_AWARD,
								UseAddUtil.getDefaultMail(), true);
						CrossFireBeaconSender.sendCmd_3570(hid, 1, aid);
						LogTool.info(hid, hero.getName(), "CrossFireBeaconManager getScoreAward success",
								CrossFireBeaconManager.class);
						Set<Integer> tempGet = new HashSet<>(alreadyGet);
						crossData.putObject(CrossFireBeaconType.hid.name(), hid);
						crossData.putObject(CrossFireBeaconType.getAward.name(), tempGet);
						NettyWrite.writeXData(crossChannel, CrossConst.FIREBEACON_SG_SCOREAWARD_UPDATE, crossData);
					} else {
						CrossFireBeaconSender.sendCmd_3570(hid, 0, 3);
					}
				}
			});
		} catch (Exception e) {
			LogTool.error(e, CrossFireBeaconManager.class, hero.getId(), hero.getName(),
					"CrossFireBeaconManager getScoreAward");
		}
	}

	/**
	 * 请求完成一次征收积分
	 */
	public void calculateScore(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = 0;
		try {
			if (!CrossZone.isCrossServer()) {
				return;
			}
			if (!CrossFireBeaconFunction.getIns().isOpen()) {
				CrossFireBeaconSender.sendCmd_3558(hid, 0, 3, 0);
				return;
			}
			// 征收
			CrossFireBeaconFunction.getIns().levyHandle(hero, false);
		} catch (Exception e) {
			LogTool.error(e, CrossFireBeaconManager.class, hero.getId(), hero.getName(),
					"CrossFireBeaconManager calculateScore");
		}
	}

}
