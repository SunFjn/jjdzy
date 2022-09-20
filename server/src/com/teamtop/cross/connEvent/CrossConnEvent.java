package com.teamtop.cross.connEvent;

import io.netty.channel.Channel;

/**
 * 子服连接成功中央服事件
 * @author lobbyer
 * @date 2016年6月21日
 */
public abstract class CrossConnEvent {
	/**
	 * 成功连接
	 * @author lobbyer
	 * @param channel 子服channel
	 * @param zoneid 子服区号
	 * @date 2016年6月21日
	 */
	public abstract void conn(Channel channel);
}
