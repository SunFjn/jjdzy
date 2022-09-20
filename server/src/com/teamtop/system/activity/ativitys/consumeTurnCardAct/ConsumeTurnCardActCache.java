package com.teamtop.system.activity.ativitys.consumeTurnCardAct;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;

import excel.config.Config_xhdxffp_318;
import excel.config.Config_xhdxffpxfb_318;
import excel.struct.Struct_xhdxffp_318;
import excel.struct.Struct_xhdxffpxfb_318;

public class ConsumeTurnCardActCache extends AbsServerEvent {
	/** 消费转盘消费表按期数分类Map key:期数，value:配置表List **/
	private static Map<Integer, List<Struct_xhdxffpxfb_318>> consumeturnConfigMap = new HashMap<>();
	/** key:期数，value:<key:次数, value:概率组id> **/
	private static Map<Integer, Map<Integer, Integer>> timesCardMap = new HashMap<>();

	public static Map<Integer, List<Struct_xhdxffpxfb_318>> getConsumeturnConfigMap() {
		return consumeturnConfigMap;
	}

	public static Map<Integer, Map<Integer, Integer>> getTimesCardMap() {
		return timesCardMap;
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void initExcel() throws RunServerException {
		// TODO Auto-generated method stub
		consumeturnConfigMap.clear();
		timesCardMap.clear();
		List<Struct_xhdxffpxfb_318> sortList = Config_xhdxffpxfb_318.getIns().getSortList();
		for (Struct_xhdxffpxfb_318 sruct_xhdxffpxfb_318 : sortList) {
			int qs = sruct_xhdxffpxfb_318.getQs();
			List<Struct_xhdxffpxfb_318> list = consumeturnConfigMap.get(qs);
			if (list == null) {
				list = new ArrayList<>();
				consumeturnConfigMap.put(qs, list);
			}
			list.add(sruct_xhdxffpxfb_318);
		}

		List<Struct_xhdxffp_318> sortList2 = Config_xhdxffp_318.getIns().getSortList();
		for (Struct_xhdxffp_318 struct_xhdxffp_318 : sortList2) {
			int qs = struct_xhdxffp_318.getQs();
			Map<Integer, Integer> map = timesCardMap.get(qs);
			if (map == null) {
				map = new HashMap<>();
				timesCardMap.put(qs, map);
			}
			int[][] time = struct_xhdxffp_318.getTime();
			for (int i = time[0][0]; i <= time[0][1]; i++) {
				map.put(i, struct_xhdxffp_318.getId());
			}
		}
	}

}
