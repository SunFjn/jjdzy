package com.teamtop.system.material.baodi;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventFactory;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;

import excel.config.Config_lbbd_277;
import excel.struct.Struct_lbbd_277;

public class GiftBaodiCache extends AbsServerEvent {

	public static Map<Integer, ProbabilityEventModel> proMap = new HashMap<>();

	public static Map<Integer, Integer> resetMap = new HashMap<>();

	public static Map<Integer, ProbabilityEventModel> getProMap() {
		return proMap;
	}

	public static void setProMap(Map<Integer, ProbabilityEventModel> proMap) {
		GiftBaodiCache.proMap = proMap;
	}

	public static int[] getTool(int sysId) {
		ProbabilityEventModel eventModel = proMap.get(sysId);
		int[] tool = (int[]) ProbabilityEventUtil.getEventByProbability(eventModel);
		return tool;
	}

	public static Map<Integer, Integer> getResetMap() {
		return resetMap;
	}

	public static void setResetMap(Map<Integer, Integer> resetMap) {
		GiftBaodiCache.resetMap = resetMap;
	}

	public static int getResetLimit(int sysId) {
		return resetMap.get(sysId);
	}

	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void initExcel() throws RunServerException {
		List<Struct_lbbd_277> sortList = Config_lbbd_277.getIns().getSortList();
		int size = sortList.size();
		for (int i = 0; i < size; i++) {
			Struct_lbbd_277 struct_lbbd_277 = sortList.get(i);
			int id = struct_lbbd_277.getId();
			int[][] reward = struct_lbbd_277.getReward();
			ProbabilityEventModel probabilityEvent = ProbabilityEventFactory.getProbabilityEvent();
			for (int[] is : reward) {
				probabilityEvent.addProbabilityEvent(is[4], new int[] { is[1], is[2], is[3] });
			}
			proMap.put(id, probabilityEvent);
			int[][] reward1 = struct_lbbd_277.getReward1();
			for (int[] is : reward1) {
				Integer resetNum = resetMap.get(id);
				if (resetNum == null) {
					resetNum = 0;
				}
				if (resetNum < is[5]) {
					resetMap.put(id, is[5]);
				}
			}
		}
	}

}
