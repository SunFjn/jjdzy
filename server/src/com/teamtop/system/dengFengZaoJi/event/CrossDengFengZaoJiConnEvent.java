package com.teamtop.system.dengFengZaoJi.event;

import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.connEvent.CrossConnEvent;
import com.teamtop.netty.util.NettyWrite;

import io.netty.channel.Channel;

public class CrossDengFengZaoJiConnEvent extends CrossConnEvent {

	@Override
	public void conn(Channel channel) {
		CrossData crossData = new CrossData();
		NettyWrite.writeXData(channel, CrossConst.CROSS2LOCAL_ASKUPDATA, crossData);
	}

}
