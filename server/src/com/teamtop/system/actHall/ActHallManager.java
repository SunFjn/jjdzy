package com.teamtop.system.actHall;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import com.teamtop.system.crossZhuLu.cross.CrossZhuLuFunction;
import com.teamtop.system.hero.Hero;
import com.teamtop.util.log.LogTool;

public class ActHallManager {

	private static ActHallManager actHallManager;

	private ActHallManager() {
		// TODO Auto-generated constructor stub
	}

	public static synchronized ActHallManager getIns() {
		if (actHallManager == null) {
			actHallManager = new ActHallManager();
		}
		return actHallManager;
	}

	public void openActHall(Hero hero) {
		if (hero == null) {
			return;
		}
		long hid = hero.getId();
		try {
			List<Object[]> sendList = new ArrayList<>();
			Iterator<ActHallInterface> iterator = ActHallCache.actHallMap.iterator();
			for (; iterator.hasNext();) {
				ActHallInterface acthall = (ActHallInterface) iterator.next();
				acthall.getActHallData(sendList);
			}
			ActHallSender.sendCmd_3752(hid, sendList.toArray());
		} catch (Exception e) {
			LogTool.error(e, actHallManager, hid, hero.getName(), "");
		}
	}

}
