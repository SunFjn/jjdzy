package com.teamtop.system.activity;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.activity.model.HeroActivityData;
import com.teamtop.system.gm.event.ActivitySysGMEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.log.LogTool;

public class ActivityManager {

	private static ActivityManager activityManager;

	private ActivityManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized ActivityManager getIns() {
		if (activityManager == null) {
			activityManager = new ActivityManager();
		}
		return activityManager;
	}

	/**
	 * 打开某类型活动界面
	 * 
	 * @param hero
	 * @param actType
	 */
	public void openActivityUI(Hero hero, int actType) {
		if (hero == null) {
			return;
		}
		try {
			Map<Integer, ActivityInfo> activityMap = ActivitySysCache.getActivityMap();
			HeroActivityData heroActivityData = hero.getHeroActivityData();
			Map<Integer, ActivityData> activityDataMap = heroActivityData.getActivityDataMap();
			Set<Integer> actIdSet = new HashSet<>(activityDataMap.keySet());
			Iterator<Integer> iterator = actIdSet.iterator();
			int actId = 0;
			ActivityData activityData = null;
			ActivityInfo activityInfo = null;
			List<Object[]> actData = new ArrayList<>();
			for (; iterator.hasNext();) {
				actId = iterator.next();
				activityData = activityDataMap.get(actId);
				activityInfo = activityMap.get(actId);
				if (activityInfo.getType() == actType) {
					actData.add(new Object[] { activityData.getIndexId(), activityData.getActId(),
							activityData.getPeriods(), activityInfo.getStartTime(), activityInfo.getEndTime() });
				}
			}
			ActivitySender.sendCmd_2252(hero.getId(), actType, actData.toArray());
		} catch (Exception e) {
			LogTool.error(e, ActivityManager.class, hero.getId(), hero.getName(), "ActivityManager openActivityUI");
		}
	}

	/**
	 * 请求某活动数据
	 * 
	 * @param hero
	 * @param actId
	 */
	public void openAct(Hero hero, int actId) {
		if (hero == null) {
			return;
		}
		try {
			HeroActivityData heroActivityData = hero.getHeroActivityData();
			Map<Integer, ActivityData> activityDataMap = heroActivityData.getActivityDataMap();
			if (!activityDataMap.containsKey(actId)) {
				// 玩家活动未开启
				return;
			}
			if (!ActivityFunction.getIns().checkHeroActOpen(hero, actId)) {
				// 玩家活动未开启
				return;
			}
			AbstractActivityManager manager = ActivitySysCache.getActMgrByActId(actId);
			if (manager != null) {
				manager.openUI(hero);
			}
		} catch (Exception e) {
			LogTool.error(e, ActivityManager.class, hero.getId(), hero.getName(), "ActivityManager openAct");
		}
	}

	public void openActivityTime(Hero hero, int id) {
//		if(id==10086) {
//			//查看活动时间
//			ActivitySysGMEvent.getActivityTimeGM(hero);
//			LogTool.warn("正式服有人进来？！？！？hid:"+hero.getId()+" name:"+hero.getNameZoneid(), this);
//		}
	}

}
