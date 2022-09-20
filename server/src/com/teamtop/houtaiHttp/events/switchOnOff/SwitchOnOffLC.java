package com.teamtop.houtaiHttp.events.switchOnOff;

import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.callback.Callback;
import com.teamtop.houtaiHttp.HouTaiHttpCache;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.util.log.LogTool;

import io.netty.channel.Channel;

public class SwitchOnOffLC {

	private static SwitchOnOffLC ins = null;

	public static synchronized SwitchOnOffLC getIns() {
		if (ins == null) {
			ins = new SwitchOnOffLC();
		}
		return ins;
	}

	/**
	 * 子服联接中央服成功 发送开关状态数据
	 * 
	 * @param channel
	 */
	public void connEvent(Channel channel) {
		CrossData crossData = new CrossData();
		List<Integer> list = CrossCache.getChannelToZoneid().get(channel);
		if (list!=null&&list.size()>0) {
			ConcurrentHashMap<Integer, Integer> onOffCache = HouTaiHttpCache.getOnOffCache().get(list.get(0));
			if (onOffCache!=null) {
				crossData.putObject("onOffCache", onOffCache);
				NettyWrite.writeXData(channel, CrossConst.SWITCH_CONN, crossData, new Callback() {
					@Override
					public void dataReci(Channel channel, CrossData crossData) {
					}
				});
			}
		}else {
			LogTool.warn("connEvent list!=null&&list.size()>0", SwitchOnOffLC.class);
		}
		
	}
}
