package com.teamtop.houtaiHttp.events.manualOpServer;

import com.teamtop.util.exector.schedule.AbsScheduleExecutor;
import com.teamtop.util.log.LogTool;

public class ServerInfoSchedule extends AbsScheduleExecutor {

	public ServerInfoSchedule(long delay, long interval, boolean useLong) {
		super(delay, interval, useLong);
	}

	@Override
	public void execute(int now) {
		try {
			ServerInfoCache.initAndReflashServer( true);
		} catch (Exception e) {
			LogTool.error(e, ServerInfoSchedule.class, "ServerInfoSchedule execute");
		}
	}

//	/**
//	 * 检测服务器状态并同步
//	 * @param pfServerMap
//	 */
//	public void checkStateChangeAndSyn(Map<String, Map<Integer, M_ServerInfo>> pfServerMap) {
//		try {} catch (Exception e) {
//			LogTool.error(e, ServerInfoSchedule.class, "ServerInfoSchedule checkStateChange");
//		}
//	}

}
