package com.teamtop.houtaiHttp.events.gameSystem;

import java.lang.reflect.Type;
import java.util.Iterator;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossEnum;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.util.log.LogTool;

import io.netty.channel.Channel;

public class GameSystemIO {

	private static GameSystemIO ins;

	private GameSystemIO() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized GameSystemIO getIns() {
		if (ins == null) {
			ins = new GameSystemIO();
		}
		return ins;
	}

	public void systemSwitch(String pf, int type, int sysId) {
		try {
			// type 1开启,2关闭
			Map<String, ConcurrentHashMap<Integer, Integer>> systemSwichtMap = GameSystemCache.getSystemSwichtMap();
			ConcurrentHashMap<Integer, Integer> map = systemSwichtMap.get(pf);
			if (map == null) {
				map = new ConcurrentHashMap<>();
				systemSwichtMap.put(pf, map);
			}
			if (type == 2) {
				map.put(sysId, type);
			}else {
				map.remove(sysId);
			}
			// 通知子服
//			Map<Integer, M_ServerInfo> serverMap = ServerInfoCache.pfServerMap.get(pf);
			Iterator<Channel> iterator = CrossCache.getChannelToZoneid().keySet().iterator();
			CrossData crossData = new CrossData();
			crossData.putObject(CrossEnum.type.name(), type);
			crossData.putObject(CrossEnum.systype.name(), sysId);
			for (; iterator.hasNext();) {
				Channel channel = iterator.next();
//				Integer zoneid = CrossCache.getChannelToZoneid().get(channel).get(0);
//				if (serverMap.containsKey(zoneid)) {
				NettyWrite.writeXData(channel, CrossConst.GAME_SYSTEM_SWITCH, crossData);
//				}
			}
		} catch (Exception e) {
			LogTool.error(e, GameSystemIO.class, "GameSystemIO pf=" + pf + ", type=" + type + ", sysId=" + sysId);
		}
	}

	public void systemSwitchHandle(Channel channel, CrossData crossData) {
		int cmd = CrossConst.GAME_SYSTEM_SWITCH;
		int type = -1;
		int sysId = -1;
		try {
			type = crossData.getObject(CrossEnum.type.name(), Integer.class);
			sysId = crossData.getObject(CrossEnum.systype.name(), Integer.class);

			ConcurrentHashMap<Integer, Integer> map = GameSystemCache.getLocalSystemSwichtMap();
			if (type == 2) {
				map.put(sysId, type);
			} else {
				map.remove(sysId);
			}
			LogTool.info("GameSystemIO systemSwitchHandle type=" + type + ", sysId=" + sysId, GameSystemIO.class);
		} catch (Exception e) {
			LogTool.error(e, GameSystemIO.class, "GameSystemIO type=" + type + ", sysId=" + sysId);
		}
	}
	
	public void switchSyn(Channel channel, CrossData crossData) {
		int cmd = CrossConst.GAME_SYSTEM_SWITCH_CONN;
		try {
			Type type = new TypeReference<ConcurrentHashMap<Integer, Integer>>(){}.getType();
			ConcurrentHashMap<Integer, Integer> map = crossData.getObject(CrossEnum.data1.name(), type);
			if (map != null && map.size() > 0) {
				ConcurrentHashMap<Integer, Integer> localMap = GameSystemCache.getLocalSystemSwichtMap();
				localMap.putAll(map);
			}
		} catch (Exception e) {
			LogTool.error(e, GameSystemIO.class, "GameSystemIO switchSyn");
		}
	}

}
