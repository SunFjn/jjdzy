package com.teamtop.system.linglongge.model;

import java.util.Comparator;

public class LingLongGeRankComparator implements Comparator<LingLongGeRankModel> {

	@Override
	public int compare(LingLongGeRankModel arg0, LingLongGeRankModel arg1) {
		// 比较积分
		if (arg0.getScore() < arg1.getScore()) {
			return 1;
		} else if (arg0.getScore() > arg1.getScore()) {
			return -1;
		} else {
			// 比较达到时间
			if (arg0.getReachTime() > arg1.getReachTime()) {
				return 1;
			} else if (arg0.getReachTime() < arg1.getReachTime()) {
				return -1;
			} else {
				return 0;
			}
		}
	}

}
