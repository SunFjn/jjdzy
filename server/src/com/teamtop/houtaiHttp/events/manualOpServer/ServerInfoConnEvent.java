package com.teamtop.houtaiHttp.events.manualOpServer;


import com.teamtop.cross.connEvent.CrossConnEvent;

import io.netty.channel.Channel;
/**
 * 链接中央服事件类
 */
public class ServerInfoConnEvent extends CrossConnEvent {

	@Override
	public void conn(Channel channel) {
		ServerInfoCrossToLocal.getIns().getServerAddressData(channel);
	}

}
