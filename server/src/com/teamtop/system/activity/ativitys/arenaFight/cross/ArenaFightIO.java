package com.teamtop.system.activity.ativitys.arenaFight.cross;

import java.lang.reflect.Type;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import com.alibaba.fastjson.TypeReference;
import com.teamtop.cross.CrossConst;
import com.teamtop.cross.CrossData;
import com.teamtop.cross.CrossEnum;
import com.teamtop.cross.upload.CrossHeroBaseModel;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.netty.util.NettyWrite;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysCache;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.arenaFight.ArenaFightLocalCache;
import com.teamtop.system.activity.ativitys.arenaFight.ArenaFightSender;
import com.teamtop.system.activity.ativitys.arenaFight.model.ArenaFightModel;
import com.teamtop.system.activity.model.ActivityInfo;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_leitai_500;
import io.netty.channel.Channel;

public class ArenaFightIO {

	private static ArenaFightIO ins;

	private ArenaFightIO() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized ArenaFightIO getIns() {
		if (ins == null) {
			ins = new ArenaFightIO();
		}
		return ins;
	}

	/**
	 * 子服通知中央服
	 * @param channel
	 * @param crossData
	 */
	public void actOpen(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_ARENA_ACT_OPEN;
		try {
			int startTime = crossData.getObject(ArenaFightEnum.startTime.name(), Integer.class);
			int endTime = crossData.getObject(ArenaFightEnum.endTime.name(), Integer.class);
			int qs = crossData.getObject(ArenaFightEnum.qs.name(), Integer.class);
			int crossEndTime = CrossArenaFightSysCache.endTime;
			if (crossEndTime == 0 || crossEndTime != endTime) {
				CrossArenaFightSysCache.startTime = startTime;
				CrossArenaFightSysCache.endTime = endTime;
				CrossArenaFightSysCache.qs = qs;
				CrossArenaFightSysCache.checkStart();
			}
		} catch (Exception e) {
			LogTool.error(e, ArenaFightIO.class, "ArenaFightIO actOpen");
		}
	}

	public void askActSTate(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_ARENA_ASK_OPEN_STATE;
		try {
			if (ActivityFunction.getIns().checkActOpen(ActivitySysId.ACT_ARENA_FIGHT)) {
				CrossData data = new CrossData();
				ActivityInfo activityInfo = ActivitySysCache.getActivityMap().get(ActivitySysId.ACT_ARENA_FIGHT);
				int endTime = activityInfo.getEndTime();
				int startTime = activityInfo.getStartTime();
				int qs = activityInfo.getPeriods();
				data.putObject(ArenaFightEnum.endTime.name(), endTime);
				data.putObject(ArenaFightEnum.startTime.name(), startTime);
				data.putObject(ArenaFightEnum.qs.name(), qs);
				NettyWrite.writeXData(channel, CrossConst.CROSS_ARENA_ACT_OPEN, data);
			}
		} catch (Exception e) {
			LogTool.error(e, ArenaFightIO.class, "ArenaFightIO actOpen");
		}
	}

	/**
	 * 收到子服上传的玩家战斗镜像数据
	 * @param channel
	 * @param crossData
	 */
	public void uploadModel(Channel channel, CrossData crossData) {
		long hid = 0;
		String name = "";
		try {
			CrossHeroBaseModel model = crossData.getObject(ArenaFightEnum.fightModel.name(), CrossHeroBaseModel.class);
			ArenaFightModel actModel = crossData.getObject(ArenaFightEnum.actData.name(), ArenaFightModel.class);
//			int startTime = crossData.getObject(ArenaFightEnum.startTime.name(), Integer.class);
//			int endTime = crossData.getObject(ArenaFightEnum.endTime.name(), Integer.class);
			hid = model.getId();
			name = model.getNameZoneid();
			ConcurrentHashMap<Long, ArenaFightModel> heroArenaMap = CrossArenaFightSysCache.getHeroArenaMap();
			ArenaFightModel arenaFightModel = heroArenaMap.get(hid);
			if (arenaFightModel == null) {
				heroArenaMap.put(hid, actModel);
				int dayTime = actModel.getDayTime();
				int myOpstate = actModel.getMyOpstate();
				int todayZeroTime = TimeDateUtil.getTodayZeroTimeReturnInt();
				if (dayTime != todayZeroTime) {
					actModel.setDayTime(dayTime);
					actModel.setArenaId(0);
					actModel.setMyOpstate(0);
					actModel.setType(0);
					actModel.setSite(0);
				}
				if (myOpstate != CrossArenaFightSysCache.opState) {
					actModel.setArenaId(0);
					actModel.setMyOpstate(0);
					actModel.setType(0);
					actModel.setSite(0);
				}
			}
			CrossArenaFightSysCache.getHeroFightMap().put(hid, model);
//			int partId = CrossCache.getPartId(channel);
//			PartArenaFightMaster partArenaFightMaster = CrossArenaFightSysCache.getPartArenaMap().get(partId);
//			int crossEndTime = CrossArenaFightSysCache.endTime;
//			if (crossEndTime == 0) {
//				CrossArenaFightSysCache.endTime = endTime;
//				CrossArenaFightSysCache.startTime = startTime;
//			} else if (crossEndTime != endTime) {
//				CrossArenaFightSysCache.startTime = startTime;
//				CrossArenaFightSysCache.endTime = endTime;
//			}
		} catch (Exception e) {
			LogTool.error(e, ArenaFightIO.class, hid, name, "ArenaFightIO uploadModel");
		}
	}

	/**
	 * 子服收到中央服通知战斗开始
	 * @param channel
	 * @param crossData
	 */
	public void fightStart(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_ARENA_FIGHT_START;
		try {
			int opState = crossData.getObject(ArenaFightEnum.opState.name(), Integer.class);
			ArenaFightLocalCache.opState = opState;
			Iterator<Hero> iterator = HeroCache.getHeroMap().values().iterator();
			for (; iterator.hasNext();) {
				Hero hero = iterator.next();
				if (hero.isOnline()) {
					ArenaFightSender.sendCmd_11612(hero.getId(), 1);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, ArenaFightIO.class, "ArenaFightIO fightStart");
		}
	}

	/**
	 * 子服收到中央服通知战斗结束
	 * @param channel
	 * @param crossData
	 */
	public void fightEnd(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_ARENA_FIGHT_END;
		try {
			ArenaFightLocalCache.opState = 0;
			Iterator<Hero> iterator = HeroCache.getHeroMap().values().iterator();
			for (; iterator.hasNext();) {
				Hero hero = iterator.next();
				if (hero.isOnline()) {
					ArenaFightSender.sendCmd_11612(hero.getId(), 0);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, ArenaFightIO.class, "ArenaFightIO fightEnd");
		}
	}

	/**
	 * 中央服通知子服发放奖励
	 */
	public void sendReward(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_ARENA_FIGHT_REWARD;
		try {
			Type type = new TypeReference<List<Set<ArenaRewardTemp>>>(){}.getType();
			List<Set<ArenaRewardTemp>> list = crossData.getObject(ArenaFightEnum.rewardNameList.name(), type);
			Set<ArenaRewardTemp> masterSet = list.get(0);
			int masterMailId = MailConst.CROSS_ARENA_FIGHT_MASTER_REWARD;
			Iterator<ArenaRewardTemp> iterator = masterSet.iterator();
			long hid = 0;
			int arenaId = 0;
			for (;iterator.hasNext();) { 
				try {
					ArenaRewardTemp temp = iterator.next();
					if (temp != null) {
						hid = temp.getHid();
						arenaId = temp.getArenaId();
						int[][] masterReward = Config_leitai_500.getIns().get(arenaId).getReward2();
						MailFunction.getIns().sendMailWithFujianData2(hid, masterMailId, new Object[] { masterMailId },
								masterReward);
					}
				} catch (Exception e) {
					LogTool.error(e, ArenaFightIO.class, "ArenaFightIO master Reward hid="+hid+", arenaId="+arenaId);
				}
			}
			Set<ArenaRewardTemp> helperSet = list.get(1);
			int helperMailId = MailConst.CROSS_ARENA_FIGHT_HELPER_REWARD;
			Iterator<ArenaRewardTemp> helperIterator = helperSet.iterator();
			for (; helperIterator.hasNext();) {
				try {
					ArenaRewardTemp rewardTemp = helperIterator.next();
					if (rewardTemp != null) {
						hid = rewardTemp.getHid();
						arenaId = rewardTemp.getArenaId();
						int[][] helperReward = Config_leitai_500.getIns().get(arenaId).getReward3();
						MailFunction.getIns().sendMailWithFujianData2(hid, helperMailId, new Object[] { helperMailId },
								helperReward);
					}
				} catch (Exception e) {
					LogTool.error(e, ArenaFightIO.class, "ArenaFightIO helper Reward hid="+hid+", arenaId="+arenaId);
				}
			}
		} catch (Exception e) {
			LogTool.error(e, ArenaFightIO.class, "ArenaFightIO sendReward");
		}
	}

	/**
	 * 收到中央服通知，发放npc奖励
	 * @param channel
	 * @param crossData
	 */
	public void npcReward(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_ARENA_FIGHT_REWARD;
		long hid = 0;
		try {
			hid = crossData.getObject(CrossEnum.hid.name(), Long.class);
			int arenaId = crossData.getObject(ArenaFightEnum.arenaId.name(), Integer.class);
			int[][] npcReward = Config_leitai_500.getIns().get(arenaId).getReward1();
			Hero hero = HeroCache.getHero(hid);
			UseAddUtil.add(hero, npcReward, SourceGoodConst.ARENA_FIGHT_NPC_REWARD, UseAddUtil.getDefaultMail(), true);
		} catch (Exception e) {
			LogTool.error(e, ArenaFightIO.class, "ArenaFightIO npcReward, hid=" + hid);
		}
	}

	/**
	 * 胜利广播
	 * @param channel
	 * @param crossData
	 */
	public void winBoard(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_ARENA_FIGHT_WIN_BOARD;
		try {
			String winName = crossData.getObject(ArenaFightEnum.winName.name(), String.class);
			String loseName = crossData.getObject(ArenaFightEnum.loseName.name(), String.class);
			ChatManager.getIns().broadCast(ChatConst.ARENA_FHIGHT_WIN, new Object[] { winName, loseName });
		} catch (Exception e) {
			LogTool.error(e, ArenaFightIO.class, "ArenaFightIO winBoard");
		}
	}

	/**
	 * 失去擂主位置图标提示
	 * @param channel
	 * @param crossData
	 */
	public void loseTips(Channel channel, CrossData crossData) {
		int cmd = CrossConst.CROSS_ARENA_LOSE_TIPS;
		try {
			Long hid = crossData.getObject(CrossEnum.hid.name(), Long.class);
			Hero hero = HeroCache.getHero(hid);
			if (hero.isOnline()) {
				ArenaFightSender.sendCmd_11614(hid);
			}
		} catch (Exception e) {
			LogTool.error(e, ArenaFightIO.class, "ArenaFightIO loseTips");
		}
	}

}
