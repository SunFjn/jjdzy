package com.teamtop.system.activity.ativitys.godGenSendGiftAct.cross;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.concurrent.ConcurrentHashMap;

import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.synHandleCore.orderedRunnable.RankingOpTaskRunnable;
import com.teamtop.system.activity.ativitys.godGenSendGiftAct.GodGenSendGiftActCache;
import com.teamtop.system.activity.ativitys.godGenSendGiftAct.GodGenSendGiftActConst;
import com.teamtop.system.activity.ativitys.godGenSendGiftAct.GodGenSendGiftActFunction;
import com.teamtop.system.activity.ativitys.godGenSendGiftAct.cross.model.CrossGodGenSendGiftCache;
import com.teamtop.system.activity.ativitys.godGenSendGiftAct.cross.model.CrossLastGodGenSendGiftCache;
import com.teamtop.system.activity.ativitys.godGenSendGiftAct.model.GodGenSendGiftActRankModel;
import com.teamtop.system.global.GlobalCache;
import com.teamtop.system.global.GlobalConst;
import com.teamtop.system.global.GlobalData;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.db.trans.ObjStrTransUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_xtcs_004;
import excel.struct.Struct_cbgrank2_729;
import io.netty.channel.Channel;

public class CrossGodGenSendGiftActIO {
	private static CrossGodGenSendGiftActIO ins = null;

	public static CrossGodGenSendGiftActIO getIns() {
		if (ins == null) {
			ins = new CrossGodGenSendGiftActIO();
		}
		return ins;
	}

	private CrossGodGenSendGiftActIO() {
	}

	/**
	 * ????????????????????????????????????????????????,??????????????????
	 * 
	 * @param channel
	 * @param crossData
	 */
	@SuppressWarnings("unchecked")
	public void getRankListFromCen(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_GODGENSENDGIFT_CONN_CL;
		int partId = CrossCache.getlocalPartId();
		Type classType = new TypeReference<List<GodGenSendGiftActRankModel>>() {
		}.getType();
		List<GodGenSendGiftActRankModel> rankList = (List<GodGenSendGiftActRankModel>) crossData
				.getObject(CrossGodGenSendGiftActEnum.rankList, classType);
		CrossLastGodGenSendGiftCache lastCache = crossData.getObject(CrossGodGenSendGiftActEnum.lastCache,
				CrossLastGodGenSendGiftCache.class);
		GodGenSendGiftActCache.setRankList(rankList);
		GodGenSendGiftActCache.setLastRankList(lastCache.getLastRankList(partId));
		GodGenSendGiftActCache.setLastQs(lastCache.getLastQs(partId));
	}

	/**
	 * ???????????????????????????(????????????) 1????????????????????????0???????????????
	 * 
	 * @param channel
	 * @param crossData
	 */
	public void addUpdateRankFromLocal(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_GODGENSENDGIFT_ADDUPDATERANK_LC;
		int partId = CrossCache.getPartId(channel);
		Integer nowEndTimeLocal = crossData.getObject(CrossGodGenSendGiftActEnum.endTime, Integer.class);
		Integer nowEndTimeCen = CrossGodGenSendGiftActCache.getEndTime(partId);
		if (nowEndTimeCen != null) {
			int qs = crossData.getObject(CrossGodGenSendGiftActEnum.qs, Integer.class);
			int crossQs = CrossGodGenSendGiftActCache.getQs(partId);
			if (nowEndTimeCen == 1593619199||(crossQs==4&&qs==5)) {
				CrossGodGenSendGiftActCache.setEndTime(partId, nowEndTimeLocal);
				CrossGodGenSendGiftActCache.setQs(qs, partId);
				LogTool.info("CrossGodGenSendGiftActIO nowEndTimeCen=" + nowEndTimeCen, CrossGodGenSendGiftActIO.class);
			}
		}
		OpTaskExecutorService.PublicOrderService.execute(new RankingOpTaskRunnable() {
			@Override
			public void run() {
				GodGenSendGiftActRankModel model = null;
				try {
					int type = crossData.getObject(CrossGodGenSendGiftActEnum.type, Integer.class);
					if (type == 1) {
						int qs = crossData.getObject(CrossGodGenSendGiftActEnum.qs, Integer.class);
						int crossQs = CrossGodGenSendGiftActCache.getQs(partId);
						int endTimeLocal = crossData.getObject(CrossGodGenSendGiftActEnum.endTime, Integer.class);
						Integer endTimeCen = CrossGodGenSendGiftActCache.getEndTime(partId);
						if (endTimeCen == null) {
							endTimeCen = 0;
						}
						int currentTime = TimeDateUtil.getCurrentTime();
						// ??????????????????????????????????????????0????????????????????????????????????????????????????????????????????????????????????0??????????????????????????????????????????????????????????????????0
//						if (qs == crossQs && endTimeCen == 0) {
//							CrossGodGenSendGiftActCache.setEndTime(partId, endTimeLocal);
//						}
						LogTool.info("addUpdateRankFromLocal qs=" + qs + ", crossQs=" + crossQs + ", endTimeLocal="
								+ endTimeLocal + ", endTimeCen=" + endTimeCen, this);
						if (qs != crossQs && endTimeCen == 0) {
							// ????????????
							LogTool.info("addUpdateRankFromLocal qs is not equal qs:" + qs + " crossQs:" + crossQs,
									this);
							CrossGodGenSendGiftActCache.setQs(qs, partId);
							List<GodGenSendGiftActRankModel> rankList = CrossGodGenSendGiftActCache.getRankList(partId);
							if (rankList == null) {
								rankList = new ArrayList<>();
								CrossGodGenSendGiftActCache.setRankList(partId, rankList);
							}
							rankList.clear();
							// ?????????????????????????????????????????????
							addTempRankAwardToRankList(partId);
							CrossGodGenSendGiftActCache.setEndTime(partId, endTimeLocal);
							CrossGodGenSendGiftActCL.getIns().addNewQsDataToLocal(null, partId);
						} else if (qs != crossQs && endTimeCen != 0 || currentTime > endTimeLocal) {
							boolean isUpdateSuccess = false;
							isUpdateSuccess = qs > crossQs && endTimeCen != 0;
							model = crossData.getObject(CrossGodGenSendGiftActEnum.addUpdateRankModel,
									GodGenSendGiftActRankModel.class);
							if (isUpdateSuccess || currentTime > endTimeLocal) {
								// ????????????????????????????????????????????????????????????????????????list???
								List<GodGenSendGiftActRankModel> tempRankList = CrossGodGenSendGiftActCache
										.getTempRankList(partId);
								if (tempRankList == null) {
									tempRankList = new ArrayList<>();
									CrossGodGenSendGiftActCache.setTempRankList(partId, tempRankList);
								}
								tempRankList.add(model);
								// ????????????
								LogTool.info(model.getHid(), model.getName(),
										"addUpdateRankFromLocal tempRankList totalTimes:" + model.getTotalTimes()
												+ " addTimes" + model.getAddTimes(),
										this);
							} else {
								// ???????????????????????????????????????????????????????????????
								GodGenSendGiftActFunction.getIns().refreshRankList(1, model, partId);
								CrossGodGenSendGiftActCL.getIns().addUpdateRankToLocal(model, 1);
								LogTool.info(model.getHid(), model.getName(),
										"addUpdateRankFromLocal qs < crossQs && endTimeCen != 0 totalTimes:"
												+ model.getTotalTimes() + " addTimes" + model.getAddTimes(),
										this);
							}
							crossData.finishGet();
							// ??????????????????????????????????????????????????????????????????????????????????????????
							crossData.putObject(CrossGodGenSendGiftActEnum.isUpdateSuccess, isUpdateSuccess);
							NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
							if (!isUpdateSuccess) {
								CrossGodGenSendGiftActCL.getIns().addNewQsDataToLocal(model, 0);
							}
							return;
						}
					}
					model = crossData.getObject(CrossGodGenSendGiftActEnum.addUpdateRankModel,
							GodGenSendGiftActRankModel.class);
					GodGenSendGiftActFunction.getIns().refreshRankList(type, model, partId);
					CrossGodGenSendGiftActCL.getIns().addUpdateRankToLocal(model, type);
					crossData.finishGet();
					crossData.putObject(CrossGodGenSendGiftActEnum.isUpdateSuccess, true);
					NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
				} catch (Exception e) {
					// TODO: handle exception
					if (model == null)

					{
						LogTool.error(e, this, "CrossGodGenSendGiftActIO  addUpdateRankFromLocal");
					} else {
						LogTool.error(e, this,
								"CrossGodGenSendGiftActIO  addUpdateRankFromLocal hid:" + model.getHid() + " name:"
										+ model.getName() + " totalTimes" + model.getTotalTimes() + " addTimes"
										+ model.getAddTimes());
					}
					crossData.finishGet();
					crossData.putObject(CrossGodGenSendGiftActEnum.isUpdateSuccess, false);
					NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
				}
			}

			@Override
			public Object getSession() {
				// TODO Auto-generated method stub
				return OpTaskConst.GODGENSENDGIFT_RANK;
			}

		});

	}

	/**
	 * ????????????????????????????????????????????????
	 * 
	 * @param channel
	 * @param crossData
	 */
	public void addUpdateRankFromCen(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_GODGENSENDGIFT_ADDUPDATERANK_CL;
		OpTaskExecutorService.PublicOrderService.execute(new RankingOpTaskRunnable() {
			@Override
			public void run() {
				int type = crossData.getObject(CrossGodGenSendGiftActEnum.type, Integer.class);
				GodGenSendGiftActRankModel model = crossData.getObject(CrossGodGenSendGiftActEnum.addUpdateRankModel,
						GodGenSendGiftActRankModel.class);
				int partId = CrossCache.getlocalPartId();
				GodGenSendGiftActFunction.getIns().refreshRankList(type, model, partId);
			}

			@Override
			public Object getSession() {
				// TODO Auto-generated method stub
				return OpTaskConst.GODGENSENDGIFT_RANK;
			}

		});

	}

	/**
	 * ??????????????????????????????????????????
	 * 
	 * @param hero
	 */
	public void sendMailAwardToLocal(int partId) {
		OpTaskExecutorService.PublicOrderService.execute(new RankingOpTaskRunnable() {
			@Override
			public void run() {
				try {
					// ?????????????????????????????????????????????
					intoDB();
					ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, Channel>> zoneidToChannelMap = CrossCache
							.getZoneidToChannelMap();
					List<GodGenSendGiftActRankModel> rankList = CrossGodGenSendGiftActCache.getRankList(partId);
					if (rankList == null) {
						return;
					}
					Map<Integer, List<GodGenSendGiftActRankModel>> awardListMap = new HashMap<>();
					ConcurrentHashMap<Integer, Channel> zoneidToChannel = zoneidToChannelMap.get(partId);
					// ???????????????????????????
					for (int i = 0; i < rankList.size(); i++) {
						GodGenSendGiftActRankModel rankModel = rankList.get(i);
						long hid = rankModel.getHid();
						int zid = CommonUtil.getZoneIdById(hid);
						List<GodGenSendGiftActRankModel> awardList = awardListMap.get(zid);
						if (awardList == null) {
							awardList = new ArrayList<>();
							awardListMap.put(zid, awardList);
						}
						// ????????????
						rankModel.setRank(i + 1);
						awardList.add(rankModel);
						// ????????????
						LogTool.info(hid, rankModel.getName(), " zoneid:" + zid + " rank:" + rankModel.getRank()
								+ " totalTimes:" + rankModel.getTotalTimes(), this);
					}
					int qs = CrossGodGenSendGiftActCache.getQs(partId);
					// ????????????????????????
					for (Entry<Integer, List<GodGenSendGiftActRankModel>> entry : awardListMap.entrySet()) {
						Integer zoneid = entry.getKey();
						Channel localChannel = zoneidToChannel.get(zoneid);
						CrossData crossDataToLocal = new CrossData();
						List<GodGenSendGiftActRankModel> awardList = entry.getValue();
						crossDataToLocal.putObject(CrossGodGenSendGiftActEnum.awardList, awardList);
						crossDataToLocal.putObject(CrossGodGenSendGiftActEnum.qs, qs);
						NettyWrite.writeXData(localChannel, CrossConst.CROSS_GODGENSENDGIFT_SENDMAILAWARD_CL,
								crossDataToLocal);
					}
					CrossGodGenSendGiftActCache.setEndTime(partId, 0);
					// ??????????????????
					List<GodGenSendGiftActRankModel> lastList = new ArrayList<>(rankList);
					List<GodGenSendGiftActRankModel> lastRankList = CrossGodGenSendGiftActCache.getLastRankList(partId);
					if (lastRankList != null) {
						lastRankList.clear();
					}
					CrossGodGenSendGiftActCache.setLastRankList(lastList, partId);
					// ???????????????
					rankList.clear();
					CrossGodGenSendGiftActCache.setLastQs(qs, partId);
					// ??????????????????????????????????????????????????????
					CrossGodGenSendGiftActCL.getIns().sendLastRankList();
				} catch (Exception e) {
					LogTool.error(e, CrossGodGenSendGiftActIO.class, "sendMailAwardFromLocal");
				}
			}

			@Override
			public Object getSession() {
				// TODO Auto-generated method stub
				return OpTaskConst.GODGENSENDGIFT_RANK;
			}

		});
	}

	/**
	 * ?????????????????????????????????????????????
	 */
	public void intoDB() {
		String cacheStr = null;
		try {
			GlobalData globalDataRankData = GlobalCache.getGlobalData(GlobalConst.GODGENSENDGIFT_ACT_RANKLIST);
			CrossGodGenSendGiftCache crossGodGenSendGiftCache = CrossGodGenSendGiftActCache
					.getCrossGodGenSendGiftCache();
			cacheStr = ObjStrTransUtil.toStr(crossGodGenSendGiftCache);
			globalDataRankData.setContent(cacheStr);
			GlobalCache.doSync(globalDataRankData);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, "CrossGodGenSendGiftActCache shutdownServer has wrong cacheStr:" + cacheStr);
		}
	}

	/**
	 * ????????????????????????????????????
	 */
	public void addTempRankAwardToRankList(int partId) {
		try {
			List<GodGenSendGiftActRankModel> tempRankList = CrossGodGenSendGiftActCache.getTempRankList(partId);
			if (tempRankList == null) {
				tempRankList = new ArrayList<>();
				CrossGodGenSendGiftActCache.setTempRankList(partId, tempRankList);
			}
			if (tempRankList.size() <= 0) {
				return;
			}
			Map<Long, GodGenSendGiftActRankModel> hidMap = new HashMap<>();
			for (int i = 0; i < tempRankList.size(); i++) {
				GodGenSendGiftActRankModel tempRankModel = tempRankList.get(i);
				long hid = tempRankModel.getHid();
				GodGenSendGiftActRankModel hidMapModel = hidMap.get(hid);
				if (hidMapModel == null) {
					int addTimes = tempRankModel.getAddTimes();
					tempRankModel.setTotalTimes(addTimes);
					hidMap.put(hid, tempRankModel);
				} else {
					int totalTimes = hidMapModel.getTotalTimes();
					int addTimes = hidMapModel.getAddTimes();
					hidMapModel.setTotalTimes(totalTimes + addTimes);
				}

			}
			for (GodGenSendGiftActRankModel hidMapModel : hidMap.values()) {
				// ????????????
				LogTool.info(hidMapModel.getHid(), hidMapModel.getName(),
						"sendTempRankAward totalTimes:" + hidMapModel.getTotalTimes(), this);
				GodGenSendGiftActFunction.getIns().refreshRankList(1, hidMapModel, partId);
				CrossGodGenSendGiftActCL.getIns().addUpdateRankToLocal(hidMapModel, 1);
			}
			tempRankList.clear();
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, CrossGodGenSendGiftActIO.class, "sendTempRankAward");
		}
	}

	/**
	 * ??????????????????????????????????????????????????????
	 * 
	 * @param hero
	 */
	public void sendMailAwardFromCen(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_GODGENSENDGIFT_SENDMAILAWARD_CL;
		int qs = crossData.getObject(CrossGodGenSendGiftActEnum.qs, Integer.class);
		List<GodGenSendGiftActRankModel> awardList = crossData.getObject(CrossGodGenSendGiftActEnum.awardList,
				new TypeReference<List<GodGenSendGiftActRankModel>>() {
				}.getType());
		sendMailAward(awardList, qs);
	}

	/**
	 * ???????????????
	 * 
	 * @param awardList
	 * @param qs
	 */
	public void sendMailAward(List<GodGenSendGiftActRankModel> awardList, int qs) {
		int size = awardList.size();
		if (size == 0) {
			return;
		}
		int numLimit = Config_xtcs_004.getIns().get(GodGenSendGiftActConst.SPECIAL_AWARD).getNum();
		Map<Integer, Map<Integer, Struct_cbgrank2_729>> config = GodGenSendGiftActCache.getRankConfigMap();
		Map<Integer, Struct_cbgrank2_729> map = config.get(qs);
		for (int i = 1; i <= size; i++) {
			GodGenSendGiftActRankModel rankModel = awardList.get(i - 1);
			long hid = rankModel.getHid();
			Struct_cbgrank2_729 struct_cbgrank2_729 = map.get(rankModel.getRank());
			MailFunction.getIns().sendMailWithFujianData2(hid, MailConst.GODGENSENDGIFT_RANKAWARD,
					new Object[] { MailConst.GODGENSENDGIFT_RANKAWARD, rankModel.getRank() },
					struct_cbgrank2_729.getReward1());
			int totalTimes = rankModel.getTotalTimes();
			if (totalTimes >= numLimit) {
				MailFunction.getIns().sendMailWithFujianData2(hid, MailConst.GODGENSENDGIFT_SPECIALAWARD,
						new Object[] { MailConst.GODGENSENDGIFT_SPECIALAWARD }, struct_cbgrank2_729.getReward2());
			}
		}
	}

	/**
	 * ???????????????????????????????????????????????????
	 * 
	 * @param channel
	 * @param crossData
	 */
	@SuppressWarnings("unchecked")
	public void getLastRankListFromCen(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_GODGENSENDGIFT_SENDLASTRANKLIST_CL;
		int partId = CrossCache.getlocalPartId();
		CrossLastGodGenSendGiftCache lastCache = crossData.getObject(CrossGodGenSendGiftActEnum.lastCache,
				CrossLastGodGenSendGiftCache.class);
		GodGenSendGiftActCache.setLastRankList(lastCache.getLastRankList(partId));
		GodGenSendGiftActCache.setLastQs(lastCache.getLastQs(partId));
	}

	/**
	 * ?????????????????????????????????????????????
	 * 
	 * @param channel
	 * @param crossData
	 */
	@SuppressWarnings("unchecked")
	public void getRankListDataFromCen(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_GODGENSENDGIFT_SENDRANKLIST_CL;
		Type classType = new TypeReference<List<GodGenSendGiftActRankModel>>() {
		}.getType();
		List<GodGenSendGiftActRankModel> rankList = crossData.getObject(CrossGodGenSendGiftActEnum.rankList, classType);
		OpTaskExecutorService.PublicOrderService.execute(new RankingOpTaskRunnable() {
			@Override
			public void run() {
				GodGenSendGiftActCache.setRankList(rankList);
			}

			@Override
			public Object getSession() {
				// TODO Auto-generated method stub
				return OpTaskConst.GODGENSENDGIFT_RANK;
			}

		});
	}

	/**
	 * ????????????????????????????????????????????????
	 * 
	 * @param channel
	 * @param crossData
	 */
	public void addNewQsDataFromCen(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_GODGENSENDGIFT_SYNC_NEWQSDATA_CL;
		Integer qs = crossData.getObject(CrossGodGenSendGiftActEnum.qs, Integer.class);
		if (qs != null) {
			GodGenSendGiftActCache.setNewQs(qs);
			return;
		}
		GodGenSendGiftActRankModel model = crossData.getObject(CrossGodGenSendGiftActEnum.addUpdateRankModel,
				GodGenSendGiftActRankModel.class);
		long hid = model.getHid();
		Map<Long, Integer[]> newQsDataMap = GodGenSendGiftActCache.getNewQsDataMap();
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
}
