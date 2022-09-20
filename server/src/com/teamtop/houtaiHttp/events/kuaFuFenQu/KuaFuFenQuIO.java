package com.teamtop.houtaiHttp.events.kuaFuFenQu;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.event.backstage.events.backstage.kuaFuFenQu.KuaFuFenQuInfo;
import com.teamtop.util.log.LogTool;

import io.netty.channel.Channel;

public class KuaFuFenQuIO {

	private static KuaFuFenQuIO ins;

	private KuaFuFenQuIO() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized KuaFuFenQuIO getIns() {
		if (ins == null) {
			ins = new KuaFuFenQuIO();
		}
		return ins;
	}

	/**
	 * 获取所在跨服分区中央服的信息
	 * @param channel
	 * @param crossData
	 */
	public void getKuaFufenQuInfo(Channel channel, CrossData crossData) {
		String pf = crossData.getObject(KuaFuFenQuEnum.pf.name(), String.class);
		int zoneid = crossData.getObject(KuaFuFenQuEnum.zoneid.name(), Integer.class);
		if(pf==null) {
			return;
		}
		if(zoneid==0) {
			return;
		}
		LogTool.info("KuaFuFenQuIO getKuaFufenQuInfo zoneid=" + zoneid + ", pf=" + pf, KuaFuFenQuIO.class);
		crossData.finishGet();
		KuaFuFenQuInfo kuaFuFenQuInfo = KuaFuFenQuCache.getKuaFuFenQuInfo(pf, zoneid);
		crossData.putObject(KuaFuFenQuEnum.centralIndex.name(), kuaFuFenQuInfo.getCentralIndex());
		crossData.putObject(KuaFuFenQuEnum.centralIp.name(), kuaFuFenQuInfo.getCentralIp());
		crossData.putObject(KuaFuFenQuEnum.centralPort.name(), kuaFuFenQuInfo.getCentralPort());
		NettyWrite.writeBlockCallback(channel, crossData, crossData.getCallbackCmd());
	}

	/**
	 * 更新游戏服中央服连接
	 */
	public void updateKuaFuFenQuInfo(KuaFuFenQuInfo kuaFuFenQuInfo, int zoneid) {
		try {
			CrossData crossData = new CrossData();
			crossData.putObject(KuaFuFenQuEnum.centralIndex.name(), kuaFuFenQuInfo.getCentralIndex());
			crossData.putObject(KuaFuFenQuEnum.centralIp.name(), kuaFuFenQuInfo.getCentralIp());
			crossData.putObject(KuaFuFenQuEnum.centralPort.name(), kuaFuFenQuInfo.getCentralPort());
			Channel channel = CrossCache.getChannel(zoneid);
			NettyWrite.writeXData(channel, CrossConst.UPDATE_KUAFUFENZU_CENTRAL_INFO, crossData);
		} catch (Exception e) {
			LogTool.error(e, KuaFuFenQuIO.class, "KuaFuFenQuIO updateKuaFuFenQuInfo");
		}
	}

	public void updateKuaFuFenQuInfoHandel(Channel channel, CrossData crossData) {
		try {
			int centralIndex = crossData.getObject(KuaFuFenQuEnum.centralIndex.name(), Integer.class);
			String centralIp = crossData.getObject(KuaFuFenQuEnum.centralIp.name(), String.class);
			int centralPort = crossData.getObject(KuaFuFenQuEnum.centralPort.name(), Integer.class);
			KuaFuFenQuCache.centralIndex = centralIndex;
			KuaFuFenQuCache.centralIp = centralIp;
			KuaFuFenQuCache.centralPort = centralPort;
			Client_2 client_2 = Client_2.getIns();
			client_2.getCrossChannel().disconnect();
			client_2 = new Client_2(centralIp, centralPort, "子服2");
		} catch (Exception e) {
			LogTool.error(e, KuaFuFenQuIO.class, "KuaFuFenQuIO updateKuaFuFenQuInfoHandel");
		}
	}

}
