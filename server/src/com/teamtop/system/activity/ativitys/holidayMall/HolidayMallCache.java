package com.teamtop.system.activity.ativitys.holidayMall;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventFactory;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.cache.union.UC;

import excel.config.Config_jrscspb_334;
import excel.config.Config_jrscybb_334;
import excel.config.Config_jrsczkb_334;
import excel.struct.Struct_jrscspb_334;
import excel.struct.Struct_jrscybb_334;
import excel.struct.Struct_jrsczkb_334;

public class HolidayMallCache extends AbsServerEvent {

	private static Map<Integer, Map<Integer, Struct_jrscspb_334>> qsShopMap = UC.reg("HolidayMallqsShopMap",
			new HashMap<>());
	private static Map<Integer, Map<Integer, Struct_jrsczkb_334>> qsCutDownMap = UC.reg("HolidayMallqsCutDownMap",
			new HashMap<>());
	private static Map<Integer, ProbabilityEventModel> qsProMap = UC.reg("HolidayMallqsProMap",
			new HashMap<>());
	private static Map<Integer, Map<Integer, Struct_jrscybb_334>> qsYuanBaoMap = UC.reg("HolidayMallqsYuanBaoMap",
			new HashMap<>());

	public static Map<Integer, Struct_jrscybb_334> getQsYuanBaoMap(int qs) {
		return qsYuanBaoMap.get(qs);
	}

	public static Map<Integer, Struct_jrscspb_334> getQsShopMap(int qs) {
		return qsShopMap.get(qs);
	}

	public static Map<Integer, Struct_jrsczkb_334> getQsCutDownMap(int qs) {
		return qsCutDownMap.get(qs);
	}

	public static ProbabilityEventModel getQsProMap(int qs) {
		return qsProMap.get(qs);
	}
	@Override
	public void startServer() throws RunServerException {
	}

	@Override
	public void initExcel() throws RunServerException {
		qsShopMap.clear();
		qsCutDownMap.clear();
		qsProMap.clear();
		qsYuanBaoMap.clear();
		List<Struct_jrscspb_334> sortList = Config_jrscspb_334.getIns().getSortList();
		int size = sortList.size();
		for (int i = 0; i < size; i++) {
			Struct_jrscspb_334 jrscspb_334 = sortList.get(i);
			int id = jrscspb_334.getId();
			int qs = jrscspb_334.getQs();
			Map<Integer, Struct_jrscspb_334> shopMap = qsShopMap.get(qs);
			if (shopMap == null) {
				shopMap = new HashMap<>();
				qsShopMap.put(qs, shopMap);
			}
			shopMap.put(id, jrscspb_334);
		}

		List<Struct_jrsczkb_334> sortList1 = Config_jrsczkb_334.getIns().getSortList();
		int size1 = sortList1.size();
		for (int i = 0; i < size1; i++) {
			Struct_jrsczkb_334 jrsczkb_334 = sortList1.get(i);
			int id = jrsczkb_334.getId();
			int qs = jrsczkb_334.getQs();
			int gl = jrsczkb_334.getGl();
			Map<Integer, Struct_jrsczkb_334> cutDownMap = qsCutDownMap.get(qs);
			if (cutDownMap == null) {
				cutDownMap = new HashMap<>();
				qsCutDownMap.put(qs, cutDownMap);
			}
			cutDownMap.put(id, jrsczkb_334);

			ProbabilityEventModel probabilityEventModel = qsProMap.get(qs);
			if (probabilityEventModel == null) {
				probabilityEventModel = ProbabilityEventFactory.getProbabilityEvent();
				qsProMap.put(qs, probabilityEventModel);
			}
			probabilityEventModel.addProbabilityEvent(gl, id);
		}
		List<Struct_jrscybb_334> sortList2 = Config_jrscybb_334.getIns().getSortList();
		int size2 = sortList2.size();
		for (int i = 0; i < size2; i++) {
			Struct_jrscybb_334 struct_jrscybb_334 = sortList2.get(i);
			int qs = struct_jrscybb_334.getQs();
			int zk = struct_jrscybb_334.getZk();
			Map<Integer, Struct_jrscybb_334> map = qsYuanBaoMap.get(qs);
			if (map == null) {
				map = new HashMap<>();
				qsYuanBaoMap.put(qs, map);
			}
			map.put(zk, struct_jrscybb_334);
		}


	}

}
