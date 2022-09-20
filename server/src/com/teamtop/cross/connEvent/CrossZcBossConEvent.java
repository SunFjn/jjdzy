package com.teamtop.cross.connEvent;


import com.teamtop.system.zcBoss.cross.ZcBossCrossIO;

import io.netty.channel.Channel;

public class CrossZcBossConEvent  extends CrossConnEvent{

	@Override
	public void conn(Channel channel) {
		ZcBossCrossIO.getIns().connEvent(channel);
	}

}
