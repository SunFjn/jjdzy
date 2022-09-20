package com.teamtop.system.activity.ativitys.godGenSendGiftAct.cross;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.teamtop.main.RunServerException;
import com.teamtop.system.activity.ativitys.godGenSendGiftAct.cross.model.CrossGodGenSendGiftCache;
import com.teamtop.system.activity.ativitys.godGenSendGiftAct.cross.model.CrossLastGodGenSendGiftCache;
import com.teamtop.system.activity.ativitys.godGenSendGiftAct.model.GodGenSendGiftActRankModel;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.util.db.trans.ObjStrTransUtil;
import com.teamtop.util.log.LogTool;

public class CrossGodGenSendGiftActCache extends AbsServerEvent {

	private static CrossGodGenSendGiftCache crossGodGenSendGiftCache;

	/** 活动结束 */
	private static Map<Integer, Integer> endTimeMap = new HashMap<>();

	/** 发放奖励时的临时存储排行list */
	private static Map<Integer, List<GodGenSendGiftActRankModel>> tempRankListMap = new HashMap<>();

	/** 上期数据 */
	private static CrossLastGodGenSendGiftCache lastCache = new CrossLastGodGenSendGiftCache();

	public static List<GodGenSendGiftActRankModel> getLastRankList(int partId) {
		return lastCache.getLastRankList(partId);
	}

	public static CrossLastGodGenSendGiftCache getLastCache() {
		return lastCache;
	}

	public static void setLastRankList(List<GodGenSendGiftActRankModel> lastRankList, int partId) {
		lastCache.setLastRankList(lastRankList, partId);
	}

	public static int getLastQs(int partId) {
		return lastCache.getLastQs(partId);
	}

	public static void setLastQs(int lastQs, int partId) {
		lastCache.setLastQs(lastQs, partId);
	}

	public static Integer getEndTime(int partId) {
		return endTimeMap.get(partId);
	}

	public static void setEndTime(int partId, int endTime) {
		CrossGodGenSendGiftActCache.endTimeMap.put(partId, endTime);
	}

	public static List<GodGenSendGiftActRankModel> getTempRankList(int partId) {
		return tempRankListMap.get(partId);
	}

	public static void setTempRankList(int partId, List<GodGenSendGiftActRankModel> list) {
		tempRankListMap.put(partId, list);
	}

	public static int getQs(int partId) {
		return crossGodGenSendGiftCache.getQs(partId);
	}

	public static void setQs(int qs, int partId) {
		crossGodGenSendGiftCache.setQs(qs, partId);
	}

	public static List<GodGenSendGiftActRankModel> getRankList(int partId) {
		return crossGodGenSendGiftCache.getRankList(partId);
	}
	
	public static void setRankList(int partId, List<GodGenSendGiftActRankModel> rankList) {
		crossGodGenSendGiftCache.setRankList(rankList, partId);
	}

	public static CrossGodGenSendGiftCache getCrossGodGenSendGiftCache() {
		return crossGodGenSendGiftCache;
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub
		String content = "";
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.GODGENSENDGIFT_ACT_RANKLIST);
			content = globalData.getContent();
			if (content == null || content.equals("") || content.equals("{}") || content.equals("null")) {
				crossGodGenSendGiftCache = new CrossGodGenSendGiftCache();
			} else {
				crossGodGenSendGiftCache = ObjStrTransUtil.toObj(content, CrossGodGenSendGiftCache.class);
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, "CrossGodGenSendGiftActCache startServer crossGodGenSendGiftCache has wrong"
					+ " content:" + content);
		}
		String lastCacheStr = "";
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.GODGENSENDGIFT_ACT_LASTRANKLIST);
			lastCacheStr = globalData.getContent();
			if (lastCacheStr == null || lastCacheStr.equals("") || lastCacheStr.equals("{}")
					|| lastCacheStr.equals("null")) {
				lastCache = new CrossLastGodGenSendGiftCache();
			} else {
				lastCache = ObjStrTransUtil.toObj(lastCacheStr, CrossLastGodGenSendGiftCache.class);
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this,
					"CrossGodGenSendGiftActCache startServer lastCache has wrong" + " lastCacheStr:" + lastCacheStr);
		}

		String endTimeStr = "";
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.GODGENSENDGIFT_ACT_ENDTIME);
			endTimeStr = globalData.getContent();
			if (endTimeStr == null || endTimeStr.equals("") || endTimeStr.equals("{}") || endTimeStr.equals("null")) {
			} else {
				Type type = new TypeReference<Map<Integer, Integer>>() {}.getType();
				endTimeMap = JSONObject.parseObject(endTimeStr, type);
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, "CrossGodGenSendGiftActCache startServer has wrong" + " endTimeStr:" + endTimeStr);
		}
	}

	@Override
	public void shutdownServer() {
		// TODO Auto-generated method stub
		String cacheStr = "";
		try {
			GlobalData globalDataRankData = GlobalCache.getGlobalData(GlobalConst.GODGENSENDGIFT_ACT_RANKLIST);
			cacheStr = ObjStrTransUtil.toStr(crossGodGenSendGiftCache);
			globalDataRankData.setContent(cacheStr);
			GlobalCache.doSync(globalDataRankData);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, "CrossGodGenSendGiftActCache shutdownServer has wrong cacheStr:" + cacheStr);
		}
		String lastCacheStr = "";
		try {
			GlobalData globalDataRankData = GlobalCache.getGlobalData(GlobalConst.GODGENSENDGIFT_ACT_LASTRANKLIST);
			lastCacheStr = ObjStrTransUtil.toStr(lastCache);
			globalDataRankData.setContent(lastCacheStr);
			GlobalCache.doSync(globalDataRankData);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, "CrossGodGenSendGiftActCache shutdownServer has wrong lastCacheStr:" + lastCacheStr);
		}

		String endTimeStr = "";
		try {
			GlobalData globalDataRankData = GlobalCache.getGlobalData(GlobalConst.GODGENSENDGIFT_ACT_ENDTIME);
			endTimeStr = JSON.toJSONString(endTimeMap);
			globalDataRankData.setContent(endTimeStr);
			GlobalCache.doSync(globalDataRankData);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, "CrossGodGenSendGiftActCache shutdownServer has wrong endTimeStr:" + endTimeStr);
		}
	}

}
