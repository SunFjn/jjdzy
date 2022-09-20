package com.teamtop.system.activityNotice;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.TreeMap;

import com.teamtop.system.activityNotice.model.ActivityNoticeItemModel;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_hdyg_229;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_hdyg_229;

public class ActivityNoticeFunction {
	private static ActivityNoticeFunction ins = null;

	public static ActivityNoticeFunction getIns() {
		if (ins == null) {
			ins = new ActivityNoticeFunction();
		}
		return ins;
	}

	private ActivityNoticeFunction() {
	}

	/**
	 * 返回ActivityNoticeItemModel
	 */
	public ActivityNoticeItemModel getModel(Hero hero) {
		ActivityNoticeItemModel returnModel = new ActivityNoticeItemModel();
		// 如果在活动时间内
		List<ActivityNoticeItemModel> currentTimePriorityList = ActivityNoticeCache.getCurrentTimePriorityList();
		int size = currentTimePriorityList.size();
		for (int i = 0; i < size; i++) {
			ActivityNoticeItemModel model = currentTimePriorityList.get(i);
			if (!HeroFunction.getIns().checkSystemOpen(hero, model.getSysId())) {
				continue;
			}
			// 特殊处理
			ActivityNoticeSpecialHandleInf specialHandleInf = ActivityNoticeCache.getSpecialHandleMap()
					.get(model.getSysId());
			if (specialHandleInf != null) {
				if (!specialHandleInf.isOpen()) {
					continue;
				}
			}
			returnModel.setId(model.getId());
			returnModel.setSysId(model.getSysId());
			returnModel.setStartTime(model.getStartTime());
			returnModel.setEndTime(model.getEndTime());
			returnModel.setTime(model.getTime());
			return returnModel;
		}

		// 如果在活动时间外
		TreeMap<ActivityNoticeItemModel, List<ActivityNoticeItemModel>> treeMap = ActivityNoticeCache
				.getConfigStartTimeSortTreeMap();
		int i = 1;
		for (Entry<ActivityNoticeItemModel, List<ActivityNoticeItemModel>> entry : treeMap.entrySet()) {
			ActivityNoticeItemModel model = entry.getKey();
			int startTime = model.getStartTime();
			int endTime = model.getEndTime();
			int currentTime = TimeDateUtil.getCurrentTime();
//			// 如果在活动时间内，按优先级最高展示活动
//			if ((currentTime >= startTime && currentTime < endTime)) {
//				List<ActivityNoticeItemModel> list = entry.getValue();
//				if (setModel_f1(hero, list, true, returnModel)) {
//					return returnModel;
//				}
//			}
			// 如果在活动时间外，则按优先级最高展示下一个活动
			if (currentTime < startTime) {
				List<ActivityNoticeItemModel> list = entry.getValue();
				if (setModel_f1(hero, list, false, returnModel)) {
					return returnModel;
				}
			}
			// 如果在活动时间外，则按优先级最高展示下一个活动
			if (i == treeMap.size()) {
				for (Entry<ActivityNoticeItemModel, List<ActivityNoticeItemModel>> entry1 : treeMap.entrySet()) {
					List<ActivityNoticeItemModel> list = entry1.getValue();
					if (setModel_f1(hero, list, true, returnModel)) {
						return returnModel;
					}
				}
			}
			i++;
		}

		return null;

	}

	private boolean setModel_f1(Hero hero, List<ActivityNoticeItemModel> list, boolean isEnd,
			ActivityNoticeItemModel returnModel) {
		int size = list.size();
		for (int i = 0; i < size; i++) {
			ActivityNoticeItemModel model = list.get(i);
			Struct_hdyg_229 struct_hdyg_229 = Config_hdyg_229.getIns().get(model.getId());
			// 特殊处理
			ActivityNoticeSpecialHandleInf specialHandleInf = ActivityNoticeCache.getSpecialHandleMap()
					.get(struct_hdyg_229.getSysid()[0]);
			if (isWeekOpen(struct_hdyg_229.getWeek(), isEnd)
					|| (specialHandleInf != null && specialHandleInf.isOpen())) {
				if (!HeroFunction.getIns().checkSystemOpen(hero, model.getSysId())) {
					continue;
				}

				returnModel.setEndTime(-1);
				returnModel.setId(model.getId());
				returnModel.setSysId(model.getSysId());
				returnModel.setStartTime(model.getStartTime());
				returnModel.setTime(model.getTime());
				return true;
			}
		}
		return false;
	}

	public int[] getStartAndEndTime(String startTimeStr, String endTimeStr) {
		String[] startTimeSplit = startTimeStr.split(":");
		String[] endTimeSplit = endTimeStr.split(":");
		int startHour = Integer.parseInt(startTimeSplit[0]);
		int startMin = Integer.parseInt(startTimeSplit[1]);
		int endHour = Integer.parseInt(endTimeSplit[0]);
		int endMin = Integer.parseInt(endTimeSplit[1]);
		int startTime = TimeDateUtil.getOneTime(0, startHour, startMin, 0);
		int endTime = TimeDateUtil.getOneTime(0, endHour, endMin, 0);
		return new int[] { startTime, endTime };
	}

	/**
	 * 初始化configStartTimeSortTreeMap(开服,零点)
	 */
	public void initConfigStartTimeSortTreeMap() {
		TreeMap<ActivityNoticeItemModel, List<ActivityNoticeItemModel>> treeMap = ActivityNoticeCache
				.getConfigStartTimeSortTreeMap();
		treeMap.clear();
		List<Struct_hdyg_229> sortList = Config_hdyg_229.getIns().getSortList();
		int size = sortList.size();
		for (int i = 0; i < size; i++) {
			Struct_hdyg_229 struct_hdyg_229 = sortList.get(i);
			ActivityNoticeItemModel model = new ActivityNoticeItemModel();
			int[] startAndEndTime = ActivityNoticeFunction.getIns().getStartAndEndTime(struct_hdyg_229.getStart(),
					struct_hdyg_229.getEnd());
			int startTime = startAndEndTime[0];
			int endTime = startAndEndTime[1];
			model.setId(struct_hdyg_229.getId());
			model.setSysId(struct_hdyg_229.getSysid()[0]);
			model.setStartTime(startTime);
			if (endTime < startTime) {
				endTime += TimeDateUtil.ONE_DAY_INT;
			}
			model.setEndTime(endTime);
			model.setNotice(true);
			model.setTime(struct_hdyg_229.getTime());
			List<ActivityNoticeItemModel> list2 = treeMap.get(model);
			if (list2 == null) {
				list2 = new ArrayList<>();
				treeMap.put(model, list2);
			}
			list2.add(model);
		}
		for (List<ActivityNoticeItemModel> list : treeMap.values()) {
			Collections.sort(list, new ActivityNoticePriorityComparator());
		}
	}

	/**
	 * currentTimePriorityList处理,(开服,1分钟定时处理)
	 */
	public void currentTimePriorityListHandle() {
		List<ActivityNoticeItemModel> currentTimePriorityList = ActivityNoticeCache.getCurrentTimePriorityList();
		currentTimePriorityList.clear();
		List<Struct_hdyg_229> sortList = Config_hdyg_229.getIns().getSortList();
		for (Struct_hdyg_229 struct_hdyg_229 : sortList) {
			int[] startAndEndTime = ActivityNoticeFunction.getIns().getStartAndEndTime(struct_hdyg_229.getStart(),
					struct_hdyg_229.getEnd());
			int startTime = startAndEndTime[0];
			int endTime = startAndEndTime[1];
			int currentTime = TimeDateUtil.getCurrentTime();
			if (endTime < startTime) {
				if (currentTime < endTime) {
					// 过零点特殊处理
					startTime = TimeDateUtil.getTodayZeroTimeReturnInt();
				} else {
					// 没过零点特殊处理
					endTime += TimeDateUtil.ONE_DAY_INT;
				}
			}
			ActivityNoticeSpecialHandleInf specialHandleInf = ActivityNoticeCache.getSpecialHandleMap()
					.get(struct_hdyg_229.getSysid()[0]);
			// 如果在活动时间内，按优先级最高展示活动
			if (isWeekOpen(struct_hdyg_229.getWeek(), false)
					|| (specialHandleInf != null && specialHandleInf.isOpen())) {
				if ((currentTime >= startTime && currentTime < endTime)) {
					ActivityNoticeItemModel model = new ActivityNoticeItemModel();
					model.setId(struct_hdyg_229.getId());
					model.setSysId(struct_hdyg_229.getSysid()[0]);
					model.setStartTime(startTime);
					model.setEndTime(endTime);
					model.setTime(struct_hdyg_229.getTime());
					currentTimePriorityList.add(model);
				}
			}
		}
		Collections.sort(currentTimePriorityList, new ActivityNoticePriorityComparator());

	}

	/**
	 * 是否今天开
	 * 
	 * @param weeks
	 * @return
	 */
	public boolean isWeekOpen(int[] weeks, boolean isEnd) {
		int week = TimeDateUtil.getWeek();
		if (isEnd) {
			week++;
			if (week >= 8) {
				week = 1;
			}
		}
		for (int i = 0; i < weeks.length; i++) {
			if (weeks[i] == week) {
				return true;
			}
		}
		return false;
	}

	/**
	 * 对问鼎天下活动特殊处理，是否开启状态
	 * 
	 * @return
	 */
	public boolean isOpenSpecialHandle() {
		try {
			int betweenOpen = TimeDateUtil.betweenOpen();
			if (isNewServer() && isOpenTimeSpecialHandle()) {
				int[] openDayArray = Config_xtcs_004.getIns().get(ActivityNoticeConst.WENDING_NEWSERVER_OPENDAYARRAY)
						.getOther()[0];
				for (int openDay1 : openDayArray) {
					if (openDay1 == betweenOpen) {
						return true;
					}
				}
			}
			return false;
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, "isOpenSpecialHandle");
			return false;
		}

	}

	/**
	 * 是否新服判断
	 * 
	 * @return
	 */
	public boolean isNewServer() {
		int openDay = Config_xtcs_004.getIns().get(ActivityNoticeConst.WENDING_NEWSERVER_OPENDAY).getNum();
		int betweenOpen = TimeDateUtil.betweenOpen();
		// 是否新服判断
		if (betweenOpen <= openDay) {
			return true;
		}
		return false;
	}

	/**
	 * 问鼎天下活动是否处在开启时间内，特殊处理用
	 * 
	 * @return
	 */
	public boolean isOpenTimeSpecialHandle() {
		Map<Integer, List<Struct_hdyg_229>> sysIdToIndexMap = ActivityNoticeCache.getSysIdToIndexMap();
		List<Struct_hdyg_229> list = sysIdToIndexMap.get(SystemIdConst.CROSS_WEN_DING_TIAN_XIA);
		Struct_hdyg_229 struct_hdyg_229 = list.get(0);
		int[] startAndEndTime = ActivityNoticeFunction.getIns().getStartAndEndTime(struct_hdyg_229.getStart(),
				struct_hdyg_229.getEnd());
		int startTime = startAndEndTime[0];
		int endTime = startAndEndTime[1];
		int currentTime = TimeDateUtil.getCurrentTime();
		if (currentTime >= startTime && currentTime < endTime) {
			return true;
		}
		return false;
	}
}
