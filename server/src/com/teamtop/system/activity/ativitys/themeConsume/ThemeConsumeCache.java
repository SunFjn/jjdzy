package com.teamtop.system.activity.ativitys.themeConsume;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.log.LogTool;

import excel.config.Config_ztxfb_329;
import excel.struct.Struct_ztxfb_329;

public class ThemeConsumeCache extends AbsServerEvent {
	/** 主题消费配置表 <期数，<编号id,主题消费>> **/
	public static Map<Integer, Map<Integer, Struct_ztxfb_329>> themeConsumeConfig = new HashMap<>();
	/**所有主题类型*/
	public static Map<Integer,Set<Integer>> typeSetConfig = new HashMap<Integer, Set<Integer>>();

	@Override
	public void startServer() throws RunServerException {
	}
	
	@Override
	public void initExcel() throws RunServerException{
		try {
			themeConsumeConfig.clear();
			typeSetConfig.clear();
			
			List<Struct_ztxfb_329> sortList = Config_ztxfb_329.getIns().getSortList();
			for(Struct_ztxfb_329 excel : sortList) {
				int qs = excel.getQs();
				Map<Integer, Struct_ztxfb_329> map = themeConsumeConfig.get(qs);
				if(map == null) {
					map = new HashMap<Integer, Struct_ztxfb_329>();
					themeConsumeConfig.put(qs, map);
				}
				map.put(excel.getId(), excel);
				
				Set<Integer> set = typeSetConfig.get(qs);
				if(set == null) {
					set = new HashSet<Integer>();
					typeSetConfig.put(qs, set);
				}
				set.add(excel.getLx());
			}
		}catch (Exception e) {
			LogTool.error(e, this, "ThemeConsumeCache initExcel has wrong");
		}
	}

}
