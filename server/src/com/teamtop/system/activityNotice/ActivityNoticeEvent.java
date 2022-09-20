package com.teamtop.system.activityNotice;

import java.util.Collection;

import com.teamtop.cross.CrossZone;
import com.teamtop.system.activityNotice.model.ActivityNoticeItemModel;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.global.GlobalSender;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.hero.HeroFunction;
import com.teamtop.util.time.TimeDateUtil;

public class ActivityNoticeEvent extends AbsSystemEvent {
	private static ActivityNoticeEvent ins = null;

	public static ActivityNoticeEvent getIns() {
		if (ins == null) {
			ins = new ActivityNoticeEvent();
		}
		return ins;
	}

	private ActivityNoticeEvent() {
	}

	@Override
	public void init(Hero hero) {

	}

	@Override
	public void login(Hero hero) {
		if (!HeroFunction.getIns().checkSystemOpen(hero, ActivityNoticeConst.ACTIVITYNOTICE_SYSTEMID)) {
			return;
		}
		ActivityNoticeItemModel model = ActivityNoticeFunction.getIns().getModel(hero);
		if (model == null) {
			return;
		}
		ActivityNoticeSender.sendCmd_2350(hero.getId(), model.getId(), model.getEndTime());
		if (model.getEndTime() != -1) {
			int startTime = model.getEndTime() - model.getTime();
			int currentTime = TimeDateUtil.getCurrentTime();
			if (currentTime >= startTime && currentTime < (startTime + ActivityNoticeConst.TIMES)) {
				GlobalSender.sendCmd_264(hero.getId(), model.getSysId(), 0, 1);
			}
		}
	}

	@Override
	public void fixTime(int cmdId, int now) {
		if (CrossZone.isCrossServer()) {
			return;
		}
		if (cmdId == 1) {
			ActivityNoticeFunction.getIns().currentTimePriorityListHandle();
			Collection<Hero> heroColl = HeroCache.getHeroMap().values();
			for (Hero hero : heroColl) {
				if (!HeroFunction.getIns().checkSystemOpen(hero, ActivityNoticeConst.ACTIVITYNOTICE_SYSTEMID)) {
					return;
				}
				ActivityNoticeItemModel model = ActivityNoticeFunction.getIns().getModel(hero);
				if (model == null) {
					return;
				}
				ActivityNoticeSender.sendCmd_2350(hero.getId(), model.getId(), model.getEndTime());
				if (model.getEndTime() != -1) {
					int startTime = model.getEndTime() - model.getTime();
					int currentTime = TimeDateUtil.getCurrentTime();
					if (currentTime >= startTime && currentTime < (startTime + ActivityNoticeConst.TIMES)) {
						GlobalSender.sendCmd_264(hero.getId(), model.getSysId(), 0, 1);
					}
				}
			}
		}

		if (cmdId == 2) {// 主要处理活动结束时的状态
//			ActivityNoticeFunction.getIns().handleActivityEndState();
		}

	}
	
	

	@Override
	public void zeroPub(int now) {
		if (CrossZone.isCrossServer()) {
			return;
		}
		ActivityNoticeFunction.getIns().initConfigStartTimeSortTreeMap();
	}

	@Override
	public void levelUp(Hero hero, int newLv, int oldLv) {
		// TODO Auto-generated method stub
		login(hero);
	}

	@Override
	public void passGuanqia(Hero hero, int passGuanqia) {
		// TODO Auto-generated method stub
		login(hero);
	}

}
