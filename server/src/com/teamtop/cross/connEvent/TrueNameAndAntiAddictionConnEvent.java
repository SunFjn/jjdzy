package com.teamtop.cross.connEvent;

import com.teamtop.houtaiHttp.events.trueNameAndAntiAddiction.TrueNameAndAntiAddictionIO;

import io.netty.channel.Channel;

public class TrueNameAndAntiAddictionConnEvent extends CrossConnEvent {

	@Override
	public void conn(Channel channel) {
		TrueNameAndAntiAddictionIO.getIns().connSynState(channel);
	}

}
