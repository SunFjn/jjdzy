package com.teamtop.system.zhuJiangYanWu;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventFactory;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.cache.union.UC;
import com.teamtop.util.excel.ExcelJsonUtils;

import excel.config.Config_zjywdl_005;
import excel.config.Config_zjywwj_005;
import excel.struct.Struct_zjywdl_005;
import excel.struct.Struct_zjywwj_005;

public class ZhuJiangYanWuCache extends AbsServerEvent{
	private static ZhuJiangYanWuCache ins = null;

	public static  ZhuJiangYanWuCache getIns() {
		if (ins == null) {
			ins = new ZhuJiangYanWuCache();
		}
		return ins;
	}
	
	/**	 * 本期武将列表   key:index  value:武将ID	 */
	private static Map<Integer, Integer> indexZhuJiangYanWuMap = UC.reg("indexZhuJiangYanWuMap", new HashMap<>());	/** 普通抽奖奖励    key:期数    value：奖励列表 **/
	/**	 * 位置对应的概率事件	 */
	private static Map<Integer, ProbabilityEventModel> zhuJiangYanWuProMap = new HashMap<>();
	/**	 * 物件掉落的概率事件	 */
	private static Map<Integer, List<ProbabilityEventModel>> zhuJiangYanWuAwardsProMap = new HashMap<>();
	
	@Override
	public void startServer() throws RunServerException {
	}

	
	public void shutdownServer() {

	}


	@Override
	public void initExcel() throws RunServerException {
		zhuJiangYanWuProMap.clear();
		List<Struct_zjywwj_005> excelList = Config_zjywwj_005.getIns().getSortList();
		for (Struct_zjywwj_005 excel : excelList) {
			int indexExcel = excel.getId();
			ProbabilityEventModel pe = ProbabilityEventFactory.getProbabilityEvent();
			
			int[][] wjExcel = excel.getWj();
			for( int[] temp:wjExcel) {
				int idWJ = temp[0];
				int pro = temp[1];
				pe.addProbabilityEvent(pro, idWJ);
			}
			zhuJiangYanWuProMap.put( indexExcel, pe);
		}
		
		zhuJiangYanWuAwardsProMap.clear();
		List<Struct_zjywdl_005> sortList = Config_zjywdl_005.getIns().getSortList();
		for(Struct_zjywdl_005 temp: sortList) {
			int id = temp.getMxid();
			String awsrdsStr = temp.getBd();
			List<ProbabilityEventModel> dropData = ExcelJsonUtils.getGeneralDropData( awsrdsStr);
			zhuJiangYanWuAwardsProMap.put( id, dropData);
		}

		ZhuJiangYanWuManager.getIns().initWJ();
	}

	public static Map<Integer, Integer> getIndexZhuJiangYanWuMap() {
		return indexZhuJiangYanWuMap;
	}
	public static void setIndexZhuJiangYanWuMap(Map<Integer, Integer> indexZhuJiangYanWuMap) {
		ZhuJiangYanWuCache.indexZhuJiangYanWuMap = indexZhuJiangYanWuMap;
	}
	public static Map<Integer, ProbabilityEventModel> getZhuJiangYanWuProMap() {
		return zhuJiangYanWuProMap;
	}
	public static void setZhuJiangYanWuProMap(Map<Integer, ProbabilityEventModel> zhuJiangYanWuProMap) {
		ZhuJiangYanWuCache.zhuJiangYanWuProMap = zhuJiangYanWuProMap;
	}
	public static Map<Integer, List<ProbabilityEventModel>> getZhuJiangYanWuAwardsProMap() {
		return zhuJiangYanWuAwardsProMap;
	}
	public static void setZhuJiangYanWuAwardsProMap(Map<Integer, List<ProbabilityEventModel>> zhuJiangYanWuAwardsProMap) {
		ZhuJiangYanWuCache.zhuJiangYanWuAwardsProMap = zhuJiangYanWuAwardsProMap;
	}
}
