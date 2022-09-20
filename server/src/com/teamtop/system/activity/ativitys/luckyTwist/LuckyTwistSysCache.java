package com.teamtop.system.activity.ativitys.luckyTwist;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.util.ProbabilityEvent.ProbabilityEventModel;
import com.teamtop.util.excel.ExcelJsonUtils;

import excel.config.Config_luckegg_295;
import excel.config.Config_luckeggtime_295;
import excel.struct.Struct_luckegg_295;
import excel.struct.Struct_luckeggtime_295;

public class LuckyTwistSysCache extends AbsServerEvent {
	/** 奖励概率事件Map key为id **/
	private static Map<Integer, Map<Integer, List<ProbabilityEventModel>>> awardMap = new HashMap<>();
	/** 最大抽奖次数 **/
	private static int maxNum;
	/** key次数 **/
	private static Map<Integer, Struct_luckeggtime_295> countConfigMap = new HashMap<>();
	
	@Override
	public void startServer() throws RunServerException {

	}
	

	@Override
	public void initExcel() throws RunServerException {
		awardMap.clear();
		countConfigMap.clear();
		maxNum = 0;
		for (Struct_luckegg_295 struct_luckegg_295 : Config_luckegg_295.getIns().getSortList()) {
			int qs = struct_luckegg_295.getQs();
			Map<Integer, List<ProbabilityEventModel>> map = awardMap.get(qs);
			if (map == null) {
				map = new HashMap<>();
				awardMap.put(qs, map);
			}
			List<ProbabilityEventModel> generalDropData = ExcelJsonUtils
					.getGeneralDropData(struct_luckegg_295.getReward());
			map.put(struct_luckegg_295.getId(), generalDropData);
		}

		List<Struct_luckeggtime_295> TimeList = Config_luckeggtime_295.getIns().getSortList();
		for (Struct_luckeggtime_295 struct_luckeggtime_295 : TimeList) {
			int TimeLow = struct_luckeggtime_295.getTime()[0][0];
			int TimeHigh = struct_luckeggtime_295.getTime()[0][1];
			
			for (int i = TimeLow; i <= TimeHigh; i++) {
				countConfigMap.put(i, struct_luckeggtime_295);
				if (i > maxNum) {
					maxNum = i;
				}

			}
		}


	}




	public static void setMaxNum(int maxNum) {
		LuckyTwistSysCache.maxNum = maxNum;
	}

	public static Map<Integer, Struct_luckeggtime_295> getCountConfigMap() {
		return countConfigMap;
	}

	public static void setCountConfigMap(Map<Integer, Struct_luckeggtime_295> countConfigMap) {
		LuckyTwistSysCache.countConfigMap = countConfigMap;
	}

	/**
	 * @return 最大次数
	 */
	public static int getMaxNum() {
		return maxNum;
	}

	public static Map<Integer, List<ProbabilityEventModel>> getAwardMap(int qs) {
		return awardMap.get(qs);
	}




}
