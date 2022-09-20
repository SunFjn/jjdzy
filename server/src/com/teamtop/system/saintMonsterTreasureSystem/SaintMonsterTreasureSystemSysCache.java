package com.teamtop.system.saintMonsterTreasureSystem;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeSet;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.system.saintMonsterTreasureSystem.cross.SaintMonsterTreRank;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.cache.union.UC;
import com.teamtop.util.db.trans.ObjStrTransUtil;
import com.teamtop.util.excel.ExcelJsonUtils;
import com.teamtop.util.log.LogTool;

import excel.config.Config_shxb_268;
import excel.config.Config_shxbmb_268;
import excel.config.Config_shxbrank_268;
import excel.struct.Struct_shxb_268;
import excel.struct.Struct_shxbmb_268;
import excel.struct.Struct_shxbrank_268;

public class SaintMonsterTreasureSystemSysCache extends AbsServerEvent {

	private static Map<Integer, List<ProbabilityEventModel>> gridRewardMap = UC.reg("saintMonsterTreasureGridRewardMap",
			new HashMap<>());

	/** 最大圈数配置 */
	public static Struct_shxbmb_268 maxQ_Struct_shxbmb_268 = null;

	private static SaintMonsterTreasureSystemCache cache;

	public static int UPDATE_RANK_TIME = 0;

	public static Struct_shxbmb_268 getMaxQ_Struct_shxbmb_268() {
		return maxQ_Struct_shxbmb_268;
	}

	public static Map<Integer, List<ProbabilityEventModel>> getGridRewardMap() {
		return gridRewardMap;
	}

	public static void setGridRewardMap(Map<Integer, List<ProbabilityEventModel>> gridRewardMap) {
		SaintMonsterTreasureSystemSysCache.gridRewardMap = gridRewardMap;
	}

	public static TreeSet<SaintMonsterTreRank> getRankSet() {
		return cache.getRankSet();
	}

	public static void setRankSet(TreeSet<SaintMonsterTreRank> rankSet) {
		cache.setRankSet(rankSet);
	}

	public static TreeSet<SaintMonsterTreRank> getLastRankSet() {
		return cache.getLastRankSet();
	}

	public static void setLastRankSet(TreeSet<SaintMonsterTreRank> lastRankSet) {
		cache.setLastRankSet(lastRankSet);
	}

	public static Struct_shxbrank_268 getRankReward(int ranking) {
		List<Struct_shxbrank_268> sortList = getRankSortList();
		int size = sortList.size();
		for (int i = 0; i < size; i++) {
			Struct_shxbrank_268 shxbrank_268 = sortList.get(i);
			int[] limit = shxbrank_268.getRank()[0];
			if (ranking >= limit[0] && ranking <= limit[1]) {
				return shxbrank_268;
			}
		}
		return null;
	}

	public static List<Struct_shxbrank_268> getRankSortList() {
		return Config_shxbrank_268.getIns().getSortList();
	}

	@Override
	public void startServer() throws RunServerException {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.SAINT_MONSTER_TREASURE);
			String content = globalData.getContent();
			if (content == null || content.equals("") || content.equals("{}")) {
				cache = new SaintMonsterTreasureSystemCache();
			} else {
				cache = ObjStrTransUtil.toObj(content, SaintMonsterTreasureSystemCache.class);
			}
		} catch (Exception e) {
			LogTool.error(e, SaintMonsterTreasureSystemSysCache.class,
					"SaintMonsterTreasureSystemSysCache startServer wrong");
			throw new RunServerException(e, "");
		}
	}

	@Override
	public void shutdownServer() {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.SAINT_MONSTER_TREASURE);
			globalData.setContent(ObjStrTransUtil.toStr(cache));
			GlobalCache.doSync(globalData);
		} catch (Exception e) {
			LogTool.error(e, SaintMonsterTreasureSystemSysCache.class,
					"SaintMonsterTreasureSystemSysCache shutdownServer wrong");
		}
	}

	@Override
	public void initExcel() throws RunServerException {
		gridRewardMap.clear();
		List<Struct_shxb_268> sortList = Config_shxb_268.getIns().getSortList();
		int size = sortList.size();
		for (int i = 0; i < size; i++) {
			Struct_shxb_268 shxb_268 = sortList.get(i);
			String reward = shxb_268.getReward();
			if (reward == null || "0".equals(reward)) {
				continue;
			}
			List<ProbabilityEventModel> modelList = ExcelJsonUtils.getGeneralDropData(reward);
			gridRewardMap.put(shxb_268.getId(), modelList);
		}

		List<Struct_shxbmb_268> sortList1 = Config_shxbmb_268.getIns().getSortList();
		int size1 = sortList1.size();
		int maxQ = 0;
		for (int i = 0; i < size1; i++) {
			Struct_shxbmb_268 struct_shxbmb_268 = sortList1.get(i);
			int q = struct_shxbmb_268.getQ();
			if (q > maxQ) {
				maxQ_Struct_shxbmb_268 = struct_shxbmb_268;
			}
		}

		List<int[][]> rewardList = new ArrayList<>();
		List<Struct_shxb_268> sortList4 = Config_shxb_268.getIns().getSortList();
		Map<Integer, List<ProbabilityEventModel>> gridRewardMap = SaintMonsterTreasureSystemSysCache.getGridRewardMap();
		size = sortList4.size();
		for (int i = 2; i <= size; i++) {
			List<ProbabilityEventModel> list = gridRewardMap.get(i);
			int[] reward = (int[]) ProbabilityEventUtil.getEventByProbability(list.get(0));
			List<int[]> dropArr = new ArrayList<int[]>();
			dropArr.add(reward);
			int[][] drops = new int[dropArr.size()][];
			dropArr.toArray(drops);
			rewardList.add(drops);
		}

	}

}
