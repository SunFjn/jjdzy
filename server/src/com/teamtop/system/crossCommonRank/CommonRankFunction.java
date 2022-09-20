package com.teamtop.system.crossCommonRank;

import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.TreeSet;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.TypeReference;
import com.teamtop.system.activity.ActivitySysCache;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.crossCommonRank.cross.model.CrossCommonRankCache;
import com.teamtop.system.crossCommonRank.model.CommonActivityRank;
import com.teamtop.system.crossCommonRank.model.CommonRankModel;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalData;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_kuafu_200;
import excel.struct.Struct_kuafu_200;

public class CommonRankFunction {

	private static volatile CommonRankFunction ins = null;

	public static CommonRankFunction getIns() {
		if (ins == null) {
			synchronized (CommonRankFunction.class) {
				if (ins == null) {
					ins = new CommonRankFunction();
				}
			}
		}
		return ins;
	}

	private CommonRankFunction() {
	}

	public int getRankNum(int sysId){
		CommonActivityRankHandlerAbs<CommonActivityRank, CommonRankModel> abs = CommonRankSysCache.getActivityRankHandlerAbs(sysId);
		int rankNum = abs.rankNum();
		return rankNum;
	}

	public void clearLocalCache(int sysId) {
		CommonRankSysCache.getRankTreeSet(sysId).clear();
		CommonRankSysCache.setOpenUIObjArray(sysId, null);
	}

	public Integer getSession(int sysId) {
//		sysId %= 16;
//		if (sysId == 0) {
//			sysId = 16;
//		}
		return sysId;
	}

	/**
	 * 用户数据处理，防止跨期后次数出现丢失的情况
	 * @param sysId
	 * @param model
	 */
	public void heroDataHandle(int sysId, CommonActivityRank model) {
		try {
			if (sysId == 0) {
				return;
			}
			int newQs = CommonRankSysCache.getNewQs(sysId);
			Map<Long, Integer[]> newQsDataMap = CommonRankSysCache.getNewQsDataMap(sysId);
			if (model.getPeriods() == newQs) {
				Integer[] integers = newQsDataMap.get(model.getHid());
				if (integers != null) {
					Integer add = integers[0];
					Integer reacheTime = integers[1];
					int nextQs = 0;
					if (integers.length >= 3) {
						nextQs = integers[2];
						if (nextQs != model.getPeriods()) {
							return;
						}
					}
					int currentTime = TimeDateUtil.getCurrentTime();
					ActivityInfo activityInfo = ActivitySysCache.getActivityMap().get(sysId);
					int startTime = activityInfo.getStartTime();
					int endTime = activityInfo.getEndTime();
					LogTool.info("heroDataHandle sysId:" + sysId + " qs:" + model.getPeriods() + " nextQs:" + nextQs
							+ " hid:" + model.getHid() + " parameter:" + model.getParameterToHandle(), this);
					if (reacheTime - currentTime <= endTime - startTime) {
						int parameter = model.getParameterToHandle();
						model.setParameter(parameter + add);
					}
					newQsDataMap.remove(model.getHid());
				}
			}
		} catch (Exception e) {
			// TODO: handle exception
			if (model == null) {
				LogTool.error(e, this, "CommonRankFunction heroDataHandle error sysId:" + sysId);
			} else {
				LogTool.error(e, this, "CommonRankFunction heroDataHandle error sysId:" + sysId + " qs:"
						+ model.getPeriods() + " hid:" + model.getHid() + " parameter:" + model.getParameterToHandle());
			}
		}
	}

	/**
	 * 发奖励前入库，用来后续奖励追寻
	 */
	public void intoDB(int sysId, int globalId) {
		String content = "";
		try {
			GlobalData globalDataRankData = GlobalCache.getGlobalData(globalId);
			Map<Integer, CrossCommonRankCache> crossCache = CommonRankSysCache.getCrossConsumeRankActCache(sysId);
			content = JSON.toJSONString(crossCache);
			globalDataRankData.setContent(content);
			GlobalCache.doSync(globalDataRankData);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this,
					"CommonRankFunction intoDB sysId:" + sysId + " globalId:" + globalId + " content:" + content);
		}
	}

	public TreeSet<CommonRankModel> jsonStringToRankSet(JSONArray parseArray, Class<?> classType) {
		TreeSet<CommonRankModel> rankTreeSet = new TreeSet<>();
		int size = parseArray.size();
		for (int i = 0; i < size; i++) {
			Class<?> genericsType = getGenericsType(classType, 1);
			if (genericsType == null) {
				continue;
			}
			CommonRankModel model = (CommonRankModel) parseArray.getObject(i, genericsType);
			rankTreeSet.add(model);
		}
		return rankTreeSet;
	}

	/**
	 * 获取基类泛型类型
	 *
	 * @return
	 */
	public Class<?> getGenericsType(Class<?> cla, int index) {
		Type type = cla.getGenericSuperclass();
		if (type instanceof ParameterizedType) {
			ParameterizedType parameterizedType = (ParameterizedType) type;
			return (Class<?>) parameterizedType.getActualTypeArguments()[index];
		}
		LogTool.warn("getGenericsType:cla" + cla + " index:" + index, this);
		return null;
	}

	public Class<?> getModelType(int sysId, int index) {
		CommonActivityRankHandlerAbs<CommonActivityRank, CommonRankModel> abs = CommonRankSysCache
				.getActivityRankHandlerAbs(sysId);
		Class<?> genericsType = getGenericsType(abs.getClass(), 1);
		return genericsType;
	}


	/**
	 * 跨服消费排行榜/三国豪礼转盘排行榜 合并中央服
	 * @param firstZoneid
	 * @param dataAll
	 * @param globalData
	 * @throws Exception
	 */
	public void setConsumeBigHeFuData(int firstZoneid,List<GlobalData> dataAll, GlobalData globalData) throws Exception{
		HashMap<Integer, CrossCommonRankCache> crossConsumeMap =new HashMap<Integer, CrossCommonRankCache>();

		for (GlobalData globalTemp : dataAll) {
			String content = globalTemp.getContent();
			if (content == null || content.equals("") || content.equals("{}")) {
			} else {
				try {
					Type classType = new TypeReference<HashMap<Integer, CrossCommonRankCache>>() {
					}.getType();
					HashMap<Integer, CrossCommonRankCache> tempRankMap = JSON.parseObject(content, classType);
					for (Integer key: tempRankMap.keySet()) {
						if (!crossConsumeMap.containsKey(key)) {
							crossConsumeMap.put(key, tempRankMap.get(key));
						}
					}
				} catch (Exception e) {
					LogTool.error(e, CommonRankFunction.class, "setConsumeBigHeFuData has wrong");

				}
			}
		}
		globalData.setContent(JSON.toJSONString(crossConsumeMap));
		LogTool.info("setBigHeFuData commonRank success", CommonRankFunction.class);
	}


	/**
	 * 跨服消费排行榜/三国豪礼转盘排行榜 合大跨服组操作
	 * @param dataAll
	 * @param globalData
	 * @throws Exception
	 */
	public void setCrossConsumeHeZuData(List<GlobalData> dataAll, GlobalData globalData) throws Exception{

		HashMap<Integer, CrossCommonRankCache> crossConsumeMap =new HashMap<Integer, CrossCommonRankCache>();

		for (GlobalData globalTemp : dataAll) {
			String content = globalTemp.getContent();
			if (content == null || content.equals("") || content.equals("{}")) {
			} else {
				try {
					Map<Integer, Struct_kuafu_200> map = Config_kuafu_200.getIns().getMap();

					Type classType = new TypeReference<HashMap<Integer, CrossCommonRankCache>>() {
					}.getType();
					HashMap<Integer, CrossCommonRankCache> tempRankMap = JSON.parseObject(content, classType);


					for (Integer key: tempRankMap.keySet()) {
						int goalKey=key;
						Struct_kuafu_200 struct_kuafu_200 = map.get(key);
						if(struct_kuafu_200.getCl()==1) {
							int mb = struct_kuafu_200.getMb();
							goalKey=mb;
						}
						if (!crossConsumeMap.containsKey(goalKey)) {

							crossConsumeMap.put(goalKey, tempRankMap.get(key));
						}else {
							CrossCommonRankCache crossCommonRankCache = crossConsumeMap.get(goalKey);
							CrossCommonRankCache crossCommonRankCache2 = tempRankMap.get(key);
							crossCommonRankCache.getRankTreeSet().addAll(crossCommonRankCache2.getRankTreeSet());
						}
					}
				} catch (Exception e) {
					LogTool.error(e, CommonRankFunction.class, "setCrossConsumeHeFuData has wrong");

				}
			}
		}
		for (CrossCommonRankCache rankCache: crossConsumeMap.values()) {

			TreeSet<CommonRankModel> rankTreeSet = rankCache.getRankTreeSet();
			int size = rankTreeSet.size();
			if (size>100) {
				int i=0;
				for(Iterator<CommonRankModel> iter = rankTreeSet.descendingIterator(); iter.hasNext(); ) {
					iter.next();
					i++;
					if (i>100) {
						iter.remove();
					}
				}
			}
		}
		globalData.setContent(JSON.toJSONString(crossConsumeMap));
		LogTool.info("setCrossZuHeFuData commonRank success", CommonRankFunction.class);
	}


}
