package com.teamtop.houtaiHttp.events.manualOpServer;

import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.netty.util.NettyWrite;

import io.netty.channel.Channel;

public class ServerInfoCrossToLocal {
	private static ServerInfoCrossToLocal ins;

	public static ServerInfoCrossToLocal getIns() {
		if(ins == null) {
			ins = new ServerInfoCrossToLocal();
		}
		return ins;
	}
	
	/**
	 * 更新中央服服务器数据
	 */
	public void getServerAddressData( Channel channel){
		CrossData crossData = new CrossData();
		NettyWrite.writeXData(channel, CrossConst.REFLASH_IP_PORT_GET, crossData);
	}
	
	
	
}
