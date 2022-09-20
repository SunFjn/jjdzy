package com.teamtop.system.chat;

import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.netty.util.NettyWrite;

import io.netty.channel.Channel;

public class ChatCrossIO {
	
	private static ChatCrossIO ins;
	public static synchronized ChatCrossIO getIns(){
		if(ins == null) {
			ins = new ChatCrossIO();
		}
		return ins;
	}
	
	
	public void CRLChat(Channel channel,CrossData crossData) {
		ConcurrentHashMap<Channel, List<Integer>> channelToZoneid = CrossCache.getChannelToZoneid(channel);
		for(Channel localChannel:channelToZoneid.keySet()) {
			NettyWrite.writeXData(localChannel, CrossConst.CROSS_GS_CHAT, crossData);
		}
	}
	
	

}
