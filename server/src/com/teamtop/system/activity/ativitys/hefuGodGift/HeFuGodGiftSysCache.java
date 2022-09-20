package com.teamtop.system.activity.ativitys.hefuGodGift;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.util.log.LogTool;

public class HeFuGodGiftSysCache extends AbsServerEvent{
	
	
	private static HeFuGodGiftCache heFuGodGiftCache;
	
	

	public static HeFuGodGiftCache getHeFuGodGiftCache() {
		return heFuGodGiftCache;
	}



	public static void setHeFuGodGiftCache(HeFuGodGiftCache heFuGodGiftCache) {
		HeFuGodGiftSysCache.heFuGodGiftCache = heFuGodGiftCache;
	}



	@Override
	public void startServer() throws RunServerException {
		GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.HEFU_GODGIFT);
		String content = globalData.getContent();
		if (content == null || content.equals("") || content.equals("{}")) {
			setHeFuGodGiftCache(new HeFuGodGiftCache());
		} else {
			setHeFuGodGiftCache(JSONObject.parseObject(content, HeFuGodGiftCache.class));
		}
		
		
	}
	
	@Override
	public void shutdownServer() {
		GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.HEFU_GODGIFT);
		globalData.setContent(JSON.toJSONString(heFuGodGiftCache));
		GlobalCache.doSync(globalData);
	}
	
	public static void  updateGlobalData() {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.HEFU_GODGIFT);
			globalData.setContent(JSON.toJSONString(heFuGodGiftCache));
			GlobalCache.doSync(globalData);
		} catch (Exception e) {
			LogTool.error(e, HeFuGodGiftSysCache.class, " updateGlobalData exception");
		}

	}

}
