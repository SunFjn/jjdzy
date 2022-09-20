package com.teamtop.system.guanQiaHelp;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import com.teamtop.main.RunServerException;
import com.teamtop.system.event.serverEvent.AbsServerEvent;
import com.teamtop.system.guanQiaHelp.model.GuanQiaHelpBoss;
import com.teamtop.util.cache.union.UC;

public class GuanQiaHelpCache extends AbsServerEvent {

	private static GuanQiaHelpCache ins = null;

	public static GuanQiaHelpCache getIns() {
		if (ins == null) {
			ins = new GuanQiaHelpCache();
		}
		return ins;
	}

	/** * boss缓存 key:heroId */
	private static Map<Long, GuanQiaHelpBoss> guanQiaHelpBossMap = UC.reg("guanQiaHelpBoss",
			new ConcurrentHashMap<Long, GuanQiaHelpBoss>());

	@Override
	public void startServer() throws RunServerException {

	}

	public static Map<Long, GuanQiaHelpBoss> getGuanQiaHelpBossMap() {
		return guanQiaHelpBossMap;
	}

	public static void setGuanQiaHelpBossMap(Map<Long, GuanQiaHelpBoss> guanQiaHelpBossMap) {
		GuanQiaHelpCache.guanQiaHelpBossMap = guanQiaHelpBossMap;
	}

}
