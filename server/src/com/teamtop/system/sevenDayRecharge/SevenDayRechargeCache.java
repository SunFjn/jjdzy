package com.teamtop.system.sevenDayRecharge;

import java.util.HashMap;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.cache.union.UC;

import excel.config.Config_drlc1_734;
import excel.struct.Struct_drlc1_734;



public class SevenDayRechargeCache extends AbsServerEvent{
	
	public static SevenDayRechargeCache ins;
	public static  SevenDayRechargeCache getIns() {
		if(ins == null){
			ins = new SevenDayRechargeCache();
		}
		return ins;
	}
	/**
	 * 开服天数-》单日累充id-》单日累充
	 */
	public static HashMap<Integer, HashMap<Integer, Struct_drlc1_734>> sevenDayRechargeHashMap=UC.reg("sevenDayRechargeHashMap", new HashMap<>());

	@Override
	public void startServer() throws RunServerException {
		
		
	}
	
	/**
	 * 启动服务器初始化excel
	 *
	 */
	public void initExcel() throws RunServerException{
		for (Struct_drlc1_734 struct_drlc1_734:Config_drlc1_734.getIns().getSortList()) {
			if(!sevenDayRechargeHashMap.containsKey(struct_drlc1_734.getTs())) {
				sevenDayRechargeHashMap.put(struct_drlc1_734.getTs(), new HashMap<>());
			}
			HashMap<Integer, Struct_drlc1_734> drlc1_734Map = sevenDayRechargeHashMap.get(struct_drlc1_734.getTs());
			if (!drlc1_734Map.containsKey(struct_drlc1_734.getId())) {
				drlc1_734Map.put(struct_drlc1_734.getId(), struct_drlc1_734);
			}
		}
		
	}

}
