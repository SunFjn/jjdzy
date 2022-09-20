package com.teamtop.system.activity.ativitys.arenaFight;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;

public class ArenaFightLocalCache extends AbsServerEvent {

	public static int opState = 0;

//	private static ConcurrentHashMap<Long, ArenaFightModel> heroArenaMap = new ConcurrentHashMap<>();
//
//	public static ConcurrentHashMap<Long, ArenaFightModel> getHeroArenaMap() {
//		return heroArenaMap;
//	}
//
//	public static void setHeroArenaMap(ConcurrentHashMap<Long, ArenaFightModel> heroArenaMap) {
//		ArenaFightLocalCache.heroArenaMap = heroArenaMap;
//	}

	public static boolean isFightOpen() {
		if (opState > 0) {
			return true;
		}
		return false;
	}

	@Override
	public void startServer() throws RunServerException {
		// TODO Auto-generated method stub

	}

	@Override
	public void initExcel() throws RunServerException {
		// TODO Auto-generated method stub
		super.initExcel();
	}

}
