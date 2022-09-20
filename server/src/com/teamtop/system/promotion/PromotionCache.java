package com.teamtop.system.promotion;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.cache.union.UC;

import excel.config.Config_uptask_231;
import excel.struct.Struct_uptask_231;

public class PromotionCache extends AbsServerEvent {

	/**
	 *  类型任务集合
	 *	key:类型, value:List<taskId(任务id)>
	 **/
	private static Map<Integer, List<Integer>> typeTaskCache = UC.reg("promotionTypeTaskCache", new HashMap<Integer, List<Integer>>());
	
	/**
	 * 任务分支集合
	 * key:taskId/1000, value:List<taskId(任务id)>
	 * */
	private static Map<Integer, List<Integer>> teamTaskMap = UC.reg("promotionTeamTaskMap", new HashMap<Integer, List<Integer>>());

	public static Map<Integer, List<Integer>> getTypeTaskCache() {
		return typeTaskCache;
	}

	public static Map<Integer, List<Integer>> getTeamTaskMap() {
		return teamTaskMap;
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void initExcel() throws RunServerException {
		List<Struct_uptask_231> sortList = Config_uptask_231.getIns().getSortList();
		int size = sortList.size();
		Struct_uptask_231 task = null;
		int type = 0;
		int teamId = 0;
		List<Integer> list = null;
		List<Integer> teamList = null;
		for (int i = 0; i < size; i++) {
			task = sortList.get(i);
			type = task.getType();
			list = typeTaskCache.get(type);
			if (list == null) {
				list = new ArrayList<>();
				typeTaskCache.put(type, list);
			}
			list.add(task.getId());
			teamId = task.getId() / PromotionConst.TEAM_DIVISOR;
			teamList = teamTaskMap.get(teamId);
			if (teamList == null) {
				teamList = new ArrayList<>();
				teamTaskMap.put(teamId, teamList);
			}
			teamList.add(task.getId());
		}
	}

}
