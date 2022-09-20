package com.teamtop.system.crossKing;

import java.util.Comparator;

import com.teamtop.system.crossKing.model.CrossKingRank;
/**
 * 最强王者排序类
 * @author lobbyer
 * @date 2016年8月22日
 */
public class CrossKingRankComparator implements Comparator<CrossKingRank> {
	@Override
	public int compare(CrossKingRank rank1, CrossKingRank rank2) {
		if(rank1.getRank() < rank2.getRank()) {
			return -1;
		}else return 0;
	}


}
