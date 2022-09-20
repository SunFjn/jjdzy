package com.teamtop.cross.connEvent;

import com.teamtop.system.shaozhuQiYuanRank.cross.CrossShaoZhuQiYuanRankCL;

import io.netty.channel.Channel;

public class CrossShaoZhuQiYuanRankConEvent extends CrossConnEvent {

	@Override
	public void conn(Channel channel) {
		CrossShaoZhuQiYuanRankCL.getIns().connEvent(channel, true);
	}

}
