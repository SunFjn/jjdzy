package com.teamtop.system.linglongge;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.system.linglongge.model.LiLoZoneidRewardHis;
import com.teamtop.system.linglongge.model.LingLongGeCache;
import com.teamtop.system.linglongge.model.LingLongGeNoticeModel;
import com.teamtop.system.linglongge.model.LingLongGeRankModel;
import com.teamtop.system.linglongge.model.LingLongGeRankZoneid;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.cache.union.UC;
import com.teamtop.util.db.trans.ObjStrTransUtil;
import com.teamtop.util.excel.ExcelJsonUtils;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_llg_239;
import excel.config.Config_llgpoint_239;
import excel.config.Config_llgqf_239;
import excel.config.Config_llgrank_239;
import excel.struct.Struct_llg_239;
import excel.struct.Struct_llgpoint_239;
import excel.struct.Struct_llgqf_239;
import excel.struct.Struct_llgrank_239;

public class LingLongGeSysCache extends AbsServerEvent {
	/** 玲珑阁积分表 key为玲珑阁积分表配置id **/
	private static Map<Integer, List<Struct_llgpoint_239>> llgScoreTableMap = new HashMap<>();
	/** 玲珑阁排名表 key为玲珑阁排名表配置id **/
	private static Map<Integer, List<Struct_llgrank_239>> llgRankTableMap = new HashMap<>();
	/** 普通和高级奖励概率事件Map key为玲珑阁表id **/
	private static Map<Integer, List<List<ProbabilityEventModel>>> genAndHigtAwardMap = new HashMap<>();
	/** 玲珑阁 跨服 区服排名表 key为玲珑阁排名表配置id **/
	private static Map<Integer, List<Struct_llgqf_239>> rankZoneidTableMap = new HashMap<>();

	/** 获奖公告列表 **/
	private static List<LingLongGeNoticeModel> awardNoticeList = UC.reg("lingLongGeNotice",
			new LinkedList<LingLongGeNoticeModel>());

	/** 每日本服玩家积分排名 每日零点清空 **/
	private static List<LingLongGeRankModel> lingLongGeRankList = UC.reg("lingLongGeRankList",
			new ArrayList<LingLongGeRankModel>());

	/** 区积分排名 每日零点清空 **/
	private static List<LingLongGeRankZoneid> zoneidRankList = UC.reg("zoneidRankList",
			new ArrayList<LingLongGeRankZoneid>());

	/** 上期玩家积分排名 */
	private static List<LingLongGeRankModel> lastRankList = new ArrayList<>();

	/** 上期区积分排名 */
	private static List<LingLongGeRankZoneid> lastZoneidRankList = new ArrayList<>();

	/** 本服达到可以领取区服排行奖励的人id集合 **/
	private static List<Long> zoneidRewardHis = UC.reg("zoneidRewardHis", new ArrayList<Long>());
	/** 本服总积分 **/
	private static int score = 0;

	public static List<LingLongGeRankModel> getLastRankList() {
		return lastRankList;
	}

	public static List<LingLongGeRankZoneid> getLastZoneidRankList() {
		return lastZoneidRankList;
	}

	public static Map<Integer, List<Struct_llgqf_239>> getRankZoneidTableMap() {
		return rankZoneidTableMap;
	}

	public static void setRankZoneidTableMap(Map<Integer, List<Struct_llgqf_239>> rankZoneidTableMap) {
		LingLongGeSysCache.rankZoneidTableMap = rankZoneidTableMap;
	}

	public static List<LingLongGeNoticeModel> getAwardNoticeList() {
		return awardNoticeList;
	}

	public static Map<Integer, List<Struct_llgpoint_239>> getLlgScoreTableMap() {
		return llgScoreTableMap;
	}

	public static void setAwardNoticeList(List<LingLongGeNoticeModel> awardNoticeList) {
		LingLongGeSysCache.awardNoticeList = awardNoticeList;
	}

	public static List<LingLongGeRankModel> getLingLongGeRankList() {
		return lingLongGeRankList;
	}

	public static void setLingLongGeRankList(List<LingLongGeRankModel> lingLongGeRankList) {
		LingLongGeSysCache.lingLongGeRankList = lingLongGeRankList;
	}

	public static Map<Integer, List<Struct_llgrank_239>> getLlgRankTableMap() {
		return llgRankTableMap;
	}

	public static Map<Integer, List<List<ProbabilityEventModel>>> getGenAndHigtAwardMap() {
		return genAndHigtAwardMap;
	}

	public static List<LingLongGeRankZoneid> getZoneidRankList() {
		return zoneidRankList;
	}

	public static void setZoneidRankList(List<LingLongGeRankZoneid> zoneidRankList) {
		LingLongGeSysCache.zoneidRankList = zoneidRankList;
	}

	public static List<Long> getZoneidRewardHis() {
		return zoneidRewardHis;
	}

	public static void setZoneidRewardHis(List<Long> zoneidRewardHis) {
		LingLongGeSysCache.zoneidRewardHis = zoneidRewardHis;
	}

	public static int getScore() {
		return score;
	}

	public static void setScore(int score) {
		LingLongGeSysCache.score = score;
	}

	@Override
	public void startServer() throws RunServerException {
		try {
			if (!TimeDateUtil.serverOpenOverDays(7)) {
				GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.LINGLONGGE);
				String content = globalData.getContent();
				if (content == null || content.equals("") || content.equals("{}")) {
//					initLingLongGeCache();
				} else {
					LingLongGeCache obj = ObjStrTransUtil.toObj(content, LingLongGeCache.class);
					getAwardNoticeList().addAll(obj.getAwardNoticeList());
					getLingLongGeRankList().addAll(obj.getLingLongGeRankList());
				}
			}
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.LINGLONGGEHIDS);
			String content = globalData.getContent();
			if (content == null || content.equals("") || content.equals("{}")) {
//				initLingLongGeCache();
			} else {
				LiLoZoneidRewardHis obj = ObjStrTransUtil.toObj(content, LiLoZoneidRewardHis.class);
				getZoneidRewardHis().addAll(obj.getZoneidRewardHis());
				setScore(obj.getScore());
			}

		} catch (Exception e) {
			LogTool.error(e, this, "LingLongGeSysCache startServer has wrong");
		}

		String lastRankListStr = null;
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.LINGLONGGE_LASTRANKLIST);
			lastRankListStr = globalData.getContent();
			if (lastRankListStr == null || lastRankListStr.equals("") || lastRankListStr.equals("{}")
					|| lastRankListStr.equals("null")) {
			} else {
				lastRankList = JSONObject.parseObject(lastRankListStr, new TypeReference<List<LingLongGeRankModel>>() {
				}.getType());
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this,
					"LingLongGeSysCache startServer lastRankList has wrong" + " lastRankListStr:" + lastRankListStr);
		}
		String lastZoneidRankListStr = null;
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.LINGLONGGE_LASTZONEIDRANKLIST);
			lastZoneidRankListStr = globalData.getContent();
			if (lastZoneidRankListStr == null || lastZoneidRankListStr.equals("") || lastZoneidRankListStr.equals("{}")
					|| lastZoneidRankListStr.equals("null")) {
			} else {
				lastZoneidRankList = JSONObject.parseObject(lastZoneidRankListStr,
						new TypeReference<List<LingLongGeRankZoneid>>() {
						}.getType());
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, "LingLongGeSysCache startServer lastZoneidRankList has wrong"
					+ " lastZoneidRankListStr:" + lastZoneidRankListStr);
		}
	}

	@Override
	public void shutdownServer() {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.LINGLONGGE);
			LingLongGeCache data = new LingLongGeCache();
			data.setAwardNoticeList(getAwardNoticeList());
			data.setLingLongGeRankList(getLingLongGeRankList());
			globalData.setContent(ObjStrTransUtil.toStr(data));
			GlobalCache.doSync(globalData);

			globalData = GlobalCache.getGlobalData(GlobalConst.LINGLONGGEHIDS);
			LiLoZoneidRewardHis liLoZoneidRewardHis = new LiLoZoneidRewardHis();
			liLoZoneidRewardHis.setScore(getScore());
			liLoZoneidRewardHis.setZoneidRewardHis(getZoneidRewardHis());
			globalData.setContent(ObjStrTransUtil.toStr(liLoZoneidRewardHis));
			GlobalCache.doSync(globalData);

		} catch (Exception e) {
			LogTool.error(e, this, "LingLongGeSysCache shutdownServer has wrong");
		}

		String lastRankListStr = null;
		try {
			GlobalData globalDataRankData = GlobalCache.getGlobalData(GlobalConst.LINGLONGGE_LASTRANKLIST);
			lastRankListStr = JSON.toJSONString(lastRankList);
			globalDataRankData.setContent(lastRankListStr);
			GlobalCache.doSync(globalDataRankData);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, "LingLongGeSysCache shutdownServer has wrong lastRankListStr:" + lastRankListStr);
		}

		String lastZoneidRankListStr = null;
		try {
			GlobalData globalDataRankData = GlobalCache.getGlobalData(GlobalConst.LINGLONGGE_LASTZONEIDRANKLIST);
			lastZoneidRankListStr = JSON.toJSONString(lastZoneidRankList);
			globalDataRankData.setContent(lastZoneidRankListStr);
			GlobalCache.doSync(globalDataRankData);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this,
					"LingLongGeSysCache shutdownServer has wrong lastZoneidRankListStr:" + lastZoneidRankListStr);
		}
	}

	/**
	 * 初始化玲珑阁缓存
	 */
//	public void initLingLongGeCache() {
//		List<LingLongGeNoticeModel> awardNoticeList = 
//		setAwardNoticeList(awardNoticeList);
//		List<LingLongGeRankModel> lingLongGeRankList = ;
//		setLingLongGeRankList(lingLongGeRankList);
//	}

	@Override
	public void initExcel() throws RunServerException {
		LogTool.info("LingLongGeSysCache initExcel start", LingLongGeSysCache.class);
		llgScoreTableMap.clear();
		llgRankTableMap.clear();
		rankZoneidTableMap.clear();
		genAndHigtAwardMap.clear();
		for (Struct_llg_239 llgTable : Config_llg_239.getIns().getSortList()) {
			for (Struct_llgpoint_239 llgScoreTable : Config_llgpoint_239.getIns().getSortList()) {
				if (llgTable.getId() == llgScoreTable.getLlg()) {
					List<Struct_llgpoint_239> list = llgScoreTableMap.get(llgTable.getId());
					if (list == null) {
						list = new ArrayList<>();
						llgScoreTableMap.put(llgTable.getId(), list);
					}
					list.add(llgScoreTable);
				}
			}
			for (Struct_llgrank_239 llgRankTable : Config_llgrank_239.getIns().getSortList()) {
				if (llgTable.getId() == llgRankTable.getLlg()) {
					List<Struct_llgrank_239> list = llgRankTableMap.get(llgTable.getId());
					if (list == null) {
						list = new ArrayList<>();
						llgRankTableMap.put(llgTable.getId(), list);
					}
					list.add(llgRankTable);
				}
			}
			for (Struct_llgqf_239 llgqf_239 : Config_llgqf_239.getIns().getSortList()) {
				if (llgTable.getId() == llgqf_239.getLlg()) {
					List<Struct_llgqf_239> list = rankZoneidTableMap.get(llgTable.getId());
					if (list == null) {
						list = new ArrayList<>();
						rankZoneidTableMap.put(llgTable.getId(), list);
					}
					list.add(llgqf_239);
				}
			}

			List<List<ProbabilityEventModel>> list = new ArrayList<>();
			list.add(ExcelJsonUtils.getGeneralDropData(llgTable.getReward1()));
			list.add(ExcelJsonUtils.getGeneralDropData(llgTable.getReward2()));
			genAndHigtAwardMap.put(llgTable.getId(), list);
		}
		int tableId = LingLongGeFunction.getIns().getTableId();
		LogTool.info("LingLongGeSysCache initExcel end tableId=" + tableId, LingLongGeSysCache.class);
		int size1 = 0;
		int size2 = 0;
		int size3 = 0;
		int size4 = 0;
		List<Struct_llgpoint_239> list1 = llgScoreTableMap.get(tableId);
		if (list1 != null) {
			size1 = list1.size();
		}
		List<Struct_llgrank_239> list2 = llgRankTableMap.get(tableId);
		if (list2 != null) {
			size2 = list2.size();
		}
		List<Struct_llgqf_239> list3 = rankZoneidTableMap.get(tableId);
		if (list3 != null) {
			size3 = list3.size();
		}
		List<List<ProbabilityEventModel>> list4 = genAndHigtAwardMap.get(tableId);
		if (list4 != null) {
			size4 = list4.size();
		}
		LogTool.info("LingLongGeSysCache initExcel llgScoreTableMap =" + size1, LingLongGeSysCache.class);
		LogTool.info("LingLongGeSysCache initExcel llgRankTableMap =" + size2, LingLongGeSysCache.class);
		LogTool.info("LingLongGeSysCache initExcel rankZoneidTableMap =" + size3, LingLongGeSysCache.class);
		LogTool.info("LingLongGeSysCache initExcel genAndHigtAwardMap =" + size4, LingLongGeSysCache.class);
	}

}
