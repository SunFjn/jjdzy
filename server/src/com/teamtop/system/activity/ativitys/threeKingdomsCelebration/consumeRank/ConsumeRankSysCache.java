package com.teamtop.system.activity.ativitys.threeKingdomsCelebration.consumeRank;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;

import excel.config.Config_sgxfph_261;
import excel.struct.Struct_sgxfph_261;

public class ConsumeRankSysCache extends AbsServerEvent {
	/** 消费排行(活动)排名配置，方便发奖励 第一层key:期数，第二层key:排名rank **/
	private static Map<Integer, Map<Integer, Struct_sgxfph_261>> rankConfigMap = new HashMap<>();

	public static Map<Integer, Map<Integer, Struct_sgxfph_261>> getRankConfigMap() {
		return rankConfigMap;
	}


	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub
	}

	@Override
	public void shutdownServer() {
		// TODO Auto-generated method stub
	}

	@Override
	public void initExcel() throws RunServerException {
		// TODO Auto-generated method stub
		rankConfigMap.clear();
		List<Struct_sgxfph_261> sortList = Config_sgxfph_261.getIns().getSortList();
		for (Struct_sgxfph_261 struct_sgxfph_261 : sortList) {
			int qs = struct_sgxfph_261.getQs();
			Map<Integer, Struct_sgxfph_261> map = rankConfigMap.get(qs);
			if (map == null) {
				map = new HashMap<>();
				rankConfigMap.put(qs, map);
			}
			int rankLow = struct_sgxfph_261.getRank()[0][0];
			int rankHigh = struct_sgxfph_261.getRank()[0][1];
			for (int i = rankLow; i <= rankHigh; i++) {
				map.put(i, struct_sgxfph_261);
			}
		}
	}

}
