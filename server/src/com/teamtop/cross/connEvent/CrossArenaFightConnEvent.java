package com.teamtop.cross.connEvent;

import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.activity.ativitys.arenaFight.cross.ArenaFightEnum;
import com.teamtop.system.activity.ativitys.arenaFight.cross.CrossArenaFightSysCache;

import io.netty.channel.Channel;

public class CrossArenaFightConnEvent extends CrossConnEvent {

	@Override
	public void conn(Channel channel) {
		if (CrossArenaFightSysCache.isActOpen()) {
			if (CrossArenaFightSysCache.opState > 0) {
				CrossData crossData = new CrossData();
				crossData.putObject(ArenaFightEnum.opState.name(), CrossArenaFightSysCache.opState);
				NettyWrite.writeXData(channel, CrossConst.CROSS_ARENA_FIGHT_START, crossData);
			}
		} else {
			CrossData crossData = new CrossData();
			NettyWrite.writeXData(channel, CrossConst.CROSS_ARENA_ASK_OPEN_STATE, crossData);
		}
	}

}
