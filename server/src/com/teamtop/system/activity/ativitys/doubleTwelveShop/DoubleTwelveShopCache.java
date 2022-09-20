package com.teamtop.system.activity.ativitys.doubleTwelveShop;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.cache.union.UC;

import excel.config.Config_s12sc_771;
import excel.config.Config_s12yh_771;
import excel.struct.Struct_s12sc_771;
import excel.struct.Struct_s12yh_771;

public class DoubleTwelveShopCache extends AbsServerEvent {

	private static Map<Integer, List<Struct_s12yh_771>> qsJianMianMap = UC.reg("DoubleTwelveShopQsJianMianMap",
			new HashMap<>());

	private static Map<Integer, Map<Integer, Struct_s12sc_771>> qsItemMap = UC.reg("DoubleTwelveShopQsItemMap",
			new HashMap<>());

	public static List<Struct_s12yh_771> getQsJianMianList(int qs) {
		return qsJianMianMap.get(qs);
	}

	public static Map<Integer, Struct_s12sc_771> getQsItemMap(int qs) {
		return qsItemMap.get(qs);
	}

	@Override
	public void startServer() throws RunServerException {
	}

	@Override
	public void initExcel() throws RunServerException {
		qsJianMianMap.clear();
		qsItemMap.clear();
		for (Struct_s12sc_771 config : Config_s12sc_771.getIns().getSortList()) {
			if (!qsItemMap.containsKey(config.getQs())) {
				qsItemMap.put(config.getQs(), new HashMap<>());
			}
			qsItemMap.get(config.getQs()).put(config.getId(), config);
		}

		for (Struct_s12yh_771 config : Config_s12yh_771.getIns().getSortList()) {
			if (!qsJianMianMap.containsKey(config.getQs())) {
				qsJianMianMap.put(config.getQs(), new ArrayList<>());
			}
			qsJianMianMap.get(config.getQs()).add(config);
		}

	}

}
