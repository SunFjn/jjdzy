package com.teamtop.system.openDaysSystem.saintMonsterWashRank;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.AbsOpenDaysManager;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.OpenDaysSystemSysCache;
import com.teamtop.system.openDaysSystem.model.AbsOpenDaysSystemModel;
import com.teamtop.system.openDaysSystem.model.HeroOpenDaysSysData;
import com.teamtop.system.openDaysSystem.saintMonsterWash.SaintMonsterWashSysEvent;
import com.teamtop.system.openDaysSystem.saintMonsterWash.model.SaintMonsterWash;
import com.teamtop.system.openDaysSystem.saintMonsterWashRank.cross.SaintMonsterWashRankEnum;
import com.teamtop.system.openDaysSystem.saintMonsterWashRank.model.SaintMonsterWashRankModel;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_hdfl_012;
import excel.config.Config_kuafu_200;
import excel.struct.Struct_hdfl_012;
import excel.struct.Struct_kuafu_200;
import io.netty.channel.Channel;

public class SaintMonsterWashRankManager extends AbsOpenDaysManager {

	private static SaintMonsterWashRankManager ins;

	private SaintMonsterWashRankManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized SaintMonsterWashRankManager getIns() {
		if (ins == null) {
			ins = new SaintMonsterWashRankManager();
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
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.SAINT_MONSTER_WASH_RANK)) {
				return;
			}
			int getlocalPartId = CrossCache.getlocalPartId();
			Struct_kuafu_200 struct_kuafu_200 = Config_kuafu_200.getIns().get(getlocalPartId);
			int[][] boss = struct_kuafu_200.getBoss();
			Map<Integer, Integer> endTimeMap = SaintMonsterWashRankCache.getEndTimeMap();
			if ((hero.getZoneid() != boss[0][0] && endTimeMap.get(getlocalPartId) == null)) {
				// 只有跨服分组的首服成功开启活动后 其他服才能一起共享活动
				List<Object[]> nList = new ArrayList<>();
				SaintMonsterWashRankSender.sendCmd_7352(hid, nList.toArray(), 0, nList.toArray(), 0, 0, 0);
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.SAINT_MONSTER_WASH_RANK);
			SaintMonsterWash saintMonsterWashRank = (SaintMonsterWash) getSystemModel(hero, uid);
			int endTime = 0;
			int realEndTime = 0;
			if (endTimeMap.get(getlocalPartId) == null) {			
				endTime = OpenDaysSystemSysCache.getOpenMap().get(uid).getEndTime();
				realEndTime = endTime - TimeDateUtil.ONE_DAY_INT;// 活动时间维持6天 第七天只展示
				endTimeMap.put(getlocalPartId, realEndTime);
			} else {
				realEndTime = SaintMonsterWashRankCache.getEndTimeMap().get(getlocalPartId);
			}
			Struct_hdfl_012 hdfl_012 = Config_hdfl_012.getIns().get(uid);
			int open = hdfl_012.getOpen();
			int openDays = TimeDateUtil.betweenOpen(realEndTime);
			if (open >= openDays) {
				// 同一跨服组非首服超过了活动展示时间后隐藏图标 之前和前端定过结束时间发0为隐藏图标
				List<Object[]> nList = new ArrayList<>();
				SaintMonsterWashRankSender.sendCmd_7352(hid, nList.toArray(), 0, nList.toArray(), 0, 0, 0);
				return;
			}
			askRefreshRank();
			Map<Integer, List<SaintMonsterWashRankModel>> rankMap = SaintMonsterWashRankCache.getRankMap();
			int partId = CrossCache.getPartId(hero.getZoneid());
			List<SaintMonsterWashRankModel> rankList = rankMap.get(partId);			
			if (rankList == null) {
				rankList = new ArrayList<>();
			}
			int size = rankList.size();
			List<Object[]> objList = new ArrayList<>();
			int myRank = 0;
			for (int i = 0; i < size; i++) {
				SaintMonsterWashRankModel rankModel = rankList.get(i);
				objList.add(new Object[] { rankModel.getName(), rankModel.getTotalTimes() });
				if (hid == rankModel.getHid()) {
					myRank = i + 1;
				}
			}
			int job1 = 0;
			int icon2 = 0;
			int country2 = 0;
			int vip2 = 0;
			int frame2 = 0;
			int icon3 = 0;
			int country3 = 0;
			int vip3 = 0;
			int frame3 = 0;
			List<Object[]> hero2_3 = new ArrayList<>();
			if (rankList.size() > 0 && rankList.get(0) != null) {
				SaintMonsterWashRankModel no1 = rankList.get(0);
				job1 = no1.getJob();
			}
			if (rankList.size() > 1 && rankList.get(1) != null) {
			SaintMonsterWashRankModel no2 = rankList.get(1);
				icon2 = no2.getIcon();
				country2 = no2.getCountry();
				vip2 = no2.getVip();
				frame2 = no2.getFrame();
			}
			if (rankList.size() > 2 && rankList.get(2) != null) {
			SaintMonsterWashRankModel no3 = rankList.get(2);
				icon3 = no3.getIcon();
				country3 = no3.getCountry();
				vip3 = no3.getVip();
				frame3 = no3.getFrame();
			}
			hero2_3.add(new Object[] { icon2, country2, vip2, frame2 });
			hero2_3.add(new Object[] { icon3, country3, vip3, frame3 });


			int washTimes = saintMonsterWashRank.getWashTimes();// 自己的洗练次数
			SaintMonsterWashRankSender.sendCmd_7352(hid, objList.toArray(), job1, hero2_3.toArray(), washTimes, myRank,
					realEndTime);
		} catch (Exception e) {
			LogTool.error(e, SaintMonsterWashRankManager.class, hid, hero.getName(),
					"SaintMonsterWashRankManager openUI");
		}
	}

	/**
	 * 向中央服请求排行数据
	 */
	public void askRefreshRank() {
		CrossData data = new CrossData();
		int getlocalPartId = CrossCache.getlocalPartId();
		Integer endTime = SaintMonsterWashRankCache.getEndTimeMap().get(getlocalPartId);
		if (endTime != null) {
			data.putObject(SaintMonsterWashRankEnum.endTime.name(), endTime);
		}
		Client_2 ins2 = Client_2.getIns();
		Channel crossChannel = ins2.getCrossChannel();
		NettyWrite.writeXData(crossChannel, CrossConst.SAINT_MONSTER_WASH_RANK_ASKUPDATE, data);
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
		// TODO Auto-generated method stub
		/*int PartId = CrossCache.getlocalPartId();
		List<SaintMonsterWashRankModel> RankList = SaintMonsterWashRankCache.getRankMap().get(PartId);
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
			List<Struct_shxlpm_268> sortList = Config_shxlpm_268.getIns().getSortList();
			int i = 0;
			for (i = 0; i < sortList.size(); i++) {
				Struct_shxlpm_268 next = sortList.get(i);
				int[][] rewardRank = next.getRank();
				if (ranking >= rewardRank[0][0] && ranking <= rewardRank[0][1]) {
					int[][] reward_0 = next.getReward();// 普通奖励
					int[][] reward_1 = next.getReward1();// 大奖奖励
					if (totalTimes > bigNeedNum && ranking <= 3) {// 只有前3名才有大奖奖励
						MailFunction.getIns().sendMailWithFujianData2(hid, bigMailId,
								new Object[] { bigMailId, ranking }, reward_1);
						}
					if (totalTimes > needNum) {
						MailFunction.getIns().sendMailWithFujianData2(hid, mailId, new Object[] { mailId, ranking },
								reward_0);
					}
				}
			}
			ranking++;
		}*/
	}
	


	@Override
	public void handleEnd(Hero hero, int uid) {

	}

	@Override
	public AbsOpenDaysSystemModel getSystemModel(Hero hero, int uid) {
		HeroOpenDaysSysData heroOpenDaysSysData = hero.getHeroOpenDaysSysData();
		SaintMonsterWash data = (SaintMonsterWash) heroOpenDaysSysData.getOpSysDataMap().get(uid);
		if (data == null) {
			data = new SaintMonsterWash();
		}
		return data;
	}

	@Override
	public Class<?> getSystemModel() {
		// TODO Auto-generated method stub
		return SaintMonsterWash.class;
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		// TODO Auto-generated method stub
		return SaintMonsterWashSysEvent.getIns();
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
