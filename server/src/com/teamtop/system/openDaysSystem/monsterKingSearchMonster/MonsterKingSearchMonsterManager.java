package com.teamtop.system.openDaysSystem.monsterKingSearchMonster;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentSkipListSet;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossEnum;
import com.teamtop.cross.CrossPartCache;
import com.teamtop.cross.callback.Callback;
import com.teamtop.gameCommon.GameProperties;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.NoticeOpTaskRunnable;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.global.GlobalSender;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.AbsOpenDaysManager;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.OpenDaysSystemSender;
import com.teamtop.system.openDaysSystem.OpenDaysSystemSysCache;
import com.teamtop.system.openDaysSystem.model.AbsOpenDaysSystemModel;
import com.teamtop.system.openDaysSystem.model.OpenSystemInfo;
import com.teamtop.system.openDaysSystem.monsterKingSearchMonster.model.MonsterKingSearchMonster;
import com.teamtop.system.openDaysSystem.monsterKingSearchMonster.model.MonsterKingSearchPartInfo;
import com.teamtop.system.openDaysSystem.monsterKingSearchMonster.model.MonsterKingSearchRank;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_hdfl_012;
import excel.struct.Struct_hdfl_012;
import excel.struct.Struct_kuafu_200;
import io.netty.channel.Channel;

public class MonsterKingSearchMonsterManager extends AbsOpenDaysManager {

	private static MonsterKingSearchMonsterManager ins;

	private MonsterKingSearchMonsterManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized MonsterKingSearchMonsterManager getIns() {
		if (ins == null) {
			ins = new MonsterKingSearchMonsterManager();
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
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.MONSTER_KING_SEARCH_MONSTER)) {
				return;
			}
			int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.MONSTER_KING_SEARCH_MONSTER);
			Map<Integer, AbsOpenDaysSystemModel> opSysDataMap = hero.getHeroOpenDaysSysData().getOpSysDataMap();
			MonsterKingSearchMonster model = (MonsterKingSearchMonster) opSysDataMap.get(uid);
			if (model == null) {
				return;
			}
			int qs = model.getQs();
			int partId = CrossCache.getlocalPartId();
			MonsterKingSearchPartInfo partInfo = MonsterKingSearchMonsterSysCache.getPartMap().get(partId);
			if (partInfo == null) {
				return;
			}
			int endTime = partInfo.getEndTime();
			int currentTime = TimeDateUtil.getCurrentTime();
			// if (currentTime > endTime) {
			// return;
			// }
			int job = hero.getJob();
			int myNum = model.getSearchTimes();
			int myRank = 0;
			ConcurrentSkipListSet<MonsterKingSearchRank> rankSet = partInfo.getRankSet();
			Iterator<MonsterKingSearchRank> iterator = rankSet.iterator();
			int ranking = 1;
			List<Object[]> rankData = new ArrayList<>();
			List<Object[]> iconData = new ArrayList<>();
			for (; iterator.hasNext();) {
				MonsterKingSearchRank rank = iterator.next();
				if (rank.getHid() == hid) {
					myRank = ranking;
				}
				if (ranking == 1) {
					job = rank.getJob();
				}
				if (ranking == 2 || ranking == 3) {
					iconData.add(new Object[] { rank.getIcon(), rank.getFrame(), rank.getCountry(), rank.getVipLv() });
				}
				rankData.add(new Object[] { ranking, rank.getName(), rank.getNum() });
				ranking++;
			}
			GlobalSender.sendCmd_270(hid, SystemIdConst.MONSTER_KING_SEARCH_MONSTER, uid, job, rankData.toArray(),
					iconData.toArray(), myNum, myRank, endTime);
		} catch (Exception e) {
			LogTool.error(e, MonsterKingSearchMonsterManager.class, hid, hero.getName(),
					"MonsterKingSearchMonsterManager openUI");
		}
		checkSynRank();
	}

	public void checkSynRank() {
		try {
			OpTaskExecutorService.PublicOrderService.execute(new NoticeOpTaskRunnable() {

				@Override
				public void run() {
					checkSynRankHandle();
				}

				@Override
				public Object getSession() {
					return OpTaskConst.MONSTER_KING_SEARCH_ASK_SYN;
				}
			});
		} catch (Exception e) {
			LogTool.error(e, MonsterKingSearchMonsterManager.class, "MonsterKingSearchMonsterManager checkSynRank");
		}
	}

	/**
	 * 检测时间，请求最新排行数据
	 */
	public void checkSynRankHandle() {
		try {
			int currentTime = TimeDateUtil.getCurrentTime();
			int lastSynTime = MonsterKingSearchMonsterSysCache.synTime;
			if (lastSynTime == 0) {
				MonsterKingSearchMonsterSysCache.synTime = currentTime;
				return;
			}
			int passTime = currentTime - lastSynTime;
			if (passTime >= MonsterKingSearchMonsterConst.GRAP_TIME) {
				MonsterKingSearchMonsterSysCache.synTime = currentTime;
				CrossData crossData = new CrossData();
				Channel channel = Client_2.getIns().getCrossChannel();
				NettyWrite.writeXData(channel, CrossConst.CROSS_MK_SEARCH_MONSTER_ASK_LC, crossData, new Callback() {
					
					@Override
					public void dataReci(Channel channel, CrossData crossData) {
						MonsterKingSearchPartInfo info = crossData.getObject(CrossEnum.data1.name(), MonsterKingSearchPartInfo.class);
						if(info!=null) {
							int partId = CrossCache.getlocalPartId();
							MonsterKingSearchMonsterSysCache.getPartMap().put(partId, info);
						}
					}
				});
			}
		} catch (Exception e) {
			LogTool.error(e, MonsterKingSearchMonsterManager.class, "MonsterKingSearchMonsterManager checkSynRankHandle");
		}
	}

	@Override
	public boolean checkisOpen() {
		return MonsterKingSearchMonsterSysCache.isOpen;
	}

	@Override
	public void handleOpenPub() {
		int partId = CrossCache.getlocalPartId();
		Struct_kuafu_200 struct_kuafu_200 = CrossPartCache.getPartMap().get(partId);
		int[][] boss = struct_kuafu_200.getBoss();
		int zoneId = GameProperties.getFirstZoneId();
		if (zoneId != boss[0][0]) {
			// 非首服 请求状态
			MonsterKingSearchMonsterFunction.getIns().zeroCheck();
			return;
		}
		int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.MONSTER_KING_SEARCH_MONSTER);
		OpenSystemInfo openSystemInfo = OpenDaysSystemSysCache.getOpenMap().get(uid);
		int endTime = openSystemInfo.getEndTime();
		endTime = endTime - TimeDateUtil.ONE_DAY_INT;
//		Map<Integer, MonsterKingSearchPartInfo> partMap = MonsterKingSearchMonsterSysCache.getPartMap();
//		MonsterKingSearchPartInfo info = partMap.get(partId);
//		if (info == null) {
//			info = new MonsterKingSearchPartInfo();
//			info.setEndTime(endTime);
//			info.setFirstZoneId(zoneId);
//			partMap.put(partId, info);
//		}
		Channel channel = Client_2.getIns().getCrossChannel();
		CrossData crossData = new CrossData();
		crossData.putObject(CrossEnum.time.name(), endTime);
		crossData.putObject(CrossEnum.zoneid.name(), zoneId);
		NettyWrite.writeXData(channel, CrossConst.CROSS_MK_SEARCH_MONSTER_NOTICE_LC, crossData);
	}

	@Override
	public void handleOpen(Hero hero, int uid) {

	}

	@Override
	public void handleEndPub() {
		MonsterKingSearchMonsterSysCache.getPartMap().clear();
	}

	@Override
	public void handleEnd(Hero hero, int uid) {
		// TODO Auto-generated method stub

	}

	@Override
	public AbsOpenDaysSystemModel getSystemModel(Hero hero, int uid) {
		Map<Integer, AbsOpenDaysSystemModel> opSysDataMap = hero.getHeroOpenDaysSysData().getOpSysDataMap();
		MonsterKingSearchMonster model = (MonsterKingSearchMonster) opSysDataMap.get(uid);
		if (model == null) {
			model = new MonsterKingSearchMonster();
		}
		return model;
	}

	@Override
	public Class<?> getSystemModel() {
		return MonsterKingSearchMonster.class;
	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		return MonsterKingSearchMonsterEvent.getIns();
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub

	}

	@Override
	public void consumeHandle(Hero hero, int consumeNum, int reason) {
		// TODO Auto-generated method stub

	}
	
	@Override
	public void sendOpneState(Hero hero) {
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.MONSTER_KING_SEARCH_MONSTER)) {
			return;
		}
		int partId = CrossCache.getlocalPartId();
		MonsterKingSearchPartInfo partInfo = MonsterKingSearchMonsterSysCache.getPartMap().get(partId);
		if (partInfo == null) {
			return;
		}
		int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.MONSTER_KING_SEARCH_MONSTER);
		int endTime = partInfo.getEndTime();
		Struct_hdfl_012 hdfl_012 = Config_hdfl_012.getIns().get(uid);
		int open = hdfl_012.getOpen();
		OpenSystemInfo openSystemInfo = OpenDaysSystemSysCache.getOpenMap().get(uid);
		int startTime = openSystemInfo.getStartTime();
		int opEndTime = openSystemInfo.getEndTime();
		int qs = openSystemInfo.getQs();
		int openDays = TimeDateUtil.betweenOpen(endTime);
		if (openDays <= open) {
			OpenDaysSystemSender.sendCmd_4572(hero.getId(), 0, uid, SystemIdConst.MONSTER_KING_SEARCH_MONSTER, qs,
					startTime, opEndTime);
		}
	}

}
