package com.teamtop.houtaiHttp.events.timingSelfMotionServer;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;

public class TimingSelfMotionServerCache extends AbsServerEvent {

	/**
	 * 定时自动开服信息记录
	 * key:平台，value:定时信息
	 */
	private static Map<String, TimingInfo> pfTimingMap = new HashMap<>();

	public static Map<String, TimingInfo> getPfTimingMap() {
		return pfTimingMap;
	}

	public static void setPfTimingMap(Map<String, TimingInfo> pfTimingMap) {
		TimingSelfMotionServerCache.pfTimingMap = pfTimingMap;
	}

	@Override
	public void startServer() throws RunServerException {
		GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.TIMING_SELF_MOTION);
		String content = globalData.getContent();
		if (content == null || content.equals("") || content.equals("{}")) {

		} else {
			Type type = new TypeReference<Map<String, TimingInfo>>() {}.getType();
			pfTimingMap = JSONObject.parseObject(content, type);
		}
	}

	@Override
	public void shutdownServer() {
		GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.TIMING_SELF_MOTION);
		globalData.setContent(JSON.toJSONString(pfTimingMap));
		GlobalCache.doSync(globalData);
	}

}
