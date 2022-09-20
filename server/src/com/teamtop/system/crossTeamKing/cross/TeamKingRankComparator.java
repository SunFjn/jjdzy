package com.teamtop.system.crossTeamKing.cross;

import java.util.Comparator;

public class TeamKingRankComparator implements Comparator<TeamKingRanker>{

	@Override
	public int compare(TeamKingRanker o1, TeamKingRanker o2) {
		
		if(o1.getJf() < o2.getJf()){
			return 1;
		}else if(o1.getJf() > o2.getJf()){
			return -1;
		}else if(o1.getJf() < o2.getJf()){
			return 1;
		}else if(o1.getJf() > o2.getJf()){
			return -1;
		}else{
			//比较时间
			if(o1.getTime() > o2.getTime()){
				return 1;
			}else if(o1.getTime() < o2.getTime()){
				return -1;
			}else {
				return 0;
			}
		}
	}

}
