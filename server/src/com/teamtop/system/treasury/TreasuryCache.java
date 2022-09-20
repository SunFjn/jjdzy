package com.teamtop.system.treasury;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;

import excel.config.Config_bk_236;
import excel.config.Config_bkitem_236;
import excel.struct.Struct_bk_236;
import excel.struct.Struct_bkitem_236;

public class TreasuryCache extends AbsServerEvent {
	/**
	 * 配置数据 key为tid
	 */
	private static Map<Integer, List<Struct_bkitem_236>> configMap = new HashMap<Integer, List<Struct_bkitem_236>>();

	public static Map<Integer, List<Struct_bkitem_236>> getConfigMap() {
		return configMap;
	}

	@Override
	public void startServer() throws RunServerException {
	}

	@Override
	public void initExcel() throws RunServerException {
		List<Struct_bk_236> sortList = Config_bk_236.getIns().getSortList();
		for (Struct_bk_236 struct_bk_236 : sortList) {
			ArrayList<Struct_bkitem_236> bkitemList = new ArrayList<Struct_bkitem_236>();
			configMap.put(struct_bk_236.getId(), bkitemList);

		}
		List<Struct_bkitem_236> sortList2 = Config_bkitem_236.getIns().getSortList();
		for (Struct_bkitem_236 struct_bkitem_236 : sortList2) {
			int bkId = struct_bkitem_236.getBk();
			List<Struct_bkitem_236> list = configMap.get(bkId);
			if (list != null) {
				list.add(struct_bkitem_236);
			}
		}
	}

}
