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
import com.teamtop.cross.CrossEnum;
import com.teamtop.cross.CrossZone;
import com.teamtop.cross.connEvent.AbsCrossLoginEvent;
import com.teamtop.cross.connEvent.CrossSelectRoom;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.HeroOpTaskRunnable;
import com.teamtop.system.battleNew.BattleNewSysCache;
import com.teamtop.system.battleNew.model.BattleNewInfo;
import com.teamtop.system.crossFireBeacon.cross.CrossFireBeaconType;
import com.teamtop.system.crossFireBeacon.model.BattleInfo;
import com.teamtop.system.crossFireBeacon.model.FireBeaconCity;
import com.teamtop.system.crossFireBeacon.model.FireBeaconModel;
import com.teamtop.system.crossFireBeacon.model.FireBeaconRoom;
import com.teamtop.system.crossFireBeacon.model.FireBeaconServer;
import com.teamtop.system.event.backstage.events.flowHero.FlowHeroEvent;
import com.teamtop.system.godWeapon.GodWeaponFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mount.MountFunction;
import com.teamtop.util.common.ConcurrentHashSet;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import io.netty.channel.Channel;

public class FireBeaconCrossLoginEvent extends AbsCrossLoginEvent {

	private static FireBeaconCrossLoginEvent ins;

	private FireBeaconCrossLoginEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized FireBeaconCrossLoginEvent getIns() {
		if (ins == null) {
			ins = new FireBeaconCrossLoginEvent();
		}
		return ins;
	}

	@Override
	public Channel localAsk(Hero hero, int type, List<Object[]> param) {
		param.add(new Object[] { GameProperties.getFirstZoneId() });
		return Client_2.getIns().getCrossChannel();
	}

	@Override
	public CrossSelectRoom crossSelectRoom(int type, String param) {
		return new CrossSelectRoom(1, GameProperties.cross_domainName_2, GameProperties.serverPort);
	}

	@Override
	public void crossAfterLoginSucc(Hero hero, int crossLoginRoomId) {
		try {
			long hid = hero.getId();
			int partId = CrossCache.getPartId(hero.getBelongZoneid());
			Map<Long, FireBeaconModel> playerMap = CrossFireBeaconSysCache.getPlayerMap(partId);
			FireBeaconModel myFbModel = playerMap.get(hid);
			int roomId = myFbModel.getRoomId();
			FireBeaconRoom fireBeaconRoom = CrossFireBeaconSysCache.getRoomMap(partId).get(roomId);
			ConcurrentHashMap<Long, Long> battleMap = fireBeaconRoom.getBattleMap();
			// 发送都城数据
			List<Object[]> citysList = new ArrayList<>();
			Map<Integer, FireBeaconCity> citys = fireBeaconRoom.getCitys();
			Iterator<FireBeaconCity> iterator = citys.values().iterator();
			FireBeaconCity city = null;
			int icon = 0;
			int frame = 0;
			String name = "";
			int num = 0;
			int percent = 0;
			int state = CrossFireBeaconConst.NOMAL_STATE;
			for (; iterator.hasNext();) {
				state = CrossFireBeaconConst.NOMAL_STATE;
				city = iterator.next();
				long guardian = city.getGuardian();
				Hero gHero = HeroCache.getHero(guardian);
				num = city.getMembers().size();
				if (gHero != null) {
					icon = gHero.getIcon();
					frame = gHero.getFrame();
					name = gHero.getNameZoneid();
					FireBeaconModel model = playerMap.get(guardian);
					percent = (int) (model.getLeftHp() * 100 / gHero.getFinalFightAttr().getHpMax());
					if (battleMap.keySet().contains(guardian)) {
						state = CrossFireBeaconConst.BATTLE_STATE;
					}
				} else {
					city.setGuardian(0);
					guardian = 0;
					icon = 0;
					frame = 0;
					name = "";
				}
				// 刷新所有都城信息 [I:都城idB:归属 1蓝，2红L:守卫者idU:名字I:头像I:头像框B:征收玩家数量]都城信息
				citysList.add(new Object[] { city.getCityId(), city.getBelongType(), guardian, name, icon, frame, num,
						percent, state });
			}
			CrossFireBeaconSender.sendCmd_3578(hid, citysList.toArray());
			// 显示玩家
			ConcurrentHashSet<Long> showSet = fireBeaconRoom.getShowList();
			List<Long> showList = new ArrayList<>(showSet);
			long sid = 0L;
			List<Object[]> sendList = new ArrayList<>();
			int size = showList.size();
			FireBeaconModel fbModel = null;
			HeroFunction heroFunction = HeroFunction.getIns();
			for (int i = 0; i < size; i++) {
				sid = showList.get(i);
				if (!heroFunction.isOnline(sid)) {
					continue;
				}
				if (sid == hid) {
					continue;
				}
				Hero player = HeroCache.getHero(sid);
				int speed = MountFunction.getIns().getSpeed(player);
				fbModel = playerMap.get(sid);
				sendList.add(new Object[] { sid, player.getNameZoneid(), player.getJob(),GodWeaponFunction.getIns().getNowGodWeapon(player), fbModel.getBelongType(),
						player.getIcon(), player.getFrame(), fbModel.getPosX(), fbModel.getPosY(),
						fbModel.getCityId() > 0 ? 1 : 0 ,player.getMountId(),speed});
			}
			int speed = MountFunction.getIns().getSpeed(hero);
			sendList.add(new Object[] { hid, hero.getNameZoneid(), hero.getJob(),GodWeaponFunction.getIns().getNowGodWeapon(hero), myFbModel.getBelongType(),
					hero.getIcon(), hero.getFrame(), myFbModel.getPosX(), myFbModel.getPosY(),
					myFbModel.getCityId() > 0 ? 1 : 0 ,hero.getMountId(),speed});
			// [L:玩家idU:玩家名B:职业B:归属I:头像I:头像框I:坐标XI:坐标Y]显示的玩家数据
			CrossFireBeaconSender.sendCmd_3580(hid, sendList.toArray());
 
			// ---------------------
			TreeSet<FireBeaconModel> personalRankList = fireBeaconRoom.getPersonalRankList();
			if (showSet.size() < CrossFireBeaconConst.SHOW_NUM) {
				showSet.add(hid);
				List<Long> sendShowList = new ArrayList<>(showSet);
				List<Object[]> tSendList = new ArrayList<>();
				int showSize = sendShowList.size();
				for (int i = 0; i < showSize; i++) {
					sid = sendShowList.get(i);
					if (!heroFunction.isOnline(sid)) {
						continue;
					}
					Hero player = HeroCache.getHero(sid);
					fbModel = playerMap.get(sid);
					speed = MountFunction.getIns().getSpeed(player);
					tSendList.add(new Object[] { sid, player.getNameZoneid(), player.getJob(), GodWeaponFunction.getIns().getNowGodWeapon(player), fbModel.getBelongType(),
							player.getIcon(), player.getFrame(), fbModel.getPosX(), fbModel.getPosY(),
							fbModel.getCityId() > 0 ? 1 : 0, player.getMountId(), speed });
				}
				Set<Long> members = fireBeaconRoom.getMembers();
				Iterator<Long> mIterator = members.iterator();
				for (; mIterator.hasNext();) {
					long mid = mIterator.next();
					if (!heroFunction.isOnline(mid)) {
						continue;
					}
					if (mid == hid) {
						continue;
					}
					CrossFireBeaconSender.sendCmd_3580(mid, tSendList.toArray());
				}
			}

			// -----------------------
			// 个人活动数据
			List<Integer> zoneBelong = fireBeaconRoom.getZoneBelong();
			Map<Integer, FireBeaconServer> zoneDataMap = CrossFireBeaconSysCache.getZoneDataMap(partId);
			int zoneidA = zoneBelong.get(0);
			FireBeaconServer fireBeaconServerA = zoneDataMap.get(zoneidA);
			int belongTypeA = fireBeaconServerA.getBelongType();
			long totalScoreA = fireBeaconServerA.getTotalScore();
			int zoneidB = 0;
			int belongTypeB = 0;
			long totalScoreB = 0;
			if (zoneBelong.size() > 1) {
				zoneidB = zoneBelong.get(1);
				FireBeaconServer fireBeaconServerB = zoneDataMap.get(zoneidB);
				belongTypeB = fireBeaconServerB.getBelongType();
				totalScoreB = fireBeaconServerB.getTotalScore();
			}
			int zoneidC = 0;
			int belongTypeC = 0;
			long totalScoreC = 0;
			if (zoneBelong.size() > 2) {
				zoneidC = zoneBelong.get(2);
				FireBeaconServer fireBeaconServerC = zoneDataMap.get(zoneidC);
				belongTypeC = fireBeaconServerC.getBelongType();
				totalScoreC = fireBeaconServerC.getTotalScore();
			}
			byte belongType = myFbModel.getBelongType();
			long score = myFbModel.getScore();
			int currentTime = TimeDateUtil.getCurrentTime();
			int leftTime = CrossFireBeaconSysCache.getEndTime() - currentTime;
			if (leftTime < 0) {
				leftTime = 0;
			}
			CrossFireBeaconSender.sendCmd_3582(hid, roomId, zoneidA, belongTypeA, totalScoreA, zoneidB, belongTypeB,
					totalScoreB, zoneidC, belongTypeC, totalScoreC, score, belongType, leftTime);
			CrossFireBeaconFunction.getIns().updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, FireBeaconCrossLoginEvent.class, hero.getId(), hero.getNameZoneid(), "FireBeaconCrossLoginEvent crossAfterLoginSucc");
		}
	}

	@Override
	public void crossLogout(Hero hero, CrossData crossData) {
		if (!CrossZone.isCrossServer()) {
			return;
		}
		long hid = hero.getId();
		int partId = CrossCache.getPartId(hero.getBelongZoneid());
		FireBeaconModel myFbModel = CrossFireBeaconSysCache.getPlayerMap(partId).get(hid);
		int roomId = myFbModel.getRoomId();
		FireBeaconRoom fireBeaconRoom = CrossFireBeaconSysCache.getRoomMap(partId).get(roomId);
		ConcurrentHashMap<Long, Long> battleMap = fireBeaconRoom.getBattleMap();
		if (battleMap.containsKey(hid)) {
			long battleUid = battleMap.get(hid);
			OpTaskExecutorService.DefaultService.execute(new HeroOpTaskRunnable() {

				@Override
				public void run() {
					BattleInfo battleInfo = fireBeaconRoom.getBattleInfoMap().get(battleUid);
					if(battleInfo!=null) {						
						long guardian = battleInfo.getGuardian();
						long gLeftHp = battleInfo.getgLeftHp();
						long winner = guardian;
						long winnerHp = gLeftHp;
						long hudun = battleInfo.getgLeftHudun();
						if (hid == guardian) {
							winner = battleInfo.getChaHid();
							winnerHp = battleInfo.getChaLeftHp();
							hudun = battleInfo.getChaLeftHudun();
						}
						BattleNewInfo battleNewInfo = BattleNewSysCache.getBattleMap().get(battleUid);
						if(battleNewInfo!=null){						
							CrossFireBeaconManager.getIns().fightEnd(hero, battleNewInfo, winner, winnerHp, hudun);
						}
					}
					CrossFireBeaconManager.getIns().leave(hero, true);
				}

				@Override
				public Object getSession() {
					return hid;
				}
			});
		} else {
			CrossFireBeaconManager.getIns().leave(hero, true);
		}
	}

	@Override
	public CrossData crossAfterReciSucc(Hero hero, Channel channel, Object[] crossLoginParam, CrossData crossData) {
		try {
			// 初始化玩家个人活动数据
			Object[] zoneIdStr = crossData.getObject(CrossEnum.crossLoginParam.name(), Object[].class);
			int zoneId = (Integer) (zoneIdStr[0]);
			long hid = hero.getId();
			int partId = CrossCache.getPartId(zoneId);
			FireBeaconServer fireBeaconServer = CrossFireBeaconSysCache.getZoneDataMap(partId).get(zoneId);
			Map<Long, FireBeaconModel> playerMap = CrossFireBeaconSysCache.getPlayerMap(partId);
			int roomId = fireBeaconServer.getRoomId();
			if (!playerMap.containsKey(hid)) {
				fireBeaconServer.getMembers().add(hid);
				FireBeaconModel model = CrossFireBeaconFunction.getIns().createFireBeaconModel(roomId, zoneId, hero, partId);
				playerMap.put(hid, model);
			} else {
				FireBeaconModel model = playerMap.get(hid);
				CrossFireBeaconFunction.getIns().resetFireBeaconModel(hero, model);
			}
			Map<Integer, FireBeaconRoom> roomMap = CrossFireBeaconSysCache.getRoomMap(partId);
			FireBeaconRoom fireBeaconRoom = roomMap.get(roomId);
			Set<Long> members = fireBeaconRoom.getMembers();
			members.add(hid);
			crossData.finishGet();
		} catch (Exception e) {
			LogTool.error(e, FireBeaconCrossLoginEvent.class, hero.getId(), hero.getNameZoneid(),
					"FireBeaconCrossLoginEvent crossAfterReciSucc");
		}
		return super.crossAfterReciSucc(hero, channel, crossLoginParam, crossData);
	}

	@Override
	public void localAfterUploadSucc(Hero hero, Channel channel, Object[] crossLoginParam, CrossData crossData) {
		// 进入成功
		CrossFireBeaconSender.sendCmd_3558(hero.getId(), 1, 0, 0);
		Set<Integer> alreadyGet = hero.getFireBeacon().getAlreadyGet();
		Set<Integer> tempGet = new HashSet<>(alreadyGet);
		crossData.putObject(CrossFireBeaconType.hid.name(), hero.getId());
		crossData.putObject(CrossFireBeaconType.getAward.name(), tempGet);
		NettyWrite.writeXData(channel, CrossConst.FIREBEACON_SG_SCOREAWARD_UPDATE, crossData);
		String usesys = hero.getTempData().getAccount().getUsesys();
		FlowHeroEvent.addJoinSystemFlow(hero.getId(), hero.getLevel(), hero.getVipLv(), hero.getCreateJob(),
				hero.getTotalStrength(), SystemIdConst.CROSS_FIRE_BEACON, hero.getZoneid(), hero.getPf(), usesys,
				hero.getReincarnationLevel());
	}

}
