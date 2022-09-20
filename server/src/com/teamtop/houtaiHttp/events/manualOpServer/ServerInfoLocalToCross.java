package com.teamtop.houtaiHttp.events.manualOpServer;

import java.util.List;

import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossEnum;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.netty.server.server1.Client_1;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.HeroCache;

import io.netty.channel.Channel;

public class ServerInfoLocalToCross {
	private static ServerInfoLocalToCross ins;

	public static ServerInfoLocalToCross getIns() {
		if(ins == null) {
			ins = new ServerInfoLocalToCross();
		}
		return ins;
	}
	
	/**
	 * 更新中央服服务器数据
	 */
	public void sendServerAddressData(){
		CrossData crossData = new CrossData();
		Channel channel = Client_1.getIns().getCrossChannel();
		crossData.putObject( CrossEnum.zoneidList, GameProperties.zoneids);
		crossData.putObject( CrossEnum.serverAddress, GameProperties.serverAddress);
		crossData.putObject( CrossEnum.serverPort, GameProperties.serverPort);
		crossData.putObject( CrossEnum.dbAddress, GameProperties.dbAddress);
		
		crossData.putObject( CrossEnum.houtaiHttpPort, GameProperties.houtaiHttpPort);
		crossData.putObject( CrossEnum.rechargePort, GameProperties.rechargePort);
		if (HeroCache.hefuTime > 0) {
			List<Integer> zoneids = GameProperties.zoneids;
			StringBuilder zidStr = new StringBuilder();
			for (Integer zid : zoneids) {
				zidStr.append(zid).append(",");
			}
			if (zidStr.length() > 0) {
				zidStr.setLength(zidStr.length() - 1);
			}
			crossData.putObject(CrossEnum.hefuServer, zidStr.toString());
			crossData.putObject(CrossEnum.hefuTime, HeroCache.hefuTime);
		} else {
			crossData.putObject(CrossEnum.hefuServer, "");
			crossData.putObject(CrossEnum.hefuTime, 0);
		}
		
		NettyWrite.writeXData(channel, CrossConst.REFLASH_IP_PORT, crossData);
	}
	
	
	
}
