package com.teamtop.system.exclusiveActivity;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.HeroOpTaskRunnable;
import com.teamtop.system.exclusiveActivity.model.ExActStateInfo;
import com.teamtop.system.exclusiveActivity.model.ExclusiveActivityData;
import com.teamtop.system.exclusiveActivity.model.ExclusiveActivityInfo;
import com.teamtop.system.exclusiveActivity.model.ExclusiveActivityModel;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_zshdb_315;
import excel.struct.Struct_zshdb_315;

public class ExclusiveActivityFunction {

	private static ExclusiveActivityFunction ins;

	private ExclusiveActivityFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized ExclusiveActivityFunction getIns() {
		if (ins == null) {
			ins = new ExclusiveActivityFunction();
		}
		return ins;
	}

	public boolean checkHeroExActOpen(Hero hero, int id, boolean... isEnd) {
		try {
			if (isEnd == null) {
				if (!ExclusiveActivitySysCache.isOpenState()) {
					return false;
				}
			}
			Struct_zshdb_315 zshdb_315 = Config_zshdb_315.getIns().get(id);
			int actId = zshdb_315.getHdid();
			if (!HeroFunction.getIns().checkSystemOpen(hero, actId)) {
				return false;
			}
			if(!checkExActOpen(id)) {
				return false;
			}
			int vipLv = hero.getVipLv();
			ExclusiveActivityData exActData = hero.getExclusiveActivityData();
			if (exActData != null) {
				Map<Integer, ExclusiveActivityModel> exActivityMap = exActData.getExActivityMap();
				if (exActivityMap != null) {
					ExclusiveActivityModel activityModel = exActivityMap.get(id);
					if (activityModel != null) {
						vipLv = activityModel.getVipLv();
					}
				}
			}
			int[][] vip = zshdb_315.getVip();
			if (vipLv < vip[0][0] || vipLv > vip[0][1]) {
				return false;
			}
			AbsExclusiveActivityManager exActMgr = ExclusiveActivitySysCache.getExActMgr(actId);
			if (exActMgr == null) {
				LogTool.info("actId=====" + actId + ", mgr=null", ExclusiveActivityFunction.class);
			}
			if(!exActMgr.checkActOpen(hero)) {
				return false;
			}
			return true;
		} catch (Exception e) {
			LogTool.error(e, ExclusiveActivityFunction.class, "ExclusiveActivityFunction checkHeroExActOpen id="+id);
			return false;
		}
	}

	public boolean checkExActOpen(int id, boolean... isEnd) {
		try {
			if (isEnd == null) {
				if (!ExclusiveActivitySysCache.isOpenState()) {
					return false;
				}
			}
			Struct_zshdb_315 zshdb_315 = Config_zshdb_315.getIns().get(id);
			String wdid = zshdb_315.getWdid();
			if (!GameProperties.platform.equals(wdid)) {
				return false;
			}
			int[][] fwq = zshdb_315.getFwq();
			int zoneId = GameProperties.getFirstZoneId();
			if (zoneId < fwq[0][0] || zoneId > fwq[0][1]) {
				return false;
			}
			String hstart = zshdb_315.getHstart();
			String hend = zshdb_315.getHend();
			int startTime = TimeDateUtil.getTimeIntByStrTime(hstart, "yyyy-MM-dd hh:mm:ss");
			int endTime = TimeDateUtil.getTimeIntByStrTime(hend, "yyyy-MM-dd hh:mm:ss");
			int currentTime = TimeDateUtil.getCurrentTime();
			if (currentTime >= startTime && currentTime < endTime) {
				return true;
			}
		} catch (Exception e) {
			LogTool.error(e, ExclusiveActivityFunction.class, "ExclusiveActivityFunction checkExActOpen id=" + id);
		}
		return false;
	}

	/**
	 * 检测是否还没到开活动时间
	 * @param id
	 * @return
	 */
	public boolean checkExActBeforeStart(int id) {
		try {
			Struct_zshdb_315 zshdb_315 = Config_zshdb_315.getIns().get(id);
			String hstart = zshdb_315.getHstart();
			String hend = zshdb_315.getHend();
			int startTime = TimeDateUtil.getTimeIntByStrTime(hstart, "yyyy-MM-dd hh:mm:ss");
			int endTime = TimeDateUtil.getTimeIntByStrTime(hend, "yyyy-MM-dd hh:mm:ss");
			int currentTime = TimeDateUtil.getCurrentTime();
			if (currentTime < startTime) {
				return true;
			}
		} catch (Exception e) {
			LogTool.error(e, ExclusiveActivityFunction.class,
					"ExclusiveActivityFunction checkExActBeforeStart id=" + id);
		}
		return false;
	}

	/**
	 * 检测是否活动时间内
	 * @param id
	 * @return
	 */
	public boolean checkExActTime(int id) {
		try {
			Struct_zshdb_315 zshdb_315 = Config_zshdb_315.getIns().get(id);
			String hstart = zshdb_315.getHstart();
			String hend = zshdb_315.getHend();
			int startTime = TimeDateUtil.getTimeIntByStrTime(hstart, "yyyy-MM-dd hh:mm:ss");
			int endTime = TimeDateUtil.getTimeIntByStrTime(hend, "yyyy-MM-dd hh:mm:ss");
			int currentTime = TimeDateUtil.getCurrentTime();
			if (currentTime >= startTime && currentTime < endTime) {
				return true;
			}
		} catch (Exception e) {
			LogTool.error(e, ExclusiveActivityFunction.class,
					"ExclusiveActivityFunction checkExActBeforeStart id=" + id);
		}
		return false;
	}

	/**
	 * 专属活动开启检测
	 * @param hero
	 * @param isLogin
	 */
	public void exActOpen(Hero hero, boolean isLogin) {
		try {
			if (!ExclusiveActivitySysCache.isOpenState()) {
				return;
			}
			Map<Integer, ExclusiveActivityInfo> openExActMap = ExclusiveActivitySysCache.getOpenExActMap();
			Map<Integer, AbsExclusiveActivityManager> exActManagerMap = ExclusiveActivitySysCache.getExActManagerMap();
			Iterator<Entry<Integer, ExclusiveActivityInfo>> iterator = openExActMap.entrySet().iterator();
			int id = 0;
			Entry<Integer, ExclusiveActivityInfo> entry = null;
			ExclusiveActivityInfo info = null;
			Struct_zshdb_315 struct_zshdb_315 = null;
			int startTime = 0;
			int endTime = 0;
			int actId = 0;
			long hid = hero.getId();
			ExclusiveActivityData exclusiveActivityData = hero.getExclusiveActivityData();
			Map<Integer, ExActStateInfo> exActOpenStateMap = exclusiveActivityData.getExActOpenStateMap();
			Map<Integer, ExclusiveActivityModel> exActivityMap = exclusiveActivityData.getExActivityMap();
			for (; iterator.hasNext();) {
				entry = iterator.next();
				id = entry.getKey();
				info = entry.getValue();
				if (info.getState() == ExclusiveActivityConst.STATE_CLOSE) {
					continue;
				}
				try {
					if (checkHeroExActOpen(hero, id)) {
						if (exActivityMap.containsKey(id)) {
							continue;
						}
						if (!exActOpenStateMap.containsKey(id)) {
							struct_zshdb_315 = Config_zshdb_315.getIns().get(id);
							actId = struct_zshdb_315.getHdid();
							AbsExclusiveActivityManager manager = exActManagerMap.get(actId);
							ExclusiveActivityModel exActData = manager.createExclusiveActivityModel(hero, id);
							exActData.setId(id);
							exActData.setHid(hid);
							exActData.setActId(actId);
							exActData.setQs(struct_zshdb_315.getQs());
							exActData.setVipLv(hero.getVipLv());
							exActivityMap.put(id, exActData);
							manager.heroActOpen(hero, id);
							startTime = info.getStartTime();
							endTime = info.getEndTime();
							// if (!isLogin) {
								ExclusiveActivitySender.sendCmd_7902(hid, id, startTime, endTime, 1);
							// }
							ExActStateInfo stateInfo = new ExActStateInfo();
							stateInfo.setId(id);
							stateInfo.setActId(actId);
							stateInfo.setStartTime(startTime);
							exActOpenStateMap.put(id, stateInfo);
						}
					} else {
						if (!checkExActBeforeStart(id)) {
							ExActStateInfo stateInfo = new ExActStateInfo();
							stateInfo.setId(id);
							stateInfo.setStartTime(info.getStartTime());
							exActOpenStateMap.put(id, stateInfo);
						}
					}
				} catch (Exception e) {
					LogTool.error(e, ExclusiveActivityFunction.class, hid, hero.getName(),
							"ExclusiveActivityFunction exActOpen id=" + id);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, ExclusiveActivityFunction.class, hero.getId(), hero.getName(),
					"ExclusiveActivityFunction exActOpen");
		}
	}

	public void exActEnd(Hero hero) {
		try {
//			if (!ExclusiveActivitySysCache.isOpenState()) {
//				return;
//			}
			long hid = hero.getId();
			Map<Integer, Struct_zshdb_315> map = Config_zshdb_315.getIns().getMap();
			ExclusiveActivityData exActData = hero.getExclusiveActivityData();
			Map<Integer, ExclusiveActivityModel> exActivityMap = exActData.getExActivityMap();
			Map<Integer, ExActStateInfo> exActOpenStateMap = exActData.getExActOpenStateMap();
			Set<Integer> idSet = new HashSet<>(exActivityMap.keySet());
			Iterator<Integer> iterator = idSet.iterator();
			int id = 0;
			ExclusiveActivityModel exActModel = null;
			int actId = 0;
			AbsExclusiveActivityManager manager = null;
			Struct_zshdb_315 zshdb_315 = null;
			String hstart = "";
			String hend = "";
			int startTime = 0;
			int endTime = 0;
			for (; iterator.hasNext();) {
				id = iterator.next();
				try {
					if (!checkHasData(hero, id)) {
						exActModel = exActivityMap.get(id);
						if (exActModel != null) {
							actId = exActModel.getActId();
							manager = ExclusiveActivitySysCache.getExActMgr(actId);
							manager.heroActEnd(hero, id);
							exActivityMap.remove(id);
							exActOpenStateMap.remove(id);
							zshdb_315 = map.get(id);
							hstart = zshdb_315.getHstart();
							hend = zshdb_315.getHend();
							startTime = TimeDateUtil.getTimeIntByStrTime(hstart, "yyyy-MM-dd hh:mm:ss");
							endTime = TimeDateUtil.getTimeIntByStrTime(hend, "yyyy-MM-dd hh:mm:ss");
							ExclusiveActivitySender.sendCmd_7902(hid, id, startTime, endTime, 0);
						} else {
							exActivityMap.remove(id);
							exActOpenStateMap.remove(id);
						}
					}
				} catch (Exception e) {
					LogTool.error(e, ExclusiveActivityFunction.class, hero.getId(), hero.getName(),
							"ExclusiveActivityFunction exActEnd id=" + id);
				}
			}
			Set<Integer> openidSet = new HashSet<>(exActOpenStateMap.keySet());
			for (int aid : openidSet) {
				Struct_zshdb_315 zshdb_3152 = Config_zshdb_315.getIns().get(aid);
				if (zshdb_3152 == null) {
					exActOpenStateMap.remove(aid);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, ExclusiveActivityFunction.class, hero.getId(), hero.getName(),
					"ExclusiveActivityFunction exActEnd");
		}
	}
	
	/**
	 * 初始化活动表时使用的 方法
	 */
	public void checkActOpenInitExcel() {
		try {
			if (!ExclusiveActivitySysCache.isOpenState()) {
				return;
			}
			Map<Integer, ExclusiveActivityInfo> openExActMap = ExclusiveActivitySysCache.getOpenExActMap();
			Map<Integer, AbsExclusiveActivityManager> exActManagerMap = ExclusiveActivitySysCache.getExActManagerMap();
			Map<Integer, Struct_zshdb_315> map = ExclusiveActivitySysCache.getExActPfMap();// Config_zshdb_315.getIns().getMap();
			Iterator<Entry<Integer, Struct_zshdb_315>> iterator = map.entrySet().iterator();
			Entry<Integer, Struct_zshdb_315> entry = null;
			int id = 0;
			Struct_zshdb_315 zshdb_315 = null;
			String hstart = "";
			String hend = "";
			int startTime = 0;
			int endTime = 0;
			int actId = 0;
			for (; iterator.hasNext();) {
				entry = iterator.next();
				id = entry.getKey();
				try {
					if (!checkExActOpen(id)) {
						continue;
					}
					if (openExActMap.keySet().contains(id)) {
						continue;
					}
					zshdb_315 = entry.getValue();
					actId = zshdb_315.getHdid();
					AbsExclusiveActivityManager manager = exActManagerMap.get(actId);
					if (!manager.checkExcel()) {
						// 配置表没数据不开
						continue;
					}
					hstart = zshdb_315.getHstart();
					hend = zshdb_315.getHend();
					startTime = TimeDateUtil.getTimeIntByStrTime(hstart, "yyyy-MM-dd hh:mm:ss");
					endTime = TimeDateUtil.getTimeIntByStrTime(hend, "yyyy-MM-dd hh:mm:ss");
					ExclusiveActivityInfo info = new ExclusiveActivityInfo();
					info.setId(id);
					info.setActId(zshdb_315.getHdid());
					info.setPeriods(zshdb_315.getQs());
					info.setStartTime(startTime);
					info.setEndTime(endTime);
					info.setType(zshdb_315.getType());
					openExActMap.put(id, info);
					// 调用活动开启处理
					manager.handleOpenPub();
					handlePlayer(manager, info);
				} catch (Exception e) {
					LogTool.error(e, ExclusiveActivityFunction.class,
							"ExclusiveActivityFunction checkExActOpen id=" + id);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, ExclusiveActivityFunction.class, "ExclusiveActivityFunction checkExActOpen");
		}
	}

	/** 检测活动开启 
	 * @param handlePlayer //是否处理玩家开启， true 处理,（不处理的情况：过零点，只检测公共活动开启，个人活动开启在个人零点处理）
	 * 
	 * */
	public void checkExActOpen(boolean handlePlayer) {
		try {
			if (!ExclusiveActivitySysCache.isOpenState()) {
				return;
			}
			Map<Integer, ExclusiveActivityInfo> openExActMap = ExclusiveActivitySysCache.getOpenExActMap();
			Map<Integer, AbsExclusiveActivityManager> exActManagerMap = ExclusiveActivitySysCache.getExActManagerMap();
			Map<Integer, Struct_zshdb_315> map = ExclusiveActivitySysCache.getExActPfMap();// Config_zshdb_315.getIns().getMap();
			Iterator<Entry<Integer, Struct_zshdb_315>> iterator = map.entrySet().iterator();
			Entry<Integer, Struct_zshdb_315> entry = null;
			int id = 0;
			Struct_zshdb_315 zshdb_315 = null;
			String hstart = "";
			String hend = "";
			int startTime = 0;
			int endTime = 0;
			int actId = 0;
			for (; iterator.hasNext();) {
				entry = iterator.next();
				id = entry.getKey();
				try {
					if (!checkExActOpen(id)) {
						continue;
					}
					if (openExActMap.keySet().contains(id)) {
						continue;
					}
					zshdb_315 = entry.getValue();
					actId = zshdb_315.getHdid();
					AbsExclusiveActivityManager manager = exActManagerMap.get(actId);
					if (!manager.checkExcel()) {
						// 配置表没数据不开
						continue;
					}
					hstart = zshdb_315.getHstart();
					hend = zshdb_315.getHend();
					startTime = TimeDateUtil.getTimeIntByStrTime(hstart, "yyyy-MM-dd hh:mm:ss");
					endTime = TimeDateUtil.getTimeIntByStrTime(hend, "yyyy-MM-dd hh:mm:ss");
					ExclusiveActivityInfo info = new ExclusiveActivityInfo();
					info.setId(id);
					info.setActId(zshdb_315.getHdid());
					info.setPeriods(zshdb_315.getQs());
					info.setStartTime(startTime);
					info.setEndTime(endTime);
					info.setType(zshdb_315.getType());
					openExActMap.put(id, info);
					// 调用活动开启处理
					manager.handleOpenPub();
					if (handlePlayer) {
						handlePlayer(manager, info);
					}
				} catch (Exception e) {
					LogTool.error(e, ExclusiveActivityFunction.class,
							"ExclusiveActivityFunction checkExActOpen id=" + id);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, ExclusiveActivityFunction.class, "ExclusiveActivityFunction checkExActOpen");
		}
	}

	public void handlePlayer(AbsExclusiveActivityManager manager, ExclusiveActivityInfo info) {
		int id = info.getId();
		try {
			Iterator<Hero> iterator = HeroCache.getHeroMap().values().iterator();
			for (; iterator.hasNext();) {
				final Hero hero = iterator.next();
				if (hero.getExclusiveActivityData() == null) {
					continue;
				}
				OpTaskExecutorService.DefaultService.execute(new HeroOpTaskRunnable() {

					@Override
					public void run() {
						try {
							ExclusiveActivityData exclusiveActivityData = hero.getExclusiveActivityData();
							Map<Integer, ExActStateInfo> exActOpenStateMap = exclusiveActivityData.getExActOpenStateMap();
							Map<Integer, ExclusiveActivityModel> exActivityMap = exclusiveActivityData.getExActivityMap();
							if (checkHeroExActOpen(hero, id)) {
								if(!exActOpenStateMap.containsKey(id)) {
									Struct_zshdb_315 struct_zshdb_315 = Config_zshdb_315.getIns().get(id);
									int actId = struct_zshdb_315.getHdid();
									long hid = hero.getId();
									ExclusiveActivityModel exActData = manager.createExclusiveActivityModel(hero, id);
									exActData.setId(id);
									exActData.setHid(hid);
									exActData.setActId(actId);
									exActData.setQs(struct_zshdb_315.getQs());
									exActData.setVipLv(hero.getVipLv());
									exActivityMap.put(id, exActData);
									manager.heroActOpen(hero, id);
									int startTime = info.getStartTime();
									int endTime = info.getEndTime();
									ExclusiveActivitySender.sendCmd_7902(hid, id, startTime, endTime, 1);
									ExActStateInfo stateInfo = new ExActStateInfo();
									stateInfo.setId(id);
									stateInfo.setActId(actId);
									stateInfo.setStartTime(startTime);
									exActOpenStateMap.put(id, stateInfo);
								}
							} else {
								if (!checkExActBeforeStart(id)) {
									ExActStateInfo stateInfo = new ExActStateInfo();
									stateInfo.setId(id);
									stateInfo.setStartTime(info.getStartTime());
									exActOpenStateMap.put(id, stateInfo);
								}
							}
						} catch (Exception e) {
							LogTool.error(e, ExclusiveActivityFunction.class, "ExclusiveActivityFunction handlePlayer id=" + id+", hid="+hero.getId());
						}
					}

					@Override
					public Object getSession() {
						// TODO Auto-generated method stub
						return hero.getId();
					}
				});
			}
		} catch (Exception e) {
			LogTool.error(e, ExclusiveActivityFunction.class, "ExclusiveActivityFunction handlePlayer id=" + id);
		}
	}

	/**
	 * 检测活动结束
	 */
	public void checkExActEnd() {
		try {
//			if (!ExclusiveActivitySysCache.isOpenState()) {
//				return;
//			}
			Map<Integer, AbsExclusiveActivityManager> exActManagerMap = ExclusiveActivitySysCache.getExActManagerMap();
			Map<Integer, ExclusiveActivityInfo> openExActMap = ExclusiveActivitySysCache.getOpenExActMap();
			Set<Integer> keySet = new HashSet<>(openExActMap.keySet());

			Iterator<Integer> iterator = keySet.iterator();
			int id = 0;
			for (; iterator.hasNext();) {
				id = iterator.next();
				try {
					ExclusiveActivityInfo exActInfo = openExActMap.get(id);
					if (!checkExActOpen(id)) {
						AbsExclusiveActivityManager manager = exActManagerMap.get(exActInfo.getActId());
						manager.handleEndPub();
						heroEndHandle(manager, exActInfo);
						openExActMap.remove(id);
					}
				} catch (Exception e) {
					LogTool.error(e, ExclusiveActivityFunction.class,
							"ExclusiveActivityFunction checkExActEnd id=" + id);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, ExclusiveActivityFunction.class, "ExclusiveActivityFunction checkExActEnd");
		}
	}

	public void heroEndHandle(AbsExclusiveActivityManager manager, ExclusiveActivityInfo exActInfo) {
		int id = exActInfo.getId();
		try {
			Iterator<Hero> iterator = HeroCache.getHeroMap().values().iterator();
			for (; iterator.hasNext();) {
				final Hero hero = iterator.next();
				if (hero.getExclusiveActivityData() == null) {
					continue;
				}
				OpTaskExecutorService.DefaultService.execute(new HeroOpTaskRunnable() {

					@Override
					public void run() {
						if (!checkExActOpen(id, true)) {
							long hid = hero.getId();
							try {
								ExclusiveActivityData exActData = hero.getExclusiveActivityData();
								Map<Integer, ExclusiveActivityModel> exActivityMap = exActData.getExActivityMap();
								Map<Integer, ExActStateInfo> exActOpenStateMap = exActData.getExActOpenStateMap();
								ExclusiveActivityModel exActModel = exActivityMap.get(id);
								if (exActModel != null) {
									manager.heroActEnd(hero, id);
									exActivityMap.remove(id);
									exActOpenStateMap.remove(id);
									int startTime = exActInfo.getStartTime();
									int endTime = exActInfo.getEndTime();
									ExclusiveActivitySender.sendCmd_7902(hid, id, startTime, endTime, 0);
								} else {
									exActivityMap.remove(id);
									exActOpenStateMap.remove(id);
								}
							} catch (Exception e) {
								LogTool.error(e, ExclusiveActivityFunction.class,
										"ExclusiveActivityFunction heroEndHandle id=" + id + ", hid=" + hid);
							}
						}
					}

					@Override
					public Object getSession() {
						// TODO Auto-generated method stub
						return hero.getId();
					}
				});
			}
		} catch (Exception e) {
			LogTool.error(e, ExclusiveActivityFunction.class, "ExclusiveActivityFunction heroEndHandle id=" + id);
		}
	}

	public void checkActTime() {

	}

	/**
	 * 专属活动登录
	 * @param hero
	 */
	public void login(Hero hero) {
		try {
			Map<Integer, ExclusiveActivityInfo> activityMap = ExclusiveActivitySysCache.getOpenExActMap();
			Map<Integer, AbsExclusiveActivityManager> actMgrMap = ExclusiveActivitySysCache.getExActManagerMap();
			Set<Integer> actIdSet = new HashSet<>(activityMap.keySet());
			Iterator<Integer> iterator = actIdSet.iterator();
			int id = 0;
			ExclusiveActivityInfo activityInfo = null;
			for (; iterator.hasNext();) {
				id = iterator.next();
				try {
					activityInfo = activityMap.get(id);
					if (checkExActOpen(id)) {
						AbsExclusiveActivityManager manager = actMgrMap.get(activityInfo.getActId());
						if (manager == null) {
							continue;
						}
						if (getExActData(hero, id) == null) {
							continue;
						}
						manager.getSystemEvent().login(hero, id);
					}
				} catch (Exception e) {
					LogTool.error(e, ExclusiveActivityFunction.class,  hero.getId(), hero.getName(), "activity login, id=" + id);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, ExclusiveActivityFunction.class,  hero.getId(), hero.getName(), "ExclusiveActivityFunction activity login");
		}
	}

	/**
	 * 登录重置
	 * @param hero
	 * @param now
	 */
	public void loginReset(Hero hero, int now) {
		try {
			Map<Integer, ExclusiveActivityInfo> activityMap = ExclusiveActivitySysCache.getOpenExActMap();
			Map<Integer, AbsExclusiveActivityManager> actMgrMap = ExclusiveActivitySysCache.getExActManagerMap();
			Set<Integer> actIdSet = new HashSet<>(activityMap.keySet());
			Iterator<Integer> iterator = actIdSet.iterator();
			int id = 0;
			ExclusiveActivityInfo activityInfo = null;
			for (; iterator.hasNext();) {
				id = iterator.next();
				try {
					activityInfo = activityMap.get(id);
					if (checkExActOpen(id)) {
						AbsExclusiveActivityManager manager = actMgrMap.get(activityInfo.getActId());
						if (manager == null) {
							continue;
						}
						if (getExActData(hero, id) == null) {
							continue;
						}
						manager.getSystemEvent().loginReset(hero, now, id);
					}
				} catch (Exception e) {
					LogTool.error(e, ExclusiveActivityFunction.class,  hero.getId(), hero.getName(), "ExclusiveActivityFunction activity loginReset, id=" + id);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, ExclusiveActivityFunction.class,  hero.getId(), hero.getName(), "ExclusiveActivityFunction activity loginReset");
		}
	}

	/**
	 * 升级
	 */
	public void levelUp(Hero hero, int newLv, int oldLv) {
		try {
			Map<Integer, ExclusiveActivityInfo> activityMap = ExclusiveActivitySysCache.getOpenExActMap();
			Map<Integer, AbsExclusiveActivityManager> actMgrMap = ExclusiveActivitySysCache.getExActManagerMap();
			Set<Integer> actIdSet = new HashSet<>(activityMap.keySet());
			Iterator<Integer> iterator = actIdSet.iterator();
			int id = 0;
			ExclusiveActivityInfo activityInfo = null;
			for (; iterator.hasNext();) {
				id = iterator.next();
				try {
					activityInfo = activityMap.get(id);
					if (checkExActOpen(id)) {
						AbsExclusiveActivityManager manager = actMgrMap.get(activityInfo.getActId());
						if (manager == null) {
							continue;
						}
						if (getExActData(hero, id) == null) {
							continue;
						}
						manager.getSystemEvent().levelUp(hero, newLv, oldLv, id);
					}
				} catch (Exception e) {
					LogTool.error(e, ExclusiveActivityFunction.class,  hero.getId(), hero.getName(), "ExclusiveActivityFunction activity levelUp, id=" + id);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, ExclusiveActivityFunction.class,  hero.getId(), hero.getName(), "ExclusiveActivityFunction activity levelUp");
		}
	}

	/**
	 * 通关处理
	 */
	public void passGuanqia(Hero hero, int passGuanqia) {
		try {
			Map<Integer, ExclusiveActivityInfo> activityMap = ExclusiveActivitySysCache.getOpenExActMap();
			Map<Integer, AbsExclusiveActivityManager> actMgrMap = ExclusiveActivitySysCache.getExActManagerMap();
			Set<Integer> actIdSet = new HashSet<>(activityMap.keySet());
			Iterator<Integer> iterator = actIdSet.iterator();
			int id = 0;
			ExclusiveActivityInfo activityInfo = null;
			for (; iterator.hasNext();) {
				id = iterator.next();
				try {
					activityInfo = activityMap.get(id);
					if (checkExActOpen(id)) {
						AbsExclusiveActivityManager manager = actMgrMap.get(activityInfo.getActId());
						if (manager == null) {
							continue;
						}
						if (getExActData(hero, id) == null) {
							continue;
						}
						manager.getSystemEvent().passGuanqia(hero, passGuanqia, id);
					}
				} catch (Exception e) {
					LogTool.error(e, ExclusiveActivityFunction.class,  hero.getId(), hero.getName(), "ExclusiveActivityFunction activity passGuanqia, id=" + id);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, ExclusiveActivityFunction.class,  hero.getId(), hero.getName(), "ExclusiveActivityFunction activity passGuanqia");
		}
	}

	/**
	 * 零点处理
	 * @param hero
	 * @param now
	 */
	public void zeroHero(Hero hero, int now) {
		try {
			Map<Integer, ExclusiveActivityInfo> activityMap = ExclusiveActivitySysCache.getOpenExActMap();
			Map<Integer, AbsExclusiveActivityManager> actMgrMap = ExclusiveActivitySysCache.getExActManagerMap();
			Set<Integer> actIdSet = new HashSet<>(activityMap.keySet());
			Iterator<Integer> iterator = actIdSet.iterator();
			int id = 0;
			ExclusiveActivityInfo activityInfo = null;
			for (; iterator.hasNext();) {
				id = iterator.next();
				try {
					activityInfo = activityMap.get(id);
					if (checkExActOpen(id)) {
						AbsExclusiveActivityManager manager = actMgrMap.get(activityInfo.getActId());
						if (manager == null) {
							continue;
						}
						if (getExActData(hero, id) == null) {
							continue;
						}
						manager.getSystemEvent().zeroHero(hero, now, id);
					}
				} catch (Exception e) {
					LogTool.error(e, ExclusiveActivityFunction.class,  hero.getId(), hero.getName(), "ExclusiveActivityFunction activity zeroHero, id=" + id);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, ExclusiveActivityFunction.class,  hero.getId(), hero.getName(), "ExclusiveActivityFunction activity zeroHero");
		}
	}

	/**
	 * 公共零点
	 * @param now
	 */
	public void zeroPub(int now) {
		try {
			Map<Integer, ExclusiveActivityInfo> activityMap = ExclusiveActivitySysCache.getOpenExActMap();
			Map<Integer, AbsExclusiveActivityManager> actMgrMap = ExclusiveActivitySysCache.getExActManagerMap();
			Set<Integer> actIdSet = new HashSet<>(activityMap.keySet());
			Iterator<Integer> iterator = actIdSet.iterator();
			int id = 0;
			ExclusiveActivityInfo activityInfo = null;
			for (; iterator.hasNext();) {
				id = iterator.next();
				try {
					activityInfo = activityMap.get(id);
					if (checkExActOpen(id)) {
						AbsExclusiveActivityManager manager = actMgrMap.get(activityInfo.getActId());
						if (manager == null) {
							continue;
						}
						manager.getSystemEvent().zeroPub(now, id);
					}
				} catch (Exception e) {
					LogTool.error(e, ExclusiveActivityFunction.class, "ExclusiveActivityFunction activity zeroPub, id=" + id);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, ExclusiveActivityFunction.class, "ExclusiveActivityFunction activity zeroPub");
		}
	}

	/**
	 * 登出
	 * @param hero
	 */
	public void logout(Hero hero) {
		try {
			Map<Integer, ExclusiveActivityInfo> activityMap = ExclusiveActivitySysCache.getOpenExActMap();
			Map<Integer, AbsExclusiveActivityManager> actMgrMap = ExclusiveActivitySysCache.getExActManagerMap();
			Set<Integer> actIdSet = new HashSet<>(activityMap.keySet());
			Iterator<Integer> iterator = actIdSet.iterator();
			int id = 0;
			ExclusiveActivityInfo activityInfo = null;
			for (; iterator.hasNext();) {
				id = iterator.next();
				try {
					activityInfo = activityMap.get(id);
					if (checkExActOpen(id)) {
						AbsExclusiveActivityManager manager = actMgrMap.get(activityInfo.getActId());
						if (manager == null) {
							continue;
						}
						if (getExActData(hero, id) == null) {
							continue;
						}
						manager.getSystemEvent().logout(hero, id);
					}
				} catch (Exception e) {
					LogTool.error(e, ExclusiveActivityFunction.class,  hero.getId(), hero.getName(), "ExclusiveActivityFunction activity logout, id=" + id);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, ExclusiveActivityFunction.class,  hero.getId(), hero.getName(), "ExclusiveActivityFunction activity logout");
		}
	}

	/**
	 * 获取个人活动数据
	 * @param hero
	 * @param id
	 * @return
	 */
	public ExclusiveActivityModel getExActData(Hero hero, int id) {
		ExclusiveActivityData activityData = hero.getExclusiveActivityData();
		if (activityData != null) {
			return activityData.getExActivityMap().get(id);
		}
		return null;
	}

	/**
	 * 检测数据是否存在,是否在活动时间内
	 * @param hero
	 * @param id
	 * @return
	 */
	public boolean checkHasData(Hero hero, int id) {
		ExclusiveActivityData activityData = hero.getExclusiveActivityData();
		if(activityData.getExActivityMap().containsKey(id)) {
			if (checkExActTime(id)) {
				ExclusiveActivityInfo activityInfo = ExclusiveActivitySysCache.getOpenExActMap().get(id);
				if (activityInfo != null) {
					if (activityInfo.getState() == ExclusiveActivityConst.STATE_CLOSE) {
						return false;
					}
				}
				return true;
			}
		}
		return false;
	}

	/** 更新主配置表*/
	public void updateExAct(Hero hero) {
		try {
			Map<Integer, Struct_zshdb_315> exActPfMap = ExclusiveActivitySysCache.getExActPfMap();
			Iterator<Struct_zshdb_315> iterator = exActPfMap.values().iterator();
			List<Object[]> exActDataList = new ArrayList<>();
			for (;iterator.hasNext();) {
				Struct_zshdb_315 struct = iterator.next();
				// [I:唯一idI:大活动类型I:活动idI:期数U:活动名称U:活动内容U:开始时间U:结束时间]专属活动配置数据
				exActDataList.add(new Object[] { struct.getId(), struct.getType(), struct.getHdid(), struct.getQs(),
						struct.getName(), struct.getNr(), struct.getHstart(), struct.getHend() });
			}
			ExclusiveActivitySender.sendCmd_7906(hero.getId(), exActDataList.toArray());
		} catch (Exception e) {
			LogTool.error(e, ExclusiveActivityFunction.class, hero.getId(), hero.getName(),
					"ExclusiveActivityFunction updateExAct");
		}
	}

	/** 发送专属活动配置*/
	public void sendExAct(Hero hero) {
		try {
//			List<Struct_zshdb_315> sortList = Config_zshdb_315.getIns().getSortList();
//			int size = sortList.size();
			//修复
			int currentTime = TimeDateUtil.getCurrentTime();
			Iterator<Struct_zshdb_315> iterator1 = Config_zshdb_315.getIns().getSortList().iterator();
			boolean changeState = false;
			int sevenDayTime = TimeDateUtil.ONE_DAY_INT * 14;
			for(;iterator1.hasNext();){
				Struct_zshdb_315 struct_zshdb_315 = iterator1.next();
				String hend = struct_zshdb_315.getHend();
				try {					
					int endTime = TimeDateUtil.getTimeIntByStrTime(hend, "yyyy-MM-dd hh:mm:ss") + sevenDayTime;
					if(endTime<currentTime) {
						iterator1.remove();
						Config_zshdb_315.getIns().getMap().remove(struct_zshdb_315.getId());
						changeState = true;
					}
				} catch (Exception e) {
					iterator1.remove();
					Config_zshdb_315.getIns().getMap().remove(struct_zshdb_315.getId());
					changeState = true;
				}
			}
			
			List<Object[]> exActDataList = new ArrayList<>();
			Map<Integer, Struct_zshdb_315> exActPfMap = ExclusiveActivitySysCache.getExActPfMap();
			if(changeState){
				ExclusiveActivitySysCache.houtaiInitExcel();
				exActPfMap = ExclusiveActivitySysCache.getExActPfMap();
			}
			Iterator<Struct_zshdb_315> iterator = exActPfMap.values().iterator();
			for (;iterator.hasNext();) {
				Struct_zshdb_315 struct = iterator.next();
				// [I:唯一idI:大活动类型I:活动idI:期数U:活动名称U:活动内容U:开始时间U:结束时间]专属活动配置数据
				exActDataList.add(new Object[] { struct.getId(), struct.getType(), struct.getHdid(), struct.getQs(),
						struct.getName(), struct.getNr(), struct.getHstart(), struct.getHend() });
			}
			ExclusiveActivitySender.sendCmd_7906(hero.getId(), exActDataList.toArray());

			// 各系统
			for (int actId : ExclusiveActivitySysCache.getExActManagerMap().keySet()) {
				try {
					AbsExclusiveActivityManager manager = ExclusiveActivitySysCache.getExActManagerMap().get(actId);
					manager.updateTable(hero);
				} catch (Exception e) {
					LogTool.error(e, ExclusiveActivityFunction.class, hero.getId(), hero.getName(),
							"ExclusiveActivityFunction updateTable actId=" + actId);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, ExclusiveActivityFunction.class, hero.getId(), hero.getName(),
					"ExclusiveActivityFunction sendExAct");
		}
	}

}
