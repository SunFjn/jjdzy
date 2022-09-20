package com.teamtop.system.sevenOneRecharge;

import java.util.HashMap;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.cache.union.UC;

import excel.config.Config_dbcz1_733;
import excel.struct.Struct_dbcz1_733;
/**
 * 单笔充值
 * @author jjjjyyy
 *
 */
public class SevenOneRechargeCache extends AbsServerEvent{

	public static SevenOneRechargeCache ins;
	public static  SevenOneRechargeCache getIns() {
		if(ins == null){
			ins = new SevenOneRechargeCache();
		}
		return ins;
	}
	
	/**
	 * 开服天数-》单笔充值id-》单笔充值
	 */
	public static HashMap<Integer, HashMap<Integer, Struct_dbcz1_733>> sevenOneRechargeHashMap=UC.reg("sevenOneRechargeHashMap", new HashMap<>());

	@Override
	public void startServer() throws RunServerException {
		
	}
	
	@Override
	public void initExcel() throws RunServerException {
		for (Struct_dbcz1_733 struct_dbcz1_733:Config_dbcz1_733.getIns().getSortList()) {
			if(!sevenOneRechargeHashMap.containsKey(struct_dbcz1_733.getTs())) {
				sevenOneRechargeHashMap.put(struct_dbcz1_733.getTs(), new HashMap<>());
			}
			HashMap<Integer, Struct_dbcz1_733> dbcz1_733Map = sevenOneRechargeHashMap.get(struct_dbcz1_733.getTs());
			if (!dbcz1_733Map.containsKey(struct_dbcz1_733.getXh())) {
				dbcz1_733Map.put(struct_dbcz1_733.getXh(), struct_dbcz1_733);
			}
		}
	}

}
