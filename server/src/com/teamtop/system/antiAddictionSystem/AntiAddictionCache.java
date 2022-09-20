package com.teamtop.system.antiAddictionSystem;

import java.util.HashMap;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.antiAddictionSystem.model.AntiAddictionInfo;
import com.teamtop.system.event.serverEvent.AbsServerEvent;

public class AntiAddictionCache extends AbsServerEvent {

	private static Map<String, AntiAddictionInfo> antiMap = new HashMap<>();

	public static Map<String, AntiAddictionInfo> getAntiMap() {
		return antiMap;
	}

	public static void setAntiMap(Map<String, AntiAddictionInfo> antiMap) {
		AntiAddictionCache.antiMap = antiMap;
	}

	@Override
	public void startServer() throws RunServerException {
		/*try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.ANTI_ADDITION_INFO);
			String content = globalData.getContent();
			if (content == null || content.equals("") || content.equals("{}")) {

			}else {
				Type type = new TypeReference<Map<String, AntiAddictionInfo>>() {}.getType();
				Map<String, AntiAddictionInfo> map = JSONObject.parseObject(content, type);
				antiMap.putAll(map);
			}
		} catch (Exception e) {
			LogTool.error(e, AntiAddictionCache.class, "AntiAddictionCache startServer");
			throw new RunServerException(e, "");
		}*/
	}

	@Override
	public void shutdownServer() {
		/*try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.ANTI_ADDITION_INFO);
			globalData.setContent(JSON.toJSONString(antiMap));
			GlobalCache.doSync(globalData);
		} catch (Exception e) {
			LogTool.error(e, AntiAddictionCache.class, "AntiAddictionCache shutdownServer");
		}*/
	}

}
