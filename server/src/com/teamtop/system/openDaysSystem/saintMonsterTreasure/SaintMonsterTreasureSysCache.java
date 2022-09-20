package com.teamtop.system.openDaysSystem.saintMonsterTreasure;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeSet;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.system.openDaysSystem.saintMonsterTreasure.cross.SaintMonsterTreRank;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;
import com.teamtop.util.cache.union.UC;
import com.teamtop.util.excel.ExcelJsonUtils;
import com.teamtop.util.log.LogTool;

import excel.config.Config_ssshxb_268;
import excel.config.Config_ssshxbrank_268;
import excel.struct.Struct_ssshxb_268;
import excel.struct.Struct_ssshxbrank_268;

public class SaintMonsterTreasureSysCache extends AbsServerEvent {

	private static Map<Integer, List<ProbabilityEventModel>> gridRewardMap = UC.reg("saintMonsterTreasureGridRewardMap",
			new HashMap<>());

	private static TreeSet<SaintMonsterTreRank> rankSet = new TreeSet<>();

	public static int UPDATE_RANK_TIME = 0;

	public static Map<Integer, List<ProbabilityEventModel>> getGridRewardMap() {
		return gridRewardMap;
	}

	public static void setGridRewardMap(Map<Integer, List<ProbabilityEventModel>> gridRewardMap) {
		SaintMonsterTreasureSysCache.gridRewardMap = gridRewardMap;
	}

	public static TreeSet<SaintMonsterTreRank> getRankSet() {
		return rankSet;
	}

	public static void setRankSet(TreeSet<SaintMonsterTreRank> rankSet) {
		SaintMonsterTreasureSysCache.rankSet = rankSet;
	}

	public static Struct_ssshxbrank_268 getRankReward(int ranking) {
		List<Struct_ssshxbrank_268> sortList = getRankSortList();
		int size = sortList.size();
		for (int i = 0; i < size; i++) {
			Struct_ssshxbrank_268 ssshxbrank_268 = sortList.get(i);
			int[] limit = ssshxbrank_268.getRank()[0];
			if (ranking >= limit[0] && ranking <= limit[1]) {
				return ssshxbrank_268;
			}
		}
		return null;
	}

	public static List<Struct_ssshxbrank_268> getRankSortList() {
		return Config_ssshxbrank_268.getIns().getSortList();
	}

	@Override
	public void startServer() throws RunServerException {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.SAINT_MONSTER_TREASURE_RANK);
			String content = globalData.getContent();
			if (content == null || content.equals("") || content.equals("{}")) {
				
			} else {
				Type type = new TypeReference<TreeSet<SaintMonsterTreRank>>(){}.getType();
				TreeSet<SaintMonsterTreRank> rank = JSONObject.parseObject(content, type);
				rankSet.clear();
				rankSet.addAll(rank);
			}
		} catch (Exception e) {
			LogTool.error(e, SaintMonsterTreasureSysCache.class,
					"SaintMonsterTreasureSysCache startServer wrong");
			throw new RunServerException(e, "");
		}
	}

	@Override
	public void shutdownServer() {
		try {
			GlobalData globalData = GlobalCache.getGlobalData(GlobalConst.SAINT_MONSTER_TREASURE_RANK);
			globalData.setContent(JSON.toJSONString(rankSet));
			GlobalCache.doSync(globalData);
		} catch (Exception e) {
			LogTool.error(e, SaintMonsterTreasureSysCache.class, "SaintMonsterTreasureSysCache shutdownServer wrong");
		}
	}

	@Override
	public void initExcel() throws RunServerException {
		gridRewardMap.clear();
		List<Struct_ssshxb_268> sortList = Config_ssshxb_268.getIns().getSortList();
		int size = sortList.size();
		for (int i = 0; i < size; i++) {
			Struct_ssshxb_268 ssshxb_268 = sortList.get(i);
			String reward = ssshxb_268.getReward();
			if (reward == null || "0".equals(reward)) {
				continue;
			}
			List<ProbabilityEventModel> modelList = ExcelJsonUtils.getGeneralDropData(reward);
			gridRewardMap.put(ssshxb_268.getId(), modelList);
		}

		List<int[][]> rewardList = new ArrayList<>();
		List<Struct_ssshxb_268> sortList4 = Config_ssshxb_268.getIns().getSortList();
		Map<Integer, List<ProbabilityEventModel>> gridRewardMap = SaintMonsterTreasureSysCache.getGridRewardMap();
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
