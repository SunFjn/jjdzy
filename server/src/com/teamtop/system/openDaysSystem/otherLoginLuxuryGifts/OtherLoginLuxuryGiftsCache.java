package com.teamtop.system.openDaysSystem.otherLoginLuxuryGifts;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.cache.union.UC;

import excel.config.Config_dlhl3_732;
import excel.struct.Struct_dlhl3_732;

public class OtherLoginLuxuryGiftsCache extends AbsServerEvent {

	/**
	 * 数据缓存 key:星期几, value:<key:类型, value:struct>
	 */
	private static Map<Integer, Map<Integer, Struct_dlhl3_732>> weekDayMap = UC.reg("otherLoginLuxuryGiftsWeekDayMap",
			new HashMap<Integer, Map<Integer, Struct_dlhl3_732>>());

	/**
	 * 奖励类型
	 */
	private static Set<Integer> rewardTypeSet = new HashSet<>();

	public static Map<Integer, Map<Integer, Struct_dlhl3_732>> getWeekDayMap() {
		return weekDayMap;
	}

	public static Set<Integer> getRewardTypeSet() {
		return rewardTypeSet;
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void initExcel() throws RunServerException {
		weekDayMap.clear();
		rewardTypeSet.clear();
		List<Struct_dlhl3_732> sortList = Config_dlhl3_732.getIns().getSortList();
		int size = sortList.size();
		Struct_dlhl3_732 rewardData = null;
		for (int i = 0; i < size; i++) {
			rewardData = sortList.get(i);
			Map<Integer, Struct_dlhl3_732> map = weekDayMap.get(rewardData.getTs());
			if (map == null) {
				map = new HashMap<>();
				weekDayMap.put(rewardData.getTs(), map);
			}
			map.put(rewardData.getType(), rewardData);
			rewardTypeSet.add(rewardData.getType());
		}
	}

}
