package com.teamtop.system.activity.ativitys.rollDice;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.log.LogTool;

import excel.config.Config_xfyt_763;
import excel.struct.Struct_xfyt_763;

public class RollDiceCache extends AbsServerEvent {
	/** 摇骰子配置表 <期数，<格子id,摇骰子>> **/
	public static Map<Integer, Map<Integer, Struct_xfyt_763>> rollDiceConfig = new HashMap<>();
	/** 摇骰子配置表 <期数，摇骰子> **/
	public static Map<Integer, List<Struct_xfyt_763>> rollDiceListConfig = new HashMap<>();
	

	@Override
	public void startServer() throws RunServerException {
	}
	
	@Override
	public void initExcel() throws RunServerException{
		try {
			rollDiceConfig.clear();
			rollDiceListConfig.clear();
			
			List<Struct_xfyt_763> sortList = Config_xfyt_763.getIns().getSortList();
			for(Struct_xfyt_763 excel : sortList) {
				int qs = excel.getQs();
				Map<Integer, Struct_xfyt_763> map = rollDiceConfig.get(qs);
				if(map == null) {
					map = new HashMap<Integer, Struct_xfyt_763>();
					rollDiceConfig.put(qs, map);
				}
				map.put(excel.getId(), excel);
				
				List<Struct_xfyt_763> list = rollDiceListConfig.get(qs);
				if(list == null) {
					list = new ArrayList<Struct_xfyt_763>();
					rollDiceListConfig.put(qs, list);
				}
				list.add(excel);
			}
		}catch (Exception e) {
			LogTool.error(e, this, "RollDiceCache initExcel has wrong");
		}
	}

}
