package com.teamtop.system.alarmSystem.crossActAlarm;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import com.teamtop.cross.CrossZone;
import com.teamtop.houtaiHttp.events.serverMaintain.ServerMaintainCache;
import com.teamtop.system.activityNotice.ActivityNoticeFunction;
import com.teamtop.system.alarmSystem.AlarmSystemFunction;
import com.teamtop.system.alarmSystem.AlarmType;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.struct.Struct_hdyl_259;

public class CrossActAlarmEvent extends AbsSystemEvent {
	public static CrossActAlarmEvent ins;

	public static CrossActAlarmEvent getIns() {
		if (ins == null) {
			ins = new CrossActAlarmEvent();
		}
		return ins;
	}

	private CrossActAlarmEvent() {
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void login(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void fixTime(int cmdId, int now) {
		// TODO Auto-generated method stub
		if (CrossZone.isCrossServer()) {
			return;
		}
		if (cmdId == 1) {
			actMonitor();
		}
	}

	/**
	 * 跨服活动异常预警
	 */
	public void actMonitor() {
		// 备服不预警
		if (ServerMaintainCache.MAINTAIN_STATE == -1) {
			return;
		}
		Map<Integer, CrossActAlarmHandleAbs> crossActHandleMap = CrossActAlarmCache.crossActHandleMap;
		List<Object[]> objList = new ArrayList<>();
		try {
			for (Entry<Integer, CrossActAlarmHandleAbs> entry : crossActHandleMap.entrySet()) {
				try {
					boolean isOpen = HeroFunction.getIns().checkSystemOpenDay(entry.getKey());
					// 判断是否在开启天数内
					if (!isOpen) {
						continue;
					}
					Map<Integer, Struct_hdyl_259> map = CrossActAlarmCache.crossActConfigMap.get(entry.getKey());
					int week = TimeDateUtil.getWeek();
					Struct_hdyl_259 struct_hdyl_259 = map.get(week);
					if (struct_hdyl_259 != null) {
						String startTimeStr = struct_hdyl_259.getStart();
						String endTimeStr = struct_hdyl_259.getEnd();
						int[] startAndEndTime = ActivityNoticeFunction.getIns().getStartAndEndTime(startTimeStr,
								endTimeStr);
						int startTime = startAndEndTime[0] + TimeDateUtil.ONE_MINUTE * 2;
						int endTime = startAndEndTime[1];
						int currentTime = TimeDateUtil.getCurrentTime();
						if (currentTime >= startTime && currentTime < endTime) {
							CrossActAlarmHandleAbs value = entry.getValue();
							boolean isSameDay = TimeDateUtil.compareTimeForSameDay(value.time, currentTime);
							// 一天只能发一封邮件
							if (isSameDay) {
								continue;
							}
							boolean flag = value.weekHandle(objList);
							// 设置时间
							if (flag) {
								value.time = currentTime;
							}
						}
					}
				} catch (Exception e) {
					// TODO: handle exception
					LogTool.error(e, CrossActAlarmEvent.class, "actMonitor actId:" + entry.getKey());
				}
			}
			if (objList.size() != 0) {
				AlarmSystemFunction.getIns().alarmSend(AlarmType.CROSS_ACT_WARN, 0, objList.toArray());
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, CrossActAlarmEvent.class, "actMonitor");
		}
	}

}
