package com.teamtop.system.openDaysSystem.saintMonsterTreasure;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.openDaysSystem.AbsOpenDaysManager;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.model.AbsOpenDaysSystemModel;
import com.teamtop.system.openDaysSystem.model.HeroOpenDaysSysData;
import com.teamtop.system.openDaysSystem.saintMonsterTreasure.cross.SaintMonsterTreRank;
import com.teamtop.system.openDaysSystem.saintMonsterTreasure.model.SaintMonsterTreasure;
import com.teamtop.util.ProbabilityEvent.RandomUtil;
import com.teamtop.util.log.LogTool;

import excel.config.Config_ssshxb_268;
import excel.config.Config_ssshxbmb_268;
import excel.config.Config_xtcs_004;
import excel.struct.Struct_ssshxbmb_268;
import excel.struct.Struct_ssshxbrank_268;

public class SaintMonsterTreasureManager extends AbsOpenDaysManager {

	private static SaintMonsterTreasureManager ins;

	private SaintMonsterTreasureManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized SaintMonsterTreasureManager getIns() {
		if (ins == null) {
			ins = new SaintMonsterTreasureManager();
		}
		return ins;
	}

	@Override
	public void openUI(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.SAINT_MONSTER_TREASURE)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.SAINT_MONSTER_TREASURE);
			SaintMonsterTreasure model = (SaintMonsterTreasure) getSystemModel(hero, uid);
			int round = model.getRound();
			int grid = model.getGrid();
			List<int[][]> rewardList = model.getRewardList();
			List<Object[]> rewardData = new ArrayList<>();
			int size = rewardList.size();
			for (int i = 0; i < size; i++) {
				int[][] js = rewardList.get(i);
				if(js==null){
					SaintMonsterTreasureFunction.getIns().refreshRoundRewardData(hero, model);
				}
				rewardData.add(new Object[] { js[0][0], js[0][1], js[0][2] });
			}
			List<Object[]> goalList = new ArrayList<>();
			Set<Integer> goalReward = model.getGoalReward();
			List<Struct_ssshxbmb_268> sortList = Config_ssshxbmb_268.getIns().getSortList();
			size = sortList.size();
			for (int i = 0; i < size; i++) {
				Struct_ssshxbmb_268 ssshxbmb_268 = sortList.get(i);
				int id = ssshxbmb_268.getId();
				int q = ssshxbmb_268.getQ();
				int state = 0;
				if (goalReward.contains(id)) {
					state = 2;
				} else if (round >= q) {
					state = 1;
				}
				goalList.add(new Object[] { id, state });
			}
			// 个人排名
			TreeSet<SaintMonsterTreRank> rankSet = SaintMonsterTreasureSysCache.getRankSet();
			Iterator<SaintMonsterTreRank> iterator = rankSet.iterator();
			int ranking = 1;
			int myRanking = 0;
			for (; iterator.hasNext();) {
				SaintMonsterTreRank rank = iterator.next();
				if (hid == rank.getHid()) {
					myRanking = ranking;
					break;
				}
				ranking++;
			}
			SaintMonsterTreasureSender.sendCmd_5010(hid, round, grid, myRanking, rewardData.toArray(),
					goalList.toArray());
		} catch (Exception e) {
			LogTool.error(e, SaintMonsterTreasureManager.class, hid, hero.getName(),
					"SaintMonsterTreasureManager openUI");
		}
	}

	/**
	 * 掷骰子
	 */
	public void rolling(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.SAINT_MONSTER_TREASURE)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.SAINT_MONSTER_TREASURE);
			SaintMonsterTreasure model = (SaintMonsterTreasure) getSystemModel(hero, uid);
			int toolNum = 1;
			if (!UseAddUtil.canUse(hero, GameConst.TOOL, toolNum, SaintMonsterTreasureConst.TOOL_ID)) {
				SaintMonsterTreasureSender.sendCmd_5012(hid, 0, 1, 0, 0, null, null);
				return;
			}
			UseAddUtil.use(hero, GameConst.TOOL, toolNum, SaintMonsterTreasureConst.TOOL_ID,
					SourceGoodConst.SAINT_MONSTER_TREASURE, true);
			List<int[][]> rewardList = model.getRewardList();
			List<int[][]> getList = new ArrayList<>();
			int round = model.getRound();
			int grid = model.getGrid();
			int randomValue = RandomUtil.getRandomNumInAreas(1, 6);
			int finalGrid = grid + randomValue;
			int size = Config_ssshxb_268.getIns().getSortList().size();
			if (finalGrid > size) {
				round += 1;
				model.setRound(round);
				int left = finalGrid-size;
				model.setGrid(left);
				for (int i = grid; i < size; i++) {
					int[][] reward = rewardList.get(i - 1);
					getList.add(reward);
					UseAddUtil.add(hero, reward, SourceGoodConst.SAINT_MONSTER_TREASURE, UseAddUtil.getDefaultMail(), false);
				}
				//刷新奖励
				SaintMonsterTreasureFunction.getIns().refreshRoundRewardData(hero, model);
				rewardList = model.getRewardList();
				for (int i = 1; i < left; i++) {
					int[][] reward = rewardList.get(i - 1);
					getList.add(reward);
					UseAddUtil.add(hero, reward, SourceGoodConst.SAINT_MONSTER_TREASURE, UseAddUtil.getDefaultMail(), false);
				}
				finalGrid = left;
			} else {
				model.setGrid(finalGrid);
				for (int i = grid; i < finalGrid; i++) {
					int[][] reward = rewardList.get(i - 1);
					getList.add(reward);
					UseAddUtil.add(hero, reward, SourceGoodConst.SAINT_MONSTER_TREASURE, UseAddUtil.getDefaultMail(), false);
				}
			}
			// 获得的奖励数据
			List<Object[]> rewardData = new ArrayList<>();
			int getSize = getList.size();
			for (int i = 0; i < getSize; i++) {
				int[][] js = getList.get(i);
				rewardData.add(new Object[] { js[0][0], js[0][1], js[0][2] });
			}
			// 新奖励数据
			List<Object[]> newData = new ArrayList<>();
			rewardList = model.getRewardList();
			int newSize = rewardList.size();
			for (int i = 0; i < newSize; i++) {
				int[][] js = rewardList.get(i);
				newData.add(new Object[] { js[0][0], js[0][1], js[0][2] });
			}
			// 个人排名
			TreeSet<SaintMonsterTreRank> rankSet = SaintMonsterTreasureSysCache.getRankSet();
			Iterator<SaintMonsterTreRank> iterator = rankSet.iterator();
			int ranking = 1;
			int myRanking = 0;
			for (; iterator.hasNext();) {
				SaintMonsterTreRank rank = iterator.next();
				if (hid == rank.getHid()) {
					myRanking = ranking;
					break;
				}
				ranking++;
			}

			SaintMonsterTreasureSender.sendCmd_5012(hid, 1, round, finalGrid, myRanking, rewardData.toArray(),
					newData.toArray());
			// 同步中央服
			// int endTime = OpenDaysSystemSysCache.getOpenMap().get(uid).getEndTime();
			// CrossData data = new CrossData();
			// data.putObject(SaintMonsterTreasureEnum.hid.name(), hero.getId());
			// data.putObject(SaintMonsterTreasureEnum.name.name(), hero.getNameZoneid());
			// data.putObject(SaintMonsterTreasureEnum.round.name(), model.getRound());
			// data.putObject(SaintMonsterTreasureEnum.zoneid.name(), hero.getZoneid());
			// data.putObject(SaintMonsterTreasureEnum.endTime.name(), endTime);
			// Channel crossChannel = Client_2.getIns().getCrossChannel();
			// NettyWrite.writeXData(crossChannel,
			// CrossConst.SAINT_MONSTER_TREASURE_RANK_UPDATE, data);
			SaintMonsterTreasureFunction.getIns().updateRank(hero, round);
			SaintMonsterTreasureFunction.getIns().updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, SaintMonsterTreasureManager.class, hid, hero.getName(),
					"SaintMonsterTreasureManager rolling");
		}
	}

	/**
	 * 获取排行榜
	 * 
	 * @param hero
	 */
	public void getRankList(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.SAINT_MONSTER_TREASURE)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.SAINT_MONSTER_TREASURE);
			SaintMonsterTreasure model = (SaintMonsterTreasure) getSystemModel(hero, uid);
			TreeSet<SaintMonsterTreRank> rankSet = SaintMonsterTreasureSysCache.getRankSet();
			List<Object[]> rankList = new ArrayList<>();
			Iterator<SaintMonsterTreRank> iterator = rankSet.iterator();
			int ranking = 1;
			int myRanking = 0;
			for (; iterator.hasNext();) {
				SaintMonsterTreRank rank = iterator.next();
				rankList.add(new Object[] { ranking, rank.getHid(), rank.getName(), rank.getRound() });
				if (hid == rank.getHid()) {
					myRanking = ranking;
				}
				ranking++;
			}
			// int currentTime = TimeDateUtil.getCurrentTime();
			// if (SaintMonsterTreasureSysCache.UPDATE_RANK_TIME == 0) {
			// SaintMonsterTreasureSysCache.UPDATE_RANK_TIME = currentTime;
			// askRefreshRank();
			// } else {
			// int leftTime = currentTime - SaintMonsterTreasureSysCache.UPDATE_RANK_TIME +
			// 120;
			// if (leftTime >= SaintMonsterTreasureConst.REFRESH_GRAP) {
			// SaintMonsterTreasureSysCache.UPDATE_RANK_TIME = currentTime;
			// askRefreshRank();
			// }
			// }
			SaintMonsterTreasureSender.sendCmd_5014(hid, myRanking, model.getRound(), rankList.toArray());
		} catch (Exception e) {
			LogTool.error(e, SaintMonsterTreasureManager.class, hid, hero.getName(),
					"SaintMonsterTreasureManager getRankList");
		}
	}

	/**
	 * 向中央服请求排行数据
	 */
	// public void askRefreshRank() {
	// CrossData data = new CrossData();
	// Channel crossChannel = Client_2.getIns().getCrossChannel();
	// NettyWrite.writeXData(crossChannel,
	// CrossConst.SAINT_MONSTER_TREASURE_RANK_ASKUPDATE, data, new Callback() {
	//
	// @Override
	// public void dataReci(Channel channel, CrossData crossData) {
	// Type type = new TypeReference<TreeSet<SaintMonsterTreRank>>(){}.getType();
	// TreeSet<SaintMonsterTreRank> tempSet =
	// crossData.getObject(SaintMonsterTreasureEnum.rankSet.name(), type);
	// TreeSet<SaintMonsterTreRank> rankSet =
	// SaintMonsterTreasureSysCache.getRankSet();
	// rankSet.clear();
	// rankSet.addAll(tempSet);
	// }
	// });
	// }

	/**
	 * 领取目标奖励
	 * 
	 * @param hero
	 * @param id
	 */
	public void getGoalReward(Hero hero, int id) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.SAINT_MONSTER_TREASURE)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.SAINT_MONSTER_TREASURE);
			SaintMonsterTreasure model = (SaintMonsterTreasure) getSystemModel(hero, uid);
			Set<Integer> goalReward = model.getGoalReward();
			if (goalReward.contains(id)) {
				// 已领取
				SaintMonsterTreasureSender.sendCmd_5016(hid, 0, 2);
				return;
			}
			int round = model.getRound();
			Struct_ssshxbmb_268 ssshxbmb_268 = Config_ssshxbmb_268.getIns().get(id);
			int q = ssshxbmb_268.getQ();
			if (round < q) {
				// 不满足条件
				SaintMonsterTreasureSender.sendCmd_5016(hid, 0, 1);
				return;
			}
			goalReward.add(id);
			int[][] reward = ssshxbmb_268.getReward();
			UseAddUtil.add(hero, reward, SourceGoodConst.SAINT_MONSTER_TREASURE, UseAddUtil.getDefaultMail(), true);
			SaintMonsterTreasureSender.sendCmd_5016(hid, 1, id);
			SaintMonsterTreasureFunction.getIns().updateRedPoint(hero);
		} catch (Exception e) {
			LogTool.error(e, SaintMonsterTreasureManager.class, hid, hero.getName(),
					"SaintMonsterTreasureManager getGoalReward, id=" + id);
		}
	}

	@Override
	public void handleOpenPub() {
		// TODO Auto-generated method stub

	}

	@Override
	public void handleOpen(Hero hero, int uid) {
		// TODO Auto-generated method stub

	}

	@Override
	public void handleEndPub() {
		TreeSet<SaintMonsterTreRank> rankSet = SaintMonsterTreasureSysCache.getRankSet();
		TreeSet<SaintMonsterTreRank> tempSet = new TreeSet<>(rankSet);
		Iterator<SaintMonsterTreRank> iterator = tempSet.iterator();
		int zoneId = GameProperties.getFirstZoneId();
		int ranking = 1;
		int mailId = MailConst.SAINT_MONSTER_TREASURE_RANK;
		int bigMailId = MailConst.SAINT_MONSTER_TREASURE_BIG;
		int bigLimit = Config_xtcs_004.getIns().get(SaintMonsterTreasureConst.BIG_REWARD).getNum();
		for (; iterator.hasNext();) {
			SaintMonsterTreRank rank = iterator.next();
			if (rank.getZoneid() == zoneId) {
				Struct_ssshxbrank_268 rankReward = SaintMonsterTreasureSysCache.getRankReward(ranking);
				int[][] reward = rankReward.getReward();
				MailFunction.getIns().sendMailWithFujianData2(rank.getHid(), mailId, new Object[] { mailId, ranking }, reward);
				int round = rank.getRound();
				if (round >= bigLimit) {
					int[][] bigReward = rankReward.getReward1();
					MailFunction.getIns().sendMailWithFujianData2(rank.getHid(), bigMailId, new Object[] { bigMailId, ranking },
							bigReward);
				}
			}
			ranking++;
		}
		rankSet.clear();
	}

	@Override
	public void handleEnd(Hero hero, int uid) {
		if(hero==null){
			return;
		}
		long hid = hero.getId();
		try {
			SaintMonsterTreasure model = (SaintMonsterTreasure) getSystemModel(hero, uid);
			Set<Integer> goalReward = model.getGoalReward();
			int round = model.getRound();
			List<Struct_ssshxbmb_268> sortList = Config_ssshxbmb_268.getIns().getSortList();
			int size = sortList.size();
			int mailId = MailConst.SAINT_MONSTER_TREASURE_REWARD;
			for(int i = 0;i<size;i++) {				
				Struct_ssshxbmb_268 ssshxbmb_268 = sortList.get(i);
				int q = ssshxbmb_268.getQ();
				if (round < q) {
					// 不满足条件
					continue;
				}
				int id = ssshxbmb_268.getId();
				if(goalReward.contains(id)) {
					// 已领取
					continue;
				}
				goalReward.add(id);
				int[][] reward = ssshxbmb_268.getReward();
				if(reward!=null) {					
					MailFunction.getIns().sendMailWithFujianData2(hid, mailId, new Object[] {mailId}, reward);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, SaintMonsterTreasureManager.class, hid, hero.getName(), "SaintMonsterTreasureManager handleEnd");
		}
	}

	@Override
	public AbsOpenDaysSystemModel getSystemModel(Hero hero, int uid) {
		HeroOpenDaysSysData heroOpenDaysSysData = hero.getHeroOpenDaysSysData();
		SaintMonsterTreasure saintMonsterTreasure = (SaintMonsterTreasure) heroOpenDaysSysData.getOpSysDataMap().get(uid);
		if (saintMonsterTreasure == null) {
			saintMonsterTreasure = new SaintMonsterTreasure();
			List<int[][]> rewardList = new ArrayList<>();
			saintMonsterTreasure.setGrid(1);
			saintMonsterTreasure.setRewardList(rewardList);
			Set<Integer> goalReward = new HashSet<>();
			saintMonsterTreasure.setGoalReward(goalReward);
			SaintMonsterTreasureFunction.getIns().refreshRoundRewardData(hero, saintMonsterTreasure);
		}
		return saintMonsterTreasure;
	}

	@Override
	public Class<?> getSystemModel() {
		// TODO Auto-generated method stub
		return SaintMonsterTreasure.class;
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		// TODO Auto-generated method stub
		return SaintMonsterTreasureSysEvent.getIns();
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub

	}

	@Override
	public void consumeHandle(Hero hero, int consumeNum, int reason) {
		// TODO Auto-generated method stub

	}

}
