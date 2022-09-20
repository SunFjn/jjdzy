package com.teamtop.houtaiHttp.events.serverSelfMotion;

import java.util.HashMap;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.util.cache.union.UC;
import com.teamtop.util.log.LogTool;

public class ServerSelfMotionCache extends AbsServerEvent {
    /**
     * 本平台后台 自动开服状态 0没有开启 1开启
     */
	public static int AUTO_OPEN_STATE=1;
	/** 自动开服条件（人数） */
	public static int AUTO_OPEN_NUM = -1;
	/** 当前各平台已开的最大服务器区号 */
	public static Map<String, Integer> pfMaxZoneidMap = UC.reg("pfMaxZoneidMap", new HashMap<>());

	@Override
	public void startServer() throws RunServerException {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.SERVER_SELF_MONTION);
			String content = globalData.getContent();
			if (content == null || content.equals("") || content.equals("{}")) {

			} else {
				AUTO_OPEN_NUM = Integer.parseInt(content);
			}
			
			GlobalData auto_open_state = GlobalCache.getGlobalData(GlobalConst.SERVER_SELF_STATE);
			String content1 = auto_open_state.getContent();
			
			if (content1 == null || content1.equals("") || content1.equals("{}")) {

			} else {
				AUTO_OPEN_STATE = Integer.parseInt(content1);
			}
		} catch (Exception e) {
			LogTool.error(e, ServerSelfMotionCache.class, "ServerSelfMotionCache startServer");
			throw new RunServerException(e, "");
		}
	}

	@Override
	public void shutdownServer() {
		GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.SERVER_SELF_MONTION);
		StringBuilder sb = new StringBuilder();
		sb.append(AUTO_OPEN_NUM);
		globalData.setContent(sb.toString());
		GlobalCache.doSync(globalData);
		updateAuto_Update();
	}
	
	public static void updateAuto_Update() {
		GlobalData auto_open_state = GlobalCache.getGlobalData(GlobalConst.SERVER_SELF_STATE);
		StringBuilder sb = new StringBuilder();
		sb.append(AUTO_OPEN_STATE);
		auto_open_state.setContent(sb.toString());
		GlobalCache.doSync(auto_open_state);
	}
	

}
