package com.teamtop.system.boss.personalBoss;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import com.teamtop.system.boss.Boss;
import com.teamtop.system.boss.personalBoss.model.BossInfo;
import com.teamtop.system.boss.personalBoss.model.PersonalBoss;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.rewardBack.RewardBackFunction;
import com.teamtop.util.log.LogTool;

public class PersonalBossSysEvent extends AbsSystemEvent {

	private static PersonalBossSysEvent personalBossSysEvent;

	private PersonalBossSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized PersonalBossSysEvent getIns() {
		if (personalBossSysEvent == null) {
			personalBossSysEvent = new PersonalBossSysEvent();
		}
		return personalBossSysEvent;
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void login(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void loginReset(Hero hero, int now) {
		dailyReset(hero, now);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		dailyReset(hero, now);
	}

	private void dailyReset(Hero hero, int now) {
		try {
			Boss boss = hero.getBoss();
			if (boss == null) {
				return;
			}
			PersonalBoss personalBoss = boss.getPersonalBoss();
			if (personalBoss == null) {
				personalBoss = new PersonalBoss();
				Map<Integer, BossInfo> bossMap = new HashMap<>();
				personalBoss.setBossMap(bossMap);
				boss.setPersonalBoss(personalBoss);
			}
			
			Map<Integer, BossInfo> bossMap = personalBoss.getBossMap();
			//奖励找回处理(重置前)
			RewardBackFunction.getIns().handle(hero,PersonalBossConst.SysId, 0);
			Iterator<BossInfo> iterator = bossMap.values().iterator();
			BossInfo bossInfo = null;
			for (; iterator.hasNext();) {
				bossInfo = iterator.next();
				bossInfo.setChallengeNum(0);// 重置挑战次数
			}
			//奖励找回处理(重置后)
			RewardBackFunction.getIns().handle(hero,PersonalBossConst.SysId, 1);
		} catch (Exception e) {
			LogTool.error(e, PersonalBossSysEvent.class, hero.getId(), hero.getName(), "dailyReset fail");
		}
	}

}
