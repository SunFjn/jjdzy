package com.teamtop.houtaiHttp.events.activity;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.houtaiHttp.AbsHouTaiHttpEvent;
import com.teamtop.netty.http.HttpUtil;
import com.teamtop.system.activity.ActivitySysCache;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.activity.model.ActivitySetting;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.struct.Struct_huodong_009;
import io.netty.channel.ChannelHandlerContext;

public class ActivityHttpEvent extends AbsHouTaiHttpEvent {

	private static ActivityHttpEvent activityHttpEvent;

	private ActivityHttpEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized ActivityHttpEvent getIns() {
		if (activityHttpEvent == null) {
			activityHttpEvent = new ActivityHttpEvent();
		}
		return activityHttpEvent;
	}

	@Override
	public void handleGet(Map<String, String> paramMap, ChannelHandlerContext ctx) {
		try {
			String operTypeStr = paramMap.get("opertype");
			if (operTypeStr == null) {
				HttpUtil.responseFail(ctx);
				return;
			}
			int operType = Integer.parseInt(operTypeStr);
			if (operType == 1) {
				String actIdStr = paramMap.get("actid");// 活动id
				String periodsStr = paramMap.get("periods");// 期数
				String startTimeStr = paramMap.get("starttime");// 开启时间
				String endTimeStr = paramMap.get("endtime");// 结束时间
				if (actIdStr == null || periodsStr == null || startTimeStr == null || endTimeStr == null) {
					HttpUtil.responseFail(ctx);
					return;
				}
				int actId = Integer.parseInt(actIdStr);
				int periods = Integer.parseInt(periodsStr);
				int startTime = Integer.parseInt(startTimeStr);
				int endTime = Integer.parseInt(endTimeStr);
				int currentTime = TimeDateUtil.getCurrentTime();
				if (startTime < currentTime || endTime < currentTime) {
					HttpUtil.responseFail(ctx);
					return;
				}
				// 同步
				Map<Integer, Map<Integer, ActivitySetting>> actSettingMap = ActivitySysCache.getActSettingMap();
				Map<Integer, ActivitySetting> map = actSettingMap.get(actId);
				if (map == null) {
					map = new HashMap<>();
					actSettingMap.put(actId, map);
				}
				ActivitySetting activitySetting = map.get(periods);
				if (activitySetting == null) {
					activitySetting = new ActivitySetting();
					map.put(periods, activitySetting);
				}
				activitySetting.setStartTime(startTime);
				activitySetting.setEndTime(endTime);

				ActivityInfo activityInfo = ActivitySysCache.getActivityMap().get(actId);
				if (activityInfo != null) {
					activityInfo.setStartTime(startTime);
					activityInfo.setEndTime(endTime);
					activityInfo.setTimeType(1);
				}
				HttpUtil.responseSucc(ctx);
			} else if (operType == 2) {// 清除设置的活动时间恢复原数据表配置时间
				String actIdStr = paramMap.get("actid");// 活动id
				String periodsStr = paramMap.get("periods");// 期数
				if (actIdStr == null || periodsStr == null) {
					HttpUtil.responseFail(ctx);
					return;
				}
				int actId = Integer.parseInt(actIdStr);
				int periods = Integer.parseInt(periodsStr);
				Map<Integer, Map<Integer, ActivitySetting>> actSettingMap = ActivitySysCache.getActSettingMap();
				Map<Integer, ActivitySetting> map = actSettingMap.get(actId);
				if (map != null) {
					map.remove(periods);
					if (map.size() == 0) {
						actSettingMap.remove(actId);
					}
				}
				ActivityInfo activityInfo = ActivitySysCache.getActivityMap().get(actId);
				List<Struct_huodong_009> list = ActivitySysCache.getActIdMap().get(actId);
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
				String hstart = huodong.getHstart();
				String hend = huodong.getHend();
				int startTime = TimeDateUtil.getTimeIntByStrTime(hstart, "yyyy-MM-dd hh:mm:ss");
				int endTime = TimeDateUtil.getTimeIntByStrTime(hend, "yyyy-MM-dd hh:mm:ss");
				if (activityInfo != null) {
					activityInfo.setStartTime(startTime);
					activityInfo.setEndTime(endTime);
					activityInfo.setTimeType(0);
				}
				HttpUtil.responseSucc(ctx);
			} else if (operType == 3) {
				// 设置活动开关
				String actIdStr = paramMap.get("actid");// 活动id
				String periodsStr = paramMap.get("periods");// 期数
				String switchStr = paramMap.get("switch");// 开关 1活动开关开启，2活动开关关闭
				if (actIdStr == null || periodsStr == null || switchStr == null) {
					HttpUtil.responseFail(ctx);
					return;
				}
				int actId = Integer.parseInt(actIdStr);
				int periods = Integer.parseInt(periodsStr);
				int switchType = Integer.parseInt(switchStr);
				ActivityInfo activityInfo = ActivitySysCache.getActivityMap().get(actId);
				if (activityInfo.getPeriods() == periods) {
					if (switchType == 1) {
						activityInfo.setSwitchOn();
					} else if (switchType == 2) {
						activityInfo.setSwitchOff();
					}
					HttpUtil.responseSucc(ctx);
				}
				HttpUtil.responseFail(ctx);
			}
		} catch (Exception e) {
			LogTool.error(e, ActivityHttpEvent.class, "ActivityHttpEvent fail");
		}
	}

}
