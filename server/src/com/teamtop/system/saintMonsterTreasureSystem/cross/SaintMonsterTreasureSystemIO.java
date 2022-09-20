package com.teamtop.system.saintMonsterTreasureSystem.cross;

import java.lang.reflect.Type;
import java.util.Iterator;
import java.util.TreeSet;

import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossData;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.synHandleCore.orderedRunnable.RankingOpTaskRunnable;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.saintMonsterTreasureSystem.SaintMonsterTreasureConst;
import com.teamtop.system.saintMonsterTreasureSystem.SaintMonsterTreasureSystemSysCache;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_xtcs_004;
import excel.struct.Struct_shxbrank_268;
import io.netty.channel.Channel;

public class SaintMonsterTreasureSystemIO {

	private static SaintMonsterTreasureSystemIO ins;

	private SaintMonsterTreasureSystemIO() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized SaintMonsterTreasureSystemIO getIns() {
		if (ins == null) {
			ins = new SaintMonsterTreasureSystemIO();
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
			LogTool.error(e, SaintMonsterTreasureSystemIO.class, "SaintMonsterTreasureIO updateRank");
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
			long hid = crossData.getObject(SaintMonsterTreasureEnum.hid.name(), Long.class);
			String name = crossData.getObject(SaintMonsterTreasureEnum.name.name(), String.class);
			int round = crossData.getObject(SaintMonsterTreasureEnum.round.name(), Integer.class);
			int zoneid = crossData.getObject(SaintMonsterTreasureEnum.zoneid.name(), Integer.class);
			int endTime = crossData.getObject(SaintMonsterTreasureEnum.endTime.name(), Integer.class);
			if (CrossSaintMonsterTreasureSysCache.endTime == 0) {
				CrossSaintMonsterTreasureSysCache.endTime = endTime;
			} else {
				if (CrossSaintMonsterTreasureSysCache.endTime != endTime) {
					if (CrossSaintMonsterTreasureSysCache.sendReward == CrossSaintMonsterTreasureSysCache.endTime) {
						CrossSaintMonsterTreasureSysCache.endTime = endTime;
						CrossSaintMonsterTreasureSysCache.sendReward = 0;
					}
				}
			}
			SaintMonsterTreRank rankModel = new SaintMonsterTreRank();
			rankModel.setHid(hid);
			rankModel.setName(name);
			rankModel.setRound(round);
			rankModel.setZoneid(zoneid);
			rankModel.setUpdateTime(TimeDateUtil.getCurrentTimeInMillis());
			TreeSet<SaintMonsterTreRank> rankSet = CrossSaintMonsterTreasureSysCache.getRankSet();
			boolean find = false;
			Iterator<SaintMonsterTreRank> iterator = rankSet.iterator();
			for (; iterator.hasNext();) {
				SaintMonsterTreRank old = iterator.next();
				if (rankModel.getHid() == old.getHid()) {
					find = true;
					iterator.remove();
				}
			}
			if (find) {
				rankSet.add(rankModel);
			} else {
				if (rankSet.size() < SaintMonsterTreasureConst.RANK_SIZE) {
					rankSet.add(rankModel);
				} else {
					rankSet.add(rankModel);
					rankSet.pollLast();
				}
			}
		} catch (Exception e) {
			LogTool.error(e, SaintMonsterTreasureSystemIO.class, "SaintMonsterTreasureIO updateRankHandle");
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
			TreeSet<SaintMonsterTreRank> rankSet = CrossSaintMonsterTreasureSysCache.getRankSet();
			TreeSet<SaintMonsterTreRank> tempRankSet = new TreeSet<>(rankSet);
			crossData.finishGet();
			crossData.putObject(SaintMonsterTreasureEnum.rankSet.name(), tempRankSet);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
		} catch (Exception e) {
			LogTool.error(e, SaintMonsterTreasureSystemIO.class, "SaintMonsterTreasureIO askUpdate");
		}
	}

	public void sendReward(Channel channel, CrossData crossData) {
		try {
			Type type = new TypeReference<TreeSet<SaintMonsterTreRank>>() {
			}.getType();
			TreeSet<SaintMonsterTreRank> tempSet = crossData.getObject(SaintMonsterTreasureEnum.rankSet.name(), type);
			TreeSet<SaintMonsterTreRank> rankSet = SaintMonsterTreasureSystemSysCache.getRankSet();
			rankSet.clear();
			rankSet.addAll(tempSet);
			Iterator<SaintMonsterTreRank> iterator = tempSet.iterator();
			int zoneId = GameProperties.getFirstZoneId();
			int ranking = 1;
			int mailId = MailConst.SAINT_MONSTER_TREASURE_RANK;
			int bigMailId = MailConst.SAINT_MONSTER_TREASURE_BIG;
			int bigLimit = Config_xtcs_004.getIns().get(SaintMonsterTreasureConst.BIG_REWARD).getNum();
			for (; iterator.hasNext();) {
				SaintMonsterTreRank rank = iterator.next();
				if (rank.getZoneid() == zoneId) {
					Struct_shxbrank_268 rankReward = SaintMonsterTreasureSystemSysCache.getRankReward(ranking);
					int[][] reward = rankReward.getReward();
					MailFunction.getIns().sendMailWithFujianData2(rank.getHid(), mailId, new Object[] { mailId },
							reward);
					int round = rank.getRound();
					if (round >= bigLimit) {
						int[][] bigReward = rankReward.getReward1();
						MailFunction.getIns().sendMailWithFujianData2(rank.getHid(), bigMailId,
								new Object[] { bigMailId }, bigReward);
					}
				}
				ranking++;
			}
		} catch (Exception e) {
			LogTool.error(e, SaintMonsterTreasureSystemIO.class, "SaintMonsterTreasureIO sendReward");
		}
	}

}
