package com.teamtop.system.lvBuRising;

import java.lang.reflect.Type;
import java.util.TreeSet;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.system.lvBuRising.model.LvBuRisingRankModel;
import com.teamtop.util.log.LogTool;

public class LvBuRisingCache extends AbsServerEvent {

	public static TreeSet<LvBuRisingRankModel> rankSet = new TreeSet<>();

	@Override
	public void startServer() throws RunServerException {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.LVBURISING);
			String content = globalData.getContent();
			if (content == null || content.equals("") || content.equals("{}")) {

			} else {
				Type type = new TypeReference<TreeSet<LvBuRisingRankModel>>() {
				}.getType();
				TreeSet<LvBuRisingRankModel> tempRank = JSONObject.parseObject(content, type);
				if (tempRank != null) {
					rankSet = tempRank;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, LvBuRisingCache.class, "LvBuRisingCache startServer");
			throw e;
		}
	}

	@Override
	public void shutdownServer() {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.LVBURISING);
			String jsonStr = JSON.toJSONString(rankSet);
			globalData.setContent(jsonStr);
			GlobalCache.doSync(globalData);
		} catch (Exception e) {
			LogTool.error(e, LvBuRisingCache.class, "LvBuRisingCache shutdownServer");
		}
	}

}
