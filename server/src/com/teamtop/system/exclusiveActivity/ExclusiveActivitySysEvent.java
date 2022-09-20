package com.teamtop.system.exclusiveActivity;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossZone;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.exclusiveActivity.model.ExActStateInfo;
import com.teamtop.system.exclusiveActivity.model.ExclusiveActivityData;
import com.teamtop.system.exclusiveActivity.model.ExclusiveActivityInfo;
import com.teamtop.system.exclusiveActivity.model.ExclusiveActivityModel;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_zshdb_315;
import excel.struct.Struct_zshdb_315;

public class ExclusiveActivitySysEvent extends AbsSystemEvent {

	private static ExclusiveActivitySysEvent ins;

	private ExclusiveActivitySysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized ExclusiveActivitySysEvent getIns() {
		if (ins == null) {
			ins = new ExclusiveActivitySysEvent();
		}
		return ins;
	}

	public static void main(String[] args) {
		System.err.println("\\@\\|");
	}

	@Override
	public void init(Hero hero) {
		// 发送活动配置数据
		ExclusiveActivityFunction.getIns().sendExAct(hero);
		ExclusiveActivityData heroExclusiveActivityData = hero.getExclusiveActivityData();
		if (heroExclusiveActivityData != null) {
			return;
		}
		long hid = hero.getId();
		int zoneid = hero.getZoneid();
		heroExclusiveActivityData = new ExclusiveActivityData();
		heroExclusiveActivityData.setHid(hero.getId());
		ExclusiveActivityData data = ExclusiveActivityDao.getDao().findHeroExAct(hid, zoneid);
		if (data != null) {
			heroExclusiveActivityData = data;
			Map<Integer, ExclusiveActivityModel> exActivityMap = heroExclusiveActivityData.getExActivityMap();
			String exActivityStr = data.getExActivityStr();
			if(!CommonUtil.isNull(exActivityStr)) {
				String[] arrs = exActivityStr.split("\\@\\|");
				for (String oneData : arrs) {
					String[] split = oneData.split("a\\|");
					try {
						int id = Integer.parseInt(split[0]);
						Struct_zshdb_315 zshdb_315 = Config_zshdb_315.getIns().get(id);
						if (zshdb_315 == null) {
							continue;
						}
						String content = split[1];
						if (CommonUtil.isNull(content)) {
							continue;
						}
						AbsExclusiveActivityManager manager = ExclusiveActivitySysCache
								.getExActMgr(zshdb_315.getHdid());
						ExclusiveActivityModel model = (ExclusiveActivityModel) JSONObject.parseObject(content,
								manager.getExclusiveActivityModel());
						exActivityMap.put(id, model);
					} catch (Exception e) {
						LogTool.error(e, ExclusiveActivitySysEvent.class, hid, hero.getName(),
								"ExclusiveActivitySysEvent init");
					}
				}
			}
		}
		String exActOpenStateStr = heroExclusiveActivityData.getExActOpenStateStr();
		if(!CommonUtil.isNull(exActOpenStateStr)) {
			Type type = new TypeReference<Map<Integer, ExActStateInfo>>(){}.getType();
			Map<Integer, ExActStateInfo> map = JSONObject.parseObject(exActOpenStateStr, type);
			if(map!=null) {
				heroExclusiveActivityData.setExActOpenStateMap(map);
			}
		}
		hero.setExclusiveActivityData(heroExclusiveActivityData);
	}

	@Override
	public void login(Hero hero) {
		// 发送活动配置数据
		// ExclusiveActivityFunction.getIns().sendExAct(hero);
		// 处理结束活动
		ExclusiveActivityFunction.getIns().exActEnd(hero);
		// 登录检测
		ExclusiveActivityFunction.getIns().exActOpen(hero, true);
		sendActivity(hero);
		ExclusiveActivityFunction.getIns().login(hero);
	}

	public void sendActivity(Hero hero) {
		if (!ExclusiveActivitySysCache.isOpenState()) {
			return;
		}
		long hid = hero.getId();
		Map<Integer, ExclusiveActivityModel> activityDataMap = hero.getExclusiveActivityData().getExActivityMap();
		Iterator<ExclusiveActivityModel> actItr = activityDataMap.values().iterator();
		Map<Integer, ExclusiveActivityInfo> activityMap = ExclusiveActivitySysCache.getOpenExActMap();
		ExclusiveActivityModel data = null;
		ExclusiveActivityInfo activityInfo = null;
		int id = 0;
		int actId = 0;
		int periods = 0;
		List<Object[]> exActData = new ArrayList<>();
		for (; actItr.hasNext();) {
			data = actItr.next();
			actId = data.getActId();
			periods = data.getQs();
			id = data.getId();
//			if (!ExclusiveActivityFunction.getIns().checkHeroExActOpen(hero, id)) {
//				continue;
//			}
			activityInfo = activityMap.get(id);
			if (!ExclusiveActivityFunction.getIns().checkHasData(hero, id)) {
				continue;
			}
			int startTime = activityInfo.getStartTime();
			int endTime = activityInfo.getEndTime();
			LogTool.info(hero.getId(), hero.getName(), "ExAct 最终时间前段收到  id:"+data.getId()+" id:"+id+" Periods:"+periods+" startTime:"+TimeDateUtil.printTime(startTime)
			+" endTime:"+TimeDateUtil.printTime(endTime), ExclusiveActivitySysEvent.class);
			exActData.add(new Object[] { id, startTime, endTime });
		}
		ExclusiveActivitySender.sendCmd_7900(hid, exActData.toArray(), ExclusiveActivitySysCache.EXCLUSIVE_STATE);
	}

	@Override
	public void logoutSyncPub(Hero hero, int syncType) {
		// 登出个人活动数据保存
		ExclusiveActivityData exActivityData = hero.getExclusiveActivityData();
		if (exActivityData == null) {
			return;
		}
		Map<Integer, ExclusiveActivityModel> exActivityMap = exActivityData.getExActivityMap();
		StringBuilder sb = new StringBuilder();
		if (exActivityMap != null && exActivityMap.size() > 0) {
			Set<Integer> idSet = new HashSet<>(exActivityMap.keySet());
			for (int id : idSet) {
				ExclusiveActivityModel model = exActivityMap.get(id);
				if (model != null) {
					sb.append(model.getId()).append("a|").append(JSON.toJSONString(model)).append("@|");
				}
			}
			if (sb.length() > 0) {
				sb.setLength(sb.length() - 2);
			}
		}
		exActivityData.setExActivityStr(sb.toString());

		Map<Integer, ExActStateInfo> exActOpenStateMap = exActivityData.getExActOpenStateMap();
		String exActOpenStateStr = "";
		if (exActOpenStateMap != null) {
			exActOpenStateStr = JSON.toJSONString(exActOpenStateMap);
		}
		exActivityData.setExActOpenStateStr(exActOpenStateStr);
		ExclusiveActivityDao.getDao().saveExActData(hero, exActivityData);
	}

	@Override
	public void levelUp(Hero hero, int newLv, int oldLv) {
		ExclusiveActivityFunction.getIns().exActOpen(hero, false);
		ExclusiveActivityFunction.getIns().levelUp(hero, newLv, oldLv);
	}

	@Override
	public void passGuanqia(Hero hero, int passGuanqia) {
		ExclusiveActivityFunction.getIns().exActOpen(hero, false);
		ExclusiveActivityFunction.getIns().passGuanqia(hero, passGuanqia);
	}

	@Override
	public void loginReset(Hero hero, int now) {
		// 处理结束活动
		ExclusiveActivityFunction.getIns().exActEnd(hero);
		ExclusiveActivityFunction.getIns().loginReset(hero, now);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		// ActivityFunction.getIns().actEnd(hero);
		ExclusiveActivityFunction.getIns().zeroHero(hero, now);
		ExclusiveActivityFunction.getIns().exActOpen(hero, false);
		sendActivity(hero);
	}

	@Override
	public void zeroPub(int now) {
		ExclusiveActivityFunction.getIns().zeroPub(now);
		// 是否有活动结束
		ExclusiveActivityFunction.getIns().checkExActEnd();
		// 是否有活动开启（因为公共零点先与个人零点执行，如果这里检测活动开启，开启活动一些奖励状态重置了，然后跑个人零点时有个人数据重置并且需要补发奖励时就会有问题）
		// 新改成只触发公共开启，个人开启在个人零点处理
		ExclusiveActivityFunction.getIns().checkExActOpen(false);
	}

	@Override
	public void logout(Hero hero) {
		ExclusiveActivityFunction.getIns().logout(hero);
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
			ExclusiveActivityFunction.getIns().checkActTime();
			// 是否有活动结束
			ExclusiveActivityFunction.getIns().checkExActEnd();
			// 是否有活动开启
			ExclusiveActivityFunction.getIns().checkExActOpen(true);
		}
	}

}
