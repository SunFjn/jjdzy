package com.teamtop.system.activity.ativitys.arenaFight;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossPartCache;
import com.teamtop.cross.upload.CrossHeroBaseModel;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.activity.ativitys.arenaFight.cross.ArenaFightEnum;
import com.teamtop.system.activity.ativitys.arenaFight.cross.ArenaRewardTemp;
import com.teamtop.system.activity.ativitys.arenaFight.cross.CrossArenaFightSysCache;
import com.teamtop.system.activity.ativitys.arenaFight.model.ArenaFightMasterInfo;
import com.teamtop.system.activity.ativitys.arenaFight.model.PartArenaFightMaster;
import com.teamtop.system.robot.RobotUidCreator;
import com.teamtop.util.log.LogTool;

import excel.struct.Struct_leitai_500;
import io.netty.channel.Channel;

public class ArenaFightFunction {

	private static ArenaFightFunction ins;

	private ArenaFightFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized ArenaFightFunction getIns() {
		if (ins == null) {
			ins = new ArenaFightFunction();
		}
		return ins;
	};

	/**
	 * 初始化擂主（npc）
	 */
	public void initArenaMaster(int qs) {
		ConcurrentHashMap<Integer, PartArenaFightMaster> partArenaMap = CrossArenaFightSysCache.getPartArenaMap();
		partArenaMap.clear();
		Iterator<Integer> iterator = CrossPartCache.getPartMap().keySet().iterator();
		for (; iterator.hasNext();) {
			int partId = iterator.next();
			PartArenaFightMaster pm = new PartArenaFightMaster();
			// 初始化分组擂台数据
			initArenaFightMasterInfo(pm, qs);
			partArenaMap.put(partId, pm);
		}
	}

	/**
	 * 初始化分组擂台数据(中央服方法)
	 * @param pm 擂台数据
	 * @param periods 期数
	 */
	public void initArenaFightMasterInfo(PartArenaFightMaster pm, int qs) {
		ConcurrentHashMap<Integer, ArenaFightMasterInfo> arenaMap = pm.getArenaMap();
		List<Struct_leitai_500> list = CrossArenaFightSysCache.getQsMap().get(qs);
		int size = list.size();
		Struct_leitai_500 struct_leitai_500 = null;
		for(int i=0;i<size;i++) {
			struct_leitai_500 = list.get(i);
			int id = struct_leitai_500.getId();
			int npc = struct_leitai_500.getNpc();
			ArenaFightMasterInfo info = new ArenaFightMasterInfo();
			info.setId(id);
			long uid = RobotUidCreator.getUid();
			info.setMasterId(uid);
			info.setNpcId(npc);
			arenaMap.put(id, info);
		}
	}

	/**
	 * 通知子服活动战斗开始（中央服方法）
	 */
	public void noticeFightOpen() {
		Iterator<Channel> iterator = CrossCache.getChannelToZoneid().keySet().iterator();
		CrossData crossData = new CrossData();
		crossData.putObject(ArenaFightEnum.opState.name(), CrossArenaFightSysCache.opState);
		for (; iterator.hasNext();) {
			Channel channel = iterator.next();
			NettyWrite.writeXData(channel, CrossConst.CROSS_ARENA_FIGHT_START, crossData);
		}
	}

	/**
	 * 通知子服活动战斗开始（中央服方法）
	 */
	public void noticeFightEnd() {
		Iterator<Channel> iterator = CrossCache.getChannelToZoneid().keySet().iterator();
		CrossData crossData = new CrossData();
		for (; iterator.hasNext();) {
			Channel channel = iterator.next();
			NettyWrite.writeXData(channel, CrossConst.CROSS_ARENA_FIGHT_END, crossData);
		}
	}

	/**
	 * 结算处理（中央服方法）
	 */
	public void endHandle() {
		// 发奖励
		sendReward();
		// 统一通知战斗结束
		Iterator<Long> iterator = CrossArenaFightSysCache.getChaMap().keySet().iterator();
		List<Object[]> rewardData = new ArrayList<>();
		for (; iterator.hasNext();) {
			Long hid = iterator.next();
			if (hid != null) {
				ArenaFightSender.sendCmd_11604(hid, 2, rewardData.toArray());
			}
		}
		// 清理缓存数据
		clearCache();
		// 通知子服结束
		noticeFightEnd();
	}

	public void clearCache() {
		CrossArenaFightSysCache.getFightMap().clear();
		CrossArenaFightSysCache.getChaMap().clear();
		CrossArenaFightSysCache.getHeroFightMap().clear();
//		Iterator<ArenaFightModel> iterator = CrossArenaFightSysCache.getHeroArenaMap().values().iterator();
//		for (; iterator.hasNext();) {
//			ArenaFightModel model = iterator.next();
//			model.setArenaId(0);
//			model.setType(0);
//			model.setSite(0);
//			model.setMyOpstate(0);
//		}
	}

	/**
	 * 发放擂台奖励
	 */
	public void sendReward() {
		try {
			Iterator<PartArenaFightMaster> iterator = CrossArenaFightSysCache.getPartArenaMap().values().iterator();
			Map<Channel, List<Set<ArenaRewardTemp>>> map = new HashMap<>();
			for (; iterator.hasNext();) {
				PartArenaFightMaster partArean = iterator.next();
				Iterator<ArenaFightMasterInfo> masterIterator = partArean.getArenaMap().values().iterator();
				for (; masterIterator.hasNext();) {
					ArenaFightMasterInfo arenaFightMasterInfo = masterIterator.next();
					int id = arenaFightMasterInfo.getId();
					CrossHeroBaseModel master = arenaFightMasterInfo.getMaster();
					if (master == null) {
						continue;
					}
					Channel channel = CrossCache.getChannel(master.getZoneid());
					List<Set<ArenaRewardTemp>> list = map.get(channel);
					if (list == null) {
						list = new ArrayList<Set<ArenaRewardTemp>>();
						map.put(channel, list);
						Set<ArenaRewardTemp> masterSet = new HashSet<>();
						Set<ArenaRewardTemp> helperSet = new HashSet<>();
						list.add(masterSet);
						list.add(helperSet);
					}
					list.get(0).add(new ArenaRewardTemp(master.getId(), id));
					for (Long helper : arenaFightMasterInfo.getHelperSet()) {
						list.get(1).add(new ArenaRewardTemp(helper, id));
					}
				}
			}

			Iterator<Entry<Channel, List<Set<ArenaRewardTemp>>>> rewardIterator = map.entrySet().iterator();
			for (; rewardIterator.hasNext();) {
				Entry<Channel, List<Set<ArenaRewardTemp>>> entry = rewardIterator.next();
				Channel channel = entry.getKey();
				List<Set<ArenaRewardTemp>> list = entry.getValue();
				CrossData crossData = new CrossData();
				crossData.putObject(ArenaFightEnum.rewardNameList.name(), list);
				NettyWrite.writeXData(channel, CrossConst.CROSS_ARENA_FIGHT_REWARD, crossData);
			}
		} catch (Exception e) {
			LogTool.error(e, ArenaFightFunction.class, "ArenaFightFunction sendReward");
		}
	}

}
