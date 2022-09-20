package com.teamtop.system.country.fightNorthAndSouth.model;

import java.util.Comparator;

public class CountryScoreComparetor implements Comparator<CountryScoreRank> {

	@Override
	public int compare(CountryScoreRank o1, CountryScoreRank o2) {
		if (o2.getTotalScore() > o1.getTotalScore()) {
			return 1;
		} else if (o2.getTotalScore() == o1.getTotalScore()) {
			if (o2.getUpdateTime() < o1.getUpdateTime()) {
				return 1;
			} else if (o2.getUpdateTime() == o1.getUpdateTime()) {
				return 0;
			}
		}
		return -1;
	}

}
