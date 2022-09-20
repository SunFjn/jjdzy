package com.teamtop.system.openDaysSystem.saintMonsterWashRank;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossZone;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.OpenDaysSystemSysCache;
import com.teamtop.system.openDaysSystem.saintMonsterWash.model.SaintMonsterWash;
import com.teamtop.system.openDaysSystem.saintMonsterWashRank.cross.CrossSaintMonsterWashRankCache;
import com.teamtop.system.openDaysSystem.saintMonsterWashRank.cross.SaintMonsterWashRankEnum;
import com.teamtop.system.openDaysSystem.saintMonsterWashRank.cross.SaintMonsterWashRankIO;
import com.teamtop.system.openDaysSystem.saintMonsterWashRank.model.SaintMonsterWashRankModel;
import com.teamtop.util.common.CommonUtil;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_kuafu_200;
import excel.struct.Struct_kuafu_200;
import io.netty.channel.Channel;

public class SaintMonsterWashRankFunction {

	private static SaintMonsterWashRankFunction ins;

	private SaintMonsterWashRankFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized SaintMonsterWashRankFunction getIns() {
		if (ins == null) {
			ins = new SaintMonsterWashRankFunction();
		}
		return ins;
	}

	/**
	 * 刷新排名
	 * 
	 * @param model
	 */
	public void refreshRankList(int type, SaintMonsterWashRankModel model) {
		try {
			List<SaintMonsterWashRankModel> rankList;
			Map<Integer, List<SaintMonsterWashRankModel>> rankMap = SaintMonsterWashRankCache.getRankMap();
			int partId = CrossCache.getlocalPartId();
			rankList = rankMap.get(partId);
			refreshRankList_f1(rankList, 1, model);
		} catch (Exception e) {
			// TODO: handle exception
			LogTool.error(e, this, "SaintMonsterWashRankFunction refreshRankList " + "type:" + type + " hid"
					+ model.getHid() + " name" + model.getName() + " addTimes" + model.getTotalTimes());
		}
	}

	public void refreshRankList_f1(List<SaintMonsterWashRankModel> rankList, int type,
			SaintMonsterWashRankModel rankModel) {
		int indexOf = rankList.indexOf(rankModel);
		if (type == 1) {
			if (indexOf < 0) {
				rankList.add(rankModel);
			} else {
				SaintMonsterWashRankModel rankModel2 = rankList.get(indexOf);
				int newTimes = rankModel.getTotalTimes();
				rankModel2.setTotalTimes(newTimes);
				rankModel2.setReachTime(rankModel.getReachTime());
				rankModel2.setJob(rankModel.getJob());
				rankModel2.setName(rankModel.getName());
			}
			sortRank(rankList);
			if (CrossZone.isCrossServer()) {
				// 中央服下发排行榜数据到子服
				int zoneId = CommonUtil.getZoneIdById(rankModel.getHid());
				int partId = CrossCache.getPartId(zoneId);
				CrossData crossData = new CrossData();
				crossData.putObject(SaintMonsterWashRankEnum.rankList, rankList);
				crossData.putObject(SaintMonsterWashRankEnum.endTimeMap,
						CrossSaintMonsterWashRankCache.getEndTimeMap());
				ConcurrentHashMap<Channel, List<Integer>> channelToZoneid = CrossCache.getChannelToZoneidByPartId(partId);
				for (Channel channel1 : channelToZoneid.keySet()) {
					NettyWrite.writeXData(channel1, CrossConst.SAINT_MONSTER_WASH_RANK_UPDATE_CL, crossData);
				}
			}
		} else {
			if (indexOf >= 0) {
				SaintMonsterWashRankModel rankModel2 = rankList.get(indexOf);
				rankModel2.setName(rankModel.getName());
			}
		}
	}

	public void sortRank(List<SaintMonsterWashRankModel> rankList) {
		Collections.sort(rankList, new SaintMonsterWashRankComparator());
		Iterator<SaintMonsterWashRankModel> iterator = rankList.iterator();
		int maxNum = SaintMonsterWashRankConst.RANK_SIZE;
		int i = 1;
		while (iterator.hasNext()) {
			iterator.next();
			if (i > maxNum) {
				iterator.remove();
			}
			i++;
		}
	}


	/**
	 * 子服收到中央服下发排行榜数据
	 * 
	 * @param channel
	 * @param crossData
	 */
	public void Update(Channel channel, CrossData crossData) {
		try {
			int cmd = CrossConst.SAINT_MONSTER_WASH_RANK_UPDATE_CL;
			Type type = new TypeReference<List<SaintMonsterWashRankModel>>() {}.getType();
			List<SaintMonsterWashRankModel> rankList = crossData.getObject(SaintMonsterWashRankEnum.rankList.name(), type);
			Type type1 = new TypeReference<Map<Integer, Integer>>() {
			}.getType();
			Map<Integer, Integer> endTimeMap = crossData.getObject(SaintMonsterWashRankEnum.endTimeMap.name(), type1);
			int PartId = CrossCache.getlocalPartId();
			SaintMonsterWashRankCache.getRankMap().put(PartId, rankList);
			SaintMonsterWashRankCache.setEndTimeMap(endTimeMap);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
		} catch (Exception e) {
			LogTool.error(e, SaintMonsterWashRankIO.class, "SaintMonsterWashRankIO askUpdate");
		}
	}

	/**
	 * 子服通知中央服发放奖励
	 */
	public void SendReward() {
		CrossData data = new CrossData();
		int getlocalPartId = CrossCache.getlocalPartId();
		int currentTime = TimeDateUtil.getCurrentTime();
		Map<Integer, Integer> endTimeMap = SaintMonsterWashRankCache.getEndTimeMap();
		if (endTimeMap.get(getlocalPartId) == null) {
			return;
		}
		if (currentTime >= endTimeMap.get(getlocalPartId)
				&& currentTime <= (endTimeMap.get(getlocalPartId) + TimeDateUtil.ONE_DAY_INT)) {
		data.putObject(SaintMonsterWashRankEnum.partId.name(), getlocalPartId);
		Client_2 ins2 = Client_2.getIns();
		Channel crossChannel = ins2.getCrossChannel();
		NettyWrite.writeXData(crossChannel, CrossConst.SAINT_MONSTER_WASH_RANK_SENDREWARD_CL, data);
		}
	}

	/**
	 * 中央服通知子服发放奖励
	 */
	public void crossSendReward(Channel channel, CrossData crossData) {
		int cmd = CrossConst.SAINT_MONSTER_WASH_RANK_SENDREWARD_CL;
		int currentTime = TimeDateUtil.getCurrentTime();	
		int partId = crossData.getObject(SaintMonsterWashRankEnum.partId.name(), Integer.class);
		Map<Integer, Integer> sendRewardMap = CrossSaintMonsterWashRankCache.getSendRewardMap();
		Map<Integer, Integer> endTimeMap = CrossSaintMonsterWashRankCache.getEndTimeMap();
		Integer endTime = endTimeMap.get(partId);
		if (endTime == null) {
			return;
		}
		if (currentTime >= endTime && endTime > 0 && sendRewardMap.get(partId) == null) {
			sendRewardMap.put(partId, endTime);
			CrossData crossData1 = new CrossData();
			ConcurrentHashMap<Integer, ConcurrentHashMap<Channel, List<Integer>>> pchToZoneMap = CrossCache
					.getPchToZoneMap();
			Iterator<Integer> iterator = pchToZoneMap.keySet().iterator();
			ConcurrentHashMap<Channel, List<Integer>> chToZone = null;
			while (iterator.hasNext()) {
				Integer next = iterator.next();
				chToZone = pchToZoneMap.get(next);
				Map<Integer, List<SaintMonsterWashRankModel>> rankMap = CrossSaintMonsterWashRankCache.getRankMap();
				List<SaintMonsterWashRankModel> rankList = rankMap.get(partId);
				crossData1.putObject(SaintMonsterWashRankEnum.rankList.name(), rankList);
				for (Channel channel1 : chToZone.keySet()) {
					NettyWrite.writeXData(channel1, CrossConst.SAINT_MONSTER_WASH_RANK_SENDREWARD, crossData1);
				}
			}
		}

	}

	/**
	 * 添加洗练次数
	 */
	public void addWashTimes(Hero hero, int addNum) {
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
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.SAINT_MONSTER_WASH_RANK);
			SaintMonsterWash saintMonsterWashRank = (SaintMonsterWash) SaintMonsterWashRankManager.getIns()
					.getSystemModel(hero, uid);
			int endTime = 0;
			int realEndTime = 0;
			if (endTimeMap.get(getlocalPartId) == null) {
				endTime = OpenDaysSystemSysCache.getOpenMap().get(uid).getEndTime();
				realEndTime = endTime - TimeDateUtil.ONE_DAY_INT;// 活动时间维持6天 第七天只展示
				SaintMonsterWashRankCache.getEndTimeMap().put(getlocalPartId, realEndTime);
			} else {
				realEndTime = SaintMonsterWashRankCache.getEndTimeMap().get(getlocalPartId);
			}
			if (TimeDateUtil.getCurrentTime() > realEndTime) {
				return;
			}
			int washTimes = saintMonsterWashRank.getWashTimes();
			saintMonsterWashRank.setWashTimes(washTimes + addNum);

			SaintMonsterWashRankModel rankModel = new SaintMonsterWashRankModel();
			rankModel.setHid(hero.getId());
			rankModel.setName(hero.getNameZoneid());
			rankModel.setIcon(hero.getIcon());
			rankModel.setJob(hero.getJob());
			rankModel.setCountry(hero.getCountryType());
			rankModel.setFrame(hero.getFrame());
			rankModel.setTotalTimes(washTimes + addNum);
			rankModel.setVip(hero.getVipLv());
			rankModel.setReachTime(TimeDateUtil.getCurrentTime());
			Map<Integer, List<SaintMonsterWashRankModel>> rankMap = SaintMonsterWashRankCache.getRankMap();
			int partId = CrossCache.getlocalPartId();
			List<SaintMonsterWashRankModel> list = rankMap.get(partId);
			if (list == null) {
				list = new ArrayList<SaintMonsterWashRankModel>();
			}
			boolean old = false;
			Iterator<SaintMonsterWashRankModel> iterator = list.iterator();
			while (iterator.hasNext()) {
				SaintMonsterWashRankModel next = iterator.next();
				if (hero.getId() == next.getHid()) {
					old = true;
					iterator.remove();
				}
			}
			if (old) {
				refreshRankList(1, rankModel);
			} else {
				list.add(rankModel);
				rankMap.put(partId, list);
				refreshRankList(1, rankModel);
			}

			CrossData data = new CrossData();
			data.putObject(SaintMonsterWashRankEnum.hid.name(), hero.getId());
			data.putObject(SaintMonsterWashRankEnum.name.name(), hero.getNameZoneid());
			data.putObject(SaintMonsterWashRankEnum.icon.name(), hero.getIcon());
			data.putObject(SaintMonsterWashRankEnum.job.name(), hero.getJob());
			data.putObject(SaintMonsterWashRankEnum.country.name(), hero.getCountryType());
			data.putObject(SaintMonsterWashRankEnum.frame.name(), hero.getFrame());
			data.putObject(SaintMonsterWashRankEnum.totalTimes.name(), saintMonsterWashRank.getWashTimes());
			data.putObject(SaintMonsterWashRankEnum.vip.name(), hero.getVipLv());
			data.putObject(SaintMonsterWashRankEnum.reachTime.name(), TimeDateUtil.getCurrentTime());
			data.putObject(SaintMonsterWashRankEnum.endTime.name(), realEndTime);
			data.putObject(SaintMonsterWashRankEnum.partId.name(), partId);
			Client_2 ins2 = Client_2.getIns();
			Channel crossChannel = ins2.getCrossChannel();
			NettyWrite.writeXData(crossChannel, CrossConst.SAINT_MONSTER_WASH_RANK_UPDATE, data);

		} catch (Exception e) {
			LogTool.error(e, SaintMonsterWashRankFunction.class, hero.getId(), hero.getName(),
					"SaintMonsterWashRankFunction addWashTimes, addNum=" + addNum);
		}
	}




}
