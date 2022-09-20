package com.teamtop.houtaiHttp.events.welfareNotice;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.util.log.LogTool;

public class WelfareNoticeCache extends AbsServerEvent {

	public static String WelfareNotice = "";

	@Override
	public void startServer() throws RunServerException {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.WELFARE_NOTICE);
			String content = globalData.getContent();
			if (content == null || content.equals("") || content.equals("{}")) {

			} else {
				WelfareNotice = content;
			}
		} catch (Exception e) {
			LogTool.error(e, WelfareNoticeCache.class, "WelfareNoticeCache startServer wrong");
			throw new RunServerException(e, "");
		}
	}

	@Override
	public void shutdownServer() {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.WELFARE_NOTICE);
			globalData.setContent(WelfareNotice);
			GlobalCache.doSync(globalData);
		} catch (Exception e) {
			LogTool.error(e, WelfareNoticeCache.class, "WelfareNoticeCache shutdownServer wrong");
		}
	}

}
