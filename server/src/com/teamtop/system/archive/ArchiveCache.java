package com.teamtop.system.archive;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;

import excel.config.Config_picstar_005;
import excel.config.Config_picteam_005;
import excel.struct.Struct_picstar_005;
import excel.struct.Struct_picteam_005;

public class ArchiveCache extends AbsServerEvent {

	private static Map<Integer, List<Struct_picstar_005>> archiveStarMap = new HashMap<>();

	private static Map<Integer, List<Struct_picteam_005>> typeSuitMap = new HashMap<>();

	public static Map<Integer, List<Struct_picstar_005>> getArchiveStarMap() {
		return archiveStarMap;
	}

	public static Map<Integer, List<Struct_picteam_005>> getTypeSuitMap() {
		return typeSuitMap;
	}

	@Override
	public void initExcel() throws RunServerException {
		List<Struct_picstar_005> sortList = Config_picstar_005.getIns().getSortList();
		for (Struct_picstar_005 picstar : sortList) {
			List<Struct_picstar_005> list = archiveStarMap.get(picstar.getId());
			if (list == null) {
				list = new ArrayList<>();
				archiveStarMap.put(picstar.getId(), list);
			}
			list.add(picstar);
		}
		List<Struct_picteam_005> teamList = Config_picteam_005.getIns().getSortList();
		for (Struct_picteam_005 picteam : teamList) {
			List<Struct_picteam_005> list = typeSuitMap.get(picteam.getType());
			if (list == null) {
				list = new ArrayList<>();
				typeSuitMap.put(picteam.getType(), list);
			}
			list.add(picteam);
		}
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub

	}

}
