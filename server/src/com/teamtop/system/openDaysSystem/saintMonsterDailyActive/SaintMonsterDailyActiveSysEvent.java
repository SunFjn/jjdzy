package com.teamtop.system.openDaysSystem.saintMonsterDailyActive;

import java.util.Iterator;
import java.util.Map;

import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.SystemIdConst;
import com.teamtop.system.mail.MailConst;
import com.teamtop.system.mail.MailFunction;
import com.teamtop.system.openDaysSystem.OpenDaysSystemFunction;
import com.teamtop.system.openDaysSystem.model.AbsOpenDaysSystemModel;
import com.teamtop.system.openDaysSystem.model.HeroOpenDaysSysData;
import com.teamtop.system.openDaysSystem.saintMonsterDailyActive.model.SaintMonsterDailyActive;
import com.teamtop.system.openDaysSystem.saintMonsterDial.model.SaintMonsterDial;
import com.teamtop.system.redPoint.RedPointConst;
import com.teamtop.system.redPoint.RedPointFunction;

import excel.config.Config_ssshhy_268;
import excel.struct.Struct_ssshhy_268;

public class SaintMonsterDailyActiveSysEvent extends AbsSystemEvent {

	private static SaintMonsterDailyActiveSysEvent ins;

	private SaintMonsterDailyActiveSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized SaintMonsterDailyActiveSysEvent getIns() {
		if (ins == null) {
			ins = new SaintMonsterDailyActiveSysEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		// TODO Auto-generated method stub

	}

	@Override
	public void login(Hero hero) {
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.SAINT_MONSTER_DAILY_ACTIVE)) {
			return;
		}
		int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.SAINT_MONSTER_DAILY_ACTIVE);
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
			if(!(systemModel instanceof SaintMonsterDailyActive)) {
				Map<Integer, AbsOpenDaysSystemModel> tempMap = heroOpenDaysSysData.getTempMap();
				AbsOpenDaysSystemModel systemModel2 = tempMap.get(18);
				if(systemModel2!=null) {						
					heroOpenDaysSysData.getOpSysDataMap().put(18, systemModel2);
				}
			}
		}
		boolean redPoint = SaintMonsterDailyActiveFunction.getIns().checkRedPoint(hero);
		if (redPoint) {
			RedPointFunction.getIns().addLoginRedPoint(hero, SystemIdConst.SAINT_MONSTER_DAILY_ACTIVE,
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
		if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, SystemIdConst.SAINT_MONSTER_DAILY_ACTIVE)) {
			return;
		}
		long hid = hero.getId();
		//补发奖励
		int uid = OpenDaysSystemFunction.getIns().checkSystemOpenBySysId(SystemIdConst.SAINT_MONSTER_DAILY_ACTIVE);
		SaintMonsterDailyActive model = (SaintMonsterDailyActive) SaintMonsterDailyActiveManager.getIns().getSystemModel(hero, uid);
		int mailId = MailConst.SAINT_MONSTER_DAILY_ACTIVATE;
		Map<Integer, Map<Integer, Integer>> rewardMap = model.getRewardMap();
		Map<Integer, Struct_ssshhy_268> taskMap = Config_ssshhy_268.getIns().getMap();
		Iterator<Integer> iterator = rewardMap.keySet().iterator();
		int type = 0;
		int taskId = 0;
		for(;iterator.hasNext();) {
			type = iterator.next();
			Map<Integer, Integer> map = rewardMap.get(type);
			Iterator<Integer> iterator2 = map.keySet().iterator();
			for(;iterator2.hasNext();) {
				taskId = iterator2.next();
				Integer state = map.get(taskId);
				if(state!=null&&state==SaintMonsterDailyActiveConst.CAN_GET) {
					map.put(taskId, SaintMonsterDailyActiveConst.ALREADY_GET);
					Struct_ssshhy_268 ssshhy_268 = taskMap.get(taskId);
					int[][] reward = ssshhy_268.getReward();
					if(reward!=null) {							
						MailFunction.getIns().sendMailWithFujianData2(hid, mailId, new Object[] { mailId }, reward);
					}
				}
			}
		}
		Map<Integer, Integer> activeMap = model.getActiveMap();
		activeMap.clear();
		rewardMap.clear();
	}

}
