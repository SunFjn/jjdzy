package com.teamtop.cross.connEvent;

import com.teamtop.system.linglongge.LingLongGeLocalIO;

import io.netty.channel.Channel;

public class CrossLinglongConEvent extends CrossConnEvent{

	@Override
	public void conn(Channel channel) {
		LingLongGeLocalIO.getIns().connEvent(channel);
		
	}

}
