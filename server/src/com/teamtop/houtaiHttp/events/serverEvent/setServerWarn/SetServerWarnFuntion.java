package com.teamtop.houtaiHttp.events.serverEvent.setServerWarn;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.teamtop.houtaiHttp.events.manualOpServer.ServerInfoCache;
import com.teamtop.houtaiHttp.events.manualOpServer.ServerInfoConst;
import com.teamtop.system.alarmSystem.AlarmSystemFunction;
import com.teamtop.system.alarmSystem.AlarmType;
import com.teamtop.system.event.backstage.events.backstage.serverInfoList.M_ServerInfo;
import com.teamtop.util.time.TimeDateUtil;

public class SetServerWarnFuntion {
	private static SetServerWarnFuntion ins = null;

	public static SetServerWarnFuntion getIns() {
		if (ins == null) {
			ins = new SetServerWarnFuntion();
		}
		return ins;
	}

	private SetServerWarnFuntion() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * 根据服务器状态获取该状态的服务器数量
	 * 
	 * @param type
	 * @return
	 */
	public List<M_ServerInfo> getServerNumByType(int type) {
		List<M_ServerInfo> list = new ArrayList<>();
		Map<String, Map<Integer, M_ServerInfo>> pfServerMap = ServerInfoCache.pfServerMap;
		for (Map<Integer, M_ServerInfo> map : pfServerMap.values()) {
			for (M_ServerInfo m_ServerInfo : map.values()) {
				if (m_ServerInfo.getState() == type) {
					list.add(m_ServerInfo);
				}
			}
		}
		return list;
	}

	public void executeSendMail() {
		int sendMailTime = SetServerWarnCache.getSendMailTime();
		int currentTime = TimeDateUtil.getCurrentTime();
		if (currentTime-sendMailTime>=TimeDateUtil.ONE_HOUR_INT) {
			int serverWarnNum = SetServerWarnCache.getServerWarnNum();
			if (serverWarnNum > 0) {
				List<M_ServerInfo> serverList = getServerNumByType(ServerInfoConst.NOT_OPEN);
				if (serverList.size() < serverWarnNum) {
					AlarmSystemFunction.getIns().alarmSend(AlarmType.SERVER_WARN, 0, new Object[] {});
					SetServerWarnCache.setSendMailTime(TimeDateUtil.getCurrentTime());
				}
			}
		}
	}
}
