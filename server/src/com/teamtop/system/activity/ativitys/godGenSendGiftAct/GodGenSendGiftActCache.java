package com.teamtop.system.activity.ativitys.godGenSendGiftAct;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.teamtop.cross.CrossZone;
import com.teamtop.main.RunServerException;
import com.teamtop.system.activity.ActivitySysCache;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.godGenSendGiftAct.model.CrossPeriodCache;
import com.teamtop.system.activity.ativitys.godGenSendGiftAct.model.GodGenSendGiftActRankModel;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_cbgmb2_729;
import excel.config.Config_cbgrank2_729;
import excel.struct.Struct_cbgmb2_729;
import excel.struct.Struct_cbgrank2_729;
import excel.struct.Struct_huodong_009;

public class GodGenSendGiftActCache extends AbsServerEvent {
	/** 藏宝阁排名配置表 第一层key:期数，第二层key:排名rank 方便发奖励 **/
	private static Map<Integer, Map<Integer, Struct_cbgrank2_729>> rankConfigMap = new HashMap<>();

	/** 藏宝阁目标配置表 第一层key:期数，第二层key:配置表id **/
	private static Map<Integer, Map<Integer, Struct_cbgmb2_729>> targetConfigMap = new HashMap<>();

	/** 排名奖励 */
	private static List<GodGenSendGiftActRankModel> rankList = new ArrayList<>();
	/** 上期排名 */
	private static List<GodGenSendGiftActRankModel> lastRankList = new ArrayList<>();
	/** 上期期数 */
	private static int lastQs;
	/** 跨期缓存 */
	private static CrossPeriodCache crossPeriodCache;

	/** 最后一期结束时间 */
	private static int lastEndTime = 0;
	/** 最后一期配置 */
	private static Struct_huodong_009 last_struct_huodong_009 = null;

	public static Struct_huodong_009 getLast_struct_huodong_009() {
		return last_struct_huodong_009;
	}

	public static int getLastEndTime() {
		return lastEndTime;
	}

	public static int getLastQs() {
		return lastQs;
	}

	public static void setLastQs(int lastQs) {
		GodGenSendGiftActCache.lastQs = lastQs;
	}

	public static void setLastRankList(List<GodGenSendGiftActRankModel> lastRankList) {
		GodGenSendGiftActCache.lastRankList = lastRankList;
	}

	public static List<GodGenSendGiftActRankModel> getLastRankList() {
		return lastRankList;
	}

	/** 开启状态 */
	private static volatile int openState;

	public static int getOpenState() {
		return openState;
	}

	public static void setOpenState(int openState) {
		GodGenSendGiftActCache.openState = openState;
	}

	public static List<GodGenSendGiftActRankModel> getRankList() {
		return rankList;
	}

	public static void setRankList(List<GodGenSendGiftActRankModel> rankList) {
		GodGenSendGiftActCache.rankList = rankList;
	}

	public static Map<Integer, Map<Integer, Struct_cbgrank2_729>> getRankConfigMap() {
		return rankConfigMap;
	}

	public static Map<Integer, Map<Integer, Struct_cbgmb2_729>> getTargetConfigMap() {
		return targetConfigMap;
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
		try {
			rankConfigMap.clear();
			targetConfigMap.clear();
			List<Struct_cbgrank2_729> sortList = Config_cbgrank2_729.getIns().getSortList();
			for (Struct_cbgrank2_729 struct_cbgrank2_729 : sortList) {
				int qs = struct_cbgrank2_729.getQs();
				Map<Integer, Struct_cbgrank2_729> map = rankConfigMap.get(qs);
				if (map == null) {
					map = new HashMap<>();
					rankConfigMap.put(qs, map);
				}
				int rankLow = struct_cbgrank2_729.getRank()[0][0];
				int rankHigh = struct_cbgrank2_729.getRank()[0][1];
				for (int i = rankLow; i <= rankHigh; i++) {
					map.put(i, struct_cbgrank2_729);
				}
			}

			List<Struct_cbgmb2_729> sortList2 = Config_cbgmb2_729.getIns().getSortList();
			for (Struct_cbgmb2_729 struct_cbgmb2_729 : sortList2) {
				int qs = struct_cbgmb2_729.getQs();
				Map<Integer, Struct_cbgmb2_729> map = targetConfigMap.get(qs);
				if (map == null) {
					map = new HashMap<>();
					targetConfigMap.put(qs, map);
				}
				map.put(struct_cbgmb2_729.getId(), struct_cbgmb2_729);
			}

			Map<Integer, List<Struct_huodong_009>> actIdMap = ActivitySysCache.getActIdMap();
			List<Struct_huodong_009> list = actIdMap.get(ActivitySysId.ACT_GODGENSENDGIFT);
			int size = list.size();
			for (int i = 0; i < size; i++) {
				Struct_huodong_009 struct_huodong_009 = list.get(i);
				String hend = struct_huodong_009.getHend();
				int endTime = TimeDateUtil.getTimeIntByStrTime(hend, "yyyy-MM-dd hh:mm:ss");
				if (endTime > lastEndTime) {
					lastEndTime = endTime;
					last_struct_huodong_009 = struct_huodong_009;
				}
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, "GodGenSendGiftActCache initExcel has wrong");
			throw new RuntimeException(e);
		}
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub
		String content = "";
		try {
			content = GlobalCache.getGlobalData(GlobalConst.GODGENSENDGIFT_ACT_CROSS_PERIOD_CACHE).getContent();
			if (content == null || content.equals("") || content.equals("{}")) {
				crossPeriodCache = new CrossPeriodCache();
			} else {
				crossPeriodCache = JSONObject.parseObject(content, CrossPeriodCache.class);
			}
		} catch (Exception e) {
			crossPeriodCache = new CrossPeriodCache();
			LogTool.error(e, this, "GodGenSendGiftActCache startServer content:" + content);
		}
	}

	@Override
	public void shutdownServer() {
		// TODO Auto-generated method stub
		String content = "";
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.GODGENSENDGIFT_ACT_CROSS_PERIOD_CACHE);
			content = JSON.toJSONString(crossPeriodCache);
			globalData.setContent(content);
			GlobalCache.doSync(globalData);
		} catch (Exception e) {
			LogTool.error(e, this, "GodGenSendGiftActCache shutdownServer:" + content);
		}
	}

}
