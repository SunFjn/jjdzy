package com.teamtop.houtaiHttp.events.serverSelfMotion;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.callback.Callback;
import com.teamtop.houtaiHttp.events.manualOpServer.ServerInfoCache;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.event.backstage.events.backstage.serverInfoList.M_ServerInfo;
import com.teamtop.system.hero.HeroDao;
import com.teamtop.util.log.LogTool;

import io.netty.channel.Channel;

public class ServerSelfMotionIO {

	private static ServerSelfMotionIO ins;

	private ServerSelfMotionIO() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized ServerSelfMotionIO getIns() {
		if (ins == null) {
			ins = new ServerSelfMotionIO();
		}
		return ins;
	}

	public void getServerPlayerNum(String pf, int zoneid) {
		ConcurrentHashMap<Integer, Channel> zoneidToChannel = CrossCache.getZoneidToChannel();
		CrossData crossData = new CrossData();
		crossData.putObject(ServerSelfMotionEnum.zoneid, zoneid);
		Channel channel = zoneidToChannel.get(zoneid);
		if(channel==null) {
			LogTool.warn("channel为空 pf="+pf+", zoneid="+zoneid+", zoneidToChannel="+zoneidToChannel.toString(), ServerSelfMotionIO.class);
		}
		LogTool.info("channel is playerNum88 , " + channel.remoteAddress().toString(), ServerSelfMotionIO.class);
		NettyWrite.writeXData(channel, CrossConst.AUTO_OPEN_SERVER, crossData, new Callback() {

			@Override
			public void dataReci(Channel channel, CrossData crossData) {
				long playerNum = crossData.getObject(ServerSelfMotionEnum.heroNum, Long.class);
				Map<Integer, M_ServerInfo> map = ServerInfoCache.pfServerMap.get(pf);
				LogTool.info("channel is playerNum99 , playerNum=" + playerNum, ServerSelfMotionIO.class);
				if (map != null) {
					LogTool.info("channel is playerNum00 , zoneid=" + zoneid, ServerSelfMotionIO.class);
					M_ServerInfo m_ServerInfo = map.get(zoneid);
					if (m_ServerInfo != null) {
						LogTool.info("channel is playerNum22 , playerNum=" + playerNum, ServerSelfMotionIO.class);
						m_ServerInfo.setPlayerNum(playerNum);
					}
				}
			}
		});
	}

	public void getLocalServerPlayerNum(Channel channel, CrossData crossData) {
		try {
			LogTool.info("getLocalServerPlayerNum, in", ServerSelfMotionIO.class);
			int zoneid = crossData.getObject(ServerSelfMotionEnum.zoneid, Integer.class);
			long playerNum = HeroDao.getIns().findIpNum(zoneid);
			LogTool.info("getLocalServerPlayerNum, zoneid=" + zoneid + ", playerNum=" + playerNum,
					ServerSelfMotionIO.class);
			crossData.putObject(ServerSelfMotionEnum.heroNum, playerNum);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
		} catch (Exception e) {
			LogTool.error(e, ServerSelfMotionIO.class, "ServerSelfMotionIO getLocalServerPlayerNum");
		}
	}

}
