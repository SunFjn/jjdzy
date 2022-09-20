package com.teamtop.system.consume.events;

import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.system.consume.AbsConsumeEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.openDaysSystem.AbsOpenDaysManager;
import com.teamtop.system.openDaysSystem.OpenDaysSystemSysCache;
import com.teamtop.system.openDaysSystem.model.AbsOpenDaysSystemModel;
import com.teamtop.system.openDaysSystem.model.HeroOpenDaysSysData;
import com.teamtop.system.openDaysSystem.model.OpenSystemInfo;
import com.teamtop.system.recharge.events.OpenDaysSystemRechargeHandler;
import com.teamtop.util.log.LogTool;

import excel.config.Config_hdfl_012;
import excel.struct.Struct_hdfl_012;

public class OpenDaysSystemConsumeEvent extends AbsConsumeEvent {

	@Override
	public void consumeHandle(Hero hero, int consumeNum, int reason) {
		HeroOpenDaysSysData heroOpenDaysSysData = hero.getHeroOpenDaysSysData();
		Map<Integer, AbsOpenDaysSystemModel> opSysDataMap = heroOpenDaysSysData.getOpSysDataMap();
		Map<Integer, Struct_hdfl_012> map = Config_hdfl_012.getIns().getMap();
		Iterator<Integer> iterator = new HashSet<>(opSysDataMap.keySet()).iterator();
		ConcurrentHashMap<Integer, OpenSystemInfo> openMap = OpenDaysSystemSysCache.getOpenMap();
		Struct_hdfl_012 hdfl_012 = null;
		AbsOpenDaysManager manager = null;
		for (; iterator.hasNext();) {
			int uid = iterator.next();
			hdfl_012 = map.get(uid);
			if (hdfl_012 == null) {
				continue;
			}
			if (!openMap.containsKey(uid)) {
				continue;
			}
			int sysId = hdfl_012.getId();
			manager = OpenDaysSystemSysCache.getManager(sysId);
			if (manager != null) {
				try {
					manager.consumeHandle(hero, consumeNum, reason);
				} catch (Exception e) {
					LogTool.error(e, OpenDaysSystemRechargeHandler.class, hero.getId(), hero.getName(),
							"OpenDaysSystemRechargeHandler sysId=" + sysId);
				}
			}
		}
	}

}
