package com.teamtop.cross.connEvent;

import com.teamtop.system.crossTeamKing.CrossTeamKingIO;

import io.netty.channel.Channel;

public class CrossTeamKingConEvent extends CrossConnEvent {

	@Override
	public void conn(Channel channel) {
		CrossTeamKingIO.getIns().connEventToLocal(channel);
	}
	

}
