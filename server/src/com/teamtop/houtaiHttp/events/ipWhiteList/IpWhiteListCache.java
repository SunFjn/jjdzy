package com.teamtop.houtaiHttp.events.ipWhiteList;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;

public class IpWhiteListCache extends AbsServerEvent {

	/**
	 * 开启状态
	 * 1：开启，0:关闭
	 */
	public static int OPEN_SWITCH = 0;

	/** ip注册限制人数*/
	public static int LIMIT_NUM = 10;
	
	public static Set<String> checkSet = new HashSet<>();

	@Override
	public void startServer() throws RunServerException {
		GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.IP_WHITE_LIST);
		String content = globalData.getContent();
		if (content == null || content.equals("") || content.equals("{}")) {

		} else {
			String[] arr = content.split("_");
			OPEN_SWITCH = Integer.parseInt(arr[0]);
			LIMIT_NUM = Integer.parseInt(arr[1]);
		}
	}

	@Override
	public void shutdownServer() {
		GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.IP_WHITE_LIST);
		StringBuilder sb = new StringBuilder();
		sb.append(OPEN_SWITCH).append("_").append(LIMIT_NUM);
		globalData.setContent(sb.toString());
		GlobalCache.doSync(globalData);
	}

}
