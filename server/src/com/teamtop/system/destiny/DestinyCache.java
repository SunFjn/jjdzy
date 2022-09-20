package com.teamtop.system.destiny;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.excel.ExcelJsonUtils;

import excel.config.Config_bztjd_261;
import excel.config.Config_bztluck_261;
import excel.struct.Struct_bztjd_261;
import excel.struct.Struct_bztluck_261;
/**
 * 
 * @author jjjjyyy
 *
 */
public class DestinyCache extends AbsServerEvent{
	/**
	 * 符文鉴定  1铜币鉴定/2元宝鉴定——》普通掉落
	 */
	private static Map<Integer, List<ProbabilityEventModel>> DestinyDropMap = new ConcurrentHashMap<Integer, List<ProbabilityEventModel>>();

	private static Map<Integer, List<ProbabilityEventModel>> DestinyDropHightMap = new ConcurrentHashMap<Integer, List<ProbabilityEventModel>>();
	
	private static Map<Integer, List<ProbabilityEventModel>> DestinyLuckMap=new ConcurrentHashMap<Integer, List<ProbabilityEventModel>>();
	
	public static Map<Integer, List<ProbabilityEventModel>> getDestinyDropMap() {
		return DestinyDropMap;
	}

	public static void setDestinyDropMap(Map<Integer, List<ProbabilityEventModel>> destinyDropMap) {
		DestinyDropMap = destinyDropMap;
	}
	
	public static Map<Integer, List<ProbabilityEventModel>> getDestinyDropHightMap() {
		return DestinyDropHightMap;
	}

	public static void setDestinyDropHightMap(Map<Integer, List<ProbabilityEventModel>> destinyDropHightMap) {
		DestinyDropHightMap = destinyDropHightMap;
	}

	public static Map<Integer, List<ProbabilityEventModel>> getDestinyLuckMap() {
		return DestinyLuckMap;
	}

	public static void setDestinyLuckMap(Map<Integer, List<ProbabilityEventModel>> destinyLuckMap) {
		DestinyLuckMap = destinyLuckMap;
	}

	@Override
	public void startServer() throws RunServerException {
		
	}
	@Override
	public void initExcel() throws RunServerException{
		initDestinyDrop();
	}
	
	/**
	 * 
	 */
	public static void initDestinyDrop(){
		List<Struct_bztjd_261> rewardList = Config_bztjd_261.getIns().getSortList();
		for (Struct_bztjd_261 rward: rewardList) {
			List<ProbabilityEventModel> Data = ExcelJsonUtils.getGeneralDropData(rward.getReward());
			DestinyDropMap.put(rward.getId(),Data);
			if (rward.getReward1()!=null&&!rward.getReward1().equals("0")&&rward.getId()!=1) {
				List<ProbabilityEventModel> Data1 = ExcelJsonUtils.getGeneralDropData(rward.getReward1());
				DestinyDropHightMap.put(rward.getId(),Data1);
			}
		}
		for (Struct_bztluck_261 bztluck_261:Config_bztluck_261.getIns().getSortList()) {
			List<ProbabilityEventModel> Data = ExcelJsonUtils.getGeneralDropData(bztluck_261.getJiangli());
			DestinyLuckMap.put(bztluck_261.getId(), Data);
		}
		
	}
	
}
