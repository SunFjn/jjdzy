package com.teamtop.system.activity.ativitys.totalRebate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.log.LogTool;

import excel.config.Config_ljfl_772;
import excel.struct.Struct_ljfl_772;

public class TotalRebateCache extends AbsServerEvent {
	/** 充值id_累计返利配置表 <期数，<充值id,累计返利>> **/
	public static Map<Integer, Map<Integer, Struct_ljfl_772>> rechargeRebateConfig = new HashMap<>();
	/** 道具id_累计返利配置表 <期数，<道具id,累计返利>> **/
	public static Map<Integer, Map<Integer, Struct_ljfl_772>> itemRebateConfig = new HashMap<>();

	@Override
	public void startServer() throws RunServerException {
	}
	
	@Override
	public void initExcel() throws RunServerException{
		try {
			rechargeRebateConfig.clear();
			itemRebateConfig.clear();
			List<Struct_ljfl_772> list = Config_ljfl_772.getIns().getSortList();
			for(Struct_ljfl_772 struct_ljfl_772 : list) {
				int qs = struct_ljfl_772.getQs();
				Map<Integer, Struct_ljfl_772> rrMap = rechargeRebateConfig.get(qs);
				if(rrMap == null) {
					rrMap = new HashMap<Integer, Struct_ljfl_772>();
					rechargeRebateConfig.put(qs, rrMap);
				}
				int id = struct_ljfl_772.getId();
				rrMap.put(id, struct_ljfl_772);
				
				Map<Integer, Struct_ljfl_772> irMap = itemRebateConfig.get(qs);
				if(irMap == null) {
					irMap = new HashMap<Integer, Struct_ljfl_772>();
					itemRebateConfig.put(qs, irMap);
				}
				int dj = struct_ljfl_772.getDj();
				irMap.put(dj, struct_ljfl_772);
			}
		}catch (Exception e) {
			LogTool.error(e, this, "TotalRebateCache initExcel has wrong");
		}
	}

}
