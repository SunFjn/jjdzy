package com.teamtop.cross.connEvent;

import com.teamtop.system.activity.ativitys.godGenSendGiftAct.cross.CrossGodGenSendGiftActCL;

import io.netty.channel.Channel;

public class GodGenSendGiftActConEvent extends CrossConnEvent {

	@Override
	public void conn(Channel channel) {
		CrossGodGenSendGiftActCL.getIns().connEvent(channel);

	}

}
