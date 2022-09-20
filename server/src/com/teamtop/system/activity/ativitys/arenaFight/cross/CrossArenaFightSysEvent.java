package com.teamtop.system.activity.ativitys.arenaFight.cross;

import java.util.Iterator;

import com.teamtop.system.activity.ativitys.arenaFight.ArenaFightFunction;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.time.TimeDateUtil;

public class CrossArenaFightSysEvent extends AbsSystemEvent {

	private static CrossArenaFightSysEvent ins;

	private CrossArenaFightSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized CrossArenaFightSysEvent getIns() {
		if (ins == null) {
			ins = new CrossArenaFightSysEvent();
		}
		return ins;
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
	public void fixTime(int cmdId, int now) {
		if (cmdId == 1) {
			int hour = TimeDateUtil.getHour();
			int minute = TimeDateUtil.getMinute();
			if (CrossArenaFightSysCache.isActOpen()) {
				Iterator<ArenaOpenTime> iterator = CrossArenaFightSysCache.getArenaTimeMap().values().iterator();
				for (; iterator.hasNext();) {
					ArenaOpenTime at = iterator.next();
					int startHour = at.getStartHour();
					int startMinute = at.getStartMinute();
					int endHour = at.getEndHour();
					int endMinute = at.getEndMinute();
					if (hour >= startHour && hour <= endHour) {
						if (hour == startHour && (minute == startMinute||minute == startMinute+1) && CrossArenaFightSysCache.opState == 0) {
							// &&minute<=endMinute
							// 开始
							CrossArenaFightSysCache.getHeroArenaMap().clear();
							ArenaFightFunction.getIns().initArenaMaster(CrossArenaFightSysCache.qs);
							CrossArenaFightSysCache.opState = at.getId();
							ArenaFightFunction.getIns().noticeFightOpen();
							return;
						}
						if (hour == endHour && (minute >= endMinute||minute==endMinute+1) && CrossArenaFightSysCache.opState > 0) {
							// 关闭并且结算
							CrossArenaFightSysCache.opState = 0;
							ArenaFightFunction.getIns().endHandle();
						}
					}
				}
			}
		}
	}

}
