package com.teamtop.system.crossSJMiJing;

import java.util.Comparator;

import com.teamtop.system.crossSJMiJing.model.CrossSJMiJingRankModel;

public class CrossSJMiJingHurtComparator implements Comparator<CrossSJMiJingRankModel>{
	private static CrossSJMiJingHurtComparator ins = null;

	public static CrossSJMiJingHurtComparator getIns() {
		if (ins == null) {
			ins = new CrossSJMiJingHurtComparator();
		}
		return ins;
	}

	@Override
	public int compare(CrossSJMiJingRankModel o1, CrossSJMiJingRankModel o2) {
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
