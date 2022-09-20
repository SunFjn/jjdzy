package com.teamtop.houtaiHttp.events.timingSelfMotionServer;

import java.util.Map;

import com.teamtop.houtaiHttp.events.manualOpServer.ManualOpServerIO;
import com.teamtop.houtaiHttp.events.manualOpServer.ServerInfoCache;
import com.teamtop.houtaiHttp.events.manualOpServer.ServerInfoConst;
import com.teamtop.houtaiHttp.events.serverSelfMotion.ServerSelfMotionCache;
import com.teamtop.system.event.backstage.events.backstage.serverInfoList.M_ServerInfo;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

public class TimingSelfMotionServerFunction {

	private static TimingSelfMotionServerFunction ins;

	private TimingSelfMotionServerFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized TimingSelfMotionServerFunction getIns() {
		if (ins == null) {
			ins = new TimingSelfMotionServerFunction();
		}
		return ins;
	}

	/**
	 * 检测是否设置了定时开启
	 * @param pf
	 * @return
	 */
	public boolean checkTimming(String pf) {
		Map<String, TimingInfo> pfTimingMap = TimingSelfMotionServerCache.getPfTimingMap();
		TimingInfo timingInfo = pfTimingMap.get(pf);
		if (timingInfo != null) {
			int state = timingInfo.getState();
			if (state == 1) {
				return true;
			}
		}
		return false;
	}

	/**
	 * 定时自动开服检测
	 * @param pf
	 */
	public void checkTimeAndOpen(String pf) {
		Map<String, TimingInfo> pfTimingMap = TimingSelfMotionServerCache.getPfTimingMap();
		TimingInfo timingInfo = pfTimingMap.get(pf);
		if (timingInfo != null) {
			int state = timingInfo.getState();
			if (state == 1) {
				int lastOpenTime = timingInfo.getLastOpenTime();
				if (lastOpenTime > 0) {
					int oneDayZeroTime = TimeDateUtil.getOneDayZeroTime(lastOpenTime);
					int todayZeroTime = TimeDateUtil.getTodayZeroTimeReturnInt();
					if (oneDayZeroTime == todayZeroTime) {
						// 今日已开过服
//						LogTool.info("TimingSelfMotionServerFunction checkTimeAndOpen 1", this);
						return;
					}
				}
				int timingHour = timingInfo.getTimingHour();
				int timingMunite = timingInfo.getTimingMunite();
				int timmingTime = TimeDateUtil.getTimeHourAndMinute(timingHour, timingMunite);
				int currentTime = TimeDateUtil.getCurrentTime();
//				LogTool.info("TimingSelfMotionServerFunction checkTimeAndOpen timmingTime="+timmingTime+", currentTime="+currentTime, this);
				if (currentTime >= timmingTime) {
					Integer zoneid = ServerSelfMotionCache.pfMaxZoneidMap.get(pf);
					if (zoneid != null) {
						Map<Integer, M_ServerInfo> map = ServerInfoCache.pfServerMap.get(pf);
						if (map != null && zoneid != null) {
							LogTool.info("TimingSelfMotionServerFunction checkTimeAndOpen start", this);
							int newZoneId = zoneid + 1;
							// 开启新服
							M_ServerInfo m_ServerInfo = map.get(newZoneId);
							if (m_ServerInfo != null && m_ServerInfo.getState() == ServerInfoConst.OPEN_NOMAL) {
								return;
							}
							ManualOpServerIO.getIns().manualOpenServer(newZoneId, pf);
							timingInfo.setLastOpenTime(currentTime);
							LogTool.info("TimingSelfMotionServerFunction checkTimeAndOpen success", this);
						}
					}
				}
			}
		}
	}

}
