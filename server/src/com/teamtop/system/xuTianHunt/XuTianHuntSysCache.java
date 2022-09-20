package com.teamtop.system.xuTianHunt;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventFactory;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventUtil;

import excel.config.Config_xtwl_776;
import excel.config.Config_xtwlbf_776;
import excel.struct.Struct_xtwl_776;
import excel.struct.Struct_xtwlbf_776;

public class XuTianHuntSysCache extends AbsServerEvent {

	private static ProbabilityEventModel highModel = ProbabilityEventFactory.getProbabilityEvent();

	private static ProbabilityEventModel nomalModel = ProbabilityEventFactory.getProbabilityEvent();

	private static ProbabilityEventModel buffModel = ProbabilityEventFactory.getProbabilityEvent();

	private static ConcurrentHashMap<Long, Integer> huntingMap = new ConcurrentHashMap<>();

	public static ProbabilityEventModel getHighModel() {
		return highModel;
	}

	public static void setHighModel(ProbabilityEventModel highModel) {
		XuTianHuntSysCache.highModel = highModel;
	}

	public static ProbabilityEventModel getNomalModel() {
		return nomalModel;
	}

	public static void setNomalModel(ProbabilityEventModel nomalModel) {
		XuTianHuntSysCache.nomalModel = nomalModel;
	}

	public static ProbabilityEventModel getBuffModel() {
		return buffModel;
	}

	public static void setBuffModel(ProbabilityEventModel buffModel) {
		XuTianHuntSysCache.buffModel = buffModel;
	}

	public static ConcurrentHashMap<Long, Integer> getHuntingMap() {
		return huntingMap;
	}

	public static void setHuntingMap(ConcurrentHashMap<Long, Integer> huntingMap) {
		XuTianHuntSysCache.huntingMap = huntingMap;
	}

	public static void getHigh(int num, Map<Integer, Integer> preyMap) {
		for (int i = 0; i < num; i++) {
			Integer id = (Integer) ProbabilityEventUtil.getEventByProbability(highModel);
			preyMap.put(i + 1, id.intValue());
		}
	}

	public static void getNomal(int num, int index, Map<Integer, Integer> preyMap) {
		index += 1;
		for (int i = 0; i < num; i++) {
			Integer id = (Integer) ProbabilityEventUtil.getEventByProbability(nomalModel);
			preyMap.put(i + index, id.intValue());
		}
	}

	public static void getBuff(int num, int index, Map<Integer, Integer> buffMap) {
		index += 1;
		for (int i = 0; i < num; i++) {
			Integer id = (Integer) ProbabilityEventUtil.getEventByProbability(buffModel);
			buffMap.put(i + index, id.intValue());
		}
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void initExcel() throws RunServerException {
		highModel = ProbabilityEventFactory.getProbabilityEvent();
		nomalModel = ProbabilityEventFactory.getProbabilityEvent();
		buffModel = ProbabilityEventFactory.getProbabilityEvent();
		List<Struct_xtwl_776> sortList = Config_xtwl_776.getIns().getSortList();
		int size = sortList.size();
		for (int i = 0; i < size; i++) {
			Struct_xtwl_776 struct_xtwl_776 = sortList.get(i);
			int lx = struct_xtwl_776.getLx();
			int ccgl = struct_xtwl_776.getCcgl();
			int id = struct_xtwl_776.getId();
			if (lx == 1) {
				nomalModel.addProbabilityEvent(ccgl, id);
			} else {
				highModel.addProbabilityEvent(ccgl, id);
			}
		}
		List<Struct_xtwlbf_776> bfList = Config_xtwlbf_776.getIns().getSortList();
		size = bfList.size();
		for (int i = 0; i < size; i++) {
			Struct_xtwlbf_776 xtwlbf_776 = bfList.get(i);
			int gl1 = xtwlbf_776.getGl1();
			int id = xtwlbf_776.getId();
			buffModel.addProbabilityEvent(gl1, id);
		}
	}

}
