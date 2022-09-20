package com.teamtop.system.openDaysSystem.saintMonsterDial;

import java.util.Map;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.model.AbsOpenDaysSystemModel;
import com.teamtop.system.openDaysSystem.model.HeroOpenDaysSysData;
import com.teamtop.system.openDaysSystem.saintMonsterDial.model.SaintMonsterDial;
import com.teamtop.system.openDaysSystem.saintMonsterGoal.model.SaintMonsterGoal;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;

public class SaintMonsterDialSysEvent extends AbsSystemEvent {

	private static SaintMonsterDialSysEvent ins;

	private SaintMonsterDialSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized SaintMonsterDialSysEvent getIns() {
		if (ins == null) {
			ins = new SaintMonsterDialSysEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void login(Hero hero) {
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.SAINT_MONSTER_DIAL)) {
			return;
		}
		int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.SAINT_MONSTER_DIAL);
		if(uid > 0) {
			HeroOpenDaysSysData heroOpenDaysSysData = hero.getHeroOpenDaysSysData();
			if(heroOpenDaysSysData.getTempMap().size()==0) {
				Map<Integer, AbsOpenDaysSystemModel> opSysDataMap = heroOpenDaysSysData.getOpSysDataMap();
				heroOpenDaysSysData.getTempMap().put(15, opSysDataMap.get(14));
				heroOpenDaysSysData.getTempMap().put(16, opSysDataMap.get(15));
				heroOpenDaysSysData.getTempMap().put(17, opSysDataMap.get(16));
				heroOpenDaysSysData.getTempMap().put(18, opSysDataMap.get(17));
			}
			AbsOpenDaysSystemModel systemModel = heroOpenDaysSysData.getOpSysDataMap().get(uid);
			if(!(systemModel instanceof SaintMonsterDial)) {
				Map<Integer, AbsOpenDaysSystemModel> tempMap = heroOpenDaysSysData.getTempMap();
				AbsOpenDaysSystemModel systemModel2 = tempMap.get(15);
				if(systemModel2!=null) {						
					heroOpenDaysSysData.getOpSysDataMap().put(15, systemModel2);
				}
			}
		}
		boolean redPoint = SaintMonsterDialFunction.getIns().checkRedPoint(hero);
		if (redPoint) {
			RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.SAINT_MONSTER_DIAL, RedPointConst.RED_1,
					RedPointConst.HAS_RED);
		}
	}

}
