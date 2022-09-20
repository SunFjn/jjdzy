package com.teamtop.houtaiHttp.events.recharge.iosRecharge;

import com.teamtop.cross.connEvent.CrossConnEvent;

import io.netty.channel.Channel;

public class IosRechargeConnEvent extends CrossConnEvent {

	@Override
	public void conn(Channel channel) {
		IosRechargeCrossIO.getIns().connEvent(channel);
	}

}
