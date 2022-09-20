package com.teamtop.system.crossFireBeacon;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.TreeSet;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossZone;
import com.teamtop.houtaiHttp.events.crossActivitySwitch.CrossActivitySwitchCache;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.crossFireBeacon.cross.CrossFireBeaconComparetor;
import com.teamtop.system.crossFireBeacon.cross.CrossFireBeaconType;
import com.teamtop.system.crossFireBeacon.model.FireBeaconModel;
import com.teamtop.system.crossFireBeacon.model.FireBeaconRoom;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.godWeapon.GodWeapon;
import com.teamtop.system.godWeapon.GodWeaponFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mount.MountFunction;
import com.teamtop.util.ProbabilityEvent.RandomUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import io.netty.channel.Channel;

public class CrossFireBeaconSysEvent extends AbsSystemEvent {

	private static CrossFireBeaconSysEvent ins;

	private CrossFireBeaconSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static CrossFireBeaconSysEvent getIns() {
		if (ins == null) {
			ins = new CrossFireBeaconSysEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {

	}

	@Override
	public void login(Hero hero) {

	}

	@Override
	public void fixTime(int cmdId, int now) {
		if (!CrossZone.isCrossServer()) {
			return;
		}
		int week = TimeDateUtil.getWeek();
		if (!CrossFireBeaconSysCache.openDays.contains(week)) {
			return;
		}
		if (!CrossActivitySwitchCache.checkCrossOpen(SystemIdConst.CROSS_FIRE_BEACON)) {
			return;
		}
		if (cmdId == 1) {
			// 活动准备期
			LogTool.info("CrossFireBeacon readyHandel start", CrossFireBeaconSysEvent.class);
			CrossFireBeaconSysCache.roomIdCreator.set(1);
			Set<Integer> keySet = CrossFireBeaconSysCache.getFireBeaconCacheMap().keySet();
			for(int partId : keySet) {				
				try {
					CrossFireBeaconSysCache.getPlayerMap(partId).clear();
					CrossFireBeaconSysCache.getZoneDataMap(partId).clear();
					CrossFireBeaconSysCache.getRoomMap(partId).clear();

					// 新规则
//					matchRoom(partId);
					
					// 完全随机匹配
					TreeSet<Integer> zoneIdSet = CrossFireBeaconSysCache.getZoneIds(partId);
					LogTool.info("CrossFireBeacon match start, zoneIdSet size = " + zoneIdSet.size()+", partId="+partId, this);
					List<Integer> groupList = new ArrayList<>(zoneIdSet);
					List<Integer> leftList = new ArrayList<>();
					groupListMatch(groupList, leftList, true, partId);
					LogTool.info("CrossFireBeacon match end, leftList size = " + leftList.size(), this);
				} catch (Exception e) {
					LogTool.error(e, CrossFireBeaconSysEvent.class, "CrossFireBeaconSysEvent ready partId=" + partId);
				}
			}
			// 进行随机分组
//			CrossFireBeaconSysCache.roomIdCreator.set(1);
//			TreeSet<Integer> zoneIdSet = CrossFireBeaconSysCache.getZoneIds();
//			Iterator<Integer> zIteratore = zoneIdSet.iterator();
//			List<List<Integer>> partList = new ArrayList<>();
//			List<Integer> groupList = new ArrayList<>();
//			for (; zIteratore.hasNext();) {
//				int zoneId = zIteratore.next();
//				groupList.add(zoneId);
//				Long strength = CrossFireBeaconSysCache.getZoneIdStrength().get(zoneId);
//				if(strength==null) {
//					strength = 0L;
//				}
//				LogTool.info("chooseZoneId=="+zoneId+", strength="+strength, CrossFireBeaconSysEvent.class);
//				if (groupList.size() == CrossFireBeaconConst.PART_NUM) {
//					List<Integer> glist = new ArrayList<>(groupList);
//					partList.add(glist);
//					groupList.clear();
//				}
//			}
//			if (groupList.size() > 0) {
//				partList.add(groupList);
//			}
//			int size = partList.size();
//			int roomId = CrossFireBeaconSysCache.roomIdCreator.getAndIncrement();
//			Map<Integer, FireBeaconRoom> roomMap = CrossFireBeaconSysCache.getRoomMap();
//			roomMap.clear();
//			CrossFireBeaconComparetor comparetor = new CrossFireBeaconComparetor();
//			for (int i = 0; i < size; i++) {
//				List<Integer> randomList = partList.get(i);
//				Collections.sort(randomList, comparetor);
//				int totalSize = randomList.size();
//				for (int j = 0; j < totalSize; j++) {
//					int randomSize = randomList.size();
//					// int random = RandomUtil.getRandomNumInAreas(0, randomSize - 1);
//					// int chooseZoneId = randomList.remove(random);
//					int chooseZoneId = randomList.remove(randomSize - 1);
//					LogTool.info("chooseZoneId=="+chooseZoneId+", randomSize="+randomSize, CrossFireBeaconSysEvent.class);
//					FireBeaconRoom fireBeaconRoom = roomMap.get(roomId);
//					if (fireBeaconRoom == null) {
//						fireBeaconRoom = new FireBeaconRoom();
//						fireBeaconRoom.setRoomId(roomId);
//						roomMap.put(roomId, fireBeaconRoom);
//					}
//					List<Integer> zoneBelong = fireBeaconRoom.getZoneBelong();
//					int zbSize = zoneBelong.size();
//					if (zbSize < CrossFireBeaconConst.FIGHT_SIDES) {
//						zoneBelong.add(chooseZoneId);
//					}
//					if (zoneBelong.size() == CrossFireBeaconConst.FIGHT_SIDES) {
//						// 初始化房间数据
//						CrossFireBeaconFunction.getIns().initRoomData(fireBeaconRoom);
//						roomId = CrossFireBeaconSysCache.roomIdCreator.getAndIncrement();
//					}
//					if (j == (totalSize - 1) && zoneBelong.size() < CrossFireBeaconConst.FIGHT_SIDES) {
//						// 轮空处理
//						CrossFireBeaconFunction.getIns().initRoomData(fireBeaconRoom);
//						// roomId = CrossFireBeaconSysCache.roomIdCreator.getAndIncrement();
//					}
//				}
//			}
//			LogTool.info("CrossFireBeacon readyHandel end roomId=" + roomId, CrossFireBeaconSysEvent.class);
		} else if (cmdId == 2) {
			// 活动开启
			LogTool.info("CrossFireBeacon act start", CrossFireBeaconSysEvent.class);
			CrossFireBeaconSysCache.FireBeaconState = CrossFireBeaconConst.FB_OPEN;
			Set<Integer> keySet = CrossFireBeaconSysCache.getFireBeaconCacheMap().keySet();
			for (int partId : keySet) {
				try {
					CrossFireBeaconSysCache.getFireBeaconCache(partId).setFireBeaconState(CrossFireBeaconConst.FB_OPEN);
					// 通知子服广播
					CrossData crossData = new CrossData();
					crossData.putObject(CrossFireBeaconType.boardType.name(), ChatConst.FIREBEACON_START);
					crossData.putObject(CrossFireBeaconType.params.name(), new Object[] {});
					Set<Integer> zoneSet = CrossFireBeaconSysCache.getZoneDataMap(partId).keySet();
					Iterator<Integer> iterator = zoneSet.iterator();
					for (; iterator.hasNext();) {
						int zoneId = iterator.next();
						Channel channel = CrossCache.getChannel(zoneId);
						NettyWrite.writeXData(channel, CrossConst.FIREBEACON_GS_BOARD, crossData);
					}
					LogTool.info("CrossFireBeacon act start finish, partId=" + partId, CrossFireBeaconSysEvent.class);
				} catch (Exception e) {
					LogTool.error(e, CrossFireBeaconSysEvent.class, "CrossFireBeacon act start partId=" + partId);
				}
			}
			LogTool.info("CrossFireBeacon act start finish", CrossFireBeaconSysEvent.class);
		} else if (cmdId == 3) {
			// 活动结束
			LogTool.info("CrossFireBeacon act end", CrossFireBeaconSysEvent.class);
			CrossFireBeaconSysCache.FireBeaconState = CrossFireBeaconConst.FB_CLOSE;
			Set<Integer> keySet = CrossFireBeaconSysCache.getFireBeaconCacheMap().keySet();
			for (int partId : keySet) {
				try {
					CrossFireBeaconSysCache.getFireBeaconCache(partId).setFireBeaconState(CrossFireBeaconConst.FB_CLOSE);
					// 奖励发放
					CrossFireBeaconFunction.getIns().sendRankAward(partId);
					// 玩家退出
					CrossFireBeaconFunction.getIns().disconnetFromCross();
					CrossFireBeaconSysCache.getZoneIds(partId).clear();
					LogTool.info("CrossFireBeacon act end finish", CrossFireBeaconSysEvent.class);
				} catch (Exception e) {
					LogTool.error(e, CrossFireBeaconSysEvent.class, "CrossFireBeacon act end partId=" + partId);
				}
			}
			LogTool.info("CrossFireBeacon act end finish", CrossFireBeaconSysEvent.class);
		} else if (cmdId == 5) {
			// 活动期间定时检测 征收、战斗
			if (CrossFireBeaconSysCache.FireBeaconState != CrossFireBeaconConst.FB_OPEN) {
				return;
			}
			Set<Integer> keySet = CrossFireBeaconSysCache.getFireBeaconCacheMap().keySet();
			for (int partId : keySet) {
				try {
					Map<Integer, FireBeaconRoom> roomMap = CrossFireBeaconSysCache.getRoomMap(partId);
					Iterator<FireBeaconRoom> iterator = roomMap.values().iterator();
					FireBeaconRoom fireBeaconRoom = null;
					Hero hero = null;
					long hid = 0;
					for (; iterator.hasNext();) {
						fireBeaconRoom = iterator.next();
						Set<Long> members = new HashSet<>(fireBeaconRoom.getMembers());
						Iterator<Long> mbIte = members.iterator();
						for (; mbIte.hasNext();) {
							hid = mbIte.next();
							hero = HeroCache.getHero(hid);
							if (hero == null) {
								continue;
							}
							// 征收
							CrossFireBeaconFunction.getIns().levyHandle(hero, false);
						}
						CrossFireBeaconFunction.getIns().updateServerScore(fireBeaconRoom.getRoomId(), partId);
						// 战斗检测
						CrossFireBeaconFunction.getIns().battleCheck(fireBeaconRoom);
					}
				} catch (Exception e) {
					LogTool.error(e, CrossFireBeaconSysEvent.class, "CrossFireBeacon levyHandle,battleCheck partId=" + partId);
				}
			}
		} else if (cmdId == 4) {
			if (CrossFireBeaconSysCache.FireBeaconState != CrossFireBeaconConst.FB_OPEN) {
				return;
			}
			Set<Integer> keySet = CrossFireBeaconSysCache.getFireBeaconCacheMap().keySet();
			for (int partId : keySet) {
				try {
					// 定时同步展示玩家位置
					Iterator<FireBeaconRoom> iterator = CrossFireBeaconSysCache.getRoomMap(partId).values().iterator();
					Map<Long, FireBeaconModel> playerMap = CrossFireBeaconSysCache.getPlayerMap(partId);
					FireBeaconRoom room = null;
					Set<Long> showList = null;
					Hero hero = null;
					for (; iterator.hasNext();) {
						List<Object[]> playersData = new ArrayList<>();
						room = iterator.next();
						showList = room.getShowList();
						// 发送显示的玩家数据 [L:玩家idU:玩家名B:职业B:归属I:头像I:头像框I:坐标XI:坐标Y]显示的玩家数据
						Iterator<Long> itr = showList.iterator();
						for (; itr.hasNext();) {
							long hid = itr.next();
							hero = HeroCache.getHero(hid);
							if (hero == null) {
								continue;
							}
							FireBeaconModel model = playerMap.get(hid);
							int speed = MountFunction.getIns().getSpeed(hero);
							playersData.add(new Object[] { hid, hero.getNameZoneid(), hero.getJob(), GodWeaponFunction.getIns().getNowGodWeapon(hero), model.getBelongType(),
									hero.getIcon(), hero.getFrame(), model.getPosX(), model.getPosY(),
									model.getCityId() > 0 ? 1 : 0 , hero.getMountId(), speed});
							LogTool.info(hid, hero.getNameZoneid(),
									"UUUU posx=" + model.getPosX() + ", posy=" + model.getPosY(),
									CrossFireBeaconSysEvent.class);
						}
						Set<Long> members = room.getMembers();
						Iterator<Long> iter = members.iterator();
						for (; iter.hasNext();) {
							long hid = iter.next();
							FireBeaconModel myFbModel = playerMap.get(hid);
							if (myFbModel == null) {
								continue;
							}
							hero = HeroCache.getHero(hid);
							if (hero == null) {
								continue;
							}
							int speed = MountFunction.getIns().getSpeed(hero);
							List<Object[]> sendList = new ArrayList<>(playersData);
							sendList.add(new Object[] { hid, hero.getNameZoneid(), hero.getJob(),GodWeaponFunction.getIns().getNowGodWeapon(hero), myFbModel.getBelongType(),
									hero.getIcon(), hero.getFrame(), myFbModel.getPosX(), myFbModel.getPosY(),
									myFbModel.getCityId() > 0 ? 1 : 0 ,hero.getMountId(),speed});
							CrossFireBeaconSender.sendCmd_3580(hid, sendList.toArray());
						}
					}
				} catch (Exception e) {
					LogTool.error(e, CrossFireBeaconSysEvent.class, "CrossFireBeacon synPos partId=" + partId);
				}
			}
		}
	}

	/**
	 * 匹配战斗
	 */
	public void matchRoom(int partId) {
		try {
			// 进行随机分组
//			CrossFireBeaconSysCache.roomIdCreator.set(1);
			TreeSet<Integer> zoneIdSet = CrossFireBeaconSysCache.getZoneIds(partId);
			Iterator<Integer> zIteratore = zoneIdSet.iterator();

			int monthTime = TimeDateUtil.ONE_DAY_INT * 30;
			List<Integer> monthAfterList = new ArrayList<>();
			List<Integer> monthList = new ArrayList<>();
			LogTool.info("CrossFireBeacon zoneIdSet size="+zoneIdSet.size(), CrossFireBeaconSysEvent.class);
			// 分开开服一个月前和一个月后
			for (; zIteratore.hasNext();) {
				int zoneId = zIteratore.next();
				Integer opTime = CrossFireBeaconSysCache.getZoneIdOpenServerTime(partId).get(zoneId);
				if (opTime == null) {
					opTime = 0;
				}
				if (opTime == 0) {
					if (!monthList.contains(zoneId)) {
						monthList.add(zoneId);
					}
				} else {
					int currentTime = TimeDateUtil.getCurrentTime();
					int passTime = currentTime - opTime;
					if (passTime > monthTime && !monthAfterList.contains(zoneId)) {
						monthAfterList.add(zoneId);
					} else {
						monthList.add(zoneId);
					}
				}
			}
			// 月前处理
			LogTool.info("CrossFireBeacon monthList msize="+monthList.size(), CrossFireBeaconSysEvent.class);
			monthListMatch(monthList, partId);
			LogTool.info("CrossFireBeacon monthList", CrossFireBeaconSysEvent.class);
			// 月后处理
			LogTool.info("CrossFireBeacon monthAfterList msize="+monthAfterList.size(), CrossFireBeaconSysEvent.class);
			monthListMatch(monthAfterList, partId);
			LogTool.info("CrossFireBeacon monthAfterList", CrossFireBeaconSysEvent.class);
			int roomId = CrossFireBeaconSysCache.roomIdCreator.get();
			LogTool.info("CrossFireBeacon readyHandel end roomId=" + roomId, CrossFireBeaconSysEvent.class);
		} catch (Exception e) {
			LogTool.error(e, CrossFireBeaconSysEvent.class, "CrossFireBeacon matchRoom");
		}
	}

	/**
	 * 按月分配后匹配
	 * 
	 */
	public void monthListMatch(List<Integer> monthList, int partId) {
		try {
			int size = monthList.size();
			LogTool.info("CrossFireBeacon monthListMatch monthListsize="+size, CrossFireBeaconSysEvent.class);
			if (size <= 10) {
				// 随机匹配
				List<Integer> leftList = new ArrayList<>();
				groupListMatch(monthList, leftList, true, partId);
			} else {
				CrossFireBeaconComparetor comparetor = new CrossFireBeaconComparetor(partId);
				Collections.sort(monthList, comparetor);
				LogTool.info("CrossFireBeacon monthListMatch size="+size, CrossFireBeaconSysEvent.class);
				int hightSize = size / 2;
				List<Integer> hightList = new ArrayList<>();
				List<Integer> lowList = new ArrayList<>();
				for (int i = 0; i < size; i++) {
					int zoneId = monthList.get(i);
					if (i < hightSize) {
						hightList.add(zoneId);
					} else {
						lowList.add(zoneId);
					}
				}
				List<Integer> leftList = new ArrayList<>();
				groupListMatch(hightList, leftList, false, partId);
				LogTool.info("CrossFireBeacon monthListMatch hightList", CrossFireBeaconSysEvent.class);
				groupListMatch(lowList, leftList, false, partId);
				if (leftList.size() > 0) {
					List<Integer> tempLeftList = new ArrayList<>();
					groupListMatch(leftList, tempLeftList, true, partId);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, CrossFireBeaconSysEvent.class, "CrossFireBeacon monthListMatch");
		}
	}

	/**
	 * 战力高低分组匹配
	 * 
	 * @param groupList
	 * @param leftList 匹配后剩余的区服列表
	 * @param fightNo 是否剩余直接轮空
	 */
	public void groupListMatch(List<Integer> groupList, List<Integer> leftList, boolean fightNo, int partId) {
		Map<Integer, FireBeaconRoom> roomMap = CrossFireBeaconSysCache.getRoomMap(partId);
		int roomId = CrossFireBeaconSysCache.roomIdCreator.getAndIncrement();
		int totalSize = groupList.size();
		for (int i = 0; i < totalSize; i++) {
			int randomSize = groupList.size();
			int random = RandomUtil.getRandomNumInAreas(0, randomSize - 1);
			int chooseZoneId = groupList.remove(random);
			LogTool.info("chooseZoneId==" + chooseZoneId+", randomSize="+randomSize + ", random=" + random+", roomId="+roomId, CrossFireBeaconSysEvent.class);
			FireBeaconRoom fireBeaconRoom = roomMap.get(roomId);
			if (fireBeaconRoom == null) {
				fireBeaconRoom = new FireBeaconRoom();
				fireBeaconRoom.setRoomId(roomId);
				roomMap.put(roomId, fireBeaconRoom);
			}
			List<Integer> zoneBelong = fireBeaconRoom.getZoneBelong();
			int zbSize = zoneBelong.size();
			if (zbSize < CrossFireBeaconConst.FIGHT_SIDES) {
				zoneBelong.add(chooseZoneId);
			}
			if (zoneBelong.size() == CrossFireBeaconConst.FIGHT_SIDES) {
				// 初始化房间数据
				CrossFireBeaconFunction.getIns().initRoomData(fireBeaconRoom, partId);
				roomId = CrossFireBeaconSysCache.roomIdCreator.getAndIncrement();
			}
			if (i == (totalSize - 1) && zoneBelong.size() < CrossFireBeaconConst.FIGHT_SIDES) {
				// 轮空处理
				if (fightNo) {
					CrossFireBeaconFunction.getIns().initRoomData(fireBeaconRoom, partId);
				} else {
					leftList.addAll(zoneBelong);
					roomMap.remove(roomId);
					LogTool.info("CrossFireBeaconSysEvent miss roomId=" + roomId, CrossFireBeaconSysEvent.class);
					// for (int zid : zoneBelong) {
					// if (!leftList.contains(zid)) {
					// leftList.add(zid);
					// }
					// }
				}
				// roomId = CrossFireBeaconSysCache.roomIdCreator.getAndIncrement();
			}
		}
	}

}
