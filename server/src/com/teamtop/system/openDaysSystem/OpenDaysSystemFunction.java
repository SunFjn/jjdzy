package com.teamtop.system.openDaysSystem;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossZone;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.HeroOpTaskRunnable;
import com.teamtop.system.activity.ActivitySysCache;
import com.teamtop.system.discountStore.DiscountStoreFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.model.AbsOpenDaysSystemModel;
import com.teamtop.system.openDaysSystem.model.HeroOpenDaysSysData;
import com.teamtop.system.openDaysSystem.model.OpenSystemInfo;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_hdfl_012;
import excel.struct.Struct_hdfl_012;

public class OpenDaysSystemFunction {

	private static OpenDaysSystemFunction ins;

	private OpenDaysSystemFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized OpenDaysSystemFunction getIns() {
		if (ins == null) {
			ins = new OpenDaysSystemFunction();
		}
		return ins;
	}

	public int checkSystemOpenBySysId(int sysId) {
		try {
			int openDays = TimeDateUtil.betweenOpen();
			int currentTime = TimeDateUtil.getCurrentTime();
			Set<Integer> set = OpenDaysSystemSysCache.sysMap.get(sysId);
			if (set == null) {
				return -1;
			}
			ConcurrentHashMap<Integer, OpenSystemInfo> openMap = OpenDaysSystemSysCache.getOpenMap();
			Iterator<Integer> iterator = set.iterator();
			Integer uid = null;
			Struct_hdfl_012 target = null;
			for (; iterator.hasNext();) {
				uid = iterator.next();
				if (uid != null) {
					Struct_hdfl_012 hdfl_012 = Config_hdfl_012.getIns().get(uid);
					if(!openMap.containsKey(uid)) {
						continue;
					}
					OpenSystemInfo openSystemInfo = openMap.get(uid);
					int startTime = openSystemInfo.getStartTime();
					int endTime = openSystemInfo.getEndTime();
					if (currentTime >= startTime && currentTime <= endTime) {
						target = hdfl_012;
						break;
					}
				}
			}
			if (target != null) {
				return target.getBianhao();
			}
		} catch (Exception e) {
			LogTool.error(e, OpenDaysSystemFunction.class, "checkSystemOpenBySysId");
		}
		return -1;
	}

	public boolean isSystemActOpen(Hero hero, int sysId) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, sysId)) {
			return false;
		}
		if (!isSystemActOpen(sysId)) {
			return false;
		}
		AbsOpenDaysManager manager = OpenDaysSystemSysCache.getManager(sysId);
		if (manager != null) {
			if (!manager.checkisOpen()) {
				return false;
			}
		}
		return true;
	}

	public boolean canSystemActOpen(int sysId) {
		if (!checkFourTeenSystemOpen(sysId)) {
			return false;
		}
		return true;
	}

	public boolean isSystemActOpen(int sysId) {
		int uid = checkSystemOpenBySysId(sysId);
		if (uid == -1) {
			return false;
		}
		return true;
	}

	public boolean checkFourTeenSystemOpen(int sysId) {
		try {
			if (CrossZone.isCrossServer()) {
				return true;
			}
			Map<Integer, Integer> sConflictMap = OpenDaysSystemSysCache.getsConflictMap();
			if (!sConflictMap.containsKey(sysId)) {
				return true;
			}
			Integer actId = sConflictMap.get(sysId);
			if (actId != null) {
				if (ActivitySysCache.getActivityMap().containsKey(actId)) {
					return false;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, HeroFunction.class, "checkFourTeenSystemOpen sysId=" + sysId);
		}
		return true;
	}

	/**
	 * 检测系统开启
	 * @param handlePlayer //是否处理玩家开启， true 处理,（不处理的情况：过零点，只检测公共活动开启，个人活动开启在个人零点处理）
	 */
	public void checkSystemOpen(boolean handlePlayer) {
		try {
			Map<Integer, OpenSystemInfo> openMap = OpenDaysSystemSysCache.getOpenMap();
			Set<Integer> openedSet = OpenDaysSystemSysCache.getOpenedSet();
			Set<Integer> passOpenedSet = OpenDaysSystemSysCache.getPassOpenedSet();
			int openDays = TimeDateUtil.betweenOpen();
			Map<Integer, Struct_hdfl_012> map = Config_hdfl_012.getIns().getMap();
			Iterator<Struct_hdfl_012> iterator = map.values().iterator();
			Struct_hdfl_012 hdfl_012 = null;
			for (; iterator.hasNext();) {
				hdfl_012 = iterator.next();
				int uid = hdfl_012.getBianhao();
				if (openMap.containsKey(uid)) {
					continue;
				}
				int sysId = hdfl_012.getId();
				if (!canSystemActOpen(sysId)) {
					continue;
				}
				int open = hdfl_012.getOpen();
				int end = hdfl_012.getEnd();
				if (openDays == open && openDays <= end) {
					if (openedSet.contains(sysId)) {
						continue;
					}
					int qs = hdfl_012.getQs();
					int startTime = TimeDateUtil.getOpenDaysTime(open, false);
					int endTime = TimeDateUtil.getOpenDaysTime(end, true);
					OpenSystemInfo info = new OpenSystemInfo(uid, sysId, qs, startTime, endTime);
					openMap.put(uid, info);
					openedSet.add(sysId);
					passOpenedSet.add(uid);
					AbsOpenDaysManager manager = OpenDaysSystemSysCache.getManager(sysId);
					if (manager != null) {
						try {
							manager.handleOpenPub();
						} catch (Exception e) {
							LogTool.error(e, OpenDaysSystemFunction.class,
									"handleSysOpen handleOpenPub, sysId=" + sysId + ", uid=" + uid);
						}
					}
					if (handlePlayer) {
						handleSysOpen(sysId, uid);
					}
				} else {
					if (passOpenedSet.contains(uid)) {
						continue;
					}
					if (openedSet.contains(sysId)) {
						continue;
					}
					if (openDays > open && hdfl_012.getPd() == 1) {
						int qs = hdfl_012.getQs();
						int startTime = TimeDateUtil.getTodayZeroTimeReturnInt();
						int endTime = TimeDateUtil.getOneDayZeroTime(TimeDateUtil.getNextFewDayTime(hdfl_012.getEnd()-hdfl_012.getOpen()+1))-1;
						OpenSystemInfo info = new OpenSystemInfo(uid, sysId, qs, startTime, endTime);
						openMap.put(uid, info);
						openedSet.add(sysId);
						passOpenedSet.add(uid);
						AbsOpenDaysManager manager = OpenDaysSystemSysCache.getManager(sysId);
						if (manager != null) {
							try {
								manager.handleOpenPub();
							} catch (Exception e) {
								LogTool.error(e, OpenDaysSystemFunction.class,
										"handleSysOpen handleOpenPub, sysId=" + sysId + ", uid=" + uid);
							}
						}
						if (handlePlayer) {
							handleSysOpen(sysId, uid);
						}
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, OpenDaysSystemFunction.class, "checkSystemOpen");
		}
	}

	public void checkSystemOpenForinitExcel() {
		try {
			Map<Integer, OpenSystemInfo> openMap = OpenDaysSystemSysCache.getOpenMap();
			Set<Integer> openedSet = OpenDaysSystemSysCache.getOpenedSet();
			Map<Integer, Struct_hdfl_012> map = Config_hdfl_012.getIns().getMap();
			openedSet.clear();
			for (int uid : openMap.keySet()) {
				Struct_hdfl_012 struct_hdfl_012 = map.get(uid);
				if (struct_hdfl_012 != null) {
					openedSet.add(struct_hdfl_012.getId());
				}
			}
			Set<Integer> passOpenedSet = OpenDaysSystemSysCache.getPassOpenedSet();
			int openDays = TimeDateUtil.betweenOpen();
			Iterator<Struct_hdfl_012> iterator = map.values().iterator();
			Struct_hdfl_012 hdfl_012 = null;
			for (; iterator.hasNext();) {
				hdfl_012 = iterator.next();
				int uid = hdfl_012.getBianhao();
				if (openMap.containsKey(uid)) {
					continue;
				}
				int sysId = hdfl_012.getId();
				if (sysId == 7306) {
					System.err.println();
				}
				if (!canSystemActOpen(sysId)) {
					continue;
				}
				int open = hdfl_012.getOpen();
				int end = hdfl_012.getEnd();
				if (openDays == open && openDays <= end) {
					if (openedSet.contains(sysId)) {
						continue;
					}
					int qs = hdfl_012.getQs();
					int startTime = TimeDateUtil.getOpenDaysTime(open, false);
					int endTime = TimeDateUtil.getOpenDaysTime(end, true);
					OpenSystemInfo info = new OpenSystemInfo(uid, sysId, qs, startTime, endTime);
					openMap.put(uid, info);
					openedSet.add(sysId);
					passOpenedSet.add(uid);
					AbsOpenDaysManager manager = OpenDaysSystemSysCache.getManager(sysId);
					if (manager != null) {
						try {
							manager.handleOpenPub();
						} catch (Exception e) {
							LogTool.error(e, OpenDaysSystemFunction.class,
									"handleSysOpen handleOpenPub, sysId=" + sysId + ", uid=" + uid);
						}
					}
					handleSysOpen(sysId, uid);
				} else {
					if (passOpenedSet.contains(uid)) {
						continue;
					}
					if (openedSet.contains(sysId)) {
						continue;
					}
					if (openDays > open && hdfl_012.getPd() == 1) {
						int qs = hdfl_012.getQs();
						int startTime = TimeDateUtil.getTodayZeroTimeReturnInt();
						int endTime = TimeDateUtil.getOneDayZeroTime(TimeDateUtil.getNextFewDayTime(hdfl_012.getEnd()-hdfl_012.getOpen()+1))-1;
						OpenSystemInfo info = new OpenSystemInfo(uid, sysId, qs, startTime, endTime);
						openMap.put(uid, info);
						openedSet.add(sysId);
						passOpenedSet.add(uid);
						AbsOpenDaysManager manager = OpenDaysSystemSysCache.getManager(sysId);
						if (manager != null) {
							try {
								manager.handleOpenPub();
							} catch (Exception e) {
								LogTool.error(e, OpenDaysSystemFunction.class,
										"handleSysOpen handleOpenPub, sysId=" + sysId + ", uid=" + uid);
							}
						}
						handleSysOpen(sysId, uid);
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, OpenDaysSystemFunction.class, "checkSystemOpen");
		}
	}

	public void handleSysOpen(int sysId, int uid) {
		try {
			AbsOpenDaysManager manager = OpenDaysSystemSysCache.getManager(sysId);
			if (manager == null) {
				return;
			}
			// try {
			// manager.handleOpenPub();
			// } catch (Exception e) {
			// LogTool.error(e, OpenDaysSystemFunction.class,
			// "handleSysOpen handleOpenPub, sysId=" + sysId + ", uid=" + uid);
			// }
			Iterator<Hero> iterator = HeroCache.getHeroMap().values().iterator();
			for (; iterator.hasNext();) {
				Hero hero = iterator.next();
				if (hero == null) {
					continue;
				}
				OpTaskExecutorService.DefaultService.execute(new HeroOpTaskRunnable() {

					@Override
					public void run() {
						try {
							// 初始化数据
							Map<Integer, AbsOpenDaysSystemModel> opSysDataMap = hero.getHeroOpenDaysSysData()
									.getOpSysDataMap();
							if (!opSysDataMap.containsKey(uid)) {
								if (!isSystemActOpen(hero, sysId)&&(!OpenDaysSystemSysCache.isSpecialSys(sysId))) {
									return;
								}
								AbsOpenDaysSystemModel data = manager.getSystemModel(hero, uid);
								if (data != null) {
									data.setHid(hero.getId());
									data.setUid(uid);
									data.setSysid(sysId);
									Struct_hdfl_012 hdfl_012 = OpenDaysSystemSysCache.gethdflData(uid);
									data.setQs(hdfl_012.getQs());
									opSysDataMap.put(uid, data);
									OpenDaysSystemDao.getDao().insertData(hero, data);
									// 开启处理
									manager.handleOpen(hero, uid);
									if (hero.isOnline()) {
										ConcurrentHashMap<Integer, OpenSystemInfo> openMap = OpenDaysSystemSysCache
												.getOpenMap();
										OpenSystemInfo openSystemInfo = openMap.get(uid);
										OpenDaysSystemSender.sendCmd_4572(hero.getId(), 1, uid, sysId,
												openSystemInfo.getQs(), openSystemInfo.getStartTime(),
												openSystemInfo.getEndTime());
									}
								}
							}
						} catch (Exception e) {
							LogTool.error(e, OpenDaysSystemFunction.class, hero.getId(), hero.getName(),
									"handleSysOpen sysId=" + sysId + ", uid=" + uid);
						}
					}

					@Override
					public Object getSession() {
						return hero.getId();
					}
				});
			}
		} catch (Exception e) {
			LogTool.error(e, OpenDaysSystemFunction.class, "handleSysOpen, sysId=" + sysId);
		}
	}

	public void checkSysEnd() {
		try {
			Map<Integer, OpenSystemInfo> openMap = OpenDaysSystemSysCache.getOpenMap();
			Set<Integer> openedSet = OpenDaysSystemSysCache.getOpenedSet();
			int currentTime = TimeDateUtil.getCurrentTime();
			Iterator<OpenSystemInfo> iterator = openMap.values().iterator();
			for (; iterator.hasNext();) {
				OpenSystemInfo openSystemInfo = iterator.next();
				int uid = openSystemInfo.getUid();
				if (!openMap.containsKey(uid)) {
					continue;
				}
				int sysId = openSystemInfo.getSysId();
				int startTime = openSystemInfo.getStartTime();
				int endTime = openSystemInfo.getEndTime();
				if (currentTime < startTime || currentTime > endTime) {
					openMap.remove(uid);
					openedSet.remove(sysId);
					handleSysEnd(sysId, uid, openSystemInfo);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, OpenDaysSystemFunction.class, "checkSysEnd");
		}
	}

	public void handleSysEnd(int sysId, int uid, OpenSystemInfo openSystemInfo) {
		try {
			AbsOpenDaysManager manager = OpenDaysSystemSysCache.getManager(sysId);
			if (manager == null) {
				return;
			}
			try {
				manager.handleEndPub();
			} catch (Exception e) {
				LogTool.error(e, OpenDaysSystemFunction.class, "handleSysEnd handleEndPub, sysId=" + sysId + ", uid=" + uid);
			}
			Iterator<Hero> iterator = HeroCache.getHeroMap().values().iterator();
			for (; iterator.hasNext();) {
				Hero hero = iterator.next();
				Map<Integer, AbsOpenDaysSystemModel> opSysDataMap = hero.getHeroOpenDaysSysData().getOpSysDataMap();
				try {
					Set<Integer> endUidSet = hero.getEndUidSet();
					if (endUidSet.contains(uid)) {
						continue;
					}
					manager.handleEnd(hero, uid);
					endUidSet.add(uid);
//					OpenDaysSystemDao.getDao().saveOpSysData(hero, hero.getHeroOpenDaysSysData().getOpSysDataMap());
					AbsOpenDaysSystemModel data = opSysDataMap.get(uid);
					if(data!=null) {						
						OpenDaysSystemDao.getDao().updateData(hero, data);
					}
					if(hero.isOnline()) {
						OpenDaysSystemSender.sendCmd_4572(hero.getId(), 0, uid, sysId,
								openSystemInfo.getQs(), openSystemInfo.getStartTime(),
								openSystemInfo.getEndTime());
					}
				} catch (Exception e) {
					LogTool.error(e, OpenDaysSystemFunction.class, hero.getId(), hero.getName(), "handleSysEnd handleEnd" + ", uid=" + uid);
				}
				opSysDataMap.remove(uid);
			}
		} catch (Exception e) {
			LogTool.error(e, OpenDaysSystemFunction.class, "handleSysEnd, sysId=" + sysId + ", uid=" + uid);
		}
	}

	/**
	 * 个人系统开启检测
	 * 
	 * @param hero
	 * @param isLogin
	 */
	public void opDaysSysOpen(Hero hero, boolean isLogin) {
		try {
			HeroOpenDaysSysData heroOpenDaysSysData = hero.getHeroOpenDaysSysData();
			Map<Integer, AbsOpenDaysSystemModel> opSysDataMap = heroOpenDaysSysData.getOpSysDataMap();
			ConcurrentHashMap<Integer,OpenSystemInfo> openMap = OpenDaysSystemSysCache.getOpenMap();
			Set<Integer> uidSet = new HashSet<>(openMap.keySet());
			Iterator<Integer> iterator = uidSet.iterator();
			Map<Integer, Struct_hdfl_012> map = Config_hdfl_012.getIns().getMap();
			int uid = 0;
			Struct_hdfl_012 hdfl_012 = null;
			int sysId = 0;
			for(;iterator.hasNext();) {
				uid = iterator.next();
				try {
					if (opSysDataMap.containsKey(uid)) {
						continue;
					}
					hdfl_012 = map.get(uid);
					if(hdfl_012==null) {
						continue;
					}
					sysId = hdfl_012.getId();
					if (!isSystemActOpen(hero, sysId)&&(!OpenDaysSystemSysCache.isSpecialSys(sysId))) {
						continue;
					}
					AbsOpenDaysManager manager = OpenDaysSystemSysCache.getManager(sysId);
					if (manager == null) {
						continue;
					}
					// 初始化数据
					AbsOpenDaysSystemModel data = manager.getSystemModel(hero, uid);
					if (data != null) {
						data.setHid(hero.getId());
						data.setUid(uid);
						data.setSysid(sysId);
						data.setQs(hdfl_012.getQs());
						opSysDataMap.put(uid, data);
						OpenDaysSystemDao.getDao().insertData(hero, data);
						manager.handleOpen(hero, uid);
						if (!isLogin) {
							OpenSystemInfo openSystemInfo = openMap.get(uid);
							OpenDaysSystemSender.sendCmd_4572(hero.getId(), 1, uid, sysId, openSystemInfo.getQs(),
									openSystemInfo.getStartTime(), openSystemInfo.getEndTime());
						}
						manager.sendOpneState(hero);
					}
				} catch (Exception e) {
					LogTool.error(e, OpenDaysSystemFunction.class, hero.getId(), hero.getName(),
							"OpenDaysSystemFunction opDaysSysOpen, sysId=" + sysId + ", uid=" + uid);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, OpenDaysSystemFunction.class, hero.getId(), hero.getName(),
					"OpenDaysSystemFunction opDaysSysOpen");
		}
	}

	/**
	 * 个人系统结束
	 * 
	 * @param hero
	 */
	public void opDaysSysEnd(Hero hero) {
		try {
			HeroOpenDaysSysData heroOpenDaysSysData = hero.getHeroOpenDaysSysData();
			Map<Integer, AbsOpenDaysSystemModel> opSysDataMap = heroOpenDaysSysData.getOpSysDataMap();
			ConcurrentHashMap<Integer, OpenSystemInfo> openMap = OpenDaysSystemSysCache.getOpenMap();
			Map<Integer, Struct_hdfl_012> map = Config_hdfl_012.getIns().getMap();
			Iterator<Integer> iterator = new HashSet<>(opSysDataMap.keySet()).iterator();
			int uid = 0;
			Struct_hdfl_012 hdfl_012 = null;
			int sysId = 0;
			for (; iterator.hasNext();) {
				uid = iterator.next();
				if (!openMap.containsKey(uid)) {
					// 移除开启系统
					hdfl_012 = map.get(uid);
					if (hdfl_012 == null) {
						continue;
					}
					sysId = hdfl_012.getId();
					AbsOpenDaysManager manager = OpenDaysSystemSysCache.getManager(sysId);
					if (manager == null) {
						continue;
					}
					try {
						Set<Integer> endUidSet = hero.getEndUidSet();
						if (endUidSet.contains(uid)) {
							continue;
						}
						manager.handleEnd(hero, uid);
						endUidSet.add(uid);
//						OpenDaysSystemDao.getDao().saveOpSysData(hero, hero.getHeroOpenDaysSysData().getOpSysDataMap());
						AbsOpenDaysSystemModel data = opSysDataMap.get(uid);
						if(data!=null) {						
							OpenDaysSystemDao.getDao().updateData(hero, data);
						}
					} catch (Exception e) {
						LogTool.error(e, OpenDaysSystemFunction.class, hero.getId(), hero.getName(),
								"OpenDaysSystemFunction opDaysSysEnd" + ", uid=" + uid);
					}
					opSysDataMap.remove(uid);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, OpenDaysSystemFunction.class, hero.getId(), hero.getName(),
					"OpenDaysSystemFunction opDaysSysEnd");
		}
	}

	/**
	 * 发送开启系统数据
	 * 
	 * @param hero
	 */
	public void sendOpenSystem(Hero hero) {
		try {
			if (hero == null) {
				return;
			}
//			int openDays = TimeDateUtil.betweenOpen();
//			Map<Integer, Struct_hdfl_012> map = Config_hdfl_012.getIns().getMap();
//			Iterator<Struct_hdfl_012> iterator = map.values().iterator();
//			Struct_hdfl_012 hdfl_012 = null;
//			List<Object[]> sendList = new ArrayList<>();
//			for (; iterator.hasNext();) {
//				hdfl_012 = iterator.next();
//				int sysId = hdfl_012.getId();
//				if (!HeroFunction.getIns().checkSystemOpen(hero, sysId)) {
//					continue;
//				}
//				int open = hdfl_012.getOpen();
//				int end = hdfl_012.getEnd();
//				if (openDays >= open && openDays <= end) {
//					int uid = hdfl_012.getBianhao();
//					int qs = hdfl_012.getQs();
//					int startTime = TimeDateUtil.getOpenDaysTime(open, false);
//					int endTime = TimeDateUtil.getOpenDaysTime(end, true);
//					sendList.add(new Object[] { uid, sysId, qs, startTime, endTime });
//				}
//			}
			List<Object[]> sendList = new ArrayList<>();
			ConcurrentHashMap<Integer,OpenSystemInfo> openMap = OpenDaysSystemSysCache.getOpenMap();
			HeroOpenDaysSysData heroOpenDaysSysData = hero.getHeroOpenDaysSysData();
			if (heroOpenDaysSysData == null) {
				return;
			}
			Map<Integer, AbsOpenDaysSystemModel> opSysDataMap = heroOpenDaysSysData.getOpSysDataMap();
			Iterator<OpenSystemInfo> iterator = openMap.values().iterator();
			for(;iterator.hasNext();) {
				OpenSystemInfo info = iterator.next();
				int uid = info.getUid();
				if (!opSysDataMap.containsKey(uid)) {
					continue;
				}
				int qs = info.getQs();
				int sysId = info.getSysId();
				if (sysId == SystemIdConst.OTHER_DISCOUNT_SHOP) {
					if (!DiscountStoreFunction.getIns().checkCanOpen(hero)) {
						// 老系统开，则新系统不开
						continue;
					}
				}
				int startTime = info.getStartTime();
				int endTime = info.getEndTime();
				LogTool.info(hero.getId(), hero.getName(), "OpenDaysSystemFunction sendOpenSystem, uid=" + uid,
						OpenDaysSystemFunction.class);
				sendList.add(new Object[] { uid, sysId, qs, startTime, endTime });
			}
			OpenDaysSystemSender.sendCmd_4570(hero.getId(), sendList.toArray());
		} catch (Exception e) {
			LogTool.error(e, OpenDaysSystemFunction.class, hero.getId(), hero.getName(), "sendOpenSystem");
		}
	}

	public void login(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			HeroOpenDaysSysData heroOpenDaysSysData = hero.getHeroOpenDaysSysData();
			Map<Integer, AbsOpenDaysSystemModel> opSysDataMap = heroOpenDaysSysData.getOpSysDataMap();
			ConcurrentHashMap<Integer, OpenSystemInfo> openMap = OpenDaysSystemSysCache.getOpenMap();
			Iterator<Integer> iterator = new HashSet<>(openMap.keySet()).iterator();
			for (; iterator.hasNext();) {
				Integer uid = iterator.next();
				try {
					if (uid == null) {
						continue;
					}
					OpenSystemInfo systemInfo = openMap.get(uid);
					int sysId = systemInfo.getSysId();
					AbsOpenDaysManager manager = OpenDaysSystemSysCache.getManager(sysId);
					if (manager == null) {
						continue;
					}
					if (!opSysDataMap.containsKey(uid)) {
						continue;
					}
					manager.getSystemEvent().login(hero);
				} catch (Exception e) {
					LogTool.error(e, OpenDaysSystemFunction.class, hid, hero.getName(),
							"OpenDaysSystemFunction login uid=" + uid);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, OpenDaysSystemFunction.class, hid, hero.getName(), "OpenDaysSystemFunction login");
		}
	}

	public void loginReset(Hero hero, int now) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			ConcurrentHashMap<Integer, OpenSystemInfo> openMap = OpenDaysSystemSysCache.getOpenMap();
			Iterator<Integer> iterator = new HashSet<>(openMap.keySet()).iterator();
			for (; iterator.hasNext();) {
				Integer uid = iterator.next();
				try {
					if (uid == null) {
						continue;
					}
					OpenSystemInfo systemInfo = openMap.get(uid);
					int sysId = systemInfo.getSysId();
					AbsOpenDaysManager manager = OpenDaysSystemSysCache.getManager(sysId);
					if (manager == null) {
						continue;
					}
					manager.getSystemEvent().loginReset(hero, now);
				} catch (Exception e) {
					LogTool.error(e, OpenDaysSystemFunction.class, hid, hero.getName(),
							"OpenDaysSystemFunction loginReset uid=" + uid);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, OpenDaysSystemFunction.class, hid, hero.getName(), "OpenDaysSystemFunction loginReset");
		}
	}

	public void zeroHero(Hero hero, int now) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			ConcurrentHashMap<Integer, OpenSystemInfo> openMap = OpenDaysSystemSysCache.getOpenMap();
			Iterator<Integer> iterator = new HashSet<>(openMap.keySet()).iterator();
			for (; iterator.hasNext();) {
				Integer uid = iterator.next();
				try {
					if (uid == null) {
						continue;
					}
					OpenSystemInfo systemInfo = openMap.get(uid);
					int sysId = systemInfo.getSysId();
					AbsOpenDaysManager manager = OpenDaysSystemSysCache.getManager(sysId);
					if (manager == null) {
						continue;
					}
					manager.getSystemEvent().zeroHero(hero, now);
				} catch (Exception e) {
					LogTool.error(e, OpenDaysSystemFunction.class, hid, hero.getName(),
							"OpenDaysSystemFunction zeroHero uid=" + uid);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, OpenDaysSystemFunction.class, hid, hero.getName(), "OpenDaysSystemFunction zeroHero");
		}
	}

	public void zeroPub(int now) {
		try {
			ConcurrentHashMap<Integer, OpenSystemInfo> openMap = OpenDaysSystemSysCache.getOpenMap();
			Iterator<Integer> iterator = new HashSet<>(openMap.keySet()).iterator();
			for (; iterator.hasNext();) {
				Integer uid = iterator.next();
				try {
					if (uid == null) {
						continue;
					}
					OpenSystemInfo systemInfo = openMap.get(uid);
					int sysId = systemInfo.getSysId();
					AbsOpenDaysManager manager = OpenDaysSystemSysCache.getManager(sysId);
					if (manager == null) {
						continue;
					}
					manager.getSystemEvent().zeroPub(now);
				} catch (Exception e) {
					LogTool.error(e, OpenDaysSystemFunction.class, "OpenDaysSystemFunction zeroPub uid=" + uid);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, OpenDaysSystemFunction.class, "OpenDaysSystemFunction zeroPub");
		}
	}

	public void logout(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			ConcurrentHashMap<Integer, OpenSystemInfo> openMap = OpenDaysSystemSysCache.getOpenMap();
			Iterator<Integer> iterator = new HashSet<>(openMap.keySet()).iterator();
			for (; iterator.hasNext();) {
				Integer uid = iterator.next();
				try {
					if (uid == null) {
						continue;
					}
					OpenSystemInfo systemInfo = openMap.get(uid);
					int sysId = systemInfo.getSysId();
					AbsOpenDaysManager manager = OpenDaysSystemSysCache.getManager(sysId);
					if (manager == null) {
						continue;
					}
					manager.getSystemEvent().logout(hero);
				} catch (Exception e) {
					LogTool.error(e, OpenDaysSystemFunction.class, hid, hero.getName(),
							"OpenDaysSystemFunction logout uid=" + uid);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, OpenDaysSystemFunction.class, hid, hero.getName(), "OpenDaysSystemFunction logout");
		}
	}

	public void logoutSyncPub(Hero hero, int syncType) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			ConcurrentHashMap<Integer, OpenSystemInfo> openMap = OpenDaysSystemSysCache.getOpenMap();
			Iterator<Integer> iterator = new HashSet<>(openMap.keySet()).iterator();
			for (; iterator.hasNext();) {
				Integer uid = iterator.next();
				try {
					if (uid == null) {
						continue;
					}
					OpenSystemInfo systemInfo = openMap.get(uid);
					int sysId = systemInfo.getSysId();
					AbsOpenDaysManager manager = OpenDaysSystemSysCache.getManager(sysId);
					if (manager == null) {
						continue;
					}
					manager.getSystemEvent().logoutSyncPub(hero, syncType);
				} catch (Exception e) {
					LogTool.error(e, OpenDaysSystemFunction.class, hid, hero.getName(),
							"OpenDaysSystemFunction logoutSyncPub uid=" + uid);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, OpenDaysSystemFunction.class, hid, hero.getName(), "OpenDaysSystemFunction logoutSyncPub");
		}
	}

	public void levelUp(Hero hero, int newLv, int oldLv) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			ConcurrentHashMap<Integer, OpenSystemInfo> openMap = OpenDaysSystemSysCache.getOpenMap();
			Iterator<Integer> iterator = new HashSet<>(openMap.keySet()).iterator();
			for (; iterator.hasNext();) {
				Integer uid = iterator.next();
				try {
					if (uid == null) {
						continue;
					}
					OpenSystemInfo systemInfo = openMap.get(uid);
					int sysId = systemInfo.getSysId();
					AbsOpenDaysManager manager = OpenDaysSystemSysCache.getManager(sysId);
					if (manager == null) {
						continue;
					}
					manager.getSystemEvent().levelUp(hero, newLv, oldLv);
				} catch (Exception e) {
					LogTool.error(e, OpenDaysSystemFunction.class, hid, hero.getName(),
							"OpenDaysSystemFunction levelUp uid=" + uid);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, OpenDaysSystemFunction.class, hid, hero.getName(), "OpenDaysSystemFunction levelUp");
		}
	}

	public void passGuanqia(Hero hero, int passGuanqia) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			ConcurrentHashMap<Integer, OpenSystemInfo> openMap = OpenDaysSystemSysCache.getOpenMap();
			Iterator<Integer> iterator = new HashSet<>(openMap.keySet()).iterator();
			for (; iterator.hasNext();) {
				Integer uid = iterator.next();
				try {
					if (uid == null) {
						continue;
					}
					OpenSystemInfo systemInfo = openMap.get(uid);
					int sysId = systemInfo.getSysId();
					AbsOpenDaysManager manager = OpenDaysSystemSysCache.getManager(sysId);
					if (manager == null) {
						continue;
					}
					manager.getSystemEvent().passGuanqia(hero, passGuanqia);
				} catch (Exception e) {
					LogTool.error(e, OpenDaysSystemFunction.class, hid, hero.getName(),
							"OpenDaysSystemFunction passGuanqia uid=" + uid);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, OpenDaysSystemFunction.class, hid, hero.getName(), "OpenDaysSystemFunction passGuanqia");
		}
	}

	/** 定时事件执行 */
	public void fixTime(int cmdId, int now) {
		try {
			ConcurrentHashMap<Integer, OpenSystemInfo> openMap = OpenDaysSystemSysCache.getOpenMap();
			Iterator<Integer> iterator = new HashSet<>(openMap.keySet()).iterator();
			for (; iterator.hasNext();) {
				Integer uid = iterator.next();
				try {
					if (uid == null) {
						continue;
					}
					OpenSystemInfo systemInfo = openMap.get(uid);
					int sysId = systemInfo.getSysId();
					AbsOpenDaysManager manager = OpenDaysSystemSysCache.getManager(sysId);
					if (manager == null) {
						continue;
					}
					manager.getSystemEvent().fixTime(cmdId, now);
				} catch (Exception e) {
					LogTool.error(e, OpenDaysSystemFunction.class, "OpenDaysSystemFunction fixTime uid=" + uid);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, OpenDaysSystemFunction.class, "OpenDaysSystemFunction fixTime");
		}
	}

	/** gm 重置开服时间清空系统活动数据 */
	public void gmResetOpenTimeClear() {
		ConcurrentHashMap<Integer, OpenSystemInfo> openMap = OpenDaysSystemSysCache.getOpenMap();
		Iterator<Integer> iterator = new HashSet<>(openMap.keySet()).iterator();
		for (; iterator.hasNext();) {
			Integer uid = iterator.next();
			try {
				if (uid == null) {
					continue;
				}
				Iterator<Hero> iterator2 = HeroCache.getHeroMap().values().iterator();
				for (; iterator2.hasNext();) {
					Hero hero = iterator2.next();
					HeroOpenDaysSysData heroOpenDaysSysData = hero.getHeroOpenDaysSysData();
					if(heroOpenDaysSysData!=null) {						
						heroOpenDaysSysData.getOpSysDataMap().clear();
					}
				}
			} catch (Exception e) {
				LogTool.error(e, OpenDaysSystemFunction.class, "OpenDaysSystemFunction gmResetOpenTimeClear fixTime");
			}
		}
		openMap.clear();
		OpenDaysSystemSysCache.getOpenedSet().clear();
		OpenDaysSystemSysCache.getPassOpenedSet().clear();
		checkSystemOpen(true);
		Iterator<Hero> iterator2 = HeroCache.getHeroMap().values().iterator();
		Hero hero = null;
		for (; iterator2.hasNext();) {
			hero = iterator2.next();
			if(hero.isOnline()) {				
				OpenDaysSystemFunction.getIns().sendOpenSystem(hero);
			}
		}
		openMap = OpenDaysSystemSysCache.getOpenMap();
		// int beginTime = EightDoorSysCache.getEightDoorSysModel().getBeginTime();
		// int overTime = EightDoorSysCache.getEightDoorSysModel().getOverTime();
		// Iterator<Integer> iteratorNew = new HashSet<>(openMap.keySet()).iterator();
		// for (; iteratorNew.hasNext();) {
		// Integer uid = iteratorNew.next();
		// try {
		// if (uid == null) {
		// continue;
		// }
		// openMap.get(uid).setStartTime(beginTime);
		// openMap.get(uid).setEndTime(overTime);
		// } catch (Exception e) {
		// LogTool.error(e, OpenDaysSystemFunction.class, "OpenDaysSystemFunction
		// gmResetOpenTimeClear fixTime");
		// }
		// }
	}

	/**
	 * 获取活动开启第几天
	 * 
	 * @return 0未开启 1第一天 2第二天
	 */
	public int getOpenDays(int sysId) {
		int bid = checkSystemOpenBySysId(sysId);
		if (bid == -1) {
			return 0;
		}
		ConcurrentHashMap<Integer, OpenSystemInfo> openMap = OpenDaysSystemSysCache.getOpenMap();
		OpenSystemInfo openSystemInfo = openMap.get(bid);
		int startTime = openSystemInfo.getStartTime();
		int day = TimeDateUtil.betweenCurrTimeOverDay(startTime);
		return day;
	}

}
