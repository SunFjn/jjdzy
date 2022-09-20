package com.teamtop.cross.connEvent;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossEnum;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.houtaiHttp.events.gameSystem.GameSystemCache;
import com.teamtop.netty.util.NettyWrite;

import io.netty.channel.Channel;

public class GameSystemSwitchConnEvent extends CrossConnEvent {

	@Override
	public void conn(Channel channel) {
		CrossData crossData = new CrossData();
		Map<String, ConcurrentHashMap<Integer, Integer>> systemSwichtMap = GameSystemCache.getSystemSwichtMap();
		ConcurrentHashMap<Integer, Integer> map = systemSwichtMap.get(GameProperties.platform);
		if(map==null) {
			map = new ConcurrentHashMap<>();
		}
		crossData.putObject(CrossEnum.data1.name(), map);
		NettyWrite.writeXData(channel, CrossConst.GAME_SYSTEM_SWITCH_CONN, crossData);
	}

}
