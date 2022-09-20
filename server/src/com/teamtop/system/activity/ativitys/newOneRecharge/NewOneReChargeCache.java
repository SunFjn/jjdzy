package com.teamtop.system.activity.ativitys.newOneRecharge;

import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.cache.union.UC;

import excel.config.Config_dbcz2_733;
import excel.struct.Struct_dbcz2_733;


public class NewOneReChargeCache extends AbsServerEvent{

	public static NewOneReChargeCache ins;
	public static  NewOneReChargeCache getIns() {
		if(ins == null){
			ins = new NewOneReChargeCache();
		}
		return ins;
	}
	/**
	 * 星期x-》单笔累充2id-》单笔累充2
	 */
	public static ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, Struct_dbcz2_733>> NewOneReChargeHashMap=UC.reg("NewOneReChargeHashMap", new ConcurrentHashMap<>());
	
	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub
		
	}
	
	@Override
	public void initExcel() throws RunServerException{
		for (Struct_dbcz2_733  dbcz2_733: Config_dbcz2_733.getIns().getSortList()) {
			int qs=dbcz2_733.getXq();
			if (!NewOneReChargeHashMap.containsKey(qs)) {
				NewOneReChargeHashMap.put(qs, new ConcurrentHashMap<Integer, Struct_dbcz2_733>());
			}
			NewOneReChargeHashMap.get(qs).put(dbcz2_733.getXh(), dbcz2_733);
		}
	}


}
