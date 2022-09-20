package com.teamtop.houtaiHttp.events.crossActivitySwitch;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.crossFireBeacon.CrossFireBeaconFunction;
import com.teamtop.system.crossSoloRun.SoloRunSysCache;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.util.log.LogTool;

import io.netty.channel.Channel;

public class CrossActivitySwitchIO {

	private static CrossActivitySwitchIO ins;

	public CrossActivitySwitchIO() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized CrossActivitySwitchIO getIns() {
		if (ins == null) {
			ins = new CrossActivitySwitchIO();
		}
		return ins;
	}

	public void setCrossActSwitch(List<Integer> zoneidList, int activityid, int type) {
		try {
			ConcurrentHashMap<Integer, Channel> zoneidToChannel = CrossCache.getZoneidToChannel();
			int size = zoneidList.size();
			if (size == 0) {
				zoneidList = new ArrayList<>(zoneidToChannel.keySet());
				size = zoneidList.size();
			}
			CrossActivitySwitchCache.CrossActSwitch.put(activityid, type);
			CrossData crossData = new CrossData();
			int zoneid = 0;
			for (int i = 0; i < size; i++) {
				zoneid = zoneidList.get(i);
				crossData.putObject(CrossActivitySwitchEnum.activityid.name(), activityid);
				crossData.putObject(CrossActivitySwitchEnum.type.name(), type);
				Channel channel = zoneidToChannel.get(zoneid);
				if (channel != null) {
					NettyWrite.writeXData(channel, CrossConst.CROSS_ACT_SWITCH, crossData);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, CrossActivitySwitchIO.class, "CrossActivitySwitchIO");
		}
	}

	public void setCrossActSwitchHandle(Channel channel, CrossData crossDat) {
		try {
			int activityid = crossDat.getObject(CrossActivitySwitchEnum.activityid.name(), Integer.class);
			int type = crossDat.getObject(CrossActivitySwitchEnum.type.name(), Integer.class);
			CrossActivitySwitchCache.CrossActSwitch.put(activityid, type);
			// 开启类型,1开启,2关闭
			if (type == 1) {
				CrossActivitySwitchCache.CrossActSwitch.remove(activityid);
			} else if (type == 2) {
				if (SystemIdConst.SOLO_RUN == activityid) {
					SoloRunSysCache.ACT_OPEN = false;
				}
			}
			int firstZoneId = GameProperties.getFirstZoneId();
			Channel crossChannel = Client_2.getIns().getCrossChannel();
			CrossData crossData = new CrossData();
			crossData.putObject(CrossActivitySwitchEnum.zoneid.name(), firstZoneId);
			crossData.putObject(CrossActivitySwitchEnum.activityid.name(), activityid);
			crossData.putObject(CrossActivitySwitchEnum.type.name(), type);
			NettyWrite.writeXData(crossChannel, CrossConst.CROSS_ACT_SWITCH_CENTRAL, crossData);
		} catch (Exception e) {
			LogTool.error(e, CrossActivitySwitchIO.class, "CrossActivitySwitchIO setCrossActSwitchHandle");
		}
	}

	public void centralActSwitchHandle(Channel channel, CrossData crossData) {
		try {
			int activityid = crossData.getObject(CrossActivitySwitchEnum.activityid.name(), Integer.class);
			int type = crossData.getObject(CrossActivitySwitchEnum.type.name(), Integer.class);
			int zoneid = crossData.getObject(CrossActivitySwitchEnum.zoneid.name(), Integer.class);
			Map<Integer, Integer> map = CrossActivitySwitchCache.centralActSwitch.get(zoneid);
			if (map == null) {
				map = new HashMap<>();
				CrossActivitySwitchCache.centralActSwitch.put(zoneid, map);
			}
			map.put(activityid, type);
			// 开启类型,1开启,2关闭
			if (type == 1) {
				map.remove(activityid);
				CrossActivitySwitchCache.CrossActSwitch.remove(activityid);
			} else {
				if (activityid == SystemIdConst.CROSS_FIRE_BEACON) {
					CrossFireBeaconFunction.getIns().disconnetFromCross();
					CrossActivitySwitchCache.CrossActSwitch.put(activityid, type);
				}
				if (activityid == SystemIdConst.DYNASTY_WARRIORS || activityid == SystemIdConst.CROSS_SELECT_KING) {
					CrossActivitySwitchCache.CrossActSwitch.put(activityid, type);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, CrossActivitySwitchIO.class, "CrossActivitySwitchIO centralActSwitchHandle");
		}
	}

}
