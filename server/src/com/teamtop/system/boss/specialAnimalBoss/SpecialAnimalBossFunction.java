package com.teamtop.system.boss.specialAnimalBoss;

import java.util.Iterator;
import java.util.concurrent.ConcurrentSkipListSet;

import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.synHandleCore.orderedRunnable.RankingOpTaskRunnable;
import com.teamtop.system.boss.specialAnimalBoss.model.SpecialAnimalBossData;
import com.teamtop.system.boss.specialAnimalBoss.model.SpecialAnimalBossRank;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_xtcs_004;

public class SpecialAnimalBossFunction {

	private static SpecialAnimalBossFunction ins;

	private SpecialAnimalBossFunction() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized SpecialAnimalBossFunction getIns() {
		if (ins == null) {
			ins = new SpecialAnimalBossFunction();
		}
		return ins;
	}

	/**
	 * 检测红点
	 * @param hero
	 * @return
	 */
	public boolean checkRedPoint(Hero hero) {
		if (hero == null) {
			return false;
		}
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SPECIALANIMAL_BOSS)) {
				return false;
			}
			SpecialAnimalBossData bossData = hero.getSpecialAnimalBossData();
			SpecialAnimalBossManager.getIns().checkChaTime(hero);
			int chaNum = bossData.getChaNum();
			if (chaNum > 0) {
				return true;
			}
			int guanqia = bossData.getGuanqia();
			int passGq = bossData.getPassGq();
			int rewardGq = bossData.getRewardGq();
			if (guanqia == passGq && rewardGq < passGq) {
				return true;
			}
		} catch (Exception e) {
			LogTool.error(e, SpecialAnimalBossFunction.class, hid, hero.getName(),
					"SpecialAnimalBossFunction checkRedPoint");
		}
		return false;
	}

	/**
	 * 更新红点
	 * @param hero
	 */
	public void updateRedPoint(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			boolean checkRedPoint = checkRedPoint(hero);
			if (checkRedPoint) {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.SPECIALANIMAL_BOSS,
						RedPointConst.RED_1, RedPointConst.HAS_RED);
			} else {
				RedPointFunction.getIns().fastUpdateRedPoint(hero, SystemIdConst.SPECIALANIMAL_BOSS,
						RedPointConst.RED_1, RedPointConst.NO_RED);
			}
		} catch (Exception e) {
			LogTool.error(e, SpecialAnimalBossFunction.class, hid, hero.getName(),
					"SpecialAnimalBossFunction updateRedPoint");
		}
	}

	/** 更新排行榜*/
	public void refreshRank(Hero hero) {
		OpTaskExecutorService.PublicOrderService.execute(new RankingOpTaskRunnable() {

			@Override
			public void run() {
				refreshRankHandle(hero);
			}

			@Override
			public Object getSession() {
				return OpTaskConst.SPECIAL_ANIMAL_BOSS;
			}
		});
	}

	public void refreshRankHandle(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			SpecialAnimalBossData bossData = hero.getSpecialAnimalBossData();
			SpecialAnimalBossRank rank = new SpecialAnimalBossRank();
			rank.setHid(hid);
			rank.setName(hero.getNameZoneid());
			rank.setPassGq(bossData.getPassGq());
			rank.setUpdateTime(TimeDateUtil.getCurrentTimeInMillis());
			ConcurrentSkipListSet<SpecialAnimalBossRank> passRank = SpecialAnimalBossSysCache.getPassRank();
			Iterator<SpecialAnimalBossRank> iterator = passRank.iterator();
			SpecialAnimalBossRank tempRank = null;
			SpecialAnimalBossRank oldRank = null;
			for (; iterator.hasNext();) {
				tempRank = iterator.next();
				if (tempRank.getHid() == rank.getHid()) {
					oldRank = tempRank;
					if (oldRank.getPassGq() == rank.getPassGq()) {
						return;
					}
					iterator.remove();
					break;
				}
			}
			if (oldRank != null) {
				passRank.add(rank);
			} else {
				passRank.add(rank);
				int size = passRank.size();
				if (size > SpecialAnimalBossConst.RANK_LIMIT) {
					passRank.pollLast();
				}
			}
		} catch (Exception e) {
			LogTool.error(e, SpecialAnimalBossFunction.class, hid, hero.getName(),
					"SpecialAnimalBossFunction refreshRank");
		}
	}

	/**
	 * 增加异兽boss挑战次数
	 * @param hero
	 * @param id
	 * @param num
	 * @return
	 */
	public boolean addChaNum(Hero hero, int id, int num) {
		long hid = hero.getId();
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SPECIALANIMAL_BOSS)) {
				return false;
			}
			SpecialAnimalBossData bossData = hero.getSpecialAnimalBossData();
			int chaNum = bossData.getChaNum() + num;
			bossData.setChaNum(chaNum);
			int maxCha = Config_xtcs_004.getIns().get(SpecialAnimalBossConst.MAX_CHA).getNum();
			if (chaNum >= maxCha) {
				bossData.setLastAddChaTime(TimeDateUtil.getCurrentTime());
			}
			// SpecialAnimalBossManager.getIns().openUI(hero);
			return true;
		} catch (Exception e) {
			LogTool.error(e, SpecialAnimalBossFunction.class, hid, hero.getName(),
					"SpecialAnimalBossFunction addChaNum");
		}
		return false;
	}

}
