package com.teamtop.cross.connEvent;

import com.teamtop.system.activity.ativitys.eightDoorAppraiseRankAct.cross.CrossEightDoorAppraiseRankActCL;
import com.teamtop.system.activity.ativitys.shaoZhuQiYuanRankAct.cross.CrossShaoZhuQiYuanRankActCL;

import io.netty.channel.Channel;

/**
 * 新活动跨服连接事件
 * 
 * @author 13640
 *
 */
public class NewActConEvent extends CrossConnEvent {

	@Override
	public void conn(Channel channel) {
		CrossEightDoorAppraiseRankActCL.getIns().connEventToLocal(channel);
		CrossShaoZhuQiYuanRankActCL.getIns().connEventToLocal(channel);
	}

}
