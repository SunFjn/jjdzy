package com.teamtop.system.activity.ativitys.dailyDirectBuy;

import java.util.Comparator;

import excel.struct.Struct_mrzg2_256;

public class ConfigRankModelAct implements Comparator<Struct_mrzg2_256> {
	@Override
	public int compare(Struct_mrzg2_256 o1, Struct_mrzg2_256 o2) {
		// TODO Auto-generated method stub
		if (o1.getId() > o2.getId()) {
			return 1;
		} else if (o1.getId() < o2.getId()) {
			return -1;
		}
		return 0;
	}

}
