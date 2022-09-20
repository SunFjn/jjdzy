package com.teamtop.system.openDaysSystem.otherNewDayRecharge;

import java.util.HashMap;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.cache.union.UC;

import excel.config.Config_drlc3_734;
import excel.struct.Struct_drlc3_734;



public class OtherNewDayRechargeCache extends AbsServerEvent{
	
	public static OtherNewDayRechargeCache ins;
	public static  OtherNewDayRechargeCache getIns() {
		if(ins == null){
			ins = new OtherNewDayRechargeCache();
		}
		return ins;
	}
	/**
	 * 开服天数-》单日累充id-》单日累充
	 */
	public static HashMap<Integer, HashMap<Integer, Struct_drlc3_734>> newDayRechargeHashMap = UC
			.reg("otherNewDayRechargeHashMap", new HashMap<>());

	@Override
	public void startServer() throws RunServerException {
		
		
	}
	
	/**
	 * 启动服务器初始化excel
	 *
	 */
	public void initExcel() throws RunServerException{
		newDayRechargeHashMap.clear();
		for (Struct_drlc3_734 struct_drlc3_734 : Config_drlc3_734.getIns().getSortList()) {
			if (!newDayRechargeHashMap.containsKey(struct_drlc3_734.getTs())) {
				newDayRechargeHashMap.put(struct_drlc3_734.getTs(), new HashMap<>());
			}
			HashMap<Integer, Struct_drlc3_734> drlc3_734Map = newDayRechargeHashMap.get(struct_drlc3_734.getTs());
			if (!drlc3_734Map.containsKey(struct_drlc3_734.getId())) {
				drlc3_734Map.put(struct_drlc3_734.getId(), struct_drlc3_734);
			}
		}
		
	}

}
