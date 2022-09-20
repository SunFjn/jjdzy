package com.teamtop.system.activity;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.teamtop.cross.CrossZone;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.HeroOpTaskRunnable;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.activity.model.ActivitySetting;
import com.teamtop.system.activity.model.HeroActivityData;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.OpenDaysSystemSysCache;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_huodong_009;
import excel.struct.Struct_huodong_009;

public class ActivityFunction {

	private static ActivityFunction activityFunction;

	private ActivityFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized ActivityFunction getIns() {
		if (activityFunction == null) {
			activityFunction = new ActivityFunction();
		}
		return activityFunction;
	}

	/**
	 * 删除数据库中的活动数据
	 * @param hero
	 * @param actId 活动id
	 * @param periods 期数
	 */
	public void deleteActFromDB(Hero hero, int actId, int periods) {
		try {
			ActivityDao.getIns().deleteAct(hero, actId, periods);
		} catch (Exception e) {
			LogTool.error(e, ActivityFunction.class, hero.getId(), hero.getName(), "");
		}
	}

	/**
	 * 检测玩家对应活动是否开启 
	 * @param hero
	 * @param actId 活动id
	 * @param periods 期数
	 * @return
	 */
	public boolean checkHeroActOpen(Hero hero, int actId, int periods) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, actId)) {
				return false;
			}
			if (!checkActOpen(actId, periods)) {
				return false;
			}
			if (!checkSwitch(actId)) {
				return false;
			}
			AbstractActivityManager mgr = ActivitySysCache.getActMgrByActId(actId);
			if(mgr==null){
				LogTool.info("actId====="+actId+", mgr="+mgr, ActivityFunction.class);
			}
			if (!mgr.checkActOpen(hero)) {
				return false;
			}
			return true;
		} catch (Exception e) {
			LogTool.error(e, ActivityFunction.class, hero.getId(), hero.getName(), "");
			return false;
		}
	}
	/**
	 * 检测活动是否开启
	 * @param actId
	 * @return
	 */
	public boolean checkActOpen(int actId) {
		try {
			Map<Integer, ActivityInfo> activityMap = ActivitySysCache.getActivityMap();
			ActivityInfo activityInfo = activityMap.get(actId);
			if(activityInfo==null) {
				return false;
			}
		
			if (!checkActOpen(actId, activityInfo.getPeriods())) {
				return false;
			}
			if (!checkSwitch(actId)) {
				return false;
			}
			return true;
		} catch (Exception e) {
			LogTool.error(e, "checkActOpen has wrong actId:"+actId);
			return false;
		}
		
	}
	
	/**
	 * 检测玩家对应活动是否开启 
	 * @param hero
	 * @param actId 活动id
	 * @return
	 */
	public boolean checkHeroActOpen(Hero hero, int actId) {
		try {
			Map<Integer, ActivityInfo> activityMap = ActivitySysCache.getActivityMap();
			ActivityInfo activityInfo = activityMap.get(actId);
			if(activityInfo==null) {
				return false;
			}
			if (!HeroFunction.getIns().checkSystemOpen(hero, actId)) {
				return false;
			}
			if (!checkActOpen(actId, activityInfo.getPeriods())) {
				return false;
			}
			if (!checkSwitch(actId)) {
				return false;
			}
			AbstractActivityManager mgr = ActivitySysCache.getActMgrByActId(actId);
			if (!mgr.checkActOpen(hero)) {
				return false;
			}
			return true;
		} catch (Exception e) {
			LogTool.error(e, ActivityFunction.class, hero.getId(), hero.getName(), "");
			return false;
		}
	}

	/**
	 * 检测活动是否开启 
	 * @param actId 活动id
	 * @param periods 期数
	 * @return
	 */
	public boolean checkActOpen(int actId, int periods) {
		try {
			if (!HeroFunction.getIns().checkSystemOpenDay(actId)) {
				return false;
			}
			List<Struct_huodong_009> list = ActivitySysCache.getActIdMap().get(actId);
			ActivityCache activityCache = ActivitySysCache.getActivityCache();
			int startTime = 0;
			int endTime = 0;
			if (activityCache != null) {
				Map<Integer, Map<Integer, ActivitySetting>> actSettingMap = ActivitySysCache.getActSettingMap();
				Map<Integer, ActivitySetting> asMap = actSettingMap.get(actId);
				if (asMap != null) {
					ActivitySetting activitySetting = asMap.get(periods);
					if (activitySetting != null) {
						startTime = activitySetting.getStartTime();
						endTime = activitySetting.getEndTime();
					}
				}
			}
			if (startTime == 0) {
				if (list == null) {
					return false;
				}
				Struct_huodong_009 huodong = null;
				if (periods == 0) {
					huodong = list.get(0);
				} else {
					int size = list.size();
					for(int i=0;i<size;i++) {						
						if(list.get(i).getQs()==periods) {
							huodong = list.get(i);
							break;
						}
					}
				}
				if(huodong==null) {
					return false;
				}
				if (huodong.getHf()!=1) {
					String hstart = huodong.getHstart();
					String hend = huodong.getHend();
					startTime = TimeDateUtil.getTimeIntByStrTime(hstart, "yyyy-MM-dd hh:mm:ss");
					endTime = TimeDateUtil.getTimeIntByStrTime(hend, "yyyy-MM-dd hh:mm:ss");
				}else {
					//是合服活动
					int hefuTime = HeroCache.getHefuTime();
					int oneDayZeroTime = TimeDateUtil.getOneDayZeroTime(hefuTime);
					if (hefuTime!=0) {
						startTime=oneDayZeroTime;
						endTime=oneDayZeroTime+7*24*3600;
					}
				}
			}
			int currentTime = TimeDateUtil.getCurrentTime();
			if (currentTime < startTime || currentTime > endTime) {
				return false;
			}
			return true;
		} catch (Exception e) {
			LogTool.error(e, ActivityFunction.class, "ActivityFunction checkActOpen, actId="+actId);
			return false;
		}
	}

	/**
	 * 活动结束检测处理 （个人）
	 * @param hero
	 */
	public void actEnd(Hero hero) {
		try {
			HeroActivityData heroActivityData = hero.getHeroActivityData();
			Map<Integer, ActivityData> activityDataMap = heroActivityData.getActivityDataMap();
			Map<Integer, AbstractActivityManager> actMgrMap = ActivitySysCache.getActMgrMap();
			Set<Integer> actIdSet = new HashSet<>(activityDataMap.keySet());
			Iterator<Integer> iterator = actIdSet.iterator();
			int actId = 0;
			ActivityData activityData = null;
			for (; iterator.hasNext();) {
				actId = iterator.next();
				try {
					activityData = activityDataMap.get(actId);
					if (!checkActOpen(actId, activityData.getPeriods())) {
						// 活动结束
						try {							
							actMgrMap.get(actId).heroActEnd(hero);
						} catch (Exception e) {
							LogTool.error(e, ActivityFunction.class, hero.getId(), hero.getName(),
									"ActivityFunction actEnd heroActEnd, actId=" + actId);
						}
						activityDataMap.remove(actId);
						deleteActFromDB(hero, actId, activityData.getPeriods());
					}
				} catch (Exception e) {
					LogTool.error(e, ActivityFunction.class, hero.getId(), hero.getName(),
							"ActivityFunction actEnd, actId=" + actId);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, ActivityFunction.class, hero.getId(), hero.getName(), "ActivityFunction actEnd");
		}
	}

	/**
	 * 活动开启检测（个人）
	 * @param hero
	 */
	public void actOpen(Hero hero, boolean isLogin) {
		try {
			HeroActivityData heroActivityData = hero.getHeroActivityData();
			if (heroActivityData == null) {
				return;
			}
			Map<Integer, ActivityData> activityDataMap = heroActivityData.getActivityDataMap();
			Map<Integer, AbstractActivityManager> actMgrMap = ActivitySysCache.getActMgrMap();
			Map<Integer, ActivityInfo> activityMap = ActivitySysCache.getActivityMap();
			Set<Integer> actIdSet = new HashSet<>(activityMap.keySet());
			Iterator<Integer> iterator = actIdSet.iterator();
			int actId = 0;
			ActivityInfo activityInfo = null;
			ActivityData activityData = null;
			for (; iterator.hasNext();) {
				try {
					actId = iterator.next();
					activityInfo = activityMap.get(actId);
					if (checkHeroActOpen(hero, actId, activityInfo.getPeriods())
							|| (checkActOpen(actId, activityInfo.getPeriods())
									&& ActivitySysCache.isSpecialAct(actId))) {
						if (!activityDataMap.containsKey(actId)) {
							// 检测有新开活动
							activityData = ActivitySysCache.getActMgrByActId(actId).getActivityData(hero, activityInfo);
							// ActivityDao.getIns().insertData(hero, activityData);
							activityDataMap.put(actId, activityData);
							// 新开活动处理
							AbstractActivityManager manager = actMgrMap.get(actId);
							manager.heroActOpen(hero);
							ActivityDao.getIns().insertData(hero, activityData);
							if (!isLogin && checkHeroActOpen(hero, actId, activityInfo.getPeriods())) {
								ActivitySender.sendCmd_2256(hero.getId(), activityInfo.getType(),
										activityInfo.getIndex(), actId, activityInfo.getPeriods(),
										activityInfo.getStartTime(), activityInfo.getEndTime(), 1);
							}
						}
					}
				} catch (Exception e) {
					LogTool.error(e, ActivityFunction.class, hero.getId(), hero.getName(),
							"ActivityFunction actOpen， actId=" + actId);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, ActivityFunction.class, hero.getId(), hero.getName(), "ActivityFunction actOpen");
		}
	}

	/** 检测是否有活动结束并触发相应处理 */
	public void checkActEnd() {
		try {
			Map<Integer, ActivityInfo> activityMap = ActivitySysCache.getActivityMap();
			Map<Integer, AbstractActivityManager> actMgrMap = ActivitySysCache.getActMgrMap();
			Map<Integer, Map<Integer, ActivitySetting>> actSettingMap = ActivitySysCache.getActSettingMap();
			Set<Integer> actIdSet = new HashSet<>(activityMap.keySet());
			Iterator<Integer> iterator = actIdSet.iterator();
			int actId = 0;
			ActivityInfo activityInfo = null;
			for (; iterator.hasNext();) {
				actId = iterator.next();
				try {
					activityInfo = activityMap.get(actId);
					if (!checkActOpen(actId, activityInfo.getPeriods())) {
						// 活动结束
						AbstractActivityManager manager = actMgrMap.get(actId);
						manager.actEnd();
						heroEndHandle(manager, activityInfo.getIndex(), actId, activityInfo.getPeriods());
						activityMap.remove(actId);
						Map<Integer, ActivitySetting> asMap = actSettingMap.get(actId);
						if (asMap != null) {
							asMap.remove(activityInfo.getPeriods());
						}
					}
				} catch (Exception e) {
					LogTool.error(e, ActivityFunction.class, "activity checkActEnd, actId=" + actId);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, ActivityFunction.class, "activity checkActEnd");
		}
	}

	/** 在线玩家活动关闭处理 */
	public void heroEndHandle(final AbstractActivityManager manager, final int index, final int actId, final int periods) {
		try {
			List<Long> removeList = new ArrayList<>();
			Iterator<Hero> iterator = HeroCache.getHeroMap().values().iterator();
			for (; iterator.hasNext();) {
				final Hero hero = iterator.next();
				OpTaskExecutorService.DefaultService.execute(new HeroOpTaskRunnable() {

					@Override
					public void run() {
						if(hero.getHeroActivityData()!=null) {
							Map<Integer, ActivityData> activityDataMap = hero.getHeroActivityData().getActivityDataMap();
							Map<Integer, ActivityInfo> activityMap = ActivitySysCache.getActivityMap();
							ActivityInfo activityInfo = activityMap.get(actId);
							if (!checkActOpen(actId, periods) && checkSwitch(actId)) {
								if (activityDataMap.containsKey(actId)) {
									manager.heroActEnd(hero);
									activityDataMap.remove(actId);
									ActivitySender.sendCmd_2256(hero.getId(), activityInfo.getType(), index, actId, periods,activityInfo.getStartTime(), activityInfo.getEndTime(), 0);
//								System.out.println("活动关闭，玩家："+hero.getName()+" actID:"+activityInfo.getActId()+" actIndex:"+activityInfo.getIndex()+" qs:"+activityInfo.getPeriods());
								}
							}
						}
					}

					@Override
					public Object getSession() {
						return hero.getId();
					}
				});
				removeList.add(hero.getId());
			}
			if (removeList.size() > 0) {
				ActivityDao.getIns().deleteAct(removeList, actId, periods);
			}
		} catch (Exception e) {
			LogTool.error(e, ActivityFunction.class, "activity heroEndHandle");
		}
	}

	/**
	 * 初始化活动表时使用的 方法
	 */
	public void checkActOpenInitExcel() {
		try {
			Map<Integer, ActivityInfo> activityMap = ActivitySysCache.getActivityMap();
			Map<Integer, Map<Integer, ActivitySetting>> actSettingMap = ActivitySysCache.getActSettingMap();
			Map<Integer, AbstractActivityManager> actMgrMap = ActivitySysCache.getActMgrMap();
			List<Struct_huodong_009> sortList = ActivitySysCache.getSortList();
			int size = sortList.size();
			Struct_huodong_009 huodong = null;
			for (int i = 0; i < size; i++) {
				huodong = sortList.get(i);
				int actId = huodong.getId();
				try {
					int qs = huodong.getQs();
					if (checkActOpen(actId, qs)) {
						// 检测是否在开启活动集合中
						if (activityMap.containsKey(actId)) {
							int periods = activityMap.get(actId).getPeriods();
							if (periods == qs) {
								// 已经在
								continue;
							} else {
								// 有老活动在，肯定是已经结束的，调用结束处理
								AbstractActivityManager manager = actMgrMap.get(actId);
								manager.actEnd();
								activityMap.remove(actId);
							}
						}
						// 检测第2周
						boolean otherWeek = checkOtherWeek(actId);
						if (!otherWeek) {
							continue;
						}
						int startTime = 0;
						int endTime = 0;
						int timeType = 0;
						Map<Integer, ActivitySetting> asMap = actSettingMap.get(actId);
						if (asMap != null) {
							ActivitySetting activitySetting = asMap.get(qs);
							if (activitySetting != null) {
								startTime = activitySetting.getStartTime();
								endTime = activitySetting.getEndTime();
								timeType = 1;
							}
						}
						if (startTime == 0) {
							if (huodong.getHf()!=1) {
								String hstart = huodong.getHstart();
								String hend = huodong.getHend();
								startTime = TimeDateUtil.getTimeIntByStrTime(hstart, "yyyy-MM-dd hh:mm:ss");
								endTime = TimeDateUtil.getTimeIntByStrTime(hend, "yyyy-MM-dd hh:mm:ss");
							}else {
								//是合服活动
								int hefuTime = HeroCache.getHefuTime();
								int oneDayZeroTime = TimeDateUtil.getOneDayZeroTime(hefuTime);
								if (hefuTime!=0) {
									startTime=oneDayZeroTime;
									endTime=oneDayZeroTime+7*24*3600;
								}
								
							}
							
						}
						ActivityInfo actInfo = new ActivityInfo(huodong.getIndex(), actId, qs, huodong.getType(),
								ActivityConst.SWITCH_ON, startTime, endTime, timeType);
						activityMap.put(actId, actInfo);
						// 调用活动开启处理
						AbstractActivityManager manager = actMgrMap.get(actId);
						if (manager == null) {
							continue;
						}
						manager.actOpen();
						heroOpenHandle(manager, actInfo);
					}
				} catch (Exception e) {
					LogTool.error(e, ActivityFunction.class, "activity checkActOpen, actId=" + actId);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, ActivityFunction.class, "activity checkActOpen");
		}
	}

	public boolean checkOtherWeek(int actId) {
		try {
			Map<Integer, Integer> actConflictMap = OpenDaysSystemSysCache.getActConflictMap();
			if (actConflictMap.containsKey(actId)) {
				Integer sysId = actConflictMap.get(actId);
				if (OpenDaysSystemFunction.getIns().isSystemActOpen(sysId)) {
					return false;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, ActivityFunction.class, "checkOtherWeek checkOtherWeek actId=" + actId);
		}
		return true;
	}

	/** 检测活动开启 
	 * @param handlePlayer //是否处理玩家开启， true 处理,（不处理的情况：过零点，只检测公共活动开启，个人活动开启在个人零点处理）
	 * 
	 * */
	public void checkActOpen(boolean handlePlayer) {
		try {
			if(CrossZone.isCrossServer()&&ActivitySysCache.getActivityCache()==null) {
				return;
			}
			Map<Integer, ActivityInfo> activityMap = ActivitySysCache.getActivityMap();
			Map<Integer, Map<Integer, ActivitySetting>> actSettingMap = ActivitySysCache.getActSettingMap();
			Map<Integer, AbstractActivityManager> actMgrMap = ActivitySysCache.getActMgrMap();
			List<Struct_huodong_009> sortList = Config_huodong_009.getIns().getSortList();
			int size = sortList.size();
			Struct_huodong_009 huodong = null;
			for (int i = 0; i < size; i++) {
				huodong = sortList.get(i);
				int actId = huodong.getId();
				try {
					int qs = huodong.getQs();
					if (checkActOpen(actId, qs)) {
						// 检测是否在开启活动集合中
						if (activityMap.containsKey(actId)) {
							int periods = activityMap.get(actId).getPeriods();
							if (periods == qs) {
								// 已经在
								continue;
							} else {
								// 有老活动在，肯定是已经结束的，调用结束处理
								AbstractActivityManager manager = actMgrMap.get(actId);
								manager.actEnd();
								activityMap.remove(actId);
							}
						}
						// 检测第2周
						boolean otherWeek = checkOtherWeek(actId);
						if (!otherWeek) {
							continue;
						}
						int startTime = 0;
						int endTime = 0;
						int timeType = 0;
						Map<Integer, ActivitySetting> asMap = actSettingMap.get(actId);
						if (asMap != null) {
							ActivitySetting activitySetting = asMap.get(qs);
							if (activitySetting != null) {
								startTime = activitySetting.getStartTime();
								endTime = activitySetting.getEndTime();
								timeType = 1;
							}
						}
						if (startTime == 0) {
							if (huodong.getHf()!=1) {
								String hstart = huodong.getHstart();
								String hend = huodong.getHend();
								startTime = TimeDateUtil.getTimeIntByStrTime(hstart, "yyyy-MM-dd hh:mm:ss");
								endTime = TimeDateUtil.getTimeIntByStrTime(hend, "yyyy-MM-dd hh:mm:ss");
							}else {
								//是合服活动
								int hefuTime = HeroCache.getHefuTime();
								int oneDayZeroTime = TimeDateUtil.getOneDayZeroTime(hefuTime);
								if (hefuTime!=0) {
									startTime=oneDayZeroTime;
									endTime=oneDayZeroTime+7*24*3600;
								}
								
							}
							
						}
						ActivityInfo actInfo = new ActivityInfo(huodong.getIndex(), actId, qs, huodong.getType(),
								ActivityConst.SWITCH_ON, startTime, endTime, timeType);
						activityMap.put(actId, actInfo);
						// 调用活动开启处理
						AbstractActivityManager manager = actMgrMap.get(actId);
						if (manager == null) {
							continue;
						}
						manager.actOpen();
						if (handlePlayer) {
							heroOpenHandle(manager, actInfo);
						}
					}
				} catch (Exception e) {
					LogTool.error(e, ActivityFunction.class, "activity checkActOpen, actId=" + actId);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, ActivityFunction.class, "activity checkActOpen");
		}
	}

	public void checkActTime() {
		ActivityCache activityCache = ActivitySysCache.getActivityCache();
		if(CrossZone.isCrossServer()&&activityCache==null) {
			return;
		}
		Map<Integer, ActivityInfo> activityMap = ActivitySysCache.getActivityMap();
		Map<Integer, Map<Integer, ActivitySetting>> actSettingMap = ActivitySysCache.getActSettingMap();
		List<Struct_huodong_009> sortList = ActivitySysCache.getSortList();
		int size = sortList.size();
		Struct_huodong_009 huodong = null;
		for (int i = 0; i < size; i++) {
			try {
				huodong = sortList.get(i);
				int actId = huodong.getId();
				ActivityInfo activityInfo = activityMap.get(actId);
				if (activityInfo == null) {
					continue;
				}
				int qs = huodong.getQs();
				if (qs != activityInfo.getPeriods()) {
					continue;
				}
				Map<Integer, ActivitySetting> asMap = actSettingMap.get(actId);
				int startTime = 0;
				int endTime = 0;
				if (asMap != null) {
					ActivitySetting activitySetting = asMap.get(qs);
					if (activitySetting != null) {
						startTime = activitySetting.getStartTime();
						endTime = activitySetting.getEndTime();
					}
				}
				if (startTime == 0) {
					if (huodong.getHf()!=1) {
						String hstart = huodong.getHstart();
						String hend = huodong.getHend();
						startTime = TimeDateUtil.getTimeIntByStrTime(hstart, "yyyy-MM-dd hh:mm:ss");
						endTime = TimeDateUtil.getTimeIntByStrTime(hend, "yyyy-MM-dd hh:mm:ss");
					}else {
						//是合服活动
						int hefuTime = HeroCache.getHefuTime();
						int oneDayZeroTime = TimeDateUtil.getOneDayZeroTime(hefuTime);
						if (hefuTime!=0) {
							startTime=oneDayZeroTime;
							endTime=oneDayZeroTime+7*24*3600;
						}
						
					}
				}
				if (startTime > 0 && (startTime != activityInfo.getStartTime() || endTime!=activityInfo.getEndTime())) {
					activityInfo.setStartTime(startTime);
					activityInfo.setEndTime(endTime);
				}
			} catch (Exception e) {
				LogTool.error(e, ActivityFunction.class, "activity checkActTime");
			}
		}
	}

	/** 在线玩家活动开启处理 */
	public void heroOpenHandle(final AbstractActivityManager manager, final ActivityInfo actInfo) {
		try {
			final int actId = actInfo.getActId();
			final int periods = actInfo.getPeriods();
			Iterator<Hero> iterator = HeroCache.getHeroMap().values().iterator();
			for (; iterator.hasNext();) {
				final Hero hero = iterator.next();
				if(hero.getHeroActivityData()==null) {
					continue;
				}
				OpTaskExecutorService.DefaultService.execute(new HeroOpTaskRunnable() {

					@Override
					public void run() {
						Map<Integer, ActivityData> activityDataMap = hero.getHeroActivityData().getActivityDataMap();
						if (checkHeroActOpen(hero, actId, periods)
								|| (checkActOpen(actId, periods) && ActivitySysCache.isSpecialAct(actId))) {
							if (!activityDataMap.containsKey(actId)) {
								ActivityData activityData = ActivitySysCache.getActMgrByActId(actId)
										.getActivityData(hero, actInfo);
								// ActivityDao.getIns().insertData(hero, activityData);
								activityDataMap.put(actId, activityData);
								manager.heroActOpen(hero);
								ActivityDao.getIns().insertData(hero, activityData);
								if(checkHeroActOpen(hero, actId, periods)) {									
									ActivitySender.sendCmd_2256(hero.getId(), actInfo.getType(), actInfo.getIndex(), actId, actInfo.getPeriods(), actInfo.getStartTime(), actInfo.getEndTime(), 1);
//									System.out.println("活动开启，玩家："+hero.getName()+" actID:"+actInfo.getActId()+" actIndex:"+actInfo.getIndex()+" qs:"+actInfo.getPeriods());
								}
							}
						}
					}

					@Override
					public Object getSession() {
						return hero.getId();
					}
				});
			}
		} catch (Exception e) {
			LogTool.error(e, ActivityFunction.class, "activity heroOpenHandle");
		}
	}

	/**
	 * 零点处理
	 * 
	 * @param hero
	 * @param now
	 */
	public void zeroHero(Hero hero, int now) {
		try {
			Map<Integer, ActivityInfo> activityMap = ActivitySysCache.getActivityMap();
			Map<Integer, AbstractActivityManager> actMgrMap = ActivitySysCache.getActMgrMap();
			Set<Integer> actIdSet = new HashSet<>(activityMap.keySet());
			Iterator<Integer> iterator = actIdSet.iterator();
			int actId = 0;
			ActivityInfo activityInfo = null;
			for (; iterator.hasNext();) {
				actId = iterator.next();
				try {
					activityInfo = activityMap.get(actId);
					if (checkActOpen(actId, activityInfo.getPeriods())) {
						AbstractActivityManager manager = actMgrMap.get(actId);
						if (manager == null) {
							continue;
						}
						ActivityData activityData = hero.getHeroActivityData().getActivityDataMap().get(actId);
						if (activityData == null) {
							continue;
						}
						manager.getSystemEvent().zeroHero(hero, now);
					}
				} catch (Exception e) {
					LogTool.error(e, ActivityFunction.class, hero.getId(), hero.getName(), "activity zeroHero, actId=" + actId);
//					LogTool.error(e, ActivityFunction.class, "activity zeroHero, actId=" + actId);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, ActivityFunction.class, "activity zeroHero");
		}
	}

	/** 零点处理 */
	public void zeroPub(int now) {
		try {
			Map<Integer, ActivityInfo> activityMap = ActivitySysCache.getActivityMap();
			Map<Integer, AbstractActivityManager> actMgrMap = ActivitySysCache.getActMgrMap();
			Set<Integer> actIdSet = new HashSet<>(activityMap.keySet());
			Iterator<Integer> iterator = actIdSet.iterator();
			int actId = 0;
			ActivityInfo activityInfo = null;
			for (; iterator.hasNext();) {
				actId = iterator.next();
				try {
					activityInfo = activityMap.get(actId);
					if (checkActOpen(actId, activityInfo.getPeriods())) {
						AbstractActivityManager manager = actMgrMap.get(actId);
						if (manager == null) {
							continue;
						}
						manager.getSystemEvent().zeroPub(now);
					}
				} catch (Exception e) {
					LogTool.error(e, ActivityFunction.class, "activity zeroPub, actId=" + actId);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, ActivityFunction.class, "activity zeroPub");
		}
	}

	/** 登录重置 */
	public void loginReset(Hero hero, int now) {
		try {
			Map<Integer, ActivityInfo> activityMap = ActivitySysCache.getActivityMap();
			Map<Integer, AbstractActivityManager> actMgrMap = ActivitySysCache.getActMgrMap();
			Set<Integer> actIdSet = new HashSet<>(activityMap.keySet());
			Iterator<Integer> iterator = actIdSet.iterator();
			int actId = 0;
			ActivityInfo activityInfo = null;
			for (; iterator.hasNext();) {
				actId = iterator.next();
				try {
					activityInfo = activityMap.get(actId);
					if (checkActOpen(actId, activityInfo.getPeriods())) {
						AbstractActivityManager manager = actMgrMap.get(actId);
						if (manager == null) {
							continue;
						}
						if (ActivityFunction.getIns().getActivityData(hero, actId) == null) {
							continue;
						}
						manager.getSystemEvent().loginReset(hero, now);
					}
				} catch (Exception e) {
					LogTool.error(e, ActivityFunction.class, hero.getId(), hero.getName(),
							"activity loginReset, actId=" + actId);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, ActivityFunction.class,  hero.getId(), hero.getName(), "activity loginReset");
		}
	}

	public void login(Hero hero) {
		try {
			Map<Integer, ActivityInfo> activityMap = ActivitySysCache.getActivityMap();
			Map<Integer, AbstractActivityManager> actMgrMap = ActivitySysCache.getActMgrMap();
			Set<Integer> actIdSet = new HashSet<>(activityMap.keySet());
			Iterator<Integer> iterator = actIdSet.iterator();
			int actId = 0;
			ActivityInfo activityInfo = null;
			for (; iterator.hasNext();) {
				actId = iterator.next();
				try {
					activityInfo = activityMap.get(actId);
					if (checkActOpen(actId, activityInfo.getPeriods())) {
						AbstractActivityManager manager = actMgrMap.get(actId);
						if (manager == null) {
							continue;
						}
						manager.getSystemEvent().login(hero);
					}
				} catch (Exception e) {
					LogTool.error(e, ActivityFunction.class,  hero.getId(), hero.getName(), "activity login, actId=" + actId);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, ActivityFunction.class,  hero.getId(), hero.getName(), "activity login");
		}
	}

	public void levelUp(Hero hero, int newLv, int oldLv) {
		try {
			Map<Integer, ActivityInfo> activityMap = ActivitySysCache.getActivityMap();
			Map<Integer, AbstractActivityManager> actMgrMap = ActivitySysCache.getActMgrMap();
			Set<Integer> actIdSet = new HashSet<>(activityMap.keySet());
			Iterator<Integer> iterator = actIdSet.iterator();
			int actId = 0;
			ActivityInfo activityInfo = null;
			for (; iterator.hasNext();) {
				actId = iterator.next();
				try {
					activityInfo = activityMap.get(actId);
					if (checkActOpen(actId, activityInfo.getPeriods())) {
						AbstractActivityManager manager = actMgrMap.get(actId);
						if (manager == null) {
							continue;
						}
						manager.getSystemEvent().levelUp(hero, newLv, oldLv);
					}
				} catch (Exception e) {
					LogTool.error(e, ActivityFunction.class,  hero.getId(), hero.getName(), "activity levelUp, actId=" + actId);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, ActivityFunction.class,  hero.getId(), hero.getName(), "activity levelUp");
		}
	}

	public void passGuanqia(Hero hero, int passGuanqia) {
		try {
			Map<Integer, ActivityInfo> activityMap = ActivitySysCache.getActivityMap();
			Map<Integer, AbstractActivityManager> actMgrMap = ActivitySysCache.getActMgrMap();
			Set<Integer> actIdSet = new HashSet<>(activityMap.keySet());
			Iterator<Integer> iterator = actIdSet.iterator();
			int actId = 0;
			ActivityInfo activityInfo = null;
			for (; iterator.hasNext();) {
				actId = iterator.next();
				try {
					activityInfo = activityMap.get(actId);
					if (checkActOpen(actId, activityInfo.getPeriods())) {
						AbstractActivityManager manager = actMgrMap.get(actId);
						if (manager == null) {
							continue;
						}
						manager.getSystemEvent().passGuanqia(hero, passGuanqia);
					}
				} catch (Exception e) {
					LogTool.error(e, ActivityFunction.class,  hero.getId(), hero.getName(), "activity passGuanqia, actId=" + actId);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, ActivityFunction.class,  hero.getId(), hero.getName(), "activity passGuanqia");
		}
	}

	public void afterLogin(Hero hero) {
		try {
			Map<Integer, ActivityInfo> activityMap = ActivitySysCache.getActivityMap();
			Map<Integer, AbstractActivityManager> actMgrMap = ActivitySysCache.getActMgrMap();
			Set<Integer> actIdSet = new HashSet<>(activityMap.keySet());
			Iterator<Integer> iterator = actIdSet.iterator();
			int actId = 0;
			ActivityInfo activityInfo = null;
			for (; iterator.hasNext();) {
				actId = iterator.next();
				try {
					activityInfo = activityMap.get(actId);
					if (checkActOpen(actId, activityInfo.getPeriods())) {
						AbstractActivityManager manager = actMgrMap.get(actId);
						if (manager == null) {
							continue;
						}
						manager.getSystemEvent().afterLogin(hero);
					}
				} catch (Exception e) {
					LogTool.error(e, ActivityFunction.class,  hero.getId(), hero.getName(), "activity afterLogin, actId=" + actId);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, ActivityFunction.class,  hero.getId(), hero.getName(), "activity afterLogin");
		}
	}

	public void logout(Hero hero) {
		try {
			Map<Integer, ActivityInfo> activityMap = ActivitySysCache.getActivityMap();
			Map<Integer, AbstractActivityManager> actMgrMap = ActivitySysCache.getActMgrMap();
			Set<Integer> actIdSet = new HashSet<>(activityMap.keySet());
			Iterator<Integer> iterator = actIdSet.iterator();
			int actId = 0;
			ActivityInfo activityInfo = null;
			for (; iterator.hasNext();) {
				actId = iterator.next();
				try {
					activityInfo = activityMap.get(actId);
					if (checkActOpen(actId, activityInfo.getPeriods())) {
						AbstractActivityManager manager = actMgrMap.get(actId);
						if (manager == null) {
							continue;
						}
						manager.getSystemEvent().logout(hero);
					}
				} catch (Exception e) {
					LogTool.error(e, ActivityFunction.class,  hero.getId(), hero.getName(), "activity logout, actId=" + actId);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, ActivityFunction.class,  hero.getId(), hero.getName(), "activity logout");
		}
	}

//	/**
//	 * @param type 1修改活动时间,2修改活动开关,3添加一个新的已开启活动
//	 */
//	public void gmHandle(Hero hero, int type, String[] param) {}
	
	/** 获取个人活动数据 */
	public ActivityData getActivityData(Hero hero, int actId) {
		HeroActivityData heroActivityData = hero.getHeroActivityData();
		ActivityData activityData = heroActivityData.getActivityDataMap().get(actId);
		return activityData;
	}

	/** 检测活动开关 
	 */
	public boolean checkSwitch(int actId) {
		try {
			ActivityInfo activityInfo = ActivitySysCache.getActivityMap().get(actId);
			if(activityInfo==null) {
				return false;
			}
			if (activityInfo.getState() == ActivityConst.SWITCH_ON) {
				return true;
			}
			return false;
		} catch (Exception e) {
			LogTool.error(e, ActivityFunction.class, "ActivityFunction checkSwitch");
			return false;
		}
	}

	/** 
	 * 获取活动开启第几天
	 * @return	0未开启 1第一天  2第二天
	 */
	public int getActivityOpenDays(int actId) {
		ActivityInfo activityInfo = ActivitySysCache.getActivityMap().get(actId);
		if(activityInfo==null) {
			return 0;
		}
		if (activityInfo.getState() == ActivityConst.SWITCH_OFF) {
			return 0;
		}
		int startTime = activityInfo.getStartTime();
		int day = TimeDateUtil.betweenCurrTimeOverDay(startTime);
		return day;
	}


}
