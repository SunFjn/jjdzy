package com.teamtop.houtaiHttp.events.rechargeWhiteList;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.util.db.trans.ObjStrTransUtil;
import com.teamtop.util.log.LogTool;

public class RechargeWhiteListCache extends AbsServerEvent {

	public static int RECHARGE_WL_SWICH = 1;// 1开启，2关闭

	/** 各小平台的开关状态 */
	private static Map<String, Integer> pfSwitch = new HashMap<>();

	private static Set<String> rechargeWhiteIpSet = new HashSet<>();

	public static Map<String, Integer> getPfSwitch() {
		return pfSwitch;
	}

	public static void setPfSwitch(Map<String, Integer> pfSwitch) {
		RechargeWhiteListCache.pfSwitch = pfSwitch;
	}

	public static Set<String> getRechargeWhiteIpSet() {
		return rechargeWhiteIpSet;
	}

	public static void addToList(String ip) {
		rechargeWhiteIpSet.add(ip);
	}

	public static void removeFromList(String ip) {
		rechargeWhiteIpSet.remove(ip);
	}

	@Override
	public void startServer() throws RunServerException {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.RECHARGE_WHITE_IP_LIST);
			String content = globalData.getContent();
			if (content == null || content.equals("") || content.equals("{}")) {

			} else {
				if (content.indexOf("_") == -1) {
					return;
				}
				String[] arr = content.split("_");
				RECHARGE_WL_SWICH = Integer.parseInt(arr[0]);
				HashSet<String> set = ObjStrTransUtil.toObj(arr[1], HashSet.class);
				if (set != null) {
					rechargeWhiteIpSet = set;
				}
				if (arr.length > 2) {
					Map<String, Integer> map = ObjStrTransUtil.toObj(arr[2], HashMap.class);
					if (map != null) {
						pfSwitch = map;
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, RechargeWhiteListCache.class, "RechargeWhiteListCache startServer");
			throw new RunServerException(e, "");
		}
	}

	@Override
	public void shutdownServer() {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.RECHARGE_WHITE_IP_LIST);
			globalData.setContent(RECHARGE_WL_SWICH + "_" + ObjStrTransUtil.toStr(rechargeWhiteIpSet) + "_"
					+ ObjStrTransUtil.toStr(pfSwitch));
			GlobalCache.doSync(globalData);
		} catch (Exception e) {
			LogTool.error(e, RechargeWhiteListCache.class, "RechargeWhiteListCache shutdownServer");
		}
	}

}
