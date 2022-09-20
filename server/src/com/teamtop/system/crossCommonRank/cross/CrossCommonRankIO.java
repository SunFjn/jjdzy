package com.teamtop.system.crossCommonRank.cross;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.TreeSet;
import java.util.concurrent.ConcurrentHashMap;

import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.RankingOpTaskRunnable;
import com.teamtop.system.activity.ActivityDao;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysCache;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.crossCommonRank.CommonActivityRankHandlerAbs;
import com.teamtop.system.crossCommonRank.CommonRankFunction;
import com.teamtop.system.crossCommonRank.CommonRankSysCache;
import com.teamtop.system.crossCommonRank.cross.model.CrossCommonRankCache;
import com.teamtop.system.crossCommonRank.model.CommonActivityRank;
import com.teamtop.system.crossCommonRank.model.CommonRankModel;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroDao;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import io.netty.channel.Channel;

public class CrossCommonRankIO {
	private static volatile CrossCommonRankIO ins = null;

	public static CrossCommonRankIO getIns() {
		if (ins == null) {
			synchronized (CrossCommonRankIO.class) {
				if (ins == null) {
					ins = new CrossCommonRankIO();
				}
			}
		}
		return ins;
	}

	private CrossCommonRankIO() {
	}

	/**
	 * 子服接收来自中央服的连接事件请求,获取排行数据
	 *
	 * @param channel
	 * @param crossData
	 */
	@SuppressWarnings("unchecked")
	public void connEventFromCen(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_COMMONRANK_CONNSENDRANK_CL;
		Type classType = new TypeReference<HashMap<Integer, CrossCommonRankCache>>() {
		}.getType();
		Map<Integer, CrossCommonRankCache> crossCache = crossData.getObject(CrossCommonRankEnum.crossCache, classType);
		for (Entry<Integer, CrossCommonRankCache> entry : crossCache.entrySet()) {
			Integer sysId = entry.getKey();
			CrossCommonRankCache cache = entry.getValue();
			int qs = cache.getQs();
			if (ActivitySysCache.getActMgrByActId(sysId) != null
					&& !ActivityFunction.getIns().checkActOpen(sysId, qs)) {
				// 活动已经结束了
				CommonRankSysCache.getLocalCache(sysId);
				continue;
			}
			TreeSet<CommonRankModel> rankTreeSet = cache.getRankTreeSet();
			CommonRankSysCache.setRankTreeSet(sysId, rankTreeSet);
			createObjectArray(sysId, rankTreeSet, qs);
		}
	}

	/**
	 * 增加更新排行榜数据(来自子服) 1为玩家消费更新，0为更改名字
	 *
	 * @param channel
	 * @param crossData
	 */
	public void addUpdateRankFromLocal(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_COMMONRANK_ADDUPDATERANK_LC;
		int sysId = crossData.getObject(CrossCommonRankEnum.sysId, Integer.class);
		OpTaskExecutorService.PublicOrderService.execute(new RankingOpTaskRunnable() {
			@Override
			public void run() {
				CommonRankModel model = null;
				try {
					Class<?> modelType = CommonRankFunction.getIns().getModelType(sysId, 1);
					model = (CommonRankModel) crossData.getObject(CrossCommonRankEnum.addUpdateRankModel, modelType);
					int parameter = model.getParameter();
					if (parameter > 0) {
						int endTimeLocal = crossData.getObject(CrossCommonRankEnum.endTime, Integer.class);
						int endTimeCen = CommonRankSysCache.getEndTime(sysId, channel);
						int currentTime = TimeDateUtil.getCurrentTime();
						model.setReachTime(currentTime);
						if (endTimeLocal > endTimeCen && endTimeCen != 0 || currentTime >= endTimeLocal) {
							boolean isUpdateSuccess = endTimeLocal > endTimeCen && endTimeCen != 0;
							int nextQs = crossData.getObject(CrossCommonRankEnum.qs, Integer.class) / 1000;
							if (isUpdateSuccess || (nextQs != 0 && currentTime >= endTimeLocal)) {
								// 活动还未结算，新一期和(相邻情况)往期超时的数据放到临时存储list里
								List<CommonRankModel> tempRankList = CommonRankSysCache.getTempRankList(sysId, channel);
								tempRankList.add(model);
								LogTool.info(model.getHid(), model.getName(),
										"CrossCommonRankIO addUpdateRankFromLocal tempRankList sysId:" + sysId
												+ " endTimeLocal=" + endTimeLocal + ", endTimeCen=" + endTimeCen
												+ " parameter:" + model.getParameter() + " add:" + model.getAdd()
												+ " isUpdateSuccess:" + isUpdateSuccess,
										this);
								if (!isUpdateSuccess) {
									// 不更新的数据放到跨期缓存里
									model.setRank(nextQs);
									CrossCommonRankCL.getIns().addNewQsDataToLocal(sysId, channel, model);
								}
							} else {
								// (不是相邻情况)往期超时的数据
								LogTool.info(model.getHid(), model.getName(),
										"CrossCommonRankIO addUpdateRankFromLocal not isBetween last qs sysId:" + sysId
												+ " endTimeLocal=" + endTimeLocal + ", endTimeCen=" + endTimeCen
												+ " parameter:" + model.getParameter() + " add:" + model.getAdd(),
										this);
							}
							crossData.finishGet();
							// 活动还未结算，新一期数据可以更新成功，往期超时的数据更新失败
							crossData.putObject(CrossCommonRankEnum.isUpdateSuccess, isUpdateSuccess);
							NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
							return;
						} else if (endTimeLocal > endTimeCen && endTimeCen == 0) {
							// 新一期活动开启
							CommonRankSysCache.setEndTime(sysId, channel, endTimeLocal);
							int qsLocal = crossData.getObject(CrossCommonRankEnum.qs, Integer.class) % 1000;
							CommonRankSysCache.setQs(sysId, channel, qsLocal);
							TreeSet<CommonRankModel> rankTreeSet = CommonRankSysCache.getRankTreeSet(sysId, channel);
							rankTreeSet.clear();
							// 发送临时数据到新一期排行列表里
							addTempRankAwardToRankList(sysId, channel);
							CrossCommonRankCL.getIns().addNewQsDataToLocal(sysId, channel, null);
						} else {
							// 正常更新排行
							LogTool.info(model.getHid(), model.getName(),
									"CrossCommonRankIO addUpdateRankFromLocal normal sysId:" + sysId + " endTimeLocal="
											+ endTimeLocal + ", endTimeCen=" + endTimeCen + " parameter:"
											+ model.getParameter() + " add:" + model.getAdd(),
									this);
						}
					}
					TreeSet<CommonRankModel> rankTreeSet = CommonRankSysCache.getRankTreeSet(sysId, channel);
					boolean isRefreshRank = refreshRank(sysId, rankTreeSet, model);
					if (isRefreshRank) {
						CrossCommonRankCL.getIns().addUpdateRankToLocal(sysId, channel, model);
					}
					crossData.finishGet();
					crossData.putObject(CrossCommonRankEnum.isUpdateSuccess, true);
					NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
				} catch (Exception e) {
					// TODO: handle exception
					if (model == null) {
						LogTool.error(e, this, "CrossCommonRankIO addUpdateRankFromLocal error sysId:" + sysId);
					} else {
						LogTool.error(e, this,
								"CrossCommonRankIO addUpdateRankFromLocal error sysId:" + sysId + " hid:"
										+ model.getHid() + " name:" + model.getName() + " parameter:"
										+ model.getParameter() + " add:" + model.getAdd());
					}
					crossData.finishGet();
					crossData.putObject(CrossCommonRankEnum.isUpdateSuccess, false);
					NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
				}
			}

			@Override
			public Object getSession() {
				// TODO Auto-generated method stub
				return CommonRankFunction.getIns().getSession(sysId);
			}

		});

	}

	/**
	 * 更新排行数据
	 *
	 * @param rankTreeSet
	 * @param addModel
	 */
	public boolean refreshRank(int sysId, TreeSet<CommonRankModel> rankTreeSet, CommonRankModel addModel) {
		Iterator<CommonRankModel> iterator = rankTreeSet.iterator();
		while (iterator.hasNext()) {
			CommonRankModel rankTreeModel = iterator.next();
			if (rankTreeModel.getHid() == addModel.getHid()) {
				if (addModel.getParameter() == 0) {
					// 改名
					addModel.setParameter(rankTreeModel.getParameter());
					addModel.setRank(rankTreeModel.getRank());
					addModel.setReachTime(rankTreeModel.getReachTime());
					addModel.setAdd(rankTreeModel.getAdd());
				}
				if (addModel.getParameter() < rankTreeModel.getParameter()) {
					// 增加的比排行里的鉴定次数少,异常情况
					return false;
				}
				iterator.remove();
				rankTreeSet.add(addModel);
				return true;
			}
		}
		if (addModel.getParameter() == 0) {
			return false;
		}
		CommonActivityRankHandlerAbs<CommonActivityRank, CommonRankModel> abs = CommonRankSysCache
				.getActivityRankHandlerAbs(sysId);
		int rankNum = abs.rankNum();
		if (rankTreeSet.size() >= rankNum) {
			CommonRankModel lastModel = rankTreeSet.last();
			if (addModel.getParameter() <= lastModel.getParameter()) {
				return false;
			}
			rankTreeSet.remove(lastModel);
		}
		rankTreeSet.add(addModel);
		return true;
	}

	public void createObjectArray(int sysId, TreeSet<CommonRankModel> rankTreeSet, int qs) {
		if (rankTreeSet.size() <= 0) {
			return;
		}
		CommonActivityRankHandlerAbs<CommonActivityRank, CommonRankModel> abs = CommonRankSysCache
				.getActivityRankHandlerAbs(sysId);
		int rankNum = abs.rankNum();
		List<Object[]> list = new ArrayList<>(rankTreeSet.size());
		int rank = 1;
		for (CommonRankModel rankModel : rankTreeSet) {
			int parameter = rankModel.getParameter();
			int upRankCondition = 0;
			try {
				do {
					// 通过判断上榜条件,累加排名
					upRankCondition = abs.upRankCondition(rank++, qs);
				} while (parameter < upRankCondition && rank <= rankNum);
			} catch (Exception e) {
				// TODO: handle exception
				LogTool.error(e, this, rankModel.getHid(), rankModel.getName(),
						"CrossCommonRankIO createObjectArray error sysId:" + sysId + " qs:" + qs + " rank:" + rank
								+ " parameter:" + parameter + " upRankCondition:" + upRankCondition);
			}
			if (parameter >= upRankCondition) {
				rankModel.setRank(rank - 1);
				Object[] arrayType = abs.arrayType(rank - 1, rankModel);
				list.add(arrayType);
			}
			if (rank > rankNum) {
				break;
			}
		}
		CommonRankSysCache.setOpenUIObjArray(sysId, list.toArray());
	}

	/**
	 * 各个子服收到来自中央服更新的数据
	 *
	 * @param channel
	 * @param crossData
	 */
	public void addUpdateRankFromCen(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_COMMONRANK_ADDUPDATERANK_CL;
		Integer sysId = crossData.getObject(CrossCommonRankEnum.sysId, Integer.class);
		OpTaskExecutorService.PublicOrderService.execute(new RankingOpTaskRunnable() {
			@Override
			public void run() {
				CommonRankModel addModel = null;
				Integer qs = 0;
				try {
					TreeSet<CommonRankModel> rankTreeSet = CommonRankSysCache.getRankTreeSet(sysId);
					Class<?> modelType = CommonRankFunction.getIns().getModelType(sysId, 1);
					addModel = (CommonRankModel) crossData.getObject(CrossCommonRankEnum.addUpdateRankModel, modelType);
					refreshRank(sysId, rankTreeSet, addModel);
					qs = crossData.getObject(CrossCommonRankEnum.qs, Integer.class);
					createObjectArray(sysId, rankTreeSet, qs);
				} catch (Exception e) {
					// TODO: handle exception
					if (addModel == null)

					{
						LogTool.error(e, this, "CrossCommonRankIO addUpdateRankFromCen error sysId:" + sysId);
					} else {
						LogTool.error(e, this, addModel.getHid(), addModel.getName(),
								"CrossCommonRankIO addUpdateRankFromCen error sysId:" + sysId + " qs:" + qs
										+ " parameter:" + addModel.getParameter());
					}
				}
			}

			@Override
			public Object getSession() {
				// TODO Auto-generated method stub
				return CommonRankFunction.getIns().getSession(sysId);
			}
		});

	}

	/**
	 * 发送临时存储排行到新一期
	 */
	public void addTempRankAwardToRankList(int sysId, Channel channel) {
		try {
			List<CommonRankModel> tempRankList = CommonRankSysCache.getTempRankList(sysId, channel);
			if (tempRankList.size() <= 0) {
				return;
			}
			Map<Long, CommonRankModel> hidMap = new HashMap<>();
			for (int i = 0; i < tempRankList.size(); i++) {
				CommonRankModel tempRankModel = tempRankList.get(i);
				long hid = tempRankModel.getHid();
				CommonRankModel hidMapModel = hidMap.get(hid);
				if (hidMapModel == null) {
					int add = tempRankModel.getAdd();
					tempRankModel.setParameter(add);
					hidMap.put(hid, tempRankModel);
				} else {
					int parameter = hidMapModel.getParameter();
					int add = hidMapModel.getAdd();
					hidMapModel.setParameter(parameter + add);
				}

			}
			TreeSet<CommonRankModel> rankTreeSet = CommonRankSysCache.getRankTreeSet(sysId, channel);
			for (CommonRankModel hidMapModel : hidMap.values()) {
				// 写入日志
				LogTool.info(hidMapModel.getHid(), hidMapModel.getName(),
						"CrossCommonRankIO addTempRankAwardToRankList sysId:" + sysId + " parameter:"
								+ hidMapModel.getParameter(),
						this);
				boolean isRefreshRank = refreshRank(sysId, rankTreeSet, hidMapModel);
				if (isRefreshRank) {
					CrossCommonRankCL.getIns().addUpdateRankToLocal(sysId, channel, hidMapModel);
				}
			}
			tempRankList.clear();
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, "CrossCommonRankIO addTempRankAwardToRankList sysId:" + sysId);
		}
	}

	/**
	 * 子服接收来自中央服发送的邮件奖励结算
	 * @param channel
	 * @param crossData
	 */
	public void sendMailAwardFromCen(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_COMMONRANK_SENDMAILAWARD_CL;
		CrossCommonRankCache award = crossData.getObject(CrossCommonRankEnum.award, CrossCommonRankCache.class);
		TreeSet<CommonRankModel> rankTreeSet = award.getRankTreeSet();
		List<CommonRankModel> arrayList = new ArrayList<>(rankTreeSet);
		sendMailAward(award.getSysId(), arrayList, award.getQs());
	}

	/**
	 * 子服发奖励
	 *
	 * @param awardList
	 * @param qs
	 */
	public void sendMailAward(int sysId, List<CommonRankModel> awardList, int qs) {
		int size = awardList.size();
		if (size == 0) {
			return;
		}
		CommonActivityRankHandlerAbs<CommonActivityRank, CommonRankModel> abs = CommonRankSysCache
				.getActivityRankHandlerAbs(sysId);
		abs.sendAward(awardList, qs);
	}

	/**
	 * 各个子服收到来自中央服更新的跨期数据
	 *
	 * @param channel
	 * @param crossData
	 */
	public void addNewQsDataFromCen(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_COMMONRANK_SYNC_NEWQSDATA_CL;
		Integer sysId = crossData.getObject(CrossCommonRankEnum.sysId, Integer.class);
		Integer qs = crossData.getObject(CrossCommonRankEnum.qs, Integer.class);
		if (qs != null) {
			CommonRankSysCache.setNewQs(sysId, qs);
			return;
		}
		Class<?> modelType = CommonRankFunction.getIns().getModelType(sysId, 1);
		CommonRankModel model = (CommonRankModel) crossData.getObject(CrossCommonRankEnum.addUpdateRankModel,
				modelType);
		long hid = model.getHid();
		Map<Long, Integer[]> newQsDataMap = CommonRankSysCache.getNewQsDataMap(sysId);
		Integer[] integers = newQsDataMap.get(hid);
		if (integers == null) {
			int add = model.getAdd();
			int reachTime = model.getReachTime();
			newQsDataMap.put(hid, new Integer[] { add, reachTime, model.getRank() });
		} else {
			int reachTime = integers[1];
			int add = model.getAdd();
			if (model.getReachTime() - reachTime <= 10 * 3600) {
				integers[0] += add;
				integers[1] = model.getReachTime();
			} else {
				integers[0] = add;
				integers[1] = model.getReachTime();
				if (integers.length >= 3) {
					integers[2] = model.getRank();
				}
			}
		}

	}

	/**
	 * 中央服收到子服gm清理命令
	 *
	 * @param channel
	 * @param crossData
	 */
	public void gmFromLocal(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_COMMONRANK_GM_LC;
		Integer sysId = crossData.getObject(CrossCommonRankEnum.sysId, Integer.class);
		CommonRankSysCache.getCrossConsumeRankActCache(sysId).clear();
		Iterator<ConcurrentHashMap<Channel, List<Integer>>> iterator = CrossCache.getPchToZoneMap().values().iterator();
		for (; iterator.hasNext();) {
			ConcurrentHashMap<Channel, List<Integer>> map = iterator.next();
			for (Channel channel1 : map.keySet()) {
				NettyWrite.writeXData(channel1, CrossConst.CROSS_COMMONRANK_GM_CL, crossData);
			}
		}
	}

	/**
	 * 子服收到中央服gm清理命令
	 *
	 * @param channel
	 * @param crossData
	 */
	public void gmFromCen(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_COMMONRANK_GM_CL;
		Integer sysId = crossData.getObject(CrossCommonRankEnum.sysId, Integer.class);
		CommonRankSysCache.getRankTreeSet(sysId).clear();
		CommonRankSysCache.setOpenUIObjArray(sysId, null);
		// 删除区服所有玩家对应活动数据
		ActivityDao.getIns().deleteActGM(sysId);
		try {
			HeroDao.getIns().updateZeroTime();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		int zeroTime = TimeDateUtil.getTodayZeroTimeReturnInt();
		Map<Long, Hero> heroMap = HeroCache.getHeroMap();
		for (Hero hero : heroMap.values()) {
			boolean online = HeroFunction.getIns().isOnline(hero.getId());
			if (!online) {
				continue;
			}
			hero.setZeroTime(zeroTime);
			hero.setOneDayRecharge(0);
			Map<Integer, ActivityData> activityDataMap = hero.getHeroActivityData().getActivityDataMap();
			activityDataMap.remove(sysId);
			Map<Integer, ActivityInfo> activityMap = ActivitySysCache.getActivityMap();
			ActivityInfo activityInfo = activityMap.get(sysId);
			if (activityInfo != null) {
				// 活动在开，清空数据
				ActivityData activityData = ActivitySysCache.getActMgrByActId(sysId).getActivityData(hero,
						activityInfo);
				activityDataMap.put(sysId, activityData);
			}
		}
	}
}
