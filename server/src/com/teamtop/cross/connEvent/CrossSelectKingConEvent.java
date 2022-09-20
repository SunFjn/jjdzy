package com.teamtop.cross.connEvent;

import com.teamtop.system.crossSelectKing.cross.CrossSelectKingCrossIO;

import io.netty.channel.Channel;

public class CrossSelectKingConEvent extends CrossConnEvent{
	
	@Override
	public void conn(Channel channel) {
		CrossSelectKingCrossIO.getIns().GSconnEvent(channel);
	}
	
	

}
