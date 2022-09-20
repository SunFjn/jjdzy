package com.teamtop.system.crossWenDingTianXia.comparator;

import java.util.Comparator;

import com.teamtop.system.crossWenDingTianXia.model.CrossWenDingTianXiaScoreRank;

public class CrossWenDingTianXiaScoreRankComparator implements Comparator<CrossWenDingTianXiaScoreRank>{
	private static CrossWenDingTianXiaScoreRankComparator ins = null;

	public static CrossWenDingTianXiaScoreRankComparator getIns() {
		if (ins == null) {
			ins = new CrossWenDingTianXiaScoreRankComparator();
		}
		return ins;
	}

	@Override
	public int compare(CrossWenDingTianXiaScoreRank o1, CrossWenDingTianXiaScoreRank o2) {
		if(o1.getScore()<o2.getScore()){
			return 1;
		}else if(o1.getScore()>o2.getScore()){
			return -1;
		}else if(o1.getTime()>o2.getTime()){
			return 1;
		}else if(o1.getTime()<o2.getTime()){
			return -1;
		}
		return 0;
	}

}
