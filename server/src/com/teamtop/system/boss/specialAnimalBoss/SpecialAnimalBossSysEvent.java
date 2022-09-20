package com.teamtop.system.boss.specialAnimalBoss;

import java.util.Iterator;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.OpTaskConst;
import com.teamtop.synHandleCore.orderedRunnable.RankingOpTaskRunnable;
import com.teamtop.system.boss.specialAnimalBoss.model.BossKillerInfo;
import com.teamtop.system.boss.specialAnimalBoss.model.SpecialAnimalBossData;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;
import com.teamtop.util.log.LogTool;
import com.teamtop.util.time.TimeDateUtil;

import excel.config.Config_xtcs_004;
import excel.config.Config_ysboss_759;
import excel.struct.Struct_ysboss_759;

public class SpecialAnimalBossSysEvent extends AbsSystemEvent {

	private static SpecialAnimalBossSysEvent ins;

	private SpecialAnimalBossSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized SpecialAnimalBossSysEvent getIns() {
		if (ins == null) {
			ins = new SpecialAnimalBossSysEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		SpecialAnimalBossData bossData = hero.getSpecialAnimalBossData();
		if(bossData==null) {			
			bossData = new SpecialAnimalBossData();
			bossData.setHid(hero.getId());
			Struct_ysboss_759 struct_ysboss_759 = Config_ysboss_759.getIns().getSortList().get(0);
			bossData.setGuanqia(struct_ysboss_759.getTgs());
			int num = Config_xtcs_004.getIns().get(SpecialAnimalBossConst.MAX_CHA).getNum();
			bossData.setChaNum(num);
			int mondayZeroTime = TimeDateUtil.getMondayZeroTime();
			bossData.setWeekResetTime(mondayZeroTime);
			hero.setSpecialAnimalBossData(bossData);
		}
	}

	@Override
	public void login(Hero hero) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SPECIALANIMAL_BOSS)) {
			return;
		}
		boolean checkRedPoint = SpecialAnimalBossFunction.getIns().checkRedPoint(hero);
		if (checkRedPoint) {
			RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.SPECIALANIMAL_BOSS, RedPointConst.RED_1,
					RedPointConst.HAS_RED);
		}
		long hid = hero.getId();
		ConcurrentHashMap<Integer, BossKillerInfo> bossKillerMap = SpecialAnimalBossSysCache.getBossKillerMap();
		Iterator<BossKillerInfo> iterator = bossKillerMap.values().iterator();
		for (; iterator.hasNext();) {
			BossKillerInfo info = iterator.next();
			if (info.getHid() == hid) {
				info.setIcon(hero.getIcon());
				info.setFrame(hero.getFrame());
				info.setName(hero.getNameZoneid());
			}
		}
	}

	@Override
	public void logout(Hero hero) {
		SpecialAnimalBossManager.getIns().fightEnd(hero, 0);
	}

	@Override
	public void loginReset(Hero hero, int now) {
		dailyReset(hero);
		weekReset(hero);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		dailyReset(hero);
		weekReset(hero);
	}

	@Override
	public void zeroPub(int now) {
		OpTaskExecutorService.PublicOrderService.execute(new RankingOpTaskRunnable() {

			@Override
			public void run() {
				int mondayZeroTime = TimeDateUtil.getMondayZeroTime();
				int pubWeekRestTime = SpecialAnimalBossSysCache.getPubWeekRestTime();
				if (pubWeekRestTime != mondayZeroTime) {
					SpecialAnimalBossSysCache.getBossKillerMap().clear();
					SpecialAnimalBossSysCache.getPassRank().clear();
					SpecialAnimalBossSysCache.setPubWeekRestTime(mondayZeroTime);
				}
			}

			@Override
			public Object getSession() {
				return OpTaskConst.SPECIAL_ANIMAL_BOSS;
			}
		});
	}

	/**
	 * 每日重置
	 * @param hero
	 */
	public void dailyReset(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SPECIALANIMAL_BOSS)) {
				return;
			}
			SpecialAnimalBossData bossData = hero.getSpecialAnimalBossData();
			bossData.setBuyChaNum(0);
		} catch (Exception e) {
			LogTool.error(e, SpecialAnimalBossSysEvent.class, "SpecialAnimalBossSysEvent dailyReset");
		}
	}

	/**
	 * 周重置
	 * @param hero
	 */
	public void weekReset(Hero hero) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, SystemIdConst.SPECIALANIMAL_BOSS)) {
				return;
			}
			SpecialAnimalBossData bossData = hero.getSpecialAnimalBossData();
			int weekResetTime = bossData.getWeekResetTime();
			int mondayZeroTime = TimeDateUtil.getMondayZeroTime();
			if (weekResetTime != mondayZeroTime) {
				Struct_ysboss_759 struct_ysboss_759 = Config_ysboss_759.getIns().getSortList().get(0);
				bossData.setGuanqia(struct_ysboss_759.getTgs());
				bossData.setPassGq(0);
				bossData.setRewardGq(0);
				int maxCha = Config_xtcs_004.getIns().get(SpecialAnimalBossConst.MAX_CHA).getNum();
				int chaNum = bossData.getChaNum();
				if (chaNum < maxCha) {
					bossData.setChaNum(maxCha);
				}
				bossData.setWeekResetTime(mondayZeroTime);
				SpecialAnimalBossManager.getIns().openUI(hero);
				LogTool.info(hero.getId(), hero.getName(), "SpecialAnimalBossManager weekReset newGuanQia="+struct_ysboss_759.getTgs(), SpecialAnimalBossManager.class);
			}
		} catch (Exception e) {
			LogTool.error(e, SpecialAnimalBossSysEvent.class, "SpecialAnimalBossSysEvent weekReset");
		}
	}

}
