package com.teamtop.system.activity.ativitys.godGenSendGiftAct;

import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.teamtop.cross.CrossZone;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysCache;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.godGenSendGiftAct.cross.CrossGodGenSendGiftActCache;
import com.teamtop.system.activity.ativitys.godGenSendGiftAct.cross.model.CrossGodGenSendGiftCache;
import com.teamtop.system.activity.ativitys.godGenSendGiftAct.model.GodGenSendGiftAct;
import com.teamtop.system.activity.ativitys.godGenSendGiftAct.model.GodGenSendGiftActRankModel;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.global.GlobalData;
import com.teamtop.system.godGenSendGift.GodGenSendGiftConst;
import com.teamtop.system.godGenSendGift.GodGenSendGiftFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.db.trans.ObjStrTransUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_kuafu_200;
import excel.struct.Struct_cbgmb2_729;
import excel.struct.Struct_kuafu_200;

public class GodGenSendGiftActFunction {

	private static GodGenSendGiftActFunction ins;

	private GodGenSendGiftActFunction() {
		// TODO Auto-generated constructor stub
	}

	public static GodGenSendGiftActFunction getIns() {
		if (ins == null) {
			ins = new GodGenSendGiftActFunction();
		}
		return ins;
	}

	/**
	 * 刷新排名
	 * 
	 * @param rankList
	 * @param type     1:刷新排名，0：更改名字
	 * @param model
	 */
	public void refreshRankList(int type, GodGenSendGiftActRankModel model, int partId) {
		try {
			LogTool.info("model::" + model.getName() + ", " + model.getTotalTimes(), this);
			List<GodGenSendGiftActRankModel> rankList;
			if (CrossZone.isCrossServer()) {
				rankList = CrossGodGenSendGiftActCache.getRankList(partId);
			} else {
				rankList = GodGenSendGiftActCache.getRankList();
			}
			refreshRankList_f1(rankList, type, model);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, "GodGenSendGiftActFunction refreshRankList " + "type:" + type + " hid"
					+ model.getHid() + " name" + model.getName() + " addTimes" + model.getTotalTimes());
		}
	}

	public void refreshRankList_f1(List<GodGenSendGiftActRankModel> rankList, int type,
			GodGenSendGiftActRankModel rankModel) {
		int indexOf = rankList.indexOf(rankModel);

		if (type == 1) {
			if (indexOf < 0) {
				rankList.add(rankModel);
			} else {
				GodGenSendGiftActRankModel rankModel2 = rankList.get(indexOf);
				int newTimes = rankModel.getTotalTimes();
				rankModel2.setTotalTimes(newTimes);
				rankModel2.setReachTime(rankModel.getReachTime());
			}
			sortRank(rankList);
		} else {
			if (indexOf >= 0) {
				GodGenSendGiftActRankModel rankModel2 = rankList.get(indexOf);
				rankModel2.setName(rankModel.getName());
			}
		}
	}

	public void sortRank(List<GodGenSendGiftActRankModel> rankList) {
		Collections.sort(rankList, new GodGenSendGiftActRankComparator());
		Iterator<GodGenSendGiftActRankModel> iterator = rankList.iterator();
		int maxNum = GodGenSendGiftActConst.RANK_NUM;
		int i = 1;
		while (iterator.hasNext()) {
			iterator.next();
			if (i > maxNum) {
				iterator.remove();
			}
			i++;
		}
	}

	/**
	 * 更新目标奖励
	 * 
	 * @param hero
	 * @param addTimes 增加的抽奖次数
	 */
	public void updateTargetAwardStateMap(Hero hero, GodGenSendGiftAct godGenSendGiftAct, int addTimes) {
		// TODO Auto-generated method stub
		int newTotalTimes = 0;
		try {
			newTotalTimes = godGenSendGiftAct.getTotalTimes();
			Map<Integer, Integer> awardStateMap = godGenSendGiftAct.getAwardStateMap();
			int qs = godGenSendGiftAct.getPeriods();
			Map<Integer, Map<Integer, Struct_cbgmb2_729>> targetConfigMap = GodGenSendGiftActCache.getTargetConfigMap();
			Map<Integer, Struct_cbgmb2_729> map = targetConfigMap.get(qs);
			boolean flag = false;
			for (Struct_cbgmb2_729 struct_cbgmb2_729 : map.values()) {
				int id = struct_cbgmb2_729.getId();
				if (newTotalTimes >= struct_cbgmb2_729.getTime() && awardStateMap.get(id) == null) {
					awardStateMap.put(id, GodGenSendGiftActConst.CAN_GET);
					flag = true;
				}
			}

			if (flag) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, ActivitySysId.ACT_GODGENSENDGIFT, 1,
						RedPointConst.HAS_RED);
			}
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, hero.getId(), hero.getName(),
					"GodGenSendGiftActFunction updateTargetAwardStateMap addTimes:" + addTimes + " newTotalTimes"
							+ newTotalTimes);
		}
	}

	/**
	 * 神将送礼(活动)活动结束时间
	 * 
	 * @return
	 */
	public int getEndTime() {
		Map<Integer, ActivityInfo> activityMap = ActivitySysCache.getActivityMap();
		ActivityInfo activityInfo = activityMap.get(ActivitySysId.ACT_GODGENSENDGIFT);
		return activityInfo.getEndTime();
	}

	public List<GodGenSendGiftActRankModel> getLastRankList() {
		return GodGenSendGiftActCache.getLastRankList();
	}

	/**
	 * 活动开启条件判断
	 * 
	 * @param hero
	 * @return
	 */
	public boolean checkOpen(Hero hero) {
		int oldEndDay = GodGenSendGiftConst.OLD_END_DAY;
		int betweenOpen = TimeDateUtil.betweenOpen();
		if (isOldServer() && betweenOpen <= oldEndDay) {
			// 老服而且没有到跑完系统的前30天
			return false;
		} else {
			if (isOldServer() && betweenOpen > oldEndDay) {
				// 老服跑完30天
				Map<Integer, ActivityInfo> activityMap = ActivitySysCache.getActivityMap();
				ActivityInfo activityInfo = activityMap.get(ActivitySysId.ACT_GODGENSENDGIFT);
				if (activityInfo == null) {
					return false;
				}
				if (ActivityFunction.getIns().checkActOpen(ActivitySysId.ACT_GODGENSENDGIFT,
						activityInfo.getPeriods())) {
					return true;
				}
			}
			if (ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_GODGENSENDGIFT)) {
				// 新服
				return true;
			}
		}
		return false;
	}

	/**
	 * 是否老服
	 * 
	 * @return
	 */
	public boolean isOldServer() {
		int judgeTime = GodGenSendGiftConst.JUDGE_TIME;
		int serverOpenTime = GameProperties.serverOpenTime;
		if (serverOpenTime <= judgeTime) {
			return true;
		}
		return false;
	}

	/**
	 * 用户数据处理，防止次数出现丢失的情况
	 * 
	 * @param godGenSendGiftAct
	 */
	public void heroDataHandle(GodGenSendGiftAct godGenSendGiftAct) {
		int newQs = GodGenSendGiftActCache.getNewQs();
		Map<Long, Integer[]> newQsDataMap = GodGenSendGiftActCache.getNewQsDataMap();
		if (godGenSendGiftAct.getPeriods() == newQs) {
			Integer[] integers = newQsDataMap.get(godGenSendGiftAct.getHid());
			if (integers != null) {
				Integer addTimes = integers[0];
				Integer reacheTime = integers[1];
				int currentTime = TimeDateUtil.getCurrentTime();
				ActivityInfo activityInfo = ActivitySysCache.getActivityMap().get(ActivitySysId.ACT_GODGENSENDGIFT);
				int endTime = activityInfo.getEndTime();
				int startTime = activityInfo.getStartTime();
				if (reacheTime - currentTime <= endTime - startTime) {
					int totalTimes = godGenSendGiftAct.getTotalTimes();
					godGenSendGiftAct.setTotalTimes(totalTimes + addTimes);
				}
				newQsDataMap.remove(godGenSendGiftAct.getHid());
			}
		}
	}
	
	/**
	 * 处理合并中央服
	 * @param firstZoneid
	 * @param dataAll
	 * @param globalData
	 * @throws Exception
	 */
	public void setBigHeFuData(int firstZoneid,List<GlobalData> dataAll, GlobalData globalData) throws Exception{
		/** 排行列表 */
		Map<Integer, List<GodGenSendGiftActRankModel>> rankListMap = new HashMap<>();
		/** 期数 */
		Map<Integer, Integer> qsMap = new HashMap<>();
		
		for (GlobalData globalTemp : dataAll) {
			String content = globalTemp.getContent();
			if (content == null || content.equals("") || content.equals("{}")) {
			} else {
				try {
					CrossGodGenSendGiftCache obj = ObjStrTransUtil.toObj(content, CrossGodGenSendGiftCache.class);
					
					Map<Integer, List<GodGenSendGiftActRankModel>> temprankListMap = obj.getRankListMap();
					for (Integer key: temprankListMap.keySet()) {
						if (!rankListMap.containsKey(key)) {
							rankListMap.put(key, temprankListMap.get(key));
						}
					}
					
					Map<Integer, Integer> temqsMap = obj.getQsMap();
					for (Integer key: temqsMap.keySet()) {
						if (!qsMap.containsKey(key)) {
							qsMap.put(key, temqsMap.get(key));
						}
						
					}
				} catch (Exception e) {
					LogTool.error(e, GodGenSendGiftActFunction.class, "setCrossHeFuData has wrong");

				}
			}
		}
		CrossGodGenSendGiftCache data = new CrossGodGenSendGiftCache();
		data.setRankListMap(rankListMap);
		data.setQsMap(qsMap);
		globalData.setContent(ObjStrTransUtil.toStr(data));
		LogTool.info("setBigHeFuData godgensendGift success", GodGenSendGiftFunction.class);
	}
	
	
	/**
	 * 处理大跨服组数据
	 * @param firstZoneid
	 * @param dataAll
	 * @param globalData
	 * @throws Exception
	 */
	public void setCrossBigHeZuData(List<GlobalData> dataAll, GlobalData globalData) throws Exception{
		/** 排行列表 */
		Map<Integer, List<GodGenSendGiftActRankModel>> rankListMap = new HashMap<>();
		/** 期数 */
		Map<Integer, Integer> qsMap = new HashMap<>();
		
		for (GlobalData globalTemp : dataAll) {
			String content = globalTemp.getContent();
			if (content == null || content.equals("") || content.equals("{}")) {
			} else {
				try {
					Map<Integer, Struct_kuafu_200> map = Config_kuafu_200.getIns().getMap();
					CrossGodGenSendGiftCache obj = ObjStrTransUtil.toObj(content, CrossGodGenSendGiftCache.class);
					
					Map<Integer, List<GodGenSendGiftActRankModel>> temprankListMap = obj.getRankListMap();
					for (Integer key: temprankListMap.keySet()) {
						int goalKey=key;
						Struct_kuafu_200 struct_kuafu_200 = map.get(key);
						if(struct_kuafu_200.getCl()==1) {
							int mb = struct_kuafu_200.getMb();
							goalKey=mb;
						}
						if (!rankListMap.containsKey(goalKey)) {
							rankListMap.put(goalKey, temprankListMap.get(key));
						}else {
							List<GodGenSendGiftActRankModel> list = rankListMap.get(goalKey);
							list.addAll(temprankListMap.get(key));
						}
					}
					
					Map<Integer, Integer> temqsMap = obj.getQsMap();
					for (Integer key: temqsMap.keySet()) {
						int goalKey=key;
						Struct_kuafu_200 struct_kuafu_200 = map.get(key);
						if(struct_kuafu_200.getCl()==1) {
							int mb = struct_kuafu_200.getMb();
							goalKey=mb;
						}
						if (!qsMap.containsKey(goalKey)) {
							qsMap.put(goalKey, temqsMap.get(key));
						}
						
					}
				} catch (Exception e) {
					LogTool.error(e, GodGenSendGiftActFunction.class, "setCrossHeFuData has wrong");

				}
			}
		}
		for (List<GodGenSendGiftActRankModel> rankList: rankListMap.values()) {
			sortRank(rankList);
		}
		CrossGodGenSendGiftCache data = new CrossGodGenSendGiftCache();
		data.setRankListMap(rankListMap);
		data.setQsMap(qsMap);
		globalData.setContent(ObjStrTransUtil.toStr(data));
		LogTool.info("setCrossZuHeFuData GodGenSendGift success", GodGenSendGiftActFunction.class);
	}
}
