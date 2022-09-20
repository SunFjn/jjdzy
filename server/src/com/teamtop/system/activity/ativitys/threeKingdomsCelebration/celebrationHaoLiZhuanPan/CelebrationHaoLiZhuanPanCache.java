package com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationHaoLiZhuanPan;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.activity.ativitys.threeKingdomsCelebration.celebrationHaoLiZhuanPan.model.CelebrationHaoLiZhuanPanRecord;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.excel.ExcelJsonUtils;

import excel.config.Config_sghlzp_261;
import excel.config.Config_sghlzprank_261;
import excel.config.Config_sgzpmb_261;
import excel.struct.Struct_sghlzp_261;
import excel.struct.Struct_sghlzprank_261;
import excel.struct.Struct_sgzpmb_261;


public class CelebrationHaoLiZhuanPanCache extends AbsServerEvent{

	public static CelebrationHaoLiZhuanPanCache ins;
	public static CelebrationHaoLiZhuanPanCache getIns() {
		if(ins == null){
			ins = new CelebrationHaoLiZhuanPanCache();
		}
		return ins;
	}
	
	/** 普通抽奖奖励    key:期数    value：奖励列表 **/
	private static Map<Integer, List<ProbabilityEventModel>> puTongAwardMap = new HashMap<>();
	/** 排行榜奖励    key1:期数    key2：名次  value：奖励列表 **/
	private static Map<Integer, Map<Integer, int[][]>> rankAwardsMap = new HashMap<>();
	/** 三国庆典-豪礼转盘目标表List  key:期数 **/
	private static Map<Integer, List<Struct_sgzpmb_261>> targetAwardConfigListMap = new HashMap<>();

	/** * 抽奖记录 */
	private static List<CelebrationHaoLiZhuanPanRecord> recordList = new LinkedList<>();
	
	private static Object[] recordArray;

	public static void setRecordArray(Object[] recordArray) {
		CelebrationHaoLiZhuanPanCache.recordArray = recordArray;
	}

	public static Object[] getRecordArray() {
		return recordArray;
	}

	public static List<CelebrationHaoLiZhuanPanRecord> getRecordList() {
		return recordList;
	}

	public static Map<Integer, List<ProbabilityEventModel>> getPuTongAwardMap() {
		return puTongAwardMap;
	}

	public static Map<Integer, Map<Integer, int[][]>> getRankAwardsMap() {
		return rankAwardsMap;
	}

	public static Map<Integer, List<Struct_sgzpmb_261>> getTargetAwardConfigListMap() {
		return targetAwardConfigListMap;
	}

	@Override
	public void startServer() throws RunServerException {
	}

	@Override
	public void initExcel() throws RunServerException {
		List<Struct_sghlzp_261> sortList = Config_sghlzp_261.getIns().getSortList();
		for(Struct_sghlzp_261 excel:sortList) {
			puTongAwardMap.put(excel.getQs(), ExcelJsonUtils.getGeneralDropData(excel.getReward()));
		}
		
		List<Struct_sghlzprank_261> sortList2 = Config_sghlzprank_261.getIns().getSortList();
		for(Struct_sghlzprank_261 excel:sortList2) {
			int qs = excel.getQs();
			Map<Integer, int[][]> map = rankAwardsMap.get(qs);
			if(map==null) {
				map = new HashMap<>();
				rankAwardsMap.put(qs, map);
			}
			int[][] rank = excel.getRank();
			for( int i=rank[0][0]; i<=rank[0][1]; i++ ) {
				map.put( i, excel.getReward());
			}
		}
		
		List<Struct_sgzpmb_261> sortList3 = Config_sgzpmb_261.getIns().getSortList();
		for(Struct_sgzpmb_261 struct_sgzpmb_261: sortList3) {
			int qs = struct_sgzpmb_261.getQs();
			List<Struct_sgzpmb_261> list = targetAwardConfigListMap.get(qs);
			if(list==null) {
				list=new ArrayList<>();
				targetAwardConfigListMap.put(qs, list);
			}
			list.add(struct_sgzpmb_261);
		}
	}

}
