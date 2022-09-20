package com.teamtop.system.crossTeamFuBen;

import java.util.Comparator;

import com.teamtop.system.crossTeamFuBen.model.CrossTeamFubenRankModel;

public class CrossTeamFubenHurtComparator implements Comparator<CrossTeamFubenRankModel>{
	private static CrossTeamFubenHurtComparator ins = null;

	public static CrossTeamFubenHurtComparator getIns() {
		if (ins == null) {
			ins = new CrossTeamFubenHurtComparator();
		}
		return ins;
	}

	@Override
	public int compare(CrossTeamFubenRankModel o1, CrossTeamFubenRankModel o2) {
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
