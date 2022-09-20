package com.teamtop.system.eightDoorAppraiseRank.cross;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.TreeSet;
import java.util.concurrent.ConcurrentHashMap;

import com.alibaba.fastjson.JSON;
import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.callback.Callback;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.synHandleCore.orderedRunnable.RankingOpTaskRunnable;
import com.teamtop.system.eightDoorAppraiseRank.EightDoorAppraiseRankFunction;
import com.teamtop.system.eightDoorAppraiseRank.cross.model.CrossEightDoorAppraiseRankCache;
import com.teamtop.system.eightDoorAppraiseRank.cross.model.CrossEightDoorAppraiseRankModel;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_hdfl_012;
import excel.struct.Struct_hdfl_012;
import io.netty.channel.Channel;

public class CrossEightDoorAppraiseRankCL {
	private static volatile CrossEightDoorAppraiseRankCL ins = null;

	public static CrossEightDoorAppraiseRankCL getIns() {
		if (ins == null) {
			synchronized (CrossEightDoorAppraiseRankCL.class) {
				if (ins == null) {
					ins = new CrossEightDoorAppraiseRankCL();
				}
			}
		}
		return ins;
	}

	private CrossEightDoorAppraiseRankCL() {
	}

	/**
	 * 子服联接中央服成功 发送排行和活动开始结束时间
	 * 
	 * @param channel
	 */
	public void connEvent(Channel channel, boolean isConnEvent) {
		OpTaskExecutorService.PublicOrderService.execute(new RankingOpTaskRunnable() {
			@Override
			public void run() {
				Integer zoneid = 0;
				try {
					CrossData crossData = new CrossData();
					TreeSet<CrossEightDoorAppraiseRankModel> rankTreeSet = CrossEightDoorAppraiseRankSysCache
							.getRankTreeSet(channel);
					int size = rankTreeSet.size();
					if (size > 0) {
						crossData.putObject(CrossEightDoorAppraiseRankEnum.rankTreeSet, rankTreeSet);
					}
					int beginTime = CrossEightDoorAppraiseRankSysCache.getBeginTime(channel);
					crossData.putObject(CrossEightDoorAppraiseRankEnum.beginTime, beginTime);
					int endTime = CrossEightDoorAppraiseRankSysCache.getEndTime(channel);
					crossData.putObject(CrossEightDoorAppraiseRankEnum.endTime, endTime);
					LogTool.info("CrossEightDoorAppraiseRankCL:" + channel, this);
					NettyWrite.writeXData(channel, CrossConst.CROSS_EIGHTDOOR_APPRAISERANK_CONNSENDRANK_CL, crossData,
							new Callback() {

								@Override
								public void dataReci(Channel channel, CrossData crossData) {
									// TODO Auto-generated method stub
									try {
										Integer zoneId = CrossCache.getChannelToZoneid().get(channel).get(0);
										Integer serverOpenTime = crossData.getObject(
												CrossEightDoorAppraiseRankEnum.serverOpenTime, Integer.class);
										Map<Integer, Integer> serverOpenTimeMap = CrossEightDoorAppraiseRankSysCache
												.getServerOpenTimeMap(channel);
										serverOpenTimeMap.put(zoneId, serverOpenTime);
									} catch (Exception e) {
										// TODO: handle exception
										LogTool.error(e, this,
												"CrossEightDoorAppraiseRankCL connEvent dataReci Exception!");
									}
								}
							});
				} catch (Exception e) {
					LogTool.error(e, this, "CrossEightDoorAppraiseRankCL connEvent Exception! zoneid:" + zoneid);
				}
			}

			@Override
			public Object getSession() {
				// TODO Auto-generated method stub
				return OpTaskConst.EIGHTDOOR_APPRAISERANK;
			}

		});
	}

	/**
	 * @return
	 */
	public void checkOpenFirstUse() {
		/** key:partId value:firstServerOpenTime */
		Integer firstZoneId = 0;
		Map<Integer, Integer> firstServerOpenTimeMap = new HashMap<>();
		try {
			ConcurrentHashMap<Integer, ConcurrentHashMap<Channel, List<Integer>>> pchToZoneMap = CrossCache
					.getPchToZoneMap();
			for (Entry<Integer, ConcurrentHashMap<Channel, List<Integer>>> entry : pchToZoneMap.entrySet()) {
				ConcurrentHashMap<Channel, List<Integer>> value = entry.getValue();
				firstZoneId = 0;
				for (List<Integer> zoneIdList : value.values()) {
					Integer zoneId = zoneIdList.get(0);
					if (firstZoneId == 0 || zoneId < firstZoneId) {
						firstZoneId = zoneId;
					}
				}
				Integer partId = entry.getKey();
				firstServerOpenTimeMap.put(partId, firstZoneId);
			}

			List<Struct_hdfl_012> sortList = Config_hdfl_012.getIns().getSortList();
			for (Struct_hdfl_012 struct_hdfl_012 : sortList) {
				if (struct_hdfl_012.getId() != SystemIdConst.EIGHTDOOR_APPRAISERANK) {
					continue;
				}
				int open = struct_hdfl_012.getOpen();
				int end = struct_hdfl_012.getEnd();
				for (Entry<Integer, Integer> entry : firstServerOpenTimeMap.entrySet()) {
					Integer partId = entry.getKey();
					Map<Integer, Integer> serverOpenTimeMap = CrossEightDoorAppraiseRankSysCache
							.getServerOpenTimeMap(partId);
					firstZoneId = entry.getValue();
					Integer firstServerOpenTime = serverOpenTimeMap.get(firstZoneId);
					int openTime = EightDoorAppraiseRankFunction.getIns().getOpenDaysTime(firstServerOpenTime, open,
							false);
					int endTime = EightDoorAppraiseRankFunction.getIns().getOpenDaysTime(firstServerOpenTime, end,
							true);
					int todayZeroTimeReturnInt = TimeDateUtil.getTodayZeroTimeReturnInt();
					if (todayZeroTimeReturnInt == openTime) {
						CrossEightDoorAppraiseRankSysCache.setBeginTime(partId, openTime);
						CrossEightDoorAppraiseRankSysCache.setEndTime(partId, endTime);
						syncTimeToLocal(partId, openTime, endTime);
					}
				}
			}
		} catch (Exception e) {
			// TODO: handle exception
			String firstServerOpenTimeMapStr = JSON.toJSONString(firstServerOpenTimeMap);
			Map<Integer, CrossEightDoorAppraiseRankCache> rankCacheMapByPartId = CrossEightDoorAppraiseRankSysCache
					.getRankCacheMapByPartId();
			String rankCacheMapByPartIdStr = "";
			if (rankCacheMapByPartId != null) {
				rankCacheMapByPartIdStr = JSON.toJSONString(rankCacheMapByPartId);
			}
			LogTool.error(e, this,
					"CrossEightDoorAppraiseRankCL checkOpenFirstUse Exception! firstZoneId:" + firstZoneId
							+ " firstServerOpenTimeMapStr:" + firstServerOpenTimeMapStr + " rankCacheMapByPartIdStr:"
							+ rankCacheMapByPartIdStr);
		}
	}

	/**
	 * 中央服同步开始结束时间给子服
	 */
	public void syncTimeToLocal(int partId, int beginTime, int endTime) {
		ConcurrentHashMap<Channel, List<Integer>> channelMap = CrossCache.getChannelToZoneidByPartId(partId);
		for (Channel channel1 : channelMap.keySet()) {
			CrossData crossData = new CrossData();
			crossData.putObject(CrossEightDoorAppraiseRankEnum.beginTime, beginTime);
			crossData.putObject(CrossEightDoorAppraiseRankEnum.endTime, endTime);
			NettyWrite.writeXData(channel1, CrossConst.CROSS_EIGHTDOOR_APPRAISERANK_SYNCTIME_CL, crossData,
					new Callback() {
						@Override
						public void dataReci(Channel channel, CrossData crossData) {
							// TODO Auto-generated method stub
							List<Integer> list = CrossCache.getChannelToZoneid().get(channel);
							int size = list.size();
							for (int i = 0; i < size; i++) {
								Integer zoneid = list.get(i);
								LogTool.info("CrossEightDoorAppraiseRankCL syncTimeToLocal zoneid:" + zoneid, this);
							}
						}
					});
		}
	}

	/**
	 * 中央服向各个子服同步排行
	 * 
	 * @param channel
	 * @param crossConsumeRankModel
	 */
	public void syncRankToLocal(Channel channel, CrossEightDoorAppraiseRankModel addModel) {
		ConcurrentHashMap<Channel, List<Integer>> channelToZoneid = CrossCache.getChannelToZoneid(channel);
		for (Channel channel1 : channelToZoneid.keySet()) {
			CrossData crossData = new CrossData();
			crossData.putObject(CrossEightDoorAppraiseRankEnum.addUpdateRankModel, addModel);
			NettyWrite.writeXData(channel1, CrossConst.CROSS_EIGHTDOOR_APPRAISERANK_ADDUPDATERANK_CL, crossData);
		}
	}

	/**
	 * 中央服向子服发送邮件奖励
	 */
	public void sendMailAwardToLocal() {
		OpTaskExecutorService.PublicOrderService.execute(new RankingOpTaskRunnable() {
			@Override
			public void run() {
				Map<Integer, CrossEightDoorAppraiseRankCache> rankCacheMapByPartId = CrossEightDoorAppraiseRankSysCache
						.getRankCacheMapByPartId();
				Integer partId = 0;
				try {
					for (Entry<Integer, CrossEightDoorAppraiseRankCache> entry : rankCacheMapByPartId.entrySet()) {
						partId = entry.getKey();
						CrossEightDoorAppraiseRankCache rankCache = entry.getValue();
						if (!EightDoorAppraiseRankFunction.getIns().isEndCen(partId)) {
							continue;
						}

						if (rankCache.getSendAwardSet().contains(SystemIdConst.EIGHTDOOR_APPRAISERANK)) {
							continue;
						}
						TreeSet<CrossEightDoorAppraiseRankModel> rankTreeSet = rankCache.getRankTreeSet();
						int size = rankTreeSet.size();
						if (size == 0) {
							continue;
						}
						ConcurrentHashMap<Channel, List<Integer>> channelMap = CrossCache
								.getChannelToZoneidByPartId(partId);
						if (channelMap == null) {
							String content = JSON.toJSONString(rankCacheMapByPartId);
							LogTool.warn("sendMailAwardToLocal partId:" + partId + " content:" + content, this);
							continue;
						}
						Map<Channel, List<CrossEightDoorAppraiseRankModel>> awardByChannelMap = awardHandle(
								rankTreeSet);
						for (Channel channel1 : channelMap.keySet()) {
							List<CrossEightDoorAppraiseRankModel> awardList = awardByChannelMap.get(channel1);
							try {
								if (awardList == null || awardList.size() == 0) {
									continue;
								}
								CrossData crossData = new CrossData();
								crossData.putObject(CrossEightDoorAppraiseRankEnum.awardList, awardList);
								NettyWrite.writeXData(channel1,
										CrossConst.CROSS_EIGHTDOOR_APPRAISERANK_SENDMAILAWARD_CL, crossData);
							} catch (Exception e) {
								// TODO: handle exception
								String awardListStr = JSON.toJSONString(awardList);
								Integer zoneId = CrossCache.getChannelToZoneid().get(channel1).get(0);
								LogTool.error(e, this, "sendMailAwardToLocal partId:" + partId + " zoneId:" + zoneId
										+ " awardListStr:" + awardListStr);
							}
						}
						rankCache.getSendAwardSet().add(SystemIdConst.EIGHTDOOR_APPRAISERANK);
					}
					String content = JSON.toJSONString(rankCacheMapByPartId);
					LogTool.info("sendMailAwardToLocal partId:" + partId + " content:" + content, this);
				} catch (Exception e) {
					// TODO: handle exception
					String content = JSON.toJSONString(rankCacheMapByPartId);
					LogTool.error(e, this, "sendMailAwardToLocal partId:" + partId + " content:" + content);
				}
			}

			@Override
			public Object getSession() {
				// TODO Auto-generated method stub
				return OpTaskConst.EIGHTDOOR_APPRAISERANK;
			}

		});

	}

	/**
	 * 对奖励TreeSet排行进行处理，生成Map
	 * 
	 * @param rankTreeSet
	 * @return
	 */
	public Map<Channel, List<CrossEightDoorAppraiseRankModel>> awardHandle(
			TreeSet<CrossEightDoorAppraiseRankModel> treeSet) {
		Map<Channel, List<CrossEightDoorAppraiseRankModel>> awardByChannelMap = new HashMap<>();
		int rank = 1;
		for (CrossEightDoorAppraiseRankModel rankModel : treeSet) {
			rankModel.setRank(rank++);
			long hid = rankModel.getHid();
			int zoneId = CommonUtil.getZoneIdById(hid);
			Channel channel = CrossCache.getZoneidToChannel().get(zoneId);
			if (channel == null) {
				LogTool.warn("CrossEightDoorAppraiseRankCL awardHandle dataReci Exception! hid:" + hid, this);
				continue;
			}
			List<CrossEightDoorAppraiseRankModel> awardList = awardByChannelMap.get(channel);
			if (awardList == null) {
				awardList = new ArrayList<>();
				awardByChannelMap.put(channel, awardList);
			}
			awardList.add(rankModel);
		}
		return awardByChannelMap;

	}

}
