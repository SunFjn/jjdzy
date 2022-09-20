package com.teamtop.houtaiHttp.events.welfareNotice;

import com.teamtop.cross.connEvent.CrossConnEvent;

import io.netty.channel.Channel;

public class WelfareNoticeConnEvent extends CrossConnEvent {

	@Override
	public void conn(Channel channel) {
		// 同步福利大厅公告
		// CrossData crossData = new CrossData();
		// crossData.putObject(WelfareNoticeEnum.content.name(),
		// WelfareNoticeCache.WelfareNotice);
		// NettyWrite.writeXData(channel, CrossConst.WELFARE_NOTICE, crossData);
	}

}
