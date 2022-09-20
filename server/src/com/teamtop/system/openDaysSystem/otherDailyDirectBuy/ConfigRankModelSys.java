package com.teamtop.system.openDaysSystem.otherDailyDirectBuy;

import java.util.Comparator;

import excel.struct.Struct_mrzg3_256;

public class ConfigRankModelSys implements Comparator<Struct_mrzg3_256> {
	@Override
	public int compare(Struct_mrzg3_256 o1, Struct_mrzg3_256 o2) {
		// TODO Auto-generated method stub
		if (o1.getId() > o2.getId()) {
			return 1;
		} else if (o1.getId() < o2.getId()) {
			return -1;
		}
		return 0;
	}

}

