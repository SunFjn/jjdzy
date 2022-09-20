package com.teamtop.system.title;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;

import excel.config.Config_chenghao_702;
import excel.struct.Struct_chenghao_702;

public class TitleCache extends AbsServerEvent {

	private static Map<Integer, List<Struct_chenghao_702>> titleActivateTypeMap = new HashMap<>();

	public static Map<Integer, List<Struct_chenghao_702>> getTitleActivateTypeMap() {
		return titleActivateTypeMap;
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void initExcel() throws RunServerException {
		titleActivateTypeMap.clear();
		List<Struct_chenghao_702> sortList = Config_chenghao_702.getIns().getSortList();
		for (Struct_chenghao_702 title : sortList) {
			int[][] condtion = title.getCondtion();
			int type = condtion[0][0];
			List<Struct_chenghao_702> list = titleActivateTypeMap.get(type);
			if (list == null) {
				list = new ArrayList<>();
				titleActivateTypeMap.put(type, list);
			}
			list.add(title);
		}
	}

}
