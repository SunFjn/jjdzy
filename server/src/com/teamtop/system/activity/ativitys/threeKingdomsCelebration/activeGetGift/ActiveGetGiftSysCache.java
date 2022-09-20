package com.teamtop.system.activity.ativitys.threeKingdomsCelebration.activeGetGift;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.excel.ExcelJsonUtils;

import excel.config.Config_sghyyl_261;
import excel.struct.Struct_sghyyl_261;

public class ActiveGetGiftSysCache extends AbsServerEvent {
	/** 掉落奖励概率事件Map key为索引id **/
	private static Map<Integer, Map<Integer, List<ProbabilityEventModel>>> configMap = new HashMap<>();

	public static Map<Integer, Map<Integer, List<ProbabilityEventModel>>> getConfigMap() {
		return configMap;
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void initExcel() throws RunServerException {
		// TODO Auto-generated method stub
		List<Struct_sghyyl_261> sortList = Config_sghyyl_261.getIns().getSortList();
		for(Struct_sghyyl_261 struct_sghyyl_261:sortList) {
			int qs = struct_sghyyl_261.getQs();
			Map<Integer, List<ProbabilityEventModel>> map = configMap.get(qs);
			if(map==null) {
				map=new HashMap<>();
				configMap.put(qs, map);
			}
			List<ProbabilityEventModel> generalDropData = ExcelJsonUtils.getGeneralDropData(struct_sghyyl_261.getBd());
			map.put(struct_sghyyl_261.getSys(), generalDropData);
		}
	}

}
