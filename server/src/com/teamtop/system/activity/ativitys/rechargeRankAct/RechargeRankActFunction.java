package com.teamtop.system.activity.ativitys.rechargeRankAct;

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
import com.teamtop.system.activity.ativitys.rechargeRankAct.cross.CrossRechargeRankActSysCache;
import com.teamtop.system.activity.ativitys.rechargeRankAct.cross.model.CrossRechargeRankActCache;
import com.teamtop.system.activity.ativitys.rechargeRankAct.model.RechargeRankAct;
import com.teamtop.system.activity.ativitys.rechargeRankAct.model.RechargeRankActModel;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_kuafu_200;
import excel.struct.Struct_kuafu_200;

public class RechargeRankActFunction {

	private static volatile RechargeRankActFunction ins = null;

	public static RechargeRankActFunction getIns() {
		if (ins == null) {
			synchronized (RechargeRankActFunction.class) {
				if (ins == null) {
					ins = new RechargeRankActFunction();
				}
			}
		}
		return ins;
	}

	private RechargeRankActFunction() {
	}

	/**
	 * 用户数据处理，防止次数出现丢失的情况
	 * 
	 * @param consumeRankAct
	 */
	public void heroDataHandle(RechargeRankAct consumeRankAct) {
		int newQs = RechargeRankActSysCache.getNewQs();
		Map<Long, Integer[]> newQsDataMap = RechargeRankActSysCache.getNewQsDataMap();
		if (consumeRankAct.getPeriods() == newQs) {
			Integer[] integers = newQsDataMap.get(consumeRankAct.getHid());
			if (integers != null) {
				Integer addTimes = integers[0];
				Integer reacheTime = integers[1];
				int currentTime = TimeDateUtil.getCurrentTime();
				ActivityInfo activityInfo = ActivitySysCache.getActivityMap()
						.get(ActivitySysId.CROSS_RECHARGE_RANK_ACT);
				int startTime = activityInfo.getStartTime();
				int endTime = activityInfo.getEndTime();
				if (reacheTime - currentTime <= endTime - startTime) {
					int totalRecharge = consumeRankAct.getTotalRecharge();
					consumeRankAct.setTotalRecharge(totalRecharge + addTimes);
				}
				newQsDataMap.remove(consumeRankAct.getHid());
			}
		}
	}

	/**
	 * 发奖励前入库，用来后续奖励追寻
	 */
	public void intoDB() {
		String content = "";
		try {
			GlobalData globalDataRankData = GlobalCache.getGlobalData(GlobalConst.CROSS_RECHARGE_RANK_ACT_CEN);
			Map<Integer, CrossRechargeRankActCache> crossConsumeRankActCache = CrossRechargeRankActSysCache
					.getCrossConsumeRankActCache();
			content = JSON.toJSONString(crossConsumeRankActCache);
			globalDataRankData.setContent(content);
			GlobalCache.doSync(globalDataRankData);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, "intoDB content:" + content);
		}
	}
	
	/**
	 * 合中央服充值排行榜处理
	 * @param firstZoneid
	 * @param rechargeRankData
	 * @param globalDataRR
	 */
	public void setRechargeBigHeFuData(int firstZoneid,List<GlobalData> dataAll, GlobalData globalData) {
		try {
			HashMap<Integer, CrossRechargeRankActCache> rechargeRankMap =new HashMap<Integer, CrossRechargeRankActCache>();
			
			for (GlobalData globalTemp : dataAll) {
				String content = globalTemp.getContent();
				if (content == null || content.equals("") || content.equals("{}")) {
				} else {
					try {

						Type classType = new TypeReference<HashMap<Integer, CrossRechargeRankActCache>>() {
						}.getType();
						HashMap<Integer, CrossRechargeRankActCache> tempRankMap = JSON.parseObject(content, classType);
						for (Integer key: tempRankMap.keySet()) {
							if (!rechargeRankMap.containsKey(key)) {
								rechargeRankMap.put(key, tempRankMap.get(key));
							}
						}
					} catch (Exception e) {
						LogTool.error(e, RechargeRankActFunction.class, "setRechargeBigHeFuData has wrong");

					}
				}
			}
			globalData.setContent(JSON.toJSONString(rechargeRankMap));
			LogTool.info("setRechargeBigHeFuData rechargeRankAct success", RechargeRankActFunction.class);
		} catch (Exception e) {
			LogTool.error(e, RechargeRankActFunction.class, "setRechargeBigHeFuData has wrong");
		}
		
	}
	
	
	
	/**
	 * 合跨服组充值排行榜处理
	 * @param firstZoneid
	 * @param rechargeRankData
	 * @param globalDataRR
	 */
	public void setRechargeRankHeZuData(List<GlobalData> dataAll, GlobalData globalData) {
		try {
			HashMap<Integer, CrossRechargeRankActCache> rechargeRankMap =new HashMap<Integer, CrossRechargeRankActCache>();
			
			for (GlobalData globalTemp : dataAll) {
				String content = globalTemp.getContent();
				if (content == null || content.equals("") || content.equals("{}")) {
				} else {
					try {
						Map<Integer, Struct_kuafu_200> map = Config_kuafu_200.getIns().getMap();

						Type classType = new TypeReference<HashMap<Integer, CrossRechargeRankActCache>>() {
						}.getType();
						HashMap<Integer, CrossRechargeRankActCache> tempRankMap = JSON.parseObject(content, classType);
						for (Integer key: tempRankMap.keySet()) {
							int goalKey=key;
							Struct_kuafu_200 struct_kuafu_200 = map.get(key);
							if(struct_kuafu_200.getCl()==1) {
								int mb = struct_kuafu_200.getMb();
								goalKey=mb;
							}
							if (!rechargeRankMap.containsKey(goalKey)) {
								rechargeRankMap.put(goalKey, tempRankMap.get(key));
							}else {
								CrossRechargeRankActCache crossRechargeRankActCache = rechargeRankMap.get(goalKey);
								CrossRechargeRankActCache crossRechargeRankActCache2 = tempRankMap.get(key);
								crossRechargeRankActCache.getRankTreeSet().addAll(crossRechargeRankActCache2.getRankTreeSet());
							}
						}
					} catch (Exception e) {
						LogTool.error(e, RechargeRankActFunction.class, "setRechargeRankHeFuData has wrong");

					}
				}
			}
			for (CrossRechargeRankActCache rankCache: rechargeRankMap.values()) {
				
				TreeSet<RechargeRankActModel> rankTreeSet = rankCache.getRankTreeSet();
				int size = rankTreeSet.size();
				if (size>100) {
					int i=0;
					for(Iterator<RechargeRankActModel> iter = rankTreeSet.descendingIterator(); iter.hasNext(); ) {
						iter.next();
						i++;
						if (i>100) {
							iter.remove();
						}
					}
				}
			}
			globalData.setContent(JSON.toJSONString(rechargeRankMap));
			LogTool.info("setCrossZuHeFuData RechargeRankActFunction success", RechargeRankActFunction.class);
		} catch (Exception e) {
			LogTool.error(e, RechargeRankActFunction.class, "setRechargeRankHeFuData has wrong");
		}
		
	}
}
