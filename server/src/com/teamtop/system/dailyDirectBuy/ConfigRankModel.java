package com.teamtop.system.dailyDirectBuy;

import java.util.Comparator;

import excel.struct.Struct_mrzg1_256;

public class ConfigRankModel implements Comparator<Struct_mrzg1_256> {
	@Override
	public int compare(Struct_mrzg1_256 o1, Struct_mrzg1_256 o2) {
		// TODO Auto-generated method stub
		if (o1.getId() > o2.getId()) {
			return 1;
		} else if (o1.getId() < o2.getId()) {
			return -1;
		}
		return 0;
	}

}
