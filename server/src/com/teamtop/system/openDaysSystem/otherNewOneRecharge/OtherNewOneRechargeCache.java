package com.teamtop.system.openDaysSystem.otherNewOneRecharge;

import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.cache.union.UC;

import excel.config.Config_dbcz3_733;
import excel.struct.Struct_dbcz3_733;


public class OtherNewOneRechargeCache extends AbsServerEvent{

	public static OtherNewOneRechargeCache ins;
	public static  OtherNewOneRechargeCache getIns() {
		if(ins == null){
			ins = new OtherNewOneRechargeCache();
		}
		return ins;
	}
	/**
	 * 星期x-》单笔累充2id-》单笔累充2
	 */
	public static ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, Struct_dbcz3_733>> NewOneReChargeHashMap = UC
			.reg("otherNewOneReChargeHashMap", new ConcurrentHashMap<>());
	
	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub
		
	}
	
	@Override
	public void initExcel() throws RunServerException{
		NewOneReChargeHashMap.clear();
		for (Struct_dbcz3_733 dbcz3_733 : Config_dbcz3_733.getIns().getSortList()) {
			int ts = dbcz3_733.getTs();
			if (!NewOneReChargeHashMap.containsKey(ts)) {
				NewOneReChargeHashMap.put(ts, new ConcurrentHashMap<Integer, Struct_dbcz3_733>());
			}
			NewOneReChargeHashMap.get(ts).put(dbcz3_733.getXh(), dbcz3_733);
		}
	}


}
