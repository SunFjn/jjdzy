package com.teamtop.system.activity.ativitys.rechargeRankAct;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeSet;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.teamtop.cross.CrossZone;
import com.teamtop.main.RunServerException;
import com.teamtop.system.activity.ActivitySysCache;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.rechargeRankAct.model.CrossPeriodCache;
import com.teamtop.system.activity.ativitys.rechargeRankAct.model.RechargeRankActModel;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_czph_755;
import excel.struct.Struct_czph_755;
import excel.struct.Struct_huodong_009;

public class RechargeRankActSysCache extends AbsServerEvent {
	/** 充值排行(活动)配置 第一层key:期数，第二层key:排名rank 方便发奖励 **/
	private static Map<Integer, Map<Integer, Struct_czph_755>> rankConfigMap = new HashMap<>();
	/** 充值排行(活动)配置 key:index value:endTime结束时间 **/
	private static Map<Integer, Integer> indexConfigMap = new HashMap<>();

	/** 排名奖励 */
	private static TreeSet<RechargeRankActModel> rankTreeSet = new TreeSet<>();
	/** 跨期缓存 */
	private static CrossPeriodCache crossPeriodCache;

	private static Object[] openUIObjArray = null;

	public static Map<Integer, Integer> getIndexConfigMap() {
		return indexConfigMap;
	}

	public static Object[] getOpenUIObjArray() {
		return openUIObjArray;
	}

	public static void setOpenUIObjArray(Object[] openUIObjArray) {
		RechargeRankActSysCache.openUIObjArray = openUIObjArray;
	}

	public static Map<Integer, Map<Integer, Struct_czph_755>> getRankConfigMap() {
		return rankConfigMap;
	}

	public static TreeSet<RechargeRankActModel> getRankTreeSet() {
		return rankTreeSet;
	}

	public static void setRankTreeSet(TreeSet<RechargeRankActModel> rankTreeSet) {
		RechargeRankActSysCache.rankTreeSet = rankTreeSet;
	}

	public static CrossPeriodCache getCrossPeriodCache() {
		return crossPeriodCache;
	}

	public static Map<Long, Integer[]> getNewQsDataMap() {
		return crossPeriodCache.getNewQsDataMap();
	}

	public static int getNewQs() {
		return crossPeriodCache.getNewQs();
	}

	public static void setNewQs(int newQs) {
		crossPeriodCache.setNewQs(newQs);
	}

	@Override
	public void initExcel() throws RunServerException {
		// TODO Auto-generated method stub
		if (CrossZone.isCrossServer()) {
			return;
		}
		rankConfigMap.clear();
		indexConfigMap.clear();
		List<Struct_czph_755> sortList = Config_czph_755.getIns().getSortList();
		for (Struct_czph_755 struct_czph_755 : sortList) {
			int qs = struct_czph_755.getQs();
			Map<Integer, Struct_czph_755> map = rankConfigMap.get(qs);
			if (map == null) {
				map = new HashMap<>();
				rankConfigMap.put(qs, map);
			}
			int rankLow = struct_czph_755.getRank()[0][0];
			int rankHigh = struct_czph_755.getRank()[0][1];
			for (int i = rankLow; i <= rankHigh; i++) {
				map.put(i, struct_czph_755);
			}
		}

		List<Struct_huodong_009> sortList2 = ActivitySysCache.getSortList();
		for (Struct_huodong_009 struct_huodong_009 : sortList2) {
			if (struct_huodong_009.getId() == ActivitySysId.CROSS_RECHARGE_RANK_ACT) {
				int index = struct_huodong_009.getIndex();
				int endTime = 0;
				try {
					endTime = TimeDateUtil.getTimeIntByStrTime(struct_huodong_009.getHend(), "yyyy-MM-dd hh:mm:ss");
				} catch (Exception e) {
					// TODO Auto-generated catch block
					LogTool.error(e, this, "initExcel indexConfigMap init error");
				}
				indexConfigMap.put(index, endTime);
			}
		}
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub
		String content = "";
		try {
			content = GlobalCache.getGlobalData(GlobalConst.CROSS_RECHARGE_RANK_ACT_CROSS_PERIOD_CACHE).getContent();
			if (content == null || content.equals("") || content.equals("{}")) {
				crossPeriodCache = new CrossPeriodCache();
			} else {
				crossPeriodCache = JSONObject.parseObject(content, CrossPeriodCache.class);
			}
		} catch (Exception e) {
			crossPeriodCache = new CrossPeriodCache();
			LogTool.error(e, this, "startServer content:" + content);
		}
	}

	@Override
	public void shutdownServer() {
		// TODO Auto-generated method stub
		String content = "";
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.CROSS_RECHARGE_RANK_ACT_CROSS_PERIOD_CACHE);
			content = JSON.toJSONString(crossPeriodCache);
			globalData.setContent(content);
			GlobalCache.doSync(globalData);
		} catch (Exception e) {
			LogTool.error(e, this, "shutdownServer:" + content);
		}
	}

}
