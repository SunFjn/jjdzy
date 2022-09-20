package com.teamtop.system.activity.ativitys.onedayRecharge;

import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;

import excel.config.Config_drleichong_727;
import excel.struct.Struct_drleichong_727;

public class OnedayRechargeCache extends AbsServerEvent{

	public static OnedayRechargeCache ins;
	public static  OnedayRechargeCache getIns() {
		if(ins == null){
			ins = new OnedayRechargeCache();
		}
		return ins;
	}
	public static ConcurrentHashMap<Integer, ConcurrentHashMap<Integer,Struct_drleichong_727>>  OnedayRechargeMap=new ConcurrentHashMap<Integer, ConcurrentHashMap<Integer,Struct_drleichong_727>>(); 
	
	public static ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, Struct_drleichong_727>> getOnedayRechargeMap() {
		return OnedayRechargeMap;
	}
	public static void setOnedayRechargeMap(
			ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, Struct_drleichong_727>> onedayRechargeMap) {
		OnedayRechargeMap = onedayRechargeMap;
	}
	
	
	@Override
	public void startServer() throws RunServerException {
		
		
	}
	@Override
	public void initExcel() throws RunServerException{
		for (Struct_drleichong_727  drleichong_727: Config_drleichong_727.getIns().getSortList()) {
			int qs=drleichong_727.getQs();
			if (!OnedayRechargeCache.OnedayRechargeMap.containsKey(qs)) {
				OnedayRechargeCache.OnedayRechargeMap.put(qs, new ConcurrentHashMap<Integer, Struct_drleichong_727>());
			}
			OnedayRechargeCache.OnedayRechargeMap.get(qs).put(drleichong_727.getId(), drleichong_727);
		}
	}

}
