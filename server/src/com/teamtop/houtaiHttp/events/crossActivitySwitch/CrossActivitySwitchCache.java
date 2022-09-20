package com.teamtop.houtaiHttp.events.crossActivitySwitch;

import java.util.HashMap;
import java.util.Map;

import com.teamtop.houtaiHttp.events.synDictionary.CrossActEnum;
import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.util.db.trans.ObjStrTransUtil;
import com.teamtop.util.log.LogTool;

public class CrossActivitySwitchCache extends AbsServerEvent {

	public static Map<Integer, Integer> CrossActSwitch = new HashMap<>();

	public static Map<Integer, Map<Integer, Integer>> centralActSwitch = new HashMap<>();

	@Override
	public void startServer() throws RunServerException {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.CROSS_ACT_SWITCH);
			String content = globalData.getContent();
			if (content == null || content.equals("") || content.equals("{}")) {

			} else {
				Map<Integer, Integer> map = ObjStrTransUtil.toObj(content, HashMap.class);
				if (map != null) {
					CrossActSwitch = map;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, CrossActivitySwitchCache.class, "CrossActivitySwitchCache startServer");
			throw new RunServerException(e, "");
		}
	}

	@Override
	public void shutdownServer() {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.CROSS_ACT_SWITCH);
			globalData.setContent(ObjStrTransUtil.toStr(CrossActSwitch));
			GlobalCache.doSync(globalData);
		} catch (Exception e) {
			LogTool.error(e, CrossActivitySwitchCache.class, "CrossActivitySwitchCache shutdownServer");
		}
	}

	public static boolean checkCrossOpen(int sysId) {
		if (CrossActSwitch.containsKey(sysId)) {
			Integer state = CrossActSwitch.get(sysId);
			if (state != null && state == 2) {
				return false;
			}
		}
		return true;
	}

	public static boolean checkCrossOpenCrossCmd(Object obj) {
		for(int sysId : CrossActSwitch.keySet()) {
			Integer state = CrossActSwitch.get(sysId);
			if (state != null && state == 2) {
				// 关闭
				if (CrossActEnum.find(obj)) {
					return false;
				}
			}
		}
		return true;
	}

	public static boolean checkCrossCentralOpen(int sysId, int zoneid) {
		Map<Integer, Integer> map = centralActSwitch.get(zoneid);
		if (map != null) {
			if (map.containsKey(sysId)) {
				Integer state = map.get(sysId);
				if (state != null && state == 2) {
					return false;
				}
			}
		}
		return true;
	}

}
