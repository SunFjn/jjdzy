package com.teamtop.system.activity.ativitys.eightDoorAppraiseRankAct;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.TreeSet;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import com.teamtop.system.activity.ActivitySysCache;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.eightDoorAppraiseRankAct.cross.CrossEightDoorAppraiseRankActSysCache;
import com.teamtop.system.activity.ativitys.eightDoorAppraiseRankAct.cross.model.CrossEightDoorAppraiseRankActCache;
import com.teamtop.system.activity.ativitys.eightDoorAppraiseRankAct.model.EightDoorAppraiseRankAct;
import com.teamtop.system.activity.ativitys.eightDoorAppraiseRankAct.model.EightDoorAppraiseRankActModel;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_kuafu_200;
import excel.struct.Struct_kuafu_200;

public class EightDoorAppraiseRankActFunction {

	private static volatile EightDoorAppraiseRankActFunction ins = null;

	public static EightDoorAppraiseRankActFunction getIns() {
		if (ins == null) {
			synchronized (EightDoorAppraiseRankActFunction.class) {
				if (ins == null) {
					ins = new EightDoorAppraiseRankActFunction();
				}
			}
		}
		return ins;
	}

	private EightDoorAppraiseRankActFunction() {
	}

	public boolean isCanUpdate(EightDoorAppraiseRankAct model) {
		Integer endTimes = EightDoorAppraiseRankActSysCache.getIndexConfigMap().get(model.getIndexId());
		int currentTime = TimeDateUtil.getCurrentTime();
		if (currentTime <= endTimes) {
			return true;
		}
		return false;
	}

	/**
	 * 用户数据处理，防止次数出现丢失的情况
	 * 
	 * @param consumeRankAct
	 */
	public void heroDataHandle(EightDoorAppraiseRankAct model) {
		int newQs = EightDoorAppraiseRankActSysCache.getNewQs();
		Map<Long, Integer[]> newQsDataMap = EightDoorAppraiseRankActSysCache.getNewQsDataMap();
		if (model.getPeriods() == newQs) {
			Integer[] integers = newQsDataMap.get(model.getHid());
			if (integers != null) {
				Integer addTimes = integers[0];
				Integer reacheTime = integers[1];
				int currentTime = TimeDateUtil.getCurrentTime();
				ActivityInfo activityInfo = ActivitySysCache.getActivityMap()
						.get(ActivitySysId.EIGHTDOOR_APPRAISERANK_ACT);
				int endTime = activityInfo.getEndTime();
				int startTime = activityInfo.getStartTime();
				if (reacheTime - currentTime <= endTime - startTime) {
					int appraiseTimes = model.getAppraiseTimes();
					model.setAppraiseTimes(appraiseTimes + addTimes);
				}
				newQsDataMap.remove(model.getHid());
			}
		}
	}

	/**
	 * 发奖励前入库，用来后续奖励追寻
	 */
	public void intoDB() {
		String content = "";
		try {
			GlobalData globalDataRankData = GlobalCache.getGlobalData(GlobalConst.CROSS_EIGHTDOOR_APPRAISERANK_ACT_CEN);
			Map<Integer, CrossEightDoorAppraiseRankActCache> crossCache = CrossEightDoorAppraiseRankActSysCache
					.getCrossCache();
			content = JSON.toJSONString(crossCache);
			globalDataRankData.setContent(content);
			GlobalCache.doSync(globalDataRankData);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, "intoDB content:" + content);
		}
	}
	/**
	 * 合中央服 只是合并 不重新排序
	 * @param firstZoneid
	 * @param eightDoorData
	 * @param globalDataED
	 * @throws Exception
	 */
	public void setBigHeFuData(int firstZoneid,List<GlobalData> dataAll, GlobalData globalData) throws Exception {
		Map<Integer, CrossEightDoorAppraiseRankActCache> rankMap =new HashMap<Integer, CrossEightDoorAppraiseRankActCache>();
		
		for (GlobalData globalTemp : dataAll) {
			String content = globalTemp.getContent();
			if (content == null || content.equals("") || content.equals("{}")) {
			} else {
				try {

					Type classType = new TypeReference<HashMap<Integer, CrossEightDoorAppraiseRankActCache>>() {
					}.getType();
					Map<Integer, CrossEightDoorAppraiseRankActCache> temprankMap = JSONObject.parseObject(content, classType);
					
					for (Integer key: temprankMap.keySet()) {
						if (!rankMap.containsKey(key)) {
							rankMap.put(key, temprankMap.get(key));
						}
					}
				} catch (Exception e) {
					LogTool.error(e, EightDoorAppraiseRankActFunction.class, "setBigHeFuData EightDoorAppraiseRankAct has wrong");

				}
			}
		}
		globalData.setContent(JSON.toJSONString(rankMap));
		LogTool.info("setBigHeFuData EightDoorAppraiseRankAct success", EightDoorAppraiseRankActFunction.class);
		
	}
	
	
	/**
	 * 合跨服组 重新排序
	 * @param firstZoneid
	 * @param eightDoorData
	 * @param globalDataED
	 * @throws Exception
	 */
	public void setCrossHeZuData(List<GlobalData> dataAll, GlobalData globalData) throws Exception {
		Map<Integer, CrossEightDoorAppraiseRankActCache> rankMap =new HashMap<Integer, CrossEightDoorAppraiseRankActCache>();

		for (GlobalData globalTemp : dataAll) {
			String content = globalTemp.getContent();
			if (content == null || content.equals("") || content.equals("{}")) {
			} else {
				try {
					Map<Integer, Struct_kuafu_200> map = Config_kuafu_200.getIns().getMap();
					
					Type classType = new TypeReference<HashMap<Integer, CrossEightDoorAppraiseRankActCache>>() {
					}.getType();
					Map<Integer, CrossEightDoorAppraiseRankActCache> temprankMap = JSONObject.parseObject(content, classType);
					
					for (Integer key: temprankMap.keySet()) {
						int goalKey=key;
						Struct_kuafu_200 struct_kuafu_200 = map.get(key);
						if(struct_kuafu_200.getCl()==1) {
							int mb = struct_kuafu_200.getMb();
							goalKey=mb;
						}
						
						if (!rankMap.containsKey(goalKey)) {
							rankMap.put(goalKey, temprankMap.get(key));
						}else {
							CrossEightDoorAppraiseRankActCache crossEightDoorAppraiseRankActCache = rankMap.get(goalKey);
							CrossEightDoorAppraiseRankActCache crossEightDoorAppraiseRankActCache2 = temprankMap.get(key);
							crossEightDoorAppraiseRankActCache.getRankTreeSet().addAll(crossEightDoorAppraiseRankActCache2.getRankTreeSet());
						}
					}
				} catch (Exception e) {
					LogTool.error(e, EightDoorAppraiseRankActFunction.class, "setBigHeFuData EightDoorAppraiseRankAct has wrong");

				}
			}
		}

		for (CrossEightDoorAppraiseRankActCache rankCache: rankMap.values()) {

			TreeSet<EightDoorAppraiseRankActModel> rankTreeSet = rankCache.getRankTreeSet();
			int size = rankTreeSet.size();
			if (size>100) {
				int i=0;
				for(Iterator<EightDoorAppraiseRankActModel> iter = rankTreeSet.descendingIterator(); iter.hasNext(); ) {
					iter.next();
					i++;
					if (i>100) {
						iter.remove();
					}
				}
			}
		}


		globalData.setContent(JSON.toJSONString(rankMap));
		LogTool.info("setcrosszuhefuData EightDoorAppraiseRankAct success", EightDoorAppraiseRankActFunction.class);
		
	}
	
	
}
