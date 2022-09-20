package com.teamtop.houtaiHttp.events.manualOpServer;

import java.util.Comparator;

import com.teamtop.system.event.backstage.events.backstage.oldPlayer.ZonesInfo;

public class RecentServerComparator implements Comparator<ZonesInfo>{

	@Override
	public int compare(ZonesInfo o1, ZonesInfo o2) {
		if(o2.getLastTime()<o1.getLastTime()) {
			return 1;
		}else if(o2.getLastTime()==o1.getLastTime()) {
			if(o2.getZoneid()>o1.getZoneid()) {
				return 1;
			}else if(o2.getZoneid()==o1.getZoneid()) {				
				return 0;
			}
		}
		return -1;
	}

}
