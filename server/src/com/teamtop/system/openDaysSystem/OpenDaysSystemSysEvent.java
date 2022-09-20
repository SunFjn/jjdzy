package com.teamtop.system.openDaysSystem;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import com.alibaba.fastjson.JSONObject;
import com.teamtop.cross.CrossZone;
import com.teamtop.system.event.systemEvent.AbsSystemEvent;
import com.teamtop.system.hero.Hero;
import com.teamtop.system.hero.HeroCache;
import com.teamtop.system.openDaysSystem.model.AbsOpenDaysSystemModel;
import com.teamtop.system.openDaysSystem.model.HeroOpenDaysSysData;
import com.teamtop.util.log.LogTool;

public class OpenDaysSystemSysEvent extends AbsSystemEvent {

	private static OpenDaysSystemSysEvent ins;

	private OpenDaysSystemSysEvent() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized OpenDaysSystemSysEvent getIns() {
		if (ins == null) {
			ins = new OpenDaysSystemSysEvent();
		}
		return ins;
	}

	@Override
	public void init(Hero hero) {
		HeroOpenDaysSysData data = hero.getHeroOpenDaysSysData();
		if (data == null) {
			data = new HeroOpenDaysSysData();
			data.setHid(hero.getId());
			List<AbsOpenDaysSystemModel> list = OpenDaysSystemDao.getDao().findHeroOpSys(hero.getId(), hero.getZoneid());
			Map<Integer, AbsOpenDaysSystemModel> opSysDataMap = new HashMap<>();
			data.setOpSysDataMap(opSysDataMap);
			int size = list.size();
			int uid = 0;
			long id = 0;
			int sysid = 0;
			for(int i=0;i<size;i++) {
				try {
					AbsOpenDaysSystemModel opSysdata = list.get(i);
					id = opSysdata.getId();
					uid = opSysdata.getUid();
					sysid = opSysdata.getSysid();
					opSysdata = (AbsOpenDaysSystemModel) JSONObject.parseObject(opSysdata.getOpSysStr(),
							OpenDaysSystemSysCache.getManager(sysid).getSystemModel());
					opSysdata.setId(id);
					opSysDataMap.put(uid, opSysdata);
				} catch (Exception e) {
					LogTool.error(e, OpenDaysSystemSysEvent.class, hero.getId(), hero.getName(),
							"OpenDaysSystemSysEvent init uid=" + uid + ", sysid=" + sysid);
				}
			}
			hero.setHeroOpenDaysSysData(data);
		}
	}

	@Override
	public void login(Hero hero) {
		OpenDaysSystemFunction.getIns().opDaysSysEnd(hero);
		OpenDaysSystemFunction.getIns().opDaysSysOpen(hero, true);
		OpenDaysSystemFunction.getIns().sendOpenSystem(hero);
		OpenDaysSystemFunction.getIns().login(hero);
	}

	@Override
	public void loginReset(Hero hero, int now) {
		OpenDaysSystemFunction.getIns().opDaysSysEnd(hero);
		OpenDaysSystemFunction.getIns().loginReset(hero, now);
	}

	@Override
	public void zeroHero(Hero hero, int now) {
		OpenDaysSystemFunction.getIns().zeroHero(hero, now);
		OpenDaysSystemFunction.getIns().opDaysSysOpen(hero, false);
		// OpenDaysSystemFunction.getIns().sendOpenSystem(hero);
	}

	@Override
	public void zeroPub(int now) {
		OpenDaysSystemFunction.getIns().zeroPub(now);
		OpenDaysSystemFunction.getIns().checkSysEnd();

		OpenDaysSystemFunction.getIns().checkSystemOpen(false);
	}

	@Override
	public void logout(Hero hero) {
		OpenDaysSystemFunction.getIns().logout(hero);
	}

	@Override
	public void logoutSyncPub(Hero hero, int syncType) {
		try {
			OpenDaysSystemFunction.getIns().logoutSyncPub(hero, syncType);
		} catch (Exception e) {
			LogTool.error(e, OpenDaysSystemSysEvent.class, hero.getId(), hero.getName(),
					"OpenDaysSystemSysEvent logoutSyncPub");
		}
		HeroOpenDaysSysData heroOpenDaysSysData = hero.getHeroOpenDaysSysData();
		if (heroOpenDaysSysData == null) {
			return;
		}
		Map<Integer, AbsOpenDaysSystemModel> opSysDataMap = heroOpenDaysSysData.getOpSysDataMap();
		if (opSysDataMap.size() > 0) {
			OpenDaysSystemDao.getDao().saveOpSysData(hero, opSysDataMap);
		}
	}

	@Override
	public void levelUp(Hero hero, int newLv, int oldLv) {
		OpenDaysSystemFunction.getIns().opDaysSysOpen(hero, false);
		OpenDaysSystemFunction.getIns().levelUp(hero, newLv, oldLv);
	}

	@Override
	public void passGuanqia(Hero hero, int passGuanqia) {
		OpenDaysSystemFunction.getIns().opDaysSysOpen(hero, false);
		OpenDaysSystemFunction.getIns().passGuanqia(hero, passGuanqia);
	}

	@Override
	public void fixTime(int cmdId, int now) {
		if (CrossZone.isCrossServer()) {
			return;
		}
		if (cmdId == 1) {
			OpenDaysSystemFunction.getIns().checkSysEnd();
			OpenDaysSystemFunction.getIns().checkSystemOpen(true);
			Iterator<Hero> iterator = HeroCache.getHeroMap().values().iterator();
			Hero hero = null;
			for (; iterator.hasNext();) {
				hero = iterator.next();
				if(hero.isOnline()) {					
					OpenDaysSystemFunction.getIns().sendOpenSystem(hero);
				}
			}
		}
		OpenDaysSystemFunction.getIns().fixTime(cmdId, now);
	}

}
