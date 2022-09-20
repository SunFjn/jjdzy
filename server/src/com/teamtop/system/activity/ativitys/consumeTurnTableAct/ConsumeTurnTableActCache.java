package com.teamtop.system.activity.ativitys.consumeTurnTableAct;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.excel.ExcelJsonUtils;

import excel.config.Config_xhdxfzp_316;
import excel.config.Config_xhdxfzpxf_316;
import excel.struct.Struct_xhdxfzp_316;
import excel.struct.Struct_xhdxfzpxf_316;

public class ConsumeTurnTableActCache extends AbsServerEvent {
	/** 消费转盘消费表按期数分类Map key:期数，value:配置表List **/
	private static Map<Integer, List<Struct_xhdxfzpxf_316>> consumeturnConfigMap = new HashMap<>();
	/** 消费转盘消费表按期数分类Map 第一层key:期数,第二层key:道具id value:配置表id **/
	private static Map<Integer, Map<Integer, Integer>> toolIdConfigMap = new HashMap<>();

	/** 消费转盘配置表 抽奖用 第一层key:期数,第二层key:转盘次数 **/
	private static Map<Integer, Map<Integer, List<ProbabilityEventModel>>> awardProEventConfigMap = new HashMap<>();

	public static Map<Integer, List<Struct_xhdxfzpxf_316>> getConsumeturnConfigMap() {
		return consumeturnConfigMap;
	}

	public static Map<Integer, Map<Integer, Integer>> getToolIdConfigMap() {
		return toolIdConfigMap;
	}

	public static Map<Integer, Map<Integer, List<ProbabilityEventModel>>> getAwardProEventConfigMap() {
		return awardProEventConfigMap;
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void initExcel() throws RunServerException {
		// TODO Auto-generated method stub
		consumeturnConfigMap.clear();
		toolIdConfigMap.clear();
		awardProEventConfigMap.clear();
		List<Struct_xhdxfzpxf_316> sortList = Config_xhdxfzpxf_316.getIns().getSortList();
		for (Struct_xhdxfzpxf_316 struct_xhdxfzpxf_316 : sortList) {
			int qs = struct_xhdxfzpxf_316.getQs();
			List<Struct_xhdxfzpxf_316> list = consumeturnConfigMap.get(qs);
			if (list == null) {
				list = new ArrayList<>();
				consumeturnConfigMap.put(qs, list);
			}
			list.add(struct_xhdxfzpxf_316);
			Map<Integer, Integer> map = toolIdConfigMap.get(qs);
			if (map == null) {
				map = new HashMap<>();
				toolIdConfigMap.put(qs, map);
			}
			int toolId = struct_xhdxfzpxf_316.getShow()[0][1];
			int id = struct_xhdxfzpxf_316.getId();
			map.put(toolId, id);
		}

		List<Struct_xhdxfzp_316> sortList2 = Config_xhdxfzp_316.getIns().getSortList();
		for (Struct_xhdxfzp_316 struct_xhdxfzp_316 : sortList2) {
			int qs = struct_xhdxfzp_316.getQs();
			Map<Integer, List<ProbabilityEventModel>> map = awardProEventConfigMap.get(qs);
			if (map == null) {
				map = new HashMap<>();
				awardProEventConfigMap.put(qs, map);
			}
			int[][] time = struct_xhdxfzp_316.getTime();
			int low = struct_xhdxfzp_316.getTime()[0][0];
			int high = 0;
			if (time[0].length == 1) {
				high = struct_xhdxfzp_316.getTime()[0][0];
			} else {
				high = struct_xhdxfzp_316.getTime()[0][1];
			}
			List<ProbabilityEventModel> proModel = ExcelJsonUtils.getGeneralDropData(struct_xhdxfzp_316.getReward());
			for (int i = low; i <= high; i++) {
				map.put(i, proModel);
			}
		}
	}

}
