package com.teamtop.system.activity.ativitys.scratchTicket;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventFactory;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;

import excel.config.Config_ggl_336;
import excel.struct.Struct_ggl_336;

public class ScratchTicketSysCache extends AbsServerEvent {

	private static Map<Integer, ProbabilityEventModel> qsMap = new HashMap<>();

	private static Map<Integer, Set<Integer>> qsIdMap = new HashMap<>();

	public static Map<Integer, ProbabilityEventModel> getQsMap() {
		return qsMap;
	}

	public static void setQsMap(Map<Integer, ProbabilityEventModel> qsMap) {
		ScratchTicketSysCache.qsMap = qsMap;
	}

	public static Map<Integer, Set<Integer>> getQsIdMap() {
		return qsIdMap;
	}

	public static void setQsIdMap(Map<Integer, Set<Integer>> qsIdMap) {
		ScratchTicketSysCache.qsIdMap = qsIdMap;
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void initExcel() throws RunServerException {
		qsMap.clear();
		qsIdMap.clear();
		List<Struct_ggl_336> sortList = Config_ggl_336.getIns().getSortList();
		int size = sortList.size();
		for (int i = 0; i < size; i++) {
			Struct_ggl_336 ggl_336 = sortList.get(i);
			int qs = ggl_336.getQs();
			ProbabilityEventModel model = qsMap.get(qs);
			if (model == null) {
				model = ProbabilityEventFactory.getProbabilityEvent();
				qsMap.put(qs, model);
			}
			model.addProbabilityEvent(ggl_336.getGl(), ggl_336);
			Set<Integer> set = qsIdMap.get(qs);
			if (set == null) {
				set = new HashSet<>();
				qsIdMap.put(qs, set);
			}
			set.add(ggl_336.getId());
		}
	}

}
