package com.teamtop.system.crossTeamFuBen;

import java.util.Comparator;

import com.teamtop.system.team.model.TeamMember;

public class CrossTeamFubenTeamComparator implements Comparator<TeamMember>{
	private static CrossTeamFubenTeamComparator ins = null;

	public static CrossTeamFubenTeamComparator getIns() {
		if (ins == null) {
			ins = new CrossTeamFubenTeamComparator();
		}
		return ins;
	}

	@Override
	public int compare(TeamMember o1, TeamMember o2) {
		if(o1.getType()>o2.getType()){
			return 1;
		}else if(o1.getType()<o2.getType()){
			return -1;
		}else{
			if(o1.getTimeJoin()>o2.getTimeJoin()){
				return 1;
			}else if(o1.getTimeJoin()<o2.getTimeJoin()){
				return -1;
			}
		}
		return 0;
	}

}
