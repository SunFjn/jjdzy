package com.teamtop.system.activity.ativitys.eightDoorAppraiseRankAct.cross;

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
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.synHandleCore.orderedRunnable.RankingOpTaskRunnable;
import com.teamtop.system.activity.ativitys.eightDoorAppraiseRankAct.EightDoorAppraiseRankActFunction;
import com.teamtop.system.activity.ativitys.eightDoorAppraiseRankAct.cross.model.CrossEightDoorAppraiseRankActCache;
import com.teamtop.system.activity.ativitys.eightDoorAppraiseRankAct.model.EightDoorAppraiseRankActModel;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import io.netty.channel.Channel;

public class CrossEightDoorAppraiseRankActCL {
	private static volatile CrossEightDoorAppraiseRankActCL ins = null;

	public static CrossEightDoorAppraiseRankActCL getIns() {
		if (ins == null) {
			synchronized (CrossEightDoorAppraiseRankActCL.class) {
				if (ins == null) {
					ins = new CrossEightDoorAppraiseRankActCL();
				}
			}
		}
		return ins;
	}

	private CrossEightDoorAppraiseRankActCL() {
	}

	/**
	 * 子服联接中央服成功 中央服向子服发送排行
	 * 
	 * @param channel
	 */
	public void connEventToLocal(Channel channel) {
		try {
			CrossData crossData = new CrossData();
			TreeSet<EightDoorAppraiseRankActModel> rankTreeSet = CrossEightDoorAppraiseRankActSysCache
					.getRankTreeSet(channel);
			crossData.putObject(CrossEightDoorAppraiseRankActEnum.rankTreeSet, rankTreeSet);
			int qs = CrossEightDoorAppraiseRankActSysCache.getQs(channel);
			crossData.putObject(CrossEightDoorAppraiseRankActEnum.qs, qs);
			LogTool.info("CrossEightDoorAppraiseRankActCL connEvent:" + channel, this);
			NettyWrite.writeXData(channel, CrossConst.EIGHTDOOR_APPRAISERANK_ACT_CONNSENDRANK_CL, crossData);
		} catch (Exception e) {
			LogTool.error(e, this, "connEvent Exception!");
		}
	}

	/**
	 * 中央服向各个子服同步玩家数据
	 * 
	 * @param channel
	 * @param crossConsumeRankModel
	 */
	public void addUpdateRankToLocal(Channel channel, EightDoorAppraiseRankActModel model) {
		ConcurrentHashMap<Channel, List<Integer>> channelToZoneid = CrossCache.getChannelToZoneid(channel);
		int qs = CrossEightDoorAppraiseRankActSysCache.getQs(channel);
		for (Channel channel1 : channelToZoneid.keySet()) {
			CrossData crossData = new CrossData();
			crossData.putObject(CrossEightDoorAppraiseRankActEnum.addUpdateRankModel, model);
			crossData.putObject(CrossEightDoorAppraiseRankActEnum.qs, qs);
			NettyWrite.writeXData(channel1, CrossConst.EIGHTDOOR_APPRAISERANK_ACT_ADDUPDATERANK_CL, crossData);
		}
	}

	/**
	 * 中央服向各个子服发送排名列表,防止各个子服数据不同步问题
	 */
	public void sendRankList() {
		ConcurrentHashMap<Channel, List<Integer>> channelToZoneid = CrossCache.getChannelToZoneid();
		for (Channel channel : channelToZoneid.keySet()) {
			int endTime = CrossEightDoorAppraiseRankActSysCache.getEndTime(channel);
			if (endTime == 0) {
				continue;
			}
			CrossData crossData = new CrossData();
			TreeSet<EightDoorAppraiseRankActModel> rankTreeSet = CrossEightDoorAppraiseRankActSysCache
					.getRankTreeSet(channel);
			crossData.putObject(CrossEightDoorAppraiseRankActEnum.rankTreeSet, rankTreeSet);
			int qs = CrossEightDoorAppraiseRankActSysCache.getQs(channel);
			crossData.putObject(CrossEightDoorAppraiseRankActEnum.qs, qs);
			NettyWrite.writeXData(channel, CrossConst.EIGHTDOOR_APPRAISERANK_ACT_CONNSENDRANK_CL, crossData);
		}
	}

	/**
	 * 中央服向玩家所在子服同步新一期玩家数据
	 * 
	 * @param channel
	 * @param crossConsumeRankModel
	 */
	public void addNewQsDataToLocal(Channel channel, EightDoorAppraiseRankActModel model) {
		CrossData crossData = new CrossData();
		if (model == null) {
			int qs = CrossEightDoorAppraiseRankActSysCache.getQs(channel);
			crossData.putObject(CrossEightDoorAppraiseRankActEnum.qs, qs);
			ConcurrentHashMap<Channel, List<Integer>> channelToZoneid = CrossCache.getChannelToZoneid(channel);
			for (Channel channel1 : channelToZoneid.keySet()) {
				NettyWrite.writeXData(channel1, CrossConst.EIGHTDOOR_APPRAISERANK_ACT_SYNC_NEWQSDATA_CL, crossData);
			}
		} else {
			int zoneId = CommonUtil.getZoneIdById(model.getHid());
			Channel channel1 = CrossCache.getZoneidToChannel().get(zoneId);
			crossData.putObject(CrossEightDoorAppraiseRankActEnum.addUpdateRankModel, model);
			NettyWrite.writeXData(channel1, CrossConst.EIGHTDOOR_APPRAISERANK_ACT_SYNC_NEWQSDATA_CL, crossData);
		}
	}

	/**
	 * 中央服向子服发送邮件奖励结算
	 * 
	 */
	public void sendMailAwardToLocal() {
		OpTaskExecutorService.PublicOrderService.execute(new RankingOpTaskRunnable() {
			@Override
			public void run() {
				try {
					// 发奖励前入库，用来后续奖励追寻
					EightDoorAppraiseRankActFunction.getIns().intoDB();
					ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, Channel>> zoneidToChannelMap = CrossCache
							.getZoneidToChannelMap();
					for (Entry<Integer, ConcurrentHashMap<Integer, Channel>> entry : zoneidToChannelMap.entrySet()) {
						Integer partId = entry.getKey();
						try {
							CrossEightDoorAppraiseRankActCache crossCache = CrossEightDoorAppraiseRankActSysCache
									.getCrossCache().get(partId);
							if (crossCache == null) {
								continue;
							}
							int endTime = crossCache.getEndTime();
							int currentTime = TimeDateUtil.getCurrentTime();
							if (endTime == 0 || currentTime < endTime) {
								continue;
							}

							TreeSet<EightDoorAppraiseRankActModel> rankTreeSet = crossCache.getRankTreeSet();
							if (rankTreeSet == null) {
								continue;
							}
							int qs = crossCache.getQs();
							// 统计各个子服的奖励
							int i = 1;
							Map<Integer, List<EightDoorAppraiseRankActModel>> awardListMap = new HashMap<>();
							for (EightDoorAppraiseRankActModel rankModel : rankTreeSet) {
								long hid = rankModel.getHid();
								int zid = CommonUtil.getZoneIdById(hid);
								List<EightDoorAppraiseRankActModel> awardList = awardListMap.get(zid);
								if (awardList == null) {
									awardList = new ArrayList<>();
									awardListMap.put(zid, awardList);
								}
								// 设置排名
								rankModel.setRank(i);
								awardList.add(rankModel);
								// 写入日志
								LogTool.info(hid, rankModel.getName(),
										"CrossEightDoorAppraiseRankActCL zoneid:" + zid + " rank:" + rankModel.getRank()
												+ " appraiseTimes:" + rankModel.getAppraiseTimes(),
										this);
								i++;
							}
							// 向各个子服发奖励
							ConcurrentHashMap<Integer, Channel> zoneidToChannel = entry.getValue();
							for (Entry<Integer, List<EightDoorAppraiseRankActModel>> entry1 : awardListMap.entrySet()) {
								List<EightDoorAppraiseRankActModel> awardList = entry1.getValue();
								try {
									Integer zoneid = entry1.getKey();
									Channel localChannel = zoneidToChannel.get(zoneid);
									CrossData crossDataToLocal = new CrossData();
									crossDataToLocal.putObject(CrossEightDoorAppraiseRankActEnum.awardList, awardList);
									crossDataToLocal.putObject(CrossEightDoorAppraiseRankActEnum.qs, qs);
									NettyWrite.writeXData(localChannel,
											CrossConst.EIGHTDOOR_APPRAISERANK_ACT_SENDMAILAWARD_CL, crossDataToLocal);
								} catch (Exception e) {
									// TODO: handle exception
									String awardListStr = JSON.toJSONString(awardList);
									LogTool.error(e, this,
											"CrossEightDoorAppraiseRankActCL sendMailAwardFromLocal awardList:"
													+ awardListStr);
								}
							}
							// 清排行数据
							rankTreeSet.clear();
							crossCache.setEndTime(0);
						} catch (Exception e) {
							// TODO: handle exception
							LogTool.error(e, this,
									"CrossEightDoorAppraiseRankActCL sendMailAwardToLocal partId=" + partId);
						}
					}

				} catch (Exception e) {
					LogTool.error(e, this, "CrossEightDoorAppraiseRankActCL sendMailAwardFromLocal");
				}
			}

			@Override
			public Object getSession() {
				// TODO Auto-generated method stub
				return OpTaskConst.EIGHTDOOR_APPRAISERANK_ACT;
			}

		});
	}

}
