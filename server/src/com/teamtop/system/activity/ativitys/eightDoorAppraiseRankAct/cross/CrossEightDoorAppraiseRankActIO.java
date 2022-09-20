package com.teamtop.system.activity.ativitys.eightDoorAppraiseRankAct.cross;

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
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.synHandleCore.orderedRunnable.RankingOpTaskRunnable;
import com.teamtop.system.activity.ActivityDao;
import com.teamtop.system.activity.ActivitySysCache;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.eightDoorAppraiseRankAct.EightDoorAppraiseRankActConst;
import com.teamtop.system.activity.ativitys.eightDoorAppraiseRankAct.EightDoorAppraiseRankActManager;
import com.teamtop.system.activity.ativitys.eightDoorAppraiseRankAct.EightDoorAppraiseRankActSysCache;
import com.teamtop.system.activity.ativitys.eightDoorAppraiseRankAct.model.EightDoorAppraiseRankActModel;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.fashionClothes.FashionClothesManager;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroDao;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_pmhdsbdjcsb_326;
import excel.struct.Struct_wszwxsxspm_325;
import io.netty.channel.Channel;

public class CrossEightDoorAppraiseRankActIO {
	private static volatile CrossEightDoorAppraiseRankActIO ins = null;

	public static CrossEightDoorAppraiseRankActIO getIns() {
		if (ins == null) {
			synchronized (CrossEightDoorAppraiseRankActIO.class) {
				if (ins == null) {
					ins = new CrossEightDoorAppraiseRankActIO();
				}
			}
		}
		return ins;
	}

	private CrossEightDoorAppraiseRankActIO() {
	}

	/**
	 * 子服接收来自中央服的连接事件请求,获取排行数据
	 * 
	 * @param channel
	 * @param crossData
	 */
	@SuppressWarnings("unchecked")
	public void connEventFromCen(Channel channel, CrossData crossData) {
		int cmd = CrossConst.EIGHTDOOR_APPRAISERANK_ACT_CONNSENDRANK_CL;
		Type classType = new TypeReference<TreeSet<EightDoorAppraiseRankActModel>>() {
		}.getType();
		TreeSet<EightDoorAppraiseRankActModel> rankTreeSet = (TreeSet<EightDoorAppraiseRankActModel>) crossData
				.getObject(CrossEightDoorAppraiseRankActEnum.rankTreeSet, classType);
		EightDoorAppraiseRankActSysCache.setRankTreeSet(rankTreeSet);
		Integer qs = crossData.getObject(CrossEightDoorAppraiseRankActEnum.qs, Integer.class);
		createObjectArray(rankTreeSet, qs);
	}

	/**
	 * 增加更新排行榜数据(来自子服) 1为玩家消费更新，0为更改名字
	 * 
	 * @param channel
	 * @param crossData
	 */
	public void addUpdateRankFromLocal(Channel channel, CrossData crossData) {
		int cmd = CrossConst.EIGHTDOOR_APPRAISERANK_ACT_ADDUPDATERANK_LC;
		OpTaskExecutorService.PublicOrderService.execute(new RankingOpTaskRunnable() {
			@Override
			public void run() {
				EightDoorAppraiseRankActModel model = null;
				try {
					model = crossData.getObject(CrossEightDoorAppraiseRankActEnum.addUpdateRankModel,
							EightDoorAppraiseRankActModel.class);
					int appraiseTimes = model.getAppraiseTimes();
					if (appraiseTimes > 0) {
						int endTimeLocal = crossData.getObject(CrossEightDoorAppraiseRankActEnum.endTime,
								Integer.class);
						int endTimeCen = CrossEightDoorAppraiseRankActSysCache.getEndTime(channel);
						int currentTime = TimeDateUtil.getCurrentTime();
						model.setReachTime(currentTime);
						LogTool.info("CrossEightDoorAppraiseRankActIO addUpdateRankFromLocal endTimeLocal="
								+ endTimeLocal + ", endTimeCen=" + endTimeCen, this);
						if (endTimeLocal > endTimeCen && endTimeCen == 0) {
							CrossEightDoorAppraiseRankActSysCache.setEndTime(channel, endTimeLocal);
							int qsLocal = crossData.getObject(CrossEightDoorAppraiseRankActEnum.qs, Integer.class);
							CrossEightDoorAppraiseRankActSysCache.setQs(channel, qsLocal);
							TreeSet<EightDoorAppraiseRankActModel> rankTreeSet = CrossEightDoorAppraiseRankActSysCache
									.getRankTreeSet(channel);
							rankTreeSet.clear();
							// 发送临时数据到新一期排行列表里
							addTempRankAwardToRankList(channel);
							CrossEightDoorAppraiseRankActCL.getIns().addNewQsDataToLocal(channel, null);
						} else if (endTimeLocal != endTimeCen && endTimeCen != 0 || currentTime > endTimeLocal) {
							boolean isUpdateSuccess = false;
							isUpdateSuccess = endTimeLocal > endTimeCen && endTimeCen != 0;
							if (isUpdateSuccess || currentTime > endTimeLocal) {
								// 活动还未结算，新一期和往期超时的数据放到临时存储list里
								List<EightDoorAppraiseRankActModel> tempRankList = CrossEightDoorAppraiseRankActSysCache
										.getTempRankList(channel);
								tempRankList.add(model);
								// 写入日志
								LogTool.info(model.getHid(), model.getName(),
										"CrossEightDoorAppraiseRankActIO addUpdateRankFromLocal tempRankList appraiseTimes:"
												+ model.getAppraiseTimes() + " addTimes" + model.getAddTimes(),
										this);
							} else {
								// 已经切换到新的活动，但发过来的还是旧的数据
								TreeSet<EightDoorAppraiseRankActModel> rankTreeSet = CrossEightDoorAppraiseRankActSysCache
										.getRankTreeSet(channel);
								boolean isRefreshRank = refreshRank(rankTreeSet, model);
								if (isRefreshRank) {
									CrossEightDoorAppraiseRankActCL.getIns().addUpdateRankToLocal(channel, model);
								}
								LogTool.info(model.getHid(), model.getName(),
										"CrossEightDoorAppraiseRankActIO addUpdateRankFromLocal qs < crossQs && endTimeCen != 0 appraiseTimes:"
												+ model.getAppraiseTimes() + " addTimes" + model.getAddTimes(),
										this);
							}
							crossData.finishGet();
							// 活动还未结算，新一期数据可以更新成功，往期超时的数据更新失败
							crossData.putObject(CrossEightDoorAppraiseRankActEnum.isUpdateSuccess, isUpdateSuccess);
							NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
							if (!isUpdateSuccess) {
								CrossEightDoorAppraiseRankActCL.getIns().addNewQsDataToLocal(channel, model);
							}
							return;
						}
					}
					TreeSet<EightDoorAppraiseRankActModel> rankTreeSet = CrossEightDoorAppraiseRankActSysCache
							.getRankTreeSet(channel);
					boolean isRefreshRank = refreshRank(rankTreeSet, model);
					if (isRefreshRank) {
						CrossEightDoorAppraiseRankActCL.getIns().addUpdateRankToLocal(channel, model);
					}
					crossData.finishGet();
					crossData.putObject(CrossEightDoorAppraiseRankActEnum.isUpdateSuccess, true);
					NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
				} catch (Exception e) {
					// TODO: handle exception
					if (model == null)

					{
						LogTool.error(e, this, "CrossEightDoorAppraiseRankActIO addUpdateRankFromLocal");
					} else {
						LogTool.error(e, this,
								"CrossEightDoorAppraiseRankActIO addUpdateRankFromLocal hid:" + model.getHid()
										+ " name:" + model.getName() + " appraiseTimes:" + model.getAppraiseTimes()
										+ " addTimes:" + model.getAddTimes());
					}
					crossData.finishGet();
					crossData.putObject(CrossEightDoorAppraiseRankActEnum.isUpdateSuccess, false);
					NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
				}
			}

			@Override
			public Object getSession() {
				// TODO Auto-generated method stub
				return OpTaskConst.EIGHTDOOR_APPRAISERANK_ACT;
			}

		});

	}

	/**
	 * 更新排行数据
	 * 
	 * @param rankTreeSet
	 * @param addModel
	 */
	public boolean refreshRank(TreeSet<EightDoorAppraiseRankActModel> rankTreeSet,
			EightDoorAppraiseRankActModel addModel) {
		Iterator<EightDoorAppraiseRankActModel> iterator = rankTreeSet.iterator();
		while (iterator.hasNext()) {
			EightDoorAppraiseRankActModel rankTreeModel = iterator.next();
			if (rankTreeModel.getHid() == addModel.getHid()) {
				if (addModel.getAppraiseTimes() == 0) {
					// 改名,头像id，头像框，国家，vip等级
					rankTreeModel.setName(addModel.getName());
					rankTreeModel.setJob(addModel.getJob());
					rankTreeModel.setBodyId(addModel.getBodyId());
					rankTreeModel.setIcon(addModel.getIcon());
					rankTreeModel.setFrame(addModel.getFrame());
					rankTreeModel.setCountryType(addModel.getCountryType());
					rankTreeModel.setVipLv(addModel.getVipLv());
					return true;
				}
				if (addModel.getAppraiseTimes() < rankTreeModel.getAppraiseTimes()) {
					// 增加的比排行里的鉴定次数少,异常情况
					return false;
				}
				iterator.remove();
				rankTreeSet.add(addModel);
				return true;
			}
		}
		if (addModel.getAppraiseTimes() == 0) {
			return false;
		}

		if (rankTreeSet.size() >= EightDoorAppraiseRankActConst.RANKMAXNUM) {
			EightDoorAppraiseRankActModel lastModel = rankTreeSet.last();
			if (addModel.getAppraiseTimes() <= lastModel.getAppraiseTimes()) {
				return false;
			}
			rankTreeSet.remove(lastModel);
		}
		rankTreeSet.add(addModel);
		return true;
	}

	public void createObjectArray(TreeSet<EightDoorAppraiseRankActModel> rankTreeSet, int qs) {
		if (rankTreeSet.size() <= 0 || qs == 0) {
			return;
		}
		List<Object[]> rankList = new ArrayList<>();
		List<Object[]> secordThirdList = new ArrayList<>();
		int i = 1;
		for (EightDoorAppraiseRankActModel rankModel : rankTreeSet) {
			rankModel.setRank(i);
			rankList.add(new Object[] { i, rankModel.getName(), rankModel.getAppraiseTimes() });
			if (i == 2 || i == 3) {
				secordThirdList.add(new Object[] { rankModel.getIcon(), rankModel.getFrame(),
						rankModel.getCountryType(), rankModel.getVipLv() });
			}
			i++;
		}
		EightDoorAppraiseRankActSysCache.setRankObjArray(rankList.toArray());
		EightDoorAppraiseRankActSysCache.setSecordThirdObjArray(secordThirdList.toArray());
		EightDoorAppraiseRankActModel firstModel = rankTreeSet.first();
		int firstBodyid = FashionClothesManager.getIns().getBodyid(firstModel.getJob(), firstModel.getBodyId());
		EightDoorAppraiseRankActSysCache.setFirstBodyId(firstBodyid);
	}

	/**
	 * 各个子服收到来自中央服更新的数据
	 * 
	 * @param channel
	 * @param crossData
	 */
	public void addUpdateRankFromCen(Channel channel, CrossData crossData) {
		int cmd = CrossConst.EIGHTDOOR_APPRAISERANK_ACT_ADDUPDATERANK_CL;
		OpTaskExecutorService.PublicOrderService.execute(new RankingOpTaskRunnable() {
			@Override
			public void run() {
				EightDoorAppraiseRankActModel addModel = null;
				try {
					TreeSet<EightDoorAppraiseRankActModel> rankTreeSet = EightDoorAppraiseRankActSysCache
							.getRankTreeSet();
					addModel = crossData.getObject(CrossEightDoorAppraiseRankActEnum.addUpdateRankModel,
							EightDoorAppraiseRankActModel.class);
					refreshRank(rankTreeSet, addModel);
					Integer qs = crossData.getObject(CrossEightDoorAppraiseRankActEnum.qs, Integer.class);
					createObjectArray(rankTreeSet, qs);
				} catch (Exception e) {
					// TODO: handle exception
					if (addModel == null)

					{
						LogTool.error(e, this, "CrossEightDoorAppraiseRankActIO addUpdateRankFromCen");
					} else {
						LogTool.error(e, this,
								"CrossEightDoorAppraiseRankActIO addUpdateRankFromCen hid:" + addModel.getHid()
										+ " name:" + addModel.getName() + " appraiseTimes:"
										+ addModel.getAppraiseTimes());
					}
				}
			}

			@Override
			public Object getSession() {
				// TODO Auto-generated method stub
				return OpTaskConst.EIGHTDOOR_APPRAISERANK_ACT;
			}
		});

	}

	/**
	 * 发送临时存储排行到新一期
	 */
	public void addTempRankAwardToRankList(Channel channel) {
		try {
			List<EightDoorAppraiseRankActModel> tempRankList = CrossEightDoorAppraiseRankActSysCache
					.getTempRankList(channel);
			if (tempRankList.size() <= 0) {
				return;
			}
			Map<Long, EightDoorAppraiseRankActModel> hidMap = new HashMap<>();
			for (int i = 0; i < tempRankList.size(); i++) {
				EightDoorAppraiseRankActModel tempRankModel = tempRankList.get(i);
				long hid = tempRankModel.getHid();
				EightDoorAppraiseRankActModel hidMapModel = hidMap.get(hid);
				if (hidMapModel == null) {
					int addTimes = tempRankModel.getAddTimes();
					tempRankModel.setAppraiseTimes(addTimes);
					hidMap.put(hid, tempRankModel);
				} else {
					int appraiseTimes = hidMapModel.getAppraiseTimes();
					int addTimes = hidMapModel.getAddTimes();
					hidMapModel.setAppraiseTimes(appraiseTimes + addTimes);
				}

			}
			TreeSet<EightDoorAppraiseRankActModel> rankTreeSet = CrossEightDoorAppraiseRankActSysCache
					.getRankTreeSet(channel);
			for (EightDoorAppraiseRankActModel hidMapModel : hidMap.values()) {
				// 写入日志
				LogTool.info(hidMapModel.getHid(), hidMapModel.getName(),
						"CrossEightDoorAppraiseRankActIO addTempRankAwardToRankList appraiseTimes:"
								+ hidMapModel.getAppraiseTimes(),
						this);
				boolean isRefreshRank = refreshRank(rankTreeSet, hidMapModel);
				if (isRefreshRank) {
					CrossEightDoorAppraiseRankActCL.getIns().addUpdateRankToLocal(channel, hidMapModel);
				}
			}
			tempRankList.clear();
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, "CrossEightDoorAppraiseRankActIO addTempRankAwardToRankList");
		}
	}

	/**
	 * 子服接收来自中央服发送的邮件奖励结算
	 * 
	 * @param hero
	 */
	public void sendMailAwardFromCen(Channel channel, CrossData crossData) {
		int cmd = CrossConst.EIGHTDOOR_APPRAISERANK_ACT_SENDMAILAWARD_CL;
		int qs = crossData.getObject(CrossEightDoorAppraiseRankActEnum.qs, Integer.class);
		List<EightDoorAppraiseRankActModel> awardList = crossData.getObject(CrossEightDoorAppraiseRankActEnum.awardList,
				new TypeReference<List<EightDoorAppraiseRankActModel>>() {
				}.getType());
		Map<Integer, Struct_wszwxsxspm_325> rankConfigMap = EightDoorAppraiseRankActSysCache.getRankConfigMap().get(qs);
		int bigAwardMinTimes = Config_pmhdsbdjcsb_326.getIns().get(ActivitySysId.EIGHTDOOR_APPRAISERANK_ACT).getDj();
		int size = awardList.size();
		for (int i = 0; i < size; i++) {
			EightDoorAppraiseRankActModel awardModel = awardList.get(i);
			long hid = 0;
			int rank = 0;
			int appraiseTime = 0;
			try {
				hid = awardModel.getHid();
				rank = awardModel.getRank();
				appraiseTime = awardModel.getAppraiseTimes();
				if (!GameProperties.zoneids.contains(CommonUtil.getZoneIdById(hid))) {
					LogTool.warn("CrossEightDoorAppraiseRankIO sendMailAwardToLocal hid:" + hid + " rank:" + rank
							+ " appraiseTime:" + appraiseTime, this);
					return;
				}
				Struct_wszwxsxspm_325 struct_wszwxsxspm_325 = rankConfigMap.get(rank);
				int[][] reward = struct_wszwxsxspm_325.getReward();
				// 邮件发放排名奖励
				MailFunction.getIns().sendMailWithFujianData2(hid, MailConst.EIGHTDOOR_APPRAISERANK_ACT_RANDAWARD,
						new Object[] { MailConst.EIGHTDOOR_APPRAISERANK_ACT_RANDAWARD, rank }, reward);
				if (appraiseTime >= bigAwardMinTimes) {
					// 邮件发放大奖奖励
					int[][] bigReward = struct_wszwxsxspm_325.getReward1();
					if (bigReward != null) {
						MailFunction.getIns().sendMailWithFujianData2(hid,
								MailConst.EIGHTDOOR_APPRAISERANK_ACT_BIGAWARD,
								new Object[] { MailConst.EIGHTDOOR_APPRAISERANK_ACT_BIGAWARD, rank }, bigReward);
					}
				}
			} catch (Exception e) {
				// TODO: handle exception
				LogTool.error(e, this, "CrossEightDoorAppraiseRankActIO sendRankAward" + " hid" + hid + " rank:" + rank
						+ " appraiseTime:" + appraiseTime);
			}
		}
	}

	/**
	 * 各个子服收到来自中央服更新的数据
	 * 
	 * @param channel
	 * @param crossData
	 */
	public void addNewQsDataFromCen(Channel channel, CrossData crossData) {
		int cmd = CrossConst.EIGHTDOOR_APPRAISERANK_ACT_SYNC_NEWQSDATA_CL;
		Integer qs = crossData.getObject(CrossEightDoorAppraiseRankActEnum.qs, Integer.class);
		if (qs != null) {
			EightDoorAppraiseRankActSysCache.setNewQs(qs);
			return;
		}
		EightDoorAppraiseRankActModel model = crossData.getObject(CrossEightDoorAppraiseRankActEnum.addUpdateRankModel,
				EightDoorAppraiseRankActModel.class);
		long hid = model.getHid();
		Map<Long, Integer[]> newQsDataMap = EightDoorAppraiseRankActSysCache.getNewQsDataMap();
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
		int cmd = CrossConst.EIGHTDOOR_APPRAISERANK_ACT_GM_LC;
		CrossEightDoorAppraiseRankActSysCache.getCrossCache().clear();
		Iterator<ConcurrentHashMap<Channel, List<Integer>>> iterator = CrossCache.getPchToZoneMap().values().iterator();
		for (; iterator.hasNext();) {
			ConcurrentHashMap<Channel, List<Integer>> map = iterator.next();
			for (Channel channel1 : map.keySet()) {
				NettyWrite.writeXData(channel1, CrossConst.EIGHTDOOR_APPRAISERANK_ACT_GM_CL, crossData);
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
		int cmd = CrossConst.EIGHTDOOR_APPRAISERANK_ACT_GM_CL;
		EightDoorAppraiseRankActSysCache.getRankTreeSet().clear();
		EightDoorAppraiseRankActSysCache.setRankObjArray(null);
		EightDoorAppraiseRankActSysCache.setSecordThirdObjArray(null);
		EightDoorAppraiseRankActSysCache.setFirstBodyId(0);
		// 删除区服所有玩家对应活动数据
		ActivityDao.getIns().deleteActGM(ActivitySysId.EIGHTDOOR_APPRAISERANK_ACT);
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
			if (activityDataMap.containsKey(ActivitySysId.EIGHTDOOR_APPRAISERANK_ACT)) {
				System.out.println();
			}
			activityDataMap.remove(ActivitySysId.EIGHTDOOR_APPRAISERANK_ACT);
			Map<Integer, ActivityInfo> activityMap = ActivitySysCache.getActivityMap();
			ActivityInfo activityInfo = activityMap.get(ActivitySysId.EIGHTDOOR_APPRAISERANK_ACT);
			if (activityInfo != null) {
				// 活动在开，清空数据
				ActivityData activityData = EightDoorAppraiseRankActManager.getIns().getActivityData(hero,
						activityInfo);
				activityDataMap.put(ActivitySysId.CROSS_RECHARGE_RANK_ACT, activityData);
			}
		}
	}
}
