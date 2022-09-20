package com.teamtop.system.activity.ativitys.eightDoorAppraiseRankAct;

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
import com.teamtop.system.activity.ativitys.eightDoorAppraiseRankAct.model.EightDoorAppraiseRankActModel;
import com.teamtop.system.activity.ativitys.rechargeRankAct.model.CrossPeriodCache;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_wszwxsxspm_325;
import excel.struct.Struct_huodong_009;
import excel.struct.Struct_wszwxsxspm_325;

public class EightDoorAppraiseRankActSysCache extends AbsServerEvent {
	/** 排行(活动)配置 第一层key:期数，第二层key:排名rank 方便发奖励 **/
	private static Map<Integer, Map<Integer, Struct_wszwxsxspm_325>> rankConfigMap = new HashMap<>();
	/** 排行结束时间(活动)配置 key:index value:endTime结束时间 **/
	private static Map<Integer, Integer> indexConfigMap = new HashMap<>();

	/** 排名奖励 */
	private static TreeSet<EightDoorAppraiseRankActModel> rankTreeSet = new TreeSet<>();
	/** 跨期缓存 */
	private static CrossPeriodCache crossPeriodCache;

	private static Object[] rankObjArray = null;

	private static Object[] secordThirdObjArray = null;

	private static int firstBodyId = 0;

	public static Map<Integer, Integer> getIndexConfigMap() {
		return indexConfigMap;
	}

	public static Object[] getRankObjArray() {
		return rankObjArray;
	}

	public static Object[] getSecordThirdObjArray() {
		return secordThirdObjArray;
	}

	public static void setRankObjArray(Object[] rankObjArray) {
		EightDoorAppraiseRankActSysCache.rankObjArray = rankObjArray;
	}

	public static void setSecordThirdObjArray(Object[] secordThirdObjArray) {
		EightDoorAppraiseRankActSysCache.secordThirdObjArray = secordThirdObjArray;
	}

	public static int getFirstBodyId() {
		return firstBodyId;
	}

	public static void setFirstBodyId(int firstBodyId) {
		EightDoorAppraiseRankActSysCache.firstBodyId = firstBodyId;
	}

	public static Map<Integer, Map<Integer, Struct_wszwxsxspm_325>> getRankConfigMap() {
		return rankConfigMap;
	}

	public static TreeSet<EightDoorAppraiseRankActModel> getRankTreeSet() {
		return rankTreeSet;
	}

	public static void setRankTreeSet(TreeSet<EightDoorAppraiseRankActModel> rankTreeSet) {
		EightDoorAppraiseRankActSysCache.rankTreeSet = rankTreeSet;
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
		List<Struct_wszwxsxspm_325> sortList = Config_wszwxsxspm_325.getIns().getSortList();
		for (Struct_wszwxsxspm_325 struct_wszwxsxspm_325 : sortList) {
			if (struct_wszwxsxspm_325.getXtid() == ActivitySysId.EIGHTDOOR_APPRAISERANK_ACT) {
				int qs = struct_wszwxsxspm_325.getQs();
				Map<Integer, Struct_wszwxsxspm_325> map = rankConfigMap.get(qs);
				if (map == null) {
					map = new HashMap<>();
					rankConfigMap.put(qs, map);
				}
				int rankLow = struct_wszwxsxspm_325.getRank()[0][0];
				int rankHigh = struct_wszwxsxspm_325.getRank()[0][1];
				for (int i = rankLow; i <= rankHigh; i++) {
					map.put(i, struct_wszwxsxspm_325);
				}
			}
		}

		List<Struct_huodong_009> sortList2 = ActivitySysCache.getSortList();
		for (Struct_huodong_009 struct_huodong_009 : sortList2) {
			if (struct_huodong_009.getId() == ActivitySysId.EIGHTDOOR_APPRAISERANK_ACT) {
				int index = struct_huodong_009.getIndex();
				int endTime = 0;
				try {
					endTime = TimeDateUtil.getTimeIntByStrTime(struct_huodong_009.getHend(), "yyyy-MM-dd hh:mm:ss")
							- TimeDateUtil.ONE_DAY_INT;
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
			content = GlobalCache.getGlobalData(GlobalConst.EIGHTDOOR_APPRAISERANK_ACT_CROSS_PERIOD_CACHE).getContent();
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
			GlobalData globalData = GlobalCache
					.getGlobalData(GlobalConst.EIGHTDOOR_APPRAISERANK_ACT_CROSS_PERIOD_CACHE);
			content = JSON.toJSONString(crossPeriodCache);
			globalData.setContent(content);
			GlobalCache.doSync(globalData);
		} catch (Exception e) {
			LogTool.error(e, this, "shutdownServer:" + content);
		}
	}

}
