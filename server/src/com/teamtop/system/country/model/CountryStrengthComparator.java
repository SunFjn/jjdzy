package com.teamtop.system.country.model;

import java.util.Comparator;

public class CountryStrengthComparator implements Comparator<CountryStrengthRankModel> {

	@Override
	public int compare(CountryStrengthRankModel o1, CountryStrengthRankModel o2) {
		if(o1.getTotalStrength() < o2.getTotalStrength()) {
			return 1;
		}else if(o1.getTotalStrength() > o2.getTotalStrength()) {
			return -1;
		}
		return 0;
	}
}
