package com.teamtop.houtaiHttp.events.trueNameAndAntiAddiction;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.util.log.LogTool;

public class TrueNameAndAntiAddictionCache extends AbsServerEvent {
	
	/** 
	 * 实名验证开关
	 * 0:关闭
	 * 1:开启
	 */
	public static int TRUENAME_SWITCH = 0;
	
	/**
	 * 防沉迷开关
	 * 0:关闭
	 * 1:开启
	 */
	public static int ANTI_ADDICTION_SWITCH = 0;


	@Override
	public void startServer() throws RunServerException {
		GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.TRUENAME_ANTI_SWITCH);
		String content = globalData.getContent();
		if (content == null || content.equals("") || content.equals("{}")) {

		} else {
			String[] arr = content.split("_");
			TRUENAME_SWITCH = Integer.parseInt(arr[0]);
			ANTI_ADDICTION_SWITCH = Integer.parseInt(arr[1]);
		}
	}

	@Override
	public void shutdownServer() {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.TRUENAME_ANTI_SWITCH);
			globalData.setContent(TRUENAME_SWITCH + "_" + ANTI_ADDICTION_SWITCH);
			GlobalCache.doSync(globalData);
		} catch (Exception e) {
			LogTool.error(e, TrueNameAndAntiAddictionCache.class, "TrueNameAndAntiAddictionCache shutdownServer");
		}
	}

}
