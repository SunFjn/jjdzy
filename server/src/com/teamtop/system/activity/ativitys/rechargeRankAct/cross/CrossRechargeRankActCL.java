package com.teamtop.system.activity.ativitys.rechargeRankAct.cross;

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
import com.teamtop.system.activity.ativitys.rechargeRankAct.RechargeRankActConst;
import com.teamtop.system.activity.ativitys.rechargeRankAct.RechargeRankActFunction;
import com.teamtop.system.activity.ativitys.rechargeRankAct.cross.model.CrossRechargeRankActCache;
import com.teamtop.system.activity.ativitys.rechargeRankAct.model.RechargeRankActModel;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.struct.Struct_czph_755;
import io.netty.channel.Channel;

public class CrossRechargeRankActCL {
	private static volatile CrossRechargeRankActCL ins = null;

	public static CrossRechargeRankActCL getIns() {
		if (ins == null) {
			synchronized (CrossRechargeRankActCL.class) {
				if (ins == null) {
					ins = new CrossRechargeRankActCL();
				}
			}
		}
		return ins;
	}

	private CrossRechargeRankActCL() {
	}

	/**
	 * 子服联接中央服成功 中央服向子服发送排行
	 * 
	 * @param channel
	 */
	public void connEventToLocal(Channel channel) {
		try {
			CrossData crossData = new CrossData();
			TreeSet<RechargeRankActModel> rankTreeSet = CrossRechargeRankActSysCache.getRankTreeSet(channel);
			crossData.putObject(CrossRechargeRankActEnum.rankTreeSet, rankTreeSet);
			int qs = CrossRechargeRankActSysCache.getQs(channel);
			crossData.putObject(CrossRechargeRankActEnum.qs, qs);
			LogTool.info("CrossRechargeRankActCL connEvent:" + channel, this);
			NettyWrite.writeXData(channel, CrossConst.CROSS_RECHARGE_RANK_ACT_CONNSENDRANK_CL, crossData);
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
	public void addUpdateRankToLocal(Channel channel, RechargeRankActModel model) {
		ConcurrentHashMap<Channel, List<Integer>> channelToZoneid = CrossCache.getChannelToZoneid(channel);
		int qs = CrossRechargeRankActSysCache.getQs(channel);
		for (Channel channel1 : channelToZoneid.keySet()) {
			CrossData crossData = new CrossData();
			crossData.putObject(CrossRechargeRankActEnum.addUpdateRankModel, model);
			crossData.putObject(CrossRechargeRankActEnum.qs, qs);
			NettyWrite.writeXData(channel1, CrossConst.CROSS_RECHARGE_RANK_ACT_ADDUPDATERANK_CL, crossData);
		}
	}

	/**
	 * 中央服向各个子服发送排名列表,防止各个子服数据不同步问题
	 */
	public void sendRankList() {
		ConcurrentHashMap<Channel, List<Integer>> channelToZoneid = CrossCache.getChannelToZoneid();
		for (Channel channel : channelToZoneid.keySet()) {
			int endTime = CrossRechargeRankActSysCache.getEndTime(channel);
			if (endTime == 0) {
				continue;
			}
			CrossData crossData = new CrossData();
			TreeSet<RechargeRankActModel> rankTreeSet = CrossRechargeRankActSysCache.getRankTreeSet(channel);
			crossData.putObject(CrossRechargeRankActEnum.rankTreeSet, rankTreeSet);
			int qs = CrossRechargeRankActSysCache.getQs(channel);
			crossData.putObject(CrossRechargeRankActEnum.qs, qs);
			NettyWrite.writeXData(channel, CrossConst.CROSS_RECHARGE_RANK_ACT_CONNSENDRANK_CL, crossData);
		}
	}

	/**
	 * 中央服向玩家所在子服同步新一期玩家数据
	 * 
	 * @param channel
	 * @param crossConsumeRankModel
	 */
	public void addNewQsDataToLocal(Channel channel, RechargeRankActModel model) {
		CrossData crossData = new CrossData();
		if (model == null) {
			int qs = CrossRechargeRankActSysCache.getQs(channel);
			crossData.putObject(CrossRechargeRankActEnum.qs, qs);
			ConcurrentHashMap<Channel, List<Integer>> channelToZoneid = CrossCache.getChannelToZoneid(channel);
			for (Channel channel1 : channelToZoneid.keySet()) {
				NettyWrite.writeXData(channel1, CrossConst.CROSS_RECHARGE_RANK_ACT_SYNC_NEWQSDATA_CL, crossData);
			}
		} else {
			int zoneId = CommonUtil.getZoneIdById(model.getHid());
			Channel channel1 = CrossCache.getZoneidToChannel().get(zoneId);
			crossData.putObject(CrossRechargeRankActEnum.addUpdateRankModel, model);
			NettyWrite.writeXData(channel1, CrossConst.CROSS_RECHARGE_RANK_ACT_SYNC_NEWQSDATA_CL, crossData);
		}
	}

	/**
	 * 中央服向子服发送邮件奖励结算
	 * 
	 * @param isGm 是否gm调用
	 */
	public void sendMailAwardToLocal() {
		OpTaskExecutorService.PublicOrderService.execute(new RankingOpTaskRunnable() {
			@Override
			public void run() {
				try {
					// 发奖励前入库，用来后续奖励追寻
					RechargeRankActFunction.getIns().intoDB();
					ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, Channel>> zoneidToChannelMap = CrossCache
							.getZoneidToChannelMap();
					for (Entry<Integer, ConcurrentHashMap<Integer, Channel>> entry : zoneidToChannelMap.entrySet()) {
						Integer partId = entry.getKey();
						try {
							CrossRechargeRankActCache crossConsumeRankActCache = CrossRechargeRankActSysCache
									.getCrossConsumeRankActCache().get(partId);
							if (crossConsumeRankActCache == null) {
								continue;
							}
							int endTime = crossConsumeRankActCache.getEndTime();
							int currentTime = TimeDateUtil.getCurrentTime();
							if (endTime == 0 || currentTime < endTime) {
								continue;
							}

							TreeSet<RechargeRankActModel> rankTreeSet = crossConsumeRankActCache.getRankTreeSet();
							if (rankTreeSet == null) {
								continue;
							}
							int qs = crossConsumeRankActCache.getQs();
							Map<Integer, Struct_czph_755> map = CrossRechargeRankActSysCache.getRankConfigMap().get(qs);
							// 统计各个子服的奖励
							int i = 1;
							Map<Integer, List<RechargeRankActModel>> awardListMap = new HashMap<>();
							for (RechargeRankActModel rankModel : rankTreeSet) {
								long hid = rankModel.getHid();
								int zid = CommonUtil.getZoneIdById(hid);
								List<RechargeRankActModel> awardList = awardListMap.get(zid);
								if (awardList == null) {
									awardList = new ArrayList<>();
									awardListMap.put(zid, awardList);
								}
								// 设置排名
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
								awardList.add(rankModel);
								// 写入日志
								LogTool.info(hid, rankModel.getName(), "CrossRechargeRankActCL zoneid:" + zid + " rank:"
										+ rankModel.getRank() + " totalRecharge:" + rankModel.getTotalRecharge(), this);
							}
							// 向各个子服发奖励
							ConcurrentHashMap<Integer, Channel> zoneidToChannel = entry.getValue();
							for (Entry<Integer, List<RechargeRankActModel>> entry1 : awardListMap.entrySet()) {
								List<RechargeRankActModel> awardList = entry1.getValue();
								try {
									Integer zoneid = entry1.getKey();
									Channel localChannel = zoneidToChannel.get(zoneid);
									CrossData crossDataToLocal = new CrossData();
									crossDataToLocal.putObject(CrossRechargeRankActEnum.awardList, awardList);
									crossDataToLocal.putObject(CrossRechargeRankActEnum.qs, qs);
									NettyWrite.writeXData(localChannel,
											CrossConst.CROSS_RECHARGE_RANK_ACT_SENDMAILAWARD_CL, crossDataToLocal);
								} catch (Exception e) {
									// TODO: handle exception
									String awardListStr = JSON.toJSONString(awardList);
									LogTool.error(e, CrossRechargeRankActIO.class,
											"sendMailAwardFromLocal awardList:" + awardListStr);
								}
							}
							// 清排行数据
							rankTreeSet.clear();
							crossConsumeRankActCache.setEndTime(0);
						} catch (Exception e) {
							// TODO: handle exception
							LogTool.error(e, this, "sendMailAwardToLocal partId=" + partId);
						}
					}

				} catch (Exception e) {
					LogTool.error(e, this, "sendMailAwardFromLocal");
				}
			}

			@Override
			public Object getSession() {
				// TODO Auto-generated method stub
				return OpTaskConst.CROSS_RECHARGE_RANK_ACT;
			}

		});
	}

}
