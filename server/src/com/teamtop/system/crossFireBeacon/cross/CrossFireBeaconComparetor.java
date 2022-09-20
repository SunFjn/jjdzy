package com.teamtop.system.crossFireBeacon.cross;

import java.util.Comparator;
import java.util.Map;

import com.teamtop.system.crossFireBeacon.CrossFireBeaconSysCache;

public class CrossFireBeaconComparetor implements Comparator<Integer> {

	private int partId;

	public int getPartId() {
		return partId;
	}

	public void setPartId(int partId) {
		this.partId = partId;
	}

	public CrossFireBeaconComparetor(int partId) {
		this.partId = partId;
	}

	@Override
	public int compare(Integer o1, Integer o2) {
		Map<Integer, Long> zoneIdStrength = CrossFireBeaconSysCache.getZoneIdStrength(partId);
		long strength1 = zoneIdStrength.get(o1);
		long strength2 = zoneIdStrength.get(o2);
		if (strength2 > strength1) {
			return 1;
		} else if (strength2 == strength1) {
			return 0;
		}
		return -1;
	}

}
