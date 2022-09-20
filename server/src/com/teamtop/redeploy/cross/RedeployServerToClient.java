package com.teamtop.redeploy.cross;

import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.redeploy.RedeployEnum;

import io.netty.channel.Channel;

public class RedeployServerToClient {

	/**
	 * 发送打印给client端
	 * @param channel
	 * @param info
	 */
	public static void sendInfo(Channel channel,String info){
		System.out.println("RedeployServerToClient.sendInfo:"+info);
		NettyWrite.writeXData(channel, CrossConst.TELL_INFO_SC, new CrossData(RedeployEnum.info, info));
	}
	/**
	 * 发送error打印给client端
	 * @param channel
	 * @param info
	 */
	public static void sendError(Channel channel,String error){
		System.err.println("RedeployServerToClient.sendError:"+error);
		NettyWrite.writeXData(channel, CrossConst.TELL_INFO_SC, new CrossData(RedeployEnum.error, error));
	}
}
