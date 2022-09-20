package com.teamtop.netty.server.server2;

import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.houtaiHttp.events.kuaFuFenQu.KuaFuFenQuCache;
import com.teamtop.houtaiHttp.events.kuaFuFenQu.KuaFuFenQuEnum;
import com.teamtop.netty.handlers.CrossConnIODecoder;
import com.teamtop.netty.server.cross.CrossClient;
import com.teamtop.netty.server.server1.Client_1;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.util.log.LogTool;

import io.netty.channel.Channel;
/**
 * 子服2——>玩法中央服
 * @author hepl
 *
 */
public class Client_2 extends CrossClient{
	private static Client_2 ins = null;

	public static Client_2 getIns() {
		if (ins == null) {
			// ins = new Client_2(GameProperties.cross_ip_2,
			// GameProperties.cross_port_2,"子服2");
			getKuaFufenQuInfoAndNewClient();
		}
		return ins;
	}

	public Client_2(String ip, int port, String serverName) {
		super(ip, port, serverName,CrossConnIODecoder.class);
	}

	public static void getKuaFufenQuInfoAndNewClient() {
		CrossData crossData = new CrossData();
		crossData.putObject(KuaFuFenQuEnum.pf.name(), GameProperties.platform);
		crossData.putObject(KuaFuFenQuEnum.zoneid.name(), GameProperties.getFirstZoneId());
		Channel houtaiChannel = Client_1.getIns().getCrossChannel();
		if (houtaiChannel == null) {
			return;
		}
		CrossData infoData = NettyWrite.writeBlockData(houtaiChannel, CrossConst.GET_KUAFUFENZU_CENTRAL_INFO, 0, crossData);
		int centralIndex = infoData.getObject(KuaFuFenQuEnum.centralIndex.name(), Integer.class);
		String centralIp = infoData.getObject(KuaFuFenQuEnum.centralIp.name(), String.class);
		int centralPort = infoData.getObject(KuaFuFenQuEnum.centralPort.name(), Integer.class);
		KuaFuFenQuCache.centralIndex = centralIndex;
		KuaFuFenQuCache.centralIp = centralIp;
		KuaFuFenQuCache.centralPort = centralPort;
		ins = new Client_2(centralIp, centralPort, "子服2");
		if (ins == null) {
			LogTool.error(new Exception(), Client_2.class, "getKuaFufenQuInfoAndNewClient centralIndex=" + centralIndex
					+ ", centralIp=" + centralIp + ", centralPort=" + centralPort);
		} else {
			LogTool.info("跨服连接ip端口 getKuaFufenQuInfoAndNewClient centralIndex=" + centralIndex
					+ ", centralIp=" + centralIp + ", centralPort=" + centralPort,Client_2.class);
		}
	}

}
