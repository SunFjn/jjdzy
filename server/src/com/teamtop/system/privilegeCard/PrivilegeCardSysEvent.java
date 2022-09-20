package com.teamtop.system.privilegeCard;

import java.util.Iterator;
import java.util.Map;

import com.teamtop.synHandleCore.OpTaskExecutorService;
import com.teamtop.synHandleCore.orderedRunnable.HeroOpTaskRunnable;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.util.log.LogTool;

public class PrivilegeCardSysEvent extends AbsSystemEvent {
	private static PrivilegeCardSysEvent privilegeCardSysEvent;

	private PrivilegeCardSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized PrivilegeCardSysEvent getIns() {
		if (privilegeCardSysEvent == null) {
			privilegeCardSysEvent = new PrivilegeCardSysEvent();
		}
		return privilegeCardSysEvent;
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void login(Hero hero) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, PrivilegeCardConst.SysId)) {
			return;
		}
		int privilegeAward = hero.getPrivilegeAward();
		if (privilegeAward > 0) {
			return;
		}
		Map<Integer, int[]> privilegeCardMap = hero.getPrivilegeCardMap();
		if (privilegeCardMap.size() >= PrivilegeCardConst.THREE_LIMIT) {
			hero.setPrivilegeAward(PrivilegeCardConst.THREE_CAN_GET);
		}

	}

	@Override
	public void loginReset(Hero hero, int now) {
		dailyReset(hero, now);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		dailyReset(hero, now);
		PrivilegeCardManager.getIns().openPrivilegeCard(hero);
	}

	private void dailyReset(Hero hero, int now) {
		try {
			if (!HeroFunction.getIns().checkSystemOpen(hero, PrivilegeCardConst.SysId)) {
				return;
			}
			Map<Integer, int[]> privilegeCardMap = hero.getPrivilegeCardMap();
			Iterator<Integer> iterator = privilegeCardMap.keySet().iterator();
			for (; iterator.hasNext();) {
				int[] info = privilegeCardMap.get(iterator.next());
				info[0] = PrivilegeCardConst.CAN_GET;
			}
		} catch (Exception e) {
			LogTool.error(e, PrivilegeCardSysEvent.class, hero.getId(), hero.getName(),
					"PrivilegeCardSysEvent dailyReset");
		}
	}

	@Override
	public void fixTime(int cmdId, int now) {
		if (cmdId == 1) {
			Map<Long, Hero> heroMap = HeroCache.getHeroMap();
			Iterator<Hero> iterator = heroMap.values().iterator();
			for (; iterator.hasNext();) {
				Hero hero = iterator.next();
				if (hero.isOnline()) {
					OpTaskExecutorService.DefaultService.execute(new HeroOpTaskRunnable() {

						@Override
						public void run() {
							PrivilegeCardFunction.getIns().checkPrivilegeCard(hero);
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
