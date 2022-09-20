package com.teamtop.system.activity.ativitys.godOfWealthSendGiftAct;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.excel.ExcelJsonUtils;

import excel.config.Config_moneygod_293;
import excel.struct.Struct_moneygod_293;

public class GodOfWealthSendGiftActCache extends AbsServerEvent {

	/** 新活动财神送礼表 抽奖用 第一层key:期数,第二层key:转盘次数 **/
	private static Map<Integer, TreeMap<Integer, List<ProbabilityEventModel>>> awardProEventConfigMap = new HashMap<>();

	public static Map<Integer, TreeMap<Integer, List<ProbabilityEventModel>>> getAwardProEventConfigMap() {
		return awardProEventConfigMap;
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void initExcel() throws RunServerException {
		// TODO Auto-generated method stub
		awardProEventConfigMap.clear();
		List<Struct_moneygod_293> sortList = Config_moneygod_293.getIns().getSortList();
		for (Struct_moneygod_293 struct_moneygod_293 : sortList) {
			int qs = struct_moneygod_293.getQs();
			TreeMap<Integer, List<ProbabilityEventModel>> treeMap = awardProEventConfigMap.get(qs);
			if (treeMap == null) {
				treeMap = new TreeMap<>();
				awardProEventConfigMap.put(qs, treeMap);
			}
			int[][] qj = struct_moneygod_293.getQj();
			int low = qj[0][0];
			int high = 0;
			if (qj[0].length == 1) {
				high = qj[0][0];
			} else {
				high = qj[0][1];
			}
			List<ProbabilityEventModel> proModel = ExcelJsonUtils.getGeneralDropData(struct_moneygod_293.getReward());
			for (int i = low; i <= high; i++) {
				treeMap.put(i, proModel);
			}
		}
	}

}
