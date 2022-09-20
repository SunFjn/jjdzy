package com.teamtop.system.longZhongDui.model;

import java.util.Comparator;

public class LongZhongDuiRankComparator implements Comparator<LongZhongDuiRankModel> {

	@Override
	public int compare(LongZhongDuiRankModel o1, LongZhongDuiRankModel o2) {
		// 比较积分
		if (o1.getScore() < o2.getScore()) {
			return 1;
		} else if (o1.getScore() > o2.getScore()) {
			return -1;
		} else {
			// 比较达到时间
			if (o1.getReachTime() > o1.getReachTime()) {
				return 1;
			} else if (o1.getReachTime() < o1.getReachTime()) {
				return -1;
			} else {
				return 0;
			}

		}
	}

}
