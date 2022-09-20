package com.teamtop.system.activity;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.teamtop.cross.CrossZone;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.activity.model.ActivitySetting;
import com.teamtop.system.activity.model.HeroActivityData;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

public class ActivitySysEvent extends AbsSystemEvent {

	private static ActivitySysEvent activitySysEvent;

	private ActivitySysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static final ActivitySysEvent getIns() {
		if (activitySysEvent == null) {
			activitySysEvent = new ActivitySysEvent();
		}
		return activitySysEvent;
	}

	@Override
	public void init(Hero hero) {
		HeroActivityData heroActivityData = hero.getHeroActivityData();
		if (heroActivityData != null) {
			return;
		}
		HeroActivityData actData = new HeroActivityData();
		actData.setHid(hero.getId());
		List<ActivityData> heroActDataList = ActivityDao.getIns().findHeroAct(hero.getId(), hero.getZoneid());
		ConcurrentHashMap<Integer, ActivityData> actMap = new ConcurrentHashMap<>();
		actData.setActivityDataMap(actMap);
		int size = heroActDataList.size();
		for (int i = 0; i < size; i++) {
			try {
				ActivityData activityData = heroActDataList.get(i);
				long id = activityData.getId();
				int actId = activityData.getActId();
				activityData = (ActivityData) JSONObject.parseObject(activityData.getActStr(),
						ActivitySysCache.getActMgrByActId(actId).getActivityData());
				activityData.setId(id);
				actMap.put(actId, activityData);
			} catch (Exception e) {
				LogTool.error(e, ActivitySysEvent.class, hero.getId(), hero.getName(), "ActivitySysEvent init");
			}
		}
		hero.setHeroActivityData(actData);
	}

	@Override
	public void login(Hero hero) {
		// 处理结束活动
		ActivityFunction.getIns().actEnd(hero);
		// 登录检测
		ActivityFunction.getIns().actOpen(hero, true);
		sendActivity(hero);
		ActivityFunction.getIns().login(hero);
	}

	public void sendActivity(Hero hero) {
		Map<Integer, ActivityData> activityDataMap = hero.getHeroActivityData().getActivityDataMap();
		List<Object[]> typeActData = new ArrayList<>();
		Map<Integer, List<Object[]>> typeActMap = new HashMap<>();
		Iterator<ActivityData> actItr = activityDataMap.values().iterator();
		Map<Integer, ActivityInfo> activityMap = ActivitySysCache.getActivityMap();
		Map<Integer, Map<Integer, ActivitySetting>> actSettingMap = ActivitySysCache.getActSettingMap();
		ActivityData data = null;
		ActivityInfo activityInfo = null;
		int type = 0;
		int actId = 0;
		int periods = 0;
		for (; actItr.hasNext();) {
			data = actItr.next();
			actId = data.getActId();
			periods = data.getPeriods();
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, actId, periods)) {
				continue;
			}
			activityInfo = activityMap.get(actId);
			type = activityInfo.getType();
			List<Object[]> actList = typeActMap.get(type);
			if (actList == null) {
				actList = new ArrayList<>();
				typeActMap.put(type, actList);
			}
			int startTime = activityInfo.getStartTime();
			int endTime = activityInfo.getEndTime();
			LogTool.info(hero.getId(), hero.getName(), "没有修改  actindex:"+data.getIndexId()+" actid:"+data.getActId()+" Periods:"+data.getPeriods()+" startTime:"+TimeDateUtil.printTime(startTime)
			+" endTime:"+TimeDateUtil.printTime(endTime), ActivitySysEvent.class);
			Map<Integer, ActivitySetting> setMap = actSettingMap.get(actId);
			if (setMap != null) {
				ActivitySetting activitySetting = setMap.get(periods);
				if (activitySetting != null) {
					startTime = activitySetting.getStartTime();
					endTime = activitySetting.getEndTime();
					LogTool.info(hero.getId(), hero.getName(), "中途修改  actindex:"+data.getIndexId()+" actid:"+data.getActId()+" Periods:"+data.getPeriods()+" startTime:"+TimeDateUtil.printTime(startTime)
					+" endTime:"+TimeDateUtil.printTime(endTime), ActivitySysEvent.class);
				}
			}
			actList.add(new Object[] { data.getIndexId(), data.getActId(), data.getPeriods(),
					startTime, endTime });
			
			LogTool.info(hero.getId(), hero.getName(), "最终时间前段收到  actindex:"+data.getIndexId()+" actid:"+data.getActId()+" Periods:"+data.getPeriods()+" startTime:"+TimeDateUtil.printTime(startTime)
			+" endTime:"+TimeDateUtil.printTime(endTime), ActivitySysEvent.class);
		}
		Iterator<Integer> typeItr = typeActMap.keySet().iterator();
		for (; typeItr.hasNext();) {
			type = typeItr.next();
			typeActData.add(new Object[] { type, typeActMap.get(type).toArray() });
		}
		ActivitySender.sendCmd_2250(hero.getId(), typeActData.toArray());
	}

	@Override
	public void logoutSyncPub(Hero hero, int syncType) {
		// 登出个人活动数据保存
		HeroActivityData heroActivityData = hero.getHeroActivityData();
		if(heroActivityData==null) {
			return;
		}
		Map<Integer, ActivityData> activityDataMap = heroActivityData.getActivityDataMap();
		if (activityDataMap.size() > 0) {
			// 批量入库
			LogTool.info(hero.getId(), hero.getName(), JSON.toJSONString(activityDataMap), ActivityDao.class);
			// try {
			// ActivityDao.getIns().deleteAll(hero);
			// } catch (Exception e) {
			// LogTool.error(e, ActivitySysEvent.class, hero.getId(), hero.getName(),
			// "ActivitySysEvent logoutSyncPub");
			// }
			ActivityDao.getIns().saveActData(hero, activityDataMap);
		}
	}

	@Override
	public void levelUp(Hero hero, int newLv, int oldLv) {
		ActivityFunction.getIns().actOpen(hero, false);
		ActivityFunction.getIns().levelUp(hero, newLv, oldLv);
	}

	@Override
	public void passGuanqia(Hero hero, int passGuanqia) {
		ActivityFunction.getIns().actOpen(hero, false);
		ActivityFunction.getIns().passGuanqia(hero, passGuanqia);
	}

	@Override
	public void loginReset(Hero hero, int now) {
		// 处理结束活动
		ActivityFunction.getIns().actEnd(hero);
		ActivityFunction.getIns().loginReset(hero, now);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		// ActivityFunction.getIns().actEnd(hero);
		ActivityFunction.getIns().zeroHero(hero, now);
		ActivityFunction.getIns().actOpen(hero, false);
		sendActivity(hero);
	}

	@Override
	public void zeroPub(int now) {
		ActivityFunction.getIns().zeroPub(now);
		// 是否有活动结束
		ActivityFunction.getIns().checkActEnd();
		// 是否有活动开启（因为公共零点先与个人零点执行，如果这里检测活动开启，开启活动一些奖励状态重置了，然后跑个人零点时有个人数据重置并且需要补发奖励时就会有问题）
		// 新改成只触发公共开启，个人开启在个人零点处理
		ActivityFunction.getIns().checkActOpen(false);
	}

	@Override
	public void logout(Hero hero) {
		ActivityFunction.getIns().logout(hero);
	}

	@Override
	public void fixTime(int cmdId, int now) {
		if (CrossZone.isCrossServer()) {
			return;
		}
		if (cmdId == 1) {
			int hour = TimeDateUtil.getHour();
			int minute = TimeDateUtil.getMinute();
			if (hour == 0 && minute < 5) {
				// 不影响活动零点重置
				return;
			}
			// 定时检测活动状态
			ActivityFunction.getIns().checkActTime();
			// 是否有活动结束
			ActivityFunction.getIns().checkActEnd();
			// 是否有活动开启
			ActivityFunction.getIns().checkActOpen(true);
		}
	}

}
