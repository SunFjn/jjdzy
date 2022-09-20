package com.teamtop.system.specialTreasure;

import java.util.HashMap;
import java.util.List;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.cache.union.UC;

import excel.config.Config_ybreward_217;
import excel.struct.Struct_ybreward_217;


public class SpecialTreasureCache extends AbsServerEvent{
	
	private static SpecialTreasureCache ins;
	public static SpecialTreasureCache getIns(){
		if(ins == null) {
			ins = new SpecialTreasureCache();
		}
		return ins;
	}
	/**
	 * 异宝id-> 异宝star-> ybreward_217
	 */
	private static HashMap<Integer,HashMap<Integer, Struct_ybreward_217>> ybrewardMap = UC.reg("ybreward", new HashMap<Integer,HashMap<Integer, Struct_ybreward_217>>());
	
	
	public static HashMap<Integer, HashMap<Integer, Struct_ybreward_217>> getYbrewardMap() {
		return ybrewardMap;
	}
	
	@Override
	public void startServer() throws RunServerException {
		
		
	}
	
	@Override
	public void initExcel() throws RunServerException{
		List<Struct_ybreward_217> sortList = Config_ybreward_217.getIns().getSortList();
		for (Struct_ybreward_217 ybreward_217:sortList) {
			if(getYbrewardMap().containsKey(ybreward_217.getId())) {
				getYbrewardMap().get(ybreward_217.getId()).put(ybreward_217.getStar(), ybreward_217);
			}else {
				getYbrewardMap().put(ybreward_217.getId(), new HashMap<Integer, Struct_ybreward_217>());
				getYbrewardMap().get(ybreward_217.getId()).put(ybreward_217.getStar(), ybreward_217);
			}
		}
	}

}
