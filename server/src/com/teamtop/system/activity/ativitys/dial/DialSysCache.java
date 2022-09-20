package com.teamtop.system.activity.ativitys.dial;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;

import excel.config.Config_czzp_281;
import excel.struct.Struct_czzp_281;

public class DialSysCache extends AbsServerEvent {

	private static Map<Integer, Map<int[], List<int[]>>> qsDailMap = new HashMap<>();

	public static List<int[]> getRandomList(int turnNum, int qs) {
		Map<int[], List<int[]>> dailMap = qsDailMap.get(qs);
		Iterator<int[]> iterator = dailMap.keySet().iterator();
		for (; iterator.hasNext();) {
			int[] limit = iterator.next();
			if (limit.length == 1) {
				if (turnNum == limit[0]) {
					return dailMap.get(limit);
				}
			} else {
				if (turnNum >= limit[0] && turnNum <= limit[1]) {
					return dailMap.get(limit);
				}
			}
		}
		return null;
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void initExcel() throws RunServerException {
		qsDailMap.clear();
		List<Struct_czzp_281> sortList = Config_czzp_281.getIns().getSortList();
		int size = sortList.size();
		Struct_czzp_281 czzp_281 = null;
		for (int i = 0; i < size; i++) {
			czzp_281 = sortList.get(i);
			int qs = czzp_281.getQs();
			Map<int[], List<int[]>> map = qsDailMap.get(qs);
			if (map == null) {
				map = new HashMap<>();
				qsDailMap.put(qs, map);
			}
			int[][] time = czzp_281.getTime();
			String reward = czzp_281.getReward();
			String[] arr = reward.split(";");
			List<int[]> proList = new ArrayList<>();
			for (String info : arr) {
				String[] pArr = info.split(",");
				int turnId = Integer.parseInt(pArr[0]);
				int probability = Integer.parseInt(pArr[1]);
				proList.add(new int[] { turnId, probability });
			}
			map.put(time[0], proList);
		}
	}


}
