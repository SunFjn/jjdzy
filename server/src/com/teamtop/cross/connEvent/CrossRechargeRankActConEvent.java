package com.teamtop.cross.connEvent;

import com.teamtop.system.activity.ativitys.rechargeRankAct.cross.CrossRechargeRankActCL;

import io.netty.channel.Channel;

public class CrossRechargeRankActConEvent extends CrossConnEvent {

	@Override
	public void conn(Channel channel) {
		CrossRechargeRankActCL.getIns().connEventToLocal(channel);
	}

}
