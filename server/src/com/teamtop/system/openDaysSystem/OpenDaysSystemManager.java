package com.teamtop.system.openDaysSystem;

import com.teamtop.system.hero.Hero;
import com.teamtop.util.log.LogTool;

public class OpenDaysSystemManager {

	private static OpenDaysSystemManager ins;

	private OpenDaysSystemManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized OpenDaysSystemManager getIns() {
		if (ins == null) {
			ins = new OpenDaysSystemManager();
		}
		return ins;
	}

	public void openUI(Hero hero, int sysId) {
		try {
			if (!OpenDaysSystemFunction.getIns().isSystemActOpen(hero, sysId)) {
				return;
			}
			AbsOpenDaysManager manager = OpenDaysSystemSysCache.getManager(sysId);
			if (manager == null) {
				return;
			}
			manager.openUI(hero);
		} catch (Exception e) {
			LogTool.error(e, OpenDaysSystemManager.class, hero.getId(), hero.getName(), "");
		}
	}

}
