package com.teamtop.cross.connEvent;

import com.teamtop.houtaiHttp.events.switchOnOff.SwitchOnOffLC;

import io.netty.channel.Channel;

public class SwitchOnOffConEvent extends CrossConnEvent {

	@Override
	public void conn(Channel channel) {
		SwitchOnOffLC.getIns().connEvent(channel);
	}

}
