package com.teamtop.system.boss.countryBoss;

import java.util.Comparator;

public class CountryBossRankComparator implements Comparator<CountryBossRank>{
	private static CountryBossRankComparator ins = null;

	public static CountryBossRankComparator getIns() {
		if (ins == null) {
			ins = new CountryBossRankComparator();
		}
		return ins;
	}

	@Override
	public int compare(CountryBossRank o1, CountryBossRank o2) {
		if(o1.getDiebossnum()<o2.getDiebossnum()){
			return 1;
		}else if(o1.getDiebossnum()>o2.getDiebossnum()){
			return -1;
		}else{
			if(o1.getKilltime()>o2.getKilltime()){
				return 1;
			}else if(o1.getKilltime()<o2.getKilltime()){
				return -1;
			}
		}
		return 0;
	}

}