package com.teamtop.houtaiHttp.events.recharge.iosRecharge;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;

public class IosRechargeCache extends AbsServerEvent {
	private static IosRechargeCache ins;
	public static IosRechargeCache getIns(){
		if(ins == null) {
			ins = new IosRechargeCache();
		}
		return ins;
	}
	public static int IOS_OPEN;

	@Override
	public void startServer() throws RunServerException {
		/*try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.IOS_RECHARGENUM);
			String content = globalData.getContent();
			if (content == null || content.equals("") || content.equals("{}")) {
				IOS_OPEN=0;
			} else {
				IOS_OPEN = Integer.parseInt(content);
			}
		} catch (Exception e) {
			LogTool.error(e, IosRechargeCache.class, "IosRechargeCache startServer");
		}*/
	}

	@Override
	public void shutdownServer() {
		/*try {
			upDate();
		} catch (Exception e) {
			LogTool.error(e, IosRechargeCache.class, "shutdownServer startServer");
		}*/
	
	}
	
	public void upDate() {
		/*GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.IOS_RECHARGENUM);
		StringBuilder sb = new StringBuilder();
		sb.append(IOS_OPEN);
		globalData.setContent(sb.toString());
		GlobalCache.doSync(globalData);*/
	}

}
