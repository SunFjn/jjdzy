package com.teamtop.system.starPicture;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;

import excel.config.Config_xingtu_706;
import excel.struct.Struct_xingtu_706;

public class StarPictureCache extends AbsServerEvent {

	private static Map<Integer, List<Struct_xingtu_706>> starPictureTypeMap = new HashMap<>();

	public static Map<Integer, List<Struct_xingtu_706>> getStarPictureTypeMap() {
		return starPictureTypeMap;
	}

	public static void setStarPictureTypeMap(Map<Integer, List<Struct_xingtu_706>> starPictureTypeMap) {
		StarPictureCache.starPictureTypeMap = starPictureTypeMap;
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void initExcel() throws RunServerException {
		List<Struct_xingtu_706> sortList = Config_xingtu_706.getIns().getSortList();
		for (Struct_xingtu_706 xingtu : sortList) {
			int type = xingtu.getId() / 100000;
			List<Struct_xingtu_706> list = starPictureTypeMap.get(type);
			if (list == null) {
				list = new ArrayList<>();
				starPictureTypeMap.put(type, list);
			}
			list.add(xingtu);
		}
	}

}
