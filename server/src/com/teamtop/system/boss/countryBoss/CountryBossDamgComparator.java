package com.teamtop.system.boss.countryBoss;

import java.util.Comparator;

public class CountryBossDamgComparator implements Comparator<CountryBossDamgModel>{
	private static CountryBossDamgComparator ins = null;

	public static CountryBossDamgComparator getIns() {
		if (ins == null) {
			ins = new CountryBossDamgComparator();
		}
		return ins;
	}

	@Override
	public int compare(CountryBossDamgModel o1, CountryBossDamgModel o2) {
		if(o1.getHurt()<o2.getHurt()){
			return 1;
		}else if(o1.getHurt()>o2.getHurt()){
			return -1;
		}else{
			if(o1.getHid()<o2.getHid()){
				return 1;
			}else if(o1.getHid()>o2.getHid()){
				return -1;
			}
		}
		return 0;
	}

}
