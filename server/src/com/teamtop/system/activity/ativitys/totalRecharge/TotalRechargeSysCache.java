package com.teamtop.system.activity.ativitys.totalRecharge;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.cache.union.UC;

import excel.config.Config_leichong1_725;
import excel.struct.Struct_leichong1_725;

public class TotalRechargeSysCache extends AbsServerEvent {
	/** 配置表配置 */
	private static Map<Integer, Config> configMap = UC.reg("TotalRechargeConfigMap", new HashMap<>());

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
		List<Struct_leichong1_725> sortList = Config_leichong1_725.getIns().getSortList();
		for (Struct_leichong1_725 struct_leichong1_725 : sortList) {
			Config config = configMap.get(struct_leichong1_725.getQishu());
			if (config == null) {
				config = new Config();
				configMap.put(struct_leichong1_725.getQishu(), config);
			}
			config.getConfigList().add(struct_leichong1_725);
			config.getConfigMap().put(struct_leichong1_725.getId(), struct_leichong1_725);
		}
	}

}
