package com.teamtop.system.openDaysSystem.saintMonsterDial;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;

import excel.config.Config_ssshzp_268;
import excel.struct.Struct_ssshzp_268;

public class SaintMonsterDialSysCache extends AbsServerEvent {

	private static Map<int[], List<int[]>> dailMap = new HashMap<>();

	public static List<int[]> getRandomList(int turnNum) {
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
		dailMap.clear();
		List<Struct_ssshzp_268> sortList = Config_ssshzp_268.getIns().getSortList();
		int size = sortList.size();
		Struct_ssshzp_268 ssshzp_268 = null;
		for (int i = 0; i < size; i++) {
			ssshzp_268 = sortList.get(i);
			int[][] time = ssshzp_268.getTime();
			String reward = ssshzp_268.getReward();
			String[] arr = reward.split(";");
			List<int[]> proList = new ArrayList<>();
			for (String info : arr) {
				String[] pArr = info.split(",");
				int turnId = Integer.parseInt(pArr[0]);
				int probability = Integer.parseInt(pArr[1]);
				proList.add(new int[] { turnId, probability });
			}
			dailMap.put(time[0], proList);
		}
	}

}
