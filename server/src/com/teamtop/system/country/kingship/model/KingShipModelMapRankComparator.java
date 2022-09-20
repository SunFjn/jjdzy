package com.teamtop.system.country.kingship.model;

import java.util.Comparator;

public class KingShipModelMapRankComparator implements Comparator<KingShipModel> {

	@Override
	public int compare(KingShipModel arg0, KingShipModel arg1) {
		// 比较净胜场
		if (arg0.getOnlyWinTimes() < arg1.getOnlyWinTimes()) {
			return 1;
		} else if (arg0.getOnlyWinTimes() > arg1.getOnlyWinTimes()) {
			return -1;
		} else {
			// 比较达到时间
			if (arg0.getTime() > arg1.getTime()) {
				return 1;
			} else if (arg0.getTime() < arg1.getTime()) {
				return -1;
			} else {
				return 0;
			}
		}
	}

}
