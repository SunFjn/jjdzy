package com.teamtop.system.activity.ativitys.arenaFight;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map.Entry;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.cross.CrossCache;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossEnum;
import com.teamtop.cross.CrossFunction;
import com.teamtop.cross.CrossZone;
import com.teamtop.cross.upload.CrossHeroBaseModel;
import com.teamtop.netty.server.server2.Client_2;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.CrossBaseOpTaskRunnable;
import com.teamtop.system.activity.AbstractActivityManager;
import com.teamtop.system.activity.ActivitySysCache;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.arenaFight.cross.ArenaChaInfo;
import com.teamtop.system.activity.ativitys.arenaFight.cross.ArenaFightEnum;
import com.teamtop.system.activity.ativitys.arenaFight.cross.CrossArenaFightSysCache;
import com.teamtop.system.activity.ativitys.arenaFight.model.ArenaFightMasterInfo;
import com.teamtop.system.activity.ativitys.arenaFight.model.ArenaFightModel;
import com.teamtop.system.activity.ativitys.arenaFight.model.ArenaNoticeInfo;
import com.teamtop.system.activity.ativitys.arenaFight.model.PartArenaFightMaster;
import com.teamtop.system.activity.model.ActivityData;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.battle.BattleFunction;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.fashionClothes.FashionClothesManager;
import com.teamtop.system.godWeapon.GodWeaponFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_leitai_500;
import excel.config.Config_xtcs_004;
import io.netty.channel.Channel;

public class ArenaFightManager extends AbstractActivityManager {

	private static ArenaFightManager ins;

	public static synchronized ArenaFightManager getIns() {
		if (ins == null) {
			ins = new ArenaFightManager();
		}
		return ins;
	}

	@Override
	public void actOpen() {
		CrossData crossData = new CrossData();
		ActivityInfo activityInfo = ActivitySysCache.getActivityMap().get(ActivitySysId.ACT_ARENA_FIGHT);
		int endTime = activityInfo.getEndTime();
		int startTime = activityInfo.getStartTime();
		int qs = activityInfo.getPeriods();
		crossData.putObject(ArenaFightEnum.endTime.name(), endTime);
		crossData.putObject(ArenaFightEnum.startTime.name(), startTime);
		crossData.putObject(ArenaFightEnum.qs.name(), qs);
		Channel channel = Client_2.getIns().getCrossChannel();
		NettyWrite.writeXData(channel, CrossConst.CROSS_ARENA_ACT_OPEN, crossData);
	}

	@Override
	public void heroActOpen(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void actEnd() {
		// TODO Auto-generated method stub

	}

	@Override
	public void heroActEnd(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public ActivityData getActivityData(Hero hero, ActivityInfo activityInfo) {
		ArenaFightModel model = new ArenaFightModel(hero.getId(), activityInfo.getIndex(), activityInfo.getActId(),
				activityInfo.getPeriods());

		return model;
	}

	@Override
	public Class<?> getActivityData() {
		// TODO Auto-generated method stub
		return ArenaFightModel.class;
	}

	@Override
	public void rechargeHandle(Hero hero, int money, int product_id) {
		// TODO Auto-generated method stub

	}

	@Override
	public AbsSystemEvent getSystemEvent() {
		return ArenaFightSysEvent.getIns();
	}

	@Override
	public void openUI(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, ActivitySysId.ACT_ARENA_FIGHT)) {
				return;
			}
//			if (ArenaFightLocalCache.isFightOpen()) {
				// 触发登录跨服流程
			CrossFunction.askCross(hero, ActivitySysId.ACT_ARENA_FIGHT);
//			}
		} catch (Exception e) {
			LogTool.error(e, ArenaFightManager.class, hid, hero.getName(), "ArenaFightManager openUI");
		}
	}

	/**
	 * 发送界面信息
	 * @param hero
	 */
	public void sendInfo(Hero hero) {
		if (!CrossArenaFightSysCache.isActOpen()) {
			return;
		}
		if (!CrossArenaFightSysCache.isfightOpen()) {
			// return;
		}
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			ArenaFightModel arenaFightModel = CrossArenaFightSysCache.getHeroArenaMap().get(hid);
			int cdEndTime = arenaFightModel.getCdEndTime();
			int cdTime = cdEndTime - TimeDateUtil.getCurrentTime();
			cdTime = cdTime < 0 ? 0 : cdTime;
			int partId = CrossCache.getPartId(hero.getBelongZoneid());
			PartArenaFightMaster partArenaFightMaster = CrossArenaFightSysCache.getPartArenaMap().get(partId);
			if(partArenaFightMaster==null) {
				ArenaFightFunction.getIns().initArenaMaster(CrossArenaFightSysCache.qs);
				partArenaFightMaster = CrossArenaFightSysCache.getPartArenaMap().get(partId);
			}
			Iterator<Entry<Integer, ArenaFightMasterInfo>> iterator = partArenaFightMaster.getArenaMap().entrySet()
					.iterator();
			List<Object[]> arenaData = new ArrayList<>();
			Entry<Integer, ArenaFightMasterInfo> entry = null;
			ArenaFightMasterInfo arenaInfo = null;
			int id = 0;
			long masterId = 0;
			int body = 0;
			int nowGodWeapon = 0;
			for (; iterator.hasNext();) {
				entry = iterator.next();
				arenaInfo = entry.getValue();
				id = arenaInfo.getId();
				int npcId = arenaInfo.getNpcId();
				masterId = arenaInfo.getMasterId();
				List<Object[]> members = new ArrayList<>();
				// 擂主
				if (masterId > 0 && npcId == 0) {
					CrossHeroBaseModel master = arenaInfo.getMaster();
					body = FashionClothesManager.getIns().getBodyid(master.getJob(), master.getBodyModel());
					nowGodWeapon = GodWeaponFunction.getIns().getNowGodWeapon(master);
					members.add(new Object[] { masterId, master.getNameZoneid(), master.getIcon(), master.getFrame(),
							master.getMount().getRideId(), master.getTotalStrength(), 0, body, nowGodWeapon, 1, 0 });
				} else {
					members.add(new Object[] { masterId, "", 0, 0, 0, 0, arenaInfo.getNpcId(), 0, 0, 1, 0 });
				}
				// 协助成员
				Iterator<Entry<Integer, CrossHeroBaseModel>> helpIterator = arenaInfo.getHelperMap().entrySet()
						.iterator();
				for (; helpIterator.hasNext();) {
					Entry<Integer, CrossHeroBaseModel> mInfo = helpIterator.next();
					CrossHeroBaseModel member = mInfo.getValue();
					body = FashionClothesManager.getIns().getBodyid(member.getJob(), member.getBodyModel());
					nowGodWeapon = GodWeaponFunction.getIns().getNowGodWeapon(member);
					members.add(new Object[] { member.getId(), member.getNameZoneid(), member.getIcon(),
							member.getFrame(), member.getMount().getRideId(), member.getTotalStrength(), 0, body,
							nowGodWeapon, 0, mInfo.getKey() });
				}
				arenaData.add(new Object[] { id, members.toArray() });
			}
			ArenaFightSender.sendCmd_11600(hid, arenaData.toArray(), cdTime);
		} catch (Exception e) {
			LogTool.error(e, ArenaFightManager.class, hid, hero.getName(), "ArenaFightManager sendInfo");
		}
	}

	/**
	 * 挑战擂主
	 * @param hero
	 * @param arenaId 擂台id
	 * @param masterId
	 */
	public void challenge(Hero hero, int arenaId, long masterId) {
		if (!CrossZone.isCrossServer()) {
			return;
		}
		if (!CrossArenaFightSysCache.isActOpen()) {
			return;
		}
		if (!CrossArenaFightSysCache.isfightOpen()) {
			return;
		}
		if (hero == null) {
			return;
		}
		int partId = CrossCache.getPartId(hero.getBelongZoneid());
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, ActivitySysId.ACT_ARENA_FIGHT)) {
				return;
			}
			if (hid == masterId) {
				// 不能挑战自己
				ArenaFightSender.sendCmd_11602(hid, 0, 1, 0);
				return;
			}
			ArenaFightModel arenaFightModel = CrossArenaFightSysCache.getHeroArenaMap().get(hid);
			int cdEndTime = arenaFightModel.getCdEndTime();
			int cdTime = cdEndTime - TimeDateUtil.getCurrentTime();
			cdTime = cdTime < 0 ? 0 : cdTime;
			if (cdTime > 0) {
				ArenaFightSender.sendCmd_11602(hid, 0, 6, 0);
				return;
			}
			OpTaskExecutorService.PublicOrderService.execute(new CrossBaseOpTaskRunnable() {

				@Override
				public void run() {
					if (masterId == 0) {
						emptyMasterHandle(hero, hid, arenaId);
					} else {
						masterHandle(hero, hid, arenaId, masterId);
					}
				}

				@Override
				public Object getSession() {
					return partId;
				}
			});

		} catch (Exception e) {
			LogTool.error(e, ArenaFightManager.class, hid, hero.getName(), "ArenaFightManager challenge");
		}
	}

	/**
	 * 擂台没擂主处理
	 * @param hero
	 * @param hid
	 * @param arenaId
	 */
	public void emptyMasterHandle(Hero hero, long hid, int arenaId) {
		try {
			int partId = CrossCache.getPartId(hero.getZoneid());
			PartArenaFightMaster partArenaFightMaster = CrossArenaFightSysCache.getPartArenaMap().get(partId);
			ArenaFightMasterInfo arenaFightMasterInfo = partArenaFightMaster.getArenaMap().get(arenaId);
			long nowMasterId = arenaFightMasterInfo.getMasterId();
			if (nowMasterId != 0) {
				ArenaFightSender.sendCmd_11602(hid, 0, 2, 0);
				return;
			}
			CrossHeroBaseModel crossHeroBaseModel = CrossArenaFightSysCache.getHeroFightMap().get(hid);
			if (crossHeroBaseModel == null) {
				return;
			}
			// 检测是否被挑战中
			ConcurrentHashMap<Long, Integer> fightMap = CrossArenaFightSysCache.getFightMap();
			ArenaFightModel myFightModel = CrossArenaFightSysCache.getHeroArenaMap().get(hid);
			int myType = myFightModel.getType();
			if (myType == 2 && myFightModel.getArenaId() == arenaId) {
				ArenaFightSender.sendCmd_11602(hid, 0, 5, 0);
				return;
			}
			if (myType == 1) {
				// 自己是擂主，检测是否被挑战中
				if (fightMap.containsKey(hid)) {
					Integer time = fightMap.get(hid);
					int passTime = TimeDateUtil.getCurrentTime() - time;
					if (passTime >= ArenaFightConst.LIMIT_TIME) {
						fightMap.remove(hid);
					} else {
						// 被挑战中
						ArenaFightSender.sendCmd_11602(hid, 0, 4, 0);
						return;
					}
				}
			}
			leaveArena(hero);
			ArenaFightModel myModel = CrossArenaFightSysCache.getHeroArenaMap().get(hid);
			myModel.setType(1);
			myModel.setArenaId(arenaId);
			myModel.setMyOpstate(CrossArenaFightSysCache.opState);
			int cd = Config_xtcs_004.getIns().get(ArenaFightConst.CHALLENGE_CD).getNum();
			myModel.setCdEndTime(TimeDateUtil.getCurrentTime() + cd);
			arenaFightMasterInfo.setMasterId(hid);
			arenaFightMasterInfo.setMaster(crossHeroBaseModel);
			arenaFightMasterInfo.setNpcId(0);
			ArenaFightSender.sendCmd_11602(hid, 2, arenaId, hid);
			sendInfo(hero);
			Iterator<Long> boardIter = CrossArenaFightSysCache.getHeroArenaMap().keySet().iterator();
			for (; boardIter.hasNext();) {
				Long pid = boardIter.next();
				if (pid == hid) {
					continue;
				}
				Hero player = HeroCache.getHero(pid);
				if (player != null) {
					sendInfo(player);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, ArenaFightManager.class, hid, hero.getName(), "ArenaFightManager emptyMasterHandle");
		}
	}

	/**
	 * 挑战有擂主
	 * @param hero
	 * @param hid
	 * @param arenaId
	 * @param masterId
	 */
	public void masterHandle(Hero hero, long hid, int arenaId, long masterId) {
		try {
			int partId = CrossCache.getPartId(hero.getBelongZoneid());
			PartArenaFightMaster partArenaFightMaster = CrossArenaFightSysCache.getPartArenaMap().get(partId);
			ArenaFightMasterInfo arenaFightMasterInfo = partArenaFightMaster.getArenaMap().get(arenaId);
			long nowMasterId = arenaFightMasterInfo.getMasterId();
			int npcId = arenaFightMasterInfo.getNpcId();
			if (npcId > 0) {
				// npc

			} else {
				ArenaFightModel masterModel = CrossArenaFightSysCache.getHeroArenaMap().get(masterId);
				if (masterModel == null) {
					// 不是擂主 刷新界面信息
					ArenaFightSender.sendCmd_11602(hid, 0, 2, 0);
					return;
				}
				if (masterId != nowMasterId) {
					// 不是此擂台的擂主 刷新界面信息
					ArenaFightSender.sendCmd_11602(hid, 0, 2, 0);
					return;
				}
			}

			int currentTime = TimeDateUtil.getCurrentTime();
			ConcurrentHashMap<Long, Integer> fightMap = CrossArenaFightSysCache.getFightMap();
			ArenaFightModel myFightModel = CrossArenaFightSysCache.getHeroArenaMap().get(hid);
			int myType = myFightModel.getType();
			if (myType == 2 && myFightModel.getArenaId() == arenaId) {
				ArenaFightSender.sendCmd_11602(hid, 0, 5, 0);
				return;
			}
			if (myType == 1) {
				// 自己是擂主，检测是否被挑战中
				if (fightMap.containsKey(hid)) {
					Integer time = fightMap.get(hid);
					int passTime = currentTime - time;
					if (passTime >= ArenaFightConst.LIMIT_TIME) {
						fightMap.remove(hid);
					} else {
						// 被挑战中
						ArenaFightSender.sendCmd_11602(hid, 0, 4, 0);
						return;
					}
				}
			}
			//
			Integer time = fightMap.get(masterId);
			if (time != null) {
				int passTime = currentTime - time;
				if (passTime >= ArenaFightConst.LIMIT_TIME) {
					fightMap.remove(masterId);
				} else {
					// 被挑战中
					ArenaFightSender.sendCmd_11602(hid, 0, 3, 0);
					return;
				}
			}
			fightMap.put(masterId, currentTime);
			ConcurrentHashMap<Long, ArenaChaInfo> chaMap = CrossArenaFightSysCache.getChaMap();
			ArenaChaInfo chaInfo = new ArenaChaInfo();
			chaInfo.setArenaId(arenaId);
			chaInfo.setMasterId(masterId);
			chaInfo.setNpcId(npcId);
			chaMap.put(hid, chaInfo);
			if (npcId == 0) {
				CrossHeroBaseModel master = arenaFightMasterInfo.getMaster();
				HeroFunction.getIns().sendBattleHeroAttr(hero, master);
			}
			ArenaFightSender.sendCmd_11602(hid, 1, arenaId, masterId);
		} catch (Exception e) {
			LogTool.error(e, ArenaFightManager.class, hid, hero.getName(), "ArenaFightManager emptyMasterHandle");
		}
	}

	/**
	 * 战斗结果处理
	 * @param hero
	 * @param result
	 */
	public void fightEnd(Hero hero, int result) {
		if (!CrossZone.isCrossServer()) {
			return;
		}
		if (!CrossArenaFightSysCache.isActOpen()) {
			return;
		}
		if (!CrossArenaFightSysCache.isfightOpen()) {
			return;
		}
		if (hero == null) {
			return;
		}
		int partId = CrossCache.getPartId(hero.getBelongZoneid());
		long hid = hero.getId();
		ArenaChaInfo chaInfo = null;
		long masterId = 0;
		ConcurrentHashMap<Long, ArenaChaInfo> chaMap = CrossArenaFightSysCache.getChaMap();
		ConcurrentHashMap<Long, Integer> fightMap = CrossArenaFightSysCache.getFightMap();
		try {
			chaInfo = chaMap.get(hid);
			if (chaInfo == null) {
				// 没有进行战斗
				return;
			}
			masterId = chaInfo.getMasterId();
			int npcId = chaInfo.getNpcId();
			int arenaId = chaInfo.getArenaId();
			// 胜利
			ArenaFightModel fightModel = null;
			long enermyStrength = 1;
			if (npcId == 0) {
				fightModel = CrossArenaFightSysCache.getHeroArenaMap().get(masterId);
				CrossHeroBaseModel enermyMode = CrossArenaFightSysCache.getHeroFightMap().get(masterId);
				enermyStrength = enermyMode.getTotalStrength();
			}
			CrossHeroBaseModel myMode = CrossArenaFightSysCache.getHeroFightMap().get(hid);
			int checkResult = BattleFunction.checkWinByFight(myMode.getTotalStrength(), enermyStrength,
					ActivitySysId.ACT_ARENA_FIGHT);
			if (checkResult == 0) {
				result = 0;
			}
			int finalResult = result;
			ArenaFightModel arenaFightModel = fightModel;
			long tmepMasterId = masterId;
			OpTaskExecutorService.PublicOrderService.execute(new CrossBaseOpTaskRunnable() {

				@Override
				public void run() {
					ArenaFightModel myModel = CrossArenaFightSysCache.getHeroArenaMap().get(hid);
					int cd = Config_xtcs_004.getIns().get(ArenaFightConst.CHALLENGE_CD).getNum();
					myModel.setCdEndTime(TimeDateUtil.getCurrentTime() + cd);
					if (finalResult == 1) {
						winHandle(hero, arenaId, arenaFightModel, tmepMasterId);
					} else {
						// 失败
						String nameZoneid = hero.getNameZoneid();
						if (arenaFightModel != null) {
							List<ArenaNoticeInfo> noticeList = arenaFightModel.getNoticeList();
							ArenaNoticeInfo arenaNoticeInfo = new ArenaNoticeInfo();
							arenaNoticeInfo.setWin(1);
							arenaNoticeInfo.setName(nameZoneid);
							noticeList.add(arenaNoticeInfo);
							if (noticeList.size() > ArenaFightConst.NOTICE_MAX_SIZE) {
								noticeList.remove(0);
							}
						}
						List<Object[]> rewardData = new ArrayList<>();
						ArenaFightSender.sendCmd_11604(hid, 0, rewardData.toArray());
					}

					fightMap.remove(tmepMasterId);
					chaMap.remove(hid);
				}

				@Override
				public Object getSession() {
					return partId;
				}
			});

		} catch (Exception e) {
			if (masterId != 0) {
				fightMap.remove(masterId);
			}
			chaMap.remove(hid);
			LogTool.error(e, ArenaFightManager.class, hid, hero.getName(), "ArenaFightManager fightEnd");
		}
	}

	public void winHandle(Hero hero, int arenaId, ArenaFightModel arenaFightModel, long masterId) {
		long hid = hero.getId();
		try {
			// 胜利方离开之前的擂台
			leaveArena(hero);
			int partId = CrossCache.getPartId(hero.getBelongZoneid());
			PartArenaFightMaster partArenaFightMaster = CrossArenaFightSysCache.getPartArenaMap().get(partId);
			ArenaFightMasterInfo arenaFightMasterInfo = partArenaFightMaster.getArenaMap().get(arenaId);
			// 清除旧擂主数据
			CrossHeroBaseModel master = arenaFightMasterInfo.getMaster();
			String nameZoneid = "";
			if (master != null) {
				nameZoneid = hero.getNameZoneid();
			}
			if (arenaFightModel != null) {
				arenaFightModel.setArenaId(0);
				arenaFightModel.setType(0);
			}
			ConcurrentHashMap<Integer, CrossHeroBaseModel> helperMap = arenaFightMasterInfo.getHelperMap();
			Iterator<CrossHeroBaseModel> iterator = helperMap.values().iterator();
			for (; iterator.hasNext();) {
				CrossHeroBaseModel helper = iterator.next();
				ArenaFightModel helperModel = CrossArenaFightSysCache.getHeroArenaMap().get(helper.getId());
				if (helperModel != null) {
					helperModel.setArenaId(0);
					helperModel.setType(0);
					helperModel.setSite(0);
				}
			}
			helperMap.clear();
			arenaFightMasterInfo.getHelperSet().clear();
			int npcId = arenaFightMasterInfo.getNpcId();
			// 设置新擂主信息
			ArenaFightModel myModel = CrossArenaFightSysCache.getHeroArenaMap().get(hid);
			CrossHeroBaseModel crossHeroBaseModel = CrossArenaFightSysCache.getHeroFightMap().get(hid);
			myModel.setArenaId(arenaId);
			myModel.setMyOpstate(CrossArenaFightSysCache.opState);
			myModel.setType(1);
			if (npcId == 0) {
				List<ArenaNoticeInfo> noticeList = arenaFightModel.getNoticeList();
				ArenaNoticeInfo arenaNoticeInfo = new ArenaNoticeInfo();
				arenaNoticeInfo.setName(nameZoneid);
				noticeList.add(arenaNoticeInfo);
				if (noticeList.size() > ArenaFightConst.NOTICE_MAX_SIZE) {
					noticeList.remove(0);
				}
			}
			arenaFightMasterInfo.setMasterId(hid);
			arenaFightMasterInfo.setMaster(crossHeroBaseModel);
			arenaFightMasterInfo.setNpcId(0);
			List<Object[]> rewardData = new ArrayList<>();
			if (npcId > 0) {
				CrossData crossData = new CrossData();
				crossData.putObject(ArenaFightEnum.arenaId.name(), arenaId);
				crossData.putObject(CrossEnum.hid.name(), hid);
				Channel channel = CrossCache.getChannel(hero.getZoneid());
				NettyWrite.writeXData(channel, CrossConst.CROSS_ARENA_FIGHT_NPC_REWARD, crossData);
				int[][] reward1 = Config_leitai_500.getIns().get(arenaId).getReward1();
				for (int[] info : reward1) {
					rewardData.add(new Object[] { info[0], info[1], info[2] });
				}
			} else {
				// 广播
				CrossData crossData = new CrossData();
				if (master == null) {
					System.err.println();
				}
				crossData.putObject(ArenaFightEnum.winName.name(), crossHeroBaseModel.getNameZoneid());
				crossData.putObject(ArenaFightEnum.loseName.name(), master.getNameZoneid());
				Channel channel = CrossCache.getChannel(hero.getZoneid());
				Channel loserChannel = CrossCache.getChannel(master.getZoneid());
				NettyWrite.writeXData(channel, CrossConst.CROSS_ARENA_FIGHT_WIN_BOARD, crossData);
				NettyWrite.writeXData(loserChannel, CrossConst.CROSS_ARENA_FIGHT_WIN_BOARD, crossData);
				// 通知失败方擂主被抢
				CrossData noticeData = new CrossData();
				noticeData.putObject(CrossEnum.hid.name(), masterId);
				NettyWrite.writeXData(loserChannel, CrossConst.CROSS_ARENA_LOSE_TIPS, noticeData);
			}
			ArenaFightSender.sendCmd_11604(hid, 1, rewardData.toArray());
			sendInfo(hero);
			Iterator<Long> boardIter = CrossArenaFightSysCache.getHeroArenaMap().keySet().iterator();
			for (; boardIter.hasNext();) {
				Long pid = boardIter.next();
				if (pid == hid) {
					continue;
				}
				Hero player = HeroCache.getHero(pid);
				if (player != null) {
					sendInfo(player);
				}
			}
		} catch (Exception e) {
			CrossArenaFightSysCache.getFightMap().remove(masterId);
			CrossArenaFightSysCache.getChaMap().remove(hid);
			LogTool.error(e, ArenaFightManager.class, hid, hero.getName(), "ArenaFightManager fightEnd");
		}
	}

	/**
	 * 离开擂台
	 */
	public void leaveArena(Hero hero) {
		long hid = hero.getId();
		ConcurrentHashMap<Long, ArenaFightModel> heroArenaMap = CrossArenaFightSysCache.getHeroArenaMap();
		ArenaFightModel myModel = heroArenaMap.get(hid);
		int arenaId = myModel.getArenaId();
		int type = myModel.getType();
		if (arenaId > 0) {
			int partId = CrossCache.getPartId(hero.getBelongZoneid());
			PartArenaFightMaster partArenaFightMaster = CrossArenaFightSysCache.getPartArenaMap().get(partId);
			ArenaFightMasterInfo arenaFightMasterInfo = partArenaFightMaster.getArenaMap().get(arenaId);
			if (type == 2) {
				int site = myModel.getSite();
				arenaFightMasterInfo.getHelperMap().remove(site);
				arenaFightMasterInfo.getHelperSet().remove(hid);
			} else {
				Set<Long> helperSet = arenaFightMasterInfo.getHelperSet();
				Iterator<Long> iterator = helperSet.iterator();
				for (; iterator.hasNext();) {
					long id = iterator.next();
					ArenaFightModel arenaFightModel = heroArenaMap.get(id);
					if (arenaFightModel != null) {
						arenaFightModel.setArenaId(0);
						arenaFightModel.setType(0);
						arenaFightModel.setSite(0);
					}
				}
				arenaFightMasterInfo.getHelperMap().clear();
				arenaFightMasterInfo.getHelperSet().clear();
				arenaFightMasterInfo.setMaster(null);
				arenaFightMasterInfo.setMasterId(0);
				arenaFightMasterInfo.setUpdateTime(TimeDateUtil.getCurrentTime());
				Iterator<Long> boardIter = CrossArenaFightSysCache.getHeroArenaMap().keySet().iterator();
				for (; boardIter.hasNext();) {
					Long pid = boardIter.next();
					if (pid == hid) {
						continue;
					}
					Hero player = HeroCache.getHero(pid);
					if (player != null) {
						sendInfo(player);
					}
				}
			}
			myModel.setArenaId(0);
			myModel.setType(0);
			myModel.setSite(0);
		}
	}

	/**
	 * 协助擂主
	 * @param hero
	 * @param arenaId 擂台id
	 * @param index 位置
	 */
	public void assist(Hero hero, int arenaId, int index) {
		if (!CrossZone.isCrossServer()) {
			return;
		}
		if (!CrossArenaFightSysCache.isActOpen()) {
			return;
		}
		if (!CrossArenaFightSysCache.isfightOpen()) {
			return;
		}
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		int partId = CrossCache.getPartId(hero.getBelongZoneid());
		try {
			if(index<=0) {
				return;
			}
			if(index>ArenaFightConst.HELPER_MAX) {
				return;
			}
			ArenaFightModel arenaFightModel = CrossArenaFightSysCache.getHeroArenaMap().get(hid);
			// int type = arenaFightModel.getType();
			// if (type > 0) {
			// if (type == 1) {
			// // 是擂主不能协助
			// ArenaFightSender.sendCmd_11606(hid, 0, 1, 0);
			// } else if (type == 2) {
			// // 已在协助
			// ArenaFightSender.sendCmd_11606(hid, 0, 2, 0);
			// }
			// return;
			// }
			OpTaskExecutorService.PublicOrderService.execute(new CrossBaseOpTaskRunnable() {

				@Override
				public void run() {
					assistHandle(hero, arenaId, index, arenaFightModel);
				}

				@Override
				public Object getSession() {
					return partId;
				}
			});

		} catch (Exception e) {
			LogTool.error(e, ArenaFightManager.class, hid, hero.getName(),
					"ArenaFightManager assist, arenaId=" + arenaId + ", index=" + index);
		}
	}

	/**
	 * 协助逻辑处理
	 * @param hero
	 * @param arenaId
	 * @param index
	 * @param arenaFightModel
	 */
	public void assistHandle(Hero hero, int arenaId, int index, ArenaFightModel arenaFightModel) {
		long hid = hero.getId();
		try {
			int partId = CrossCache.getPartId(hero.getBelongZoneid());
			PartArenaFightMaster partArenaFightMaster = CrossArenaFightSysCache.getPartArenaMap().get(partId);
			ArenaFightMasterInfo arenaFightMasterInfo = partArenaFightMaster.getArenaMap().get(arenaId);
			if (arenaFightMasterInfo.getMasterId() == 0) {
				// 擂台没擂主不能协助
				return;
			}
			if (arenaFightMasterInfo.getNpcId() > 0) {
				// npc擂主不能协助
				return;
			}
			// 检测是否被挑战中
			ConcurrentHashMap<Long, Integer> fightMap = CrossArenaFightSysCache.getFightMap();
			ArenaFightModel myFightModel = CrossArenaFightSysCache.getHeroArenaMap().get(hid);
			int myType = myFightModel.getType();
			if (myType == 2 && myFightModel.getArenaId() == arenaId) {
				ArenaFightSender.sendCmd_11602(hid, 0, 5, 0);
				return;
			}
			if (myType == 1) {
				// 自己是擂主，检测是否被挑战中
				if (fightMap.containsKey(hid)) {
					Integer time = fightMap.get(hid);
					int passTime = TimeDateUtil.getCurrentTime() - time;
					if (passTime >= ArenaFightConst.LIMIT_TIME) {
						fightMap.remove(hid);
					} else {
						// 被挑战中
						ArenaFightSender.sendCmd_11602(hid, 0, 4, 0);
						return;
					}
				}
			}
			CrossHeroBaseModel master = arenaFightMasterInfo.getMaster();
			int belongZoneid = master.getBelongZoneid();
			int myBelongZoneid = hero.getBelongZoneid();
			if (belongZoneid != myBelongZoneid) {
				// 不是同服不能协助
				ArenaFightSender.sendCmd_11606(hid, 0, 3, 0);
				return;
			}
			if (master.getId() == hid) {
				// 是此擂台的擂主不能协助
				ArenaFightSender.sendCmd_11606(hid, 0, 1, 0);
				return;
			}
			Set<Long> helperSet = arenaFightMasterInfo.getHelperSet();
			ConcurrentHashMap<Integer,CrossHeroBaseModel> helperMap = arenaFightMasterInfo.getHelperMap();
			if(helperMap.size()>=ArenaFightConst.HELPER_MAX) {
				// 协助位满人
				ArenaFightSender.sendCmd_11606(hid, 0, 4, 0);
				return;
			}
			if (helperMap.containsKey(index)) {
				// 位置已有人
				ArenaFightSender.sendCmd_11606(hid, 0, 5, 0);
				return;
			}
			if (helperSet.contains(hid)) {
				// 已在协助
				ArenaFightSender.sendCmd_11606(hid, 0, 2, 0);
				return;
			}
			// 别的擂台的擂主
			leaveArena(hero);

			CrossHeroBaseModel crossHeroBaseModel = CrossArenaFightSysCache.getHeroFightMap().get(hid);
			helperMap.put(index, crossHeroBaseModel);
			helperSet.add(hid);
			arenaFightModel.setArenaId(arenaId);
			arenaFightModel.setMyOpstate(CrossArenaFightSysCache.opState);
			arenaFightModel.setType(2);
			arenaFightModel.setSite(index);
			ArenaFightSender.sendCmd_11606(hid, 1, arenaId, index);
			sendInfo(hero);
		} catch (Exception e) {
			LogTool.error(e, ArenaFightManager.class, hid, hero.getName(),
					"ArenaFightManager assistHandle, arenaId=" + arenaId + ", index=" + index);
		}
	}

	/**
	 * 踢出擂台
	 * @param hero
	 * @param arenaId
	 * @param index
	 */
	public void kickOut(Hero hero, int arenaId, int index) {
		if (!CrossZone.isCrossServer()) {
			return;
		}
		if (!CrossArenaFightSysCache.isActOpen()) {
			return;
		}
		if (!CrossArenaFightSysCache.isfightOpen()) {
			return;
		}
		if (hero == null) {
			return;
		}
		int partId = CrossCache.getPartId(hero.getBelongZoneid());
		long hid = hero.getId();
		try {
			ArenaFightModel myModel = CrossArenaFightSysCache.getHeroArenaMap().get(hid);
			if (myModel.getType() != 1) {
				// 不是擂主不能操作
				ArenaFightSender.sendCmd_11608(hid, 0, 1, 0);
				return;
			}
			OpTaskExecutorService.PublicOrderService.execute(new CrossBaseOpTaskRunnable() {

				@Override
				public void run() {
					kickOutHandle(hero, arenaId, index);
				}

				@Override
				public Object getSession() {
					// TODO Auto-generated method stub
					return partId;
				}
			});
		} catch (Exception e) {
			LogTool.error(e, ArenaFightManager.class, hid, hero.getName(),
					"ArenaFightManager kickOut, arenaId=" + arenaId + ", index=" + index);
		}
	}

	public void kickOutHandle(Hero hero, int arenaId, int index) {
		long hid = hero.getId();
		try {
			int partId = CrossCache.getPartId(hero.getBelongZoneid());
			PartArenaFightMaster partArenaFightMaster = CrossArenaFightSysCache.getPartArenaMap().get(partId);
			ArenaFightMasterInfo arenaFightMasterInfo = partArenaFightMaster.getArenaMap().get(arenaId);
			long masterId = arenaFightMasterInfo.getMasterId();
			if (hid != masterId) {
				// 不是擂主不能操作
				ArenaFightSender.sendCmd_11608(hid, 0, 1, 0);
				return;
			}
			ConcurrentHashMap<Integer, CrossHeroBaseModel> helperMap = arenaFightMasterInfo.getHelperMap();
			if (!helperMap.containsKey(index)) {
				// 玩家已退出
				return;
			}
			CrossHeroBaseModel kickHero = helperMap.remove(index);
			long kickHid = kickHero.getId();
			arenaFightMasterInfo.getHelperSet().remove(kickHid);

			ArenaFightModel kickModel = CrossArenaFightSysCache.getHeroArenaMap().get(kickHid);
			kickModel.setArenaId(0);
			kickModel.setType(0);
			kickModel.setSite(0);
			ArenaFightSender.sendCmd_11608(hid, 1, arenaId, index);
			ArenaFightSender.sendCmd_11608(kickHid, 2, arenaId, index);
		} catch (Exception e) {
			LogTool.error(e, ArenaFightManager.class, hid, hero.getName(),
					"ArenaFightManager kickOutHandle, arenaId=" + arenaId + ", index=" + index);
		}
	}

	/**
	 * 获取战报
	 */
	public void getNoticeList(Hero hero) {
		if (!CrossZone.isCrossServer()) {
			return;
		}
		if (!CrossArenaFightSysCache.isActOpen()) {
			return;
		}
		if (!CrossArenaFightSysCache.isfightOpen()) {
			return;
		}
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			ArenaFightModel myModel = CrossArenaFightSysCache.getHeroArenaMap().get(hid);
			List<ArenaNoticeInfo> noticeList = myModel.getNoticeList();
			List<Object[]> list = new ArrayList<Object[]>();
			int size = noticeList.size();
			for (int i = 0; i < size; i++) {
				ArenaNoticeInfo arenaNoticeInfo = noticeList.get(i);
				list.add(new Object[] { arenaNoticeInfo.getWin(), arenaNoticeInfo.getName() });
			}
			ArenaFightSender.sendCmd_11610(hid, list.toArray());
		} catch (Exception e) {
			LogTool.error(e, ArenaFightManager.class, hid, hero.getName(), "ArenaFightManager getNoticeList");
		}
	}

}
