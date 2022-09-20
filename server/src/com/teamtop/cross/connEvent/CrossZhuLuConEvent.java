package com.teamtop.cross.connEvent;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.callback.Callback;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.crossZhuLu.cross.CrossZhuLuCache;
import com.teamtop.system.crossZhuLu.cross.CrossZhuLuEnum;
import com.teamtop.system.crossZhuLu.model.CrossZhuLuRoomInfo;
import com.teamtop.util.log.LogTool;

import io.netty.channel.Channel;

public class CrossZhuLuConEvent extends CrossConnEvent {

	@Override
	public void conn(Channel channel) {
		try {
			CrossData crossData = new CrossData();
			int partId = CrossCache.getPartId(channel);
			CrossZhuLuRoomInfo roomInfo = CrossZhuLuCache.roomInfoMap.get(partId);
			String name = "";
			if (roomInfo != null && roomInfo.getLastMvpHero() != null) {
				name = roomInfo.getLastMvpHero();
			}
			crossData.putObject(CrossZhuLuEnum.Name, name);
			NettyWrite.writeXData(channel, CrossConst.CROSS_ZHU_LU_NOTICE_LAST_MVP_NAME_LC, crossData, new Callback() {
				@Override
				public void dataReci(Channel channel, CrossData crossData) {
					LogTool.info("CrossZhuLuConEvent connEvent,matchServer:" + channel, this);
				}
			});
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
