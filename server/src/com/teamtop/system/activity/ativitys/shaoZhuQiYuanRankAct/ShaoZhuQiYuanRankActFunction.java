package com.teamtop.system.activity.ativitys.shaoZhuQiYuanRankAct;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.TreeSet;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.TypeReference;
import com.teamtop.system.activity.ActivitySysCache;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.shaoZhuQiYuanRankAct.cross.CrossShaoZhuQiYuanRankActSysCache;
import com.teamtop.system.activity.ativitys.shaoZhuQiYuanRankAct.cross.model.CrossShaoZhuQiYuanRankActCache;
import com.teamtop.system.activity.ativitys.shaoZhuQiYuanRankAct.model.ShaoZhuQiYuanRankAct;
import com.teamtop.system.activity.ativitys.shaoZhuQiYuanRankAct.model.ShaoZhuQiYuanRankActModel;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_kuafu_200;
import excel.struct.Struct_kuafu_200;

public class ShaoZhuQiYuanRankActFunction {

	private static volatile ShaoZhuQiYuanRankActFunction ins = null;

	public static ShaoZhuQiYuanRankActFunction getIns() {
		if (ins == null) {
			synchronized (ShaoZhuQiYuanRankActFunction.class) {
				if (ins == null) {
					ins = new ShaoZhuQiYuanRankActFunction();
				}
			}
		}
		return ins;
	}

	private ShaoZhuQiYuanRankActFunction() {
	}

	public boolean isCanUpdate(ShaoZhuQiYuanRankAct model) {
		Integer endTimes = ShaoZhuQiYuanRankActSysCache.getIndexConfigMap().get(model.getIndexId());
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
	public void heroDataHandle(ShaoZhuQiYuanRankAct model) {
		int newQs = ShaoZhuQiYuanRankActSysCache.getNewQs();
		Map<Long, Integer[]> newQsDataMap = ShaoZhuQiYuanRankActSysCache.getNewQsDataMap();
		if (model.getPeriods() == newQs) {
			Integer[] integers = newQsDataMap.get(model.getHid());
			if (integers != null) {
				Integer addTimes = integers[0];
				Integer reacheTime = integers[1];
				int currentTime = TimeDateUtil.getCurrentTime();
				ActivityInfo activityInfo = ActivitySysCache.getActivityMap().get(ActivitySysId.SHAOZHU_QIYUANRANK_ACT);
				int endTime = activityInfo.getEndTime();
				int startTime = activityInfo.getStartTime();
				if (reacheTime - currentTime <= endTime - startTime) {
					int qiyuanTimes = model.getQiyuanTimes();
					model.setQiyuanTimes(qiyuanTimes + addTimes);
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
			GlobalData globalDataRankData = GlobalCache.getGlobalData(GlobalConst.CROSS_SHAOZHU_QIYUANRANK_ACT_CEN);
			Map<Integer, CrossShaoZhuQiYuanRankActCache> crossCache = CrossShaoZhuQiYuanRankActSysCache.getCrossCache();
			content = JSON.toJSONString(crossCache);
			globalDataRankData.setContent(content);
			GlobalCache.doSync(globalDataRankData);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, "intoDB content:" + content);
		}
	}
	/**
	 * 合中央服
	 * @param firstZoneid
	 * @param dataAll
	 * @param globalData
	 * @throws Exception
	 */
	public void setCentryBigHeFuData(int firstZoneid,List<GlobalData> dataAll, GlobalData globalData) throws Exception{
		HashMap<Integer, CrossShaoZhuQiYuanRankActCache> qiYuanRankActCache =new HashMap<Integer, CrossShaoZhuQiYuanRankActCache>();
		
		for (GlobalData globalTemp : dataAll) {
			String content = globalTemp.getContent();
			if (content == null || content.equals("") || content.equals("{}")) {
			} else {
				try {
					Type classType = new TypeReference<HashMap<Integer, CrossShaoZhuQiYuanRankActCache>>() {
					}.getType();
					HashMap<Integer, CrossShaoZhuQiYuanRankActCache> tempRankMap = JSON.parseObject(content, classType);
					for (Integer key: tempRankMap.keySet()) {
						if (!qiYuanRankActCache.containsKey(key)) {
							qiYuanRankActCache.put(key, tempRankMap.get(key));
						}
					}
				} catch (Exception e) {
					LogTool.error(e, ShaoZhuQiYuanRankActFunction.class, "setCentryBigHeFuData  ShaoZhuQiYuanRank has wrong");

				}
			}
		}
		globalData.setContent(JSON.toJSONString(qiYuanRankActCache));
		LogTool.info("setCentryBigHeFuData ShaoZhuQiYuanRank success", ShaoZhuQiYuanRankActFunction.class);
	}

	/**
	 * 合跨服组 
	 * @param dataAll
	 * @param globalData
	 * @throws Exception
	 */
	public void setCrossHeZuData(List<GlobalData> dataAll, GlobalData globalData)  throws Exception{
		HashMap<Integer, CrossShaoZhuQiYuanRankActCache> qiYuanRankActCache =new HashMap<Integer, CrossShaoZhuQiYuanRankActCache>();
		
		for (GlobalData globalTemp : dataAll) {
			String content = globalTemp.getContent();
			if (content == null || content.equals("") || content.equals("{}")) {
			} else {
				try {
					Map<Integer, Struct_kuafu_200> map = Config_kuafu_200.getIns().getMap();

					Type classType = new TypeReference<HashMap<Integer, CrossShaoZhuQiYuanRankActCache>>() {
					}.getType();
					HashMap<Integer, CrossShaoZhuQiYuanRankActCache> tempRankMap = JSON.parseObject(content, classType);


					for (Integer key: tempRankMap.keySet()) {
						int goalKey=key;
						Struct_kuafu_200 struct_kuafu_200 = map.get(key);
						if(struct_kuafu_200.getCl()==1) {
							int mb = struct_kuafu_200.getMb();
							goalKey=mb;
						}
						if (!qiYuanRankActCache.containsKey(goalKey)) {

							qiYuanRankActCache.put(goalKey, tempRankMap.get(key));
						}else {
							 CrossShaoZhuQiYuanRankActCache crossShaoZhuQiYuanRankActCache = qiYuanRankActCache.get(goalKey);
							 CrossShaoZhuQiYuanRankActCache crossShaoZhuQiYuanRankActCache2 = tempRankMap.get(key);
							 crossShaoZhuQiYuanRankActCache.getRankTreeSet().addAll(crossShaoZhuQiYuanRankActCache2.getRankTreeSet());
						}
					}
				} catch (Exception e) {
					LogTool.error(e, ShaoZhuQiYuanRankActFunction.class, "setCrossHeZuData has wrong");

				}
			}
		}
		for (CrossShaoZhuQiYuanRankActCache rankCache: qiYuanRankActCache.values()) {

			TreeSet<ShaoZhuQiYuanRankActModel> rankTreeSet = rankCache.getRankTreeSet();
			int size = rankTreeSet.size();
			if (size>100) {
				int i=0;
				for(Iterator<ShaoZhuQiYuanRankActModel> iter = rankTreeSet.descendingIterator(); iter.hasNext(); ) {
					iter.next();
					i++;
					if (i>100) {
						iter.remove();
					}
				}
			}
		}
		globalData.setContent(JSON.toJSONString(qiYuanRankActCache));
		LogTool.info("setCrossZuHeFuData ShaoZhuQiYuanRank success", ShaoZhuQiYuanRankActFunction.class);

	}

	
	
}
