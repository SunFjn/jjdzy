package com.teamtop.cross.connEvent;

import com.teamtop.system.crossCommonRank.cross.CrossCommonRankCL;

import io.netty.channel.Channel;

public class CommonRankConEvent extends CrossConnEvent {

	@Override
	public void conn(Channel channel) {
		CrossCommonRankCL.getIns().connEventToLocal(channel);
	}

}
