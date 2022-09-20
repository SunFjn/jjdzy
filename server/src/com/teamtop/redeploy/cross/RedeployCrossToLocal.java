package com.teamtop.redeploy.cross;

import java.util.Iterator;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossEnum;
import com.teamtop.cross.CrossZone;
import com.teamtop.cross.callback.Callback;
import com.teamtop.houtaiHttp.events.version.VersionCache;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.util.log.LogTool;

import io.netty.channel.Channel;

public class RedeployCrossToLocal {

	/**
	 * 获取版本号
	 */
	public static void getVersionCL(){
		CrossData crossData = new CrossData();
		ConcurrentHashMap<Channel, List<Integer>> channelToZoneid = CrossCache.getChannelToZoneid();
		Iterator<Channel> iterator = channelToZoneid.keySet().iterator();
		while( iterator.hasNext()){
			Channel channel = iterator.next();
			NettyWrite.writeXData(channel, CrossConst.GET_ONE_VERSION_CL, crossData, new Callback() {
				@Override
				public void dataReci(Channel channel, CrossData crossData) {
					//统计
					String zidStr = crossData.getObject(CrossEnum.zoneidList, String.class);
					String version = crossData.getObject(CrossEnum.version, String.class);
					LogTool.info("收集到的版本号："+zidStr+" "+version, this);
					sendVersionTo9999CL(zidStr, version);
				}
			});
		}
	}
	
	public static void sendVersionTo9999CL(String zidStr, String version){
		CrossData crossData = new CrossData();
		crossData.putObject(CrossEnum.zoneidList, zidStr);
		crossData.putObject(CrossEnum.version, version);
		
		int zidSaveVersion = VersionCache.getZidSaveVersion();
		Channel channel9999 = CrossCache.getChannel(zidSaveVersion);
		NettyWrite.writeXData(channel9999, CrossConst.SEND_ONE_VERSION_CL, crossData);
		if(channel9999 == null){
			System.out.println(channel9999+"区竟然不存在？？");
		}
	}
}
