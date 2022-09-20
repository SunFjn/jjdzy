package com.teamtop.system.openDaysSystem.bagGoodIdea;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;

import excel.config.Config_jnmj_327;
import excel.struct.Struct_jnmj_327;

public class BagGoodIdeaSysCache extends AbsServerEvent {
	/** 配置map key:期数,value:配置表List */
	private static Map<Integer, List<Struct_jnmj_327>> configListMap = new HashMap<>();

	public static Map<Integer, List<Struct_jnmj_327>> getConfigListMap() {
		return configListMap;
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void initExcel() throws RunServerException {
		// TODO Auto-generated method stub
		configListMap.clear();
		List<Struct_jnmj_327> sortList = Config_jnmj_327.getIns().getSortList();
		for (Struct_jnmj_327 struct_jnmj_327 : sortList) {
			int qs = struct_jnmj_327.getQs();
			List<Struct_jnmj_327> list = configListMap.get(qs);
			if (list == null) {
				list = new ArrayList<>();
				configListMap.put(qs, list);
			}
			list.add(struct_jnmj_327);
		}
	}

}
