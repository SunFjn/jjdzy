package com.teamtop.system.activity.ativitys.nianMonsterMakeSpring;

import java.util.Iterator;
import java.util.Map;

import com.teamtop.cross.CrossZone;
import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.HeroOpTaskRunnable;
import com.teamtop.system.activity.ActivityFunction;
import com.teamtop.system.activity.ActivitySysId;
import com.teamtop.system.activity.ativitys.nianMonsterMakeSpring.model.NianMonsterMakeSpringModel;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;

public class NianMonsterMakeSpringSysEvent extends AbsSystemEvent {

	private static NianMonsterMakeSpringSysEvent ins;

	private NianMonsterMakeSpringSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized NianMonsterMakeSpringSysEvent getIns() {
		if (ins == null) {
			ins = new NianMonsterMakeSpringSysEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void login(Hero hero) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_NIAN_MONSTER_MAKE_SPRINGT)) {
			return;
		}
		boolean checkRedPoint = NianMonsterMakeSpringFunction.getIns().checkRedPoint(hero);
		if (checkRedPoint) {
			RedPointFunction.getIns().addLoginRedPoint(hero, ActivitySysId.ACT_NIAN_MONSTER_MAKE_SPRINGT,
					RedPointConst.RED_1, RedPointConst.HAS_RED);
		}
	}

	@Override
	public void loginReset(Hero hero, int now) {
		dailyReset(hero, now);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		dailyReset(hero, now);
	}

	public void dailyReset(Hero hero, int now) {
		if (!ActivityFunction.getIns().checkHeroActOpen(hero, ActivitySysId.ACT_NIAN_MONSTER_MAKE_SPRINGT)) {
			return;
		}
		NianMonsterMakeSpringModel actData = (NianMonsterMakeSpringModel) hero.getHeroActivityData()
				.getActivityDataMap().get(ActivitySysId.ACT_NIAN_MONSTER_MAKE_SPRINGT);
		actData.setKingState(0);
	}

	@Override
	public void fixTime(int cmdId, int now) {
		if (cmdId == 1) {
			if(CrossZone.isCrossServer()) {
				return;
			}
			if (!ActivityFunction.getIns().checkActOpen(ActivitySysId.ACT_NIAN_MONSTER_MAKE_SPRINGT)) {
				return;
			}
			Map<Long, Hero> heroMap = HeroCache.getHeroMap();
			Iterator<Hero> iterator = heroMap.values().iterator();
			for (; iterator.hasNext();) {
				Hero hero = iterator.next();
				if (hero.isOnline()) {
					OpTaskExecutorService.DefaultService.execute(new HeroOpTaskRunnable() {

						@Override
						public void run() {
							NianMonsterMakeSpringManager.getIns().checkBoomNum(hero);
						}

						@Override
						public Object getSession() {
							return hero.getId();
						}
					});
				}
			}
		}
	}

}
