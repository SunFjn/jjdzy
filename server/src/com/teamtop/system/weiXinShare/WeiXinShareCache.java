package com.teamtop.system.weiXinShare;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;

import excel.config.Config_mrfx_278;
import excel.struct.Struct_mrfx_278;

public class WeiXinShareCache extends AbsServerEvent {

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
	}

	@Override
	public void initExcel() throws RunServerException {
		dailMap.clear();
		List<Struct_mrfx_278> sortList = Config_mrfx_278.getIns().getSortList();
		int size = sortList.size();
		Struct_mrfx_278 mrfx_278 = null;
		for (int i = 0; i < size; i++) {
			mrfx_278 = sortList.get(i);
			int[][] time = mrfx_278.getTime();
			String reward = mrfx_278.getReward();
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
