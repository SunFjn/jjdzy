package com.teamtop.system.activity.ativitys.kingSecretCrystal;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.activity.ativitys.kingSecretCrystal.model.ProRewardInfo;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventFactory;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;

import excel.config.Config_zzmb_503;
import excel.struct.Struct_zzmb_503;

public class KingSecretCrystalSysCache extends AbsServerEvent {

	private static Map<Integer, Map<Integer, ProRewardInfo>> qsMap = new HashMap<>();

	public static Map<Integer, Map<Integer, ProRewardInfo>> getQsMap() {
		return qsMap;
	}

	public static void setQsMap(Map<Integer, Map<Integer, ProRewardInfo>> qsMap) {
		KingSecretCrystalSysCache.qsMap = qsMap;
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void initExcel() throws RunServerException {
		List<Struct_zzmb_503> sortList = Config_zzmb_503.getIns().getSortList();
		int size = sortList.size();
		for (int i = 0; i < size; i++) {
			Struct_zzmb_503 zzmb_503 = sortList.get(i);
			int qs = zzmb_503.getQs();
			Map<Integer, ProRewardInfo> map = qsMap.get(qs);
			if (map == null) {
				map = new HashMap<>();
				qsMap.put(qs, map);
			}
			String reward = zzmb_503.getReward();
			String str = reward.substring(1, reward.length() - 1);
			String[] arr = str.split(";");
			ProbabilityEventModel probabilityEvent = ProbabilityEventFactory.getProbabilityEvent();
			for (String info : arr) {
				String[] infoArr = info.split(",");
				int[] rewardArr = new int[infoArr.length];
				for (int j = 0; j < infoArr.length; j++) {
					rewardArr[j] = Integer.parseInt(infoArr[j]);
				}
				probabilityEvent.addProbabilityEvent(rewardArr[3], rewardArr);
			}
			ProRewardInfo pInfo = new ProRewardInfo();
			pInfo.setId(zzmb_503.getId());
			pInfo.setPro(zzmb_503.getGl());
			pInfo.setModel(probabilityEvent);
			map.put(zzmb_503.getId() % 10, pInfo);
		}
	}

}
