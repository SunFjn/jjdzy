package com.teamtop.system.saintMonsterTreasureSystem.cross;

import java.lang.reflect.Type;
import java.util.TreeSet;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.util.log.LogTool;

public class CrossSaintMonsterTreasureSysCache extends AbsServerEvent {

	private static TreeSet<SaintMonsterTreRank> rankSet = new TreeSet<>();

	/** 活动结束时间*/
	public static int endTime = 0;

	public static int sendReward = 0;

	public static TreeSet<SaintMonsterTreRank> getRankSet() {
		return rankSet;
	}

	public static void setRankSet(TreeSet<SaintMonsterTreRank> rankSet) {
		CrossSaintMonsterTreasureSysCache.rankSet = rankSet;
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
			LogTool.error(e, CrossSaintMonsterTreasureSysCache.class,
					"CrossSaintMonsterTreasureSysCache startServer wrong");
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
			LogTool.error(e, CrossSaintMonsterTreasureSysCache.class,
					"CrossSaintMonsterTreasureSysCache shutdownServer wrong");
		}
	}

}
