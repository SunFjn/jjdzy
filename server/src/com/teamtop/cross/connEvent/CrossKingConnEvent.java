package com.teamtop.cross.connEvent;

import com.teamtop.system.crossKing.cross.CrossKingCrossIO;

import io.netty.channel.Channel;

public class CrossKingConnEvent extends CrossConnEvent {

	@Override
	public void conn(Channel channel) {
		CrossKingCrossIO.getIns().connEvent(channel);
	}

}
