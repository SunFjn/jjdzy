package com.teamtop.system.openDaysSystem.saintMonsterWashRank.cross;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
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
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.openDaysSystem.saintMonsterWashRank.SaintMonsterWashRankConst;
import com.teamtop.system.openDaysSystem.saintMonsterWashRank.SaintMonsterWashRankFunction;
import com.teamtop.system.openDaysSystem.saintMonsterWashRank.model.SaintMonsterWashRankModel;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_shxlpm_268;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_shxlpm_268;
import excel.struct.Struct_xtcs_004;
import io.netty.channel.Channel;

public class SaintMonsterWashRankIO {

	private static SaintMonsterWashRankIO ins;

	private SaintMonsterWashRankIO() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized SaintMonsterWashRankIO getIns() {
		if (ins == null) {
			ins = new SaintMonsterWashRankIO();
		}
		return ins;
	}

	/**
	 * 刷新排行榜(中央服接到子服数据)
	 */
	public void updateRank(Channel channel, CrossData crossData) {
		try {
			OpTaskExecutorService.PublicOrderService.execute(new RankingOpTaskRunnable() {

				@Override
				public void run() {
					updateRankHandle(channel, crossData);
				}

				@Override
				public Object getSession() {
					// TODO Auto-generated method stub
					return OpTaskConst.SESSION_KEY8;
				}
			});
		} catch (Exception e) {
			LogTool.error(e, SaintMonsterWashRankIO.class, "SaintMonsterWashRankIO updateRank");
		}
	}

	/**
	 * 更新排行榜
	 * 
	 * @param channel
	 * @param crossData
	 */
	public void updateRankHandle(Channel channel, CrossData crossData) {
		try {
			long hid = crossData.getObject(SaintMonsterWashRankEnum.hid.name(), Long.class);
			String name = crossData.getObject(SaintMonsterWashRankEnum.name.name(), String.class);
			int endTime = crossData.getObject(SaintMonsterWashRankEnum.endTime.name(), Integer.class);
			int job = crossData.getObject(SaintMonsterWashRankEnum.job.name(), Integer.class);
			int icon = crossData.getObject(SaintMonsterWashRankEnum.icon.name(), Integer.class);
			int vip = crossData.getObject(SaintMonsterWashRankEnum.vip.name(), Integer.class);
			int country = crossData.getObject(SaintMonsterWashRankEnum.country.name(), Integer.class);
			int frame = crossData.getObject(SaintMonsterWashRankEnum.frame.name(), Integer.class);
			int reachTime = crossData.getObject(SaintMonsterWashRankEnum.reachTime.name(), Integer.class);
			int totalTimes = crossData.getObject(SaintMonsterWashRankEnum.totalTimes.name(), Integer.class);
			int partId = crossData.getObject(SaintMonsterWashRankEnum.partId.name(), Integer.class);
			Map<Integer, Integer> partIdEndTimeMap = CrossSaintMonsterWashRankCache.getEndTimeMap();
			if (partIdEndTimeMap.get(partId) == null) {
				partIdEndTimeMap.put(partId, endTime);
			}
			SaintMonsterWashRankModel rankModel = new SaintMonsterWashRankModel();
			rankModel.setHid(hid);
			rankModel.setName(name);
			rankModel.setIcon(icon);
			rankModel.setJob(job);
			rankModel.setVip(vip);
			rankModel.setCountry(country);
			rankModel.setFrame(frame);
			rankModel.setReachTime(reachTime);
			rankModel.setTotalTimes(totalTimes);
			Map<Integer, List<SaintMonsterWashRankModel>> rankMap = CrossSaintMonsterWashRankCache.getRankMap();
			List<SaintMonsterWashRankModel> list = rankMap.get(partId);
			if (list == null) {
				list = new ArrayList<SaintMonsterWashRankModel>();
			}
			Iterator<SaintMonsterWashRankModel> iterator = list.iterator();
			while (iterator.hasNext()) {
				SaintMonsterWashRankModel next = iterator.next();
				if (hid == next.getHid()) {
					iterator.remove();
				}
			}
			list.add(rankModel);
			rankMap.put(partId, list);
			SaintMonsterWashRankFunction.getIns().refreshRankList_f1(list, 1, rankModel);
		} catch (Exception e) {
			LogTool.error(e, SaintMonsterWashRankIO.class, "SaintMonsterWashRankIO updateRankHandle");
		}

	}

	/**
	 * 中央服收到子服请求下发排行榜数据
	 * 
	 * @param channel
	 * @param crossData
	 */
	public void askUpdate(Channel channel, CrossData crossData) {
		try {
			int cmd = CrossConst.SAINT_MONSTER_WASH_RANK_UPDATE_CL;
			Map<Integer, List<SaintMonsterWashRankModel>> RankMap = CrossSaintMonsterWashRankCache.getRankMap();
			int partId = CrossCache.getPartId(channel);
			List<SaintMonsterWashRankModel> RankList = RankMap.get(partId);
			if (RankList == null) {
				RankList = new ArrayList<SaintMonsterWashRankModel>();
			}
			Integer endTime = crossData.getObject(SaintMonsterWashRankEnum.endTime.name(), Integer.class);
			if (endTime == null) {
				endTime = CrossSaintMonsterWashRankCache.getEndTimeMap().get(partId);
			}
			CrossSaintMonsterWashRankCache.getEndTimeMap().put(partId, endTime);
			crossData.putObject(SaintMonsterWashRankEnum.rankList.name(), RankList);
			crossData.putObject(SaintMonsterWashRankEnum.endTimeMap.name(),
					CrossSaintMonsterWashRankCache.getEndTimeMap()
				);
			ConcurrentHashMap<Channel, List<Integer>> channelToZoneid = CrossCache.getChannelToZoneidByPartId(partId);
			for (Channel channel1 : channelToZoneid.keySet()) {
				NettyWrite.writeXData(channel1, CrossConst.SAINT_MONSTER_WASH_RANK_UPDATE_CL, crossData);
			}
		} catch (Exception e) {
			LogTool.error(e, SaintMonsterWashRankIO.class, "SaintMonsterWashRankIO askUpdate");
		}
	}

	public void sendReward(Channel channel, CrossData crossData) {
		try {
			int cmd = CrossConst.SAINT_MONSTER_WASH_RANK_SENDREWARD;
			Type type = new TypeReference<List<SaintMonsterWashRankModel>>() {
			}.getType();
			List<SaintMonsterWashRankModel> RankList = crossData.getObject(SaintMonsterWashRankEnum.rankList.name(),
					type);
			Iterator<SaintMonsterWashRankModel> iterator = RankList.iterator();
			int mailId = MailConst.SAINT_MONSTER_WASH_RANK;
			int bigMailId = MailConst.SAINT_MONSTER_WASH_RANK_BIG;
			Config_xtcs_004 ins2 = Config_xtcs_004.getIns();
			Struct_xtcs_004 REWARD = ins2.get(SaintMonsterWashRankConst.REWARD);
			int needNum = REWARD.getNum();
			int ranking = 1;
			Struct_xtcs_004 BIG_REWARD = ins2.get(SaintMonsterWashRankConst.BIG_REWARD);
			int bigNeedNum = BIG_REWARD.getNum();
			for (; iterator.hasNext();) {
				SaintMonsterWashRankModel rank = iterator.next();
				long hid = rank.getHid();
				int totalTimes = rank.getTotalTimes();
				if (!GameProperties.zoneids.contains(CommonUtil.getZoneIdById(hid))) {
					// 不是本服的跳过
					ranking++;
					continue;
				}
				List<Struct_shxlpm_268> sortList = Config_shxlpm_268.getIns().getSortList();
				int i = 0;
				for (i = 0; i < sortList.size(); i++) {
					Struct_shxlpm_268 next = sortList.get(i);
					int[][] rewardRank = next.getRank();
					if (ranking >= rewardRank[0][0] && ranking <= rewardRank[0][1]) {
						int[][] reward_0 = next.getReward();// 普通奖励
						int[][] reward_1 = next.getReward1();// 大奖奖励
						if (totalTimes >= needNum) {
							MailFunction.getIns().sendMailWithFujianData2(hid, mailId, new Object[] { mailId, ranking },
									reward_0);
							if (totalTimes >= bigNeedNum && reward_1 != null) {
								MailFunction.getIns().sendMailWithFujianData2(hid, bigMailId,
										new Object[] { bigMailId, ranking }, reward_1);
							}
						}
					}
				}
				ranking++;
			}
		} catch (Exception e) {
			LogTool.error(e, SaintMonsterWashRankIO.class, "SaintMonsterWashRankIO sendReward");
		}
	}


}