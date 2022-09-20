package com.teamtop.system.crossHeroesList;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossZone;
import com.teamtop.main.RunServerException;
import com.teamtop.system.activity.ativitys.godGenSendGiftAct.model.GodGenSendGiftActRankModel;
import com.teamtop.system.crossHeroesList.model.HeroesListRank;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.util.cache.union.UC;
import com.teamtop.util.db.trans.ObjStrTransUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_qypoint_235;
import excel.config.Config_qyrank_235;
import excel.struct.Struct_qypoint_235;
import excel.struct.Struct_qyrank_235;

public class HeroesListSysCache extends AbsServerEvent {

	private static Map<Integer, List<int[][]>> rankRewardMap = UC.reg("heroesListRankRewardMap",
			new HashMap<Integer, List<int[][]>>());

	private static Map<Integer, List<Struct_qypoint_235>> weekRewardMap = UC.reg("heroesListWeekRewardMap",
			new HashMap<Integer, List<Struct_qypoint_235>>());

	private static HeroesListCache heroesListCache;
	/** 上期排名 */
	private static List<HeroesListRank> lastRankList=new ArrayList<>();

	public static int RankingRefreshTime = 0;

	public static List<HeroesListRank> getLastRankList() {
		return lastRankList;
	}

	public static HeroesListCache getHeroesListCache() {
		return heroesListCache;
	}

	public static void setHeroesListCache(HeroesListCache heroesListCache) {
		HeroesListSysCache.heroesListCache = heroesListCache;
	}

	public static Map<Integer, List<int[][]>> getRankRewardMap() {
		return rankRewardMap;
	}

	public static Map<Integer, List<Struct_qypoint_235>> getWeekRewardMap() {
		return weekRewardMap;
	}

	public static int getRankingRefreshTime() {
		return RankingRefreshTime;
	}

	@Override
	public void startServer() throws RunServerException {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.HEROESLIST);
			String content = globalData.getContent();
			if (content == null || content.equals("") || content.equals("{}")) {
				setHeroesListCache(new HeroesListCache());
			} else {
				setHeroesListCache(ObjStrTransUtil.toObj(content, HeroesListCache.class));
			}
		} catch (Exception e) {
			LogTool.error(e, HeroesListSysCache.class, "HeroesListSysCache startServer wrong");
			throw new RunServerException(e, "");
		}
		if (!CrossZone.isCrossServer()) {
			String lastRankListStr = null;
			try {
				GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.HEROESLIST_LASTRANK);
				lastRankListStr = globalData.getContent();
				if (lastRankListStr == null || lastRankListStr.equals("") || lastRankListStr.equals("{}")
						|| lastRankListStr.equals("null")) {
				} else {
					lastRankList = JSONObject.parseObject(lastRankListStr, new TypeReference<List<HeroesListRank>>() {
					}.getType());
				}
			} catch (Exception e) {
				// TODO: handle exception
				LogTool.error(e, this, "HeroesListSysCache startServer lastRankList has wrong" + " lastRankListStr:"
						+ lastRankListStr);
			}
		}
	}

	@Override
	public void shutdownServer() {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.HEROESLIST);
			globalData.setContent(ObjStrTransUtil.toStr(getHeroesListCache()));
			GlobalCache.doSync(globalData);
		} catch (Exception e) {
			LogTool.error(e, HeroesListSysCache.class, "HeroesListSysCache shutdownServer wrong");
		}

		if (!CrossZone.isCrossServer()) {
			String rankListStr = null;
			try {
				GlobalData globalDataRankData = GlobalCache.getGlobalData(GlobalConst.HEROESLIST_LASTRANK);
				rankListStr = JSON.toJSONString(lastRankList);
				globalDataRankData.setContent(rankListStr);
				GlobalCache.doSync(globalDataRankData);
			} catch (Exception e) {
				// TODO: handle exception
				LogTool.error(e, this,
						"HeroesListSysCache shutdownServer rankList has wrong rankListStr" + rankListStr);
			}
		}
	}

	@Override
	public void initExcel() throws RunServerException {
		List<Struct_qyrank_235> sortList = Config_qyrank_235.getIns().getSortList();
		int size = sortList.size();
		Struct_qyrank_235 rankData = null;
		List<int[][]> list = null;
		for (int i = 0; i < size; i++) {
			rankData = sortList.get(i);
			list = rankRewardMap.get(rankData.getId());
			if (list == null) {
				list = new ArrayList<>();
				rankRewardMap.put(rankData.getId(), list);
			}
			list.add(rankData.getReward1());
			list.add(rankData.getReward2());
			list.add(rankData.getReward3());
			list.add(rankData.getReward4());
			list.add(rankData.getReward5());
			list.add(rankData.getReward6());
			list.add(rankData.getReward7());
		}
		List<Struct_qypoint_235> pointList = Config_qypoint_235.getIns().getSortList();
		Struct_qypoint_235 qypoint = null;
		List<Struct_qypoint_235> pList = null;
		size = pointList.size();
		for (int i = 0; i < size; i++) {
			qypoint = pointList.get(i);
			int week = qypoint.getHb() / 100;
			pList = weekRewardMap.get(week);
			if (pList == null) {
				pList = new ArrayList<>();
				weekRewardMap.put(week, pList);
			}
			pList.add(qypoint);
		}
	}

}
