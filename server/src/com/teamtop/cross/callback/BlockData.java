package com.teamtop.cross.callback;

import com.teamtop.cross.CrossData;

import io.netty.channel.Channel;

public class BlockData {
	private Channel channel;
	private int cmd;
	private CrossData crossData;
	public Channel getChannel() {
		return channel;
	}
	public int getCmd() {
		return cmd;
	}
	public CrossData getCrossData() {
		return crossData;
	}
	public BlockData(Channel channel, int cmd, CrossData crossData) {
		super();
		this.channel = channel;
		this.cmd = cmd;
		this.crossData = crossData;
	}
	
}
