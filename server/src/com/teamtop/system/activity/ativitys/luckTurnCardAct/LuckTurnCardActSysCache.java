package com.teamtop.system.activity.ativitys.luckTurnCardAct;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.excel.ExcelJsonUtils;

import excel.config.Config_slfpjlb_330;
import excel.config.Config_slfplsb_330;
import excel.config.Config_slfpxhb_330;
import excel.struct.Struct_slfpjlb_330;
import excel.struct.Struct_slfplsb_330;
import excel.struct.Struct_slfpxhb_330;

public class LuckTurnCardActSysCache extends AbsServerEvent {
	/** 配置map 第一层key:期数,第二层key:翻牌类型 */
	private static Map<Integer, Map<Integer, int[][]>> configMap = new HashMap<>();
	/** 配置map key:期数,value:配置表List */
	private static Map<Integer, List<Struct_slfplsb_330>> configListMap = new HashMap<>();
	/** 抽奖用 key:期数 **/
	private static Map<Integer, List<List<ProbabilityEventModel>>> awardProEventConfigMap = new HashMap<>();

	public static Map<Integer, List<List<ProbabilityEventModel>>> getAwardProEventConfigMap() {
		return awardProEventConfigMap;
	}

	public static Map<Integer, Map<Integer, int[][]>> getConfigMap() {
		return configMap;
	}

	public static Map<Integer, List<Struct_slfplsb_330>> getConfigListMap() {
		return configListMap;
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void initExcel() throws RunServerException {
		// TODO Auto-generated method stub
		configMap.clear();
		awardProEventConfigMap.clear();
		configListMap.clear();
		List<Struct_slfpxhb_330> sortList = Config_slfpxhb_330.getIns().getSortList();
		for (Struct_slfpxhb_330 struct_slfpxhb_330 : sortList) {
			int qs = struct_slfpxhb_330.getQs();
			Map<Integer, int[][]> map = configMap.get(qs);
			if (map == null) {
				map = new HashMap<>();
				configMap.put(qs, map);
			}
			int lx = struct_slfpxhb_330.getLx();
			int yb = struct_slfpxhb_330.getYb();
			map.put(lx, new int[][] { { GameConst.YUANBAO, 0, yb } });
		}

		List<Struct_slfpjlb_330> sortList2 = Config_slfpjlb_330.getIns().getSortList();
		for (Struct_slfpjlb_330 struct_slfpjlb_330 : sortList2) {
			List<ProbabilityEventModel> defeatProModel = ExcelJsonUtils.getGeneralDropData(struct_slfpjlb_330.getSb());
			List<ProbabilityEventModel> victoryProModel = ExcelJsonUtils.getGeneralDropData(struct_slfpjlb_330.getSl());
			List<List<ProbabilityEventModel>> list = new ArrayList<List<ProbabilityEventModel>>(2);
			list.add(defeatProModel);
			list.add(victoryProModel);
			awardProEventConfigMap.put(struct_slfpjlb_330.getQs(), list);
		}

		List<Struct_slfplsb_330> sortList3 = Config_slfplsb_330.getIns().getSortList();
		for (Struct_slfplsb_330 struct_slfplsb_330 : sortList3) {
			int qs = struct_slfplsb_330.getQs();
			List<Struct_slfplsb_330> list = configListMap.get(qs);
			if (list == null) {
				list = new ArrayList<>();
				configListMap.put(qs, list);
			}
			list.add(struct_slfplsb_330);
		}
	}

}
