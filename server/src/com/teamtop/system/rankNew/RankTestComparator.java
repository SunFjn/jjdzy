package com.teamtop.system.rankNew;

import java.util.Comparator;

import com.teamtop.system.rankNew.rankModel.BaseRankModel;

/**
 * 测试用类
 */
public class RankTestComparator implements Comparator<BaseRankModel> {

	@Override
	public int compare(BaseRankModel o, BaseRankModel o2) {
		if (o.getStrength() > o2.getStrength()) {
			return 1;
		} else if (o.getStrength() < o2.getStrength()) {
			return -1;
		} else {
			if (o.getLevel() > o2.getLevel()) {
				return 1;
			} else if (o.getLevel() < o2.getLevel()) {
				return -1;
			} else {
				if (o.getTotalStrength() > o2.getTotalStrength()) {
					return 1;
				} else if (o.getTotalStrength() < o2.getTotalStrength()) {
					return -1;
				} else {
					if (o.getHid() < o2.getHid()) {
						return 1;
					} else if (o.getHid() > o2.getHid()) {
						return -1;
					}
					return 0;
				}
			}
		}
	}

}
