package com.teamtop.redeploy.platformInfo;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.GameProperties;
import com.teamtop.main.RunServerException;
import com.teamtop.netty.server.cross.ClientThread;
import com.teamtop.netty.server.server1.Client_1;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.log.LogTool;

public class PlatformInfoCache extends AbsServerEvent {

	public static Map<String, PlatformInfo> platformMap = new HashMap<>();
	public static Map<String, Client_1> clientMap = new HashMap<>();

	@Override
	public void startServer() throws RunServerException {
		try {
			List<PlatformInfo> list = PlatformDao.getDao().findAllPlatform();
			int size = list.size();
			for (int i = 0; i < size; i++) {
				PlatformInfo platformInfo = list.get(i);
				if (platformInfo.getPf().equals(GameProperties.platform)) {
					continue;
				}
				platformMap.put(platformInfo.getPf(), platformInfo);
				Client_1 client_1 = new Client_1(platformInfo.getPfIp(), platformInfo.getPort(),
						platformInfo.getPf() + "后台client");
				ClientThread.addChannelCheck(client_1);
				clientMap.put(platformInfo.getPf(), client_1);
			}
		} catch (Exception e) {
			LogTool.error(e, this, "PlatformInfoCache startServer");
			throw new RuntimeException();
		}
	}

	@Override
	public void shutdownServer() {
		// TODO Auto-generated method stub
		super.shutdownServer();
	}

}
