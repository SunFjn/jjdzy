package com.teamtop.system.activity.ativitys.newDayRecharge;

import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.cache.union.UC;

import excel.config.Config_drlc2_734;
import excel.struct.Struct_drlc2_734;



public class NewDayRechargeCache extends AbsServerEvent{

	
	public static NewDayRechargeCache ins;
	public static  NewDayRechargeCache getIns() {
		if(ins == null){
			ins = new NewDayRechargeCache();
		}
		return ins;
	}
	/**
	 * 星期x-》单日累充2id-》单日累充2
	 */
	public static ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, Struct_drlc2_734>> NewDayRechargeHashMap=UC.reg("NewDayRechargeHashMap", new ConcurrentHashMap<>());
	
	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub
		
	}
	
	@Override
	public void initExcel() throws RunServerException{
		for (Struct_drlc2_734  drlc2_734: Config_drlc2_734.getIns().getSortList()) {
			int qs=drlc2_734.getXq();
			if (!NewDayRechargeHashMap.containsKey(qs)) {
				NewDayRechargeHashMap.put(qs, new ConcurrentHashMap<Integer, Struct_drlc2_734>());
			}
			NewDayRechargeHashMap.get(qs).put(drlc2_734.getId(), drlc2_734);
		}
	}

}
