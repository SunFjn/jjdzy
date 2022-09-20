package com.teamtop.system.houseShopTask;

import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;

import excel.config.Config_fdmb_019;
import excel.struct.Struct_fdmb_019;

public class HouseShopTaskCache extends AbsServerEvent {
	
	
	private static ConcurrentHashMap<Integer,ConcurrentHashMap<Integer, Struct_fdmb_019>> goalInfoByType=new ConcurrentHashMap<Integer,ConcurrentHashMap<Integer, Struct_fdmb_019>>();

	
	
	public static ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, Struct_fdmb_019>> getGoalInfoByType() {
		return goalInfoByType;
	}

	

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub
		
	}
	
	@Override
	public void initExcel() throws RunServerException {
		goalInfoByType.clear();
		List<Struct_fdmb_019> sortList = Config_fdmb_019.getIns().getSortList();
		for (Struct_fdmb_019 fdmb_019: sortList) {
			int type = fdmb_019.getType();
			if (!goalInfoByType.containsKey(type)) {
				goalInfoByType.put(type, new ConcurrentHashMap<Integer, Struct_fdmb_019>());
			}
			goalInfoByType.get(type).put(fdmb_019.getId(), fdmb_019);
		}
		
	}
	
	

}
