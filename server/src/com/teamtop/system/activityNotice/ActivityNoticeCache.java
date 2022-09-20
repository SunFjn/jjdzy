package com.teamtop.system.activityNotice;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import com.teamtop.main.RunServerException;
import com.teamtop.system.activityNotice.imp.WenDingSpecialHandle;
import com.teamtop.system.activityNotice.model.ActivityNoticeItemModel;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.hero.SystemIdConst;

import excel.config.Config_hdyg_229;
import excel.struct.Struct_hdyg_229;

public class ActivityNoticeCache extends AbsServerEvent {
	private static Map<Integer, List<Struct_hdyg_229>> sysIdToIndexMap = new HashMap<>();
	private static TreeMap<ActivityNoticeItemModel, List<ActivityNoticeItemModel>> configStartTimeSortTreeMap = new TreeMap<>(
			new ActivityNoticeStartTimeComparator());

	private static Map<Integer, ActivityNoticeSpecialHandleInf> specialHandleMap = new HashMap<>();
	private static List<ActivityNoticeItemModel> currentTimePriorityList = new ArrayList<>();

	static {
		specialHandleMap.put(SystemIdConst.CROSS_WEN_DING_TIAN_XIA, new WenDingSpecialHandle());
	}

	public static Map<Integer, ActivityNoticeSpecialHandleInf> getSpecialHandleMap() {
		return specialHandleMap;
	}

	public static List<ActivityNoticeItemModel> getCurrentTimePriorityList() {
		return currentTimePriorityList;
	}

	public static Map<Integer, List<Struct_hdyg_229>> getSysIdToIndexMap() {
		return sysIdToIndexMap;
	}

	public static TreeMap<ActivityNoticeItemModel, List<ActivityNoticeItemModel>> getConfigStartTimeSortTreeMap() {
		return configStartTimeSortTreeMap;
	}

	@Override
	public void startServer() throws RunServerException {
	}

	@Override
	public void initExcel() throws RunServerException {
		// TODO Auto-generated method stub
		sysIdToIndexMap.clear();
		currentTimePriorityList.clear();
		List<Struct_hdyg_229> sortList = Config_hdyg_229.getIns().getSortList();
		int size = sortList.size();
		for (int i = 0; i < size; i++) {
			Struct_hdyg_229 struct_hdyg_229 = sortList.get(i);
			int sysId = struct_hdyg_229.getSysid()[0];
			List<Struct_hdyg_229> list = sysIdToIndexMap.get(sysId);
			if (list == null) {
				list = new ArrayList<>();
				sysIdToIndexMap.put(sysId, list);
			}
			list.add(struct_hdyg_229);
		}
		ActivityNoticeFunction.getIns().initConfigStartTimeSortTreeMap();
		ActivityNoticeFunction.getIns().currentTimePriorityListHandle();
	}

}
