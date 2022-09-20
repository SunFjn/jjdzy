package com.teamtop.system.boss.specialAnimalBoss;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentSkipListSet;

import com.teamtop.gameCommon.GameConst;
import com.teamtop.gameCommon.SourceGoodConst;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.synHandleCore.orderedRunnable.QmbossOpTaskRunnable;
import com.teamtop.system.battle.BattleFunction;
import com.teamtop.system.boss.specialAnimalBoss.model.BossKillerInfo;
import com.teamtop.system.boss.specialAnimalBoss.model.PersonalChallengeInfo;
import com.teamtop.system.boss.specialAnimalBoss.model.SpecialAnimalBossData;
import com.teamtop.system.boss.specialAnimalBoss.model.SpecialAnimalBossRank;
import com.teamtop.system.chat.ChatConst;
import com.teamtop.system.chat.ChatManager;
import com.teamtop.system.event.useAddEvent.UseAddUtil;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_xtcs_004;
import excel.config.Config_ysboss_759;
import excel.config.Config_yscs_759;
import excel.struct.Struct_xtcs_004;
import excel.struct.Struct_ysboss_759;
import excel.struct.Struct_yscs_759;

public class SpecialAnimalBossManager {

	private static SpecialAnimalBossManager ins;

	private SpecialAnimalBossManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized SpecialAnimalBossManager getIns() {
		if (ins == null) {
			ins = new SpecialAnimalBossManager();
		}
		return ins;
	}

	public void openUI(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SPECIALANIMAL_BOSS)) {
				return;
			}

			SpecialAnimalBossData bossData = hero.getSpecialAnimalBossData();
			int guanqia = bossData.getGuanqia();
			int passGq = bossData.getPassGq();
			int rewardGq = bossData.getRewardGq();
			int buyChaNum = bossData.getBuyChaNum();
			checkChaTime(hero);
			int chaNum = bossData.getChaNum();
			int leftTime = 0;
			int maxCha = Config_xtcs_004.getIns().get(SpecialAnimalBossConst.MAX_CHA).getNum();
			if (chaNum < maxCha) {
				int lastAddChaTime = bossData.getLastAddChaTime();
				if (lastAddChaTime > 0) {
					int passTime = TimeDateUtil.getCurrentTime() - lastAddChaTime;
					if (passTime >= 0) {
						leftTime = SpecialAnimalBossConst.ADD_GRAP - passTime;
					} else {
						bossData.setLastAddChaTime(TimeDateUtil.getCurrentTime());
						leftTime = SpecialAnimalBossConst.ADD_GRAP;
					}
				}
			}
			Struct_ysboss_759 struct_ysboss_759 = Config_ysboss_759.getIns().get(guanqia);
			if (struct_ysboss_759 == null) {
				guanqia = guanqia - 1;
			}
			Map<Integer, BossKillerInfo> bossKillerMap = SpecialAnimalBossSysCache.getBossKillerMap();
			BossKillerInfo bossKillerInfo = bossKillerMap.get(guanqia);
			String killerName = "";
			int icon = 0;
			int frame = 0;
			if (bossKillerInfo != null) {
				killerName = bossKillerInfo.getName();
				icon = bossKillerInfo.getIcon();
				frame = bossKillerInfo.getFrame();
			}
			SpecialAnimalBossSender.sendCmd_9432(hid, guanqia, passGq, rewardGq, chaNum, leftTime, killerName, icon,
					frame, buyChaNum);
		} catch (Exception e) {
			LogTool.error(e, SpecialAnimalBossManager.class, hero.getId(), hero.getName(),
					"SpecialAnimalBossManager openUI");
		}
	}

	public void checkChaTime(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SPECIALANIMAL_BOSS)) {
				return;
			}
			SpecialAnimalBossData bossData = hero.getSpecialAnimalBossData();
			int chaNum = bossData.getChaNum();
			int maxCha = Config_xtcs_004.getIns().get(SpecialAnimalBossConst.MAX_CHA).getNum();
			if (chaNum >= maxCha) {
				return;
			}
			int lastAddChaTime = bossData.getLastAddChaTime();
			int currentTime = TimeDateUtil.getCurrentTime();
			int passTime = currentTime - lastAddChaTime;
			if (passTime >= SpecialAnimalBossConst.ADD_GRAP) {
				int addNum = passTime / SpecialAnimalBossConst.ADD_GRAP;
				chaNum = chaNum + addNum;
				if (chaNum > maxCha) {
					bossData.setChaNum(maxCha);
					bossData.setLastAddChaTime(lastAddChaTime + addNum * SpecialAnimalBossConst.ADD_GRAP);
				} else {
					bossData.setChaNum(chaNum);
					bossData.setLastAddChaTime(lastAddChaTime + addNum * SpecialAnimalBossConst.ADD_GRAP);
				}
			}
			LogTool.info(hero.getId(), hero.getName(),
					"SpecialAnimalBossManager checkChaTime, chaNum=" + bossData.getChaNum(),
					SpecialAnimalBossManager.class);
		} catch (Exception e) {
			LogTool.error(e, SpecialAnimalBossManager.class, hero.getId(), hero.getName(),
					"SpecialAnimalBossManager checkChaTime");
		}
	}

	/**
	 * 购买挑战次数
	 * @param hero
	 * @param num
	 */
	public void buyChaNum(Hero hero, int num) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SPECIALANIMAL_BOSS)) {
				return;
			}
			if (num < 1) {
				return;
			}
			checkChaTime(hero);
			SpecialAnimalBossData bossData = hero.getSpecialAnimalBossData();
			int chaNum = bossData.getChaNum();
			int buyChaNum = bossData.getBuyChaNum();
			int nowNum = buyChaNum + num;
			Map<Integer, Struct_yscs_759> map = Config_yscs_759.getIns().getMap();
			int maxBuy = map.size();
			if (nowNum > maxBuy) {
				// 超出最大可购买次数
				SpecialAnimalBossSender.sendCmd_9446(hid, 0, 1, 0);
				return;
			}
			int index = buyChaNum + 1;
			List<int[]> list = new ArrayList<>();
			list.toArray();
			for (int i = index; i <= nowNum; i++) {
				int[][] xh = map.get(i).getXh();
				list.add(xh[0]);
			}
			int[][] cost = new int[list.size()][];
			list.toArray(cost);
			if (!UseAddUtil.canUse(hero, cost)) {
				// 元宝不足
				SpecialAnimalBossSender.sendCmd_9446(hid, 0, 2, 0);
				return;
			}
			UseAddUtil.use(hero, cost, SourceGoodConst.SPECIAL_ANIMAL_BUY_CHA, true);
			int newChaNum = chaNum + num;
			bossData.setChaNum(newChaNum);
			bossData.setBuyChaNum(nowNum);
			SpecialAnimalBossSender.sendCmd_9446(hid, 1, newChaNum, nowNum);
			LogTool.info(hero.getId(), hero.getName(), "SpecialAnimalBossManager buyChaNum, chaNum=" + newChaNum,
					SpecialAnimalBossManager.class);
		} catch (Exception e) {
			LogTool.error(e, SpecialAnimalBossManager.class, hero.getId(), hero.getName(),
					"SpecialAnimalBossManager buyChaNum");
		}
	}

	/**
	 * 挑战boss
	 */
	public void challengeBoss(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SPECIALANIMAL_BOSS)) {
				return;
			}
			SpecialAnimalBossData bossData = hero.getSpecialAnimalBossData();
			int guanqia = bossData.getGuanqia();
			int passGq = bossData.getPassGq();
			int rewardGq = bossData.getRewardGq();
			checkChaTime(hero);
			int chaNum = bossData.getChaNum();
			if (chaNum <= 0) {
				if (!UseAddUtil.canUse(hero, GameConst.TOOL, 1, SpecialAnimalBossConst.TOOL_ID)) {
					// 没有挑战次数
					SpecialAnimalBossSender.sendCmd_9434(hid, 0, 1, 0, 0);
					return;
				}
			}
			boolean fix = false;
			if (guanqia == passGq && guanqia == rewardGq) {
				guanqia += 1;
				fix = true;
			}
			if (guanqia == passGq && rewardGq != guanqia) {
				// 未领取通关奖励
				SpecialAnimalBossSender.sendCmd_9434(hid, 0, 2, 0, 0);
				return;
			}
			Struct_ysboss_759 struct_ysboss_759 = Config_ysboss_759.getIns().get(guanqia);
			if (struct_ysboss_759 == null) {
				// 已通过最高关卡
				SpecialAnimalBossSender.sendCmd_9434(hid, 0, 3, 0, 0);
				return;
			}
			Map<Long, PersonalChallengeInfo> personalMap = SpecialAnimalBossSysCache.getPersonalMap();
			if (personalMap.containsKey(hid)) {
				int startTime = personalMap.get(hid).getStartTime();
				int currentTime = TimeDateUtil.getCurrentTime();
				int passTime = currentTime - startTime;
				if (passTime > 300) {
					personalMap.remove(hid);
				} else {
					// 已进入战斗
					SpecialAnimalBossSender.sendCmd_9434(hid, 0, 4, 0, 0);
					return;
				}
			}
			PersonalChallengeInfo personalInfo = new PersonalChallengeInfo();
			personalInfo.setHid(hid);
			personalInfo.setChaGq(guanqia);
			personalInfo.setReliveNum(0);
			int currentTime = TimeDateUtil.getCurrentTime();
			personalInfo.setStartTime(currentTime);
			personalMap.put(hid, personalInfo);
			if (fix) {
				bossData.setGuanqia(guanqia);
				LogTool.info(hid, hero.getName(), "SpecialAnimalBossManager fix newGuanQia="+guanqia, SpecialAnimalBossManager.class);
			}
			int newChaNum = 0;
			if (chaNum > 0) {
				newChaNum = chaNum - 1;
				bossData.setChaNum(chaNum - 1);
				int maxCha = Config_xtcs_004.getIns().get(SpecialAnimalBossConst.MAX_CHA).getNum();
				if (chaNum >= maxCha) {
					bossData.setLastAddChaTime(currentTime);
				}
			} else {
				UseAddUtil.use(hero, GameConst.TOOL, 1, SpecialAnimalBossConst.TOOL_ID,
						SourceGoodConst.SPECIAL_ANIMAL_BOSS, true);
			}

			int leftTime = 0;
			int maxCha = Config_xtcs_004.getIns().get(SpecialAnimalBossConst.MAX_CHA).getNum();
			if (newChaNum < maxCha) {
				int lastAddChaTime = bossData.getLastAddChaTime();
				if (lastAddChaTime > 0) {
					int passTime = TimeDateUtil.getCurrentTime() - lastAddChaTime;
					if (passTime >= 0) {
						leftTime = SpecialAnimalBossConst.ADD_GRAP - passTime;
					} else {
						bossData.setLastAddChaTime(TimeDateUtil.getCurrentTime());
						leftTime = SpecialAnimalBossConst.ADD_GRAP;
					}
				}
			}
			
			SpecialAnimalBossSender.sendCmd_9434(hid, 1, guanqia, newChaNum, leftTime);
			SpecialAnimalBossFunction.getIns().updateRedPoint(hero);
			LogTool.info(hid, hero.getName(), "SpecialAnimalBossManager newChaNum=" + newChaNum + ", chaNum=" + chaNum,
					this);
		} catch (Exception e) {
			SpecialAnimalBossSysCache.getPersonalMap().remove(hid);
			LogTool.error(e, SpecialAnimalBossManager.class, hero.getId(), hero.getName(),
					"SpecialAnimalBossManager challengeBoss");
		}
	}

	/**
	 * 战斗结束
	 * @param hero
	 */
	public void fightEnd(Hero hero, int result) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SPECIALANIMAL_BOSS)) {
				return;
			}
			Map<Long, PersonalChallengeInfo> personalMap = SpecialAnimalBossSysCache.getPersonalMap();
			if (!personalMap.containsKey(hid)) {
				// 没有进入战斗
				return;
			}
			SpecialAnimalBossData bossData = hero.getSpecialAnimalBossData();
			Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(SpecialAnimalBossConst.CHALLENGE_REWARD);
			int[][] reward = struct_xtcs_004.getOther();
			
			int guanqia = bossData.getGuanqia();
			Struct_ysboss_759 struct_ysboss_759 = Config_ysboss_759.getIns().get(guanqia);
			int[][] boss = struct_ysboss_759.getBoss();
			int bossNpcId = boss[0][1];
			int num = Config_xtcs_004.getIns().get(SpecialAnimalBossConst.LOWER_PERCEN).getNum();
			Map<Integer, BossKillerInfo> bossKillerMap = SpecialAnimalBossSysCache.getBossKillerMap();
			double percent = 1;
			if (bossKillerMap.containsKey(guanqia)) {
				percent = ((double)(100 - num)) / 100;
				LogTool.info("bossKillerMap.containsKey(guanqia) percent="+percent, this);
			}
			int checkResult = BattleFunction.checkWinGuanqiaBoss(hero, bossNpcId, percent);
			if (checkResult == 0) {
				result = 0;
			}
			if (result == 1) {
				// 胜利
				int reviveNum = personalMap.get(hid).getReliveNum();
//				boolean checkCanKill = checkCanKill(hero, guanqia, reviveNum);
//				if (checkCanKill) {
				int passGq = bossData.getPassGq();
				if (guanqia > passGq) {
					bossData.setPassGq(guanqia);
					bossData.setLastPassTime(TimeDateUtil.getCurrentTimeInMillis());
				}
				if (!bossKillerMap.containsKey(guanqia)) {
					// 为了零点重置,首通和排行更新放同一条线程处理
					firstKill(hero, guanqia);
				} else {
					// 为了零点重置,首通和排行更新放同一条线程处理
					SpecialAnimalBossFunction.getIns().refreshRank(hero);
				}
//				} else {
//					result = 0;
//				}
			} else {
				if (HeroCache.hefuTime > 0) {
					int currentTime = TimeDateUtil.getCurrentTime();
					int weekTime = HeroCache.hefuTime + TimeDateUtil.ONE_DAY_INT * 7;
					if (currentTime < weekTime) {
						LogTool.info("hefu refreshRank", this);
						SpecialAnimalBossFunction.getIns().refreshRank(hero);
					}
				}
			}
			List<Object[]> sendReward = new ArrayList<>();
			for (int[] arr : reward) {
				sendReward.add(new Object[] { arr[0], arr[1], arr[2] });
			}
			UseAddUtil.add(hero, reward, SourceGoodConst.SPECIAL_ANIMAL_BOSS, UseAddUtil.getDefaultMail(), true);
			SpecialAnimalBossSender.sendCmd_9436(hid, result, sendReward.toArray());
			// GlobalSender.sendCmd_262(hid, result, sendReward.toArray());
		} catch (Exception e) {
			LogTool.error(e, SpecialAnimalBossManager.class, hero.getId(), hero.getName(),
					"SpecialAnimalBossManager fightEnd");
		} finally {
			SpecialAnimalBossSysCache.getPersonalMap().remove(hid);
		}
	}

/*	public boolean checkCanKill(Hero hero, int guanqia, int reviveNum) {
		Struct_ysboss_759 struct_ysboss_759 = Config_ysboss_759.getIns().get(guanqia);
		int[][] boss = struct_ysboss_759.getBoss();
		int bossNpcId = boss[0][1];
		Struct_NPC_200 struct_NPC_200 = Config_NPC_200.getIns().get(bossNpcId);
		struct_ysboss_759.getSh2();
		FinalFightAttr finalFightAttr = hero.getFinalFightAttr();
		long hpMax = finalFightAttr.getHpMax();
		long secondDamage = BattleFunction.getSecondDamage(finalFightAttr);
		long bossDamage = finalFightAttr.getHpMax() * struct_ysboss_759.getSh1() + struct_ysboss_759.getSh2();
		long bossHp = struct_NPC_200.getHp();
		int num = Config_xtcs_004.getIns().get(SpecialAnimalBossConst.LOWER_PERCEN).getNum();
		Map<Integer, BossKillerInfo> bossKillerMap = SpecialAnimalBossSysCache.getBossKillerMap();
		if (bossKillerMap.containsKey(guanqia)) {
			bossHp = bossHp * (100 - num) / 100;
			bossDamage = bossDamage * (100 - num) / 100;
		}
		double bossDeadTime = (double) bossHp / secondDamage / (reviveNum + 1);
		double playerDeadTime = (double) hpMax / bossDamage;
		if (bossDeadTime > playerDeadTime) {
			return false;
		}
		return true;
	}*/

	public void firstKill(Hero hero, int guanqia) {
		OpTaskExecutorService.PublicOrderService.execute(new QmbossOpTaskRunnable() {

			@Override
			public void run() {
				SpecialAnimalBossFunction.getIns().refreshRankHandle(hero);
				Struct_ysboss_759 struct_ysboss_759 = Config_ysboss_759.getIns().get(guanqia);
				Map<Integer, BossKillerInfo> bossKillerMap = SpecialAnimalBossSysCache.getBossKillerMap();
				if (bossKillerMap.containsKey(guanqia)) {
					return;
				}
				BossKillerInfo info = new BossKillerInfo();
				long id = hero.getId();
				info.setHid(id);
				String name = hero.getNameZoneid();
				info.setName(name);
				info.setTime(TimeDateUtil.getCurrentTime());
				int icon = hero.getIcon();
				info.setIcon(icon);
				int frame = hero.getFrame();
				info.setFrame(frame);
				bossKillerMap.put(guanqia, info);
				int[][] reward = struct_ysboss_759.getSsjl();
				int mailId = MailConst.SPECIALANIMAL_BOSS_REWARD;
				MailFunction.getIns().sendMailWithFujianData2(id, mailId, new Object[] { mailId, guanqia }, reward);
				ChatManager.getIns().broadCast(ChatConst.SPECIALANIMAL_FIRST_PASS, new Object[] { name, guanqia });
				Iterator<Hero> iterator = HeroCache.getHeroMap().values().iterator();
				for (; iterator.hasNext();) {
					Hero player = iterator.next();
					if (player.isOnline()) {
						if (!HeroFunction.getIns().checkSystemOpen(player, SystemIdConst.SPECIALANIMAL_BOSS)) {
							continue;
						}
						SpecialAnimalBossSender.sendCmd_9444(player.getId(), guanqia, name, icon, frame);
					}
				}
			}

			@Override
			public Object getSession() {
				return OpTaskConst.SPECIAL_ANIMAL_BOSS;
			}
		});
	}

	/**
	 * 复活
	 */
	public void relive(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SPECIALANIMAL_BOSS)) {
				return;
			}
			Map<Long, PersonalChallengeInfo> personalMap = SpecialAnimalBossSysCache.getPersonalMap();
			if (!personalMap.containsKey(hid)) {
				// 没有进入战斗
				return;
			}
			PersonalChallengeInfo pInfo = personalMap.get(hid);
			int reliveNum = pInfo.getReliveNum();
			int reliveLimit = Config_xtcs_004.getIns().get(SpecialAnimalBossConst.RELIVE_LIMIT).getNum();
			if (reliveNum >= reliveLimit) {
//				SpecialAnimalBossSender.sendCmd_9438(hid, 0, 2);
				return;
			}
			Struct_xtcs_004 struct_xtcs_004 = Config_xtcs_004.getIns().get(SpecialAnimalBossConst.RELIVE_COST);
			int[][] cost = struct_xtcs_004.getOther();
			if (!UseAddUtil.canUse(hero, cost)) {
				// 元宝不足
				SpecialAnimalBossSender.sendCmd_9438(hid, 0, 1);
				return;
			}
			UseAddUtil.use(hero, cost, SourceGoodConst.CHALLEGE_SA_BOSS_RELIVE, true);
			pInfo.setReliveNum(reliveNum + 1);
			SpecialAnimalBossSender.sendCmd_9438(hid, 1, 0);
		} catch (Exception e) {
			LogTool.error(e, SpecialAnimalBossManager.class, hero.getId(), hero.getName(),
					"SpecialAnimalBossManager relive");
		}
	}

	/**
	 * 领取奖励
	 */
	public void getReward(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SPECIALANIMAL_BOSS)) {
				return;
			}
			SpecialAnimalBossData bossData = hero.getSpecialAnimalBossData();
			int guanqia = bossData.getGuanqia();
			int passGq = bossData.getPassGq();
			int rewardGq = bossData.getRewardGq();
			if (rewardGq >= passGq) {
				// 无奖励可领取
				return;
			}
			if (guanqia != passGq) {
				// 无奖励可领取
				return;
			}
			Struct_ysboss_759 struct_ysboss_759 = Config_ysboss_759.getIns().get(passGq);
			int[][] reward = struct_ysboss_759.getTgjl();
			int newGuanQia = guanqia + 1;
			bossData.setGuanqia(newGuanQia);
			bossData.setRewardGq(passGq);
			UseAddUtil.add(hero, reward, SourceGoodConst.SPECIAL_ANIMAL_BOSS_PASS, UseAddUtil.getDefaultMail(), true);
			Struct_ysboss_759 struct_ysboss = Config_ysboss_759.getIns().get(newGuanQia);
			if (struct_ysboss == null) {
				newGuanQia = newGuanQia - 1;
			}
			SpecialAnimalBossSender.sendCmd_9440(hid, 1, newGuanQia);
			SpecialAnimalBossFunction.getIns().updateRedPoint(hero);
			openUI(hero);
			LogTool.info(hid, hero.getName(), "SpecialAnimalBossManager getReward newGuanQia="+newGuanQia, SpecialAnimalBossManager.class);
		} catch (Exception e) {
			LogTool.error(e, SpecialAnimalBossManager.class, hero.getId(), hero.getName(),
					"SpecialAnimalBossManager getReward");
		}
	}

	/**
	 * 排行榜数据
	 * @param hero
	 */
	public void openRank(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SPECIALANIMAL_BOSS)) {
				return;
			}
			ConcurrentSkipListSet<SpecialAnimalBossRank> passRank = SpecialAnimalBossSysCache.getPassRank();
//			SpecialAnimalBossData bossData = hero.getSpecialAnimalBossData();
//			int passGq = bossData.getPassGq();
//			int myRank = 0;
			List<Object[]> sendList = new ArrayList<>();
			for (SpecialAnimalBossRank rank : passRank) {
				sendList.add(new Object[] { rank.getName(), rank.getPassGq() });
			}
			SpecialAnimalBossSender.sendCmd_9442(hid, sendList.toArray());
		} catch (Exception e) {
			LogTool.error(e, SpecialAnimalBossManager.class, hero.getId(), hero.getName(),
					"SpecialAnimalBossManager getReward");
		}
	}

}
