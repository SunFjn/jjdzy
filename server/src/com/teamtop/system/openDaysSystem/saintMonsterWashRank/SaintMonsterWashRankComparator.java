package com.teamtop.system.openDaysSystem.saintMonsterWashRank;

import java.util.Comparator;

import com.teamtop.system.openDaysSystem.saintMonsterWashRank.model.SaintMonsterWashRankModel;

public class SaintMonsterWashRankComparator implements Comparator<SaintMonsterWashRankModel> {

	@Override
	public int compare(SaintMonsterWashRankModel arg0, SaintMonsterWashRankModel arg1) {
		// 洗练次数
		if (arg0.getTotalTimes() < arg1.getTotalTimes()) {
			return 1;
		} else if (arg0.getTotalTimes() > arg1.getTotalTimes()) {
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
