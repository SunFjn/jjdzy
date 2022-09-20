package com.teamtop.houtaiHttp.events.serverEvent.setServerWarn;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;

public class SetServerWarnCache extends AbsServerEvent {
	/** 服务器预警数 */
	private static int serverWarnNum;
	/** 上次发送邮件时间(时间戳) */
	private static int sendMailTime;

	public static int getServerWarnNum() {
		return serverWarnNum;
	}

	public static void setServerWarnNum(int serverWarnNum) {
		SetServerWarnCache.serverWarnNum = serverWarnNum;
	}

	protected static int getSendMailTime() {
		return sendMailTime;
	}

	protected static void setSendMailTime(int sendMailTime) {
		SetServerWarnCache.sendMailTime = sendMailTime;
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub
		GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.SETSERVERWARN);
		String content = globalData.getContent();
		if (content == null || content.equals("") || content.equals("{}")) {
		} else {
			serverWarnNum = Integer.parseInt(content);
		}
	}

	@Override
	public void shutdownServer() {
		// TODO Auto-generated method stub
		GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.SETSERVERWARN);
		globalData.setContent(String.valueOf(serverWarnNum));
		GlobalCache.doSync(globalData);
	}

}
