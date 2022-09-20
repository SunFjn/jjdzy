package com.teamtop.system.godGenSendGift;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossZone;
import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.system.godGenSendGift.model.GodGenSendGiftRankModel;
import com.teamtop.util.log.LogTool;

import excel.config.Config_cbgmb1_729;
import excel.config.Config_cbgrank1_729;
import excel.struct.Struct_cbgmb1_729;
import excel.struct.Struct_cbgrank1_729;

public class GodGenSendGiftSysCache extends AbsServerEvent {
	/** 藏宝阁排名配置表 第一层key:期数，第二层key:排名rank 方便发奖励 **/
	private static Map<Integer, Map<Integer, Struct_cbgrank1_729>> rankConfigMap = new HashMap<>();

	/** 藏宝阁目标配置表 第一层key:期数，第二层key:配置表id **/
	private static Map<Integer, Map<Integer, Struct_cbgmb1_729>> targetConfigMap = new HashMap<>();

	/** 排名奖励 */
	private static List<GodGenSendGiftRankModel> rankList;
	/** 上期排名 */
	private static List<GodGenSendGiftRankModel> lastRankList;

	public static List<GodGenSendGiftRankModel> getLastRankList() {
		return lastRankList;
	}

	public static Map<Integer, Map<Integer, Struct_cbgrank1_729>> getRankConfigMap() {
		return rankConfigMap;
	}

	public static Map<Integer, Map<Integer, Struct_cbgmb1_729>> getTargetConfigMap() {
		return targetConfigMap;
	}

	public static List<GodGenSendGiftRankModel> getRankList() {
		return rankList;
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub
		if (CrossZone.isCrossServer()) {
			return;
		}
		String content = null;
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.GODGENSENDGIFT_RANKLIST);
			content = globalData.getContent();
			if (content == null || content.equals("") || content.equals("{}") || content.equals("null")) {
				rankList = new ArrayList<>();
			} else {
				rankList = JSONObject.parseObject(content, new TypeReference<List<GodGenSendGiftRankModel>>() {
				}.getType());
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, "GodGenSendGiftSysCache startServer rankList has wrong" + " content:" + content);
		}
		content = null;
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.GODGENSENDGIFT_LASTRANKLIST);
			content = globalData.getContent();
			if (content == null || content.equals("") || content.equals("{}") || content.equals("null")) {
				lastRankList = new ArrayList<>();
			} else {
				lastRankList = JSONObject.parseObject(content, new TypeReference<List<GodGenSendGiftRankModel>>() {
				}.getType());
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, "GodGenSendGiftSysCache startServer lastRankList has wrong" + " content:" + content);
		}
	}

	@Override
	public void shutdownServer() {
		// TODO Auto-generated method stub
		if (CrossZone.isCrossServer()) {
			return;
		}
		String rankListStr = null;
		try {
			GlobalData globalDataRankData = GlobalCache.getGlobalData(GlobalConst.GODGENSENDGIFT_RANKLIST);
			rankListStr = JSON.toJSONString(rankList);
			globalDataRankData.setContent(rankListStr);
			GlobalCache.doSync(globalDataRankData);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, "GodGenSendGiftSysCache shutdownServer rankList has wrong rankListStr" + rankListStr);
		}
		rankListStr = null;
		try {
			GlobalData globalDataRankData = GlobalCache.getGlobalData(GlobalConst.GODGENSENDGIFT_LASTRANKLIST);
			rankListStr = JSON.toJSONString(lastRankList);
			globalDataRankData.setContent(rankListStr);
			GlobalCache.doSync(globalDataRankData);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this,
					"GodGenSendGiftSysCache shutdownServer lastRankList has wrong rankListStr" + rankListStr);
		}
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
			List<Struct_cbgrank1_729> sortList = Config_cbgrank1_729.getIns().getSortList();
			for (Struct_cbgrank1_729 struct_cbgrank1_729 : sortList) {
				int qs = struct_cbgrank1_729.getQs();
				Map<Integer, Struct_cbgrank1_729> map = rankConfigMap.get(qs);
				if (map == null) {
					map = new HashMap<>();
					rankConfigMap.put(qs, map);
				}
				int rankLow = struct_cbgrank1_729.getRank()[0][0];
				int rankHigh = struct_cbgrank1_729.getRank()[0][1];
				for (int i = rankLow; i <= rankHigh; i++) {
					map.put(i, struct_cbgrank1_729);
				}
			}

			List<Struct_cbgmb1_729> sortList2 = Config_cbgmb1_729.getIns().getSortList();
			for (Struct_cbgmb1_729 struct_cbgmb1_729 : sortList2) {
				int qs = struct_cbgmb1_729.getQs();
				Map<Integer, Struct_cbgmb1_729> map = targetConfigMap.get(qs);
				if (map == null) {
					map = new HashMap<>();
					targetConfigMap.put(qs, map);
				}
				map.put(struct_cbgmb1_729.getId(), struct_cbgmb1_729);
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, "GodGenSendGiftSysCache initExcel has wrong");
			throw new RuntimeException(e);
		}
	}

}
