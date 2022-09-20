package com.teamtop.cross.connEvent;


import com.teamtop.system.crossBoss.CrossBossIO;

import io.netty.channel.Channel;
/**
 * 跨服boss链接中央服事件类
 * @author lobbyer
 * @date 2016年9月18日
 */
public class CrossBossConnEvent extends CrossConnEvent {

	@Override
	public void conn(Channel channel) {
		CrossBossIO.getIns().connEvent(channel);
	}

}
