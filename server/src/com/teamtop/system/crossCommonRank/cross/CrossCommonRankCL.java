package com.teamtop.system.crossCommonRank.cross;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.TreeSet;
import java.util.concurrent.ConcurrentHashMap;

import com.alibaba.fastjson.JSON;
import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.RankingOpTaskRunnable;
import com.teamtop.system.crossCommonRank.CommonActivityRankHandlerAbs;
import com.teamtop.system.crossCommonRank.CommonRankFunction;
import com.teamtop.system.crossCommonRank.CommonRankSysCache;
import com.teamtop.system.crossCommonRank.cross.model.CrossCommonRankCache;
import com.teamtop.system.crossCommonRank.model.CommonRankModel;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import io.netty.channel.Channel;

public class CrossCommonRankCL {
	private static volatile CrossCommonRankCL ins = null;

	public static CrossCommonRankCL getIns() {
		if (ins == null) {
			synchronized (CrossCommonRankCL.class) {
				if (ins == null) {
					ins = new CrossCommonRankCL();
				}
			}
		}
		return ins;
	}

	private CrossCommonRankCL() {
	}

	/**
	 * 子服联接中央服成功 中央服向子服发送排行
	 *
	 * @param channel
	 */
	public void connEventToLocal(Channel channel) {
		try {
			Map<Integer, CrossCommonRankCache> crossCache = CommonRankSysCache.getCrossCacheByZoneId(channel);
			CrossData crossData = new CrossData();
			crossData.putObject(CrossCommonRankEnum.crossCache, crossCache);
			LogTool.info("CrossCommonRankCL connEvent:" + channel, this);
			NettyWrite.writeXData(channel, CrossConst.CROSS_COMMONRANK_CONNSENDRANK_CL, crossData);
		} catch (Exception e) {
			LogTool.error(e, this, "connEvent Exception!");
		}
	}

	/**
	 * 中央服向各个子服同步玩家数据
	 *
	 * @param channel
	 * @param model
	 */
	public void addUpdateRankToLocal(int sysId, Channel channel, CommonRankModel model) {
		ConcurrentHashMap<Channel, List<Integer>> channelToZoneid = CrossCache.getChannelToZoneid(channel);
		int qs = CommonRankSysCache.getQs(sysId, channel);
		for (Channel channel1 : channelToZoneid.keySet()) {
			CrossData crossData = new CrossData();
			crossData.putObject(CrossCommonRankEnum.sysId, sysId);
			crossData.putObject(CrossCommonRankEnum.addUpdateRankModel, model);
			crossData.putObject(CrossCommonRankEnum.qs, qs);
			NettyWrite.writeXData(channel1, CrossConst.CROSS_COMMONRANK_ADDUPDATERANK_CL, crossData);
		}
	}

	/**
	 * 中央服向各个子服同步玩家数据
	 * @param sysId
	 * @param partId
	 * @param model
	 */
	public void addUpdateRankToLocal(int sysId, int partId, CommonRankModel model) {
		ConcurrentHashMap<Channel, List<Integer>> channelToZoneid = CrossCache.getPchToZoneMap().get(partId);
		if (channelToZoneid != null) {
			for (Channel channel1 : channelToZoneid.keySet()) {
				CrossData crossData = new CrossData();
				crossData.putObject(CrossCommonRankEnum.sysId, sysId);
				crossData.putObject(CrossCommonRankEnum.addUpdateRankModel, model);
				crossData.putObject(CrossCommonRankEnum.qs, 1);
				NettyWrite.writeXData(channel1, CrossConst.CROSS_COMMONRANK_ADDUPDATERANK_CL, crossData);
			}
		}
	}

	/**
	 * 中央服向各个子服发送排名列表,防止各个子服数据不同步问题
	 */
	public void sendRankList() {
		ConcurrentHashMap<Channel, List<Integer>> channelToZoneid = CrossCache.getChannelToZoneid();
		for (Channel channel : channelToZoneid.keySet()) {
			Map<Integer, CrossCommonRankCache> crossCache = CommonRankSysCache.getCrossCacheByZoneId(channel);
			CrossData crossData = new CrossData();
			crossData.putObject(CrossCommonRankEnum.crossCache, crossCache);
			NettyWrite.writeXData(channel, CrossConst.CROSS_COMMONRANK_CONNSENDRANK_CL, crossData);
		}
	}

	/**
	 * 中央服向玩家所在子服同步新一期玩家数据
	 * @param sysId
	 * @param channel
	 * @param model
	 */
	public void addNewQsDataToLocal(int sysId, Channel channel, CommonRankModel model) {
		CrossData crossData = new CrossData();
		crossData.putObject(CrossCommonRankEnum.sysId, sysId);
		if (model == null) {
			int qs = CommonRankSysCache.getQs(sysId, channel);
			crossData.putObject(CrossCommonRankEnum.qs, qs);
			ConcurrentHashMap<Channel, List<Integer>> channelToZoneid = CrossCache.getChannelToZoneid(channel);
			for (Channel channel1 : channelToZoneid.keySet()) {
				NettyWrite.writeXData(channel1, CrossConst.CROSS_COMMONRANK_SYNC_NEWQSDATA_CL, crossData);
			}
		} else {
			int zoneId = CommonUtil.getZoneIdById(model.getHid());
			Channel channel1 = CrossCache.getZoneidToChannel().get(zoneId);
			crossData.putObject(CrossCommonRankEnum.addUpdateRankModel, model);
			NettyWrite.writeXData(channel1, CrossConst.CROSS_COMMONRANK_SYNC_NEWQSDATA_CL, crossData);
		}
	}

	/**
	 * 中央服向子服发送邮件奖励结算
	 *
	 */
	@SuppressWarnings("rawtypes")
	public void sendMailAwardToLocal() {
		try {
			Set<Entry<Integer, CommonActivityRankHandlerAbs>> entrySet = CommonRankSysCache.getActivityRankAbsMap()
					.entrySet();
			for (Entry<Integer, CommonActivityRankHandlerAbs> absEntry : entrySet) {
				Integer sysId = absEntry.getKey();
				CommonActivityRankHandlerAbs abs = absEntry.getValue();
				sendMailAwardToLocal_f1(sysId, abs,true);
			}

		} catch (Exception e) {
			LogTool.error(e, this, "CrossCommonRankCL sendMailAwardFromLocal");
		}
	}

	public void sendMailAwardToLocal_f1(int sysId,CommonActivityRankHandlerAbs abs,boolean isZero){
		OpTaskExecutorService.PublicOrderService.execute(new RankingOpTaskRunnable() {
			@Override
			public void run() {
				Integer partId = 0;
				try {
					ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, Channel>> zoneidToChannelMap = CrossCache
							.getZoneidToChannelMap();
					for (Entry<Integer, ConcurrentHashMap<Integer, Channel>> entry : zoneidToChannelMap
							.entrySet()) {
						partId = entry.getKey();
						CrossCommonRankCache crossCache = CommonRankSysCache.getCrossConsumeRankActCache(sysId)
								.get(partId);
						if (crossCache == null) {
							continue;
						}
						int endTime = crossCache.getEndTime();
						int currentTime = TimeDateUtil.getCurrentTime();
						if ((isZero && endTime == 0) || currentTime < endTime) {
							continue;
						}

						TreeSet<CommonRankModel> rankTreeSet = crossCache.getRankTreeSet();
						if (rankTreeSet == null) {
							continue;
						}
						int size = rankTreeSet.size();
						if (size <= 0) {
							continue;
						}
						
						int qs = crossCache.getQs();
						// 统计各个子服的奖励
						int rank = 1;
						Map<Integer, List<CommonRankModel>> awardListMap = new HashMap<>();
						List<CommonRankModel> tempList = new ArrayList<>();
						tempList.addAll(rankTreeSet);
						for (CommonRankModel rankModel : tempList) {
							long hid = rankModel.getHid();
							int zid = CommonUtil.getZoneIdById(hid);
							List<CommonRankModel> awardList = awardListMap.get(zid);
							if (awardList == null) {
								awardList = new ArrayList<>();
								awardListMap.put(zid, awardList);
							}
							// 设置排名
							int parameter = rankModel.getParameter();
							int rankNum = abs.rankNum();
							int upRankCondition = 0;
							do {
								upRankCondition = abs.upRankCondition(rank++, qs);
							} while (parameter < upRankCondition && rank <= rankNum);
							if (parameter >= upRankCondition) {
								rankModel.setRank(rank - 1);
								awardList.add(rankModel);
								// 写入日志
								LogTool.info(hid, rankModel.getName(),
										"CrossCommonRankCL zoneid:" + zid + " rank:" + rankModel.getRank()
												+ " parameter:" + rankModel.getParameter(),
										this);
							}
							if (rank > rankNum) {
								break;
							}
						}
						// 向各个子服发奖励
						ConcurrentHashMap<Integer, Channel> zoneidToChannel = entry.getValue();
						for (Entry<Integer, List<CommonRankModel>> entry1 : awardListMap.entrySet()) {
							List<CommonRankModel> awardList = entry1.getValue();
							if (awardList.size() <= 0) {
								continue;
							}
							try {
								Integer zoneid = entry1.getKey();
								Channel localChannel = zoneidToChannel.get(zoneid);
								CrossData crossDataToLocal = new CrossData();
								CrossCommonRankCache award = new CrossCommonRankCache();
								award.setSysId(sysId);
								award.setQs(qs);
								TreeSet<CommonRankModel> awardTreeSet = award.getRankTreeSet();
								awardTreeSet.addAll(awardList);
								crossDataToLocal.putObject(CrossCommonRankEnum.award, award);
								NettyWrite.writeXData(localChannel,
										CrossConst.CROSS_COMMONRANK_SENDMAILAWARD_CL, crossDataToLocal);
							} catch (Exception e) {
								// TODO: handle exception
								String awardListStr = JSON.toJSONString(awardList);
								LogTool.error(e, CrossCommonRankIO.class,
										"CrossCommonRankCL sendMailAwardFromLocal sysId:" + sysId
												+ " awardList:" + awardListStr);
							}
						}
						crossCache.setEndTime(0);
					}
				} catch (Exception e) {
					// TODO: handle exception
					LogTool.error(e, this,
							"CrossCommonRankCL sendMailAwardToLocal sysId:" + sysId + " partId=" + partId);
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
	 * 更新排行
	 * @param partId
	 * @param sysId
	 * @param model
	 */
	public void addUpdateRank(int partId, int sysId, CommonRankModel model) {
		TreeSet<CommonRankModel> rankTreeSet = CommonRankSysCache.getRankTreeSet(sysId, partId);
		boolean isRefreshRank = CrossCommonRankIO.getIns().refreshRank(sysId, rankTreeSet, model);
		if (isRefreshRank) {
			CrossCommonRankCL.getIns().addUpdateRankToLocal(sysId, partId, model);
		}
	}

	/**
	 * 清排行
	 * @param partId
	 * @param sysId
	 */
	public void clearRank(int partId, int sysId) {
		TreeSet<CommonRankModel> rankTreeSet = CommonRankSysCache.getRankTreeSet(sysId, partId);
		rankTreeSet.clear();
	}

	/**
	 * 中央服向子服发送邮件奖励结算
	 * @param sysId
	 */
	public void sendMailAwardToLocal(int sysId) {
		try {
			Map<Integer, CommonActivityRankHandlerAbs> activityRankAbsMap = CommonRankSysCache.getActivityRankAbsMap();
			CommonActivityRankHandlerAbs abs = activityRankAbsMap.get(sysId);
			sendMailAwardToLocal_f1(sysId, abs, false);
		} catch (Exception e) {
			LogTool.error(e, this, "CrossCommonRankCL sendMailAwardFromLocal sysId:"+sysId);
		}

	}

}
