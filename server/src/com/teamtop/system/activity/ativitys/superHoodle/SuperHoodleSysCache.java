package com.teamtop.system.activity.ativitys.superHoodle;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.activity.ativitys.superHoodle.model.ProRewardInfo;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventFactory;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.excel.ExcelJsonUtils;

import excel.config.Config_cjdz_502;
import excel.config.Config_cjdzstore_502;
import excel.struct.Struct_cjdz_502;
import excel.struct.Struct_cjdzstore_502;

public class SuperHoodleSysCache extends AbsServerEvent {

	public static int[] indexArr = new int[] { 1, 2, 3, 4, 5, 5, 5 };

	private static Map<Integer, Map<Integer, ProRewardInfo>> qsMap = new HashMap<>();

	private static Map<Integer, List<Struct_cjdzstore_502>> qsStoreMap = new HashMap<>();

	public static Map<Integer, Map<Integer, ProRewardInfo>> getQsMap() {
		return qsMap;
	}

	public static void setQsMap(Map<Integer, Map<Integer, ProRewardInfo>> qsMap) {
		SuperHoodleSysCache.qsMap = qsMap;
	}

	public static Map<Integer, List<Struct_cjdzstore_502>> getQsStoreMap() {
		return qsStoreMap;
	}

	public static void setQsStoreMap(Map<Integer, List<Struct_cjdzstore_502>> qsStoreMap) {
		SuperHoodleSysCache.qsStoreMap = qsStoreMap;
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void initExcel() throws RunServerException {
		qsMap.clear();
		qsStoreMap.clear();
		List<Struct_cjdz_502> sortList = Config_cjdz_502.getIns().getSortList();
		int size = sortList.size();
		Struct_cjdz_502 struct_cjdz_502 = null;
		int id = 0;
		int qs = 0;
		int qz = 0;
		int jc = 0;
		String rewardStr = null;
		int[][] reward = null;
		for (int i = 0; i < size; i++) {
			struct_cjdz_502 = sortList.get(i);
			qs = struct_cjdz_502.getQs();
			id = struct_cjdz_502.getId();
			qz = struct_cjdz_502.getQz();
			jc = struct_cjdz_502.getJc();
			rewardStr = struct_cjdz_502.getReward();
			rewardStr = rewardStr.substring(1, rewardStr.length() - 1);
			reward = ExcelJsonUtils.toObj(rewardStr, int[][].class);
			Map<Integer, ProRewardInfo> map = qsMap.get(qs);
			if (map == null) {
				map = new HashMap<>();
				qsMap.put(qs, map);
			}
			ProRewardInfo pInfo = new ProRewardInfo();
			pInfo.setId(id);
			pInfo.setPool(jc);
			pInfo.setPro(qz * 100);
			ProbabilityEventModel proModel = ProbabilityEventFactory.getProbabilityEvent();
			for (int[] arr : reward) {
				int[][] tools = new int[1][];
				tools[0] = new int[] { arr[0], arr[1], arr[2], arr[4] };
				proModel.addProbabilityEvent(arr[3], tools);
			}
			pInfo.setProModel(proModel);
			map.put(jc, pInfo);
		}

		List<Struct_cjdzstore_502> storeList = Config_cjdzstore_502.getIns().getSortList();
		size = storeList.size();
		for (int i = 0; i < size; i++) {
			Struct_cjdzstore_502 cjdzstore_502 = storeList.get(i);
			qs = cjdzstore_502.getQs();
			List<Struct_cjdzstore_502> list = qsStoreMap.get(qs);
			if (list == null) {
				list = new ArrayList<>();
				qsStoreMap.put(qs, list);
			}
			list.add(cjdzstore_502);
		}
	}

}
