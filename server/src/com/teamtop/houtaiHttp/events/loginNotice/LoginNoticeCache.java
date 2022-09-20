package com.teamtop.houtaiHttp.events.loginNotice;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.util.log.LogTool;

public class LoginNoticeCache extends AbsServerEvent{
	
	public static String NOTICE_CONTENT = "";

	@Override
	public void startServer() throws RunServerException {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.LOGIN_NOTICE);
			String content = globalData.getContent();
			if (content == null || content.equals("") || content.equals("{}")) {

			} else {
				NOTICE_CONTENT = content;
			}
		} catch (Exception e) {
			LogTool.error(e, LoginNoticeCache.class, "LoginNoticeCache startServer wrong");
			throw new RunServerException(e, "");
		}
	}

	@Override
	public void shutdownServer() {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.LOGIN_NOTICE);
			globalData.setContent(NOTICE_CONTENT);
			GlobalCache.doSync(globalData);
		} catch (Exception e) {
			LogTool.error(e, LoginNoticeCache.class, "LoginNoticeCache shutdownServer wrong");
		}
	}

}
