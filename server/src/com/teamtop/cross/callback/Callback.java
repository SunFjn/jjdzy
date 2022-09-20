package com.teamtop.cross.callback;

import io.netty.channel.Channel;

import com.teamtop.cross.CrossData;

/**
 * callback基类
 * @author Administrator
 *
 */
public abstract class Callback {
	private int cmd=0;//回调的cmd
	private int deadTime;//callback产生后消亡时间，如果没有被回调的话
	
	public int getDeadTime() {
		return deadTime;
	}

	public void setDeadTime(int deadTime) {
		this.deadTime = deadTime;
	}

	public int getCmd() {
		return cmd;
	}

	public void setCmd(int cmd) {
		this.cmd = cmd;
	}
	
	public abstract void dataReci(Channel channel,CrossData crossData);
}
