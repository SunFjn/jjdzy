package com.teamtop.system.activity.ativitys.hyperPointGeneral;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventFactory;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.cache.union.UC;

import excel.config.Config_cjdj1_010;
import excel.struct.Struct_cjdj1_010;

public class HyperPointGeneralCache extends AbsServerEvent {

	/**
	 * key：期数
	 */
	private static Map<Integer, Config> configMap = UC.reg("HPGConfigMap", new HashMap<>());

	public static Map<Integer, Config> getConfigMap() {
		return configMap;
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void initExcel() throws RunServerException {
		// TODO Auto-generated method stub
		configMap.clear();
		List<Struct_cjdj1_010> sortList = Config_cjdj1_010.getIns().getSortList();
		for (Struct_cjdj1_010 struct_cjdj1_010 : sortList) {
			Config config = configMap.get(struct_cjdj1_010.getQishu());
			if (config == null) {
				config = new Config();
				configMap.put(struct_cjdj1_010.getQishu(), config);
			}
//			int[][] awardPros = struct_cjdj1_010.getReward();
//			ProbabilityEventModel pm = ProbabilityEventFactory.getProbabilityEvent();
//			for (int[] awardPro : awardPros) {
//				int[] award = new int[3];
//				award[0] = awardPro[0];
//				award[1] = awardPro[1];
//				award[2] = awardPro[2];
//				pm.addProbabilityEvent(awardPro[3], new int[][] { award });
//			}
//			config.getPmList().add(pm);
			config.getConfigList().add(struct_cjdj1_010);
		}
	}

}
