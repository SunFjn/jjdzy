package com.teamtop.houtaiHttp.events.serverMaintain;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.util.log.LogTool;

public class ServerMaintainCache extends AbsServerEvent {

	public static int MAINTAIN_STATE = -1;// 0:维护, 1:正常， 2：火爆，3：白名单

	public static String CONTENT = "";

	@Override
	public void startServer() throws RunServerException {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.SERVER_MAINTAIN);
			String content = globalData.getContent();
			if (content == null || content.equals("") || content.equals("{}")) {

			} else {
				String[] arr = content.split("_&");
				MAINTAIN_STATE = Integer.parseInt(arr[0]);
				if(arr.length>1) {					
					CONTENT = arr[1];
				}
			}
		} catch (Exception e) {
			LogTool.error(e, ServerMaintainCache.class, "ServerMaintainCache startServer wrong");
			throw new RunServerException(e, "");
		}
	}

	@Override
	public void shutdownServer() {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.SERVER_MAINTAIN);
			StringBuilder sb = new StringBuilder();
			sb.append(MAINTAIN_STATE).append("_&").append(CONTENT);
			globalData.setContent(sb.toString());
			GlobalCache.doSync(globalData);
		} catch (Exception e) {
			LogTool.error(e, ServerMaintainCache.class, "ServerMaintainCache shutdownServer wrong");
		}
	}

}
