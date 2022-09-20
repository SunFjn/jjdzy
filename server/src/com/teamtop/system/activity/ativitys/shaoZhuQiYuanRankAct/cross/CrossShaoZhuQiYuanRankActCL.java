package com.teamtop.system.activity.ativitys.shaoZhuQiYuanRankAct.cross;

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
import com.teamtop.system.activity.ativitys.shaoZhuQiYuanRankAct.ShaoZhuQiYuanRankActFunction;
import com.teamtop.system.activity.ativitys.shaoZhuQiYuanRankAct.cross.model.CrossShaoZhuQiYuanRankActCache;
import com.teamtop.system.activity.ativitys.shaoZhuQiYuanRankAct.model.ShaoZhuQiYuanRankActModel;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import io.netty.channel.Channel;

public class CrossShaoZhuQiYuanRankActCL {
	private static volatile CrossShaoZhuQiYuanRankActCL ins = null;

	public static CrossShaoZhuQiYuanRankActCL getIns() {
		if (ins == null) {
			synchronized (CrossShaoZhuQiYuanRankActCL.class) {
				if (ins == null) {
					ins = new CrossShaoZhuQiYuanRankActCL();
				}
			}
		}
		return ins;
	}

	private CrossShaoZhuQiYuanRankActCL() {
	}

	/**
	 * 子服联接中央服成功 中央服向子服发送排行
	 * 
	 * @param channel
	 */
	public void connEventToLocal(Channel channel) {
		try {
			CrossData crossData = new CrossData();
			TreeSet<ShaoZhuQiYuanRankActModel> rankTreeSet = CrossShaoZhuQiYuanRankActSysCache.getRankTreeSet(channel);
			crossData.putObject(CrossShaoZhuQiYuanRankActEnum.rankTreeSet, rankTreeSet);
			int qs = CrossShaoZhuQiYuanRankActSysCache.getQs(channel);
			crossData.putObject(CrossShaoZhuQiYuanRankActEnum.qs, qs);
			LogTool.info("CrossShaoZhuQiYuanRankActCL connEvent:" + channel, this);
			NettyWrite.writeXData(channel, CrossConst.SHAOZHU_QIYUANRANK_ACT_CONNSENDRANK_CL, crossData);
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
	public void addUpdateRankToLocal(Channel channel, ShaoZhuQiYuanRankActModel model) {
		ConcurrentHashMap<Channel, List<Integer>> channelToZoneid = CrossCache.getChannelToZoneid(channel);
		int qs = CrossShaoZhuQiYuanRankActSysCache.getQs(channel);
		for (Channel channel1 : channelToZoneid.keySet()) {
			CrossData crossData = new CrossData();
			crossData.putObject(CrossShaoZhuQiYuanRankActEnum.addUpdateRankModel, model);
			crossData.putObject(CrossShaoZhuQiYuanRankActEnum.qs, qs);
			NettyWrite.writeXData(channel1, CrossConst.SHAOZHU_QIYUANRANK_ACT_ADDUPDATERANK_CL, crossData);
		}
	}

	/**
	 * 中央服向各个子服发送排名列表,防止各个子服数据不同步问题
	 */
	public void sendRankList() {
		ConcurrentHashMap<Channel, List<Integer>> channelToZoneid = CrossCache.getChannelToZoneid();
		for (Channel channel : channelToZoneid.keySet()) {
			int endTime = CrossShaoZhuQiYuanRankActSysCache.getEndTime(channel);
			if (endTime == 0) {
				continue;
			}
			CrossData crossData = new CrossData();
			TreeSet<ShaoZhuQiYuanRankActModel> rankTreeSet = CrossShaoZhuQiYuanRankActSysCache.getRankTreeSet(channel);
			crossData.putObject(CrossShaoZhuQiYuanRankActEnum.rankTreeSet, rankTreeSet);
			int qs = CrossShaoZhuQiYuanRankActSysCache.getQs(channel);
			crossData.putObject(CrossShaoZhuQiYuanRankActEnum.qs, qs);
			NettyWrite.writeXData(channel, CrossConst.SHAOZHU_QIYUANRANK_ACT_CONNSENDRANK_CL, crossData);
		}
	}

	/**
	 * 中央服向玩家所在子服同步新一期玩家数据
	 * 
	 * @param channel
	 * @param crossConsumeRankModel
	 */
	public void addNewQsDataToLocal(Channel channel, ShaoZhuQiYuanRankActModel model) {
		CrossData crossData = new CrossData();
		if (model == null) {
			int qs = CrossShaoZhuQiYuanRankActSysCache.getQs(channel);
			crossData.putObject(CrossShaoZhuQiYuanRankActEnum.qs, qs);
			ConcurrentHashMap<Channel, List<Integer>> channelToZoneid = CrossCache.getChannelToZoneid(channel);
			for (Channel channel1 : channelToZoneid.keySet()) {
				NettyWrite.writeXData(channel1, CrossConst.SHAOZHU_QIYUANRANK_ACT_SYNC_NEWQSDATA_CL, crossData);
			}
		} else {
			int zoneId = CommonUtil.getZoneIdById(model.getHid());
			Channel channel1 = CrossCache.getZoneidToChannel().get(zoneId);
			crossData.putObject(CrossShaoZhuQiYuanRankActEnum.addUpdateRankModel, model);
			NettyWrite.writeXData(channel1, CrossConst.SHAOZHU_QIYUANRANK_ACT_SYNC_NEWQSDATA_CL, crossData);
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
					ShaoZhuQiYuanRankActFunction.getIns().intoDB();
					ConcurrentHashMap<Integer, ConcurrentHashMap<Integer, Channel>> zoneidToChannelMap = CrossCache
							.getZoneidToChannelMap();
					for (Entry<Integer, ConcurrentHashMap<Integer, Channel>> entry : zoneidToChannelMap.entrySet()) {
						Integer partId = entry.getKey();
						try {
							CrossShaoZhuQiYuanRankActCache crossCache = CrossShaoZhuQiYuanRankActSysCache
									.getCrossCache().get(partId);
							if (crossCache == null) {
								continue;
							}
							int endTime = crossCache.getEndTime();
							int currentTime = TimeDateUtil.getCurrentTime();
							if (endTime == 0 || currentTime < endTime) {
								continue;
							}

							TreeSet<ShaoZhuQiYuanRankActModel> rankTreeSet = crossCache.getRankTreeSet();
							if (rankTreeSet == null) {
								continue;
							}
							int qs = crossCache.getQs();
							// 统计各个子服的奖励
							int i = 1;
							Map<Integer, List<ShaoZhuQiYuanRankActModel>> awardListMap = new HashMap<>();
							for (ShaoZhuQiYuanRankActModel rankModel : rankTreeSet) {
								long hid = rankModel.getHid();
								int zid = CommonUtil.getZoneIdById(hid);
								List<ShaoZhuQiYuanRankActModel> awardList = awardListMap.get(zid);
								if (awardList == null) {
									awardList = new ArrayList<>();
									awardListMap.put(zid, awardList);
								}
								// 设置排名
								rankModel.setRank(i);
								awardList.add(rankModel);
								// 写入日志
								LogTool.info(
										hid, rankModel.getName(), "CrossShaoZhuQiYuanRankActCL zoneid:" + zid + " rank:"
												+ rankModel.getRank() + " qiyuanTimes:" + rankModel.getQiyuanTimes(),
										this);
								i++;
							}
							// 向各个子服发奖励
							ConcurrentHashMap<Integer, Channel> zoneidToChannel = entry.getValue();
							for (Entry<Integer, List<ShaoZhuQiYuanRankActModel>> entry1 : awardListMap.entrySet()) {
								List<ShaoZhuQiYuanRankActModel> awardList = entry1.getValue();
								try {
									Integer zoneid = entry1.getKey();
									Channel localChannel = zoneidToChannel.get(zoneid);
									CrossData crossDataToLocal = new CrossData();
									crossDataToLocal.putObject(CrossShaoZhuQiYuanRankActEnum.awardList, awardList);
									crossDataToLocal.putObject(CrossShaoZhuQiYuanRankActEnum.qs, qs);
									NettyWrite.writeXData(localChannel,
											CrossConst.SHAOZHU_QIYUANRANK_ACT_SENDMAILAWARD_CL, crossDataToLocal);
								} catch (Exception e) {
									// TODO: handle exception
									String awardListStr = JSON.toJSONString(awardList);
									LogTool.error(e, this,
											"CrossShaoZhuQiYuanRankActCL sendMailAwardFromLocal awardList:"
													+ awardListStr);
								}
							}
							// 清排行数据
							rankTreeSet.clear();
							crossCache.setEndTime(0);
						} catch (Exception e) {
							// TODO: handle exception
							LogTool.error(e, this, "CrossShaoZhuQiYuanRankActCL sendMailAwardToLocal partId=" + partId);
						}
					}

				} catch (Exception e) {
					LogTool.error(e, this, "CrossShaoZhuQiYuanRankActCL sendMailAwardFromLocal");
				}
			}

			@Override
			public Object getSession() {
				// TODO Auto-generated method stub
				return OpTaskConst.SHAOZHU_QIYUANRANK_ACT;
			}

		});
	}

}
