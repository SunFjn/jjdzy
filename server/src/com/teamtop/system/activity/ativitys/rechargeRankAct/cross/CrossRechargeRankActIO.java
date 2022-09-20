package com.teamtop.system.activity.ativitys.rechargeRankAct.cross;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.TreeSet;
import java.util.concurrent.ConcurrentHashMap;

import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.synHandleCore.orderedRunnable.RankingOpTaskRunnable;
import com.teamtop.system.activity.ActivityDao;
import com.teamtop.system.activity.ActivitySysCache;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.rechargeRankAct.RechargeRankActConst;
import com.teamtop.system.activity.ativitys.rechargeRankAct.RechargeRankActManager;
import com.teamtop.system.activity.ativitys.rechargeRankAct.RechargeRankActSysCache;
import com.teamtop.system.activity.ativitys.rechargeRankAct.model.RechargeRankActModel;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.struct.Struct_czph_755;
import io.netty.channel.Channel;

public class CrossRechargeRankActIO {
	private static volatile CrossRechargeRankActIO ins = null;

	public static CrossRechargeRankActIO getIns() {
		if (ins == null) {
			synchronized (CrossRechargeRankActIO.class) {
				if (ins == null) {
					ins = new CrossRechargeRankActIO();
				}
			}
		}
		return ins;
	}

	private CrossRechargeRankActIO() {
	}

	/**
	 * 子服接收来自中央服的连接事件请求,获取排行数据
	 * 
	 * @param channel
	 * @param crossData
	 */
	@SuppressWarnings("unchecked")
	public void connEventFromCen(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_RECHARGE_RANK_ACT_CONNSENDRANK_CL;
		Type classType = new TypeReference<TreeSet<RechargeRankActModel>>() {
		}.getType();
		TreeSet<RechargeRankActModel> rankTreeSet = (TreeSet<RechargeRankActModel>) crossData
				.getObject(CrossRechargeRankActEnum.rankTreeSet, classType);
		RechargeRankActSysCache.setRankTreeSet(rankTreeSet);
		Integer qs = crossData.getObject(CrossRechargeRankActEnum.qs, Integer.class);
		createObjectArray(rankTreeSet, qs);
	}

	/**
	 * 增加更新排行榜数据(来自子服) 1为玩家消费更新，0为更改名字
	 * 
	 * @param channel
	 * @param crossData
	 */
	public void addUpdateRankFromLocal(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_RECHARGE_RANK_ACT_ADDUPDATERANK_LC;
		OpTaskExecutorService.PublicOrderService.execute(new RankingOpTaskRunnable() {
			@Override
			public void run() {
				RechargeRankActModel model = null;
				try {
					model = crossData.getObject(CrossRechargeRankActEnum.addUpdateRankModel,
							RechargeRankActModel.class);
					int totalRecharge = model.getTotalRecharge();
					if (totalRecharge > 0) {
						int endTimeLocal = crossData.getObject(CrossRechargeRankActEnum.endTime, Integer.class);
						int endTimeCen = CrossRechargeRankActSysCache.getEndTime(channel);
						int currentTime = TimeDateUtil.getCurrentTime();
						model.setReachTime(currentTime);
						LogTool.info("CrossRechargeRankActIO addUpdateRankFromLocal endTimeLocal=" + endTimeLocal
								+ ", endTimeCen=" + endTimeCen, this);
						if (endTimeLocal > endTimeCen && endTimeCen == 0 && endTimeLocal >= currentTime) {
							CrossRechargeRankActSysCache.setEndTime(channel, endTimeLocal);
							int qsLocal = crossData.getObject(CrossRechargeRankActEnum.qs, Integer.class);
							CrossRechargeRankActSysCache.setQs(channel, qsLocal);
							TreeSet<RechargeRankActModel> rankTreeSet = CrossRechargeRankActSysCache
									.getRankTreeSet(channel);
							rankTreeSet.clear();
							// 发送临时数据到新一期排行列表里
							addTempRankAwardToRankList(channel);
							CrossRechargeRankActCL.getIns().addNewQsDataToLocal(channel, null);
						} else if (endTimeLocal != endTimeCen && endTimeCen != 0 || currentTime > endTimeLocal) {
							boolean isUpdateSuccess = false;
							isUpdateSuccess = endTimeLocal > endTimeCen && endTimeCen != 0;
							if (isUpdateSuccess || currentTime > endTimeLocal) {
								// 活动还未结算，新一期和往期超时的数据放到临时存储list里
								List<RechargeRankActModel> tempRankList = CrossRechargeRankActSysCache
										.getTempRankList(channel);
								tempRankList.add(model);
								// 写入日志
								LogTool.info(model.getHid(), model.getName(),
										"CrossRechargeRankActIO addUpdateRankFromLocal tempRankList totalRecharge:"
												+ model.getTotalRecharge() + " addTimes" + model.getAddTimes(),
										this);
							} else {
								// 已经切换到新的活动，但发过来的还是旧的数据
								TreeSet<RechargeRankActModel> rankTreeSet = CrossRechargeRankActSysCache
										.getRankTreeSet(channel);
								boolean isRefreshRank = refreshRank(rankTreeSet, model);
								if (isRefreshRank) {
									CrossRechargeRankActCL.getIns().addUpdateRankToLocal(channel, model);
								}
								LogTool.info(model.getHid(), model.getName(),
										"CrossRechargeRankActIO addUpdateRankFromLocal qs < crossQs && endTimeCen != 0 totalRecharge:"
												+ model.getTotalRecharge() + " addTimes" + model.getAddTimes(),
										this);
							}
							crossData.finishGet();
							// 活动还未结算，新一期数据可以更新成功，往期超时的数据更新失败
							crossData.putObject(CrossRechargeRankActEnum.isUpdateSuccess, isUpdateSuccess);
							NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
							if (!isUpdateSuccess) {
								CrossRechargeRankActCL.getIns().addNewQsDataToLocal(channel, model);
							}
							return;
						}
					}
					TreeSet<RechargeRankActModel> rankTreeSet = CrossRechargeRankActSysCache.getRankTreeSet(channel);
					boolean isRefreshRank = refreshRank(rankTreeSet, model);
					if (isRefreshRank) {
						CrossRechargeRankActCL.getIns().addUpdateRankToLocal(channel, model);
					}
					crossData.finishGet();
					crossData.putObject(CrossRechargeRankActEnum.isUpdateSuccess, true);
					NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
				} catch (Exception e) {
					// TODO: handle exception
					if (model == null)

					{
						LogTool.error(e, this, "addUpdateRankFromLocal");
					} else {
						LogTool.error(e, this,
								"addUpdateRankFromLocal hid:" + model.getHid() + " name:" + model.getName()
										+ " totalRecharge:" + model.getTotalRecharge() + " addTimes:"
										+ model.getAddTimes());
					}
					crossData.finishGet();
					crossData.putObject(CrossRechargeRankActEnum.isUpdateSuccess, false);
					NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
				}
			}

			@Override
			public Object getSession() {
				// TODO Auto-generated method stub
				return OpTaskConst.CROSS_RECHARGE_RANK_ACT;
			}

		});

	}

	/**
	 * 更新排行数据
	 * 
	 * @param rankTreeSet
	 * @param addModel
	 */
	public boolean refreshRank(TreeSet<RechargeRankActModel> rankTreeSet, RechargeRankActModel addModel) {
		Iterator<RechargeRankActModel> iterator = rankTreeSet.iterator();
		while (iterator.hasNext()) {
			RechargeRankActModel rankTreeModel = iterator.next();
			if (rankTreeModel.getHid() == addModel.getHid()) {
				if (addModel.getTotalRecharge() == 0) {
					// 改名
					rankTreeModel.setName(addModel.getName());
					rankTreeModel.setJob(addModel.getJob());
					rankTreeModel.setBodyId(addModel.getBodyId());
					rankTreeModel.setWeaponModel(addModel.getWeaponModel());
					rankTreeModel.setMountId(addModel.getMountId());
					return true;
				}
				if (addModel.getTotalRecharge() < rankTreeModel.getTotalRecharge()) {
					// 增加的比排行里的鉴定次数少,异常情况
					return false;
				}
				iterator.remove();
				rankTreeSet.add(addModel);
				return true;
			}
		}
		if (addModel.getTotalRecharge() == 0) {
			return false;
		}

		if (rankTreeSet.size() >= RechargeRankActConst.RANKMAXNUM) {
			RechargeRankActModel lastModel = rankTreeSet.last();
			if (addModel.getTotalRecharge() <= lastModel.getTotalRecharge()) {
				return false;
			}
			rankTreeSet.remove(lastModel);
		}
		rankTreeSet.add(addModel);
		return true;
	}

	public void createObjectArray(TreeSet<RechargeRankActModel> rankTreeSet, int qs) {
		if (rankTreeSet.size() <= 0 || qs == 0) {
			return;
		}
		List<Object[]> list = new ArrayList<>();
		int i = 1;
		Map<Integer, Struct_czph_755> map = RechargeRankActSysCache.getRankConfigMap().get(qs);
		for (RechargeRankActModel rankModel : rankTreeSet) {
			int totalRecharge = rankModel.getTotalRecharge();
			int tj = 0;
			do {
				Struct_czph_755 struct_czph_755 = map.get(i++);
				if (struct_czph_755 == null) {
					break;
				}
				tj = struct_czph_755.getTj();
			} while (totalRecharge < tj);
			if (i - 1 > RechargeRankActConst.RANKMAXNUM) {
				break;
			}
			rankModel.setRank(i - 1);
			list.add(new Object[] { i - 1, rankModel.getName(), rankModel.getTotalRecharge() });
		}
		RechargeRankActSysCache.setOpenUIObjArray(list.toArray());
	}

	/**
	 * 各个子服收到来自中央服更新的数据
	 * 
	 * @param channel
	 * @param crossData
	 */
	public void addUpdateRankFromCen(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_RECHARGE_RANK_ACT_ADDUPDATERANK_CL;
		OpTaskExecutorService.PublicOrderService.execute(new RankingOpTaskRunnable() {
			@Override
			public void run() {
				RechargeRankActModel addModel = null;
				try {
					TreeSet<RechargeRankActModel> rankTreeSet = RechargeRankActSysCache.getRankTreeSet();
					addModel = crossData.getObject(CrossRechargeRankActEnum.addUpdateRankModel,
							RechargeRankActModel.class);
					refreshRank(rankTreeSet, addModel);
					Integer qs = crossData.getObject(CrossRechargeRankActEnum.qs, Integer.class);
					createObjectArray(rankTreeSet, qs);
				} catch (Exception e) {
					// TODO: handle exception
					if (addModel == null)

					{
						LogTool.error(e, this, "addUpdateRankFromCen");
					} else {
						LogTool.error(e, this, "addUpdateRankFromCen hid:" + addModel.getHid() + " name:"
								+ addModel.getName() + " totalRecharge:" + addModel.getTotalRecharge());
					}
				}
			}

			@Override
			public Object getSession() {
				// TODO Auto-generated method stub
				return OpTaskConst.CROSS_RECHARGE_RANK_ACT;
			}
		});

	}

	/**
	 * 发送临时存储排行到新一期
	 */
	public void addTempRankAwardToRankList(Channel channel) {
		try {
			List<RechargeRankActModel> tempRankList = CrossRechargeRankActSysCache.getTempRankList(channel);
			if (tempRankList.size() <= 0) {
				return;
			}
			Map<Long, RechargeRankActModel> hidMap = new HashMap<>();
			for (int i = 0; i < tempRankList.size(); i++) {
				RechargeRankActModel tempRankModel = tempRankList.get(i);
				long hid = tempRankModel.getHid();
				RechargeRankActModel hidMapModel = hidMap.get(hid);
				if (hidMapModel == null) {
					int addTimes = tempRankModel.getAddTimes();
					tempRankModel.setTotalRecharge(addTimes);
					hidMap.put(hid, tempRankModel);
				} else {
					int totalRecharge = hidMapModel.getTotalRecharge();
					int addTimes = hidMapModel.getAddTimes();
					hidMapModel.setTotalRecharge(totalRecharge + addTimes);
				}

			}
			TreeSet<RechargeRankActModel> rankTreeSet = CrossRechargeRankActSysCache.getRankTreeSet(channel);
			for (RechargeRankActModel hidMapModel : hidMap.values()) {
				// 写入日志
				LogTool.info(hidMapModel.getHid(), hidMapModel.getName(),
						"CrossRechargeRankActIO addTempRankAwardToRankList totalRecharge:"
								+ hidMapModel.getTotalRecharge(),
						this);
				boolean isRefreshRank = refreshRank(rankTreeSet, hidMapModel);
				if (isRefreshRank) {
					CrossRechargeRankActCL.getIns().addUpdateRankToLocal(channel, hidMapModel);
				}
			}
			tempRankList.clear();
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, "addTempRankAwardToRankList");
		}
	}

	/**
	 * 子服接收来自中央服发送的邮件奖励结算
	 * 
	 * @param hero
	 */
	public void sendMailAwardFromCen(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_RECHARGE_RANK_ACT_SENDMAILAWARD_CL;
		int qs = crossData.getObject(CrossRechargeRankActEnum.qs, Integer.class);
		List<RechargeRankActModel> awardList = crossData.getObject(CrossRechargeRankActEnum.awardList,
				new TypeReference<List<RechargeRankActModel>>() {
				}.getType());
		sendMailAward(awardList, qs);
	}

	/**
	 * 子服发奖励
	 * 
	 * @param awardList
	 * @param qs
	 */
	public void sendMailAward(List<RechargeRankActModel> awardList, int qs) {
		int size = awardList.size();
		if (size == 0) {
			return;
		}
		Map<Integer, Map<Integer, Struct_czph_755>> rankConfigMap = RechargeRankActSysCache.getRankConfigMap();
		Map<Integer, Struct_czph_755> map = rankConfigMap.get(qs);
		for (int i = 0; i < size; i++) {
			RechargeRankActModel rankModel = awardList.get(i);
			long hid = rankModel.getHid();
			Struct_czph_755 struct_czph_755 = map.get(rankModel.getRank());
			MailFunction.getIns().sendMailWithFujianData2(hid, MailConst.CROSS_RECHARGE_RANK_ACT_RANKAWARD,
					new Object[] { MailConst.CROSS_RECHARGE_RANK_ACT_RANKAWARD, rankModel.getRank() },
					struct_czph_755.getTips());
		}
	}

	/**
	 * 各个子服收到来自中央服更新的数据
	 * 
	 * @param channel
	 * @param crossData
	 */
	public void addNewQsDataFromCen(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_RECHARGE_RANK_ACT_SYNC_NEWQSDATA_CL;
		Integer qs = crossData.getObject(CrossRechargeRankActEnum.qs, Integer.class);
		if (qs != null) {
			RechargeRankActSysCache.setNewQs(qs);
			return;
		}
		RechargeRankActModel model = crossData.getObject(CrossRechargeRankActEnum.addUpdateRankModel,
				RechargeRankActModel.class);
		long hid = model.getHid();
		Map<Long, Integer[]> newQsDataMap = RechargeRankActSysCache.getNewQsDataMap();
		Integer[] integers = newQsDataMap.get(hid);
		if (integers == null) {
			int addTimes = model.getAddTimes();
			int reachTime = model.getReachTime();
			newQsDataMap.put(hid, new Integer[] { addTimes, reachTime });
		} else {
			int reachTime = integers[1];
			int addTimes = model.getAddTimes();
			if (model.getReachTime() - reachTime <= 10 * 3600) {
				integers[0] += addTimes;
				integers[1] = model.getReachTime();
			} else {
				integers[0] = addTimes;
				integers[1] = model.getReachTime();
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
		int cmd = CrossConst.CROSS_RECHARGE_RANK_ACT_GM_LC;
		CrossRechargeRankActSysCache.getCrossConsumeRankActCache().clear();
		Iterator<ConcurrentHashMap<Channel, List<Integer>>> iterator = CrossCache.getPchToZoneMap().values().iterator();
		for (; iterator.hasNext();) {
			ConcurrentHashMap<Channel, List<Integer>> map = iterator.next();
			for (Channel channel1 : map.keySet()) {
				NettyWrite.writeXData(channel1, CrossConst.CROSS_RECHARGE_RANK_ACT_GM_CL, crossData);
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
		int cmd = CrossConst.CROSS_RECHARGE_RANK_ACT_GM_CL;
		RechargeRankActSysCache.getRankTreeSet().clear();
		RechargeRankActSysCache.setOpenUIObjArray(null);
		// 删除区服所有玩家对应活动数据
		ActivityDao.getIns().deleteActGM(ActivitySysId.CROSS_RECHARGE_RANK_ACT);

		Map<Long, Hero> heroMap = HeroCache.getHeroMap();
		for (Hero hero : heroMap.values()) {
			boolean online = HeroFunction.getIns().isOnline(hero.getId());
			if (!online) {
				continue;
			}
			hero.setOneDayRecharge(0);
			Map<Integer, ActivityData> activityDataMap = hero.getHeroActivityData().getActivityDataMap();
			activityDataMap.remove(ActivitySysId.CROSS_RECHARGE_RANK_ACT);
			Map<Integer, ActivityInfo> activityMap = ActivitySysCache.getActivityMap();
			ActivityInfo activityInfo = activityMap.get(ActivitySysId.CROSS_RECHARGE_RANK_ACT);
			if (activityInfo != null) {
				// 活动在开，清空数据
				ActivityData activityData = RechargeRankActManager.getIns().getActivityData(hero, activityInfo);
				activityDataMap.put(ActivitySysId.CROSS_RECHARGE_RANK_ACT, activityData);
			}
		}
	}
}
