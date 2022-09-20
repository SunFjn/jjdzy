package com.teamtop.houtaiHttp.events.serverSelfMotion;

import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

import com.teamtop.houtaiHttp.events.manualOpServer.ManualOpServerIO;
import com.teamtop.houtaiHttp.events.manualOpServer.ServerInfoCache;
import com.teamtop.houtaiHttp.events.manualOpServer.ServerInfoConst;
import com.teamtop.houtaiHttp.events.timingSelfMotionServer.TimingSelfMotionServerFunction;
import com.teamtop.system.alarmSystem.AlarmSystemFunction;
import com.teamtop.system.alarmSystem.AlarmType;
import com.teamtop.system.event.backstage.events.backstage.serverInfoList.M_ServerInfo;
import com.teamtop.util.exector.schedule.AbsScheduleExecutor;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

public class ServerSelfMotionSchedule extends AbsScheduleExecutor {

	public static int lastTime = 0;

	public ServerSelfMotionSchedule(long delay, long interval, boolean useLong) {
		super(delay, interval, useLong);
	}

	@Override
	public void execute(int now) {
		boolean hasTimmingLimit = false;
		for (String pf : ServerSelfMotionCache.pfMaxZoneidMap.keySet()) {
			boolean timmingLimit = TimingSelfMotionServerFunction.getIns().checkTimming(pf);// 是否开启定时自动开服
			if (timmingLimit) {
				hasTimmingLimit = true;
				TimingSelfMotionServerFunction.getIns().checkTimeAndOpen(pf);
				continue;
			}
		}
//		LogTool.info("hasTimmingLimit = " + hasTimmingLimit, this);
		if (hasTimmingLimit) {
			return;
		}
		if (ServerSelfMotionCache.AUTO_OPEN_STATE == 1 && ServerSelfMotionCache.AUTO_OPEN_NUM > 0) {
			//获取服务器数据
			// 23:30~00:05不做开服和预警
			int hour = TimeDateUtil.getHour();
			if (hour == 23) {
				int minute = TimeDateUtil.getMinute();
				if (minute >= 30) {
					return;
				}
			}
			if (hour == 0) {
				int minute = TimeDateUtil.getMinute();
				if (minute < 5) {
					return;
				}
			}
			Iterator<Entry<String, Integer>> iterator = ServerSelfMotionCache.pfMaxZoneidMap.entrySet().iterator();
			for(;iterator.hasNext();) {
				Entry<String, Integer> entry = iterator.next();
				String pf = entry.getKey();
				Integer zoneid = entry.getValue();
				Map<Integer, M_ServerInfo> map = ServerInfoCache.pfServerMap.get(pf);
				if (map != null && zoneid != null) {
					M_ServerInfo serverInfo = map.get(zoneid);
					long playerNum = serverInfo.getPlayerNum();
					if(playerNum>(ServerSelfMotionCache.AUTO_OPEN_NUM+ServerSelfMotionCache.AUTO_OPEN_NUM/100*5)) {
						//预警
						AlarmSystemFunction.getIns().alarmSend(AlarmType.SELF_MOTION_CHECK_NUM, 0, new Object[] {zoneid, playerNum});
					}
					if (playerNum >= ServerSelfMotionCache.AUTO_OPEN_NUM) {
						int newZoneId = zoneid + 1;
						// 开启新服
						M_ServerInfo m_ServerInfo = map.get(newZoneId);
						if (m_ServerInfo != null && m_ServerInfo.getState() == ServerInfoConst.OPEN_NOMAL) {
							continue;
						}
						ManualOpServerIO.getIns().manualOpenServer(newZoneId, pf);
						// 同步服务信息到后台
//						if (m_ServerInfo != null && m_ServerInfo.getState() == ServerInfoConst.OPEN_NOMAL) {
//							SynOpenServerInfo.synServerInfo(m_ServerInfo);
//						}
					} else {
						int passTime = now - lastTime;
						if (passTime < 60) {
							continue;
						}
						lastTime = now;
						ServerSelfMotionIO.getIns().getServerPlayerNum(pf, zoneid);
						LogTool.info("playerNum=" + playerNum + ", zoneid=" + zoneid + ", passTime==" + passTime
								+ ", lastTime=" + lastTime, ServerSelfMotionSchedule.class);
					}
				}
			}
		}
	}

}
