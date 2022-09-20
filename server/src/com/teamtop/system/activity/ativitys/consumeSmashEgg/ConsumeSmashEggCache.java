package com.teamtop.system.activity.ativitys.consumeSmashEgg;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.excel.ExcelJsonUtils;
import com.teamtop.util.log.LogTool;

import excel.config.Config_xhdxfzdcjjdb_320;
import excel.config.Config_xhdxfzdxfb_320;
import excel.struct.Struct_xhdxfzdcjjdb_320;
import excel.struct.Struct_xhdxfzdxfb_320;

public class ConsumeSmashEggCache extends AbsServerEvent {
	/** 消费砸蛋配置表 <期数，<次数,消费砸蛋>> **/
	public static Map<Integer, Map<Integer, Struct_xhdxfzdxfb_320>> ptEggConfig = new HashMap<>();
	/** 超级金蛋配置表 <期数，<次数,超级金蛋>> **/
	public static Map<Integer, Map<Integer, Struct_xhdxfzdcjjdb_320>> cjEggConfig = new HashMap<>();
	
	/** 普通奖励概率事件<期数，<次数, 概率事件>> **/
	public static Map<Integer, Map<Integer,ProbabilityEventModel>> ptAwardMap = new HashMap<>();
	/** 高级奖励概率事件<期数，<次数, 概率事件>> **/
	public static Map<Integer, Map<Integer,ProbabilityEventModel>> cjAwardMap = new HashMap<>();

	@Override
	public void startServer() throws RunServerException {
	}
	
	@Override
	public void initExcel() throws RunServerException{
		try {
			ptEggConfig.clear();
			cjEggConfig.clear();
			ptAwardMap.clear();
			cjAwardMap.clear();
			
			List<Struct_xhdxfzdxfb_320> sortList = Config_xhdxfzdxfb_320.getIns().getSortList();
			for(Struct_xhdxfzdxfb_320 excel : sortList) {
				int qs = excel.getQs();
				Map<Integer, Struct_xhdxfzdxfb_320> map = ptEggConfig.get(qs);
				if(map == null) {
					map = new HashMap<Integer, Struct_xhdxfzdxfb_320>();
					ptEggConfig.put(qs, map);
				}
				map.put(excel.getCs(), excel);
				
				Map<Integer, ProbabilityEventModel> ptAward = ptAwardMap.get(qs);
				if(ptAward == null) {
					ptAward = new HashMap<Integer,ProbabilityEventModel>();
					ptAwardMap.put(qs, ptAward);
				}
				ProbabilityEventModel pm = ExcelJsonUtils.getGeneralDropData(excel.getJl()).get(0);
				ptAward.put(excel.getCs(), pm);
			}
			
			List<Struct_xhdxfzdcjjdb_320> cjSortList = Config_xhdxfzdcjjdb_320.getIns().getSortList();
			for(Struct_xhdxfzdcjjdb_320 excel : cjSortList) {
				int qs = excel.getQs();
				Map<Integer, Struct_xhdxfzdcjjdb_320> map = cjEggConfig.get(qs);
				if(map == null) {
					map = new HashMap<Integer, Struct_xhdxfzdcjjdb_320>();
					cjEggConfig.put(qs, map);
				}
				map.put(excel.getCs(), excel);
				
				Map<Integer, ProbabilityEventModel> ptAward = cjAwardMap.get(qs);
				if(ptAward == null) {
					ptAward = new HashMap<Integer,ProbabilityEventModel>();
					cjAwardMap.put(qs, ptAward);
				}
				ProbabilityEventModel pm = ExcelJsonUtils.getGeneralDropData(excel.getJl()).get(0);
				ptAward.put(excel.getCs(), pm);
			}
		}catch (Exception e) {
			LogTool.error(e, this, "ConsumeSmashEggCache initExcel has wrong");
		}
	}

}
