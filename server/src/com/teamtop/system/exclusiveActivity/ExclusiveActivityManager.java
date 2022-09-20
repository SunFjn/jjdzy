package com.teamtop.system.exclusiveActivity;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.teamtop.system.exclusiveActivity.model.ExclusiveActivityData;
import com.teamtop.system.exclusiveActivity.model.ExclusiveActivityInfo;
import com.teamtop.system.exclusiveActivity.model.ExclusiveActivityModel;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.log.LogTool;

public class ExclusiveActivityManager {

	private static ExclusiveActivityManager ins;

	private ExclusiveActivityManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized ExclusiveActivityManager getIns() {
		if (ins == null) {
			ins = new ExclusiveActivityManager();
		}
		return ins;
	}

	/**
	 * 打开某类型活动界面
	 * 
	 * @param hero
	 * @param actType
	 */
	public void openUI(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			Map<Integer, ExclusiveActivityInfo> activityMap = ExclusiveActivitySysCache.getOpenExActMap();
			ExclusiveActivityData heroExclusiveActivityData = hero.getExclusiveActivityData();
			Map<Integer, ExclusiveActivityModel> exActivityMap = heroExclusiveActivityData.getExActivityMap();
			Set<Integer> actIdSet = new HashSet<>(exActivityMap.keySet());
			Iterator<Integer> iterator = actIdSet.iterator();
			int id = 0;
			ExclusiveActivityModel activityData = null;
			ExclusiveActivityInfo activityInfo = null;
			List<Object[]> exActData = new ArrayList<>();
			for (; iterator.hasNext();) {
				id = iterator.next();
				activityData = exActivityMap.get(id);
				activityInfo = activityMap.get(id);
				exActData.add(new Object[] { activityData.getId(), activityInfo.getStartTime(), activityInfo.getEndTime() });
			}
			ExclusiveActivitySender.sendCmd_7900(hid, exActData.toArray(), ExclusiveActivitySysCache.EXCLUSIVE_STATE);
		} catch (Exception e) {
			LogTool.error(e, ExclusiveActivityManager.class, hero.getId(), hero.getName(),
					"ExclusiveActivityManager openActivityUI");
		}
	}

	/**
	 * 请求某活动数据
	 * 
	 * @param hero
	 * @param actId
	 */
	public void openExAct(Hero hero, int id) {
		if (hero == null) {
			return;
		}
		try {
			ExclusiveActivityData heroExclusiveActivityData = hero.getExclusiveActivityData();
			Map<Integer, ExclusiveActivityModel> exActivityMap = heroExclusiveActivityData.getExActivityMap();
			if (!exActivityMap.containsKey(id)) {
				// 玩家活动未开启
				return;
			}
//			if (!ExclusiveActivityFunction.getIns().checkHeroExActOpen(hero, id)) {
//				// 玩家活动未开启
//				return;
//			}
			if(!ExclusiveActivityFunction.getIns().checkHasData(hero, id)) {
				return;
			}
			Map<Integer, ExclusiveActivityInfo> activityMap = ExclusiveActivitySysCache.getOpenExActMap();
			ExclusiveActivityInfo exclusiveActivityInfo = activityMap.get(id);
			int actId = exclusiveActivityInfo.getActId();
			AbsExclusiveActivityManager manager = ExclusiveActivitySysCache.getExActMgr(actId);
			if (manager != null) {
				manager.openUI(hero, id);
			}
		} catch (Exception e) {
			LogTool.error(e, ExclusiveActivityManager.class, hero.getId(), hero.getName(), "ActivityManager openAct");
		}
	}

}
