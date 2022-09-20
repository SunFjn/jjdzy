package com.teamtop.cross.connEvent;

import com.teamtop.system.eightDoorAppraiseRank.cross.CrossEightDoorAppraiseRankCL;

import io.netty.channel.Channel;

public class CrossEightDoorAppraiseRankConEvent extends CrossConnEvent {

	@Override
	public void conn(Channel channel) {
		CrossEightDoorAppraiseRankCL.getIns().connEvent(channel, true);
	}

}
