package com.teamtop.system.guanQiaHelp;

import java.util.Date;
import java.util.Iterator;
import java.util.Map;

import com.teamtop.system.battle.BattleConst;
import com.teamtop.system.daytask.DayTaskConst;
import com.teamtop.system.daytask.DayTaskFunction;
import com.teamtop.system.guanQiaHelp.model.GuanQiaHelpBoss;
import com.teamtop.system.guanQiaHelp.model.GuanQiaHelpModel;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.util.log.LogTool;

public class GuanQiaHelpManager {
	private static GuanQiaHelpManager ins = null;

	public static GuanQiaHelpManager getIns() {
		if (ins == null) {
			ins = new GuanQiaHelpManager();
		}
		return ins;
	}

	public void broadCast(Hero hero) {
		try {
			if (hero == null) {
				return;
			}
			// 判断能否广播邀请协助
			if (!GuanQiaHelpFunction.getIns().canBroadCast(hero)) {
				return;
			}

			// 初始化协助关卡信息
			GuanQiaHelpBoss boss = GuanQiaHelpFunction.getIns().createHelpBoss(hero);

			// 初始化求助者信息
			GuanQiaHelpModel model = GuanQiaHelpFunction.getIns().createHelpModel(hero);
			boss.setMyModel(model);

			GuanQiaHelpCache.getGuanQiaHelpBossMap().put(hero.getId(), boss);

			GuanQiaHelpSender.sendCmd_5902(hero.getId(), 1);

			// 每日任务
			DayTaskFunction.getIns().successDayTaskType(hero, DayTaskConst.DATTASK_TYPE27);

			// 广播给其他玩家
			long seekHelpHeroId = hero.getId();
			String name = hero.getNameZoneid();
			int guanQiaNum = hero.getGuanqia().getCurGuanqia();
			Map<Long, Hero> roleCache = HeroCache.getHeroMap();
			Iterator<Hero> it = roleCache.values().iterator();
			while (it.hasNext()) {
				Hero role = it.next();
				if(role == null || role.getGuanqia() == null) {
					continue;
				}
				if(role.getGuanqia().getCurGuanqia() < guanQiaNum) {
					// 关卡数不足不显示邀请
					continue;
				}
				GuanQiaHelpSender.sendCmd_5904(role.getId(), guanQiaNum, name, seekHelpHeroId);
			}
		} catch (Exception e) {
			LogTool.error(e, GuanQiaHelpManager.class, hero.getId(), hero.getName(), "broadCast has wrong");
		}
	}

	public void agree(Hero hero, long seekHelpHeroId, int guanQiaNum) {
		if (hero == null) {
			return;
		}
		GuanQiaHelpBoss boss = null;
		try {
			boss = GuanQiaHelpCache.getGuanQiaHelpBossMap().get(seekHelpHeroId);

			// 判断能否帮忙该协助
			if (!GuanQiaHelpFunction.getIns().canAgree(hero, boss)) {
				return;
			}

			GuanQiaHelpModel model = GuanQiaHelpFunction.getIns().createHelpModel(hero);
			boss.setOtherId(hero.getId());
			boss.setOtherModel(model);
			boss.setState(GuanQiaHelpConst.STATE_4);
			boss.setAskTime(System.currentTimeMillis());

			GuanQiaHelpSender.sendCmd_5906(hero.getId(), boss.getHid());
			GuanQiaHelpSender.sendCmd_5906(seekHelpHeroId, boss.getHid());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void noticeState(Hero hero, long seekHelpId) {
		// 两人确认可以开始战斗就开始战斗
		if (seekHelpId < 0) {
			// 进入不了副本
			GuanQiaHelpBoss boss = GuanQiaHelpCache.getGuanQiaHelpBossMap().get(seekHelpId * -1);
			if (boss == null) {
				// 该求助已失效
				return;
			}
			if (boss.getHid() == hero.getId()) {
				// 求助者无法进入副本
			} else if (boss.getOtherId() == hero.getId()) {
				// 帮助者无法进入副本
			} else {
				// 你是谁啊?
				return;
			}
			if (boss.getState() == GuanQiaHelpConst.STATE_0) {
				return;
			}
			boss.setState(GuanQiaHelpConst.STATE_0);
			GuanQiaHelpSender.sendCmd_5908(boss.getOtherId(), -1, 0, 0, 0);
			return;
		}

		GuanQiaHelpBoss boss = GuanQiaHelpCache.getGuanQiaHelpBossMap().get(seekHelpId);
		if (boss == null) {
			// 求助者已通关该关卡
			GuanQiaHelpSender.sendCmd_5908(hero.getId(), -2, 0, 0, 0);
			return;
		}

		if (boss.getState() == GuanQiaHelpConst.STATE_0) {
			// 少了该判断导致拉两位大佬进副本打无敌boss
			GuanQiaHelpSender.sendCmd_5908(boss.getOtherId(), -1, 0, 0, 0);
			return;
		}

		if (boss.getState() == GuanQiaHelpConst.STATE_4) {
			Hero seekHero = HeroCache.getHero(boss.getHid());
			if (!seekHero.isOnline()) {
				// 求助者不在线
				boss.setState(GuanQiaHelpConst.STATE_0);
				return;
			}

			Hero otherHero = HeroCache.getHero(boss.getOtherId());
			if (!otherHero.isOnline()) {
				// 帮助者不在线
				boss.setState(GuanQiaHelpConst.STATE_0);
				return;
			}
			boss.setState(GuanQiaHelpConst.STATE_2);
			return;
		} else if (boss.getState() == GuanQiaHelpConst.STATE_2) {
			// 给n秒无敌
			boss.setInvincibleTime(new Date().getTime() + BattleConst.ATT_WUDI_BEGIN_CONST * 1000);
			boss.getMyModel().setInvincibleTime(new Date().getTime() + BattleConst.ATT_WUDI_BEGIN_CONST * 1000);
			boss.getOtherModel().setInvincibleTime(new Date().getTime() + BattleConst.ATT_WUDI_BEGIN_CONST * 1000);
			boss.getMyModel().getMember().getBuffMap().clear();
			boss.getOtherModel().getMember().getBuffMap().clear();
			boss.setState(GuanQiaHelpConst.STATE_1);
		}else {
			GuanQiaHelpSender.sendCmd_5908(boss.getOtherId(), -1, 0, 0, 0);
			return;
		}
		int hasGoldMonster = boss.getHasGoldMonster();

		// 发送战斗属性
		Hero heroTemp = HeroCache.getHero(boss.getHid());
		HeroFunction.getIns().sendBattleHeroAttr(heroTemp, boss.getOtherId());

		heroTemp = HeroCache.getHero(boss.getOtherId());
		HeroFunction.getIns().sendBattleHeroAttr(heroTemp, boss.getHid());

		GuanQiaHelpSender.sendCmd_5908(boss.getHid(), 1, hasGoldMonster, boss.getOtherId(), boss.getGuanQiaNum());
		GuanQiaHelpSender.sendCmd_5908(boss.getOtherId(), 1, hasGoldMonster, boss.getHid(), boss.getGuanQiaNum());

	}

	public void exitFight(Hero hero, long seekHelpId) {
		GuanQiaHelpBoss boss = GuanQiaHelpCache.getGuanQiaHelpBossMap().get(seekHelpId);
		if (boss == null) {
			return;
		}

		if (boss.getHid() == hero.getId()) {
			// 本人离开关卡
			boss.getMyModel().setDeath(GuanQiaHelpConst.DEATH_2);
			GuanQiaHelpSender.sendCmd_5916(boss.getOtherId(), boss.getHid(), boss.getMyModel().getName());
		} else if (boss.getOtherId() == hero.getId()) {
			// 协助者离开关卡
			boss.getOtherModel().setDeath(GuanQiaHelpConst.DEATH_2);
			GuanQiaHelpSender.sendCmd_5916(boss.getHid(), boss.getOtherId(), boss.getOtherModel().getName());
		}
	}
}
