package com.teamtop.cross.connEvent;

import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.netty.util.NettyWrite;

import io.netty.channel.Channel;

public class CrossTrialConnEvent extends CrossConnEvent {

	@Override
	public void conn(Channel channel) {
		CrossData crossData = new CrossData();
		NettyWrite.writeXData(channel, CrossConst.CROSS_TRIAL_ASK_UPLOAD, crossData);
	}

}
