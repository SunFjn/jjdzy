package com.teamtop.system.event.backstage.events.backstage.oldPlayer;

import com.teamtop.util.db.trans.FieldOrder;

public class ZonesInfo implements Comparable<ZonesInfo> {

	@FieldOrder(order = 1)
	private int zoneid;

	@FieldOrder(order = 2)
	private int lastTime;

	public int getZoneid() {
		return zoneid;
	}

	public void setZoneid(int zoneid) {
		this.zoneid = zoneid;
	}

	public int getLastTime() {
		return lastTime;
	}

	public void setLastTime(int lastTime) {
		this.lastTime = lastTime;
	}

	@Override
	public int compareTo(ZonesInfo o) {
		if (o.getLastTime() > lastTime) {
			return 1;
		} else if (lastTime == o.getLastTime()) {
			return 0;
		}
		return -1;
	}

}
