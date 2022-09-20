package com.teamtop.system.openDaysSystem.monsterKingSearchMonster.cross;

import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentSkipListSet;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossEnum;
import com.teamtop.cross.CrossPartCache;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.OpenDaysSystemSender;
import com.teamtop.system.openDaysSystem.OpenDaysSystemSysCache;
import com.teamtop.system.openDaysSystem.model.OpenSystemInfo;
import com.teamtop.system.openDaysSystem.monsterKingSearchMonster.MonsterKingSearchMonsterFunction;
import com.teamtop.system.openDaysSystem.monsterKingSearchMonster.MonsterKingSearchMonsterManager;
import com.teamtop.system.openDaysSystem.monsterKingSearchMonster.MonsterKingSearchMonsterSysCache;
import com.teamtop.system.openDaysSystem.monsterKingSearchMonster.model.MonsterKingSearchPartInfo;
import com.teamtop.system.openDaysSystem.monsterKingSearchMonster.model.MonsterKingSearchRank;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_hdfl_012;
import excel.config.Config_pmhdsbdjcsb_326;
import excel.struct.Struct_hdfl_012;
import excel.struct.Struct_kuafu_200;
import excel.struct.Struct_wszwxsxspm_325;
import io.netty.channel.Channel;

public class MonsterKingSearchMonsterIO {

	private static MonsterKingSearchMonsterIO ins;

	private MonsterKingSearchMonsterIO() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized MonsterKingSearchMonsterIO getIns() {
		if (ins == null) {
			ins = new MonsterKingSearchMonsterIO();
		}
		return ins;
	}

	/**
	 * 中央服收到子服通知更新排行
	 * @param channel
	 * @param crossData
	 */
	public void updateRank(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_MK_SEARCH_MONSTER_UPDATE_LC;
		MonsterKingSearchRank rank = crossData.getObject(CrossEnum.data1.name(), MonsterKingSearchRank.class);
		try {
			if (rank != null) {
				int partId = CrossCache.getPartId(channel);
				MonsterKingSearchPartInfo searchPartInfo = MonsterKingSearchMonsterSysCache.getPartMap().get(partId);
				int endTime = searchPartInfo.getEndTime();
				int currentTime = TimeDateUtil.getCurrentTime();
				if (endTime != 0 && currentTime >= endTime) {
					return;
				}
				// 更新中央服排行榜
				MonsterKingSearchMonsterFunction.getIns().refreshRank(rank, partId);
				// 通知本跨服组其他区
				ConcurrentHashMap<Channel, List<Integer>> map = CrossCache.getChannelToZoneidByPartId(partId);
				Iterator<Channel> iterator = map.keySet().iterator();
				for (; iterator.hasNext();) {
					Channel tempChannel = iterator.next();
					if (tempChannel != null && (!(tempChannel == channel))) {
						NettyWrite.writeXData(tempChannel, CrossConst.CROSS_MK_SEARCH_MONSTER_UPDATE_CL, crossData);
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, MonsterKingSearchMonsterIO.class, rank.getHid(), rank.getName(),
					"MonsterKingSearchMonsterIO updateRank");
		}
	}

	/**
	 * 其他子服收到中央服通知更新排行
	 * @param channel
	 * @param crossData
	 */
	public void updateRankLocal(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_MK_SEARCH_MONSTER_UPDATE_CL;
		MonsterKingSearchRank rank = crossData.getObject(CrossEnum.data1.name(), MonsterKingSearchRank.class);
		try {
			try {
				int partId = CrossCache.getlocalPartId();
				// 更新中央服排行榜
				MonsterKingSearchMonsterFunction.getIns().refreshRank(rank, partId);
			} catch (Exception e) {
				LogTool.error(e, MonsterKingSearchMonsterIO.class, rank.getHid(), rank.getName(),
						"MonsterKingSearchMonsterIO updateRank");
			}
		} catch (Exception e) {
			LogTool.error(e, MonsterKingSearchMonsterIO.class, rank.getHid(), rank.getName(),
					"MonsterKingSearchMonsterIO updateRankLocal");
		}
	}

	/**
	 * 中央服收到通知活动开启
	 * @param channel
	 * @param crossData
	 */
	public void noticeCentralOpen(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_MK_SEARCH_MONSTER_NOTICE_LC;
		try {
			int endTime = crossData.getObject(CrossEnum.time.name(), Integer.class);
			int zoneid = crossData.getObject(CrossEnum.zoneid.name(), Integer.class);
			int partId = CrossCache.getPartId(channel);
			Map<Integer, MonsterKingSearchPartInfo> partMap = MonsterKingSearchMonsterSysCache.getPartMap();
			MonsterKingSearchPartInfo info = partMap.get(partId);
			if (info == null) {
				info = new MonsterKingSearchPartInfo();
				info.setEndTime(endTime);
				info.setFirstZoneId(zoneid);
				partMap.put(partId, info);
			}
			crossData.putObject(CrossEnum.partId.name(), partId);
			// 通知本跨服组其他区
			ConcurrentHashMap<Channel, List<Integer>> map = CrossCache.getChannelToZoneidByPartId(partId);
			Iterator<Channel> iterator = map.keySet().iterator();
			for (; iterator.hasNext();) {
				Channel tempChannel = iterator.next();
				if (tempChannel != null) {
					NettyWrite.writeXData(tempChannel, CrossConst.CROSS_MK_SEARCH_MONSTER_NOTICE_CL, crossData);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, MonsterKingSearchMonsterIO.class, "MonsterKingSearchMonsterIO noticeCentralOpen");
		}
	}

	/**
	 * 通知子服活动开启
	 * @param channel
	 * @param crossData
	 */
	public void noticeLocalOpen(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_MK_SEARCH_MONSTER_NOTICE_CL;
		try {
			int endTime = crossData.getObject(CrossEnum.time.name(), Integer.class);
			int zoneid = crossData.getObject(CrossEnum.zoneid.name(), Integer.class);
			int partId = crossData.getObject(CrossEnum.partId.name(), Integer.class);
			Map<Integer, MonsterKingSearchPartInfo> partMap = MonsterKingSearchMonsterSysCache.getPartMap();
			MonsterKingSearchPartInfo info = partMap.get(partId);
			if (info == null) {
				info = new MonsterKingSearchPartInfo();
				info.setEndTime(endTime);
				info.setFirstZoneId(zoneid);
				partMap.put(partId, info);
			}
			LogTool.info("MonsterKingSearchMonsterIO noticeLocalOpen success", MonsterKingSearchMonsterIO.class);
			MonsterKingSearchMonsterSysCache.isOpen = true;
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.MONSTER_KING_SEARCH_MONSTER);
			OpenSystemInfo openSystemInfo = OpenDaysSystemSysCache.getOpenMap().get(uid);
			if(openSystemInfo!=null) {				
				Iterator<Hero> iterator = HeroCache.getHeroMap().values().iterator();
				for (; iterator.hasNext();) {
					Hero hero = iterator.next();
					if (hero.isOnline()) {
						OpenDaysSystemSender.sendCmd_4572(hero.getId(), 1, uid, SystemIdConst.MONSTER_KING_SEARCH_MONSTER,
								openSystemInfo.getQs(), openSystemInfo.getStartTime(), openSystemInfo.getEndTime());
					}
				}
			}
		} catch (Exception e) {
			LogTool.error(e, MonsterKingSearchMonsterIO.class, "MonsterKingSearchMonsterIO noticeLocalOpen");
		}
	}
	
	/**
	 * 中央服收到子服请求检测活动开启状态
	 * @param channel
	 * @param crossData
	 */
	public void zeroCheck(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_MK_SEARCH_MONSTER_GET_STATE;
		try {
			int partId = CrossCache.getPartId(channel);
			Map<Integer, MonsterKingSearchPartInfo> partMap = MonsterKingSearchMonsterSysCache.getPartMap();
			MonsterKingSearchPartInfo info = partMap.get(partId);
			if (info == null) {
				crossData.putObject(CrossEnum.type.name(), -1);
			} else {
				crossData.putObject(CrossEnum.type.name(), 1);
				crossData.putObject(CrossEnum.data1.name(), info);
			}
			NettyWrite.writeXData(channel, CrossConst.CROSS_MK_SEARCH_MONSTER_CONN_CL, crossData);
		} catch (Exception e) {
			LogTool.error(e, MonsterKingSearchMonsterIO.class, "MonsterKingSearchMonsterIO zeroCheck");
		}
	}

	/**
	 * 同步数据信息
	 * @param channel
	 * @param crossData
	 */
	public void synInfo(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_MK_SEARCH_MONSTER_CONN_CL;
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(SystemIdConst.MONSTER_KING_SEARCH_MONSTER)) {
				return;
			}
			int partId = CrossCache.getlocalPartId();
			Integer type = crossData.getObject(CrossEnum.type.name(), Integer.class);
			if (type == 1) {
				MonsterKingSearchMonsterSysCache.isOpen = true;
				MonsterKingSearchPartInfo info = crossData.getObject(CrossEnum.data1.name(),
						MonsterKingSearchPartInfo.class);

				int endTime = info.getEndTime();
				if (endTime != 0 && TimeDateUtil.getCurrentTime() >= endTime) {
					MonsterKingSearchPartInfo oldInfo = MonsterKingSearchMonsterSysCache.getPartMap().get(partId);
					if (oldInfo != null) {
						ConcurrentSkipListSet<MonsterKingSearchRank> oldRankSet = oldInfo.getRankSet();
						info.setRankSet(oldRankSet);
					}
				}
				MonsterKingSearchMonsterSysCache.getPartMap().put(partId, info);
				LogTool.info("MonsterKingSearchMonsterIO open success", MonsterKingSearchMonsterIO.class);
			} else if (type == -1) {
				Struct_kuafu_200 struct_kuafu_200 = CrossPartCache.getPartMap().get(partId);
				int[][] boss = struct_kuafu_200.getBoss();
				int zoneId = GameProperties.getFirstZoneId();
				if (zoneId != boss[0][0]) {
					return;
				}
				MonsterKingSearchPartInfo partInfo = MonsterKingSearchMonsterSysCache.getPartMap().get(partId);
				if (partInfo == null) {
					MonsterKingSearchMonsterManager.getIns().handleOpenPub();
				}
			}
		} catch (Exception e) {
			LogTool.error(e, MonsterKingSearchMonsterIO.class, "MonsterKingSearchMonsterIO noticeLocalOpen");
		}
	}

	/**
	 * 请求最新排行数据
	 */
	public void askNewInfo(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_MK_SEARCH_MONSTER_ASK_LC;
		try {
			int partId = CrossCache.getPartId(channel);
			MonsterKingSearchPartInfo info = MonsterKingSearchMonsterSysCache.getPartMap().get(partId);
			crossData.putObject(CrossEnum.data1.name(), info);
			NettyWrite.writeCallbackData(channel, crossData, crossData.getCallbackCmd());
		} catch (Exception e) {
			LogTool.error(e, MonsterKingSearchMonsterIO.class, "MonsterKingSearchMonsterIO askNewInfo");
		}
	}

	/**
	 * 收到中央服通知发放奖励
	 * @param channel
	 * @param crossData
	 */
	public void sendReward(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_MK_SEARCH_MONSTER_SENDREWARD;
		try {
			MonsterKingSearchPartInfo info = crossData.getObject(CrossEnum.data1.name(), MonsterKingSearchPartInfo.class);
			int partId = CrossCache.getlocalPartId();
			if(info!=null) {
				MonsterKingSearchMonsterSysCache.getPartMap().put(partId, info);
				int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.MONSTER_KING_SEARCH_MONSTER);
				Struct_hdfl_012 hdfl_012 = Config_hdfl_012.getIns().get(uid);
				int qs = hdfl_012.getQs();
				Map<Integer, Struct_wszwxsxspm_325> map = MonsterKingSearchMonsterSysCache.getQsMap().get(qs);
				int bigNum = Config_pmhdsbdjcsb_326.getIns().get(SystemIdConst.MONSTER_KING_SEARCH_MONSTER).getDj();
				int rewardMailId = MailConst.MONSTER_KING_RANKING;
				int bigMailId = MailConst.MONSTER_KING_RANKING_BIG;
				ConcurrentSkipListSet<MonsterKingSearchRank> rankSet = info.getRankSet();
				Iterator<MonsterKingSearchRank> rankIter = rankSet.iterator();
				int ranking = 1;
				int zoneId = GameProperties.getFirstZoneId();
				for (; rankIter.hasNext();) {
					MonsterKingSearchRank rank = rankIter.next();
					try {
						StringBuilder sb = new StringBuilder();
						sb.append("MonsterKingSearchRank hid=").append(rank.getHid()).append(", num=").append(rank.getNum()).append(", ranking=").append(ranking);
						LogTool.info(sb.toString(), this);
						if(rank.getZoneid()==zoneId) {							
							Struct_wszwxsxspm_325 rankReward = getRankReward(ranking, map);
							int[][] reward = rankReward.getReward();
							MailFunction.getIns().sendMailWithFujianData2(rank.getHid(), rewardMailId, new Object[] {rewardMailId, ranking}, reward);
							if(rank.getNum()>=bigNum) {						
								int[][] reward1 = rankReward.getReward1();
								MailFunction.getIns().sendMailWithFujianData2(rank.getHid(), bigMailId, new Object[] {bigMailId, ranking}, reward1);
							}
						}
					} catch (Exception e) {
						LogTool.error(e, this, rank.getHid(), rank.getName(), "MonsterKingSearchMonsterIO sendReward, ranking="+ranking);
					}
					ranking++;
				}
			}
		} catch (Exception e) {
			LogTool.error(e, MonsterKingSearchMonsterIO.class, "MonsterKingSearchMonsterIO sendReward");
		}
	}

	public Struct_wszwxsxspm_325 getRankReward(int ranking, Map<Integer, Struct_wszwxsxspm_325> map) {
		for (Struct_wszwxsxspm_325 data : map.values()) {
			int[][] rank = data.getRank();
			if (ranking >= rank[0][0] && ranking <= rank[0][1]) {
				return data;
			}
		}
		return null;
	}

}
