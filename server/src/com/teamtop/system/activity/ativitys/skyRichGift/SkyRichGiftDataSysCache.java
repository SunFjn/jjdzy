package com.teamtop.system.activity.ativitys.skyRichGift;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;

import excel.config.Config_tjhl_335;
import excel.struct.Struct_tjhl_335;

public class SkyRichGiftDataSysCache extends AbsServerEvent {

	private static Map<Integer, List<Struct_tjhl_335>> qsMap = new HashMap<>();

	public static Map<Integer, List<Struct_tjhl_335>> getQsMap() {
		return qsMap;
	}

	public static void setQsMap(Map<Integer, List<Struct_tjhl_335>> qsMap) {
		SkyRichGiftDataSysCache.qsMap = qsMap;
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void initExcel() throws RunServerException {
		List<Struct_tjhl_335> sortList = Config_tjhl_335.getIns().getSortList();
		int size = sortList.size();
		for (int i = 0; i < size; i++) {
			Struct_tjhl_335 tjhl_335 = sortList.get(i);
			int qs = tjhl_335.getQishu();
			List<Struct_tjhl_335> list = qsMap.get(qs);
			if (list == null) {
				list = new ArrayList<>();
				qsMap.put(qs, list);
			}
			list.add(tjhl_335);
		}
	}

}
